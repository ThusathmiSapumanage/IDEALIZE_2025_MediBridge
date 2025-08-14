// DonorProfile.jsx
import React, { useState } from 'react';
import styles from '../styles/DonorProfile.module.css';

const DonorProfile = () => {
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
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
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
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        {editMode ? (
          <div className={styles.profileImageUpload}>
            <label htmlFor="profile-upload">
              {userProfile.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt="Profile"
                  className={styles.profileAvatarLarge}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
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
            className={styles.profileAvatarLarge}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <i className="fas fa-user"></i>
          </div>
        )}

        <div className={styles.profileTitle}>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={userProfile.name}
              onChange={handleInputChange}
              className={styles.profileInput}
            />
          ) : (
            <>
              <h3>{userProfile.name}</h3>
              <span className={styles.userType}>{userProfile.type}</span>
            </>
          )}
        </div>
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Email:</span>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={userProfile.email}
              onChange={handleInputChange}
              className={styles.profileInput}
            />
          ) : (
            <span className={styles.detailValue}>{userProfile.email}</span>
          )}
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Phone:</span>
          {editMode ? (
            <input
              type="tel"
              name="phone"
              value={userProfile.phone}
              onChange={handleInputChange}
              className={styles.profileInput}
            />
          ) : (
            <span className={styles.detailValue}>{userProfile.phone}</span>
          )}
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Member Since:</span>
          <span className={styles.detailValue}>{userProfile.joinDate}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Total Donations:</span>
          <span className={styles.detailValue}>{userProfile.donations}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Total Amount:</span>
          <span className={styles.detailValue}>{userProfile.totalAmount}</span>
        </div>
      </div>

      <div className={styles.profileActions}>
        {editMode ? (
          <>
            <button className={styles.saveBtn} onClick={handleSave}>
              Save Changes
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.editBtn}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
            <button
              className={styles.logoutBtn}
              onClick={() => alert("Logging out...")}
            >
              Log Out
            </button>
          </>
        )}

        <button
          className={styles.deleteAccountBtn}
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DonorProfile;