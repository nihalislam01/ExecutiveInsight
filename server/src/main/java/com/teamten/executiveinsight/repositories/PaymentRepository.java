package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
