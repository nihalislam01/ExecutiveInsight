package com.teamten.executiveinsight.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String bio;
    private boolean isEnable;

    @Lob
    private byte[] photo;

    @Lob
    private byte[] badge;

    @OneToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Notification> notifications = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<UserJoinWorkspace> userJoinWorkspaces = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<UserJoinTeam> userJoinTeams = new ArrayList<>();
}
