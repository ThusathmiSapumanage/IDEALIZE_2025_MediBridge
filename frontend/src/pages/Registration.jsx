import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';
import styles from '../styles/Registration.module.css';

function Registration() {
  const [form, setForm] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    userBloodType: '',
    userLocation: '',
    userPhone: '',
    userImage: null,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showIllustration, setShowIllustration] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm(prev => ({ ...prev, userImage: file }));
  
  };

  const validate = () => {
    const newErrors = {};
    
    // Validate username (required)
    if (!form.userName.trim()) {
      newErrors.userName = 'Username is required';
    }
    
    // Validate email (required)
    if (!form.userEmail.trim()) {
      newErrors.userEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.userEmail)) {
      newErrors.userEmail = 'Invalid email format';
    }
    
    // Validate password (required)
    if (!form.userPassword) {
      newErrors.userPassword = 'Password is required';
    } else if (form.userPassword.length < 6) {
      newErrors.userPassword = 'Password must be at least 6 characters';
    }
    
    // Validate location (required)
    if (!form.userLocation.trim()) {
      newErrors.userLocation = 'Location is required';
    }
    
    // Validate phone (required)
    if (!form.userPhone.trim()) {
      newErrors.userPhone = 'Phone number is required';
    }
    
    // Validate terms (required)
    if (!form.terms) {
      newErrors.terms = 'You must accept the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validate()) return;

    setLoading(true);
    setAuthError('');

    try {
      const formData = new FormData();
      formData.append('userName', form.userName);
      formData.append('userEmail', form.userEmail);
      formData.append('userPassword', form.userPassword);
      formData.append('userLocation', form.userLocation);
      formData.append('userPhone', form.userPhone);
      
      // Append optional fields only if they exist
      if (form.userBloodType) {
        formData.append('userBloodType', form.userBloodType);
      }
      
      // FIX: Always append userImage even if null
      formData.append('userImage', form.userImage || '');

      const response = await axios.post(
        'http://localhost:8080/api/donor/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Handle successful registration
      console.log('Registration successful:', response.data);
      window.location.href = '/donor-login';
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        // Handle specific backend errors
        if (error.response.status === 400) {
          if (error.response.data.includes('Email')) {
            setAuthError('Email already registered');
          } else if (error.response.data.includes('Username')) {
            setAuthError('Username already taken');
          } else if (error.response.data.includes('image')) {
            setAuthError('Invalid image file');
          } else {
            setAuthError(error.response.data);
          }
        } else {
          setAuthError('Registration failed. Please try again.');
        }
      } else {
        setAuthError('Registration failed. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = form.userName && form.userEmail && form.userPassword && 
                     form.userLocation && form.userPhone && form.terms;

  return (
    <div className={styles.authContainer}>
      <div className={styles.authIllustration}>
        <div>
          <h2 className={styles.illustrationTitle}>Connecting Care, Saving Lives</h2>
          <p className={styles.illustrationText}>Donate with purpose. Support hospitals and those in urgent need.</p>
          {showIllustration ? (
            imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className={styles.illustrationImage}
              />
            ) : (
              <img
                src="/images/register-illustration.png"
                alt="Registration Illustration"
                className={styles.illustrationImage}
                onError={() => setShowIllustration(false)}
              />
            )
          ) : (
            <div className={styles.illustrationPlaceholder}>
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#e2e8f0" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#64748b">Illustration</text>
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className={styles.authFormContainer}>
        <div className={styles.authForm}>
          <h1 className={styles.authTitle}>Create your account</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="userName" className={styles.formLabel}>Username *</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.userName ? styles.errorInput : ''}`}
                placeholder="JohnDoe123"
              />
              {errors.userName && <span className={styles.errorText}>{errors.userName}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userEmail" className={styles.formLabel}>Email *</label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={form.userEmail}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.userEmail ? styles.errorInput : ''}`}
                placeholder="you@example.com"
              />
              {errors.userEmail && <span className={styles.errorText}>{errors.userEmail}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userPassword" className={styles.formLabel}>Password *</label>
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                value={form.userPassword}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.userPassword ? styles.errorInput : ''}`}
                placeholder="••••••••"
              />
              <div className={styles.passwordHint}>Must be at least 6 characters</div>
              {errors.userPassword && <span className={styles.errorText}>{errors.userPassword}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userBloodType" className={styles.formLabel}>Blood Type (Optional)</label>
              <select
                id="userBloodType"
                name="userBloodType"
                value={form.userBloodType}
                onChange={handleChange}
                className={styles.formControl}
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userLocation" className={styles.formLabel}>Location *</label>
              <input
                type="text"
                id="userLocation"
                name="userLocation"
                value={form.userLocation}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.userLocation ? styles.errorInput : ''}`}
                placeholder="City, Country"
              />
              {errors.userLocation && <span className={styles.errorText}>{errors.userLocation}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userPhone" className={styles.formLabel}>Phone Number *</label>
              <input
                type="tel"
                id="userPhone"
                name="userPhone"
                value={form.userPhone}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.userPhone ? styles.errorInput : ''}`}
                placeholder="+1234567890"
              />
              {errors.userPhone && <span className={styles.errorText}>{errors.userPhone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userImage" className={styles.formLabel}>Profile Image (Optional)</label>
              <input
                type="file"
                id="userImage"
                name="userImage"
                onChange={handleFileChange}
                className={styles.formControl}
                accept="image/*"
              />
            </div>

            <div className={styles.termsAgreement}>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <Link to="/terms" className={styles.termsLink}>
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className={styles.termsLink}>
                  Privacy Policy
                </Link>
              </label>
              {errors.terms && <span className={styles.errorText}>{errors.terms}</span>}
            </div>

            {authError && <div className={styles.errorMessage}>{authError}</div>}

            <button
              type="submit"
              className={styles.registerButton}
              disabled={loading || !isFormValid}
            >
              {!loading ? (
                'Create Account'
              ) : (
                <span className={styles.loadingSpinner}>
                  <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerText}>Or continue with</div>
          </div>

          <div className={styles.socialButtons}>
            <button type="button" className="social-button github" onClick={() => alert('GitHub login coming soon')}>
              <FaGithub className="social-icon" />
              GitHub
            </button>
            <button type="button" className="social-button google" onClick={() => alert('Google login coming soon')}>
              <img src="/images/google-icon.svg" alt="Google" className="social-icon" />
              Google
            </button>
          </div>

          <div className="auth-footer">
            Already have an account? <Link to="/donor-login" className="auth-link">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;