import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import '../styles/NGODashboard.Module.css';

function NGODashboard({ donations, beneficiaries, onAddCampaign }) {
  const navigate = useNavigate();

  const handleViewDonationDetails = (donation) => {
    navigate('/donation-details', { state: { donation } });
  };

  const handleViewBeneficiary = (beneficiary) => {
    navigate('/beneficiary', { state: { beneficiary } });
  };

  return (
    <div className="ngo-dashboard">
      <h1 className="dashboard-title">NGO Management Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Funds Received</h3>
          <p className="amount">Rs. 1,25,000</p>
          <p className="subtext">+15% from last month</p>
        </div>

        <div className="dashboard-card">
          <h3>Active Beneficiaries</h3>
          <p className="amount">42</p>
          <p className="subtext">5 new this week</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Withdrawals</h3>
          <p className="amount">Rs. 25,000</p>
          <button className="withdraw-btn">Process Withdrawals</button>
        </div>

        <div className="dashboard-card full-width">
          <div className="section-header">
            <h3>Recent Donations</h3>
            <button className="export-btn">Export Report</button>
          </div>
          <div className="donations-table">
            <table>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map(donation => (
                  <tr key={donation.id}>
                    <td>{donation.donorName}</td>
                    <td>Rs. {donation.amount.toLocaleString()}</td>
                    <td>{new Date(donation.date).toLocaleDateString()}</td>
                    <td className={`status ${donation.status}`}>{donation.status}</td>
                    <td>
                      <button 
                        className="details-btn"
                        onClick={() => handleViewDonationDetails(donation)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-card full-width">
          <div className="section-header">
            <h3>Beneficiary Overview</h3>
            <button 
              className="add-btn"
              onClick={() => navigate('/add-beneficiary')}
            >
              Add Beneficiary
            </button>
          </div>
          <div className="beneficiary-grid">
            {beneficiaries.map(beneficiary => (
              <div
                key={beneficiary.id}
                className="beneficiary-card"
                onClick={() => handleViewBeneficiary(beneficiary)}
              >
                <div className="beneficiary-image">
                  {beneficiary.image ? (
                    <img src={beneficiary.image} alt={beneficiary.name} />
                  ) : (
                    <div className="initials">{beneficiary.name.charAt(0)}</div>
                  )}
                </div>
                <div className="beneficiary-info">
                  <h3>{beneficiary.name}</h3>
                  <p className="beneficiary-type">{beneficiary.type}</p>
                  <div className="beneficiary-stats">
                    <span>👨‍👩‍👧‍👦 {beneficiary.familySize}</span>
                    <span>📍 {beneficiary.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card full-width">
          <h3>Create New Campaign</h3>
          <div className="campaign-form">
            <input type="text" placeholder="Campaign Title" />
            <textarea placeholder="Campaign Description"></textarea>
            <div className="form-row">
              <input type="number" placeholder="Funding Goal (Rs.)" />
              <input type="date" placeholder="End Date" />
            </div>
            <button className="create-btn" onClick={onAddCampaign}>
              Launch Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

export default NGODashboard;