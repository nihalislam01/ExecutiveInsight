package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.BusinessTitleRepository;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import com.teamten.executiveinsight.services.NotificationService;
import com.teamten.executiveinsight.services.UserService;
import com.teamten.executiveinsight.services.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class WorkspaceController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final WorkspaceService workspaceService;
    private final WorkspaceRepository workspaceRepository;
    private final BusinessTitleRepository businessTitleRepository;
    private final NotificationService notificationService;
    @GetMapping("/get-workspace-by-id/{id}")
    public Workspace retrieveWorkspaceById(@PathVariable Long id) {
        return workspaceService.findById(id);
    }
    @GetMapping("/get-workspace-by-code/{code}")
    public Workspace retrieveWorkspaceByCode(@PathVariable String code) {
        return workspaceService.findByCode(code);
    }
    @PatchMapping("/update-notification")
    public void updateNotification(@RequestBody NotificationRequest notificationRequest) {
        notificationService.updateNotification(notificationRequest);
    }
    @GetMapping("/get-users/{id}")
    public List<Users> retrieveUsers(@PathVariable Long id) {
        return userRepository.findUsersByWorkspaceId(id);
    }
    //Create My Workspace
    @PostMapping("/create-workspace")
    public ResponseEntity<?> createWorkspace(@RequestBody WorkspaceRequest workspaceRequest) {
        try {
            workspaceService.createWorkspace(workspaceRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //Join a new workspace
    @PatchMapping("/join-workspace/{code}/{email}")
    public ResponseEntity<?> joinWorkspace(@PathVariable String code, @PathVariable String email) {
        Optional<Workspace> workspace = workspaceRepository.findByCode(code);
        Users user = userService.retrieveByEmail(email);
        if (workspace.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workspace with code does not exists");
        } else if (user.getWorkspace()!=null) {
            if (user.getWorkspace().getCode().equalsIgnoreCase(code)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You cannot join your own workspace");
            }
        }
        if (workspaceService.joinWorkspace(user, workspace.get())) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("You have already joined the workspace");
    }
    @GetMapping("/get-business-title")
    public List<BusinessTitle> retrieveBusinessTitle() {
        return businessTitleRepository.findAll();
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
