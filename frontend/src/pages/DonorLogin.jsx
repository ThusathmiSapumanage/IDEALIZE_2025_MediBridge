import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaHeartbeat } from 'react-icons/fa';
import axios from 'axios';
import '../styles/DonorLogin.css';

function Login() {
  const [form, setForm] = useState({
    userEmail: '',  // Changed to match backend field
    userPassword: '',  // Changed to match backend field
    remember: false
  });
  const [errors, setErrors] = useState({
    userEmail: '',
    userPassword: ''
  });
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showIllustration, setShowIllustration] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateEmail = () => {
    if (!form.userEmail) {
      setErrors(prev => ({ ...prev, userEmail: 'Email is required' }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.userEmail)) {
      setErrors(prev => ({ ...prev, userEmail: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, userEmail: '' }));
    }
  };

  const validatePassword = () => {
    if (!form.userPassword) {
      setErrors(prev => ({ ...prev, userPassword: 'Password is required' }));
    } else if (form.userPassword.length < 6) {
      setErrors(prev => ({ 
        ...prev, 
        userPassword: 'Password must be at least 6 characters' 
      }));
    } else {
      setErrors(prev => ({ ...prev, userPassword: '' }));
    }
  };

  const validateForm = () => {
    validateEmail();
    validatePassword();
    return form.userEmail && form.userPassword && 
           !errors.userEmail && !errors.userPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setAuthError('');

    try {
      // Updated to match your backend endpoint and payload
      const response = await axios.post(
        'http://localhost:8080/api/donor/login',
        {
          userEmail: form.userEmail,
          userPassword: form.userPassword
        }
      );

      // Save JWT token to localStorage
      localStorage.setItem('token', response.data);
      
      // Redirect to dashboard
      navigate('/donor-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(
        error.response?.data || 
        'Invalid credentials. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = form.userEmail && form.userPassword && 
                     !errors.userEmail && !errors.userPassword;

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
              <label htmlFor="userEmail" className="form-label">Email address</label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={form.userEmail}
                onChange={handleChange}
                onBlur={validateEmail}
                className={`form-control ${errors.userEmail ? 'error-input' : ''}`}
                placeholder="donor@example.com"
              />
              <span className="error-text">{errors.userEmail}</span>
            </div>

            <div className="form-group">
              <label htmlFor="userPassword" className="form-label">Password</label>
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                value={form.userPassword}
                onChange={handleChange}
                onBlur={validatePassword}
                className={`form-control ${errors.userPassword ? 'error-input' : ''}`}
                placeholder="••••••••"
              />
              <span className="error-text">{errors.userPassword}</span>
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
                "Sign in"
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
            <button type="button" className="social-button github">
              <FaGithub className="social-icon" />
              GitHub
            </button>
            <button type="button" className="social-button google">
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