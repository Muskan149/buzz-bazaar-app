import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Index from './components/Index';
import Buy from './components/Buy';
import Sell2 from './components/Sell2';
import ImageUpload from './components/ImageUpload.js';
import ImageUploads from './components/ImageUploads.js';
import ImagesDemo from './components/ImagesDemo.js';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register';
import { SessionContext } from './components/AuthProvider';

// New component to handle conditional navigation
// const ConditionalRoute = ({ element, session }) => {
//   if (session) {
//     return element;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

const App = () => {
  const session = useContext(SessionContext);
  // const prevPage = window.location.pathname
  // console.log("Current page is " + prevPage)
  console.log("Session " + session)
  return (
    <>
      <NavBar session={session}/>
      <main>
      <Routes>
        <Route path="/" default element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={ session ? <ResetPassword /> : <Login />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={ session ? <Sell2 /> : <Login />}/>
        <Route path="/userProfile" element={session ? <UserProfile /> : <Navigate to = "/"/> } />
      </Routes>
      </main>
    </>
  );
};

export default App;
