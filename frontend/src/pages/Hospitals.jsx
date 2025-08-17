import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Hospitals.module.css';
import NGOProfile from '../components/NGOProfile';

const API_BASE = 'http://localhost:8080';

function Hospitals() {
  const [hospitalName, setHospitalName] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showAddHospital, setShowAddHospital] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New hospital registration request from City General', time: '45 mins ago', read: false },
    { id: 2, message: 'Inventory update needed for Rural Health Center', time: '3 hours ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showHospitalDetails, setShowHospitalDetails] = useState(false);

  const [hospitals, setHospitals] = useState([]);
  const fileInputRef = useRef(null);

  const user = {
    name: 'NGO Admin',
    email: 'admin@example.org',
    avatar: null
  };

  // Load hospitals from backend
  const loadHospitals = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/hospitals`);
      const data = await res.json();
      const sortedHospitals = Array.isArray(data)
        ? data.sort((a, b) => b.id - a.id)
        : [];
      setHospitals(sortedHospitals);
    } catch (e) {
      console.error('Failed to fetch hospitals:', e);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const handleAddHospital = async () => {
    setMessage('');
    if (!hospitalName || !location || !contactNumber) {
      setMessage('Please fill all fields.');
      return;
    }
    if (!imageFile) {
      setMessage('Please select a hospital image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', hospitalName);
      formData.append('location', location);
      formData.append('contactNumber', contactNumber);
      formData.append('image', imageFile);

      const res = await fetch(`${API_BASE}/api/hospitals`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to add hospital');
      }

      await loadHospitals();

      setMessage('Hospital added successfully!');
      setHospitalName('');
      setLocation('');
      setContactNumber('');
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setShowAddHospital(false);
    } catch (e) {
      console.error(e);
      setMessage(`Error: ${e.message}`);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const handleViewHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowHospitalDetails(true);
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2 2 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
                      <th style={{ width: '80px' }}>Logo</th>
                      <th>Hospital Name</th>
                      <th>Location</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map(hospital => (
                      <tr key={hospital.id || hospital._id}>
                        <td>
                          {hospital.imageUrl ? (
                            <img
                              src={hospital.imageUrl}
                              alt={hospital.name}
                              className={styles.logoThumb}
                              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          ) : (
                            <div className={styles.logoThumbPlaceholder}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={styles.imagePlaceholderIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td>{hospital.name}</td>
                        <td>{hospital.location}</td>
                        <td>{hospital.contactNumber || hospital.contact || '-'}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${hospital.status || 'active'}`}>
                            {hospital.status || 'Active'}
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
                  <label>Contact Number</label>
                  <input
                    type="text"
                    placeholder="Enter contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Hospital Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </div>
                {message && (
                  <p className={message.startsWith('Error') ? styles.errorMessage : styles.successMessage}>
                    {message}
                  </p>
                )}
                <button className={styles.primaryButton} onClick={handleAddHospital}>
                  Add Hospital
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hospital Details Modal */}
        {showHospitalDetails && selectedHospital && (
          <div className={styles.modalOverlay}>
            <div className={styles.detailsModal} style={{ maxWidth: '700px' }}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Hospital Details</h3>
                <button
                  className={styles.modalClose}
                  onClick={() => setShowHospitalDetails(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.closeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.hospitalDetails}>
                  <div className={styles.hospitalImageContainer}>
                    {selectedHospital.imageUrl ? (
                      <img
                        src={selectedHospital.imageUrl}
                        alt={selectedHospital.name}
                        className={styles.hospitalDetailImage}
                      />
                    ) : (
                      <div className={styles.hospitalImagePlaceholder}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.imagePlaceholderIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        No Image Available
                      </div>
                    )}
                  </div>
                  <div className={styles.hospitalInfo}>
                    <div className={styles.hospitalHeader}>
                      <h4 className={styles.hospitalName}>{selectedHospital.name}</h4>
                      <div className={styles.hospitalStatus}>
                        <span className={styles.statusBadge}>Active</span>
                      </div>
                    </div>

                    <div className={styles.detailsGrid}>
                      <div className={styles.detailItem}>
                        <div className={styles.detailIcon}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className={styles.detailLabel}>Location</div>
                          <div className={styles.detailValue}>{selectedHospital.location}</div>
                        </div>
                      </div>

                      <div className={styles.detailItem}>
                        <div className={styles.detailIcon}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <div className={styles.detailLabel}>Contact</div>
                          <div className={styles.detailValue}>{selectedHospital.contactNumber || selectedHospital.contact || 'Not provided'}</div>
                        </div>
                      </div>

                      <div className={styles.detailItem}>
                        <div className={styles.detailIcon}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className={styles.detailLabel}>Registered</div>
                          <div className={styles.detailValue}>
                            {new Date(selectedHospital.createdAt || Date.now()).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className={styles.detailItem}>
                        <div className={styles.detailIcon}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <div className={styles.detailLabel}>Status</div>
                          <div className={styles.detailValue}>Verified Partner</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={`${styles.btn} ${styles.btnSecondary} ${styles.mr2}`}
                    onClick={() => {
                      // Add edit functionality here
                    }}
                  >
                    Edit Details
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => setShowHospitalDetails(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Hospitals;