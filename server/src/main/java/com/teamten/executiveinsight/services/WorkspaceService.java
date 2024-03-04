package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.*;
import com.teamten.executiveinsight.repositories.BusinessTitleRepository;
import com.teamten.executiveinsight.repositories.UserJoinWorkspaceRepository;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceService {
    //Repositories
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final BusinessTitleRepository businessTitleRepository;
    private final UserJoinWorkspaceRepository userJoinWorkspaceRepository;

    //Others
    private final UniqueIdGenerator uniqueIdGenerator;
    public Users createWorkspace(WorkspaceRequest workspaceRequest) {
        Users user =  userRepository.findByEmail(workspaceRequest.email()).orElseThrow(EntityNotFoundException::new);
        if (user.getRole().equalsIgnoreCase("USER")) {
            BusinessTitle businessTitle = businessTitleRepository.findByTitle(workspaceRequest.title());
            Workspace newWorkspace = new Workspace();
            newWorkspace.setName(workspaceRequest.name());
            newWorkspace.setBusinessTitle(businessTitle);
            newWorkspace.setUser(user);
            for (int i = 0; i < businessTitle.getPosts().size(); i++) {
                businessTitle.getPosts().get(i).getWorkspaces().add(newWorkspace);
            }
            newWorkspace.setCode(uniqueIdGenerator.generateUniqueId());
            workspaceRepository.save(newWorkspace);
            user.setWorkspace(newWorkspace);
            user.setRole("ADMIN");
            return userRepository.save(user);
        }
        return null;
    }
    public ResponseEntity<String> joinWorkspace(String code, String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Optional<Workspace> workspace = workspaceRepository.findByCode(code);
        if (workspace.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workspace not found");
        }
        Optional<UserJoinWorkspace> isExists = userJoinWorkspaceRepository.findByUserAndWorkspace(email, code);
        if (isExists.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists in the workspace");
        }
        try {
            UserJoinWorkspace newUserJoinWorkspace = new UserJoinWorkspace();
            newUserJoinWorkspace.setUser(user.get());
            newUserJoinWorkspace.setWorkspace(workspace.get());
            userJoinWorkspaceRepository.save(newUserJoinWorkspace);
            return ResponseEntity.ok("User has been joined successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
    }
}
