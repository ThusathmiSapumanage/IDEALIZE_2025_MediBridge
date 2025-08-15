package com.donor.auth.donor_auth_service.dto;

import java.time.LocalDateTime;

public class DonationHistoryItem {
    private String donationId;
    private String donationType;   // e.g., Whole Blood, Plasma, Platelets
    private String hospitalName;   // provided by donations service / stored with donation
    private String status;         // e.g., COMPLETED, PENDING, CANCELLED
    private LocalDateTime createdAt;

    public DonationHistoryItem() {}

    public DonationHistoryItem(String donationId, String donationType, String hospitalName, String status, LocalDateTime createdAt) {
        this.donationId = donationId;
        this.donationType = donationType;
        this.hospitalName = hospitalName;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getDonationId() { return donationId; }
    public void setDonationId(String donationId) { this.donationId = donationId; }

    public String getDonationType() { return donationType; }
    public void setDonationType(String donationType) { this.donationType = donationType; }

    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
