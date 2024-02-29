package com.teamten.executiveinsight.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class BusinessTitle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long businessTitleId;
    private String title;
    public BusinessTitle(String title) {
        this.title = title;
    }
}
