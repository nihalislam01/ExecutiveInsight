package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    Optional<Workspace> findByCode(String uniqueId);
}
