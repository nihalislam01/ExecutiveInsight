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

    @ManyToOne
    @JoinColumn(name = "business_title_id")
    private BusinessTitle businessTitle;

    @NaturalId(mutable = true)
    private String code;

    @JsonIgnore
    @ManyToMany(mappedBy = "workspaces")
    private List<Users> users = new ArrayList<>();

    @ManyToMany(mappedBy = "workspaces")
    private List<Post> posts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> invitations = new ArrayList<>();

}
