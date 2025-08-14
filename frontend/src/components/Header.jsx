import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import DonorProfile from './DonorProfile';

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="app-header">
      <div className="header-content container">
        <div className="logo">
          <Link to="/" className="logo-text">
            <span className="logo-half medi">Medi</span>
            <span className="logo-half bridge">Bridge</span>
            <span className="corner-box"></span>
          </Link>
        </div>
        <div className="profile-container">
          <div
            className="user-info"
            onClick={() => setShowProfile(!showProfile)}
          >
            <span className="profile-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </span>
            <span className="user-name">Profile</span>
          </div>

          {showProfile && <DonorProfile />}
        </div>
      </div>
    </header>
  );
};

export default Header;