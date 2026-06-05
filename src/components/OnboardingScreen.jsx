import React, { useState } from 'react';
import './OnboardingScreen.css';

const OnboardingScreen = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && !isSubmitting) {
      setIsSubmitting(true);
      await onComplete(name.trim());
    }
  };

  return (
    <div className="onboarding-container fade-in">
      <div className="onboarding-card glass-panel">
        <h2 className="font-playfair text-primary title">Welcome to The HideOut</h2>
        <p className="text-muted subtitle">What should we call you?</p>
        <form onSubmit={handleSubmit} className="onboarding-form">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name..." 
            autoFocus 
            required 
            maxLength={20}
            className="name-input"
            disabled={isSubmitting}
          />
          <button type="submit" className="btn-primary start-btn" disabled={!name.trim() || isSubmitting}>
            {isSubmitting ? 'Starting...' : 'Start Your Ritual'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingScreen;
