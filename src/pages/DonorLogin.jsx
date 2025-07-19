import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaHeartbeat } from 'react-icons/fa';
import axios from 'axios';
import '../styles/DonorLogin.css';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
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

  const validateForm = () => {
    validateEmail();
    validatePassword();
    return form.email && form.password && !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setAuthError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: form.email,
        password: form.password
      });

      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Invalid email or password.');
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

  const isFormValid = form.email && form.password && !errors.email && !errors.password;

  return (
    <div className="auth-container">
      <div className="auth-illustration">
        <div className="illustration-content">

          <h2 className="illustration-title">Donate Blood, Save Lives</h2>
          <p className="illustration-text">Every drop counts. Login to join our community of life-saving donors.</p>
          {showIllustration ? (
            <img
              src="/images/Blood donation.png"
              alt="Blood Donation Illustration"
              className="illustration-image"
              onError={() => setShowIllustration(false)}
            />
          ) : (
            <div className="illustration-placeholder">
              <FaHeartbeat className="placeholder-icon" />
            </div>
          )}
          <div className="donor-stats">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Lives Saved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Active Donors</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <div className="form-header">
            <FaHeartbeat className="form-icon" />
            <h1 className="auth-title">Donor Login</h1>
            <p className="auth-subtitle">Sign in to your donor account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={validateEmail}
                className={`form-control ${errors.email ? 'error-input' : ''}`}
                placeholder="donor@example.com"
              />
              <span className="error-text">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={validatePassword}
                className={`form-control ${errors.password ? 'error-input' : ''}`}
                placeholder="••••••••"
              />
              <span className="error-text">{errors.password}</span>
              <div className="remember-forgot">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
              </div>
            </div>

            {authError && <div className="error-message">{authError}</div>}

            <button
              type="submit"
              className="login-button"
              disabled={loading || !isFormValid}
            >
              {!loading ? (
                <>

                  Sign in
                </>
              ) : (
                <span className="loading-spinner">
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              )}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">Or continue with</div>
            <div className="divider-line"></div>
          </div>

          <div className="social-buttons">
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
            Not a donor yet? <Link to="/registration" className="auth-link">Join our life-saving community</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;