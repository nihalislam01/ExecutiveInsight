package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import com.teamten.executiveinsight.model.WorkspaceRequest;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final UniqueIdGenerator uniqueIdGenerator;
    private final UserService userService;
    public void createWorkspace(WorkspaceRequest workspaceRequest) {
        Optional<Users> user =  userRepository.findByEmail(workspaceRequest.email());
        Users theUser = user.get();
        if (theUser.getRole().equalsIgnoreCase("USER")) {
            Workspace newWorkspace = new Workspace();
            newWorkspace.setName(workspaceRequest.name());
            newWorkspace.setCode(uniqueIdGenerator.generateUniqueId());
            workspaceRepository.save(newWorkspace);
            theUser.setWorkspace(newWorkspace);
            theUser.setRole("ADMIN");
            userRepository.save(theUser);
        }
    }
    public Optional<Workspace> findByCode(String code) {
        return workspaceRepository.findByCode(code);
    }
    public void updateWorkspace(Workspace workspace) {
        workspaceRepository.save(workspace);
    }
    public void joinWorkspace(Users user, Workspace workspace) {
        user.getWorkspaces().add(workspace);
        userService.updateUser(user);
        updateWorkspace(workspace);
    }
}
