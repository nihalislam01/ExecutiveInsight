package com.teamten.executiveinsight.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    private String description;
    private LocalDate time = LocalDate.now();
    private String workspaceCode;
    private String userEmail;
    private boolean isInvitation = false;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
