import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '/src/styles/AdminDashboard.scss';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login'); 
    }
  }, [navigate]);

  
  const fetchUsers = async () => {
    const token = sessionStorage.getItem('adminToken');
    try {
      const response = await axios.get('http://localhost:3000/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setUsers(response.data); 
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);  
      } else {
        setError('An error occurred while fetching users.');  
      }
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {error && <p className="error-message">{error}</p>}
      <div className="cards-container">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <div className="card" key={user.UserId}>
              <h3 className="card-title">{user.username}</h3>
              <p><strong>User ID:</strong> {user.UserId}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
