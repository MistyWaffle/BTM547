import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';
import './GamesScreen.css';

const games = [
  { id: 1, name: 'Chess Board', desc: 'Classic wooden set. Great for a slow pour-over session.', img: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Billiards / Snooker', desc: 'Premium slate table located in the back lounge.', img: 'https://images.unsplash.com/photo-1598284693359-994c9f136fc1?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Playing Cards', desc: 'Premium artisan decks available at the counter.', img: 'https://images.unsplash.com/photo-1501003878151-d3cb87799705?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Darts', desc: 'Professional bristle board in the standing area.', img: 'https://images.unsplash.com/photo-1629737159781-b5cbab4e6805?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Monopoly', desc: 'Ruin friendships over imaginary real estate. Perfect for groups.', img: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffaed?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Snakes & Ladders', desc: 'A classic game of luck and sudden downfalls.', img: 'https://images.unsplash.com/photo-1598654215286-9ec6101962d2?q=80&w=400&auto=format&fit=crop' },
  { id: 7, name: 'Scrabble', desc: 'Show off your vocabulary. Dictionaries not provided.', img: 'https://images.unsplash.com/photo-1593814681464-eef5af2b0628?q=80&w=400&auto=format&fit=crop' },
  { id: 8, name: 'Jenga', desc: 'Steady hands required. Play at your own risk!', img: 'https://images.unsplash.com/photo-1610996841108-a5f11ce72e9d?q=80&w=400&auto=format&fit=crop' }
];

const timeSlots = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

const GamesScreen = ({ onBookGame, onDrawerStateChange }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = () => {
    const assignedTable = Math.floor(Math.random() * 10) + 1;
    if (onBookGame) {
      onBookGame({
        game: selectedGame,
        slot: selectedSlot,
        table: assignedTable
      });
    }
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedGame(null);
      setSelectedSlot(null);
      if (onDrawerStateChange) onDrawerStateChange(false);
    }, 3000);
  };

  return (
    <div className="games-screen fade-in">
      <div className={`games-main ${selectedGame ? 'blurred' : ''}`}>
        <div className="games-header">
          <h2 className="screen-title font-playfair text-primary">Play</h2>
          <p className="text-muted">Reserve a game slot in the lounge.</p>
        </div>

        <div className="games-grid">
          {games.map(game => (
            <div key={game.id} className="game-card glass-panel" onClick={() => {
              setSelectedGame(game);
              if (onDrawerStateChange) onDrawerStateChange(true);
            }}>
              <div className="game-img">
                <img src={game.img} alt={game.name} />
              </div>
              <div className="game-info">
                <h3 className="font-playfair">{game.name}</h3>
                <p className="text-muted text-sm">{game.desc}</p>
                <button className="btn-book-small">Book Slot</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Drawer */}
      <div className={`booking-drawer glass-panel ${selectedGame ? 'open' : ''}`}>
        {selectedGame && !bookingSuccess && (
          <>
            <div className="drawer-header">
              <h2 className="font-playfair">Reserve {selectedGame.name}</h2>
              <button 
              className="close-btn" 
              onClick={() => {
                setSelectedGame(null);
                if (onDrawerStateChange) onDrawerStateChange(false);
              }}
            >✕</button>
            </div>
            
            <div className="drawer-content">
              <div className="booking-section">
                <h4 className="flex-align"><Calendar size={18} className="mr-2"/> Today</h4>
                <div className="slots-grid">
                  {timeSlots.map(slot => (
                    <button 
                      key={slot}
                      className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking-summary glass-panel">
                <Clock size={16} className="text-muted" />
                <span className="text-sm ml-2 text-muted">Sessions are limited to 1 hour to accommodate all guests.</span>
              </div>
            </div>

            <div className="drawer-footer">
              <button 
                className="btn-primary full-width" 
                disabled={!selectedSlot}
                onClick={handleBook}
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}

        {bookingSuccess && (
          <div className="booking-success">
            <CheckCircle2 size={64} className="text-primary mb-4" />
            <h2 className="font-playfair text-primary">Slot Confirmed</h2>
            <p className="text-muted text-center mt-2">Your table for {selectedGame?.name} is reserved for {selectedSlot}. See you soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesScreen;
