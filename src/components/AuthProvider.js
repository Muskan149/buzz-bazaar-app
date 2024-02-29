// authContext.js
import React from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://exbvxvbfxaijhoiklipu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YnZ4dmJmeGFpamhvaWtsaXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2ODk4NTQsImV4cCI6MjAxODI2NTg1NH0.epQovNdFMM734Wa11OmmW2EuWhpWlOiE16jiboykPtE';
const supabase = createClient(supabaseUrl, supabaseKey);

const SessionContext = React.createContext(null);

function AuthProvider({ children }) {
  const [session, setSession] = React.useState(null)  
  const [loggedIn, setLoggedIn] = React.useState(null)


  React.useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
          alert("Signed out")
        } else if (session) {
          setSession(session)
          console.log("DETECTED: SIGN IN: " + session["access_token"])
        }
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}


export { SessionContext, AuthProvider }
