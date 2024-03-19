package com.teamten.executiveinsight.events.email;

import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.services.VerificationTokenService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailCompleteEventListener implements ApplicationListener<EmailCompleteEvent> {

    private final VerificationTokenService verificationTokenService;
    private final JavaMailSender mailSender;
    private final EmailConfiguration emailConfiguration;
    private Users theUser;
    @Override
    public void onApplicationEvent(EmailCompleteEvent event) {
        theUser = event.getUser();
        String verificationToken = UUID.randomUUID().toString();
        verificationTokenService.addToken(theUser, verificationToken);
        try {
            if (event.isDidForgetPassword()) {
                String url = event.getApplicationUrl()+"/verify-email/" + verificationToken + "/true";
                sendForgotPasswordEmail(url);
            } else {
                String url = event.getApplicationUrl()+"/verify-email/" + verificationToken + "/false";
                sendVerificationEmail(url);
            }
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
    public void sendVerificationEmail(String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "Email Verification";
        String senderName = "Executive Insight";
        String mailContent = "<p> Hello "+ theUser.getName()+ ", </p>"+
                "<p>Embark on your journey in development management with us. "+
                "Please, follow the link below to complete your registration.</p>"+
                "<a href=\"" +url+ "\">Activate your account</a>"+
                "<p> Thank you <br> Executive Insight";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom(emailConfiguration.getUsername(), senderName);
        messageHelper.setTo(theUser.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }
    public void sendForgotPasswordEmail(String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "Reset Password";
        String senderName = "Executive Insight";
        String mailContent = "<p> Hello "+ theUser.getName()+ ", </p>"+
                "<p>Please, follow the link below to reset your password</p>"+
                "<a href=\"" +url+ "\">Reset your password</a>"+
                "<p> Thank you <br> Executive Insight";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom(emailConfiguration.getUsername(), senderName);
        messageHelper.setTo(theUser.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }
}
