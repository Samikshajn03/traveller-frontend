import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import '/src/styles/forgotpwd.scss'

function Forgot(){

    const [email, setEmail]= useState('');

    return(
        <div className="forgot-main-container">
            <div className="forgot-whole-container">
                <div className="forgot-image-container">
                    <div className="heading">
                        WanderWise
                    </div>
                    <div className="image-section">
                        <img src="forgot-pwd.svg" className="forgot-img"/>
                    </div>
                </div>
                <div className="forgot-textual-container">
                    <div className="forgot-pwd-heading">
                        Forgot Your Password ?
                    </div>
                    <div className="email-text">
                        <div>Please enter your login email to receive the </div>
                        <div>password reset link.</div>
                    </div>
                    <form>
                        <label>Enter email address</label>
                        <input 
                        type="text"
                        placeholder="xyz@gmail.com"
                        className="email-input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </form>
                    <div className="request-link-btn">
                        Request reset link
                    </div>
                    <div className="resend-link">
                        Resend Link
                    </div>
                    <div className="or-line">
                        <span className="line"></span>
                        <span className="or-text">OR</span>
                        <span className="line"></span>
                    </div>
                    <div className="create-acc">Don't have an account?<Link to="/" className='sign-text'> Create Account</Link>
                    </div>
                    <div className="login">
                        <Link to="/login" className="sign-text">Back to login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Forgot;