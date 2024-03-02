package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.Notification;
import com.teamten.executiveinsight.model.NotificationRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    @GetMapping("/get-notifications/{email}")
    public List<Notification> retrieveNotifications(@PathVariable String email) {
        return userRepository.findNotificationsByUser(email);
    }
    @PatchMapping("/update-notification")
    public void updateNotification(@RequestBody NotificationRequest notificationRequest) {
        notificationService.updateNotification(notificationRequest);
    }
    @PostMapping("/send-invite/{code}/{email}")
    public ResponseEntity<String> sendInvite(@PathVariable String code, @PathVariable String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exists");
        } else if (user.get().getWorkspace()!=null) {
            if (user.get().getWorkspace().getCode().equalsIgnoreCase(code)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You cannot join your own workspace");
            }
        }
        Optional<Users> theUser = userRepository.findUserByWorkspaceCode(code, user.get().getUserId());
        if (theUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already joined the workspace");
        }
        notificationService.sendInvitation(user.get(), code);
        return ResponseEntity.ok("Invitation send. Please ask your employee to check their notification");
    }
}
