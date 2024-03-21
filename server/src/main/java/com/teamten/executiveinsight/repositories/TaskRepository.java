package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
