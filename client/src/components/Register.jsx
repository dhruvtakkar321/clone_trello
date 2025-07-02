// src/components/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/auth.Service';
import { toast } from 'react-toastify';
import '../styles/authForm.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      if (result?._id || result?.token) {
        toast.success('Registration successful! You can now log in.');
        navigate('/'); // Navigate to login page after successful registration
      } else {
        // This case might occur if the API call was successful but the response
        // didn't contain expected data, or if the backend logic implies failure
        // without throwing an explicit error.
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Display a more specific error message if available from the backend
      // e.g., error.response.data.message for Axios errors
      toast.error(error.response?.data?.message || 'Registration failed. An unexpected error occurred.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {/* Added the 'auth-form' class to the form element */}
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <input
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
        />
        {/* Added the 'error' class to the error paragraph */}
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          placeholder="Email"
          {...register('email', { required: 'Email is required', pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address'
          }})}
        />
        {/* Added the 'error' class to the error paragraph */}
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required', minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          } })}
        />
        {/* Added the 'error' class to the error paragraph */}
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;