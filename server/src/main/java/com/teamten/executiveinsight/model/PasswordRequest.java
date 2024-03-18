package com.teamten.executiveinsight.model;

public record PasswordRequest(String email, String oldPassword, String newPassword) {
}
