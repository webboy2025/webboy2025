import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple React fullstack example.</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/register">
          <button style={{ marginRight: "10px" }}>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/update-password">
          <button>Update Password</button>
        </Link>
        <Link to="/update-email">
          <button>Update Email</button>
        </Link>
        <Link to="/list-emails">
          <button>Show All Emails</button>
        </Link>
        <Link to="/delete-user">
          <button>Delete User</button>    
        </Link>
      </div>
    </div>
  );
};

export default Home;
