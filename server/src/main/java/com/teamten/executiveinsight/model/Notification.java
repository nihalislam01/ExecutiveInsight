package com.teamten.executiveinsight.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    private String description;
    private LocalDateTime time = LocalDateTime.now();
    private String workspaceCode;
    private String userEmail;
    private boolean isInvitation = false;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
