package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.*;
import com.teamten.executiveinsight.model.request.TaskRequest;
import com.teamten.executiveinsight.repositories.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    public void createTask(Workspace workspace, Product product, TaskRequest taskRequest) {
        Task newTask = new Task();
        newTask.setName(taskRequest.name());
        newTask.setDescription(taskRequest.description());
        newTask.setStartDate(LocalDate.now());
        LocalDate endDate = LocalDate.parse(taskRequest.endDate());
        newTask.setEndDate(endDate);
        newTask.setWorkspace(workspace);
        newTask.setStatus("Not Assigned Yet");
        newTask.setAssigned(false);
        newTask.setProduct(product);
        newTask.setQuantity(taskRequest.quantity());
        taskRepository.save(newTask);

    }
    public List<Task> getAllTask(Long id) {
        return taskRepository.findAllByWorkspace_workspaceId(id);
    }
    public Optional<Task> getTask(Long id) {
        return taskRepository.findById(id);
    }
    public Optional<Task> getTaskByProductId(Long id) {
        return taskRepository.findByProduct_productId(id);
    }
    public boolean updateTask(Users user, Long taskId) {
        Task task = this.getTask(taskId).orElseThrow(EntityNotFoundException::new);
        if (task.isAssigned()) {
            return false;
        }
        task.setUser(user);
        task.setAssigned(true);
        task.setStatus("Not Delivered Yet");
        taskRepository.save(task);
        return true;
    }
    public boolean updateTask(Team team, Long taskId) {
        Task task = this.getTask(taskId).orElseThrow(EntityNotFoundException::new);
        if (task.isAssigned()) {
            return false;
        }

        task.setTeam(team);
        task.setAssigned(true);
        task.setStatus("Not Delivered Yet");
        taskRepository.save(task);
        return true;
    }
    public void updateTask(TaskRequest taskRequest, Product product) {
        Task task = this.getTask(taskRequest.taskId()).orElseThrow(EntityNotFoundException::new);
        task.setName(taskRequest.name());
        task.setDescription(taskRequest.description());
        task.setQuantity(taskRequest.quantity());
        LocalDate startDate = LocalDate.parse(taskRequest.startDate());
        LocalDate endDate = LocalDate.parse(taskRequest.endDate());
        task.setStartDate(startDate);
        task.setEndDate(endDate);
        task.setProduct(product);
        taskRepository.save(task);
    }

    public void removeProduct(Long id) {
        Task task = this.getTaskByProductId(id).orElseThrow(EntityNotFoundException::new);
        task.setProduct(null);
        taskRepository.save(task);
    }
}
