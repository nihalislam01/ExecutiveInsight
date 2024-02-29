package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
