import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Campaigns.module.css';
import NGOProfile from '../components/NGOProfile';

const API_BASE = 'http://localhost:8080';

// Campaign type configurations (only Blood Donation and Medical Supplies)
const CAMPAIGN_TYPES = {
  BLOOD: {
    label: 'Blood Donation',
    icon: '🩸',
    fields: [
      {
        name: 'bloodType',
        label: 'Blood Type Needed',
        type: 'select',
        options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
      },
      {
        name: 'quantity',
        label: 'Units Needed',
        type: 'number',
        required: true
      }
    ]
  },
  SUPPLIES: {
    label: 'Medical Supplies',
    icon: '🏥',
    fields: [
      {
        name: 'supplyType',
        label: 'Supply Type',
        type: 'text',
        required: true
      },
      {
        name: 'quantity',
        label: 'Quantity Needed',
        type: 'number',
        required: true
      }
    ]
  }
};

function Campaigns() {
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignType, setCampaignType] = useState('BLOOD'); // Set to valid initial type
  const [typeSpecificFields, setTypeSpecificFields] = useState({});
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Campaign "Medical Equipment" reached 65% of goal', time: '30 mins ago', read: false },
    { id: 2, message: 'New donation of Rs. 10,000 for Children Education', time: '2 hours ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const user = {
    name: 'NGO Admin',
    email: 'admin@example.org',
    avatar: null
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/campaigns`);
      const data = await res.json();
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch campaigns:', e);
      setMessage('Failed to load campaigns');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeSpecificChange = (fieldName, value) => {
    setTypeSpecificFields(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleAddCampaign = async () => {
    setMessage('');
    if (!campaignTitle || !campaignDescription || !endDate) {
      setMessage('Please fill all required fields');
      return;
    }

    const currentTypeConfig = CAMPAIGN_TYPES[campaignType];
    for (const field of currentTypeConfig.fields) {
      if (field.required && !typeSpecificFields[field.name]) {
        setMessage(`Please fill ${field.label}`);
        return;
      }
    }

    setIsLoading(true);
    try {
      const campaignData = {
        title: campaignTitle,
        description: campaignDescription,
        endDate,
        type: campaignType,
        typeData: typeSpecificFields,
        status: "active"
      };

      const response = await fetch(`${API_BASE}/api/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create campaign');
      }

      const newCampaign = await response.json();
      setCampaigns(prev => [newCampaign, ...prev]);
      setMessage('Campaign created successfully!');

      // Reset form
      setCampaignTitle('');
      setCampaignDescription('');
      setEndDate('');
      setTypeSpecificFields({});
      setShowCreateCampaign(false);
    } catch (error) {
      console.error('Error creating campaign:', error);
      setMessage(error.message || 'Error creating campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const calculateProgress = (raised, goal) => {
    return Math.min(100, (raised / goal) * 100);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.logoText}>
            <span className={styles.logoHalfMedi}>Medi</span>
            <span className={styles.logoHalfBridge}>Bridge</span>
            <span className={styles.cornerBox}></span>
          </Link>
        </div>

        <nav className={styles.sidebarNav}>
          <Link to="/ngo-dashboard" className={styles.navItem}>
            <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link to="/hospitals" className={styles.navItem}>
            <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Hospitals</span>
          </Link>

          <Link to="/urgent-needs" className={styles.navItem}>
            <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Urgent Needs</span>
          </Link>

          <Link to="/campaigns" className={`${styles.navItem} ${styles.active}`}>
            <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Campaigns</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <NGOProfile user={user} />
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <div>
            <h1 className={styles.pageTitle}>Campaigns</h1>
            <p className={styles.pageSubtitle}>Create and manage your fundraising campaigns</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.notificationWrapper}>
              <button
                className={styles.notificationBtn}
                onClick={toggleNotifications}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.notificationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.some(n => !n.read) && (
                  <span className={styles.notificationBadge}></span>
                )}
              </button>
              {showNotifications && (
                <div className={styles.notificationDropdown}>
                  <div className={styles.notificationHeader}>
                    <h3>Notifications</h3>
                  </div>
                  <div className={styles.notificationList}>
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                        >
                          <p>{notification.message}</p>
                          <span className={styles.notificationTime}>{notification.time}</span>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noNotifications}>
                        No new notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              className={styles.addButton}
              onClick={() => setShowCreateCampaign(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Campaign
            </button>
          </div>
        </header>

        {/* Active Campaigns Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Active Campaigns</h2>
            <div className={styles.cardBadge}>{campaigns.length}</div>
          </div>
          <div className={styles.cardBody}>
            {isLoading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Loading campaigns...</p>
              </div>
            ) : campaigns.length > 0 ? (
              <div className={styles.campaignsList}>
                {campaigns.map(campaign => (
                  <div key={campaign._id || campaign.id} className={styles.campaignItem}>
                    <div className={styles.campaignInfo}>
                      <h3>{campaign.title}</h3>
                      <p>{campaign.description}</p>
                      <div className={styles.progressContainer}>
                        <div className={styles.progressLabels}>
                          <span>Raised: Rs. {(campaign.raised || 0).toLocaleString()}</span>
                          <span>Goal: Rs. {campaign.goal.toLocaleString()}</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${calculateProgress(campaign.raised || 0, campaign.goal)}%` }}
                          ></div>
                        </div>
                        <div className={styles.progressPercentage}>
                          {Math.round(calculateProgress(campaign.raised || 0, campaign.goal))}% funded
                        </div>
                      </div>
                      <div className={styles.campaignMeta}>
                        <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
                        <span className={`${styles.statusBadge} ${campaign.status || 'active'}`}>
                          {campaign.status || 'Active'}
                        </span>
                      </div>
                    </div>
                    <div className={styles.campaignActions}>
                      <button className={styles.secondaryButton}>View Details</button>
                      <button className={styles.tertiaryButton}>Share</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p>No active campaigns yet</p>
                <p className={styles.emptySubtext}>Create your first campaign to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Create Campaign Modal */}
        {showCreateCampaign && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ maxWidth: '500px' }}>
              <div className={styles.modalHeader}>
                <h3>New Campaign</h3>
                <button
                  className={styles.modalClose}
                  onClick={() => {
                    setShowCreateCampaign(false);
                    setTypeSpecificFields({});
                  }}
                >
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Title*</label>
                  <input
                    type="text"
                    placeholder="Campaign title"
                    value={campaignTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Description*</label>
                  <textarea
                    placeholder="Brief description"
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup} style={{ flex: 2 }}>
                    <label>Type*</label>
                    <select
                      value={campaignType}
                      onChange={(e) => setCampaignType(e.target.value)}
                      className={styles.typeDropdown}
                    >
                      <option value="BLOOD">🩸 Blood Donation</option>
                      <option value="SUPPLIES">🏥 Medical Supplies</option>
                    </select>
                  </div>

                  <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label>Date*</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Dynamic Fields */}
                <div className={styles.typeSpecificFields}>
                  {CAMPAIGN_TYPES[campaignType].fields.map((field) => (
                    <div key={field.name} className={styles.formGroup}>
                      <label>
                        {field.label}
                        {field.required && '*'}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={typeSpecificFields[field.name] || ''}
                          onChange={(e) => handleTypeSpecificChange(field.name, e.target.value)}
                          required={field.required}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          placeholder={`Enter ${field.label}`}
                          value={typeSpecificFields[field.name] || ''}
                          onChange={(e) => handleTypeSpecificChange(field.name, e.target.value)}
                          required={field.required}
                          rows={2}
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={`Enter ${field.label}`}
                          value={typeSpecificFields[field.name] || ''}
                          onChange={(e) => handleTypeSpecificChange(field.name, e.target.value)}
                          required={field.required}
                          min={field.type === 'number' ? 1 : undefined}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {message && (
                  <p className={message.includes('success') ? styles.successMessage : styles.errorMessage}>
                    {message}
                  </p>
                )}

                <button
                  className={styles.primaryButton}
                  onClick={handleAddCampaign}
                  disabled={isLoading}
                  style={{ width: '100%', marginTop: '20px' }}
                >
                  {isLoading ? 'Creating...' : 'Create Campaign'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Campaigns;