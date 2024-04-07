package com.teamten.executiveinsight.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long badgeId;
    private Long points;
    private Long pointLimit;
    private Long badgeLevel;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    public Badge() {
        this.points = 0L;
        this.pointLimit = 3L;
        this.badgeLevel = 1L;
    }
}
