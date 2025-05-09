package com.idealize.campaignservice.service;

import com.idealize.campaignservice.entity.Campaign;
import com.idealize.campaignservice.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    public Campaign create(Campaign campaign) {
        campaign.setStatus("Active");
        campaign.setDeadline(LocalDateTime.now()); // Assuming deadline is set to current time for simplicity
        campaign.setCreatedAt(LocalDateTime.now());
        campaign.setUpdatedAt(LocalDateTime.now());
        return campaignRepository.save(campaign);
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Optional<Campaign> getCampaignById(int id) {
        return campaignRepository.findById(id);
    }

    public Optional<Campaign> updateCampaign(int id, Campaign campaign) {
        Optional<Campaign> existingCampaignOpt = getCampaignById(id);
        if (existingCampaignOpt.isPresent()) {
            Campaign existingCampaign = existingCampaignOpt.get();
            existingCampaign.setTitle(campaign.getTitle());
            existingCampaign.setDescription(campaign.getDescription());
            existingCampaign.setType(campaign.getType());
            existingCampaign.setUrgencyLevel(campaign.getUrgencyLevel());
            existingCampaign.setLocation(campaign.getLocation());
            existingCampaign.setHospitalName(campaign.getHospitalName());
            existingCampaign.setExpectedQuantity(campaign.getExpectedQuantity());
            existingCampaign.setDeadline(campaign.getDeadline());
            existingCampaign.setUpdatedAt(LocalDateTime.now());
            return Optional.of(campaignRepository.save(existingCampaign));
        }
        return Optional.empty();
    }

    public void deleteCampaign(int id) {
        campaignRepository.deleteById(id);
    }

    public List<Campaign> getCampaignsByStatus(String status) {
        return campaignRepository.findByStatus(status);
    }

    public List<Campaign> getCampaignsByType(String type) {
        return campaignRepository.findByType(type);
    }

    public List<Campaign> getCampaignsByLocation(String location) {
        return campaignRepository.findByLocation(location);
    }

    public List<Campaign> getCampaignsByUrgencyLevel(String urgencyLevel) {
        return campaignRepository.findByUrgencyLevel(urgencyLevel);
    }

    public List<Campaign> getCampaignsByHospitalName(String hospitalName) {
        return campaignRepository.findByHospitalName(hospitalName);
    }
}
