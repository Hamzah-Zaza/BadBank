// Importing necessary React Router components and creating Contexts
const Route = ReactRouterDOM.Route; // React Router Route component
const Link = ReactRouterDOM.Link; // React Router Link component
const HashRouter = ReactRouterDOM.HashRouter; // React Router HashRouter component
const UserContext = React.createContext(null); // Creating a UserContext using React's createContext() method
const DisplayContext = React.createContext(null); // Creating a DisplayContext using React's createContext() method


// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBMWUc3x3k3Jt1zeH6f3BVrc0DTcICISZ8",
  authDomain: "bank-capstone-8fb64.firebaseapp.com",
  databaseURL: "https://bank-capstone-8fb64-default-rtdb.firebaseio.com",
  projectId: "bank-capstone-8fb64",
  storageBucket: "bank-capstone-8fb64.appspot.com",
  messagingSenderId: "719936702083",
  appId: "1:719936702083:web:8b8e63ff79c19cffa43db6"
};

// Firebase Init
firebase.initializeApp(firebaseConfig);

// Card Component
function Card(props) {
  // A function to determine the CSS classes for the card based on provided props
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " "; // Background color class based on 'bgcolor' prop
    const txt = props.txtcolor ? " text-" + props.txtcolor : " "; // Text color class based on 'txtcolor' prop
    return "card mb-3 " + bg + txt; // Concatenating classes and returning the final CSS classes for the card
  }

  return (
    <div className={classes()} style={{ maxWidth: "20rem" }}>
      {/* Rendering the card with the determined classes */}
      <div className="card-header">{props.header}</div>
      
      <div className="card-body">
        {/* Conditionally rendering 'title', 'text', 'body', and 'status' props if provided */}
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}