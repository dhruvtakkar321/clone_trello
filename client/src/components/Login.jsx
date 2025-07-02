// src/components/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth.Service';
import { toast } from 'react-toastify';
import '../styles/authForm.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data.email, data.password);
      if (result?.token) {
        toast.success('Login successful!');
        navigate('/app');
      } else {
        // Handle cases where loginUser returns no token but no error was thrown
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Display a more specific error message if available from the backend
      toast.error(error.response?.data?.message || 'Login failed. An unexpected error occurred.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {/* Added the 'auth-form' class to the form element */}
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <input
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
        />
        {/* Added the 'error' class to the error paragraph */}
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
        />
        {/* Added the 'error' class to the error paragraph */}
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;