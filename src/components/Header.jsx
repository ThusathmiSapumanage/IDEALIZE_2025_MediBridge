import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  
  // Sample user data (replace with actual data from your registration)
  const userProfile = {
    name: "Chanul Liyanage",
    type: "Donor",
    email: "chanul@example.com",
    phone: "+94 76 123 4567",
    joinDate: "15 March 2024",
    donations: 5,
    totalAmount: "Rs. 25,000"
  };

  return (
    <header className="app-header">
      <div className="header-content container">
        <h1 className="header-title">MediBridge</h1>
        <div className="profile-container">
          <div 
            className="user-info"
            onClick={() => setShowProfile(!showProfile)}
          >
            <span className="user-icon">👤</span>
            <span className="user-name">Profile</span>
          </div>
          
          {showProfile && (
            <div className="profile-card">
              <div className="profile-header">
                <h3>{userProfile.name}</h3>
                <span className="user-type">{userProfile.type}</span>
              </div>
              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span>{userProfile.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span>{userProfile.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Member Since:</span>
                  <span>{userProfile.joinDate}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Donations:</span>
                  <span>{userProfile.donations}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Amount:</span>
                  <span>{userProfile.totalAmount}</span>
                </div>
              </div>
              <button className="logout-btn">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;