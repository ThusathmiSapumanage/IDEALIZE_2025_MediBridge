package com.idealize.notificationservice.service;

import com.idealize.notificationservice.model.EmailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(EmailRequest request) throws MessagingException {

        String subject;
        String body;

        switch(request.getType())
        {
            case "campaign_created":
                subject = "Campaign Created!";
                body = "<h3>Campaign <b>" + request.getVariables().get("title") +
                        "</b> was created by " + request.getVariables().get("hospitalName") + "</h3>";
                break;

            case "campaign_updated":
                subject = "Campaign Updated!";
                body = "<h3>Campaign <b>" + request.getVariables().get("title") +
                        "</b> was updated by " + request.getVariables().get("hospitalName") + "</h3>";
                break;

            case "campaign_deleted":
                subject = "Campaign Deleted!";
                body = "<h3>Campaign <b>" + request.getVariables().get("title") +
                        "</b> was deleted by " + request.getVariables().get("hospitalName") + "</h3>";
                break;

            case "urgent_alert":
                subject = "Urgent Alert!";
                body = "<h3>Urgent alert for campaign <b>" + request.getVariables().get("title") +
                        "</b> by " + request.getVariables().get("hospitalName") + "</h3>";
                break;

                case "account_created":
                subject = "Account Created!";
                body =  "<h3> Your account has been created! To see more details, please visit the Account page.</h3>";
                break;

                case "account_updated":
                subject = "Account Updated!";
                body =  "<h3> Your account has been updated! To see more details, please visit the Account page.</h3>";
                break;

                case "account_deleted":
                subject = "Account Deleted!";
                body =  "<h3> Your account has been deleted! To see more details, please visit the Account page.</h3>";
                break;

            default:
                subject = "Notification";
                body =  "<h3> You have a new notification! To see more details, please visit the site.</h3>";
                break;
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(request.getTo());
        helper.setSubject(subject);
        helper.setText(body, true);
        mailSender.send(message);
    }
}
