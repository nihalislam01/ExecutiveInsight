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
    public void createWorkspace(WorkspaceRequest workspaceRequest) {
        Optional<Users> user =  userRepository.findByEmail(workspaceRequest.email());
        Users theUser = user.get();
        if (theUser.getWorkspace()==null) {
            Workspace newWorkspace = new Workspace();
            newWorkspace.setName(workspaceRequest.name());
            workspaceRepository.save(newWorkspace);
            theUser.setWorkspace(newWorkspace);
            userRepository.save(theUser);
        }
    }
}
