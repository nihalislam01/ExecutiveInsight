package com.teamten.executiveinsight.model.request;

public record PaymentRequest(String cardNumber, String expMonth, String expYear, String cvc, String email, String name, String priceId, long numberOfLicense) {
}
