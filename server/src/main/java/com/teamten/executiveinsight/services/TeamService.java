package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Team;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.repositories.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    public boolean createTeam(String name, Workspace workspace) {
        Optional<Team> team = teamRepository.findByNameAndWorkspace_Code(name, workspace.getCode());
        if (team.isPresent()) {
            return false;
        }
        Team newTeam = new Team();
        newTeam.setName(name);
        newTeam.setWorkspace(workspace);
        teamRepository.save(newTeam);
        return true;
    }
    public Optional<Team> getTeam(Long teamId) {
        return teamRepository.findById(teamId);
    }
    public void removeTeam(Long teamId) {
        teamRepository.deleteById(teamId);
    }

    public List<Team> getAllTeam(String email, Long id) {
        return teamRepository.findAllByWorkspaceAndUser(email, id);
    }
    public void updateTeam(Team team) {
        teamRepository.save(team);
    }
}
