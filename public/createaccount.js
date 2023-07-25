// CreateAccount component for creating a new user account
function CreateAccount() {
  // State variables for controlling component behavior
  const [show, setShow] = React.useState(true); // Show or hide the create account form/message
  const [status, setStatus] = React.useState(""); // Status message to display error or success messages
  const ctx = React.useContext(UserContext); // Get the user context for authentication

  // CreateAccountForm component for displaying the form to create a new account
  function CreateAccountForm(props) {
    // State variables for form fields and submit button
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    // Function to handle form submission and create a new account
    function handleCreate() {
      // Validate field requirements are met
      if (!validate(name, "name")) return;
      if (!validate(email, "email")) return;
      if (!validate(password, "password")) return;

      // OAuth with Google Firebase
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email, password);

      // Handling success or failure of creating the account
      promise
        .then(() => {
          // Create user in MongoDB
          const url = `/account/create/${name}/${email}/${password}`;
          (async () => {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
          })();
        })
        .catch((e) => console.log(e.message));

      props.setShow(false); // Hide the form after creating the account
    }

    return (
      <>
        {/* Name input */}
        Name
        <br />
        <input
          type="input"
          className="form-control"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />

        {/* Email input */}
        Email address
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

        {/* Password input */}
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

        {/* Create Account button */}
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleCreate}
          disabled={disabled}
        >
          Create Account
        </button>
      </>
    );
  }

  // CreateMessage component to display a message after successfully creating an account
  function CreateMessage() {
    return (
      <>
        {/* Success message */}
        <h5 id="status">Account created</h5>

        {/* Link to login page */}
        <Link to="/login/">
          <button type="submit" className="btn btn-light" id="status-btn">
            Login to Account
          </button>
        </Link>
      </>
    );
  }

  // Function to validate form fields
  function validate(field, label) {
    if (!field) {
      // If the field is empty, show an error message for 3 seconds
      setStatus("Error: " + label + " is required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label === "password" && field.length < 8) {
      // If the password is less than 8 characters, show an error message for 3 seconds
      setStatus("Error: " + label + " must be at least 8 characters");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true; // Return true if the field passes validation
  }

  // Render the CreateAccount component
  return (
    <div className="CreateAccountPage" style={{ marginTop: "20px", marginLeft: "20px" }}>
      {/* Conditional rendering of user info */}
      <div id="user-info">
        <h1 className="user-info"></h1>
      </div>

      {/* Card component with the Create Account form or success message */}
      <Card
        txtcolor="black"
        bgcolor="white"
        header="Create Account"
        status={status}
        body={show ? <CreateAccountForm setShow={setShow} /> : <CreateMessage setShow={setShow} />}
      />
    </div>
  );
}
