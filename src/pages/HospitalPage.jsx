import React from 'react';
import '../styles/HospitalPage.Module.css';

const HospitalPage = ({ hospital, donationTypes = [], onBack, onDonate }) => {
  // Default hospital object if null
  const currentHospital = hospital || {
    name: "Hospital Not Found",
    address: "Address not available",
    contact: "Contact not available",
    hours: "Hours not specified",
    description: "No description available",
    image: "default-hospital-image.jpg"
  };

  return (
    <div className="hospital-page">
      <div className="hospital-container">
        <button className="back-button" onClick={onBack}>
          &larr; Back to Hospitals
        </button>
        
        <div className="hospital-card">
          <div className="hospital-header">
            <div className="hospital-text">
              <h1 className="hospital-name">{currentHospital.name}</h1>
              <div className="hospital-meta">
                <span>📍 {currentHospital.address}</span>
                <span>📞 {currentHospital.contact}</span>
              </div>
            </div>
            <div 
              className="hospital-image" 
              style={{ 
                backgroundImage: `url(${currentHospital.image || 'default-hospital-image.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
          
          <div className="hospital-details">
            <div className="detail-section">
              <h3>⏰ Operating Hours</h3>
              <p>{currentHospital.hours}</p>
            </div>
            
            <div className="detail-section">
              <h3>🏥 About</h3>
              <p>{currentHospital.description}</p>
            </div>
          </div>
        </div>

        <div className="donation-section">
          <h2 className="section-title">Available Donation Types</h2>
          <div className="donation-grid">
            {donationTypes.map(type => (
              <div key={type.id} className="donation-card">
                <div className="donation-content">
                  <h3>{type.name}</h3>
                  <p>{type.info}</p>
                </div>
                <button 
                  className="donate-button"
                  onClick={() => onDonate(type.id)}
                >
                  Donate {type.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalPage;