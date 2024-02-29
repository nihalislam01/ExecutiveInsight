package com.teamten.executiveinsight.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long notificationId;
    String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    Users user;
}
