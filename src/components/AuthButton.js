import React, { useState, useEffect } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://exbvxvbfxaijhoiklipu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YnZ4dmJmeGFpamhvaWtsaXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2ODk4NTQsImV4cCI6MjAxODI2NTg1NH0.epQovNdFMM734Wa11OmmW2EuWhpWlOiE16jiboykPtE';

const supabase = createClient(supabaseUrl, supabaseKey);

const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthState = async () => {
    const user = supabase.auth.user();
    setIsLoggedIn(!!user); // Set isLoggedIn to true if the user is authenticated, false otherwise
  };

  useEffect(() => {
    // Check authentication state on component mount
    checkAuthState();

    // Set up an event listener to update the state when authentication state changes
    const { data } = supabase.auth.onAuthStateChange(() => {
      checkAuthState();
    });

    // Clean up the event listener on component unmount
    return () => data.unsubscribe();
  }, []);

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      // If logged in, perform logout
      await supabase.auth.signOut();
    } else {
      // If not logged in, navigate to the authentication page or trigger authentication modal
      // You can customize this part based on your application's routing or modal implementation
      // Example: history.push('/auth') or set a state to show a modal
    }
  };

  return (
    <button onClick={handleAuthAction}>
      {isLoggedIn ? 'Logout' : 'Sign In'}
    </button>
  );
};

export default AuthButton;
