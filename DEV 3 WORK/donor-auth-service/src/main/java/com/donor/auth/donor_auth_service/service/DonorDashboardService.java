// src/main/java/com/donor/auth/donor_auth_service/service/DonorDashboardService.java
package com.donor.auth.donor_auth_service.service;

import com.donor.auth.donor_auth_service.service.DonationServiceClient;
import com.donor.auth.donor_auth_service.dto.DonationHistoryItem;
import com.donor.auth.donor_auth_service.dto.DonorDashboardResponse;
import com.donor.auth.donor_auth_service.dto.ProfileDto;
import com.donor.auth.donor_auth_service.entity.Donor;
import com.donor.auth.donor_auth_service.repository.DonorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class DonorDashboardService {

    private final DonorRepository donorRepository;
    private final DonationServiceClient donationServiceClient;

    public DonorDashboardService(DonorRepository donorRepository,
                                 DonationServiceClient donationServiceClient) {
        this.donorRepository = donorRepository;
        this.donationServiceClient = donationServiceClient;
    }

    @Transactional(readOnly = true)
    public DonorDashboardResponse getDashboard(Integer donorId) {
        Donor donor = donorRepository.findById(donorId)
                .orElseThrow(() -> new IllegalArgumentException("Donor not found: " + donorId));

        // Profile
        ProfileDto profile = new ProfileDto(
                donor.getUserId(),
                donor.getUserName(),
                donor.getUserEmail(),
                donor.getUserBloodType(),
                donor.getUserLocation(),
                donor.getUserPhone(),
                donor.getImageType()
        );

        // Donation history from donation service
        List<DonationHistoryItem> history = donationServiceClient.fetchDonationsByDonor(donorId);

        // Counts
        int total = history.size();
        int pending = (int) history.stream()
                .filter(h -> h.getStatus() != null && h.getStatus().equalsIgnoreCase("PENDING"))
                .count();

        // Available donation types from donor profile (comma-separated string)
        List<String> donationTypes = (donor.getAvailableDonationTypes() == null || donor.getAvailableDonationTypes().isBlank())
                ? List.of()
                : Arrays.stream(donor.getAvailableDonationTypes().split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();

        return new DonorDashboardResponse(profile, total, pending, history, donationTypes);
    }

    @Transactional
    public void updateAvailableDonationTypes(Integer donorId, List<String> types) {
        Donor donor = donorRepository.findById(donorId)
                .orElseThrow(() -> new IllegalArgumentException("Donor not found: " + donorId));

        String value = (types == null || types.isEmpty())
                ? null
                : String.join(",", types);

        donor.setAvailableDonationTypes(value);
        donorRepository.save(donor);
    }
}
