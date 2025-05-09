import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleMap = () => {
  const [markers, setMarkers] = useState([]);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');  // Token in session storage

  useEffect(() => {
    if (!token) {
      navigate('/login');  // Redirect to login page if no token is found
      return;
    }
    

    // Load Google Maps script
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAP6kxG8JSDCOM7dcEidilN8UM4mtb0ePk&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap; // Initialize the map once script is loaded
      document.head.appendChild(script);
    };

    // Initialize the Google Map
    const initializeMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 12,
      });

      const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
        types: ['geocode'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const { lat, lng } = place.geometry.location;
          setLocation({ lat: lat(), lng: lng() });
          setAddress(place.formatted_address);

          map.setCenter({ lat: lat(), lng: lng() });
          map.setZoom(14);

          // Add a marker for the selected place
          const newMarker = new window.google.maps.Marker({
            position: { lat: lat(), lng: lng() },
            map: map,
            title: place.formatted_address,
          });

          saveMarker(lat(), lng());
        }
      });

      fetchMarkers(map);
    };

    loadScript();
  }, [token, navigate]);

  const fetchMarkers = async (map) => {
    try {
      const response = await fetch('http://localhost:3000/get-markers', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });

      if (response.ok) {
        const { markers } = await response.json();
        setMarkers(markers);

        const bounds = new window.google.maps.LatLngBounds();

        markers.forEach((marker) => {
          const lat = parseFloat(marker.latitude);
          const lng = parseFloat(marker.longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            const markerInstance = new window.google.maps.Marker({
              position: { lat, lng },
              map: map,
              title: 'Saved Marker',
            });
            bounds.extend(new window.google.maps.LatLng(lat, lng));
          }
        });

        map.fitBounds(bounds);
      }
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  const saveMarker = async (lat, lng) => {
    try {
      const response = await fetch('http://localhost:3000/save-marker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token to the backend to identify the user
        },
        body: JSON.stringify({ lat, lng }),
      });

      if (response.ok) {
        console.log('Marker saved!');
      } else {
        console.error('Failed to save marker');
      }
    } catch (error) {
      console.error('Error saving marker:', error);
    }
  };

  return (
    <div>
      <h1>Your Map</h1>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search for a place"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div
        ref={mapRef}
        style={{ width: '100%', height: '1000px', marginTop: '20px' }}
      ></div>
    </div>
  );
};

export default GoogleMap;
