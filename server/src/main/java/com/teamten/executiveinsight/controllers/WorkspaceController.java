package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.entity.BusinessTitle;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.model.request.WorkspaceRequest;
import com.teamten.executiveinsight.model.response.DashboardResponse;
import com.teamten.executiveinsight.services.*;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class WorkspaceController {

    //Service
    private final UserService userService;
    private final WorkspaceService workspaceService;
    private final TaskService taskService;
    private final NotificationService notificationService;
    private final BusinessTitleService businessTitleService;
    private final UserJoinWorkspaceService userJoinWorkspaceService;
    @GetMapping("/get-workspace/{id}")
    public Workspace retrieveWorkspaceById(@PathVariable Long id) {
        return workspaceService.getWorkspace(id).orElseThrow(EntityExistsException::new);
    }
    @GetMapping("/get-workspaces/{email}")
    public List<Workspace> retrieveWorkspaces(@PathVariable String email) {
        return userJoinWorkspaceService.getAllWorkspace(email);
    }
    @GetMapping("/get-business-title")
    public List<BusinessTitle> retrieveBusinessTitle() {
        return businessTitleService.getAllTitle();
    }
    //Create My Workspace
    @PostMapping("/create-workspace")
    public ResponseEntity<String> createWorkspace(@RequestBody WorkspaceRequest workspaceRequest) {
        Users user =  userService.getUser(workspaceRequest.email()).orElseThrow(EntityNotFoundException::new);
        BusinessTitle businessTitle = businessTitleService.getTitle(workspaceRequest.title());
        try {
            Workspace workspace = workspaceService.createWorkspace(user, businessTitle, workspaceRequest);
            userService.addWorkspace(user, workspace);
            String description = "Your very own workspace " + workspaceRequest.name() + " has been created";
            notificationService.sendNotification(user, description);
            return ResponseEntity.ok("Workspace has been created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
    }
    @PostMapping("/join-workspace/{code}/{email}")
    public ResponseEntity<String> joinWorkspace(@PathVariable String code, @PathVariable String email) {
        Users user = userService.getUser(email).orElseThrow(EntityNotFoundException::new);
        Workspace workspace = workspaceService.getWorkspace(code).orElseThrow(EntityNotFoundException::new);
        try {
            userJoinWorkspaceService.addUser(user, workspace);
            return ResponseEntity.ok("User has been joined successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
    }
    @GetMapping("/get-dashboard-details/{workspaceId}")
    public ResponseEntity<DashboardResponse> getDashboardDetails(@PathVariable Long workspaceId) {
        Long totalUser = userJoinWorkspaceService.getTotalUser(workspaceId);
        Long totalValue = taskService.getTotalRevenue(workspaceId);
        Long totalQuantity = taskService.getTotalQuantity(workspaceId);
        return ResponseEntity.ok(new DashboardResponse(totalUser, totalValue, totalQuantity));
    }
    @GetMapping("/get-distinct-dashboard-details/{workspaceId}")
    public ResponseEntity<?> getDistinctValues(@PathVariable Long workspaceId) {
        return ResponseEntity.ok(taskService.getDistinctValues(workspaceId));
    }
}
