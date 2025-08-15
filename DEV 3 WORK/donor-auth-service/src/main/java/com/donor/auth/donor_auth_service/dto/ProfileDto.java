// src/main/java/com/donor/auth/donor_auth_service/dto/ProfileDto.java
package com.donor.auth.donor_auth_service.dto;

public class ProfileDto {
    private Integer userId;
    private String userName;
    private String userEmail;
    private String userBloodType;
    private String userLocation;
    private String userPhone;
    private String imageType; // you can expose a separate endpoint for the image bytes if needed

    public ProfileDto() {}

    public ProfileDto(Integer userId, String userName, String userEmail, String userBloodType,
                      String userLocation, String userPhone, String imageType) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userBloodType = userBloodType;
        this.userLocation = userLocation;
        this.userPhone = userPhone;
        this.imageType = imageType;
    }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserBloodType() { return userBloodType; }
    public void setUserBloodType(String userBloodType) { this.userBloodType = userBloodType; }

    public String getUserLocation() { return userLocation; }
    public void setUserLocation(String userLocation) { this.userLocation = userLocation; }

    public String getUserPhone() { return userPhone; }
    public void setUserPhone(String userPhone) { this.userPhone = userPhone; }

    public String getImageType() { return imageType; }
    public void setImageType(String imageType) { this.imageType = imageType; }
}
