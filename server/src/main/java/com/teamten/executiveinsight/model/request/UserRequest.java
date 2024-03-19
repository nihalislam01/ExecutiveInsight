package com.teamten.executiveinsight.model.request;

public record UserRequest(String name, String email, String password, String bio, String location) {
}
