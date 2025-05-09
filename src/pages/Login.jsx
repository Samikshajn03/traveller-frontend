import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEnvelope, FaRegEye } from 'react-icons/fa';
import '/src/styles/Login.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); 
  const loginApi = 'http://localhost:3000/login';

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed!');
      }

      const data = await response.json();
      setSuccess('Login successful! 🥳');

      sessionStorage.setItem('token', data.token);  
      
      const userData = JSON.parse(localStorage.getItem('userData')) || {};

      
      const updatedUserData = {
        ...userData,  
        email: data.email || userData.email,  
        username: data.username || userData.username,    
      };

      
      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      setEmail('');
      setPassword('');

      navigate(`/HomePage/${data.userId}`);
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

              <div>
                <button type="submit" className='login-btn'>Login</button>
              </div>
            </form>

            <div className='base-text'>
              <div>
                <p><Link to="/Adminlogin">Login as admin</Link></p>
                <p>
                  <Link to="/ForgotPassword" className='forget-pwd'> Forgot Password? </Link>
                </p>
              </div>
              <div>
                <p className="acc-text">
                  Don't have an account?
                  <Link to="/" className='sign-text'> SignUp</Link>
                </p>
              </div>
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
