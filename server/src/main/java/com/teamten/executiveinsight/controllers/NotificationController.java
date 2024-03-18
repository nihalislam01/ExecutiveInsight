package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.services.NotificationService;
import com.teamten.executiveinsight.services.UserJoinWorkspaceService;
import com.teamten.executiveinsight.services.UserService;
import com.teamten.executiveinsight.services.WorkspaceService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class NotificationController {
    //Services
    private final UserService userService;
    private final WorkspaceService workspaceService;
    private final NotificationService notificationService;
    private final UserJoinWorkspaceService userJoinWorkspaceService;
    //Retrieve Notifications
    @GetMapping("/get-notifications/{email}")
    public List<Notification> retrieveNotifications(@PathVariable String email) {
        return notificationService.getAllNotification(email);
    }
    //Invite To Join Workspace (Send Notification)
    @PostMapping("/invite-join")
    public ResponseEntity<String> inviteToJoin(@RequestBody UserJoinWorkspaceRequest userJoinWorkspaceRequest) {
        Optional<Users> user = userService.getUser(userJoinWorkspaceRequest.email());
        Workspace workspace = workspaceService.getWorkspace(userJoinWorkspaceRequest.code()).orElseThrow(EntityNotFoundException::new);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exists");
        } else if (user.get().getWorkspace()!=null) {
            if (user.get().getWorkspace().getCode().equalsIgnoreCase(userJoinWorkspaceRequest.code())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You cannot join your own workspace");
            }
        }
        Optional<UserJoinWorkspace> isExists = userJoinWorkspaceService.getUserJoinWorkspace(userJoinWorkspaceRequest.email(), userJoinWorkspaceRequest.code());
        if (isExists.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already joined the workspace");
        }
        String description = "You have been invited to the workspace ";
        notificationService.sendInviteOrRequest(user.get(), workspace, description, user.get().getEmail());
        return ResponseEntity.ok("Invitation send. Please ask your employee to check their notification");
    }
    //Request To Join Workspace (Sends Notification)
    @PostMapping("/request-join")
    public ResponseEntity<String> requestToJoin(@RequestBody UserJoinWorkspaceRequest userJoinWorkspaceRequest) {
        Optional<Workspace> workspace = workspaceService.getWorkspace(userJoinWorkspaceRequest.code());
        Users user = userService.getUser(userJoinWorkspaceRequest.email()).orElseThrow(EntityExistsException::new);
        if (workspace.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workspace with code does not exists");
        } else if (user.getWorkspace()!=null) {
            if (user.getWorkspace().getCode().equalsIgnoreCase(userJoinWorkspaceRequest.code())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You cannot join your own workspace");
            }
        }
        Optional<UserJoinWorkspace> isExists = userJoinWorkspaceService.getUserJoinWorkspace(userJoinWorkspaceRequest.email(), userJoinWorkspaceRequest.code());
        if (isExists.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("You have already joined the workspace");
        }
        String description = user.getName() + " has requested to join your workspace ";
        notificationService.sendInviteOrRequest(workspace.get().getUser(), workspace.get(), description, user.getEmail());
        return ResponseEntity.ok("Request to join " + workspace.get().getName() + " has been sent");
    }
    //Updates notification regarding acceptance/rejection of an invite/request
    @PatchMapping("/update-notification")
    public ResponseEntity<String> updateNotification(@RequestBody NotificationRequest notificationRequest) {
        notificationService.updateNotification(notificationRequest);
        return ResponseEntity.ok("Notification updated successfully");
    }
}
