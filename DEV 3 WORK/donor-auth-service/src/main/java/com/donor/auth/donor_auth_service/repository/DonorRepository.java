package com.donor.auth.donor_auth_service.repository;

import com.donor.auth.donor_auth_service.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DonorRepository extends JpaRepository<Donor, Integer> {
    Optional<Donor> findByUserEmail(String userEmail);
    Optional<Donor> findByUserName(String userName);
    boolean existsByUserName(String userName);
}