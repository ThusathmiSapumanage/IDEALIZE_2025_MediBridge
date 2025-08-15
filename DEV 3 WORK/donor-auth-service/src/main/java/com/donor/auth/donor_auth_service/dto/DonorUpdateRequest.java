package com.donor.auth.donor_auth_service.dto;

public class DonorUpdateRequest {
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userBloodType;
    private String userLocation;
    private String userPhone;

    // Getters and Setters
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public String getUserPassword() { return userPassword; }
    public void setUserPassword(String userPassword) { this.userPassword = userPassword; }
    public String getUserBloodType() { return userBloodType; }
    public void setUserBloodType(String userBloodType) { this.userBloodType = userBloodType; }
    public String getUserLocation() { return userLocation; }
    public void setUserLocation(String userLocation) { this.userLocation = userLocation; }
    public String getUserPhone() { return userPhone; }
    public void setUserPhone(String userPhone) { this.userPhone = userPhone; }
}