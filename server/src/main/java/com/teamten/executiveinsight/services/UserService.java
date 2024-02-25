package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.UserRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import com.teamten.executiveinsight.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Optional<Users> retrieveByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public void removeUser(Users user) {
        userRepository.delete(user);
    }
    public void updateUser(Users user) {
        userRepository.save(user);
    }

    public List<Workspace> retrieveWorkspaces(String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        return user.get().getWorkspaces();
    }
}
