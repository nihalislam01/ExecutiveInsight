package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.services.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor

public class TeamController {
    private final UserService userService;
    private final TeamService teamService;
    private final WorkspaceService workspaceService;
    private final NotificationService notificationService;
    private final UserJoinTeamService userJoinTeamService;
    @PostMapping("/create-team")
    public ResponseEntity<String> createTeam(@RequestBody TeamRequest teamRequest) {
        Workspace workspace = workspaceService.getWorkspace(teamRequest.code()).orElseThrow(EntityNotFoundException::new);
        Users user = userService.getUser(teamRequest.email()).orElseThrow(EntityNotFoundException::new);
        try {
            if(teamService.createTeam(teamRequest.name(), workspace)) {
                String description = "You have created a new team " + teamRequest.name();
                notificationService.sendNotification(user, description);
                return ResponseEntity.ok("You have successfully created team " + teamRequest.name());
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Team with name " + teamRequest.name() + " already exists in your workspace");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
    }
    @PatchMapping("/join-team/{email}/{teamId}")
    public ResponseEntity<String> joinTeam( @PathVariable String email, @PathVariable Long teamId) {
        Users user = userService.getUser(email).orElseThrow(EntityNotFoundException::new);
        Team team = teamService.getTeam(teamId).orElseThrow(EntityNotFoundException::new);
        if(userJoinTeamService.addUserToTeam(user, team)) {
            notificationService.sendNotification(user, "You have been assigned to the team " + team.getName());
            return ResponseEntity.ok("User joined team " + team.getName() + " successfully");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("User already joined the team " + team.getName());

    }
    @GetMapping("/get-team-users/{teamId}")
    public ResponseEntity<?> getAllUser(@PathVariable Long teamId) {
        List<Users> users = userJoinTeamService.getAllUser(teamId);
        return ResponseEntity.ok(users);
    }
    @DeleteMapping("/remove-team-user/{email}/{teamId}")
    public ResponseEntity<String> removeUserFromTeam(@PathVariable String email, @PathVariable Long teamId) {
        userJoinTeamService.removeUserFromTeam(email, teamId);
        return ResponseEntity.ok("User removed from team");
    }
    @DeleteMapping("/delete-team/{teamId}/{workspaceId}")
    public ResponseEntity<String> deleteTeamById(@PathVariable Long teamId, @PathVariable Long workspaceId) {
        Workspace workspace = workspaceService.getWorkspace(workspaceId).orElseThrow(EntityNotFoundException::new);
        Team team = teamService.getTeam(teamId).orElseThrow(EntityNotFoundException::new);
        userJoinTeamService.removeAll(teamId);
        workspaceService.updateWorkspace(workspace, team);
        teamService.removeTeam(teamId);
        return ResponseEntity.ok("Team deleted successfully");
    }
}
