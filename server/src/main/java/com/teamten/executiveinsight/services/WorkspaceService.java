package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.BusinessTitleRepository;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceService {
    //Repositories
    private final WorkspaceRepository workspaceRepository;
    private final BusinessTitleRepository businessTitleRepository;
    private final UserRepository userRepository;

    private final UniqueIdGenerator uniqueIdGenerator;
    public Users createWorkspace(WorkspaceRequest workspaceRequest) {
        Users user =  userRepository.findByEmail(workspaceRequest.email()).orElseThrow(EntityNotFoundException::new);
        if (user.getRole().equalsIgnoreCase("USER")) {
            BusinessTitle businessTitle = businessTitleRepository.findByTitle(workspaceRequest.title());
            Workspace newWorkspace = new Workspace();
            newWorkspace.setName(workspaceRequest.name());
            newWorkspace.setBusinessTitle(businessTitle);
            newWorkspace.setCode(uniqueIdGenerator.generateUniqueId());
            workspaceRepository.save(newWorkspace);
            user.setWorkspace(newWorkspace);
            user.setRole("ADMIN");
            return userRepository.save(user);
        }
        return null;
    }
    public boolean joinWorkspace(Users user, Workspace workspace) {
        Optional<Users> theUser = userRepository.findUserByWorkspaceCode(workspace.getCode(), user.getUserId());
        if (theUser.isPresent()) {
            return false;
        }
        user.getWorkspaces().add(workspace);
        userRepository.save(user);
        workspaceRepository.save(workspace);
        return true;
    }
}
