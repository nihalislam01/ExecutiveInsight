package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.UserRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    @GetMapping("/get-user/{email}")
    public Users getUser(@PathVariable String email) {
        Optional<Users> user = userService.retrieveByEmail(email);
        return user.get();
    }
    @PatchMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest) {
        Optional<Users> user = userService.retrieveByEmail(userRequest.email());
        user.get().setName(userRequest. name());
        user.get().setPassword(passwordEncoder.encode(userRequest.password()));
        userService.updateUser(user.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
