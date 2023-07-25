function Home() {
  const ctx = React.useContext(UserContext);
  console.log(ctx); // Logging the user context to the console (for debugging purposes)

  React.useEffect(() => {
    // This useEffect hook runs when the component is mounted.
    // Currently, there are no specific actions defined within this hook.
  }, []);

  // JSX to render the Home component
  return (
    <>
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <Card
          header="Bad Bank Home"
          title="Welcome to Bad Bank home page"
          text="Login to an existing account or create one, to transact with bank features such as depositing and withdrawing, viewing your balance in the process."
          body={<img src="./bank.png" className="img-fluid" alt="Responsive image" />}
        />
      </div>
    </>
  );
}
