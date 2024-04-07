package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Badge;
import com.teamten.executiveinsight.repositories.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeService {
    private final BadgeRepository badgeRepository;
    public void updateBadge(Badge badge) {
        badgeRepository.save(badge);
    }
    public void increaseUserPoint(Badge badge) {
        Long point = badge.getPoints();
        Long limit = badge.getPointLimit();
        Long level = badge.getBadgeLevel();
        if (point + 1 >= limit) {
            badge.setPointLimit(limit * 3);
            badge.setBadgeLevel(level + 1);
        }
        badge.setPoints(point + 1);
        updateBadge(badge);
    }
    public void increaseAllUserPoint(List<Badge> badges) {
        badges.forEach(badge -> {
            Long point = badge.getPoints();
            Long limit = badge.getPointLimit();
            Long level = badge.getBadgeLevel();
            if (point + 1 >= limit) {
                badge.setPointLimit(limit * 3);
                badge.setBadgeLevel(level + 1);
            }
            badge.setPoints(point + 1);
        });
        badgeRepository.saveAll(badges);
    }
}
