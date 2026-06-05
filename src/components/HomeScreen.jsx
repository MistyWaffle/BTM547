import React, { useState } from 'react';
import { Bell, ChevronRight, Star, Play, Pause } from 'lucide-react';
import './HomeScreen.css';

const HomeScreen = ({ onNavigate, bookedGames = [], onAddToCart, loyaltyPoints = 140 }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const MAX_POINTS = 150;
  const currentProgress = loyaltyPoints % MAX_POINTS;
  const pointsAway = MAX_POINTS - currentProgress;
  const progressPercent = currentProgress / MAX_POINTS;
  const strokeDashoffset = 251.2 - (251.2 * progressPercent);
  return (
    <div className="home-screen fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <img src="/IMG-20260518-WA0081.jpg" alt="Cafe Interior" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <header className="hero-header">
            <div className="header-greeting">
              <h1 className="font-playfair text-light">Good Evening, Sarah.</h1>
            </div>
            <button className="notification-btn hero-nav-btn" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={22} color="white" />
              <span className="notification-dot"></span>
            </button>
          </header>
          
          {showNotifications && (
            <div className="notifications-dropdown glass-panel">
              <h4 className="font-playfair text-primary">Notifications</h4>
              <div className="notification-item">
                <div className="notif-dot"></div>
                <div className="notif-text">
                  <p className="text-sm">Your Table 4 is ready.</p>
                  <span className="text-xs text-muted">2 mins ago</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notif-text">
                  <p className="text-sm">Earn double points today!</p>
                  <span className="text-xs text-muted">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
          <div className="hero-main">
            <span className="hero-badge">Welcome to The HideOut</span>
            <h2 className="hero-title font-playfair">Skip the line.<br/>Order your ritual.</h2>
            <button className="btn-hero" onClick={() => onNavigate('menu')}>
              View Menu <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <div className="home-content">
        {/* Active Reservations */}
        {bookedGames.length > 0 && (
          <section className="reservations-section">
            <div className="section-header">
              <h2 className="font-playfair text-primary">Your Reservations</h2>
            </div>
            <div className="reservations-list">
              {bookedGames.map((booking, idx) => (
                <div key={idx} className="reservation-card glass-panel">
                  <div className="res-icon">
                    <img src={booking.game.img} alt={booking.game.name} />
                  </div>
                  <div className="res-info">
                    <h3 className="font-playfair">{booking.game.name}</h3>
                    <p className="text-muted text-sm">Today at {booking.slot}</p>
                    <span className="table-badge">Table {booking.table}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Loyalty Dashboard */}
        <section className="loyalty-dashboard mt-4">
          <div className="loyalty-card glass-panel">
            <div className="loyalty-info">
              <span className="loyalty-title text-accent font-playfair">The Inner Circle</span>
              <h2 className="points">{loyaltyPoints} <span className="points-label">pts</span></h2>
              <p className="loyalty-desc text-muted">{pointsAway} pts away from a free reserve pour.</p>
            </div>
            <div className="loyalty-ring-container">
              <svg className="loyalty-ring" viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="40" />
                <circle className="ring-progress" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset={strokeDashoffset} />
              </svg>
              <Star className="ring-icon text-accent" size={24} />
            </div>
          </div>
        </section>

        {/* Quick Reorder */}
        <section className="quick-reorder">
          <div className="section-header">
            <h2 className="font-playfair text-primary">Your Ritual</h2>
          </div>
          <div className="reorder-list">
            <div className="reorder-item glass-panel">
              <div className="reorder-icon">
                <img src="/assets/drinks.jpeg" alt="Kopi" />
              </div>
              <div className="reorder-details">
                <h4>Kopi</h4>
                <p className="text-muted text-sm">Cold, Standard Sweetness</p>
              </div>
              <button 
                className="btn-add-small"
                onClick={() => {
                  if(onAddToCart) onAddToCart({ id: '21-' + Date.now(), name: 'Kopi', details: 'Cold', price: 3.50, qty: 1, category: 'Drinks', img: '/assets/drinks.jpeg' });
                }}
              >+</button>
            </div>
            
            <div className="reorder-item glass-panel">
              <div className="reorder-icon">
                <img src="/assets/Hideout_Toast.jpeg" alt="Hideout Toast" />
              </div>
              <div className="reorder-details">
                <h4>Hideout Toast</h4>
                <p className="text-muted text-sm">Standard</p>
              </div>
              <button 
                className="btn-add-small"
                onClick={() => {
                  if(onAddToCart) onAddToCart({ id: '2-' + Date.now(), name: 'Hideout Toast', details: 'Standard', price: 14.50, qty: 1, category: 'Bites', img: '/assets/Hideout_Toast.jpeg' });
                }}
              >+</button>
            </div>
          </div>
        </section>



        {/* Promotions / Exclusive Offers */}
        <section className="promotions-section mt-4">
          <div className="section-header">
            <h2 className="font-playfair text-primary">Exclusive Offers</h2>
          </div>
          <div className="promo-cards">
            <div className="promo-card glass-panel">
              <div className="promo-content">
                <span className="promo-badge">Student</span>
                <h3 className="font-playfair">15% Off All Brews</h3>
                <p className="text-muted text-sm">Show your student ID at the counter.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomeScreen;
