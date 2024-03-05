package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.PostRequest;
import com.teamten.executiveinsight.model.UserJoinWorkspaceRequest;
import com.teamten.executiveinsight.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    @PostMapping("/add-custom-post")
    public ResponseEntity<String> addCustomPost(@RequestBody PostRequest postRequest) {
        try {
            return postService.createCustomPost(postRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
    }
    @DeleteMapping("/delete-post/{id}/{title}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, @PathVariable String title) {
        return postService.deletePost(id, title);
    }
    @PatchMapping("/assign-post/{email}/{code}/{postId}")
    public ResponseEntity<String> assignPost(@PathVariable String email, @PathVariable String code, @PathVariable Long postId) {
        return postService.assignPost(email, code, postId);
    }
    @GetMapping("/get-post-users/{workspaceId}/{postId}")
    public ResponseEntity<?> getUsersByWorkspaceAndPost(@PathVariable Long workspaceId, @PathVariable Long postId) {
        return postService.getUsersByWorkspaceAndPost(workspaceId, postId);
    }
}
