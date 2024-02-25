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
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workspaceId;
    private String name;
    @NaturalId(mutable = true)
    private String code;

    @ManyToMany(mappedBy = "workspaces")
    private List<Users> users = new ArrayList<>();
}
