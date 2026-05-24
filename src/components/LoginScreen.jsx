import React from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="login-screen fade-in">
      <div className="login-overlay"></div>
      
      <div className="login-content glass-panel">
        <div className="login-header">
          <h1 className="font-playfair text-primary title">The HideOut</h1>
          <p className="subtitle text-muted">Your secret reserve awaits.</p>
        </div>
        
        <div className="login-actions">
          <button className="btn-login apple-login" onClick={onLogin}>
            Sign in with Apple
          </button>
          <button className="btn-login google-login" onClick={onLogin}>
            Sign in with Google
          </button>
          <div className="divider">
            <span>or</span>
          </div>
          <button className="btn-login guest-login" onClick={onLogin}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
