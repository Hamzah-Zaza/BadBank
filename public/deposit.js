function Deposit() {
  // State variables initialization using React.useState()
  const [balance, setBalance] = React.useState(""); // State to store the user's account balance
  const [loaded, setLoaded] = React.useState(false); // State to keep track of whether user data has been loaded from the API
  const [show, setShow] = React.useState(true); // State to toggle between showing the deposit form and success message
  const [status, setStatus] = React.useState(""); // State to display status messages
  const ctx = React.useContext(UserContext); // Accessing user context provided by UserContext.Provider

  // Effect hook to fetch user data from MongoDB when the component mounts or 'loaded' state changes
  React.useEffect(() => {
    // Fetch user data (account balance) from MongoDB using the logged-in user's email
    fetch(`/account/findOne/${ctx.email}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance); // Update the 'balance' state with the fetched account balance
          console.log('JSON:', data);
        } catch (err) {
          console.log('err:', text);
        }
      });

    setLoaded(true); // Set 'loaded' to true after fetching user data to prevent re-fetching
  }, [loaded]);

  // JSX to render the deposit component
  return (
    <div style={{ marginTop: '20px', marginLeft: '20px' }}>
      <Card
        txtcolor=" "
        bgcolor=" "
        header={`${ctx.user}'s Deposit`}
        status={status}
        body={
          show ? (
            <DepositForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <DepositMessage setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </div>
  );

  // JSX for the DepositForm component, which allows users to enter a deposit amount
  function DepositForm(props) {
    const [deposit, setDeposit] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    // Function to handle the deposit action
    function handleDeposit() {
      // Validate the amount entered into the input field
      if (!validate(Number(deposit))) return;

      // Update the user's account balance in MongoDB
      fetch(`/account/update/${ctx.email}/${deposit}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.amount)); // Update the status with the deposited amount
            props.setShow(false); // Hide the deposit form and show the success message
            console.log('JSON:', data);
          } catch (err) {
            props.setStatus('Deposit failed');
            console.log('err:', text);
          }
        });

      setBalance(balance + Number(deposit)); // Update the balance state with the new balance after deposit
      setShow(false); // Hide the deposit form and show the success message
    }

    // JSX for the DepositForm component
    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <br />
        Deposit Amount
        <input
          type="input"
          className="form-control"
          id="deposit"
          placeholder="Deposit Amount"
          value={deposit}
          onChange={(e) => {
            setDeposit(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleDeposit}
          disabled={disabled}
        >
          Deposit
        </button>
      </>
    );
  }

  // JSX for the DepositMessage component, which shows a success message after a successful deposit
  function DepositMessage(props) {
    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <br />
        <h5>Successful Deposit</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => {
            props.setShow(true);
            props.setStatus('');
          }}
        >
          Deposit Again
        </button>
      </>
    );
  }

  // Function to validate the deposit amount entered by the user
  function validate(deposit) {
    if (isNaN(deposit)) {
      setStatus("Error: Amount is not numerical");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (deposit < 1) {
      setStatus("Error: Amount is less than 1");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}
