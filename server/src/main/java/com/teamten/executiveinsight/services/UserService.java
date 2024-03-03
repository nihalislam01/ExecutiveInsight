package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.UserRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public Users userSignup(UserRequest userRequest) {
        Users newUser = new Users();
        newUser.setName(userRequest.name());
        newUser.setEmail(userRequest.email());
        newUser.setPassword(passwordEncoder.encode(userRequest.password()));
        newUser.setRole("USER");
        newUser.setEnable(false);
        return userRepository.save(newUser);
    }
    public void updateUser(UserRequest userRequest) {
        Users user = userRepository.findByEmail(userRequest.email()).orElseThrow(EntityNotFoundException::new);
        user.setName(userRequest. name());
        user.setPassword(passwordEncoder.encode(userRequest.password()));
        userRepository.save(user);
    }

    public void uploadPhoto(String email, MultipartFile file) {
        try {
            Users user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
            user.setPhoto(file.getBytes());
            userRepository.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile photo", e);
        }
    }
}
