// src/pages/UrgentNeeds.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/UrgentNeeds.module.css';
import NGOProfile from '../components/NGOProfile';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

function UrgentNeeds() {
  // Form & UI state
  const [urgentTitle, setUrgentTitle] = useState('');
  const [urgentDescription, setUrgentDescription] = useState('');
  const [message, setMessage] = useState('');
  const [showCreateUrgentNeed, setShowCreateUrgentNeed] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New urgent need: Emergency Medical Supplies', time: '15 mins ago', read: false },
    { id: 2, message: 'Urgent need "Winter Blankets" was fulfilled', time: '2 days ago', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Server data
  const [urgentNeeds, setUrgentNeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = { name: 'NGO Admin', email: 'admin@example.org', avatar: null };

  // Fetch urgent needs
  useEffect(() => {
    const fetchUrgentNeeds = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/urgent-needs`);
        if (!res.ok) throw new Error(`Failed to load urgent needs: ${res.status}`);
        const data = await res.json();
        setUrgentNeeds(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setMessage('Could not load urgent needs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUrgentNeeds();
  }, []);

  // Add urgent need
  const handleAddUrgentNeed = async () => {
    setMessage('');
    if (!urgentTitle.trim() || !urgentDescription.trim()) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const body = {
        title: urgentTitle.trim(),
        description: urgentDescription.trim(),
      };

      console.log('Sending body:', body);

      const res = await fetch(`${API_BASE}/api/urgent-needs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Create failed: ${res.status} ${txt}`);
      }

      const created = await res.json();

      setUrgentNeeds((prev) => [
        {
          ...created,
          title: created.title || body.title,
          description: created.description || body.description,
          date: created.createdAt || new Date().toISOString(),
          status: created.status || 'pending',
          priority: created.priority || 'high',
        },
        ...prev,
      ]);

      setMessage('Urgent need added successfully!');
      setUrgentTitle('');
      setUrgentDescription('');
      setShowCreateUrgentNeed(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add urgent need. Please try again.');
    }
  };

  const toggleNotifications = () => {
    setShowNotifications((s) => !s);
    if (!showNotifications) {
      setNotifications((n) => n.map((x) => ({ ...x, read: true })));
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Navigation (unchanged UI) */}
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

          <Link to="/urgent-needs" className={`${styles.navItem} ${styles.active}`}>
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
            <h1 className={styles.pageTitle}>Urgent Needs</h1>
            <p className={styles.pageSubtitle}>Manage your organization's urgent requirements</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.notificationWrapper}>
              <button className={styles.notificationBtn} onClick={toggleNotifications}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.notificationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.some((n) => !n.read) && <span className={styles.notificationBadge}></span>}
              </button>
              {showNotifications && (
                <div className={styles.notificationDropdown}>
                  <div className={styles.notificationHeader}><h3>Notifications</h3></div>
                  <div className={styles.notificationList}>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}>
                          <p>{notification.message}</p>
                          <span className={styles.notificationTime}>{notification.time}</span>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noNotifications}>No new notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button className={styles.addButton} onClick={() => setShowCreateUrgentNeed(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.addIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Urgent Need
            </button>
          </div>
        </header>

        {/* Current Urgent Needs */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Current Urgent Needs</h2>
            <div className={styles.cardBadge}>{urgentNeeds.length}</div>
          </div>

          <div className={styles.cardBody}>
            {loading ? (
              <div className={styles.emptyState}><p>Loading…</p></div>
            ) : urgentNeeds.length > 0 ? (
              <div className={styles.urgentNeedsList}>
                {urgentNeeds.map((need) => (
                  <div key={need.id} className={`${styles.urgentItem} ${need.priority}`}>
                    <div className={styles.urgentHeader}>
                      <h3>{need.title}</h3>
                      <span className={`${styles.priorityBadge} ${need.priority}`}>{need.priority}</span>
                    </div>
                    <p className={styles.urgentDescription}>{need.description}</p>
                    <div className={styles.urgentMeta}>
                      <span>Added: {new Date(need.date).toLocaleDateString()}</span>
                      <span className={`${styles.statusBadge} ${need.status}`}>{need.status}</span>
                    </div>
                    <div className={styles.urgentActions}>
                      <button className={styles.secondaryButton} disabled>Mark as Resolved</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>No urgent needs reported</p>
                <p className={styles.emptySubtext}>Add your first urgent need above</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Urgent Need Modal */}
        {showCreateUrgentNeed && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3>Add Urgent Need</h3>
                <button className={styles.modalClose} onClick={() => setShowCreateUrgentNeed(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.closeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Enter urgent need title"
                    value={urgentTitle}
                    onChange={(e) => setUrgentTitle(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    placeholder="Describe the urgent need in detail"
                    value={urgentDescription}
                    onChange={(e) => setUrgentDescription(e.target.value)}
                  />
                </div>
                {message && (
                  <p className={message.includes('success') ? styles.successMessage : styles.errorMessage}>
                    {message}
                  </p>
                )}
                <button className={styles.primaryButton} onClick={handleAddUrgentNeed}>
                  Add Urgent Need
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UrgentNeeds;