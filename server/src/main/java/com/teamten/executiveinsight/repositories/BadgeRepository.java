package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
}
