import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Chanul Liyanage",
    type: "Donor",
    email: "chanul@example.com",
    phone: "+94 76 123 4567",
    joinDate: "15 March 2024",
    donations: 5,
    totalAmount: "Rs. 25,000",
    profileImage: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // API call to save changes would go here
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      // API call to delete account would go here
      alert("Account deletion requested");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
            {userProfile.profileImage ? (
              <img
                src={userProfile.profileImage}
                alt="Profile"
                className="profile-avatar"
              />
            ) : (
              <span className="profile-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="currentColor"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </span>
            )}
            <span className="user-name">Profile</span>
          </div>

          {showProfile && (
            <div className="profile-card">
              <div className="profile-header">
                {editMode ? (
                  <div className="profile-image-upload">
                    <label htmlFor="profile-upload">
                      {userProfile.profileImage ? (
                        <img
                          src={userProfile.profileImage}
                          alt="Profile"
                          className="profile-avatar-large"
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                ) : userProfile.profileImage ? (
                  <img
                    src={userProfile.profileImage}
                    alt="Profile"
                    className="profile-avatar-large"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                )}

                <div className="profile-title">
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={userProfile.name}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <>
                      <h3>{userProfile.name}</h3>
                      <span className="user-type">{userProfile.type}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={userProfile.email}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <span className="detail-value">{userProfile.email}</span>
                  )}
                </div>

                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={userProfile.phone}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <span className="detail-value">{userProfile.phone}</span>
                  )}
                </div>

                <div className="detail-row">
                  <span className="detail-label">Member Since:</span>
                  <span className="detail-value">{userProfile.joinDate}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Total Donations:</span>
                  <span className="detail-value">{userProfile.donations}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Total Amount:</span>
                  <span className="detail-value">{userProfile.totalAmount}</span>
                </div>
              </div>

              <div className="profile-actions">
                {editMode ? (
                  <>
                    <button className="save-btn" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="logout-btn"
                      onClick={() => alert("Logging out...")}
                    >
                      Log Out
                    </button>
                  </>
                )}

                <button
                  className="delete-account-btn"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;