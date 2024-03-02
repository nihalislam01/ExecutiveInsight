package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.BusinessTitleRepository;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import com.teamten.executiveinsight.services.NotificationService;
import com.teamten.executiveinsight.services.WorkspaceService;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class WorkspaceController {

    //Service
    private final WorkspaceService workspaceService;
    private final NotificationService notificationService;

    //Repositories
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final BusinessTitleRepository businessTitleRepository;
    @GetMapping("/get-workspace/{id}")
    public Workspace retrieveWorkspaceById(@PathVariable Long id) {
        return workspaceRepository.findById(id).orElseThrow(EntityExistsException::new);
    }
    @GetMapping("/get-workspaces/{email}")
    public List<Workspace> retrieveWorkspaces(@PathVariable String email) {
        return userRepository.findWorkspacesByUser(email);
    }
    @GetMapping("/get-users/{id}")
    public List<Users> retrieveUsers(@PathVariable Long id) {
        return userRepository.findUsersByWorkspaceId(id);
    }
    @GetMapping("/get-business-title")
    public List<BusinessTitle> retrieveBusinessTitle() {
        return businessTitleRepository.findAll();
    }
    //Create My Workspace
    @PostMapping("/create-workspace")
    public ResponseEntity<?> createWorkspace(@RequestBody WorkspaceRequest workspaceRequest) {
        try {
            Users user = workspaceService.createWorkspace(workspaceRequest);
            String description = "Your very own workspace " + workspaceRequest.name() + " has been created";
            notificationService.sendNotification(user, description);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //Join a new workspace
    @PatchMapping("/join-workspace/{code}/{email}")
    public ResponseEntity<?> joinWorkspace(@PathVariable String code, @PathVariable String email) {
        Optional<Workspace> workspace = workspaceRepository.findByCode(code);
        Users user = userRepository.findByEmail(email).orElseThrow(EntityExistsException::new);
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
}
