package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.UserJoinWorkspace;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserJoinWorkspaceRepository extends JpaRepository<UserJoinWorkspace, Long> {
    @Query("SELECT u FROM UserJoinWorkspace u WHERE u.user.email = :email AND u.workspace.code = :code ORDER BY u.userJoinWorkspaceId LIMIT 1")
    Optional<UserJoinWorkspace> findByUserAndWorkspace(@Param("email") String email, @Param("code") String code);
    @Query("SELECT u.workspace FROM UserJoinWorkspace u WHERE u.user.email = :email")
    List<Workspace> findWorkspacesByUserEmail(@Param("email") String email);
    @Query("SELECT u.user FROM UserJoinWorkspace u WHERE u.workspace.workspaceId = :id")
    List<Users> findUsersByWorkspaceId(@Param("id") Long id);
}
