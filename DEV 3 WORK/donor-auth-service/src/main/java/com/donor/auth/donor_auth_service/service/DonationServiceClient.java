// src/main/java/com/donor/auth/donor_auth_service/client/DonationServiceClient.java
package com.donor.auth.donor_auth_service.service;

import com.donor.auth.donor_auth_service.dto.DonationHistoryItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;

import java.util.Collections;
import java.util.List;

@Component
public class DonationServiceClient {

    private final RestTemplate restTemplate;
    private final String donationServiceBaseUrl;

    public DonationServiceClient(RestTemplate restTemplate,
                                 @Value("${donation.service.base-url}") String donationServiceBaseUrl) {
        this.restTemplate = restTemplate;
        this.donationServiceBaseUrl = donationServiceBaseUrl;
    }

    public List<DonationHistoryItem> fetchDonationsByDonor(Integer donorId) {
        String url = donationServiceBaseUrl + "/api/donations?donorId={donorId}";

        try {
            ResponseEntity<List<DonationHistoryItem>> resp = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    new HttpEntity<>(new HttpHeaders()),
                    new ParameterizedTypeReference<List<DonationHistoryItem>>() {},
                    donorId
            );

            if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
                return resp.getBody();
            }
        } catch (Exception e) {
            // Log if you have a logger
        }

        return Collections.emptyList();
    }
}
