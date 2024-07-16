import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_firstname: '',
    user_email: '',
    user_phone: '',
    user_password: '',
  });
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.user_firstname) errors.user_firstname = 'First name is required';
    if (!formData.user_email) {
      errors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      errors.user_email = 'Email is invalid';
    }
    if (!formData.user_phone) {
      errors.user_phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.user_phone)) {
      errors.user_phone = 'Phone number is invalid';
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
    const payload = {
      ...formData,
      user_lastname: 'Doe',
      user_city: 'Hyderabad',
      user_zipcode: '500072',
    };

    try {
      const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', payload);
      console.log(response.data);
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <h1>Welcome!</h1>
        <p>Join the Talent Community</p>
      </div>
      <div className="right-side">
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="user_firstname"
              placeholder="First Name"
              value={formData.user_firstname}
              onChange={handleChange}
            />
            {errors.user_firstname && <p className="error">{errors.user_firstname}</p>}
            
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              value={formData.user_email}
              onChange={handleChange}
            />
            {errors.user_email && <p className="error">{errors.user_email}</p>}
            
            <input
              type="text"
              name="user_phone"
              placeholder="Phone"
              value={formData.user_phone}
              onChange={handleChange}
            />
            {errors.user_phone && <p className="error">{errors.user_phone}</p>}
            
            <input
              type="password"
              name="user_password"
              placeholder="Password"
              value={formData.user_password}
              onChange={handleChange}
            />
            {errors.user_password && <p className="error">{errors.user_password}</p>}
            
            <button type="submit">Sign Up</button>
          </form>
          {registrationSuccess && <p>Registration successful! Redirecting to login...</p>}
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
