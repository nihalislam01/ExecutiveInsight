package com.teamten.executiveinsight.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class BusinessTitle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long businessTitleId;
    private String title;

    @OneToMany(mappedBy = "businessTitle", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Post> posts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "businessTitle", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Workspace> workspaces = new ArrayList<>();
    public BusinessTitle(String title) {
        this.title = title;
    }
}
