package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.email.EmailCompleteEvent;
import com.teamten.executiveinsight.model.UserRequest;
import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.VerificationToken;
import com.teamten.executiveinsight.services.TokenService;
import com.teamten.executiveinsight.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class SignupController {

    private final UserService userService;
    private final TokenService tokenService;
    private final ApplicationEventPublisher publisher;

    // Signup step01: Sending signup information
    @PostMapping("/signup")
    public ResponseEntity<?> userSignup(@RequestBody UserRequest userRequest) {
        try {
            Optional<Users> user = userService.retrieveByEmail(userRequest.email());
            if (user.isPresent()) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            // Signup step02: Saving information to database
            Users theUser = userService.userSignup(userRequest);
            // Signup step03: Sending verification email
            publisher.publishEvent(new EmailCompleteEvent(theUser, "http://localhost:3000", false));
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    // Signup step04: Verifying the token
    @GetMapping("/verify-email/{token}/{isForgotPassword}")
    public ResponseEntity<?> verifyEmail(@PathVariable String token, @PathVariable String isForgotPassword){
        Optional<VerificationToken> verificationToken = tokenService.findByToken(token);
        if (verificationToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Token");
        }  else if (isForgotPassword.equalsIgnoreCase("true")) {
            return ResponseEntity.ok(verificationToken.get().getUser().getEmail());
        }
        // Signup step05: Validating the token
        String verificationResult = tokenService.validateToken(token);
        if (verificationResult.equalsIgnoreCase("valid")){
            return ResponseEntity.ok("User been verified. Please login");
        } else if (verificationResult.equalsIgnoreCase("expired")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Verification token expired");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Token");
    }
}
