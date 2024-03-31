package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.entity.Delivery;
import com.teamten.executiveinsight.model.entity.Task;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.model.request.DeliveryRequest;
import com.teamten.executiveinsight.services.DeliveryService;
import com.teamten.executiveinsight.services.TaskService;
import com.teamten.executiveinsight.services.WorkspaceService;
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
    @PostMapping("/create-delivery")
    public ResponseEntity<String> addDelivery(@RequestBody DeliveryRequest deliveryRequest) {
        Task task = taskService.getTask(deliveryRequest.taskId()).orElseThrow(EntityNotFoundException::new);
        Workspace workspace = workspaceService.getWorkspace(deliveryRequest.workspaceId()).orElseThrow(EntityNotFoundException::new);
        deliveryService.addDelivery(deliveryRequest, task, workspace);
        return ResponseEntity.ok("Delivery Created successfully");
    }
    @GetMapping("/get-deliveries/{id}")
    public ResponseEntity<?> getAllDelivery(@PathVariable Long id) {
        List<Delivery> deliveries = deliveryService.getAllDelivery(id);
        return ResponseEntity.ok(deliveries);
    }
    @PatchMapping("/update-delivery/{id}")
    public ResponseEntity<String> updateDelivery(@PathVariable Long id) {
        deliveryService.updateDelivery(id);
        return ResponseEntity.ok("Delivery Updated Successfully");
    }
}
