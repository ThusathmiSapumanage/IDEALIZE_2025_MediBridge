package com.ngo.auth.dto;

import jakarta.validation.constraints.NotBlank;

public class NgoLoginRequest {
    @NotBlank(message = "NGO name is required")
    private String ngoName;

    @NotBlank(message = "Password is required")
    private String ngoPassword;

    public NgoLoginRequest(String ngoName, String ngoPassword) {
        this.ngoName = ngoName;
        this.ngoPassword = ngoPassword;
    }

    public String getNgoName() {
        return ngoName;
    }

    public String getNgoPassword() {
        return ngoPassword;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }

    public void setNgoPassword(String ngoPassword) {
        this.ngoPassword = ngoPassword;
    }
}
