package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

}
