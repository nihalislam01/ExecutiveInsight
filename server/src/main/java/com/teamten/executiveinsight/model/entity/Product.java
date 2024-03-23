package com.teamten.executiveinsight.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private String name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

}
