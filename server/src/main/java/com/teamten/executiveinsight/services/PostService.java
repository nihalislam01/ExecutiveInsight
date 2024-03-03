package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.Post;
import com.teamten.executiveinsight.model.PostRequest;
import com.teamten.executiveinsight.model.Workspace;
import com.teamten.executiveinsight.repositories.PostRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final WorkspaceRepository workspaceRepository;
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
        postRepository.save(post.get());
        workspaceRepository.save(workspace);
        Post thePost = postRepository.findByTitle(title).orElseThrow(EntityNotFoundException::new);
        if (thePost.getBusinessTitle()==null) {
            postRepository.deleteById(thePost.getPostId());
        }
        return ResponseEntity.ok("Post has been deleted from your workspace");
    }
}
