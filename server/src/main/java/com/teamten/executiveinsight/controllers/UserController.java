package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.events.email.EmailCompleteEvent;
import com.teamten.executiveinsight.events.email.EmailRequest;
import com.teamten.executiveinsight.model.entity.UserJoinWorkspace;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.request.ImageDataRequest;
import com.teamten.executiveinsight.model.request.PasswordRequest;
import com.teamten.executiveinsight.model.request.UserRequest;
import com.teamten.executiveinsight.services.NotificationService;
import com.teamten.executiveinsight.services.UserJoinWorkspaceService;
import com.teamten.executiveinsight.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    //Services
    private final UserService userService;
    private final NotificationService notificationService;
    private final UserJoinWorkspaceService userJoinWorkspaceService;

    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher publisher;
    //Retrieving user information
    @GetMapping("/get-user/{email}")
    public Users getUser(@PathVariable String email) {
        return userService.getUser(email).orElseThrow(EntityNotFoundException::new);
    }
    @GetMapping("/get-users/{id}")
    public List<UserJoinWorkspace> retrieveUsers(@PathVariable Long id) {
        return userJoinWorkspaceService.getAllUserJoinWorkspace(id);
    }
    //Step01: Change password
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody EmailRequest emailRequest) {
        Optional<Users> user = userService.getUser(emailRequest.email());
        if(user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exists");
        } else if (!user.get().isEnable()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User hasn't verified their account yet");
        }
        publisher.publishEvent(new EmailCompleteEvent(user.get(), "http://localhost:3000", true));
        return ResponseEntity.ok("Check your email to reset your password");
    }
    //Step02: Change password
    @PatchMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody UserRequest userRequest) {
        Users user = userService.getUser(userRequest.email()).orElseThrow(EntityNotFoundException::new);
        user.setPassword(passwordEncoder.encode(userRequest.password()));
        userService.updateUser(user);
        notificationService.sendNotification(user, "Your password has been changed");
        return ResponseEntity.ok("User password has been changed");
    }
    @PatchMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordRequest passwordRequest) {
        Users user = userService.getUser(passwordRequest.email()).orElseThrow(EntityNotFoundException::new);
        if (passwordEncoder.matches(passwordRequest.oldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(passwordRequest.newPassword()));
            userService.updateUser(user);
            notificationService.sendNotification(user, "Your password has been changed");
            return ResponseEntity.ok("Password Changed Successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You old password did not match");
    }
    @PatchMapping("/update-profile")
    public ResponseEntity<String> updateProfileInfo(@RequestBody UserRequest userRequest) {
        Users user = userService.getUser(userRequest.email()).orElseThrow(EntityNotFoundException::new);
        user.setName(userRequest.name());
        user.setBio(userRequest.bio());
        user.setLocation(userRequest.location());
        userService.updateUser(user);
        notificationService.sendNotification(user, "You have just updated your profile");
        return ResponseEntity.ok("User profile updated");
    }
    @PatchMapping("/upload-photo")
    public ResponseEntity<String> uploadPhoto(@RequestBody ImageDataRequest imageDataRequest) {
        Users user = userService.getUser(imageDataRequest.email()).orElseThrow(EntityNotFoundException::new);
        user.setImage(imageDataRequest.image());
        userService.updateUser(user);
        return ResponseEntity.ok("Your profile photo has been uploaded successfully");
    }
}
