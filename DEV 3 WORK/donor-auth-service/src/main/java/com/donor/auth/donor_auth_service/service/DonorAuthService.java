package com.donor.auth.donor_auth_service.service;

import com.donor.auth.donor_auth_service.dto.*;
import com.donor.auth.donor_auth_service.entity.Donor;
import com.donor.auth.donor_auth_service.repository.DonorRepository;
import com.donor.auth.donor_auth_service.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;

@Service
public class DonorAuthService {
    private final DonorRepository donorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public DonorAuthService(DonorRepository donorRepository,
                            PasswordEncoder passwordEncoder,
                            JwtUtil jwtUtil) {
        this.donorRepository = donorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String registerDonor(DonorRegistrationRequest request, MultipartFile userImage) throws IOException {
        // Validate email uniqueness
        if (donorRepository.findByUserEmail(request.getUserEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
        }

        // Validate username uniqueness
        if (donorRepository.findByUserName(request.getUserName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already taken");
        }

        // Create new donor entity
        Donor donor = new Donor();
        donor.setUserName(request.getUserName());
        donor.setUserEmail(request.getUserEmail());
        donor.setUserPassword(passwordEncoder.encode(request.getUserPassword()));
        donor.setUserBloodType(request.getUserBloodType());
        donor.setUserLocation(request.getUserLocation());
        donor.setUserPhone(request.getUserPhone());

        // Handle image upload
        if (userImage != null && !userImage.isEmpty()) {
            validateImageFile(userImage);
            donor.setUserImage(userImage.getBytes());
            donor.setImageType(userImage.getContentType());
        }

        donorRepository.save(donor);
        return "Donor registered successfully with ID: " + donor.getUserId();
    }

    private void validateImageFile(MultipartFile file) {
        if (!file.getContentType().startsWith("image/")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only image files are allowed");
        }
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image size exceeds 10MB limit");
        }
    }

    public String loginDonor(String userName, String password) {
        Donor donor = donorRepository.findByUserName(userName)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!passwordEncoder.matches(password, donor.getUserPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return jwtUtil.generateToken(donor.getUserName(), "donor", donor.getUserId());
    }

    public Donor findDonorById(Integer userId) {
        return donorRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public Donor findDonorByUserName(String userName) {
        return donorRepository.findByUserName(userName)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public String updateDonor(Integer userId, DonorUpdateRequest request, MultipartFile userImage) throws IOException {
        Donor existingDonor = donorRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Update username if changed
        if (request.getUserName() != null && !request.getUserName().equals(existingDonor.getUserName())) {
            donorRepository.findByUserName(request.getUserName())
                    .ifPresent(d -> {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already taken");
                    });
            existingDonor.setUserName(request.getUserName());
        }

        // Update email if changed
        if (request.getUserEmail() != null && !request.getUserEmail().equals(existingDonor.getUserEmail())) {
            donorRepository.findByUserEmail(request.getUserEmail())
                    .ifPresent(d -> {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
                    });
            existingDonor.setUserEmail(request.getUserEmail());
        }

        // Update other fields
        if (request.getUserPassword() != null) {
            existingDonor.setUserPassword(passwordEncoder.encode(request.getUserPassword()));
        }
        if (request.getUserBloodType() != null) {
            existingDonor.setUserBloodType(request.getUserBloodType());
        }
        if (request.getUserLocation() != null) {
            existingDonor.setUserLocation(request.getUserLocation());
        }
        if (request.getUserPhone() != null) {
            existingDonor.setUserPhone(request.getUserPhone());
        }

        // Update image if provided
        if (userImage != null && !userImage.isEmpty()) {
            validateImageFile(userImage);
            existingDonor.setUserImage(userImage.getBytes());
            existingDonor.setImageType(userImage.getContentType());
        }

        donorRepository.save(existingDonor);
        return "User updated successfully";
    }

    public String deleteDonor(Integer userId) {
        Donor donor = donorRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        donorRepository.delete(donor);
        return "User with ID " + userId + " deleted successfully";
    }
}