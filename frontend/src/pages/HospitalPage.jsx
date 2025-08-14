import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import '../styles/HospitalPage.css';

const HospitalPage = ({ donationTypes = [], onBack, onDonate }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Get hospital from location state
  const hospital = location.state?.hospital;

  if (!hospital) {
    return (
      <div className="hospital-page container">
        <button className="back-button" onClick={onBack}>
          &larr; Back to Hospitals
        </button>
        
        <div className="no-hospital-selected">
          <p>No hospital selected. Please go back and select a hospital from the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hospital-page container">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Hospitals
      </button>

      <div className="hospital-card">
        <div className="hospital-header">
          <div className="hospital-text-content">
            <h1 className="hospital-name">{hospital.name}</h1>
          </div>
          <div
            className="hospital-image"
            style={{
              backgroundImage: `url(${hospital.image})`,
              minWidth: '220px'
            }}
            aria-label={`${hospital.name} facility`}
          />
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
              <p>{hospital.hours.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}</p>
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
                onClick={() => onDonate(type.id)}
                aria-label={`Donate ${type.name}`}
              >
                Donate {type.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default HospitalPage;