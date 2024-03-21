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

    @JsonIgnore
    @OneToOne
    private Users user;

    public Badge() {
        this.points = 0L;
        this.pointLimit = 0L;
    }
}
