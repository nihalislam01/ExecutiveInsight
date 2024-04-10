package com.teamten.executiveinsight.services;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "api.stripe")
@Data
public class StripeConfiguration {
    private String secretKey;
}
