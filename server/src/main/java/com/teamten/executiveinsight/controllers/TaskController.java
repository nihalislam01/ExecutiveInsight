package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.entity.*;
import com.teamten.executiveinsight.model.request.TaskRequest;
import com.teamten.executiveinsight.services.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;
    private final TeamService teamService;
    private final ProductService productService;
    private final WorkspaceService workspaceService;
    @PostMapping("create-task")
    private ResponseEntity<String> addTask(@RequestBody TaskRequest taskRequest) {
        Workspace workspace = workspaceService.getWorkspace(taskRequest.workspaceId()).orElseThrow(EntityNotFoundException::new);
        Product product = productService.getProduct(taskRequest.productId()).orElseThrow(EntityNotFoundException::new);
        taskService.createTask(workspace, product, taskRequest);
        return ResponseEntity.ok("Task has been created");
    }
    @GetMapping("/get-tasks/{id}")
    private ResponseEntity<?> getAllTask(@PathVariable Long id) {
        List<Task> tasks = taskService.getAllTask(id);
        return ResponseEntity.ok(tasks);
    }
    @PutMapping("/assign-task-to-user/{userId}/{taskId}")
    private ResponseEntity<String> assignTaskToUser(@PathVariable Long userId, @PathVariable Long taskId) {
        Users user = userService.getUser(userId).orElseThrow(EntityNotFoundException::new);
        taskService.updateTask(user, taskId);
        return ResponseEntity.ok("User assigned successful");
    }
    @PutMapping("/assign-task-to-team/{teamId}/{taskId}")
    private ResponseEntity<String> assignTaskToTeam(@PathVariable Long teamId, @PathVariable Long taskId) {
        Team team = teamService.getTeam(teamId).orElseThrow(EntityNotFoundException::new);
        taskService.updateTask(team, taskId);
        return ResponseEntity.ok("Team assigned successful");
    }
    @PatchMapping("/update-task")
    private ResponseEntity<String> updateTask(@RequestBody TaskRequest taskRequest) {
        taskService.updateTask(taskRequest);
        return ResponseEntity.ok("task updated successfully");
    }
}
