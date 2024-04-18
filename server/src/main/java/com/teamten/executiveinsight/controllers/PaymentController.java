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
    private ResponseEntity<String> subscription(@RequestBody PaymentRequest paymentRequest) {
        try {
            Users user = userService.getUser(paymentRequest.email()).orElseThrow(EntityNotFoundException::new);
            Payment payment = paymentService.createSubscription(paymentRequest, user);
            user.setPayment(payment);
            if (user.getWorkspace()!=null) {
                user.setRole("ADMIN");
            } else {
                user.setRole("CONSUMER");
            }
            userService.updateUser(user);
            return ResponseEntity.ok(user.getRole());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error making payment");
        }
    }
    @DeleteMapping("/subscription/{email}")
    private ResponseEntity<String> cancelSubscription(@PathVariable String email){
        Users user = userService.getUser(email).orElseThrow(EntityNotFoundException::new);
        String subscriptionId = user.getPayment().getStripeSubscriptionId();
        Subscription subscription = paymentService.cancelSubscription(subscriptionId);
        if(nonNull(subscription)){
            user.setRole("USER");
            user.setPayment(null);
            userService.updateUser(user);
            paymentService.removePayment(subscriptionId);
            return ResponseEntity.ok(subscription.getStatus());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error cancelling subscription");
    }

}

