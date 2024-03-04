package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.NotificationRepository;
import com.teamten.executiveinsight.repositories.UserJoinWorkspaceRepository;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final NotificationRepository notificationRepository;
    private final UserJoinWorkspaceRepository userJoinWorkspaceRepository;
    public void sendNotification(Users user, String description) {
        Notification newNotification  = new Notification();
        newNotification.setUser(user);
        newNotification.setDescription(description);
        notificationRepository.save(newNotification);
    }
    public void sendRequestOrInvite(Users user, String code, String description, String email) {
        Workspace workspace = workspaceRepository.findByCode(code).orElseThrow(EntityNotFoundException::new);
        Optional<Notification> notification = notificationRepository.findByUserAndWorkspace(email, code);
        if (notification.isPresent() && notification.get().isInvitation()) {
            notification.get().setTime(LocalDateTime.now());
            notification.get().setUser(user);
            String newDescription = description + workspace.getName();
            notification.get().setDescription(newDescription);
            notification.get().setWorkspaceCode(code);
            notification.get().setUserEmail(email);
            notificationRepository.save(notification.get());
        } else {
            Notification newNotification = new Notification();
            newNotification.setUser(user);
            String newDescription = description + workspace.getName();
            newNotification.setDescription(newDescription);
            newNotification.setWorkspaceCode(code);
            newNotification.setUserEmail(email);
            newNotification.setInvitation(true);
            notificationRepository.save(newNotification);
        }
    }
    public void updateNotification(NotificationRequest notificationRequest) {
        Notification notification = notificationRepository.findById(notificationRequest.notificationId()).orElseThrow(EntityNotFoundException::new);
        notification.setDescription(notificationRequest.description());
        notification.setInvitation(false);
        notificationRepository.save(notification);
    }

    public ResponseEntity<String> requestToJoin(UserJoinWorkspaceRequest userJoinWorkspaceRequest) {
        Optional<Workspace> workspace = workspaceRepository.findByCode(userJoinWorkspaceRequest.code());
        Users user = userRepository.findByEmail(userJoinWorkspaceRequest.email()).orElseThrow(EntityExistsException::new);
        if (workspace.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workspace with code does not exists");
        } else if (user.getWorkspace()!=null) {
            if (user.getWorkspace().getCode().equalsIgnoreCase(userJoinWorkspaceRequest.code())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You cannot join your own workspace");
            }
        }
        Optional<UserJoinWorkspace> isExists = userJoinWorkspaceRepository.findByUserAndWorkspace(userJoinWorkspaceRequest.email(), userJoinWorkspaceRequest.code());
        if (isExists.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("You have already joined the workspace");
        }
        String description = user.getName() + " has requested to join your workspace ";
        this.sendRequestOrInvite(workspace.get().getUser(), userJoinWorkspaceRequest.code(), description, user.getEmail());
        return ResponseEntity.ok("Request to join " + workspace.get().getName() + " has been sent");
    }

    public ResponseEntity<String> inviteToJoin(UserJoinWorkspaceRequest userJoinWorkspaceRequest) {
        Optional<Users> user = userRepository.findByEmail(userJoinWorkspaceRequest.email());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exists");
        } else if (user.get().getWorkspace()!=null) {
            if (user.get().getWorkspace().getCode().equalsIgnoreCase(userJoinWorkspaceRequest.code())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You cannot join your own workspace");
            }
        }
        Optional<UserJoinWorkspace> isExists = userJoinWorkspaceRepository.findByUserAndWorkspace(userJoinWorkspaceRequest.email(), userJoinWorkspaceRequest.code());
        if (isExists.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already joined the workspace");
        }
        String description = "You have been invited to the workspace ";
        this.sendRequestOrInvite(user.get(), userJoinWorkspaceRequest.code(), description, user.get().getEmail());
        return ResponseEntity.ok("Invitation send. Please ask your employee to check their notification");
    }
}
