package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("SELECT n from Notification n WHERE n.user.userId = :userId AND n.workspace.workspaceId = :workspaceId")
    Optional<Notification> findByUserAndWorkspace(@Param("userId") Long userId, @Param("workspaceId") Long workspaceId);
}
