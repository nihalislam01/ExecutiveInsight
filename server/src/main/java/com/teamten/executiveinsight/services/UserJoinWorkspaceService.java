package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Post;
import com.teamten.executiveinsight.model.entity.UserJoinWorkspace;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.repositories.UserJoinWorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserJoinWorkspaceService {
    private final UserJoinWorkspaceRepository userJoinWorkspaceRepository;
    public void addUser(Users user, Workspace workspace) {
        UserJoinWorkspace newUserJoinWorkspace = new UserJoinWorkspace();
        newUserJoinWorkspace.setUser(user);
        newUserJoinWorkspace.setWorkspace(workspace);
        userJoinWorkspaceRepository.save(newUserJoinWorkspace);
    }
    public Optional<UserJoinWorkspace> getUserJoinWorkspace(String email, String code) {
        return userJoinWorkspaceRepository.findByUser_EmailAndWorkspace_Code(email, code);
    }
    public List<UserJoinWorkspace> getAllUserJoinWorkspace(Long id, String title) {
        return userJoinWorkspaceRepository.findAllByWorkspace_workspaceIdAndPost_title(id, title);
    }
    public List<Users> getAllUser(Long workspaceId, Long postId) {
        return userJoinWorkspaceRepository.findAllUserByWorkspaceIdAndPostId(workspaceId, postId);
    }
    public List<UserJoinWorkspace> getAllUserJoinWorkspace(Long id) {
        return userJoinWorkspaceRepository.findAllByWorkspace_workspaceId(id);
    }
    public List<Workspace> getAllWorkspace(String email) {
        return userJoinWorkspaceRepository.findAllWorkspaceByUserEmail(email);
    }
    public List<UserJoinWorkspace> getAllUserJoinWorkspaceByUser(Long id) {
        return userJoinWorkspaceRepository.findAllByUser_userId(id);
    }
    public Long getTotalUser(Long id) {
        Optional<Long> totalUsers =  userJoinWorkspaceRepository.findTotalUser(id);
        return totalUsers.orElse(0L);
    }
    public List<Users> getAllUserId(Long workspaceId) {
        return userJoinWorkspaceRepository.findAllUser(workspaceId);
    }
    public void updateAll(List<UserJoinWorkspace> userJoinWorkspaces) {
        userJoinWorkspaceRepository.saveAll(userJoinWorkspaces);
    }
    public void updateUserJoinWorkspace(UserJoinWorkspace userJoinWorkspace, Post post) {
        userJoinWorkspace.setPost(post);
        userJoinWorkspaceRepository.save(userJoinWorkspace);
    }
}
