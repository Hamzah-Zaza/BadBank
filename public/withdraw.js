function Withdraw() {
  const [balance, setBalance] = React.useState(""); // State to store the user's account balance
  const [show, setShow] = React.useState(true); // State to control whether to show the Withdraw form or success message
  const [status, setStatus] = React.useState(""); // State to store status messages (e.g., error messages)
  const ctx = React.useContext(UserContext); // Accessing the user context to get user information
  const [loaded, setLoaded] = React.useState(false); // State to keep track of whether the user data has been loaded from the API

  React.useEffect(() => {
    // Effect hook to fetch the logged-in user's balance from MongoDB when the component mounts or when 'loaded' changes
    fetch(`/account/findOne/${ctx.email}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance); // Update the 'balance' state with the fetched balance from MongoDB
          console.log('JSON:', data);
        } catch (err) {
          console.log('err:', text);
        }
      });
    setLoaded(true); // Set 'loaded' to true after fetching the data from the API
  }, [loaded]); // The effect will re-run whenever 'loaded' changes

  return (
    <div style={{ marginTop: '20px', marginLeft: '20px' }}>
      <Card
        txtcolor=" "
        bgcolor=" "
        header={`${ctx.user}'s Withdraw`}
        status={status}
        body={
          show ? (
            <WithdrawForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <WithdrawMessage setShow={setShow} />
          )
        }
      />
    </div>
  );

  // The WithdrawForm component renders the form for withdrawing money from the user's account
  function WithdrawForm() {
    const [withdraw, setWithdraw] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    function handleWithdraw() {
      // Validate the input amount for withdrawal
      if (!validate(Number(withdraw), balance)) return;

      // Update the user's balance in MongoDB by subtracting the withdrawal amount
      fetch(`/account/update/${ctx.email}/-${Number(withdraw)}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            setShow(false);
            setBalance(data.amount); // Update the 'balance' state with the new balance after the withdrawal
            console.log('JSON:', data);
          } catch (err) {
            console.log('err:', text);
          }
        });
    }

    return (
      <>
        <span className="balance-information">Balance ${balance}</span>
        <br />
        <br />
        Withdraw Amount
        <input
          type="input"
          className="form-control"
          id="withdraw"
          placeholder="Withdraw Amount"
          value={withdraw}
          onChange={(e) => {
            setWithdraw(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleWithdraw}
          disabled={disabled}
        >
          Withdraw
        </button>
      </>
    );
  }

  // The WithdrawMessage component renders a success message after a successful withdrawal
  function WithdrawMessage(props) {
    return (
      <>
        <span className="balance-information">Balance ${balance}</span>
        <br />
        <br />
        <h5>Successful Withdrawal</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Withdraw Again
        </button>
      </>
    );
  }

  // The validate function is used to validate the withdrawal amount
  function validate(withdraw, balance) {
    if (isNaN(withdraw)) {
      setStatus("Error: did not enter a valid number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (withdraw > balance) {
      setStatus("Error: Insufficient funds");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (withdraw < 1) {
      setStatus("Error: Lowest withdrawal amount is $1");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}
