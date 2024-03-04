package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.BusinessTitleRepository;
import com.teamten.executiveinsight.repositories.UserJoinWorkspaceRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import com.teamten.executiveinsight.services.NotificationService;
import com.teamten.executiveinsight.services.WorkspaceService;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class WorkspaceController {

    //Service
    private final WorkspaceService workspaceService;
    private final NotificationService notificationService;

    //Repositories
    private final WorkspaceRepository workspaceRepository;
    private final BusinessTitleRepository businessTitleRepository;
    private final UserJoinWorkspaceRepository userJoinWorkspaceRepository;
    @GetMapping("/get-workspace/{id}")
    public Workspace retrieveWorkspaceById(@PathVariable Long id) {
        return workspaceRepository.findById(id).orElseThrow(EntityExistsException::new);
    }
    @GetMapping("/get-workspaces/{email}")
    public List<Workspace> retrieveWorkspaces(@PathVariable String email) {
        return userJoinWorkspaceRepository.findWorkspacesByUserEmail(email);
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
    @PostMapping("/join-workspace/{code}/{email}")
    public ResponseEntity<String> joinWorkspace(@PathVariable String code, @PathVariable String email) {
        return workspaceService.joinWorkspace(code, email);
    }
}
