package com.teamten.executiveinsight.services;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "api.google.calendar")
@Data
public class CalendarConfiguration {
    String calendarId;
    String filePath;
}
