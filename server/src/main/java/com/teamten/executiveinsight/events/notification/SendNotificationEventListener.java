package com.teamten.executiveinsight.events.notification;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.services.NotificationService;
import com.teamten.executiveinsight.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SendNotificationEventListener implements ApplicationListener<SendNotificationEvent> {
    private final NotificationService notificationService;
    private final UserService userService;
    @Override
    public void onApplicationEvent(SendNotificationEvent event) {
        Users user = userService.retrieveByEmail(event.getEmail());
        String description = event.getDescription();
        notificationService.createNotification(user, description);
    }
}
