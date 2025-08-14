// src/pages/HomePage.jsx
import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import Chatbot from '../components/Chatbot';
import '../styles/HomePage.css';

const API_BASE = 'http://localhost:8080';

function HomePage() {
  // urgent carousel refs/state
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsPerPage = 3;

  // data states
  const [urgentNeeds, setUrgentNeeds] = useState([]);
  const [donorReviews, setDonorReviews] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  // testimonial refs/state
  const testimonialScrollRef = useRef(null);
  const [testimonialActiveIndex, setTestimonialActiveIndex] = useState(0);
  const testimonialCardsPerPage = 3;

  // Derived paging values (guard against 0)
  const totalCards = urgentNeeds.length || 1;
  const totalPages = Math.max(1, Math.ceil(totalCards / cardsPerPage));

  const testimonialCards = donorReviews.length || 1;
  const testimonialTotalPages = Math.max(1, Math.ceil(testimonialCards / testimonialCardsPerPage));

  // Fetch data from backend
  useEffect(() => {
    fetch(`${API_BASE}/api/urgent-needs`)
      .then((res) => res.json())
      .then((data) => setUrgentNeeds(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Error fetching urgent needs:', err));

    fetch(`${API_BASE}/api/donor-reviews`)
      .then((res) => res.json())
      .then((data) => setDonorReviews(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Error fetching donor reviews:', err));

    fetch(`${API_BASE}/api/hospitals`)
      .then((res) => res.json())
      .then((data) => setHospitals(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Error fetching hospitals:', err));
  }, []);

  // Helpers: safe cardWidth calculation
  const getCardWidth = (container) => {
    if (!container || !container.children || container.children.length === 0) return 0;
    return container.children[0].offsetWidth + 20;
  };

  // Urgent cards scroll handlers
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth(container);
    if (!cardWidth) return;
    const index = Math.round(container.scrollLeft / (cardWidth * cardsPerPage));
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth(container);
    if (!cardWidth) return;
    container.scrollTo({
      left: index * cardWidth * cardsPerPage,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  const scrollLeft = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const scrollRight = () => {
    if (activeIndex < totalPages - 1) scrollToIndex(activeIndex + 1);
  };

  // Auto-advance urgent needs carousel when multiple pages exist
  useEffect(() => {
    if (!totalPages || totalPages <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % totalPages;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 7000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages, urgentNeeds]);

  // Testimonial handlers
  const handleTestimonialScroll = () => {
    const container = testimonialScrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth(container);
    if (!cardWidth) return;
    const index = Math.round(container.scrollLeft / (cardWidth * testimonialCardsPerPage));
    setTestimonialActiveIndex(index);
  };

  const scrollToTestimonialIndex = (index) => {
    const container = testimonialScrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth(container);
    if (!cardWidth) return;
    container.scrollTo({
      left: index * cardWidth * testimonialCardsPerPage,
      behavior: 'smooth',
    });
    setTestimonialActiveIndex(index);
  };

  const scrollTestimonialLeft = () => {
    if (testimonialActiveIndex > 0) scrollToTestimonialIndex(testimonialActiveIndex - 1);
  };

  const scrollTestimonialRight = () => {
    if (testimonialActiveIndex < testimonialTotalPages - 1)
      scrollToTestimonialIndex(testimonialActiveIndex + 1);
  };

  useEffect(() => {
    if (!testimonialTotalPages || testimonialTotalPages <= 1) return;
    const interval = setInterval(() => {
      setTestimonialActiveIndex((prev) => {
        const nextIndex = (prev + 1) % testimonialTotalPages;
        scrollToTestimonialIndex(nextIndex);
        return nextIndex;
      });
    }, 7000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonialTotalPages, donorReviews]);

  // Helper to show placeholder if image missing
  const imageOrPlaceholder = (url, placeholder = '/images/placeholder.png') => {
    return url && url.length > 0 ? url : placeholder;
  };

  return (
    <>
      <Navbar />
      <div className="homepage">
        <HeroCarousel />

        {/* How It Works Section */}
        <div id="how-it-works" className="how-it-works">
          <h2>How It Works</h2>
          <div className="how-it-works-grid">
            <div className="how-card">
              <h3>1. Login to Manage Donations</h3>
              <p>Log in to your account to track and manage your donations, see past contributions, and receive updates.</p>
            </div>
            <div className="how-card">
              <h3>2. Choose a Hospital or Cause</h3>
              <p>Select a hospital or a cause that needs your support.</p>
            </div>
            <div className="how-card">
              <h3>3. Select Donation Type</h3>
              <p>Choose whether to donate funds, medical equipment, medicines, or even volunteer time.</p>
            </div>
            <div className="how-card">
              <h3>4. Track Your Donation Impact</h3>
              <p>Monitor the progress and see how your donation makes a real difference in the lives of patients.</p>
            </div>
          </div>
        </div>

        {/* Urgent Needs Section */}
        <div id="urgent-needs" className="urgent-needs">
          <h2>Urgent Needs</h2>
          <div className="urgent-cards-wrapper">
            <div ref={scrollRef} onScroll={handleScroll} className="urgent-cards-scroll">
              {urgentNeeds.length > 0 ? (
                urgentNeeds.map((item, idx) => (
                  <div className="urgent-card" key={item.id ?? idx}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                // fallback static placeholder while empty
                <div className="urgent-card">
                  <h3>No urgent needs right now</h3>
                  <p>Check back later for updates.</p>
                </div>
              )}
            </div>

            <div className="urgent-nav">
              <button className="scroll-arrow" onClick={scrollLeft}>&#8249;</button>
              <div className="scroll-dots">
                {[...Array(totalPages)].map((_, idx) => (
                  <span
                    key={idx}
                    className={idx === activeIndex ? 'active' : ''}
                    onClick={() => scrollToIndex(idx)}
                  />
                ))}
              </div>
              <button className="scroll-arrow" onClick={scrollRight}>&#8250;</button>
            </div>
          </div>
        </div>

        {/* What Our Donors Say Section */}
        <div id="donors" className="what-our-donors-say">
          <h2>What Our Donors Say</h2>
          <div className="testimonial-wrapper">
            <div ref={testimonialScrollRef} onScroll={handleTestimonialScroll} className="testimonial-cards-scroll">
              {donorReviews.length > 0 ? (
                donorReviews.map((item, idx) => (
                  <div className="testimonial-card" key={item.id ?? idx}>
                    <div className="donor-image">
                      <img src={imageOrPlaceholder(item.donorImage)} alt={item.donorName || `Donor ${idx + 1}`} />
                    </div>
                    <p>{item.reviewText}</p>
                    <h4>{item.donorName}</h4>
                  </div>
                ))
              ) : (
                <div className="testimonial-card">
                  <div className="donor-image">
                    <img src="/images/placeholder.png" alt="placeholder" />
                  </div>
                  <p>No reviews yet.</p>
                </div>
              )}
            </div>

            <div className="testimonial-nav">
              <button className="scroll-arrow" onClick={scrollTestimonialLeft}>&#8249;</button>
              <div className="scroll-dots">
                {[...Array(testimonialTotalPages)].map((_, idx) => (
                  <span
                    key={idx}
                    className={idx === testimonialActiveIndex ? 'active' : ''}
                    onClick={() => scrollToTestimonialIndex(idx)}
                  />
                ))}
              </div>
              <button className="scroll-arrow" onClick={scrollTestimonialRight}>&#8250;</button>
            </div>
          </div>
        </div>

        {/* Featured Hospitals Section */}
        <div id="hospitals" className="featured-hospitals">
          <h2>Featured Hospitals in Need</h2>
          <div className="hospitals-grid">
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <div className="hospital-card" key={hospital.id}>
                  <img src={imageOrPlaceholder(hospital.imageUrl)} alt={hospital.name} className="hospital-image" />
                  <h3>{hospital.name}</h3>
                  <p>{hospital.location}</p>
                  <p><strong>Contact:</strong> {hospital.contactNumber}</p>
                  <button className="cta-button">Donate Now</button>
                </div>
              ))
            ) : (
              <p>No hospitals available.</p>
            )}
          </div>
        </div>

        {/* Call-to-Action for NGOs Section */}
        <div id="ngos" className="cta-ngos">
          <h2>Are You an NGO? Partner with Us</h2>
          <p>Join MediBridge to help hospitals access the resources they need. Together, we can make a greater impact.</p>
          <button className="cta-button">Learn More</button>
        </div>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </>
  );
}

export default HomePage;
