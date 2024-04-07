package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Task;
import com.teamten.executiveinsight.model.response.DistinctDashboardResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByWorkspace_workspaceId(Long id);
    List<Task> findAllByTeam_teamId(Long id);
    List<Task> findAllByProduct_productId(Long id);
    List<Task> findAllByUser_emailAndWorkspace_workspaceId(String email, Long id);
    List<Task> findAllByUser_userId(Long id);
    @Query("SELECT sum(t.money) FROM Task t WHERE t.workspace.workspaceId= :id AND t.status= :status")
    Optional<Long> findTotalRevenue(Long id, String status);
    @Query("SELECT sum(t.quantity) FROM Task t WHERE t.workspace.workspaceId= :id AND t.status= :status")
    Optional<Long> findTotalQuantity(Long id, String status);
    @Query("SELECT NEW com.teamten.executiveinsight.model.response.DistinctDashboardResponse(t.product.name, sum(t.money), sum(t.quantity)) FROM Task t WHERE t.workspace.workspaceId= :id AND t.status= :status GROUP BY t.product.name")
    List<DistinctDashboardResponse> findTotalDistinctRevenueAndQuantity(Long id, String status);
}
