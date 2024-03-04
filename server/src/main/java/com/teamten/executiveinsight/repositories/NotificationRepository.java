package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("SELECT n from Notification n WHERE n.userEmail = :email AND n.workspaceCode = :code ORDER BY n.notificationId DESC LIMIT 1")
    Optional<Notification> findByUserAndWorkspace(@Param("email") String email, @Param("code") String code);
}
