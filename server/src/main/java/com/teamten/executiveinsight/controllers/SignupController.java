package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.events.email.EmailCompleteEvent;
import com.teamten.executiveinsight.model.entity.Badge;
import com.teamten.executiveinsight.model.request.UserRequest;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.VerificationToken;
import com.teamten.executiveinsight.services.BadgeService;
import com.teamten.executiveinsight.services.VerificationTokenService;
import com.teamten.executiveinsight.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class SignupController {

    //Services
    private final UserService userService;
    private final ApplicationEventPublisher publisher;
    private final VerificationTokenService verificationTokenService;
    private final BadgeService badgeService;

    // Signup step01: Sending signup information
    @PostMapping("/signup")
    public ResponseEntity<String> userSignup(@RequestBody UserRequest userRequest) {
        try {
            Optional<Users> user = userService.getUser(userRequest.email());
            if (user.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }
            // Signup step02: Saving information to database
            Users theUser = userService.createUser(userRequest);
            Badge newBadge = new Badge();
            theUser.setBadge(newBadge);
            badgeService.updateBadge(newBadge);
            userService.updateUser(theUser);
            // Signup step03: Sending verification email
            publisher.publishEvent(new EmailCompleteEvent(theUser, "http://localhost:3000", false));
            return ResponseEntity.ok("Register successful. Check your email to verify.");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
    }
    // Signup step04: Verifying the token
    @GetMapping("/verify-email/{token}/{isForgotPassword}")
    public ResponseEntity<?> verifyEmail(@PathVariable String token, @PathVariable String isForgotPassword){
        Optional<VerificationToken> verificationToken = verificationTokenService.getToken(token);
        if (verificationToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Token");
        }  else if (isForgotPassword.equalsIgnoreCase("true")) {
            return ResponseEntity.ok(verificationToken.get().getUser().getEmail());
        }
        // Signup step05: Validating the token
        VerificationToken theToken = verificationToken.get();
        Users theUser = theToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((theToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            verificationTokenService.removeToken(theToken);
            userService.removeUser(theUser);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Verification token expired");
        }
        theUser.setEnable(true);
        userService.updateUser(theUser);
        return ResponseEntity.ok("User been verified. Please Sign in");
    }
}
