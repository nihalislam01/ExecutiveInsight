package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.Notification;
import com.teamten.executiveinsight.model.NotificationRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import com.teamten.executiveinsight.repositories.NotificationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final WorkspaceService workspaceService;
    public void sendNotification(Users user, String description) {
        Notification newNotification  = new Notification();
        newNotification.setUser(user);
        newNotification.setDescription(description);
        notificationRepository.save(newNotification);
    }

    public void sendInvitation(Users user, String code) {
        Workspace workspace = workspaceService.findByCode(code);
        Notification newNotification = new Notification();
        newNotification.setUser(user);
        String description = "You have been invited to the workspace " + workspace.getName();
        newNotification.setDescription(description);
        newNotification.setWorkspace(workspace);
        newNotification.setInvitation(true);
        notificationRepository.save(newNotification);
    }
    public void updateNotification(NotificationRequest notificationRequest) {
        Notification notification = notificationRepository.findById(notificationRequest.notificationId()).orElseThrow(EntityNotFoundException::new);
        notification.setDescription(notificationRequest.description());
        notification.setInvitation(false);
        notification.setTime(LocalDateTime.now());
        notificationRepository.save(notification);
    }
}
