import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/NGODashboard.module.css';
import NGOProfile from '../components/NGOProfile';

function NGODashboard({ donations, hospitals, onAddCampaign }) {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New donation of Rs. 5,000 from Rohan Sharma', time: '2 mins ago', read: false },
    { id: 2, message: 'Monthly report is ready for review', time: '1 hour ago', read: true },
    { id: 3, message: 'Campaign "Education for All" reached 80% of goal', time: '3 hours ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock user data
  const user = {
    name: 'NGO Admin',
    email: 'admin@example.org',
    avatar: null
  };

  const handleViewDonationDetails = (donation) => {
    navigate('/donation-details', { state: { donation } });
  };

  const handleViewHospital = (hospital) => {
    navigate('/hospital', { state: { hospital } });
  };

  const summary = {
    totalFunds: 125000,
    hospitals: 15,
    activeCampaigns: 3,
    urgentNeeds: 2
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Mark all as read when opening
    if (!showNotifications) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
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
          <Link to="/ngo-dashboard" className={`${styles.navItem} ${styles.active}`}>
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
            <span className={styles.badge}>{summary.hospitals}</span>
          </Link>

          <Link to="/urgent-needs" className={styles.navItem}>
            <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Urgent Needs</span>
            <span className={styles.badge}>{summary.urgentNeeds}</span>
          </Link>

          <Link to="/campaigns" className={styles.navItem}>
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
            <h1 className={styles.pageTitle}>NGO Management Dashboard</h1>
            <p className={styles.pageSubtitle}>Welcome back, {user.name}! Here's your organization's overview.</p>
          </div>
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
        </header>

        {/* Summary Cards */}
        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardBody}>
              <div className={`${styles.cardIcon} ${styles.totalIcon}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Total Funds</h3>
              <p className={styles.cardValue}>Rs. {summary.totalFunds.toLocaleString()}</p>
              <p className={styles.cardSubtext}>+15% from last month</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardBody}>
              <div className={`${styles.cardIcon} ${styles.completedIcon}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Hospitals</h3>
              <p className={styles.cardValue}>{summary.hospitals}</p>
              <Link
                to="/hospitals"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.mt2}`}
              >
                Add Hospital
              </Link>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardBody}>
              <div className={`${styles.cardIcon} ${styles.urgentIcon}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Urgent Needs</h3>
              <p className={styles.cardValue}>{summary.urgentNeeds}</p>
              <Link
                to="/urgent-needs"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.mt2}`}
              >
                Add Urgent Need
              </Link>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardBody}>
              <div className={`${styles.cardIcon} ${styles.pendingIcon}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Active Campaigns</h3>
              <p className={styles.cardValue}>{summary.activeCampaigns}</p>
              <Link
                to="/campaigns"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.mt2}`}
              >
                Add Campaign
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Donations */}
        <div className={styles.taskListContainer}>
          <div className={styles.taskListHeader}>
            <h2 className={styles.sectionTitle}>Recent Donations</h2>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>
              Export Report
            </button>
          </div>

          <div className={styles.taskList}>
            <div className={styles.tableContainer}>
              <table className={styles.donationsTable}>
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
                      <td>
                        <span className={`${styles.statusBadge} ${donation.status}`}>
                          {donation.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`${styles.btn} ${styles.btnSmall} ${styles.btnOutline}`}
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
        </div>

        {/* Hospitals List */}
        <div className={styles.taskListContainer}>
          <div className={styles.taskListHeader}>
            <h2 className={styles.sectionTitle}>Partner Hospitals</h2>
            <Link to="/hospitals" className={`${styles.btn} ${styles.btnSecondary}`}>
              View Hospitals
            </Link>
          </div>

          <div className={styles.taskList}>
            <div className={styles.tableContainer}>
              <table className={styles.donationsTable}>
                <thead>
                  <tr>
                    <th>Hospital Name</th>
                    <th>Location</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map(hospital => (
                    <tr key={hospital.id}>
                      <td>{hospital.name}</td>
                      <td>{hospital.location}</td>
                      <td>{hospital.contact}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${hospital.status}`}>
                          {hospital.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`${styles.btn} ${styles.btnSmall} ${styles.btnOutline}`}
                          onClick={() => handleViewHospital(hospital)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NGODashboard;