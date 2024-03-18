package com.teamten.executiveinsight.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long badgeId;
    private Long points;
    private Long pointLimit;

    public Badge() {
        this.points = 0L;
        this.pointLimit = 0L;
    }
}
