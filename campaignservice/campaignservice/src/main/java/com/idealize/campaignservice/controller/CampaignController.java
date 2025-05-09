package com.idealize.campaignservice.controller;

import java.util.List;
import java.util.Optional;
import com.idealize.campaignservice.entity.Campaign;
import com.idealize.campaignservice.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/campaigns")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping
    public Campaign createCampaign(Campaign campaign) {
        return campaignService.create(campaign);
    }

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @GetMapping("/{id}")
    public Optional<Campaign> getCampaignById(@PathVariable int id) {
        return campaignService.getCampaignById(id);
    }

    @PutMapping("/{id}")
    public Optional<Campaign> updateCampaign(@PathVariable int id, @RequestBody Campaign campaign) {
        return campaignService.updateCampaign(id, campaign);
    }

    @DeleteMapping("/{id}")
    public void deleteCampaign(@PathVariable int id) {
        campaignService.deleteCampaign(id);
    }

    @GetMapping("/status/{status}")
    public List<Campaign> getCampaignsByStatus(@PathVariable String status) {
        return campaignService.getCampaignsByStatus(status);
    }

    @GetMapping("/type/{type}")
    public List<Campaign> getCampaignsByType(@PathVariable String type) {
        return campaignService.getCampaignsByType(type);
    }

    @GetMapping("/location/{location}")
    public List<Campaign> getCampaignsByLocation(@PathVariable String location) {
        return campaignService.getCampaignsByLocation(location);
    }

    @GetMapping("/urgency/{urgencyLevel}")
    public List<Campaign> getCampaignsByUrgencyLevel(@PathVariable String urgencyLevel) {
        return campaignService.getCampaignsByUrgencyLevel(urgencyLevel);
    }

    @GetMapping("/hospital/{hospitalName}")
    public List<Campaign> getCampaignsByHospitalName(@PathVariable String hospitalName) {
        return campaignService.getCampaignsByHospitalName(hospitalName);
    }

}
