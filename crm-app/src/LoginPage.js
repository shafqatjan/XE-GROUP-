import React, { useState } from "react";
import { login } from "./services"; // Make sure the path is correct

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Make the login API call using the service function
    login(email, password)
      .then((response) => {
        // Assuming the API returns a success status or token
        if (response.data.token) {
          // Save the token in local storage
          localStorage.setItem("token", response.data.token);

          // Set the login success state
          setLoginSuccess(true);

          // Redirect to the dashboard or any other page
          window.location.href = "/dashboard"; // You can use React Router for routing
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="mt-4">Login Page</h2>
      <form className="mt-3">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>

      {loginSuccess && <p className="mt-3 text-success">Login successful! Welcome.</p>}
    </div>
  );
}

export default LoginPage;
