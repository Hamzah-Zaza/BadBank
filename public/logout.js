function Logout() { 
    // Function to handle the logout process
    function handleLogout(){
        console.log('logged Out'); // Log a message indicating that the user is logged out
        ctx.user = "login."; // Set the user context 'user' value to indicate that the user is not logged in
        ctx.email = ""; // Clear the user context 'email' value
        firebase.auth().signOut(); // Sign out the user from Firebase authentication
    }
}
