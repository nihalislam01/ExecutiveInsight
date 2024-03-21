package com.teamten.executiveinsight.security;

import com.teamten.executiveinsight.model.entity.Users;

public record JwtTokenResponse(String token, Users user) {}
