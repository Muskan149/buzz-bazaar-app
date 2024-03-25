import { redirect } from 'react-router-dom';
import { supabase } from './supabaseConfig.js';

// Deciding the type of auth to perform: login or register
export function performAuth(userPFP =  null) {
    const authButton = document.getElementById("authButton");
    if (authButton) {
        if (authButton.textContent.toLowerCase() == "register") {
            register(userPFP)
        } else {
            login(userPFP)
        }
    }  
}

// Register function
export async function register(userPFP) {
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    if (!(password.length >= 6 && password.length <= 72)) {
        alert("The password must be at least 6 and at most 72 characters long!");
        return;
    }
    // Define the regular expression for email ending with @gatech.edu
    var regex = /@gatech\.edu$/;

    var emailCheck = true;

    if (emailCheck) {
            // Test the email against the regular expression
        if (!regex.test(email)) {
            // If the email doesn't match, show an alert
            alert("The email must end with \"@gatech.edu\"");
            return;
        }
    }

    console.log("hello")

    // Perform user registration
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    let authError = null;

    // User exists, but is fake. See https://supabase.com/docs/reference/javascript/auth-signup
    if (signUpData.user && signUpData.user.identities && signUpData.user.identities.length === 0) {
        alert("User already exists")
        return;
    } 


    if (signUpData.user) { // If sign up with email and password is successful
        alert("Registration succesfful! Check your inbox (and spam!) to confirm your email.")
        // Extract the user object from the signUpData
        const user = signUpData.user;
        console.log("here is the user data: " + Object.entries(signUpData))

        // Get the first and last name from the HTML tags
        const firstName = document.getElementById("userFirstName").value;
        const lastName = document.getElementById("userLastName").value;
        const contactNumber = document.getElementById("userContactNumber").value;

        console.log("Here is the name and contact: " + firstName + " " + lastName + " " + contactNumber)
        // Update the user profile with the display name
        const { error: updateError } = await supabase
            .from('user_profiles')  // replace 'users' with your table name
            .upsert([
                {
                    id: user.id,
                    display_name: firstName + " " + lastName,
                    contact_number: contactNumber, 
                    email: email,
                    userPFP: userPFP ? userPFP : null
                }
            ], { onConflict: ['id'] });

        if (updateError) {
            console.error("Error updating user profile:", updateError.message);
            // Handle the error as needed
        } else {
            console.log("User profile updated successfully");
        }
    } else {
        console.error("Error during registration:", signUpError.message);
        alert("There was an error registering you: " + signUpError.message)
    }
}

// Login function
export async function login() {
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
    
    console.log("login commenced")
    // Define the regular expression for email ending with @gatech.edu
    var regex = /@gatech\.edu$/;

    var emailCheck = false;

    if (emailCheck) {
            // Test the email against the regular expression
        if (!regex.test(email)) {
            // If the email doesn't match, show an alert
            alert("The email must end with \"@gatech.edu\"");
            return;
        }
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

    if (signInData["user"] !== null) {
        // Login successful, replace the current page with the "/buy" page
        console.log("user signed in (sent from login function)")
            } else {
        console.error("There was an error logging you in. Check your email or password.")
        alert("There was an error logging you in. Check your email or password.")

    }
}

// Logout function
export async function logout() {
    try {
        const { error } = await supabase.auth.signOut()
        
    } catch (error) {
        console.error("Error logging you out. Try again")

    }
    console.log("Logged out")
}

export async function sendPasswordResetLink() {
    const email = document.getElementById("userEmail").value;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/update-password',
  })
  if (data) {
    alert("We have sent a password reset link to your email (if you have registered earlier with us). Use it to reset your password.")
  } 
}

export async function updatePassword(email) {
    const new_password = document.getElementById("userPassword").value;

    if (!(new_password.length >= 6 && new_password.length <= 72)) {
        alert("The password must be at least 6 and at most 72 characters long!");
        return;
    }
    const { data, error } = await supabase.auth.updateUser({
        password: new_password
      })

    if (data) {
        alert("Password updated successfully!")
        // Redirect user to /index
        window.location.href = "/";
    } 
}