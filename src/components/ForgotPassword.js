import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { performAuth, sendPasswordResetLink } from '../js/auth';
import { SessionContext } from './AuthProvider';
import ImageUpload from './ImageUpload.js';


const ForgotPassword = () => {
    // State to manage the show password checkbox
   const session = useContext(SessionContext);

   const handlePasswordReset = () => {
    sendPasswordResetLink(); // Will send the password reset link to the email
  };

    return (
        <div>
            {session && <Navigate to="/"/>}
            <h1>Reset Your Password</h1>
            <br/>
            <h5>Type in your email here and we will send you a password reset link</h5>
            <div className="login-main">
                <form>
                <div className="form-group">
                        <label htmlFor="userEmail" className='required' required>GT Email address (..@gatech.edu)</label>
                        <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="example@gatech.edu" required/>
                </div>
                <br />
                <button type="button" id="authButton" className="btn btn-primary auth-submit" onClick={handlePasswordReset}>Send Link</button>
            </form>
        </div>
    </div>
    );
};

export default ForgotPassword;
