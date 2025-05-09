package com.idealize.feedbackservice.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "feedback_db")
public class Feedback {

    @Id
    private String id;

    private String feedbackTitle;
    private String feedbackDescription;
    private int feedbackStars;
    private String userId;
    private String userName;
    private Date timestamp = new Date();

    public Feedback() {
    }

    public Feedback(String feedbackTitle, String feedbackDescription, int feedbackStars, String userId, String userName) {
        this.feedbackTitle = feedbackTitle;
        this.feedbackDescription = feedbackDescription;
        this.feedbackStars = feedbackStars;
        this.userId = userId;
        this.userName = userName;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getFeedbackTitle() {
        return feedbackTitle;
    }
    public void setFeedbackTitle(String feedbackTitle) {
        this.feedbackTitle = feedbackTitle;
    }

    public String getFeedbackDescription() {
        return feedbackDescription;
    }
    public void setFeedbackDescription(String feedbackDescription) {
        this.feedbackDescription = feedbackDescription;
    }

    public int getFeedbackStars() {
        return feedbackStars;
    }
    public void setFeedbackStars(int feedbackStars) {
        this.feedbackStars = feedbackStars;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
