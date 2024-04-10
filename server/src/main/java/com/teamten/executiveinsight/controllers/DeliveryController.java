package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.entity.*;
import com.teamten.executiveinsight.model.request.DeliveryRequest;
import com.teamten.executiveinsight.services.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DeliveryController {
    private final TaskService taskService;
    private final DeliveryService deliveryService;
    private final WorkspaceService workspaceService;
    private final BadgeService badgeService;
    private final UserJoinTeamService userJoinTeamService;
    @PostMapping("/create-delivery")
    private ResponseEntity<String> addDelivery(@RequestBody DeliveryRequest deliveryRequest) {
        Task task = taskService.getTask(deliveryRequest.taskId()).orElseThrow(EntityNotFoundException::new);
        task.setStatus("Pending");
        taskService.updateTask(task);
        Workspace workspace = workspaceService.getWorkspace(deliveryRequest.workspaceId()).orElseThrow(EntityNotFoundException::new);
        deliveryService.addDelivery(deliveryRequest, task, workspace);
        return ResponseEntity.ok("Delivery Created successfully");
    }
    @GetMapping("/get-deliveries/{id}")
    private ResponseEntity<?> getAllDelivery(@PathVariable Long id) {
        List<Delivery> deliveries = deliveryService.getAllDelivery(id);
        return ResponseEntity.ok(deliveries);
    }
    @GetMapping("/get-delivery/{id}")
    private ResponseEntity<Delivery> getDelivery(@PathVariable Long id) {
        Delivery delivery = deliveryService.getDelivery(id);
        return ResponseEntity.ok(delivery);
    }
    @PatchMapping("/accept-delivery/{id}")
    private ResponseEntity<String> acceptDelivery(@PathVariable Long id) {
        Delivery delivery = deliveryService.getDelivery(id);
        Task task = delivery.getTask();
        delivery.setSubmitted(true);
        task.setStatus("Delivered");
        if (task.getUser()!=null) {
            badgeService.increaseUserPoint(task.getUser().getBadge());
        } else if (task.getTeam()!=null) {
            List<Users> users = userJoinTeamService.getAllUser(task.getTeam().getTeamId());
            List<Badge> badges = users.stream().map(Users::getBadge).toList();
            badgeService.increaseAllUserPoint(badges);
        }
        taskService.updateTask(task);
        deliveryService.updateDelivery(delivery);
        return ResponseEntity.ok("Delivery Updated Successfully");
    }
    @PatchMapping("/reject-delivery/{id}")
    private ResponseEntity<String> rejectDelivery(@PathVariable Long id) {
        Delivery delivery = deliveryService.getDelivery(id);
        Task task = delivery.getTask();
        task.setStatus("Not Delivered Yet");
        taskService.updateTask(task);
        delivery.setTask(null);
        deliveryService.removeDelivery(delivery);
        return ResponseEntity.ok("Delivery Not Accepted");
    }
}
