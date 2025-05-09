package com.idealize.feedbackservice.repository;

import com.idealize.feedbackservice.entity.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {

    List<Feedback> findByUserId(String userId);
    List<Feedback> findByUserName(String userName);
    List<Feedback> findByFeedbackStars(int feedbackStars);
    List<Feedback> findByFeedbackTitle(String feedbackTitle);
    List<Feedback> findByTimestampBetween(Date startDate, Date endDate);
}
