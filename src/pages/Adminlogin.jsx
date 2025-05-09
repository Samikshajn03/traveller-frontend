import React, { useState } from 'react';
import axios from 'axios';
import '/src/styles/Adminlogin.scss'

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password || !adminKey) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/admin/login', {
        email,
        password,
        adminKey,
      });

      
      sessionStorage.setItem('adminToken', response.data.token); 

     
      window.location.href = '/admin/dashboard'; 
    } catch (err) {
      
      if (err.response && err.response.data) {
        setError(err.response.data.message);  
      } else {
        setError('An error occurred. Please try again.'); 
      }
      console.error('Login error:', err);  
    }
  };

  return (
    <div className='whole-container'>
        <div className='form-box'>

      <h2 className='heading'>Admin Login</h2>
      
      <input
      className='email'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
     
      <input
      className='password'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
     
      <input
      className='admin-key'
        type="text"
        placeholder="Admin Key"
        value={adminKey}
        onChange={(e) => setAdminKey(e.target.value)}
      />
      
      <button className='loginbtn' onClick={handleLogin}>Login</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}  
      </div>
    </div>
  );
};

export default AdminLogin;
