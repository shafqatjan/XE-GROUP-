import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import EmployeeList from "./EmployeeList";
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyList from "./CompanyList";

function App() {
  // Create a state variable to track the user's authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user logout
  const handleLogout = () => {
    // Clear any authentication tokens from local storage
    localStorage.removeItem("token");

    // Update the authentication status
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Your App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee">Employees</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/company">Companies</a>
              </li>
            </ul>
            {isAuthenticated ? (
              // Render logout functionality
              <button className="btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              // Render login functionality (could be a Login button or a link)
              <Link to="/login" className="btn btn-link">Login</Link>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/company" element={<CompanyList />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
