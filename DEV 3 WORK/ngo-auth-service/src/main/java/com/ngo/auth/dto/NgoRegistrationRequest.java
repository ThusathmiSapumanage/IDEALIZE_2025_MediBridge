package com.ngo.auth.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

public class NgoRegistrationRequest {
    @NotBlank(message = "NGO name is required")
    private String ngoName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String ngoEmail;

    @NotBlank(message = "Password is required")
    private String ngoPassword;

    @NotBlank(message = "Location is required")
    private String ngoLocation;

    @NotBlank(message = "Phone number is required")
    private String ngoPhone;

    @NotBlank(message = "Services description is required")
    private String ngoServices;

    public String getNgoName() {
        return ngoName;
    }

    public String getNgoEmail() {
        return ngoEmail;
    }

    public String getNgoPassword() {
        return ngoPassword;
    }

    public String getNgoLocation() {
        return ngoLocation;
    }

    public String getNgoPhone() {
        return ngoPhone;
    }

    public String getNgoServices() {
        return ngoServices;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }

    public void setNgoEmail(String ngoEmail) {
        this.ngoEmail = ngoEmail;
    }

    public void setNgoPassword(String ngoPassword) {
        this.ngoPassword = ngoPassword;
    }

    public void setNgoLocation(String ngoLocation) {
        this.ngoLocation = ngoLocation;
    }

    public void setNgoPhone(String ngoPhone) {
        this.ngoPhone = ngoPhone;
    }

    public void setNgoServices(String ngoServices) {
        this.ngoServices = ngoServices;
    }
}