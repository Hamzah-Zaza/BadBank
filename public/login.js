function Login() {
  // State variables initialization
  const [show, setShow] = React.useState(true); // State to manage showing/hiding login components
  const [status, setStatus] = React.useState(""); // State to display status messages
  const [success, setSuccess] = React.useState(false); // State to track successful login
  const [loaded, setLoaded] = React.useState(false); // State to manage loading state
  const [user, setUser] = React.useState(""); // State to store user name
  const [message, setMessage] = React.useState(""); // State to store error message (if any)
  const ctx = React.useContext(UserContext); // Accessing the user context

  // JSX for the Login component
  return (
    <>
      <div className="login-card" style={{ marginLeft: '20px', marginTop: '20px' }}>
        {/* Render the Card component */}
        <Card
          header="Login"
          status={status}
          body={
            show ? ( // If 'show' is true, render the login form
              <LoginForm setUser={setUser} setShow={setShow} setStatus={setStatus} />
            ) : ( // Otherwise, render the login message
              <LoginMessage setShow={setShow} setStatus={setStatus} />
            )
          }
        />
      </div>
    </>
  );

  // LoginForm component
  function LoginForm() {
    // State variables for email and password
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(true); // State to manage disabled login button

    // Function to handle login button click
    function handleLogin() {
      // Validate fields
      if (!validate(email, "email")) return;
      if (!validate(password, "password")) return;

      // Firebase authentication
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          // If Firebase authentication is successful, get account info from MongoDB
          fetch(`/account/login/${email}/${password}`)
            .then(response => response.text())
            .then(text => {
              try {
                const data = JSON.parse(text);
                setShow(false);
                setUser(data.name);
                setLoaded(true);
                setSuccess(true);
                ctx.user = data.name;
                ctx.email = data.email;
              } catch {
                // If an error occurs while parsing data, set the error message and hide the login form
                setMessage(text);
                setSuccess(false);
                setShow(false);
              }
            });
        } else {
          // If Firebase authentication fails, show the error message
          setStatus("Unauthorized. Create a new account.");
          setTimeout(() => setStatus(""), 3000);
        }
      });
      promise.catch((e) => {
        setLoaded(false);
        console.log(e.message);
      });
    }

    return (
      <>
        Email
        <br />
        <input
          type="input"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <div className="login-btn">
          <button
            type="submit"
            className="btn btn-light"
            onClick={handleLogin}
            disabled={disabled}
          >
            Login
          </button>
        </div>
      </>
    );
  }

  // LoginMessage component
  function LoginMessage(props) {
    return success ? ( // If 'success' is true, display successful login message
      <>
        <h5>{user}</h5>
        <h5>is Logged In</h5>
        <a href="#/balance/">
          <button
            type="submit"
            className="btn btn-light"
            onClick={() => props.setShow(true)}
          >
            Go to Account
          </button>
        </a>
      </>
    ) : ( // If 'success' is false, display error message and retry button
      <>
        <h5>{message}</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Retry
        </button>
      </>
    );
  }

  // Validation function to check if a field is empty
  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}
