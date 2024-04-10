package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByNameAndWorkspace_Code(String name, String code);
    @Query("SELECT t FROM Team t JOIN t.userJoinTeams u WHERE u.user.email = :email AND t.workspace.workspaceId = :id")
    List<Team> findAllByWorkspaceAndUser(String email, Long id);
}
