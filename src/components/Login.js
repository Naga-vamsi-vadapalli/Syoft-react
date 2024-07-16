import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

const LogIn = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null); // State to handle login errors
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.user_email) {
      errors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      errors.user_email = 'Email is invalid';
    }
    if (!formData.user_password) errors.user_password = 'Password is required';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', formData);
      // Check if response contains user data
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Adjust if user data is nested
        navigate('/dashboard');
      } else {
        setLoginError('Invalid login credentials'); // Error message for invalid credentials
      }
    } catch (error) {
      console.error(error);
      setLoginError('An error occurred during login'); // Error message for API errors
    }
  };

  return (
    <div className="form-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={formData.user_email}
          onChange={handleChange}
        />
        {errors.user_email && <p className="error">{errors.user_email}</p>}
        
        <input
          type="password"
          name="user_password"
          placeholder="Password"
          value={formData.user_password}
          onChange={handleChange}
        />
        {errors.user_password && <p className="error">{errors.user_password}</p>}
        
        <button type="submit">Log In</button>
      </form>
      {loginError && <p className="error">{loginError}</p>} {/* Display login errors */}
    </div>
  );
};

export default LogIn;
