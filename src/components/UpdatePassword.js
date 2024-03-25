import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { updatePassword } from '../js/auth';
import useUserInfo from '../js/useUserInfo.js';  


const UpdatePassword = () => {
    // State to manage the show password checkbox
   const [showPassword, setShowPassword] = useState(false);
   const { user, userId, userInfo } = useUserInfo();

   if (userId && userInfo) {
    console.log(Object.values(user));
    console.log(user.email)
}

   const handlePasswordReset = () => {
    if (userId && userInfo) {
        updatePassword(user.email)
    }
  };

    return (
        <div>
            <h1>Reset Your Password</h1>
            <br/>
            <h5>Type in a new secure password and press save to update your password</h5>
            <div className="login-main">
                <form>
                <div className="form-group">
                    <label htmlFor="userPassword">Password</label>
                    <input type={showPassword ? 'text' : 'password'} className="form-control" id="userPassword" placeholder="Password" autoComplete="current-password" />
                </div>
                <br />
                <div className="checkbox-horizontal-flex">
                    <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
                    <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                   
                </div>
            </div>
            <br/>    
            <button type="button" id="authButton" className="btn btn-primary auth-submit" onClick={handlePasswordReset}>Save Password</button>
            </form>
        </div>
    </div>
    );
};

export default UpdatePassword;
