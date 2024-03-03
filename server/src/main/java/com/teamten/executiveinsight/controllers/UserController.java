package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.events.email.EmailCompleteEvent;
import com.teamten.executiveinsight.events.email.EmailRequest;
import com.teamten.executiveinsight.model.UserRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.services.NotificationService;
import com.teamten.executiveinsight.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    //Services
    private final UserService userService;
    private final NotificationService notificationService;

    //Repositories
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher publisher;
    //Retrieving user information
    @GetMapping("/get-user/{email}")
    public Users getUser(@PathVariable String email) {
        return userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
    }
    //Updating user information
    @PatchMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest) {
        userService.updateUser(userRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    //Step01: Change password
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody EmailRequest emailRequest) {
        Optional<Users> user = userRepository.findByEmail(emailRequest.email());
        if(user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (!user.get().isEnable()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        publisher.publishEvent(new EmailCompleteEvent(user.get(), "http://localhost:3000", true));
        return ResponseEntity.ok("Check your email to reset your password");
    }
    //Step02: Change password
    @PatchMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody UserRequest userRequest) {
        Users user = userRepository.findByEmail(userRequest.email()).orElseThrow(EntityNotFoundException::new);
        user.setPassword(passwordEncoder.encode(userRequest.password()));
        userRepository.save(user);
        notificationService.sendNotification(user, "Your password has been changed");
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/upload-photo/{email}")
    public ResponseEntity<String> uploadPhoto(@PathVariable String email, @RequestParam("file") MultipartFile file) {
        userService.uploadPhoto(email, file);
        return ResponseEntity.ok("Your profile photo has been uploaded successfully");
    }
}
