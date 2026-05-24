import { useState, useEffect } from 'react';
import './App.css';
import { Home, Coffee, ShoppingBag, User, Gamepad2 } from 'lucide-react';
import HomeScreen from './components/HomeScreen';
import MenuScreen from './components/MenuScreen';
import CheckoutScreen from './components/CheckoutScreen';
import LoginScreen from './components/LoginScreen';
import GamesScreen from './components/GamesScreen';
import ProfileScreen from './components/ProfileScreen';
import ChatBubble from './components/ChatBubble';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [bookedGames, setBookedGames] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [hideChat, setHideChat] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(140);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedAddress, setSavedAddress] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      // Check if item with same name and details already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (i) => i.name === item.name && i.details === item.details
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].qty += 1;
        return newCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateCartQty = (itemIndex, newQty) => {
    setCart((prevCart) => {
      if (newQty <= 0) {
        return prevCart.filter((_, idx) => idx !== itemIndex);
      }
      const newCart = [...prevCart];
      // Create a new object to ensure React detects the state change properly
      newCart[itemIndex] = { ...newCart[itemIndex], qty: newQty };
      return newCart;
    });
  };

  const handleBookGame = (booking) => {
    setBookedGames([...bookedGames, booking]);
  };

  const handleCheckout = (order) => {
    setPurchaseHistory([order, ...purchaseHistory]);
    setCart([]); // Clear cart upon successful checkout
    const pointsEarned = Math.floor(parseFloat(order.total));
    setLoyaltyPoints(prev => prev + pointsEarned);
  };

  if (!isLoggedIn) {
    return (
      <div className="mobile-container">
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen 
          onNavigate={setActiveTab} 
          bookedGames={bookedGames} 
          onAddToCart={handleAddToCart} 
          loyaltyPoints={loyaltyPoints}
        />;
      case 'menu':
        return <MenuScreen onAddToCart={handleAddToCart} />;
      case 'games':
        return <GamesScreen 
          onBookGame={handleBookGame} 
          onDrawerStateChange={(isOpen) => setHideChat(isOpen)}
        />;
      case 'cart':
        return (
          <CheckoutScreen 
            cart={cart} 
            onNavigate={setActiveTab} 
            onClearCart={() => setCart([])} 
            onCheckout={handleCheckout}
            onUpdateCartQty={handleUpdateCartQty}
            savedAddress={savedAddress}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            purchaseHistory={purchaseHistory}
            onLogout={() => setIsLoggedIn(false)} 
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            savedAddress={savedAddress}
            setSavedAddress={setSavedAddress}
          />
        );
      default:
        return <HomeScreen 
          onNavigate={setActiveTab} 
          bookedGames={bookedGames} 
          onAddToCart={handleAddToCart} 
          loyaltyPoints={loyaltyPoints}
        />;
    }
  };

  const totalCartQty = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="mobile-container">
      {/* Dynamic Content Area */}
      <main className="content-area">
        {renderScreen()}
      </main>

      {/* Global Floating AI Chat */}
      {!hideChat && <ChatBubble />}

      {/* Floating Bottom Navigation */}
      <nav className="bottom-nav glass-panel">
        <div className={`nav-highlight active-${activeTab}`}></div>
        <button 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={24} />
          <span>Home</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          <Coffee size={24} />
          <span>Menu</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          <Gamepad2 size={24} />
          <span>Play</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          <div className="cart-icon-wrapper">
            <ShoppingBag size={24} />
            {totalCartQty > 0 && (
              <span className="cart-dot pulse-anim"></span>
            )}
          </div>
          <span>Cart</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={24} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
