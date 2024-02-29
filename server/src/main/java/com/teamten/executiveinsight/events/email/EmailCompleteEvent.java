package com.teamten.executiveinsight.events.email;

import com.teamten.executiveinsight.model.Users;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class EmailCompleteEvent extends ApplicationEvent {

    private Users user;
    private String applicationUrl;
    private boolean didForgetPassword;

    public EmailCompleteEvent(Users user, String applicationUrl, boolean didForgetPassword) {
        super(user);
        this.user = user;
        this.applicationUrl = applicationUrl;
        this.didForgetPassword = didForgetPassword;
    }
}
