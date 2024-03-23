package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByWorkspace_workspaceId(Long id);

    Optional<Task> findByProduct_productId(Long id);
}
