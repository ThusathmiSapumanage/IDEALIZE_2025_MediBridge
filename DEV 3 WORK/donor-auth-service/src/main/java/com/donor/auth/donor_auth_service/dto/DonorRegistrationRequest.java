package com.donor.auth.donor_auth_service.dto;

public class DonorRegistrationRequest {
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userBloodType;
    private String userLocation;
    private String userPhone;

    public DonorRegistrationRequest() {
    }

    public DonorRegistrationRequest(String userName, String userEmail, String userPassword,
                                    String userBloodType, String userLocation, String userPhone) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userBloodType = userBloodType;
        this.userLocation = userLocation;
        this.userPhone = userPhone;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserBloodType() {
        return userBloodType;
    }

    public void setUserBloodType(String userBloodType) {
        this.userBloodType = userBloodType;
    }

    public String getUserLocation() {
        return userLocation;
    }

    public void setUserLocation(String userLocation) {
        this.userLocation = userLocation;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }
}

