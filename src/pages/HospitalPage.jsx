import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/HospitalPage.css';

const HospitalPage = ({ onBack, onDonate }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const hospital = state?.hospital;
  const donationTypes = state?.donationTypes || [];

  if (!hospital) {
    navigate('/donor-dashboard');
    return null;
  }

  const handleBack = () => {
    navigate('/donor-dashboard');
  };

  const handleDonate = (donationTypeId) => {
    const donationType = donationTypes.find(t => t.id === donationTypeId);
    alert(`Donation initiated for ${donationType?.name} at ${hospital.name}`);
  };

  return (
    <div className="hospital-page container">
      <button className="back-button" onClick={handleBack}>
        &larr; Back to Hospitals
      </button>
      
      <div className="hospital-card">
        <div className="hospital-header">
          <h1 className="hospital-name">{hospital.name}</h1>
          <div 
            className="hospital-image" 
            style={{ backgroundImage: `url(${hospital.image})` }}
          ></div>
        </div>
        
        <div className="hospital-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>{hospital.address}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <div>
              <h3>Contact</h3>
              <p>{hospital.contact}</p>
              <p>{hospital.email}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">⏰</span>
            <div>
              <h3>Operating Hours</h3>
              <p>{hospital.hours}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">🏥</span>
            <div>
              <h3>About</h3>
              <p>{hospital.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="donation-types">
        <h2 className="section-title">Available Donation Types</h2>
        <div className="donation-grid">
          {donationTypes.map(type => (
            <div key={type.id} className="donation-card">
              <h3 className="donation-name">{type.name}</h3>
              <p className="donation-info">{type.info}</p>
              <button 
                className="donate-btn"
                onClick={() => handleDonate(type.id)}
              >
                Donate {type.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalPage;