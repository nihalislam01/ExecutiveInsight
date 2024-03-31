package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByWorkspace_workspaceId(Long id);
    List<Task> findAllByUser_userId(Long id);
    List<Task> findAllByTeam_teamId(Long id);
    List<Task> findAllByProduct_productId(Long id);
    @Query("select sum(t.money) from Task t where t.workspace.workspaceId= :id and t.status= :status")
    Optional<Integer> findTotalRevenue(@Param("id") Long id, @Param("status") String status);
}
