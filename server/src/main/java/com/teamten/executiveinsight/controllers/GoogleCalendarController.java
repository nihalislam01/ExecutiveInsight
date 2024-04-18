package com.teamten.executiveinsight.controllers;

import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.teamten.executiveinsight.model.request.TaskRequest;
import com.teamten.executiveinsight.services.CalendarConfiguration;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class GoogleCalendarController {
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private final CalendarConfiguration calendarConfiguration;

    @PostMapping("/create-event")
    public ResponseEntity <String> createEvent(@RequestBody TaskRequest taskRequest) throws IOException, GeneralSecurityException {
        System.out.printf(taskRequest.endDate());
        HttpTransport httpTransport = new NetHttpTransport();
        InputStream inputStream = GoogleCalendarController.class.getResourceAsStream(calendarConfiguration.getFilePath());
        if (inputStream == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to load service account key file");
        }
        GoogleCredentials credentials = GoogleCredentials.fromStream(
                Objects.requireNonNull(GoogleCalendarController.class.getResourceAsStream(calendarConfiguration.getFilePath()))).createScoped(Collections.singleton(CalendarScopes.CALENDAR));

        Calendar service = new Calendar.Builder(httpTransport, JSON_FACTORY, new HttpCredentialsAdapter(credentials))
                .setApplicationName("Executive Insight")
                .build();

        LocalDateTime startTime = LocalDateTime.now().plusHours(0);

        EventDateTime start = new EventDateTime()
                .setDateTime(new com.google.api.client.util.DateTime(startTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()))
                .setTimeZone(ZoneId.systemDefault().getId());
        Event task = new Event()
                .setSummary(taskRequest.name())
                .setDescription(taskRequest.description());

        EventDateTime dueDateTime = new EventDateTime()
                .setDateTime(new com.google.api.client.util.DateTime(taskRequest.endDate()+"T"+LocalTime.now()))
                .setTimeZone(ZoneId.systemDefault().getId());
        task.setStart(start);
        task.setEnd(dueDateTime);

        service.events().insert(calendarConfiguration.getCalendarId(), task).execute();

        return ResponseEntity.ok("Event Created Successfully");
    }
}

