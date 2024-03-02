package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.repositories.UserRepository;
import com.teamten.executiveinsight.security.JwtTokenRequest;
import com.teamten.executiveinsight.security.JwtTokenResponse;
import com.teamten.executiveinsight.security.JwtTokenService;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class JwtAuthenticationController {

    //Services
    private final JwtTokenService tokenService;
    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    //Authentication using JwtToken
    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> generateToken(
            @RequestBody JwtTokenRequest jwtTokenRequest) {

        var authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        jwtTokenRequest.username(),
                        jwtTokenRequest.password());

        var authentication =
                authenticationManager.authenticate(authenticationToken);

        var token = tokenService.generateToken(authentication);

        Users user = userRepository.findByEmail(jwtTokenRequest.username()).orElseThrow(EntityExistsException::new);

        return ResponseEntity.ok(new JwtTokenResponse(token, user));
    }
}
