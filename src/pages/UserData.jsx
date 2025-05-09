import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '/src/styles/UserData.scss';

const decodeJWT = (token) => {
  const base64Url = token.split('.')[1]; 
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
  const decodedPayload = atob(base64);
  return JSON.parse(decodedPayload);
};

export default function UserData() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); 
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null); 
  const navigate = useNavigate();
  const { username: paramUsername } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
      return;
    }

    try {
      const decodedToken = decodeJWT(token);
      setUserId(decodedToken.userId);
      setUsername(decodedToken.username);
      setEmail(decodedToken.email);

      fetchUserProfile(decodedToken.email);

      if (paramUsername && paramUsername !== decodedToken.username) {
        alert('You are not authorized to view this profile.');
        navigate(`/HomePage/${decodedToken.userId}`);
      }
    } catch (err) {
      console.error('Error decoding token:', err);
      navigate('/login');
    }
  }, [paramUsername, navigate]);

  const fetchUserProfile = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/getUserProfile?email=${email}`);
      const userProfile = response.data;
      setProfileData(userProfile);
      setImageUrl(userProfile.profileImageUrl || ''); 
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('An error occurred while fetching the user profile.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(imageUrl);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = async () => {
    if (!username || !email || !image) {
      setError('Please fill all fields and select an image');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('profileImage', image);

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadedImageUrl = response.data.data.profileImageUrl;
      setImageUrl(uploadedImageUrl); 
      alert('Profile image uploaded successfully');
      handleModalClose();
    } catch (err) {
      setError('An error occurred while uploading the image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const handleDownloadProfile = async () => {
    const token = sessionStorage.getItem('token');
    if (!userId || !token) {
      alert('User ID or token not found.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/dwnld-profile/${userId}`, {
        responseType: 'blob', 
        headers: { Authorization: `Bearer ${token}` }
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `user_profile_${userId}.pdf`; 
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
    }
  };

  return (
    <div className="container">
      <div className="color-container">
        <div className="profileInfoContainer">
          <div className="profileImageContainer">
            <img
              src={imageUrl || profileData?.profileImageUrl || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profileImage"
            />
            <div onClick={handleModalOpen} className="uploadButton">
              <FaCamera style={{ color: '#fff', fontSize: '24px' }} />
            </div>
          </div>
          <div className="profileDetails">
            <p className="profile-name"><strong>{username || profileData?.username}</strong></p>
            <p className="profile-email">Email: {email || profileData?.email}</p>
          </div>
        </div>

        <button onClick={handleDownloadProfile} className="downloadButton">
          Download Profile PDF
        </button>

        {/* Modal for uploading profile image */}
        {isModalOpen && (
          <div className="modalOverlay">
            <div className="modalContainer">
              <h3>Upload Profile Image</h3>
              <div className="inputContainer">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  disabled
                />
              </div>
              <div className="inputContainer">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  disabled
                />
              </div>
              <div className="inputContainer">
                <label>Profile Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input"
                />
              </div>
              <button onClick={handleImageUpload} className="submitButton" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Image'}
              </button>
              {error && <div className="error">{error}</div>}
              <button onClick={handleModalClose} className="closeButton">
                Close
              </button>
            </div>
          </div>
        )}

        <button onClick={handleLogout} className="logoutButton">
          Logout
        </button>
      </div>
    </div>
  );
}
