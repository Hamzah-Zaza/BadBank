function AllData() {
  // State variables initialization using React.useState()
  const [data, setData] = React.useState([]); // State to store the fetched data from the API
  const [loaded, setLoaded] = React.useState(false); // State to keep track of whether the data has been loaded from the API

  React.useEffect(() => {
    // This useEffect hook runs when the component is mounted or when the 'loaded' state changes.

    // Fetch all accounts from the API
    fetch('/account/all') // Making a fetch request to the server endpoint to get all accounts
      .then(response => response.json()) // Parsing the response body as JSON
      .then(data => {
        console.log(data); // Logging the data received from the API
        setData(data); // Updating the 'data' state with the fetched data
      });

    setLoaded(true); // After fetching the data, set 'loaded' to true to prevent fetching the data again (since it's based on 'loaded' in the dependency array)
  }, [loaded]); // The effect will re-run whenever 'loaded' changes

  // Render the table rows with the fetched data
  const renderTableRows = () => {
    return data.map((user) => (
      <tr key={user._id}>
        <td>{user.name.toUpperCase()}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>${user.balance}</td>
      </tr>
    ));
  };

  // JSX for the table layout
  return (
    <>
      <div className="allData-table" style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
        {loaded ? ( // If 'loaded' is true, display the user data in a table
          <table className="table">
            <thead>
              <tr>
                <th>Account Owner</th>
                <th>Email</th>
                <th>Password</th>
                <th>Account Balance</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        ) : ( // If 'loaded' is false, display a loading message or alternative content
          <div className="text-center">
            {/* You can add any loading message here */}
            {/* For example: <p>Loading...</p> */}
            {/* Or, you can display a blank div to indicate no data */}
            {/* For example: <div>No data to display</div> */}
          </div>
        )}
      </div>
    </>
  );
}
