package com.teamten.executiveinsight.controllers;

import com.stripe.model.Subscription;
import com.teamten.executiveinsight.model.entity.Payment;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.request.PaymentRequest;
import com.teamten.executiveinsight.services.PaymentService;
import com.teamten.executiveinsight.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static java.util.Objects.nonNull;

@RestController
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final UserService userService;
    @PostMapping("/create-payment")
    public ResponseEntity<String> subscription(@RequestBody PaymentRequest paymentRequest) {
        try {
            Users user = userService.getUser(paymentRequest.email()).orElseThrow(EntityNotFoundException::new);
            Payment payment = paymentService.createSubscription(paymentRequest, user);
            user.setPayment(payment);
            user.setRole("CONSUMER");
            userService.updateUser(user);
            return ResponseEntity.ok("Payment successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error making payment");
        }
    }
    @DeleteMapping("/subscription/{id}")
    public ResponseEntity<String> cancelSubscription(@PathVariable String id){

        Subscription subscription = paymentService.cancelSubscription(id);
        if(nonNull(subscription)){

            return ResponseEntity.ok(subscription.getStatus());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error cancelling subscription");
    }

}

