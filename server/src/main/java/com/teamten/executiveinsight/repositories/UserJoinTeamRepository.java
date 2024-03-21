package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.UserJoinTeam;
import com.teamten.executiveinsight.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserJoinTeamRepository extends JpaRepository<UserJoinTeam, Long> {
    Optional<UserJoinTeam> findByUser_EmailAndTeam_TeamId(String email, Long teamId);
    List<UserJoinTeam> findAllByTeam_TeamId(Long id);
    @Query("SELECT u.user FROM UserJoinTeam u WHERE u.team.teamId = :teamId")
    List<Users> findAllUserByTeam_TeamId(@Param("teamId") Long teamId);
}
