package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
}
