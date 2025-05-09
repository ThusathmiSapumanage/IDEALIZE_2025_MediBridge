package com.idealize.feedbackservice.service;

import com.idealize.feedbackservice.entity.Feedback;
import com.idealize.feedbackservice.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback getFeedbackById(String id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    public void deleteFeedback(String id) {
        feedbackRepository.deleteById(id);
    }

    public Feedback updateFeedback(String id, Feedback feedback) {
        Feedback existingFeedback = feedbackRepository.findById(id).orElse(null);
        if (existingFeedback != null) {
            existingFeedback.setFeedbackTitle(feedback.getFeedbackTitle());
            existingFeedback.setFeedbackDescription(feedback.getFeedbackDescription());
            existingFeedback.setFeedbackStars(feedback.getFeedbackStars());
            return feedbackRepository.save(existingFeedback);
        }
        return null;
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getFeedbackByUserId(String userId) {
        return feedbackRepository.findByUserId(userId);
    }

    public List<Feedback> getFeedbackByUserName(String userName) {
        return feedbackRepository.findByUserName(userName);
    }

    public List<Feedback> getFeedbackByStars(int stars) {
        return feedbackRepository.findByFeedbackStars(stars);
    }

    public List<Feedback> getFeedbackByTitle(String title) {
        return feedbackRepository.findByFeedbackTitle(title);
    }

    public List<Feedback> getFeedbackByDateRange(Date startDate, Date endDate) {
        return feedbackRepository.findByTimestampBetween(startDate, endDate);
    }
}
