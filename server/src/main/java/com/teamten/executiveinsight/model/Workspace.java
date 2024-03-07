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
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workspaceId;
    private String name;

    @NaturalId(mutable = true)
    private String code;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "business_title_id")
    private BusinessTitle businessTitle;

    @JsonIgnore
    @OneToMany(mappedBy = "workspace")
    private List<UserJoinWorkspace> userJoinWorkspaces = new ArrayList<>();

    @OneToMany(mappedBy = "workspace")
    private List<Team> teams;

    @ManyToMany(mappedBy = "workspaces")
    private List<Post> posts = new ArrayList<>();
}
