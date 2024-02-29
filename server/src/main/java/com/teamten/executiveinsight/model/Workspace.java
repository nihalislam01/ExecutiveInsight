package com.teamten.executiveinsight.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @OneToOne
    @JoinColumn(name = "business_title_id")
    private BusinessTitle businessTitle;

    @NaturalId(mutable = true)
    private String code;

    @JsonIgnore
    @ManyToMany(mappedBy = "workspaces")
    private List<Users> users = new ArrayList<>();
}
