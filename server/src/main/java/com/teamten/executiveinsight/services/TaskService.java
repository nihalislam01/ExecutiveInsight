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
    public void updateTask(Users user, Long taskId) {
        Task task = this.getTask(taskId).orElseThrow(EntityNotFoundException::new);
        task.setUser(user);
        task.setAssigned(true);
        task.setStatus("User assigned. Not Delivered Yet");
        taskRepository.save(task);
    }
    public void updateTask(Team team, Long taskId) {
        Task task = this.getTask(taskId).orElseThrow(EntityNotFoundException::new);
        task.setTeam(team);
        task.setAssigned(true);
        task.setStatus("Team assigned. Not Delivered Yet");
        taskRepository.save(task);
    }
    public void updateTask(TaskRequest taskRequest) {
        Task task = this.getTask(taskRequest.taskId()).orElseThrow(EntityNotFoundException::new);
        task.setName(taskRequest.name());
        task.setDescription(taskRequest.description());
        task.setQuantity(taskRequest.quantity());
        LocalDate endDate = LocalDate.parse(taskRequest.endDate());
        task.setEndDate(endDate);
        taskRepository.save(task);
    }
}
