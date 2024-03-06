package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.services.PostService;
import com.teamten.executiveinsight.services.UserJoinWorkspaceService;
import com.teamten.executiveinsight.services.WorkspaceService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final WorkspaceService workspaceService;
    private final UserJoinWorkspaceService userJoinWorkspaceService;
    @PostMapping("/add-custom-post")
    public ResponseEntity<String> addCustomPost(@RequestBody PostRequest postRequest) {
        Optional<Post> post = postService.getPost(postRequest.title());
        Workspace workspace = workspaceService.getWorkspace(postRequest.workspaceId()).orElseThrow(EntityNotFoundException::new);
        if (post.isEmpty()) {
            postService.addPost(postRequest.title(), workspace);
        } else {
            Optional<Post> thePost = postService.getPost(postRequest.title(), postRequest.workspaceId());
            if (thePost.isPresent()){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Post already exists in your workspace");
            }
            postService.addPostToWorkspace(post.get(), workspace);
        }
        return ResponseEntity.ok("Post has been added to workspace successfully");
    }
    @DeleteMapping("/delete-post/{id}/{title}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, @PathVariable String title) {
        Post post = postService.getPost(title, id).orElseThrow(EntityNotFoundException::new);
        Workspace workspace = workspaceService.getWorkspace(id).orElseThrow(EntityNotFoundException::new);
        List<UserJoinWorkspace> userJoinWorkspaces = userJoinWorkspaceService.getAllUserJoinWorkspace(id, title);
        postService.removePost(workspace, post, userJoinWorkspaces);
        userJoinWorkspaceService.updateAll(userJoinWorkspaces);
        postService.updatePost(post);
        workspaceService.updateWorkspace(workspace);
        if (post.getBusinessTitle()==null && post.getWorkspaces().isEmpty()) {
            postService.removePost(post.getPostId());
        }
        return ResponseEntity.ok("Post has been deleted from your workspace");
    }
    @PatchMapping("/assign-post/{email}/{code}/{postId}")
    public ResponseEntity<String> assignPost(@PathVariable String email, @PathVariable String code, @PathVariable Long postId) {
        Post post = postService.getPost(postId).orElseThrow(EntityNotFoundException::new);
        UserJoinWorkspace userJoinWorkspace = userJoinWorkspaceService.getUserJoinWorkspace(email, code).orElseThrow(EntityNotFoundException::new);
        userJoinWorkspaceService.updateUserJoinWorkspace(userJoinWorkspace, post);
        return ResponseEntity.ok("User successfully assigned to the post " + post.getTitle());
    }
    @GetMapping("/get-post-users/{workspaceId}/{postId}")
    public ResponseEntity<?> getUsersByWorkspaceAndPost(@PathVariable Long workspaceId, @PathVariable Long postId) {
        Workspace workspace = workspaceService.getWorkspace(workspaceId).orElseThrow(EntityNotFoundException::new);
        Post post = postService.getPost(postId).orElseThrow(EntityNotFoundException::new);
        List<Users> users = userJoinWorkspaceService.getAllUser(workspaceId, postId);
        return ResponseEntity.ok(users);
    }
}
