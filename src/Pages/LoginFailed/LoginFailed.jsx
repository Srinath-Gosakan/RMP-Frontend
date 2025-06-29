import React from 'react';
import './LoginFailed.css';

const LoginFailed = () => {
  return (
    <div className="login-failed">
      <h2>Login Failed</h2>
      <p>Only <strong>@sastra.ac.in</strong> emails are allowed.</p>
      <a href="https://rmp-backend.onrender.com/api/auth/google" className="retry-btn">Try Again</a>
    </div>
  );
};

export default LoginFailed;
