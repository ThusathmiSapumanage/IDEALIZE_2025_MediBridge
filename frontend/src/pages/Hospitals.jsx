import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Hospitals.module.css';
import NGOProfile from '../components/NGOProfile';

function Hospitals() {
  const [hospitalName, setHospitalName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [showAddHospital, setShowAddHospital] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New hospital registration request from City General', time: '45 mins ago', read: false },
    { id: 2, message: 'Inventory update needed for Rural Health Center', time: '3 hours ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock hospitals data
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      location: "Downtown, Metro City",
      contact: "contact@citygeneral.com",
      status: "active"
    },
    {
      id: 2,
      name: "Rural Health Center",
      location: "Village Road, Countryside",
      contact: "info@ruralhealth.org",
      status: "active"
    }
  ]);

  const handleAddHospital = () => {
    if (!hospitalName || !location || !contact) {
      setMessage('Please fill all fields');
      return;
    }

    const newHospital = {
      id: hospitals.length + 1,
      name: hospitalName,
      location: location,
      contact: contact,
      status: "active"
    };

    setHospitals([...hospitals, newHospital]);
    setMessage('Hospital added successfully!');
    setHospitalName('');
    setLocation('');
    setContact('');
    setShowAddHospital(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Mark all as read when opening
    if (!showNotifications) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  // Mock user data
  const user = {
    name: 'NGO Admin',
    email: 'admin@example.org',
    avatar: null
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

          <Link to="/hospitals" className={`${styles.navItem} ${styles.active}`}>
            <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Hospitals</span>
            <span className={styles.badge}>{hospitals.length}</span>
          </Link>

          <Link to="/urgent-needs" className={styles.navItem}>
            <svg className={styles.navIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Urgent Needs</span>
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
            <h1 className={styles.pageTitle}>Hospitals</h1>
            <p className={styles.pageSubtitle}>Manage partner hospitals and their information</p>
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
              onClick={() => setShowAddHospital(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Hospital
            </button>
          </div>
        </header>

        {/* Hospitals List */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Partner Hospitals</h2>
            <div className={styles.cardBadge}>{hospitals.length}</div>
          </div>
          <div className={styles.cardBody}>
            {hospitals.length > 0 ? (
              <div className={styles.tableContainer}>
                <table className={styles.hospitalsTable}>
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
                          <button className={`${styles.btn} ${styles.btnSmall} ${styles.btnOutline}`}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p>No hospitals registered yet</p>
                <p className={styles.emptySubtext}>Add your first hospital to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Hospital Modal */}
        {showAddHospital && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3>Add New Hospital</h3>
                <button 
                  className={styles.modalClose}
                  onClick={() => setShowAddHospital(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.closeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Hospital Name</label>
                  <input
                    type="text"
                    placeholder="Enter hospital name"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="Enter hospital location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Contact Email</label>
                  <input
                    type="email"
                    placeholder="Enter contact email"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                {message && <p className={message.includes('success') ? styles.successMessage : styles.errorMessage}>{message}</p>}
                <button className={styles.primaryButton} onClick={handleAddHospital}>
                  Add Hospital
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Hospitals;