package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}
