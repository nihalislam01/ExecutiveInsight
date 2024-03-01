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
    private final WorkspaceRepository workspaceRepository;
    private final BusinessTitleRepository businessTitleRepository;
    private final UserRepository userRepository;
    private final UniqueIdGenerator uniqueIdGenerator;
    private final  UserService userService;
    private final NotificationService notificationService;
    public void createWorkspace(WorkspaceRequest workspaceRequest) {
        Users user =  userService.retrieveByEmail(workspaceRequest.email());
        if (user.getRole().equalsIgnoreCase("USER")) {
            BusinessTitle businessTitle = businessTitleRepository.findByTitle(workspaceRequest.title());
            Workspace newWorkspace = new Workspace();
            newWorkspace.setName(workspaceRequest.name());
            newWorkspace.setBusinessTitle(businessTitle);
            newWorkspace.setCode(uniqueIdGenerator.generateUniqueId());
            workspaceRepository.save(newWorkspace);
            user.setWorkspace(newWorkspace);
            user.setRole("ADMIN");
            userRepository.save(user);
            String description = "Your very own workspace " + workspaceRequest.name() + " has been created";
            notificationService.sendNotification(user, description);
        }
    }
    public Workspace findByCode(String code) {
        return workspaceRepository.findByCode(code).orElseThrow(EntityNotFoundException::new);
    }
    public void updateWorkspace(Workspace workspace) {
        workspaceRepository.save(workspace);
    }
    public boolean joinWorkspace(Users user, Workspace workspace) {
        Optional<Users> theUser = userRepository.findUserByWorkspaceCode(workspace.getCode(), user.getUserId());
        if (theUser.isPresent()) {
            return false;
        }
        user.getWorkspaces().add(workspace);
        userService.updateUser(user);
        updateWorkspace(workspace);
        return true;
    }

    public Workspace findById(Long id) {
        return workspaceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}
