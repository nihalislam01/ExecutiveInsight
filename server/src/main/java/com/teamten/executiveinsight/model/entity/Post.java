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
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String title;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "business_title_id")
    private BusinessTitle businessTitle;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<UserJoinWorkspace> userJoinWorkspaces = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "post_add_workspace",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "workspace_id")
    )
    private List<Workspace> workspaces = new ArrayList<>();
    public Post(String title, BusinessTitle businessTitle) {
        this.title = title;
        this.businessTitle = businessTitle;
    }
}
