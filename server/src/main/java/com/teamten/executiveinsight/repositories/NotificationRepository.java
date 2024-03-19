package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByUser_EmailOrderByNotificationIdDesc(String email);
    Optional<Notification> findFirstByUserEmailAndWorkspaceCodeOrderByNotificationIdDesc(String email, String code);
}
