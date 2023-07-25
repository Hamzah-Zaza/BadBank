function Balance() {
  // Accessing the UserContext to get the logged-in user's information
  const ctx = React.useContext(UserContext);

  // State variables initialization using React.useState()
  const [show, setShow] = React.useState(true); // State to control whether something is shown or hidden
  const [status, setStatus] = React.useState(''); // State to hold some status information
  const [balance, setBalance] = React.useState(''); // State to store the user's account balance
  const [loaded, setLoaded] = React.useState(false); // State to keep track of whether the data has been loaded from MongoDB

  React.useEffect(() => {
    // This useEffect hook runs when the component is mounted or when the 'loaded' state changes.

    // Get Logged in user's account information from MongoDB
    fetch(`/account/findOne/${ctx.email}`) // Making a fetch request to the server endpoint, using the email from UserContext
      .then(response => response.text()) // Getting the response body as text
      .then(text => {
        try {
          const data = JSON.parse(text); // Parsing the response text as JSON
          setBalance(data.balance); // Updating the 'balance' state with the retrieved balance from the response data
          if (data?.message) {
            console.log(data.message); // If there's a message in the response data, log it
          }
          console.log('JSON:', JSON.stringify(data)); // Log the JSON data received from the server
        } catch (err) {
          console.log('err:', text); // If there's an error parsing the response data as JSON, log the raw response text
        }
      });

    setLoaded(true); // After fetching the data, set 'loaded' to true to prevent fetching the data again (since it's based on 'loaded' in the dependency array)
  }, [loaded]); // The effect will re-run whenever 'loaded' changes

  return (
    <div style={{ marginTop: '20px', marginLeft: '20px' }}>
      {/* Rendering a Card component with the user's balance */}
      <Card
        txtcolor=" "
        bgcolor=" "
        header={`${ctx.user}'s Balance`}
        body={
          <ul className="list-group list-group-flush make-center bg-light">
            <li className="list-group-item make-center">
              Account balance:
              <li className="list-group-item make-center">
                $ {balance} {/* Displaying the user's account balance */}
              </li>
            </li>
          </ul>
        }
      />
    </div>
  );
}
