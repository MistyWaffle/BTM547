import React, { useState, Component } from 'react';
import { createPortal } from 'react-dom';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';
import './GamesScreen.css';

const games = [
  { id: 1, name: 'Chess Board', desc: 'Classic wooden set. Great for a slow pour-over session.', img: '/assets/vector_chess.png' },
  { id: 2, name: 'Billiards / Snooker', desc: 'Premium slate table located in the back lounge.', img: '/assets/vector_billiards.png' },
  { id: 3, name: 'Playing Cards', desc: 'Premium artisan decks available at the counter.', img: '/assets/vector_cards.png' },
  { id: 4, name: 'Darts', desc: 'Professional bristle board in the standing area.', img: '/assets/vector_darts.png' },
  { id: 5, name: 'Monopoly', desc: 'Ruin friendships over imaginary real estate. Perfect for groups.', img: '/assets/vector_monopoly.png' },
  { id: 6, name: 'Snakes & Ladders', desc: 'A classic game of luck and sudden downfalls.', img: '/assets/vector_snakes.png' },
  { id: 7, name: 'Scrabble', desc: 'Show off your vocabulary. Dictionaries not provided.', img: '/assets/vector_scrabble.png' },
  { id: 8, name: 'Jenga', desc: 'Steady hands required. Play at your own risk!', img: '/assets/vector_jenga.png' }
];

const timeSlots = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

class ModalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Games modal crash caught:", error, errorInfo);
    if (this.props.onReset) {
      setTimeout(this.props.onReset, 0);
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

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

      {createPortal(
        <>
          <div className={`modal-backdrop ${selectedGame ? 'open' : ''}`} onClick={() => {
            setSelectedGame(null);
            if (onDrawerStateChange) onDrawerStateChange(false);
          }}></div>
          <div className={`booking-drawer glass-panel ${selectedGame ? 'open' : ''}`}>
            {selectedGame && !bookingSuccess && (
              <ModalErrorBoundary onReset={() => {
                setSelectedGame(null);
                if (onDrawerStateChange) onDrawerStateChange(false);
              }}>
                <div className="drawer-header">
                  <h2 className="font-playfair">Reserve {selectedGame.name || 'Game'}</h2>
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
              </ModalErrorBoundary>
            )}

            {bookingSuccess && (
              <div className="booking-success">
                <CheckCircle2 size={64} className="text-primary mb-4" />
                <h2 className="font-playfair text-primary">Slot Confirmed</h2>
                <p className="text-muted text-center mt-2">Your table for {selectedGame?.name} is reserved for {selectedSlot}. See you soon!</p>
              </div>
            )}
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default GamesScreen;
