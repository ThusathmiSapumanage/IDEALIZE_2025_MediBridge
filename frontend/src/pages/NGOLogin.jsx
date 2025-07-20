import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';
import '../styles/NGOLogin.css';

function NGOLogin() {
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
  const navigate = useNavigate();

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
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
      return true;
    }
  };

  const validatePassword = () => {
    if (!form.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return false;
    } else if (form.password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
      return true;
    }
  };

  const validateForm = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setAuthError('');

    try {
      const response = await axios.post('http://localhost:8081/api/ngo/login', {
        email: form.email,
        password: form.password
      });

      // Assuming the backend returns an object with token and ngo data
      const { token, ngo } = response.data;
      
      // Store the token and NGO info
      localStorage.setItem('ngoToken', token);
      localStorage.setItem('ngoEmail', form.email);
      localStorage.setItem('ngoId', ngo.id);
      localStorage.setItem('ngoName', ngo.ngoName);

      if (form.remember) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      navigate('/ngo-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        if (error.response.status === 404) {
          setAuthError('No NGO found with this email');
        } else if (error.response.status === 401) {
          setAuthError('Invalid credentials');
        } else {
          setAuthError('Login failed. Please try again.');
        }
      } else {
        setAuthError('Login failed. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = () => {
    alert('GitHub login coming soon');
  };

  const loginWithGoogle = () => {
    alert('Google login coming soon');
  };

  const isFormValid = form.email && form.password && !errors.email && !errors.password;

  return (
    <div className="auth-container">
      <div className="auth-illustration">
        <div>
          <h2 className="illustration-title">Connecting Care, Bridging Hope</h2>
          <p className="illustration-text">Login to manage your NGO and connect with donors.</p>
          {showIllustration ? (
            <img
              src="/images/login-illustration.png"
              alt="Login Illustration"
              className="illustration-image"
              onError={() => setShowIllustration(false)}
            />
          ) : (
            <div className="illustration-placeholder">
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#e2e8f0" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#64748b">Illustration</text>
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <h1 className="auth-title">Sign in to Your NGO Account</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={validateEmail}
                className={`form-control ${errors.email ? 'error-input' : ''}`}
                placeholder="your@email.com"
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
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
                required
                minLength="6"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
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
              {!loading ? 'Sign in' : (
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
            Don't have an account? <Link to="/ngo-register" className="auth-link">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGOLogin;