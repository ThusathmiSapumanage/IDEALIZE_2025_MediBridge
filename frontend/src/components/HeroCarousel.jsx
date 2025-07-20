import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: '/images/image1.jpg',
      title: 'Bridge the Gap in Medical Care',
      description:
        'Every day, hospitals struggle with shortages. Your donation—big or small—helps provide life-saving equipment, medicine, and care to those who need it most. Be a hero today - press the button below to start saving lives in just minutes!',
      button: 'Donate Now',
      path: '/donor-login' // Added path for donor login
    },
    {
      image: '/images/image2.jpg',
      title: 'NGOs, Partner with Us to Save Lives',
      description:
        'Join forces with MediBridge to support hospitals in critical need. Provide medical supplies, services, or volunteers — and amplify your organizations impact. Click below to create your account and unlock powerful partnerships!',
      button: 'Join as an NGO',
      path: '/ngo-login' // Added path for NGO login
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

  const handleButtonClick = (path) => {
    navigate(path); // Navigate to the specific path
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
              <button 
                className="cta-button" 
                onClick={() => handleButtonClick(slide.path)} // Pass the specific path
              >
                {slide.button}
              </button>
            </div>
          </div>
        </div>
      ))}

      <button className="nav-arrow left-arrow" onClick={goToPrevious}>&#10094;</button>
      <button className="nav-arrow right-arrow" onClick={goToNext}>&#10095;</button>
    </div>
  );
};

export default HeroCarousel;