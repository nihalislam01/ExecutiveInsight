package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.PostRepository;
import com.teamten.executiveinsight.repositories.UserJoinWorkspaceRepository;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserJoinWorkspaceRepository userJoinWorkspaceRepository;
    public ResponseEntity<String> createCustomPost(PostRequest postRequest) {
        Optional<Post> post = postRepository.findByTitle(postRequest.title());
        Optional<Workspace> workspace = workspaceRepository.findById(postRequest.workspaceId());
        if (workspace.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workspace not found");
        }
        if (post.isEmpty()) {
            Post newPost = new Post();
            newPost.setTitle(postRequest.title());
            newPost.getWorkspaces().add(workspace.get());
            postRepository.save(newPost);
        } else {
            Optional<Post> thePost = postRepository.findPostByWorkspaceId(postRequest.title(), postRequest.workspaceId());
            if (thePost.isPresent()){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Post already exists in your workspace");
            }
            post.get().getWorkspaces().add(workspace.get());
            postRepository.save(post.get());
        }
        return ResponseEntity.ok("Post has been added to workspace successfully");
    }
    public ResponseEntity<String> deletePost(Long id, String title) {
        Optional<Post> post = postRepository.findPostByWorkspaceId(title, id);
        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post does not exists in your workspace");
        }
        Workspace workspace = workspaceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        workspace.getPosts().remove(post.get());
        post.get().getWorkspaces().remove(workspace);
        List<UserJoinWorkspace> userJoinWorkspaces = userJoinWorkspaceRepository.findByPostAndWorkspace(id, title);
        userJoinWorkspaces.forEach(userJoinWorkspace -> userJoinWorkspace.setPost(null));
        userJoinWorkspaceRepository.saveAll(userJoinWorkspaces);
        postRepository.save(post.get());
        workspaceRepository.save(workspace);
        if (post.get().getBusinessTitle()==null && post.get().getWorkspaces().isEmpty()) {
            postRepository.deleteById(post.get().getPostId());
        }
        return ResponseEntity.ok("Post has been deleted from your workspace");
    }

    public ResponseEntity<String> assignPost(String email, String code, Long postId) {
        Optional<Users> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Optional<Workspace> workspace = workspaceRepository.findByCode(code);
        if (workspace.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workspace not found");
        }
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }
        Optional<UserJoinWorkspace> userJoinWorkspace = userJoinWorkspaceRepository.findByUserAndWorkspace(email, code);
        if (userJoinWorkspace.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exists in the workspace");
        }
        userJoinWorkspace.get().setPost(post.get());
        userJoinWorkspaceRepository.save(userJoinWorkspace.get());
        return ResponseEntity.ok("User successfully assigned to the post " + post.get().getTitle());
    }
    public ResponseEntity<?> getUsersByWorkspaceAndPost(Long workspaceId, Long postId) {
        Optional<Workspace> workspace = workspaceRepository.findById(workspaceId);
        if (workspace.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workspace not found");
        }
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }
        return ResponseEntity.ok(userJoinWorkspaceRepository.findUsersByWorkspaceAndPost(workspaceId, postId));
    }
}
