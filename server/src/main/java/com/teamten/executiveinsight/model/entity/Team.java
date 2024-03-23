package com.teamten.executiveinsight.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;
    private String name;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    @JsonIgnore
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserJoinTeam> userJoinTeams = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Delivery> deliveries = new ArrayList<>();
}

