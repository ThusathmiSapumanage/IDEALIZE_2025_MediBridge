// src/main/java/com/donor/auth/donor_auth_service/dto/DonorDashboardResponse.java
package com.donor.auth.donor_auth_service.dto;

import java.util.List;

public class DonorDashboardResponse {
    private ProfileDto profile;
    private int totalDonations;
    private int pendingDonations;
    private List<DonationHistoryItem> donationHistory;
    private List<String> availableDonationTypes;

    public DonorDashboardResponse() {}

    public DonorDashboardResponse(ProfileDto profile, int totalDonations, int pendingDonations,
                                  List<DonationHistoryItem> donationHistory, List<String> availableDonationTypes) {
        this.profile = profile;
        this.totalDonations = totalDonations;
        this.pendingDonations = pendingDonations;
        this.donationHistory = donationHistory;
        this.availableDonationTypes = availableDonationTypes;
    }

    public ProfileDto getProfile() { return profile; }
    public void setProfile(ProfileDto profile) { this.profile = profile; }

    public int getTotalDonations() { return totalDonations; }
    public void setTotalDonations(int totalDonations) { this.totalDonations = totalDonations; }

    public int getPendingDonations() { return pendingDonations; }
    public void setPendingDonations(int pendingDonations) { this.pendingDonations = pendingDonations; }

    public List<DonationHistoryItem> getDonationHistory() { return donationHistory; }
    public void setDonationHistory(List<DonationHistoryItem> donationHistory) { this.donationHistory = donationHistory; }

    public List<String> getAvailableDonationTypes() { return availableDonationTypes; }
    public void setAvailableDonationTypes(List<String> availableDonationTypes) { this.availableDonationTypes = availableDonationTypes; }
}
