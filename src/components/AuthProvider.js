// authContext.js
import React from 'react';
import { supabase } from '../js/supabaseConfig.js'

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
