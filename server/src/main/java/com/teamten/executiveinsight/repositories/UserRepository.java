package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Notification;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
    @Query("SELECT u FROM Users u JOIN u.workspaces w WHERE w.code = :code AND u.userId = :id")
    Optional<Users> findUserByWorkspaceCode(@Param("code") String code, @Param("id") Long id);
    @Query("SELECT u FROM Users u JOIN u.workspaces w WHERE w.id = :id")
    List<Users> findUsersByWorkspaceId(@Param("id") Long id);
    @Query("SELECT n FROM Users u JOIN u.notifications n WHERE u.email= :email ORDER BY n.notificationId DESC")
    List<Notification> findNotificationsByUser(@Param("email") String email);
    @Query("SELECT w FROM Users u JOIN u.workspaces w WHERE u.email= :email ORDER BY w.workspaceId DESC")
    List<Workspace> findWorkspacesByUser(@Param("email") String email);
}
