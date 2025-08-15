// src/main/java/com/donor/auth/donor_auth_service/controller/DonorDashboardController.java
package com.donor.auth.donor_auth_service.controller;

import com.donor.auth.donor_auth_service.dto.DonorDashboardResponse;
import com.donor.auth.donor_auth_service.service.DonorDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorDashboardController {

    private final DonorDashboardService donorDashboardService;

    public DonorDashboardController(DonorDashboardService donorDashboardService) {
        this.donorDashboardService = donorDashboardService;
    }

    // GET /api/donors/{id}/dashboard
    @GetMapping("/{id}/dashboard")
    public ResponseEntity<DonorDashboardResponse> getDashboard(@PathVariable Integer id) {
        DonorDashboardResponse response = donorDashboardService.getDashboard(id);
        return ResponseEntity.ok(response);
    }

    // PUT /api/donors/{id}/available-donation-types
    @PutMapping("/{id}/available-donation-types")
    public ResponseEntity<Void> updateDonationTypes(@PathVariable Integer id,
                                                    @RequestBody List<String> types) {
        donorDashboardService.updateAvailableDonationTypes(id, types);
        return ResponseEntity.noContent().build();
    }
}
