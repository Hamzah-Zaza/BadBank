
function App() {
  // Initial user context with default values
  const initialUserContext = {
    user: "Not logged in",
    email: ""
  };

  // JSX for the main App component
  return (
    <div className="container-app">
      <div className="header">
        {/* Render the NavBar component */}
        <NavBar />
      </div>

      <div className="centered-content">
        {/* Set up routing using HashRouter */}
        <HashRouter>
          {/* Provide the initialUserContext to all child components */}
          <UserContext.Provider value={initialUserContext}>
            {/* Define different routes and their corresponding components */}
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </UserContext.Provider>
        </HashRouter>
      </div>
    </div>
  );
}

// Create a root using ReactDOM.createRoot and render the App component to the 'root' div in the HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);