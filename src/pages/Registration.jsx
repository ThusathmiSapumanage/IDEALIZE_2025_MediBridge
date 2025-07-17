import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';
import styles from '../styles/Registration.module.css';

function Registration() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    photoUrl: null,
    password: '',
    password_confirmation: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showIllustration, setShowIllustration] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateEmail = () => {
    if (!form.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!isValidEmail(form.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validatePassword = () => {
    if (!form.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    } else if (form.password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const validateConfirmPassword = () => {
    if (form.password !== form.password_confirmation) {
      setErrors(prev => ({ ...prev, password_confirmation: 'Passwords do not match' }));
    } else {
      setErrors(prev => ({ ...prev, password_confirmation: '' }));
    }
  };

  const validateName = () => {
    if (!form.name) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }));
    } else {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const validateTerms = () => {
    if (!form.terms) {
      setErrors(prev => ({ ...prev, terms: 'You must accept the terms' }));
    } else {
      setErrors(prev => ({ ...prev, terms: '' }));
    }
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateTerms();

    return !errors.name && !errors.email && !errors.password &&
      !errors.password_confirmation && !errors.terms &&
      form.name && form.email && form.password &&
      form.password_confirmation && form.terms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setAuthError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
        photoUrl: form.photoUrl
      });

      console.log('Registration successful:', response.data);
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        console.error('Backend error response:', error.response.data);
        setAuthError(error.response.data?.error || 'An unexpected error occurred.');
      } else {
        setAuthError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = () => {
    window.location.href = 'http://localhost:8080/auth/github';
  };

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  };

  const isFormValid = form.name && form.email && form.password &&
    form.password_confirmation && form.terms &&
    !errors.name && !errors.email && !errors.password &&
    !errors.password_confirmation && !errors.terms;

  return (
    <div className={styles.authContainer}>
      <div className={styles.authIllustration}>
        <div>
          <h2 className={styles.illustrationTitle}>Connecting Care, Saving Lives</h2>
          <p className={styles.illustrationText}>Donate with purpose. Support hospitals and those in urgent need.</p>
          {showIllustration ? (
            <img
              src="/images/register-illustration.png"
              alt="Registration Illustration"
              className={styles.illustrationImage}
              onError={() => setShowIllustration(false)}
            />
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
              <label htmlFor="name" className={styles.formLabel}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={validateName}
                className={`${styles.formControl} ${errors.name ? styles.errorInput : ''}`}
                placeholder="John Doe"
              />
              <span className={styles.errorText}>{errors.name}</span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={validateEmail}
                className={`${styles.formControl} ${errors.email ? styles.errorInput : ''}`}
                placeholder="you@example.com"
              />
              <span className={styles.errorText}>{errors.email}</span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={validatePassword}
                className={`${styles.formControl} ${errors.password ? styles.errorInput : ''}`}
                placeholder="••••••••"
              />
              <div className={styles.passwordHint}>Use at least 8 characters with numbers</div>
              <span className={styles.errorText}>{errors.password}</span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password_confirmation" className={styles.formLabel}>Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                onBlur={validateConfirmPassword}
                className={`${styles.formControl} ${errors.password_confirmation ? styles.errorInput : ''}`}
                placeholder="••••••••"
              />
              <span className={styles.errorText}>{errors.password_confirmation}</span>
            </div>

            <div className={styles.termsAgreement}>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                onBlur={validateTerms}
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
              <span className={styles.errorText}>{errors.terms}</span>
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
            <button type="button" className="social-button github" onClick={loginWithGithub}>
              <FaGithub className="social-icon" />
              GitHub
            </button>
            <button type="button" className="social-button google" onClick={loginWithGoogle}>
              <img src="/images/google-icon.svg" alt="Google" className="social-icon" />
              Google
            </button>
          </div>

          <div className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;