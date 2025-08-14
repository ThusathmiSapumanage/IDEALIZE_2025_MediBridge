// NGOProfile.jsx
import React, { useState } from 'react';
import styles from '../styles/NGOProfile.module.css';

const NGOProfile = ({ user }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Here you would typically make an API call to save the changes
    alert("Profile updated successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const userAvatar = profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=2563EB&color=fff`;

  return (
    <>
      <div 
        className={styles.userProfile} 
        onClick={() => setShowProfilePopup(true)}
      >
        <div className={styles.avatar}>
          <img src={userAvatar} alt={profileData.name} />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{profileData.name}</span>
          <span className={styles.userEmail}>{profileData.email}</span>
        </div>
      </div>

      {showProfilePopup && (
        <div className={styles.profilePopup}>
          <div className={styles.popupContent}>
            <div className={styles.popupHeader}>
              <h3>Edit Profile</h3>
              <button 
                className={styles.closeBtn}
                onClick={() => {
                  setShowProfilePopup(false);
                  setEditMode(false);
                }}
              >
                &times;
              </button>
            </div>

            <div className={styles.profileForm}>
              <div className={styles.avatarUpload}>
                <label htmlFor="avatar-upload">
                  <img 
                    src={userAvatar} 
                    alt="Profile" 
                    className={styles.profileAvatar}
                  />
                  {editMode && (
                    <div className={styles.uploadOverlay}>
                      <span>Change</span>
                    </div>
                  )}
                </label>
                {editMode && (
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                ) : (
                  <div className={styles.formValue}>{profileData.name}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                ) : (
                  <div className={styles.formValue}>{profileData.email}</div>
                )}
              </div>

              <div className={styles.formActions}>
                {editMode ? (
                  <>
                    <button 
                      className={styles.saveBtn}
                      onClick={handleSave}
                    >
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
                  <button 
                    className={styles.editBtn}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NGOProfile;