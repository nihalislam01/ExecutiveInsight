package com.teamten.executiveinsight.events.notification;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.services.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class SendNotificationEvent extends ApplicationEvent {
    private String email;
    private String description;

    public SendNotificationEvent(String email, String description) {
        super(email);
        this.email = email;
        this.description = description;
    }
}
