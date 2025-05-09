import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import EmailVerify from './pages/EmailVerify';
import HomePage from './pages/HomePage.jsx';
import UserData from './pages/UserData.jsx';
import GoogleMap from './pages/GoogleMap.jsx';
import PrivateRoute from './Components/PrivateRoute'; 
import Adminlogin from './pages/Adminlogin'; 
import AdminDashboard from './pages/AdminDashboard.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/Forgotpassword" element={<ForgotPassword />} />
          <Route path="/email-verify/:username" element={<EmailVerify />} />
          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route 
            path="/HomePage/:userId" 
            element={<PrivateRoute element={<HomePage />} />} 
          />
          <Route 
            path="/UserData/:username" 
            element={<PrivateRoute element={<UserData />} />} 
          />
          <Route 
            path="/map/:username" 
            element={<PrivateRoute element={<GoogleMap />} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

{/* <iframe
  width="520"
  height="400"
  style="border:0"
  loading="lazy"
  allowfullscreen
  src="https://maps.google.com/maps?width=520&height=400&hl=en&q=37.7749,-122.4194&t=&z=12&ie=UTF8&iwloc=B&output=embed">
</iframe> */}
