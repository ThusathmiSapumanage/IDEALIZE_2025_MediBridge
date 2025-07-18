import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import Chatbot from '../components/Chatbot';
import '../styles/HomePage.css';

function HomePage() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = 7;
  const cardsPerPage = 3;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const handleScroll = () => {
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0].offsetWidth + 20;
    const index = Math.round(scrollLeft / (cardWidth * cardsPerPage));
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    const cardWidth = container.children[0].offsetWidth + 20;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % totalPages;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [totalPages]);

  // Donor Testimonial Carousel Logic
  const testimonialScrollRef = useRef(null);
  const [testimonialActiveIndex, setTestimonialActiveIndex] = useState(0);
  const testimonialCardsPerPage = 3;
  const testimonialCards = 10;
  const testimonialTotalPages = Math.ceil(testimonialCards / testimonialCardsPerPage);

  const handleTestimonialScroll = () => {
    const container = testimonialScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0].offsetWidth + 20;
    const index = Math.round(scrollLeft / (cardWidth * testimonialCardsPerPage));
    setTestimonialActiveIndex(index);
  };

  const scrollToTestimonialIndex = (index) => {
    const container = testimonialScrollRef.current;
    const cardWidth = container.children[0].offsetWidth + 20;
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
    const interval = setInterval(() => {
      setTestimonialActiveIndex((prev) => {
        const nextIndex = (prev + 1) % testimonialTotalPages;
        scrollToTestimonialIndex(nextIndex);
        return nextIndex;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonialTotalPages]);

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
              {[
                {
                  title: "Oxygen Cylinder Shortage – St. Mary’s",
                  desc: "St. Mary’s Hospital is facing a critical shortage of oxygen cylinders for pneumonia patients. Donations will help ensure uninterrupted oxygen supply in the ICU and emergency wards."
                },
                {
                  title: "Medicine Refill – Children’s Hospital",
                  desc: "The pediatric unit urgently needs common medications for children with chronic conditions and infections. Your support can help restock vital drugs for effective treatment."
                },
                {
                  title: "Blood Donors Needed – City Care",
                  desc: "The blood bank at City Care Hospital is running dangerously low on all major blood groups. Donations can help maintain emergency preparedness for trauma and surgical patients."
                },
                {
                  title: "Ventilator Repair – Hope Medical",
                  desc: "Two essential ICU ventilators are currently non-functional, impacting care for patients in respiratory distress. Funding is needed immediately for professional repairs and testing."
                },
                {
                  title: "Neonatal ICU Support – Ridgeway",
                  desc: "Premature infants at Ridgeway Medical are in urgent need of incubators, warmers, and specialized monitoring systems to ensure survival and healthy development. Your contribution can make a direct impact."
                },
                {
                  title: "Emergency Beds – Mercy Hospital",
                  desc: "Patient intake has surged at Mercy Hospital, creating a bed shortage in emergency wards. Help us expand capacity by funding additional emergency beds and essential bedding."
                },
                {
                  title: "Surgical Kits – Unity Clinic",
                  desc: "Unity Clinic requires basic and sterile surgical kits to continue scheduled and emergency surgeries. Supplies are running low and delays are impacting patient recovery. Help restock today."
                },
              ].map((item, idx) => (
                <div className="urgent-card" key={idx}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="urgent-nav">
              <button className="scroll-arrow" onClick={scrollLeft}>&#8249;</button>
              <div className="scroll-dots">
                {[...Array(totalPages)].map((_, idx) => (
                  <span key={idx} className={idx === activeIndex ? 'active' : ''} onClick={() => scrollToIndex(idx)} />
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
              {[
                {
                  img: "/images/donor1.jpeg",
                  text: "“Supporting MediBridge has been incredibly rewarding. I love seeing exactly where my help goes.”",
                  name: "– Nisal Perera"
                },
                {
                  img: "/images/donor2.jpg",
                  text: "“This platform makes donating so transparent and easy. I trust them fully.”",
                  name: "– Rohan Mehta"
                },
                {
                  img: "/images/donor3.jpg",
                  text: "“Knowing my donation helped children in critical care makes me want to give more.”",
                  name: "– Ayesha Khan"
                },
                {
                  img: "/images/donor4.jpg",
                  text: "“MediBridge made it easy to support the hospitals that need it most.”",
                  name: "– Sanjay Rao"
                },
                {
                  img: "/images/donor5.jpg",
                  text: "“I regularly donate through MediBridge because I trust their process and values.”",
                  name: "– Rina De Silva"
                },
                {
                  img: "/images/donor6.jpg",
                  text: "“It’s amazing to see the updates from the hospitals after donating.”",
                  name: "– Kabir Shah"
                },
                {
                  img: "/images/donor7.jpg",
                  text: "“I feel connected to the causes I support — this platform is life-changing.”",
                  name: "– Manel Deshmukh"
                },
                {
                  img: "/images/donor8.jpg",
                  text: "“MediBridge ensures my help reaches where it’s most needed.”",
                  name: "– Tharun Wijesinghe"
                },
                {
                  img: "/images/donor9.jpg",
                  text: "“The transparency and communication from MediBridge is top-notch.”",
                  name: "– Shreya Menon"
                }
              ].map((item, idx) => (
                <div className="testimonial-card" key={idx}>
                  <div className="donor-image">
                    <img src={item.img} alt={`Donor ${idx + 1}`} />
                  </div>
                  <p>{item.text}</p>
                  <h4>{item.name}</h4>
                </div>
              ))}
            </div>
            <div className="testimonial-nav">
              <button className="scroll-arrow" onClick={scrollTestimonialLeft}>&#8249;</button>
              <div className="scroll-dots">
                {[...Array(testimonialTotalPages)].map((_, idx) => (
                  <span key={idx} className={idx === testimonialActiveIndex ? 'active' : ''} onClick={() => scrollToTestimonialIndex(idx)} />
                ))}
              </div>
              <button className="scroll-arrow" onClick={scrollTestimonialRight}>&#8250;</button>
            </div>
          </div>
        </div>

        {/* Featured Hospitals Section */}
        <div id="hospitals" className="featured-hospitals">
          <h2>Featured Hospitals in Need</h2>
          <div className="hospital-card">
            <img src="/images/hospital1.jpg" alt="St. Mary’s Hospital" className="hospital-image" />
            <h3>St. Mary’s Hospital</h3>
            <p>Emergency room equipment needed urgently. Help now!</p>
            <button className="cta-button">Donate Now</button>
          </div>
          <div className="hospital-card">
            <img src="/images/hospital2.jpg" alt="Lady Ridgeway Hospital" className="hospital-image" />
            <h3>Lady Ridgeway Hospital</h3>
            <p>Oxygen cylinders urgently required for newborn care.</p>
            <button className="cta-button">Donate Now</button>
          </div>
        </div>

        {/* Call-to-Action for NGOs Section */}
        <div id="ngos" className="cta-ngos">
          <h2>Are You an NGO? Partner with Us</h2>
          <p>Join MediBridge to help hospitals access the resources they need. Together, we can make a greater impact.</p>
          <button className="cta-button">Learn More</button>
        </div>

        {/* Footer Section */}
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
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </>
  );
}

export default HomePage;
