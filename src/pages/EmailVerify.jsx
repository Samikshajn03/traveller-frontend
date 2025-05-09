import React ,{useState} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import '/src/styles/Email.scss';


function Email(){

    const [otp, setOtp]= useState('');
    const {username } = useParams(); 
    const location = useLocation();
    const email = location.state?.email; 

    const navigate = useNavigate(); 

    const verifyApi = 'http://localhost:3000/verify-otp';

    const resendEmail = async () => {

        if (!email) {
            alert("Email not provided.");
            return;
          }
          
        try {
            const response = await fetch(verifyApi, { 
                method: 'POST', 
                body: JSON.stringify({ email }), 
                headers: { 'Content-Type': 'application/json' } 
            });
    
            if (!response.ok) 
                throw new Error('Failed to resend email.');
    
            alert('Verification email resent! Check your inbox.');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleVerification = async () => {
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ otp, email }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Invalid OTP or verification failed.');
            }

            alert('Email verified successfully!');

            // After successful verification, navigate to HomePage
            navigate(`/login`);  // Uncomment if using useNavigate() to redirect
        } catch (error) {
            alert(error.message);
        }
    };

    return(
        <div className="email-main-container">
            <div className="email-whole-container">
                <div className="email-image-section">
                    <div className="heading-section">
                        WanderWise
                    </div>
                    <div className="image">
                        <img src="mail.png" className="email-img"/>
                    </div>
                </div>
                <div className="text-section">
                    <div className="text-section-1">
                        Verify your email address
                    </div>
                    <div className="text-section-2">
                        <div className="sub-section-1">
                            Check your inbox for the confirmation email.
                        </div>
                        {email ? (
                        <div className="sub-section-2">
                        {decodeURIComponent(email)}
                        </div>
                        ) : (
                            <p>No email provided for verification.</p>
            )}
                    </div>
                    <div className="text-section-3">You might need to<div className="spam">check spam folder</div>
                    
                    </div>
                    <div className="otp-container">
                    <input
                  type="otp"
                  className="input-field"
                  value={otp}
                  placeholder='Enter Otp'
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                    </div>
                    <div className="resend-mail-btn" onClick={resendEmail}>
                        Resend Email
                    </div>
                    <div className="verify-otp-btn" onClick={handleVerification}>
                        Verify OTP
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Email;