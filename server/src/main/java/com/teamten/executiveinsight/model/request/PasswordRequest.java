package com.teamten.executiveinsight.model.request;

public record PasswordRequest(String email, String oldPassword, String newPassword) {
}
