package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.VerificationToken;
import com.teamten.executiveinsight.repositories.TokenRepository;
import com.teamten.executiveinsight.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {
    //Repositories
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
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
            userRepository.delete(theUser);
            return "expired";
        }
        theUser.setEnable(true);
        userRepository.save(theUser);
        return "valid";
    }
}
