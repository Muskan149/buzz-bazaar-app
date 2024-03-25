import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { performAuth } from '../js/auth';
import { SessionContext } from './AuthProvider';
import ImageUpload from './ImageUpload.js';


const Register = () => {
    // State to manage the show password checkbox
   const [showPassword, setShowPassword] = useState(false);
   const session = useContext(SessionContext);

   const [publicURL, setPublicURL] = useState(null);

   const handlePublicURLChange = (url) => {
     setPublicURL(url);
     console.log(url)
   };

   const handleAuth = () => {
    performAuth(publicURL); // Pass publicURL to performAuth function
  };

    return (
        <div>
            {session && <Navigate to="/"/>}
            <h1>Register</h1>
            <div className="login-main">
                <form>
                <div className="form-group">
                        <label htmlFor="userEmail" className='required' required>GT Email address (..@gatech.edu)</label>
                        <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="example@gatech.edu" required/>
                        <small id="emailHelp" className="form-text text-muted">Buyers can use your email and contact number to contact you.</small>
                </div>
                <br />
                <div className="form-group">
                        <label htmlFor="userPassword" className='required'>Password</label>
                        <div className="password-container">
                            <input type={showPassword ? "text" : "password"} className="form-control" id="userPassword" placeholder="Password" />
                        </div>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="userFirstName" className='required' required>First Name</label>
                    <input type="text" className="form-control" id="userFirstName" placeholder="Your First Name" required/>
                </div>
                    <br />
                <div className="form-group">
                    <label htmlFor="userLastName" className='required' required>Last Name</label>
                    <input type="text" className="form-control" id="userLastName" placeholder="Your Last Name" required/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="userEmail">Contact Number</label>
                        <input type="tel" className="form-control" id="userContactNumber" placeholder="10-digit contact number" required/>
                    </div>
                    <br />
                    {/* USER PFP */}
                    <div className="form-group">
                        <label htmlFor="userEmail">Your PFP</label>
                        <ImageUpload id="pfp-upload" onPublicURLChange={handlePublicURLChange} />
                    </div>
                    <br />
                    {/* <div className="form-group">
                        <label htmlFor="userEmail">Profile Image (optional)</label>
                        <ImageUpload onPublicURLChange={handlePublicURLChange} />
                    </div>
                    <br /> */}
                    <div className="checkbox-horizontal-flex">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
                            <label className="form-check-label" htmlFor="showPassword" >Show Password</label>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                    </div>
                    <br />
                    <button type="button" id="authButton" className="btn btn-primary auth-submit" onClick={handleAuth}>Register</button>
                    <br />
                    <label className="auth-alt">
                        Already registered? <Link to="/login">Login</Link>
                    </label>
                </form>
            </div>
        </div>
    );
};

export default Register;
