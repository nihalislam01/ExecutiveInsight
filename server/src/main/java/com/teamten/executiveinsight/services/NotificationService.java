package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.events.notification.NotificationRequest;
import com.teamten.executiveinsight.model.Notification;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.repositories.NotificationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    public void createNotification(Users user, String description) {
        Notification newNotification = new Notification();
        newNotification.setUser(user);
        newNotification.setDescription(description);
        notificationRepository.save(newNotification);
    }
    public void updateNotification(NotificationRequest notificationRequest) {
        Notification notification = notificationRepository.findById(notificationRequest.notificationId()).orElseThrow(EntityNotFoundException::new);
        notification.setDescription(notificationRequest.description());
        notificationRepository.save(notification);
    }
}
