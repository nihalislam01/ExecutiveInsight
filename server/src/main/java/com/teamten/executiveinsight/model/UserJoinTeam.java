package com.teamten.executiveinsight.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class UserJoinTeam {
    @Id
    @GeneratedValue
    Long userJoinTeamId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
