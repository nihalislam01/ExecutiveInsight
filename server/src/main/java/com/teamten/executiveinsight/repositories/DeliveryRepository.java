package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findAllByWorkspace_workspaceId(Long id);
}
