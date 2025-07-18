import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import '../styles/HospitalPage.css';

const HospitalPage = ({ donationTypes = [], onBack, onDonate }) => {
  const location = useLocation();

  useEffect(() => {
    // Immediate scroll without animation
    window.scrollTo(0, 0);

    // Fallback for older browsers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Get hospital from location state or props
  const hospital = location.state?.hospital;

  // Enhanced default hospital object
  const currentHospital = hospital || {
    name: "Select a Hospital",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    address: "Please select a hospital from the dashboard",
    contact: "Contact information will appear here",
    email: "Email will appear here",
    hours: "Operating hours will be displayed",
    description: "Please go back to the dashboard and select a hospital to view detailed information and donation options."
  };

  return (
    <div className="hospital-page container">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Hospitals
      </button>

      <div className="hospital-card">
        <div className="hospital-header">
          <div className="hospital-text-content">
            <h1 className="hospital-name">{currentHospital.name}</h1>
          </div>
          <div
            className="hospital-image"
            style={{
              backgroundImage: `url(${currentHospital.image})`,
              minWidth: '220px'
            }}
            aria-label={`${currentHospital.name} facility`}
          />
        </div>

        <div className="hospital-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>{currentHospital.address}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <div>
              <h3>Contact</h3>
              <p>{currentHospital.contact}</p>
              <p>{currentHospital.email}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">⏰</span>
            <div>
              <h3>Operating Hours</h3>
              <p>{currentHospital.hours.split('\n').map((line, i) => (
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
              <p>{currentHospital.description}</p>
            </div>
          </div>
        </div>
      </div>

      {hospital ? (
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
      ) : (
        <div className="no-hospital-selected">
          <p>Please select a hospital from the dashboard to view donation options.</p>
        </div>
      )}

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default HospitalPage;