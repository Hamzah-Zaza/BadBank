function NavBar() {
  const ctx = React.useContext(UserContext); // Accessing the user context to get user information

  // Function to handle the logout process
  function handleLogout() {
    console.log('logging out'); // Log a message indicating that the user is logging out
    ctx.user = "Not logged in"; // Set the user context 'user' value to indicate that the user is not logged in
    ctx.email = ""; // Clear the user context 'email' value
    firebase.auth().signOut(); // Sign out the user from Firebase authentication
  }

  // Function to refresh the page (used in Logout link)
  function refreshPage() {
    window.location.reload(); // Reload the current page, effectively refreshing the application
  } 

  // JSX for the NavBar component
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" title="Account Creation" href="#/CreateAccount/">Create Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Login" href="#/login/">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Deposit Money" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Withdraw Money" href="#/withdraw/">Withdraw</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Available Balance" href="#/balance/">Balance</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Information" href="#/alldata/">AllData</a>
            </li>      
 
            <li className="nav-item" id='nav-logout'>
              {/* Render the Logout link and call the handleLogout function on click */}
              <a className="nav-link" onClick={refreshPage} href="#">
                <span title="Logout of account">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}