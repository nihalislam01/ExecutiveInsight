package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.users.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Integer> {
    public Optional<Manager> findByEmail(String email);
}
