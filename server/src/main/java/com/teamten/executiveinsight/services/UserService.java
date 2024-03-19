package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Badge;
import com.teamten.executiveinsight.model.request.UserRequest;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public Users createUser(UserRequest userRequest) {
        Users newUser = new Users();
        newUser.setName(userRequest.name());
        newUser.setEmail(userRequest.email());
        newUser.setPassword(passwordEncoder.encode(userRequest.password()));
        newUser.setRole("USER");
        newUser.setEnable(false);
        return userRepository.save(newUser);
    }
    public Optional<Users> getUser(String username) {
        return userRepository.findByEmail(username);
    }
    public void updateUser(Users theUser) {
        userRepository.save(theUser);
    }
    public void addWorkspace(Users user, Workspace workspace) {
        user.setWorkspace(workspace);
        user.setRole("ADMIN");
        userRepository.save(user);
    }
    public void removeUser(Users theUser) {
        userRepository.delete(theUser);
    }

//    public void uploadPhoto(String email, MultipartFile file) {
//        try {
//            Users user = this.getUser(email).orElseThrow(EntityNotFoundException::new);
//            user.setPhoto(file.getBytes());
//            userRepository.save(user);
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to upload profile photo", e);
//        }
//    }
}
