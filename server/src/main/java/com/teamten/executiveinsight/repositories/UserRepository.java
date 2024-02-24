package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    public Optional<Users> findByEmail(String email);
}
