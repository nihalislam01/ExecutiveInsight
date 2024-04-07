package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.entity.*;
import com.teamten.executiveinsight.model.request.TaskRequest;
import com.teamten.executiveinsight.services.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
        if (taskRequest.name().strip().equalsIgnoreCase("")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Please enter task name");
        } else if (LocalDate.parse(taskRequest.endDate()).isBefore(LocalDate.now()) || taskRequest.endDate().equalsIgnoreCase("")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Please enter valid delivery date");
        }
        Workspace workspace = workspaceService.getWorkspace(taskRequest.workspaceId()).orElseThrow(EntityNotFoundException::new);
        Product product = productService.getProduct(taskRequest.productId()).orElse(null);
        taskService.createTask(workspace, product, taskRequest);
        return ResponseEntity.ok("Task has been created");
    }
    @GetMapping("/get-tasks/{id}")
    private ResponseEntity<?> getAllTask(@PathVariable Long id) {
        List<Task> tasks = taskService.getAllTaskByWorkspaceId(id);
        return ResponseEntity.ok(tasks);
    }
    @GetMapping("/get-task/{id}")
    private ResponseEntity<Task> getTask(@PathVariable Long id) {
        Task task = taskService.getTask(id).orElseThrow(EntityNotFoundException::new);
        return ResponseEntity.ok(task);
    }
    @GetMapping("/get-task-by-user/{id}")
    private ResponseEntity<?> getMyTasks(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getAllTaskByUserId(id));
    }
    @GetMapping("/get-task-by-user-workspace/{email}/{id}")
    private ResponseEntity<?> getAllTaskByUserAndWorkspace(@PathVariable String email, @PathVariable Long id) {
        List<Task> tasks = taskService.getAllTaskByUserAndWorkspace(email, id);
        return ResponseEntity.ok(tasks);
    }
    @GetMapping("/get-tasks-by-team/{id}")
    private ResponseEntity<?> getAllTaskByTeamId(@PathVariable Long id) {
        List<Task> tasks = taskService.getAllTaskByTeamId(id);
        return ResponseEntity.ok(tasks);
    }
    @GetMapping("/get-workspaceId/{taskId}")
    private ResponseEntity<Long> getWorkspaceId(@PathVariable Long taskId) {
        Long workspaceId = taskService.getWorkspaceId(taskId);
        return ResponseEntity.ok(workspaceId);
    }
    @PutMapping("/assign-task-to-user/{userId}/{taskId}")
    private ResponseEntity<String> assignTaskToUser(@PathVariable Long userId, @PathVariable Long taskId) {
        Users user = userService.getUser(userId).orElseThrow(EntityNotFoundException::new);
        if(taskService.updateTask(user, taskId)) {
            return ResponseEntity.ok("User assigned successful");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Task already has been assigned");
    }
    @PutMapping("/assign-task-to-team/{teamId}/{taskId}")
    private ResponseEntity<String> assignTaskToTeam(@PathVariable Long teamId, @PathVariable Long taskId) {
        Team team = teamService.getTeam(teamId).orElseThrow(EntityNotFoundException::new);
        if (taskService.updateTask(team, taskId)) {
            return ResponseEntity.ok("Team assigned successful");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Task already has been assigned");
    }
    @PatchMapping("/update-task")
    private ResponseEntity<String> updateTask(@RequestBody TaskRequest taskRequest) {
        if (taskRequest.name().strip().equalsIgnoreCase("")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Please enter task name");
        }  else if (LocalDate.parse(taskRequest.endDate()).isBefore(LocalDate.now()) || taskRequest.endDate().equalsIgnoreCase("")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Please enter valid delivery date");
        }
        Product product = productService.getProduct(taskRequest.productId()).orElseThrow(EntityNotFoundException::new);
        taskService.updateTask(taskRequest, product);
        return ResponseEntity.ok("task updated successfully");
    }
}
