import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEnvelope, FaRegEye } from 'react-icons/fa';
import '/src/styles/Login.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loginApi = import.meta.env.VITE_API_LOGIN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await fetch(loginApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed!! 🥹');
      }

      const data = await response.json();
      setSuccess('Login successful! 🥳'); 
      
      
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='login-main-container'>
        <div className="login-whole-container">
          <div className="login-details-container">
          <div className="container-heading">WanderWise</div>

            <div className="detail-container">
            <p className="login-text">LOGIN</p>
            <form onSubmit={handleSubmit} className="data">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && <p style={{ color: 'green' }}>{success}</p>}
              <div className='email-input'>
                <FaRegEnvelope style={{ marginRight: '8px', color: 'black' }} />
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='password-input'>
                <FaRegEye style={{ marginRight: '8px', color: 'black' }} />
                <input
                  type="password"
                  className='input-field'
                  value={password}
                  placeholder='Enter Password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>
            <div>
              <button type="submit" className='login-btn'>Login</button>
              </div>
            <div className='base-text'>
              <div>
              <p className='forget-pwd'>Forgot Password?</p></div>
              <div>
              <p className="acc-text">Don't have an account?<Link to="/" className='sign-text'> SignUp</Link></p></div>
            </div> 
          </div>
          </div>
          <div className="login-image-container">
          <div className='image-container-heading'>
              Wander beyond borders...!!!
            </div>
            <div className='image-container-text'>
              The world is yours to explore
            </div>
            <div className='image'>
            <img src='signup.svg' className='login-img' alt="Signup" />
            </div>
          </div>
        </div>
    </div>
  );
};

export default LoginForm;
