import React from 'react';
import './invalid_login.css';
import { useNavigate } from 'react-router-dom';

const ErrorLogin = () => {
    const navigate = useNavigate();

  const handleRetry = () => {
    // Logic for retrying the login can be added here
    console.log("Retrying login...");
    navigate('/')
  };

  return (
    <div className="error-login-container">
      <div className="error-login-box">
        <h1>Login Error</h1>
        <p>Invalid login credentials. Please try again.</p>
        <button onClick={handleRetry} className="retry-button">Retry</button>
      </div>
    </div>
  );
};

export default ErrorLogin;
