// NGOProfile.jsx
import React, { useState } from 'react';
import styles from '../styles/NGOProfile.module.css';
import { FiEdit, FiUpload, FiCheck, FiX, FiUser } from 'react-icons/fi';

const NGOProfile = ({ user }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio || "Tell us about your organization...",
    website: user.website || "",
    phone: user.phone || ""
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

  const userAvatar = profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=2563EB&color=fff&bold=true`;

  return (
    <>
      <div 
        className={styles.userProfile} 
        onClick={() => setShowProfilePopup(true)}
      >
        <div className={styles.avatar}>
          {profileData.avatar ? (
            <img src={userAvatar} alt={profileData.name} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <FiUser size={20} />
            </div>
          )}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{profileData.name}</span>
          <span className={styles.userEmail}>{profileData.email}</span>
        </div>
        <div className={styles.editIndicator}>
          <FiEdit size={14} />
        </div>
      </div>

      {showProfilePopup && (
        <div className={styles.profilePopup}>
          <div className={styles.popupContent}>
            <div className={styles.popupHeader}>
              <h3>Organization Profile</h3>
              <button 
                className={styles.closeBtn}
                onClick={() => {
                  setShowProfilePopup(false);
                  setEditMode(false);
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            <div className={styles.profileForm}>
              <div className={styles.avatarUpload}>
                <label htmlFor="avatar-upload">
                  {profileData.avatar ? (
                    <img 
                      src={userAvatar} 
                      alt="Profile" 
                      className={styles.profileAvatar}
                    />
                  ) : (
                    <div className={styles.profileAvatarPlaceholder}>
                      <FiUser size={32} />
                    </div>
                  )}
                  {editMode && (
                    <div className={styles.uploadOverlay}>
                      <FiUpload size={18} />
                      <span>Change Logo</span>
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
                <label>Organization Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Enter organization name"
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
                    placeholder="Enter email address"
                  />
                ) : (
                  <div className={styles.formValue}>{profileData.email}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Phone</label>
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Enter contact number"
                  />
                ) : (
                  <div className={styles.formValue}>{profileData.phone || "Not provided"}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Website</label>
                {editMode ? (
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Enter website URL"
                  />
                ) : (
                  <div className={styles.formValue}>
                    {profileData.website ? (
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                        {profileData.website}
                      </a>
                    ) : "Not provided"}
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>About Us</label>
                {editMode ? (
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    rows="4"
                    placeholder="Tell us about your organization"
                  />
                ) : (
                  <div className={styles.formValue}>{profileData.bio}</div>
                )}
              </div>

              <div className={styles.formActions}>
                {editMode ? (
                  <>
                    <button 
                      className={styles.saveBtn}
                      onClick={handleSave}
                    >
                      <FiCheck size={16} /> Save Changes
                    </button>
                    <button 
                      className={styles.cancelBtn}
                      onClick={() => setEditMode(false)}
                    >
                      <FiX size={16} /> Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    className={styles.editBtn}
                    onClick={() => setEditMode(true)}
                  >
                    <FiEdit size={16} /> Edit Profile
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