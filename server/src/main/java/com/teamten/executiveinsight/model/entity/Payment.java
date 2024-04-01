package com.teamten.executiveinsight.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;
    private String stripeCustomerId;
    private String stripeSubscriptionId;
    private String stripePaymentMethodId;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

}
