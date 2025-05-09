package com.idealize.feedbackservice.controller;

import com.idealize.feedbackservice.entity.Feedback;
import com.idealize.feedbackservice.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public Feedback saveFeedback(@RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
    }

    @GetMapping
    public Feedback getFeedbackById(@RequestParam String id) {
        return feedbackService.getFeedbackById(id);
    }

    @DeleteMapping
    public void deleteFeedback(@RequestParam String id) {
        feedbackService.deleteFeedback(id);
    }

    @PutMapping("/update")
    public Feedback updateFeedback(@RequestParam String id, @RequestBody Feedback feedback) {
        return feedbackService.updateFeedback(id, feedback);
    }

    @GetMapping("/all")
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/userId")
    public List<Feedback> getFeedbackByUserId(@RequestParam String userId) {
        return feedbackService.getFeedbackByUserId(userId);
    }

    @GetMapping("/userName")
    public List<Feedback> getFeedbackByUserName(@RequestParam String userName) {
        return feedbackService.getFeedbackByUserName(userName);
    }

    @GetMapping("/stars")
    public List<Feedback> getFeedbackByStars(@RequestParam int stars) {
        return feedbackService.getFeedbackByStars(stars);
    }

    @GetMapping("/title")
    public List<Feedback> getFeedbackByTitle(@RequestParam String title) {
        return feedbackService.getFeedbackByTitle(title);
    }

    @GetMapping("/dateRange")
    public List<Feedback> getFeedbackByDateRange(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return feedbackService.getFeedbackByDateRange(startDate, endDate);
    }
}
