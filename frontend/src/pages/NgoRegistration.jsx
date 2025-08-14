import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/NGORegistration.module.css';

function NgoRegistration() {
  const [form, setForm] = useState({
    ngoName: '',
    registrationNo: '',
    typeOfNgo: '',
    email: '',
    phone: '',
    address: '',
    adminName: '',
    password: '',
    registrationProofImage: null,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm(prev => ({ ...prev, registrationProofImage: file }));

  };

  const validate = () => {
    const newErrors = {};
    
    if (!form.ngoName.trim()) newErrors.ngoName = 'NGO name is required';
    if (!form.registrationNo.trim()) newErrors.registrationNo = 'Registration number is required';
    if (!form.typeOfNgo) newErrors.typeOfNgo = 'NGO type is required';
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.adminName.trim()) newErrors.adminName = 'Admin name is required';
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!form.terms) newErrors.terms = 'You must accept the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAuthError('');

    try {
      const formData = new FormData();
      
      // Create JSON data for all fields except the image
      const jsonData = {
        ngoName: form.ngoName,
        registrationNo: form.registrationNo,
        typeOfNgo: form.typeOfNgo,
        email: form.email,
        phone: form.phone,
        address: form.address,
        adminName: form.adminName,
        password: form.password
      };
      
      // Append JSON data as a blob
      formData.append('data', new Blob([JSON.stringify(jsonData)], {
        type: 'application/json'
      }));
      
      // Append image file separately if it exists
      if (form.registrationProofImage) {
        formData.append('registrationProof', form.registrationProofImage);
      }

      const response = await axios.post(
        'http://localhost:8081/api/ngo/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Registration successful:', response.data);
      window.location.href = '/ngo-login';
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        if (error.response.status === 400) {
          setAuthError(error.response.data.message || error.response.data);
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

  const isFormValid = form.ngoName && form.registrationNo && form.typeOfNgo && 
                     form.email && form.phone && form.address && 
                     form.adminName && form.password && form.terms;

  return (
    <div className={styles.authContainer}>
      <div className={styles.authIllustration}>
        <div>
          <h2 className={styles.illustrationTitle}>Empowering Communities Together</h2>
          <p className={styles.illustrationText}>Register your NGO to connect with donors and make a greater impact.</p>
<img
  src="/images/register-illustration.png"
  alt="NGO Registration Illustration"
  className={styles.illustrationImage}
/>


        </div>
      </div>

      <div className={styles.authFormContainer}>
        <div className={styles.authForm}>
          <h1 className={styles.authTitle}>Register Your NGO</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="ngoName" className={styles.formLabel}>NGO Name *</label>
              <input
                type="text"
                id="ngoName"
                name="ngoName"
                value={form.ngoName}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.ngoName ? styles.errorInput : ''}`}
                placeholder="Helping Hands Foundation"
                required
              />
              {errors.ngoName && <span className={styles.errorText}>{errors.ngoName}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="registrationNo" className={styles.formLabel}>Registration Number *</label>
              <input
                type="text"
                id="registrationNo"
                name="registrationNo"
                value={form.registrationNo}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.registrationNo ? styles.errorInput : ''}`}
                placeholder="123456789"
                required
              />
              {errors.registrationNo && <span className={styles.errorText}>{errors.registrationNo}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="typeOfNgo" className={styles.formLabel}>NGO Type *</label>
              <select
                id="typeOfNgo"
                name="typeOfNgo"
                value={form.typeOfNgo}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.typeOfNgo ? styles.errorInput : ''}`}
                required
              >
                <option value="">Select NGO Type</option>
                <option value="education">Education/Literacy</option>
                <option value="health">Health/Medicine</option>
                <option value="environment">Environment/Sustainability</option>
                <option value="human_rights">Human Rights/Social Justice</option>
                <option value="disaster_relief">Disaster Relief</option>
                <option value="poverty">Poverty Alleviation</option>
                <option value="animals">Animal Welfare</option>
                <option value="other">Other</option>
              </select>
              {errors.typeOfNgo && <span className={styles.errorText}>{errors.typeOfNgo}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.email ? styles.errorInput : ''}`}
                placeholder="contact@ngo.org"
                required
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.phone ? styles.errorInput : ''}`}
                placeholder="+1234567890"
                required
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.formLabel}>Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.address ? styles.errorInput : ''}`}
                placeholder="123 Main St, City, Country"
                required
              />
              {errors.address && <span className={styles.errorText}>{errors.address}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="adminName" className={styles.formLabel}>Admin Name *</label>
              <input
                type="text"
                id="adminName"
                name="adminName"
                value={form.adminName}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.adminName ? styles.errorInput : ''}`}
                placeholder="John Doe"
                required
              />
              {errors.adminName && <span className={styles.errorText}>{errors.adminName}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`${styles.formControl} ${errors.password ? styles.errorInput : ''}`}
                placeholder="••••••••"
                required
                minLength="6"
              />
              <div className={styles.passwordHint}>Must be at least 6 characters</div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="registrationProofImage" className={styles.formLabel}>
                Registration Proof (Optional)
              </label>
              <input
                type="file"
                id="registrationProofImage"
                name="registrationProofImage"
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
                required
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
                'Register NGO'
              ) : (
                <span className={styles.loadingSpinner}>
                  <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              )}
            </button>
          </form>

          <div className={styles.authFooter}>
            Already registered? <Link to="/ngo-login" className={styles.authLink}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NgoRegistration;