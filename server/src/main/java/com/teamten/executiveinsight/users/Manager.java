package com.teamten.executiveinsight.users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.NaturalId;

@Entity
@Data
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @NaturalId(mutable = true)
    private String email;
    private String password;
    private String role;
    private boolean isEnable;
}
