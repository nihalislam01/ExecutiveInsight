package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.VerificationToken;
import com.teamten.executiveinsight.repositories.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {
    private final TokenRepository tokenRepository;
    private final UserService userService;
    public Optional<VerificationToken> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }
    public void saveToken(Users user, String token) {
        var verificationToken = new VerificationToken(token, user);
        tokenRepository.save(verificationToken);
    }
    public String validateToken(String token) {
        Optional<VerificationToken> verificationToken = tokenRepository.findByToken(token);
        if (verificationToken.isEmpty()) {
            return "invalid";
        }
        VerificationToken theToken = verificationToken.get();
        Users theUser = theToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((theToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            tokenRepository.delete(theToken);
            userService.removeUser(theUser);
            return "expired";
        }
        theUser.setEnable(true);
        userService.updateUser(theUser);
        return "valid";
    }
}
