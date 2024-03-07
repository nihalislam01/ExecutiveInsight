package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByNameAndWorkspace_Code(String name, String code);
}
