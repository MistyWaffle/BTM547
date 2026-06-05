import React, { useState, useEffect } from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
  const onboardingFeatures = [
    "☕ Order ahead & skip the wait",
    "🎯 Reserve gaming tables instantly",
    "🎁 Earn points & redeem rewards",
    "✨ Experience vintage cafe gaming"
  ];

  const [featureIndex, setFeatureIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out');
      setTimeout(() => {
        setFeatureIndex((prev) => (prev + 1) % onboardingFeatures.length);
        setFadeClass('fade-in');
      }, 500); // Allow fade-out transition to complete
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-container fade-in">
      {/* LEFT COLUMN: HERO SIDE (Visible on Desktop) */}
      <div className="login-hero-side">
        <div className="login-hero-overlay"></div>
        <div className="login-hero-content">
          <div className="login-logo-wrapper">
            <img src="/logo.jpg" className="login-hero-logo" alt="The HideOut Logo" />
          </div>
          <h1 className="font-playfair title">The HideOut</h1>
          <p className="subtitle">Your secret reserve awaits.</p>
        </div>
      </div>

      {/* RIGHT COLUMN: AUTHENTICATION SIDE (Centered card on Mobile, form column on Desktop) */}
      <div className="login-auth-side">
        <div className="login-auth-card glass-panel">
          <div className="login-header">
            <div className="login-logo-wrapper mobile-only">
              <img src="/logo.jpg" className="login-mobile-logo" alt="The HideOut Logo" />
            </div>
            <h2 className="font-playfair title text-primary">The HideOut</h2>
            <div className="onboarding-carousel">
              <p className={`onboarding-text ${fadeClass}`}>{onboardingFeatures[featureIndex]}</p>
            </div>
          </div>

          <div className="login-actions">
            <button className="btn-login apple-login" onClick={() => onLogin({ name: 'Alex Rivera', email: 'alex.rivera@example.com', isGuest: false })}>
              <svg className="btn-icon" viewBox="0 0 170 170" width="20" height="20" fill="currentColor">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.89-14.37-6.04-3.57-2.82-7.39-7.46-11.47-13.93-7.85-12.89-13.37-27.81-16.58-44.78-3.21-16.97-2.12-31.57 3.27-43.8 5.4-12.22 13.1-18.42 23.1-18.6 4.74-.11 9.87 1.34 15.39 4.37 5.52 3.03 9.4 4.54 11.64 4.54 2.03 0 5.86-1.42 11.51-4.25 5.65-2.83 10.6-4.13 14.88-3.9 15.39.86 26.65 6.44 33.78 16.74-13.62 8.27-20.19 19.34-19.7 33.22.49 10.73 4.67 19.67 12.56 26.83 7.89 7.16 17.2 11.01 27.93 11.56-2.44 7.21-5.65 14.07-9.65 20.58zM119.5 15.85c0 7.9-2.92 15.15-8.77 21.75-5.84 6.6-12.91 10.36-21.2 11.27-.24-.96-.36-1.92-.36-2.9 0-7.41 3.03-14.77 9.07-22.09 6.04-7.32 13.33-11.44 21.87-12.37.24 1.32.39 2.76.39 4.34z"/>
              </svg>
              <span>Sign in with Apple</span>
            </button>
            
            <button className="btn-login google-login" onClick={() => onLogin({ name: 'Alex Rivera', email: 'alex.rivera@example.com', isGuest: false })}>
              <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button className="btn-login guest-login" onClick={() => onLogin({ isGuest: true })}>
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
