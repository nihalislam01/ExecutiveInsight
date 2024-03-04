package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NotificationController {
    //Repositories
    private final UserRepository userRepository;

    //Services
    private final NotificationService notificationService;
    //Retrieve Notifications
    @GetMapping("/get-notifications/{email}")
    public List<Notification> retrieveNotifications(@PathVariable String email) {
        return userRepository.findNotificationsByUser(email);
    }
    //Invite To Join Workspace (Send Notification)
    @PostMapping("/invite-join")
    public ResponseEntity<String> inviteToJoin(@RequestBody UserJoinWorkspaceRequest userJoinWorkspaceRequest) {
        return notificationService.inviteToJoin(userJoinWorkspaceRequest);
    }
    //Request To Join Workspace (Sends Notification)
    @PostMapping("/request-join")
    public ResponseEntity<?> requestToJoin(@RequestBody UserJoinWorkspaceRequest userJoinWorkspaceRequest) {
        return notificationService.requestToJoin(userJoinWorkspaceRequest);
    }
    //Updates notification regarding acceptance/rejection of an invite/request
    @PatchMapping("/update-notification")
    public void updateNotification(@RequestBody NotificationRequest notificationRequest) {
        notificationService.updateNotification(notificationRequest);
    }
}
