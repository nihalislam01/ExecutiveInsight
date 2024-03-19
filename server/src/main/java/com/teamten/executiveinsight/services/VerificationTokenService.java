package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.VerificationToken;
import com.teamten.executiveinsight.repositories.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {
    private final TokenRepository tokenRepository;
    public void addToken(Users user, String token) {
        var verificationToken = new VerificationToken(token, user);
        tokenRepository.save(verificationToken);
    }
    public Optional<VerificationToken> getToken(String token) {
        return tokenRepository.findByToken(token);
    }
    public void removeToken(VerificationToken theToken) {
        tokenRepository.delete(theToken);
    }
}
