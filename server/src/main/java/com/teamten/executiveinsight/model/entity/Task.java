package com.teamten.executiveinsight.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    private String name;
    private String description;
    private String status;
    private String quantity;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isAssigned;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;
}
