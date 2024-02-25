package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.Workspace;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UniqueIdGenerator {

    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom random = new SecureRandom();
    private final WorkspaceRepository workspaceRepository;

    public String generateUniqueId() {
        String uniqueId = createUniqueId();
        for(long i = 0L; i<1000000000; i++) {
            Optional<Workspace> workspace = workspaceRepository.findByCode(uniqueId);
            if (workspace.isEmpty()) {
                break;
            }
            uniqueId = generateUniqueId();
        }
        return uniqueId;
    }
    public String createUniqueId() {
        StringBuilder uniqueIdBuilder = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(ALPHABET.length());
            char randomChar = ALPHABET.charAt(randomIndex);
            uniqueIdBuilder.append(randomChar);
        }

        return uniqueIdBuilder.toString();
    }
}

