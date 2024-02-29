package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.Notification;
import com.teamten.executiveinsight.model.UserRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import com.teamten.executiveinsight.repositories.NotificationRepository;
import com.teamten.executiveinsight.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public Users retrieveByEmail(String email) {

        return userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
    }
    public void removeUser(Users user) {
        userRepository.delete(user);
    }
    public void updateUser(Users user) {
        userRepository.save(user);
    }
    public List<Notification> retrieveNotifications(String email) {
        Users user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
        return user.getNotifications();
    }
}
