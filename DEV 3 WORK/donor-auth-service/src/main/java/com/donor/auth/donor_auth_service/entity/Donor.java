// src/main/java/com/donor/auth/donor_auth_service/entity/Donor.java
package com.donor.auth.donor_auth_service.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity
@Table(name = "donors")
public class Donor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_name", unique = true, nullable = false)
    private String userName;

    @Column(name = "user_email", unique = true, nullable = false)
    private String userEmail;

    @JsonIgnore
    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_blood_type")
    private String userBloodType;

    @Column(name = "user_location")
    private String userLocation;

    @Column(name = "user_phone")
    private String userPhone;

    @Lob
    @Column(name = "user_image")
    private byte[] userImage;

    @Column(name = "image_type")
    private String imageType;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Comma-separated list of donation types this donor is willing/eligible to give.
     * Example: "Whole Blood,Plasma,Platelets"
     */
    @Column(name = "available_donation_types")
    private String availableDonationTypes;

    // === getters/setters ===

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

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

    public byte[] getUserImage() { return userImage; }
    public void setUserImage(byte[] userImage) { this.userImage = userImage; }

    public String getImageType() { return imageType; }
    public void setImageType(String imageType) { this.imageType = imageType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getAvailableDonationTypes() { return availableDonationTypes; }
    public void setAvailableDonationTypes(String availableDonationTypes) { this.availableDonationTypes = availableDonationTypes; }
}
