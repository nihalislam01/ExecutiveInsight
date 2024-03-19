package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.security.JwtTokenRequest;
import com.teamten.executiveinsight.security.JwtTokenResponse;
import com.teamten.executiveinsight.security.JwtTokenService;
import com.teamten.executiveinsight.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class JwtAuthenticationController {

    //Services
    private final JwtTokenService tokenService;
    private final UserService userService;
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

        Users user = userService.getUser(jwtTokenRequest.username()).orElseThrow(EntityNotFoundException::new);

        return ResponseEntity.ok(new JwtTokenResponse(token, user));
    }
}
