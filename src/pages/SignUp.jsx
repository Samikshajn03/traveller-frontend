import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaRegEnvelope, FaLock, FaRegEye } from 'react-icons/fa';
import '/src/styles/Signup.scss';


const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const signupApi = import.meta.env.VITE_API_SIGNUP;

  const signup = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(signupApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed. Please try again.');
      }

      const data = await response.json(); // Await the response.json()
      setSuccess('Signup successful!'); 
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-main-container">
        <div className="signup-whole-container">
          <div className="signup-details-container">
            <div className="container-heading">WanderWise</div>

            <div className="details-container">
            <p className="signup-text">SIGN UP</p>
            <form className="details-fields" onSubmit={signup}>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && <p style={{ color: 'green' }}>{success}</p>}
              <div className="name-field">
                <FaUser style={{ marginRight: '8px', color: 'black' }} />
                <input
                  type="text"
                  value={name}
                  className="input-field"
                  placeholder="User Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="email-field">
                <FaRegEnvelope style={{ marginRight: '8px', color: 'black' }} />
                <input
                  type="email"
                  value={email}
                  className="input-field"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="password-field">
                <FaLock style={{ marginRight: '8px', color: 'black' }} />
                <input
                  type="password"
                  value={password}
                  className="input-field"
                  placeholder="Create Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="confirm-password-field"> 
                <FaRegEye style={{ marginRight: '8px', color: 'black' }} />
                <input
                  type="password"
                  value={confirmPassword}
                  className="input-field"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="signup-btn">Sign Up</button>
            </form>
            <p className="acc-text">Already have an account ?<Link to="/login" className='log-text'> Login</Link></p>
          </div>
          </div>
          <div className="signup-image-container">
            <div className='image-container-heading'>
              Wander beyond borders...!!!
            </div>
            <div className='image-container-text'>
              The world is yours to explore
            </div>
            <div className='image'>
            <img src='signup.svg' className='signup-img' alt="Signup" />
            </div>
          </div>
        </div>
    </div>
  );
};

export default SignUpForm;
