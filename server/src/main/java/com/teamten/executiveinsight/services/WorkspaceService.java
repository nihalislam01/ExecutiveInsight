package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.*;
import com.teamten.executiveinsight.model.request.WorkspaceRequest;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final UniqueIdGenerator uniqueIdGenerator;
    public Workspace createWorkspace(Users user, BusinessTitle businessTitle, WorkspaceRequest workspaceRequest) {
        Workspace newWorkspace = new Workspace();
        newWorkspace.setName(workspaceRequest.name());
        newWorkspace.setBusinessTitle(businessTitle);
        newWorkspace.setUser(user);
        for (int i = 0; i < businessTitle.getPosts().size(); i++) {
            businessTitle.getPosts().get(i).getWorkspaces().add(newWorkspace);
        }
        newWorkspace.setCode(uniqueIdGenerator.generateUniqueId());
        return workspaceRepository.save(newWorkspace);
    }
    public Optional<Workspace> getWorkspace(String code) {
        return workspaceRepository.findByCode(code);
    }
    public Optional<Workspace> getWorkspace(Long id) {
        return workspaceRepository.findById(id);
    }
    public void updateWorkspace(Workspace workspace) {
        workspaceRepository.save(workspace);
    }
    public void updateWorkspace(Workspace workspace, Team team) {
        workspace.getTeams().remove(team);
        workspaceRepository.save(workspace);
    }
}

