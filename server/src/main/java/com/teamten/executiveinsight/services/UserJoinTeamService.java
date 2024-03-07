package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.Team;
import com.teamten.executiveinsight.model.UserJoinTeam;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.repositories.UserJoinTeamRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserJoinTeamService {
    private final UserJoinTeamRepository userJoinTeamRepository;
    public boolean addUserToTeam(Users user, Team team) {
        Optional<UserJoinTeam> userJoinTeam = userJoinTeamRepository.findByUser_EmailAndTeam_TeamId(user.getEmail(), team.getTeamId());
        if (userJoinTeam.isPresent()) {
            return false;
        }
        UserJoinTeam newUserJoinTeam = new UserJoinTeam();
        newUserJoinTeam.setUser(user);
        newUserJoinTeam.setTeam(team);
        userJoinTeamRepository.save(newUserJoinTeam);
        return true;
    }
    public void removeAll(Long id) {
        List<UserJoinTeam> userJoinTeams = userJoinTeamRepository.findAllByTeam_TeamId(id);
        userJoinTeamRepository.deleteAll(userJoinTeams);
    }
    public void removeUserFromTeam(String email, Long teamId) {
        UserJoinTeam userJoinTeam = userJoinTeamRepository.findByUser_EmailAndTeam_TeamId(email, teamId).orElseThrow(EntityNotFoundException::new);
        userJoinTeamRepository.delete(userJoinTeam);
    }

    public List<Users> getAllUser(Long teamId) {
        return userJoinTeamRepository.findAllUserByTeam_TeamId(teamId);
    }
}
