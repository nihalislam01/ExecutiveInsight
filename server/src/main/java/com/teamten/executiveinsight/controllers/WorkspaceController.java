package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.email.EmailRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import com.teamten.executiveinsight.model.WorkspaceRequest;
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
    private final WorkspaceService workspaceService;
    @GetMapping("/get-workspaces")
    public List<Workspace> retrieveWorkspaces(@RequestBody EmailRequest emailRequest) {
        return userService.retrieveWorkspaces(emailRequest.email());
    }
    @PostMapping("/create-workspace")
    public ResponseEntity<?> createWorkspace(@RequestBody WorkspaceRequest workspaceRequest) {
        try {
            workspaceService.createWorkspace(workspaceRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
