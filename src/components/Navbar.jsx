import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = (id) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  useEffect(() => {
    const sections = ['how-it-works', 'urgent-needs', 'donors', 'hospitals', 'ngos'];

    const handleScrollSpy = () => {
      let closestSection = 'home';
      let minDistance = Infinity;
      const scrollY = window.scrollY;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const distance = Math.abs(el.offsetTop - scrollY - 100);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = id;
          }
        }
      });

      if (scrollY < 200) {
        closestSection = 'home';
      }

      setActiveSection(closestSection);
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScrollSpy);
      handleScrollSpy();
    }

    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, [location]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">
          <span className="logo-half medi">Medi</span>
          <span className="logo-half bridge">Bridge</span>
          <span className="corner-box"></span>
        </Link>
      </div>

      <ul className="nav-links">
        <li><button className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={handleScrollTop}>Home</button></li>
        <li><button className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`} onClick={() => handleScroll('how-it-works')}>How It Works</button></li>
        <li><button className={`nav-link ${activeSection === 'urgent-needs' ? 'active' : ''}`} onClick={() => handleScroll('urgent-needs')}>Urgent Needs</button></li>
        <li><button className={`nav-link ${activeSection === 'donors' ? 'active' : ''}`} onClick={() => handleScroll('donors')}>Donors</button></li>
        <li><button className={`nav-link ${activeSection === 'hospitals' ? 'active' : ''}`} onClick={() => handleScroll('hospitals')}>Hospitals</button></li>
        <li><button className={`nav-link ${activeSection === 'ngos' ? 'active' : ''}`} onClick={() => handleScroll('ngos')}>NGOs</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
