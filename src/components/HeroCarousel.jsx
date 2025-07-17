import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const slides = [
    {
      image: '/images/image1.jpg',
      title: 'Bridge the Gap in Medical Care',
      description:
        'Every day, hospitals struggle with shortages. Your donation—big or small—helps provide life-saving equipment, medicine, and care to those who need it most.',
      button: 'Donate Now',
    },
    {
      image: '/images/image2.jpg',
      title: 'NGOs, Partner with Us to Save Lives',
      description:
        'Join forces with MediBridge to support hospitals in critical need. Provide medical supplies, services, or volunteers — and amplify your organization’s impact.',
      button: 'Join as an NGO',
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleButtonClick = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="hero-carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${currentSlide === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <button className="cta-button" onClick={handleButtonClick}>
                {slide.button}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Left and right arrows */}
      <button className="nav-arrow left-arrow" onClick={goToPrevious}>&#10094;</button>
      <button className="nav-arrow right-arrow" onClick={goToNext}>&#10095;</button>
    </div>
  );
};

export default HeroCarousel;
