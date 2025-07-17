import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DonorDashboard.css';

function DonorDashboard({ hospitals }) {
  const navigate = useNavigate();

  const handleSelectHospital = (hospital) => {
    navigate('/hospital', { state: { hospital } });
  };
  return (
    <div className="donor-dashboard">
      <h1 className="dashboard-title">Welcome, Donor!</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Donations</h3>
          <p className="amount">Rs. 25,000</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Donations</h3>
          <p className="amount">Rs. 3,000</p>
        </div>

        <div className="dashboard-card">
          <h3>Donation History</h3>
          <ul className="donation-history">
            <li>✅ Rs. 10,000 – St. Mary's Hospital</li>
            <li>✅ Rs. 12,000 – Children's Hospital</li>
            <li>🕓 Rs. 3,000 – City Care (Pending)</li>
          </ul>
        </div>

        <div className="dashboard-card full-width">
          <h3>Select a Hospital to Donate</h3>
          <p>Choose from our partner hospitals to make your donation</p>

          <div className="hospital-grid">
            {hospitals.map(hospital => (
              <div key={hospital.id} className="hospital-card">
                <div
                  className="hospital-image"
                  style={{ backgroundImage: `url(${hospital.image})` }}
                ></div>
                <div className="hospital-info">
                  <h3>{hospital.name}</h3>
                  <div className="hospital-contact">
                    <span>📞 {hospital.contact}</span>
                    <span>✉️ {hospital.email}</span>
                  </div>
                  <button
                    className="select-hospital-btn"
                    onClick={() => handleSelectHospital(hospital)}
                  >
                    Select Hospital
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;