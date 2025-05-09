import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaSearch } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import ContentBox from '/src/Components/ContentBox.jsx';
import axios from 'axios'; 
import '/src/styles/HomePage.scss';

export default function Home() {
    const navigate = useNavigate();
    const { username } = useParams();
    const [userData, setUserData] = useState(null); 
    const [profileImageUrl, setProfileImageUrl] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(''); 

    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem('token'); 
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:3000/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const user = response.data;
                setUserData(user);
                setProfileImageUrl(user.profileImageUrl || 'https://via.placeholder.com/150'); // Default image

            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('An error occurred while fetching user data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // Redirect if the logged-in user's username doesn't match the URL
    useEffect(() => {
        if (userData && userData.username !== username) {
            navigate(`/HomePage/${userData.username}`);
        }
    }, [userData, username, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>No user data found. Please log in again.</div>;
    }

    const handleclick = () => {
        navigate(`/UserData/${userData.username}`);
    };

    const mapclick = () => {
        navigate(`/map/${userData.username}`);
    };

    return (
        <div className="home-main-container">
            <div className="header">
                <div className="logo-name">
                    Welcome {userData.username || "Guest"} Wanderer
                </div>
                <div className="profile-image-container">
                    <img
                        src={profileImageUrl}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
            </div>

            <div className="side-bar">
                <div className="my-profile" onClick={handleclick} style={{cursor: 'pointer'}}>
                    <FaUser style={{ marginRight: '8px', color: 'black' }} /> My Profile
                </div>
                <div className="search">
                    <FaSearch style={{ marginRight: '8px', color: 'black' }} />
                    Search
                </div>
                <div className="travel-map" onClick={mapclick} style={{cursor: 'pointer'}}>
                    <MdLocationOn style={{ marginRight: '8px', color: 'black' }} />
                    Travel Map
                </div>
            </div>

            <div className="main-content">
                <ContentBox username={userData.username} />
            </div>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
