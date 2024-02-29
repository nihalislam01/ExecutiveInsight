package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<VerificationToken, Long> {
    public Optional<VerificationToken> findByToken(String token);

}