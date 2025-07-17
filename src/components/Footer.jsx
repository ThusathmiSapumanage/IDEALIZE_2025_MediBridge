import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  // Replace these with your actual links when available
  const links = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Contact Us", path: "/contact" }
  ];

  return (
    <footer className="app-footer">
      <div className="container">
        <p className="footer-text">© 2025 MediBridge. Making a difference through donations.</p>
        <div className="footer-links">
          {links.map((link, index) => (
            <React.Fragment key={link.path}>
              {index > 0 && <span className="footer-divider">|</span>}
              <a 
                href={link.path} 
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  // Add navigation logic here when routes are ready
                  console.log(`Navigating to ${link.path}`);
                }}
              >
                {link.name}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;