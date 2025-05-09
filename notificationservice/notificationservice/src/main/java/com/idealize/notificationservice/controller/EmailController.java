package com.idealize.notificationservice.controller;

import com.idealize.notificationservice.model.EmailRequest;
import com.idealize.notificationservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emails")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public String sendEmail(@RequestBody EmailRequest emailRequest)
    {
        try
        {
            emailService.sendEmail(emailRequest);
            return "Email sent successfully";
        }
        catch (Exception e)
        {
            return "Error sending email: " + e.getMessage();
        }
    }
}
