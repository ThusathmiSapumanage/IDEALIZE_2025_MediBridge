import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-section-content">
            <h4>Contact Us</h4>
            <p>Email: support@medibridge.com</p>
            <p>Phone: +123 456 789</p>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-section-content">
            <h4>Legal</h4>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-section-content">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com/medibridge" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a href="https://twitter.com/medibridge" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="https://instagram.com/medibridge" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 MediBridge. Making a difference through donations.</p>
      </div>
    </div>
  );
};

export default Footer;