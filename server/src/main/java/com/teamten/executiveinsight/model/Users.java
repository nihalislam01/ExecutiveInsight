package com.teamten.executiveinsight.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String name;
    @NaturalId(mutable = true)
    private String email;
    private String password;
    private String role;
    private boolean isEnable;

    @OneToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @ManyToMany
    @JoinTable(
            name = "user_join_workspace",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "workspace_id")
    )
    private List<Workspace> workspaces = new ArrayList<>();
}
