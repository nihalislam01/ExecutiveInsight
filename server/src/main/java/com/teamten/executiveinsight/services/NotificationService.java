package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Notification;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.model.request.NotificationRequest;
import com.teamten.executiveinsight.repositories.NotificationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    public void sendNotification(Users user, String description) {
        Notification newNotification  = new Notification();
        newNotification.setUser(user);
        newNotification.setDescription(description);
        notificationRepository.save(newNotification);
    }
    public void sendInviteOrRequest(Users user, Workspace workspace, String description, String email) {
        Optional<Notification> notification = notificationRepository.findFirstByUserEmailAndWorkspaceCodeOrderByNotificationIdDesc(email, workspace.getCode());
        if (notification.isPresent() && notification.get().isInvitation()) {
            notification.get().setTime(LocalDate.now());
            notification.get().setUser(user);
            String newDescription = description + workspace.getName();
            notification.get().setDescription(newDescription);
            notification.get().setWorkspaceCode(workspace.getCode());
            notification.get().setUserEmail(email);
            notificationRepository.save(notification.get());
        } else {
            Notification newNotification = new Notification();
            newNotification.setUser(user);
            String newDescription = description + workspace.getName();
            newNotification.setDescription(newDescription);
            newNotification.setWorkspaceCode(workspace.getCode());
            newNotification.setUserEmail(email);
            newNotification.setInvitation(true);
            notificationRepository.save(newNotification);
        }
    }
    public List<Notification> getAllNotification(String email) {
        return notificationRepository.findAllByUser_EmailOrderByNotificationIdDesc(email);
    }
    public void updateNotification(NotificationRequest notificationRequest) {
        Notification notification = notificationRepository.findById(notificationRequest.notificationId()).orElseThrow(EntityNotFoundException::new);
        notification.setDescription(notificationRequest.description());
        notification.setInvitation(false);
        notificationRepository.save(notification);
    }
}
