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
        newTask.setMoney(taskRequest.value());
        taskRepository.save(newTask);

    }
    public List<Task> getAllTaskByWorkspaceId(Long id) {
        return taskRepository.findAllByWorkspace_workspaceId(id);
    }
    public List<Task> getAllTaskByUserId(Long id) {
        return taskRepository.findAllByUser_userId(id);
    }
    public List<Task> getAllTaskByTeamId(Long id) { return taskRepository.findAllByTeam_teamId(id); }
    public List<Task> getAllTaskByProductId(Long id) { return taskRepository.findAllByProduct_productId(id); }
    public Optional<Task> getTask(Long id) { return taskRepository.findById(id); }
    public int getTotalRevenue(Long id) {
        Optional<Integer> totalRevenue =  taskRepository.findTotalRevenue(id, "Delivered");
        return totalRevenue.orElse(0);
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
        task.setMoney(taskRequest.value());
        taskRepository.save(task);
    }
    public void removeProductFromTask(Long id) {
        List<Task> tasks = this.getAllTaskByProductId(id);
        for (Task task : tasks) {
            task.setProduct(null);
        }
        taskRepository.saveAll(tasks);
    }
    public List<Task> getAllTaskByUserAndWorkspace(String email, Long id) {
        return taskRepository.findAllByUser_emailAndWorkspace_workspaceId(email, id);
    }
    public void updateTask(Task task) {
        taskRepository.save(task);
    }
    public Long getWorkspaceId(Long taskId) {
        return taskRepository.findById(taskId).orElseThrow(EntityNotFoundException::new).getWorkspace().getWorkspaceId();
    }
}
