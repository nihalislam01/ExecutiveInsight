package com.teamten.executiveinsight.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentMethod;
import com.stripe.model.Subscription;
import com.teamten.executiveinsight.model.entity.Payment;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.request.PaymentRequest;
import com.teamten.executiveinsight.repositories.PaymentRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final StripeConfiguration stripeConfiguration;
    private final PaymentRepository paymentRepository;
    @PostConstruct
    public void init(){

        Stripe.apiKey = stripeConfiguration.getSecretKey();
    }
    public Payment createSubscription(PaymentRequest paymentRequest, Users user) {

        PaymentMethod paymentMethod = createPaymentMethod(paymentRequest);
        Customer customer = createCustomer(paymentMethod, paymentRequest);
        PaymentMethod customerAddedPaymentMethod = attachCustomerToPaymentMethod(customer, paymentMethod);
        Subscription subscription = createSubscription(paymentRequest, customerAddedPaymentMethod, customer);

        Payment newPayment = new Payment();
        newPayment.setStripePaymentMethodId(paymentMethod.getId());
        newPayment.setStripeSubscriptionId(subscription.getId());
        newPayment.setStripeCustomerId(customer.getId());
        newPayment.setUser(user);
        return paymentRepository.save(newPayment);
    }
    private PaymentMethod createPaymentMethod(PaymentRequest paymentRequest){
        try {

            Map<String, Object> cardParams = new HashMap<>();
            cardParams.put("token", "tok_visa"); // Use a test card token

            Map<String, Object> params = new HashMap<>();
            params.put("type", "card");
            params.put("card", cardParams);

            return PaymentMethod.create(params);

        } catch (StripeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    private Customer createCustomer(PaymentMethod paymentMethod, PaymentRequest paymentRequest){
        try {
            Map<String, Object> customerMap = new HashMap<>();
            customerMap.put("name", paymentRequest.name());
            customerMap.put("email", paymentRequest.email());
            customerMap.put("payment_method", paymentMethod.getId());

            return Customer.create(customerMap);
        } catch (StripeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    private PaymentMethod attachCustomerToPaymentMethod(Customer customer,PaymentMethod paymentMethod){
        try {
            PaymentMethod retrievedPaymentMethod = com.stripe.model.PaymentMethod.retrieve(paymentMethod.getId());
            Map<String, Object> params = new HashMap<>();
            params.put("customer", customer.getId());
            return retrievedPaymentMethod.attach(params);
        } catch (StripeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    private Subscription createSubscription(PaymentRequest paymentRequest, PaymentMethod paymentMethod, Customer customer){
        try {

            List<Object> items = new ArrayList<>();
            Map<String, Object> item1 = new HashMap<>();
            item1.put(
                    "price",
                    paymentRequest.priceId()
            );
            item1.put("quantity", paymentRequest.numberOfLicense());
            items.add(item1);

            Map<String, Object> params = new HashMap<>();
            params.put("customer", customer.getId());
            params.put("default_payment_method", paymentMethod.getId());
            params.put("items", items);
            return Subscription.create(params);
        } catch (StripeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    public  Subscription cancelSubscription(String subscriptionId){
        try {
            Subscription retrieve = Subscription.retrieve(subscriptionId);
            return retrieve.cancel();
        } catch (StripeException e) {
            System.out.println("Error");
        }
        return null;
    }
}
