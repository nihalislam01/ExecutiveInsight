package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.UserJoinWorkspace;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserJoinWorkspaceRepository extends JpaRepository<UserJoinWorkspace, Long> {
    List<UserJoinWorkspace> findAllByWorkspace_workspaceId(Long id);
    List<UserJoinWorkspace> findAllByUser_userId(Long id);
    Optional<UserJoinWorkspace> findByUser_EmailAndWorkspace_Code(String email, String code);
    List<UserJoinWorkspace> findAllByWorkspace_workspaceIdAndPost_title(Long id, String title);
    @Query("SELECT u.user FROM UserJoinWorkspace u WHERE u.workspace.workspaceId = :workspaceId AND u.post.postId = :postId")
    List<Users> findAllUserByWorkspaceIdAndPostId(Long workspaceId, Long postId);
    @Query("SELECT u.workspace FROM UserJoinWorkspace u WHERE u.user.email = :email")
    List<Workspace> findAllWorkspaceByUserEmail(@Param("email") String email);
    @Query("SELECT COUNT(*) FROM UserJoinWorkspace u WHERE u.workspace.workspaceId = :id")
    Optional<Long> findTotalUser(Long id);
}
