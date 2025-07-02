import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/auth.Service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Required for toast styles
import '../styles/authForm.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      if (result?.message === 'User registered successfully') {
        toast.success('Registration successful!');
        navigate('/');
      } else {
        toast.error('Registration failed.');
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
