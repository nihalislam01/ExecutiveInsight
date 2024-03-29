package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByWorkspace_workspaceId(Long id);
    List<Task> findAllByUser_userId(Long id);
    List<Task> findAllByTeam_teamId(Long id);
    List<Task> findAllByProduct_productId(Long id);
}
