package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    public void addPost(String title, Workspace workspace) {
        Post newPost = new Post();
        newPost.setTitle(title);
        newPost.getWorkspaces().add(workspace);
        postRepository.save(newPost);
    }
    public Optional<Post> getPost(Long postId) {
        return postRepository.findById(postId);
    }
    public Optional<Post> getPost(String title) {
        return postRepository.findByTitle(title);
    }
    public Optional<Post> getPost(String title, Long id) {
        return postRepository.findByTitleAndWorkspaceId(title, id);
    }
    public void addPostToWorkspace(Post post, Workspace workspace) {
        post.getWorkspaces().add(workspace);
        postRepository.save(post);
    }
    public void updatePost(Post post) {
        postRepository.save(post);
    }
    public void removePost(Long postId) {
        postRepository.deleteById(postId);
    }
    public void removePost(Workspace workspace, Post post, List<UserJoinWorkspace> userJoinWorkspaces) {
        workspace.getPosts().remove(post);
        post.getWorkspaces().remove(workspace);
        userJoinWorkspaces.forEach(userJoinWorkspace -> userJoinWorkspace.setPost(null));
    }
}
