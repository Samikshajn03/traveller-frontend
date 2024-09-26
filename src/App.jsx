import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
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
