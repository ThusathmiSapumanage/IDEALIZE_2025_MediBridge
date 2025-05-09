package com.idealize.campaignservice.repository;

import java.util.List;
import com.idealize.campaignservice.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Integer> {
    List<Campaign> findByStatus(String status);
    List<Campaign> findByType(String type);
    List<Campaign> findByLocation(String location);
    List<Campaign> findByUrgencyLevel(String urgencyLevel);
    List<Campaign> findByHospitalName(String hospitalName);
}
