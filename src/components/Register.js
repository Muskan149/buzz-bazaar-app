import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { performAuth } from '../js/auth';
import { SessionContext } from './AuthProvider';


const Register = () => {
    // State to manage the show password checkbox
   const [showPassword, setShowPassword] = useState(false);
   const session = useContext(SessionContext);
   console.log("Reached Register page")
   console.log("Session is null: " + (session == null))
    return (
        <div>
            {session && <Navigate to="/"/>}
            <h1>Register</h1>
            <div className="login-main">
                <form>
                <div className="form-group">
                    <label htmlFor="userFirstName" required>First Name</label>
                    <input type="text" className="form-control" id="userFirstName" placeholder="Your First Name" required/>
                    </div>
                    <br />
                    <div className="form-group">
                    <label htmlFor="userLastName" required>Last Name</label>
                    <input type="text" className="form-control" id="userLastName" placeholder="Your Last Name" required/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="userEmail" required>GT Email address (..@gatech.edu)</label>
                        <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="example@gatech.edu" required/>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <div className="password-container">
                            <input type={showPassword ? "text" : "password"} className="form-control" id="userPassword" placeholder="Password" />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="userEmail">Contact Number (optional)</label>
                        <input type="tel" className="form-control" id="userContactNumber" placeholder="10-digit contact number" required/>
                    </div>
                    <br />
                    <div className="checkbox-horizontal-flex">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
                            <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                    </div>
                    <br />
                    <button type="button" id="authButton" className="btn btn-primary auth-submit" onClick={performAuth}>Register</button>
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
