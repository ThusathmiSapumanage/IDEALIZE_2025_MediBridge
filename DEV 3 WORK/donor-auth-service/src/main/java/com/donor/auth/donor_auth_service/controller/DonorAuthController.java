package com.donor.auth.donor_auth_service.controller;

import com.donor.auth.donor_auth_service.dto.*;
import com.donor.auth.donor_auth_service.service.DonorAuthService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
@RequestMapping("/api/donor")
public class DonorAuthController {
    private final DonorAuthService donorAuthService;

    public DonorAuthController(DonorAuthService donorAuthService) {
        this.donorAuthService = donorAuthService;
    }

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> registerDonor(
            @ModelAttribute DonorRegistrationRequest request,
            @RequestParam("userImage") MultipartFile userImage) {
        try {
            return ResponseEntity.ok(donorAuthService.registerDonor(request, userImage));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing image: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginDonor(@RequestBody DonorLoginRequest request) {
        try {
            return ResponseEntity.ok(donorAuthService.loginDonor(
                    request.getUserName(),
                    request.getUserPassword()
            ));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @GetMapping("/find/{userId}")
    public ResponseEntity<?> findDonorById(@PathVariable Integer userId) {
        try {
            return ResponseEntity.ok(donorAuthService.findDonorById(userId));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @GetMapping("/findByName/{userName}")
    public ResponseEntity<?> findDonorByName(@PathVariable String userName) {
        try {
            return ResponseEntity.ok(donorAuthService.findDonorByUserName(userName));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @PutMapping(value = "/update/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateDonor(
            @PathVariable Integer userId,
            @ModelAttribute DonorUpdateRequest request,
            @RequestParam(value = "userImage", required = false) MultipartFile userImage) {
        try {
            return ResponseEntity.ok(donorAuthService.updateDonor(userId, request, userImage));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing image: " + e.getMessage());
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteDonor(@PathVariable Integer userId) {
        try {
            return ResponseEntity.ok(donorAuthService.deleteDonor(userId));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }
}