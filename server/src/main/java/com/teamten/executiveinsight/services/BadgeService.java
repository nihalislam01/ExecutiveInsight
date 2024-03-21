package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Badge;
import com.teamten.executiveinsight.repositories.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BadgeService {
    private final BadgeRepository badgeRepository;
    public void updateBadge(Badge badge) {
        badgeRepository.save(badge);
    }
}
