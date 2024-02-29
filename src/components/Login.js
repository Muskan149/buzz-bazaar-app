import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { performAuth } from '../js/auth';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SessionContext } from './AuthProvider';

const supabaseUrl = 'https://exbvxvbfxaijhoiklipu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YnZ4dmJmeGFpamhvaWtsaXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2ODk4NTQsImV4cCI6MjAxODI2NTg1NH0.epQovNdFMM734Wa11OmmW2EuWhpWlOiE16jiboykPtE';
const supabase = createClient(supabaseUrl, supabaseKey);

const { data: { user } } = await supabase.auth.getUser()

const Login = ( prevPage = "/" ) => {
  console.log("hello")
  console.log(user)
  const [showPassword, setShowPassword] = useState(false);
  const session = useContext(SessionContext);

  return (   
  <>
      {session && <Navigate to="/"/>}
      <h1>Login</h1>
      <div className="login-main">
        <form autoComplete="on">
          <div className="form-group">
            <label htmlFor="userEmail">GT Email address (..@gatech.edu)</label>
            <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="example@gatech.edu" autoComplete="username" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <br />
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
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
          </div>
          <br />
          <button type="button" id="authButton" className="btn btn-primary auth-submit" onClick={performAuth}>
            Login
          </button>
          <br />
          <label className="auth-alt">
            Don't have an account? <Link to="/register">Register</Link>
          </label>
        </form>
      </div>
    </>
  );
}


export default Login;
