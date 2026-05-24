import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CreditCard, ChevronRight, Check, ShoppingCart, Smartphone, Wallet } from 'lucide-react';
import './CheckoutScreen.css';

const tables = [
  { id: 1, type: 'booth', label: 'Booth 1' },
  { id: 2, type: 'booth', label: 'Booth 2' },
  { id: 3, type: 'booth', label: 'Booth 3' },
  { id: 4, type: 'window', label: 'Window 4' },
  { id: 5, type: 'window', label: 'Window 5' },
  { id: 6, type: 'window', label: 'Window 6' },
  { id: 7, type: 'lounge', label: 'Lounge 7' },
  { id: 8, type: 'lounge', label: 'Lounge 8' },
  { id: 9, type: 'lounge', label: 'Lounge 9' }
];

const CheckoutScreen = ({ cart, onClearCart, onNavigate, onCheckout, savedAddress }) => {
  const [orderStatus, setOrderStatus] = useState('checkout'); // 'checkout', 'received', 'brewing', 'ready'
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [pickupMethod, setPickupMethod] = useState('counter');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  // Table Booking States
  const [showTableMap, setShowTableMap] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  // Slide-to-Pay slider value
  const [slideVal, setSlideVal] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = () => {
    setOrderStatus('received');
    setTimeout(() => setOrderStatus('brewing'), 3000);
    setTimeout(() => setOrderStatus('ready'), 8000);
  };

  const handleSlideChange = (e) => {
    const val = parseInt(e.target.value);
    
    // Prevent checkout if delivery but no address
    if (val === 100 && pickupMethod === 'delivery' && !savedAddress) {
      alert("Please save a delivery address in your Profile first.");
      setSlideVal(0);
      return;
    }

    setSlideVal(val);
    if (val === 100) {
      handlePayment();
    }
  };

  const handleSlideRelease = () => {
    if (slideVal < 100) {
      setSlideVal(0); // Snap back to start if not fully slid
    }
  };

  const handleDone = () => {
    const order = {
      id: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      total: total.toFixed(2),
      paymentMethod: paymentMethod,
      pickupMethod: pickupMethod,
      deliveryAddress: pickupMethod === 'delivery' ? savedAddress : null
    };
    if (onCheckout) onCheckout(order);
    onClearCart();
    setOrderStatus('checkout');
    setSlideVal(0);
    setSelectedTable(null);
    onNavigate('home');
  };

  useEffect(() => {
    let timer;
    if (orderStatus !== 'checkout' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [orderStatus, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (orderStatus !== 'checkout') {
    return (
      <div className="checkout-screen tracking-screen fade-in">
        <div className="tracking-header">
          <h2 className="font-playfair text-primary">Your Ritual is in Progress</h2>
          <p className="text-muted">Order #842 {pickupMethod === 'table' && selectedTable ? `• Table ${selectedTable.id}` : ''}</p>
        </div>

        <div className="timer-container">
          <h1 className="countdown font-playfair">{formatTime(timeLeft)}</h1>
          <p className="text-muted">Estimated {pickupMethod === 'counter' ? 'Pickup' : 'Delivery'}</p>
        </div>

        <div className="progress-tracker">
          <div className={`progress-step ${orderStatus === 'received' || orderStatus === 'brewing' || orderStatus === 'ready' ? 'active' : ''}`}>
            <div className="step-icon"></div>
            <div className="step-content">
              <h4>Order Received</h4>
              <p>We've got it.</p>
            </div>
          </div>
          <div className={`progress-step ${orderStatus === 'brewing' || orderStatus === 'ready' ? 'active brewing-anim' : ''}`}>
            <div className="step-icon"></div>
            <div className="step-content">
              <h4>Brewing</h4>
              <p>Crafting your drink.</p>
            </div>
          </div>
          <div className={`progress-step ${orderStatus === 'ready' ? 'active ready-glow' : ''}`}>
            <div className="step-icon"></div>
            <div className="step-content">
              <h4>Ready</h4>
              <p>{pickupMethod === 'table' ? `En route to Table ${selectedTable?.id}.` : 'Waiting at the counter.'}</p>
            </div>
          </div>
        </div>

        <div className="tracking-footer">
          <button className="btn-secondary" onClick={handleDone}>Done & Clear Cart</button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-screen empty-cart-screen fade-in">
        <div className="empty-cart-content">
          <div className="empty-icon-container glass-panel">
            <ShoppingCart size={48} className="text-muted" />
          </div>
          <h2 className="font-playfair text-primary">Your Cart is Empty</h2>
          <p className="text-muted text-center mt-2">Looks like you haven't added any ritual items yet. Head to the menu to begin.</p>
          <button className="btn-primary mt-6" onClick={() => onNavigate('menu')}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-screen fade-in">
      <h2 className="screen-title font-playfair text-primary">Your Cart</h2>
      
      {/* Order Summary */}
      <div className="order-summary glass-panel">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="qty">{item.qty}x</span>
                <div>
                  <h4>{item.name}</h4>
                  <p className="text-xs text-muted">{item.details}</p>
                </div>
              </div>
              <span className="item-price">RM {(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="cart-totals">
          <div className="totals-row">
            <span className="text-muted">Subtotal</span>
            <span>RM {subtotal.toFixed(2)}</span>
          </div>
          <div className="totals-row">
            <span className="text-muted">Tax (6%)</span>
            <span>RM {tax.toFixed(2)}</span>
          </div>
          <div className="totals-row grand-total">
            <span className="font-playfair text-primary">Total</span>
            <span className="font-playfair text-primary">RM {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Logistics Toggles */}
      <div className="logistics-section">
        <h3 className="section-subtitle font-playfair">Logistics</h3>
        <div className="pickup-toggles">
          <button 
            className={`toggle-btn ${pickupMethod === 'counter' ? 'active' : ''}`}
            onClick={() => setPickupMethod('counter')}
          >
            <Clock size={18} />
            Counter Pickup
          </button>
          <button 
            className={`toggle-btn ${pickupMethod === 'table' ? 'active' : ''}`}
            onClick={() => setPickupMethod('table')}
          >
            <MapPin size={18} />
            Table Delivery
          </button>
          <button 
            className={`toggle-btn ${pickupMethod === 'delivery' ? 'active' : ''}`}
            onClick={() => setPickupMethod('delivery')}
          >
            <MapPin size={18} />
            Delivery
          </button>
        </div>

        {/* Delivery Warning */}
        {pickupMethod === 'delivery' && (
          <div className="table-selector-trigger fade-in" style={{marginTop:'15px'}}>
            <div className="btn-select-table glass-panel" style={{cursor:'default', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
              {savedAddress ? (
                <>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px'}}>
                    <Check size={18} className="text-accent" />
                    <strong>Deliver to:</strong>
                  </div>
                  <span className="text-muted text-sm">{savedAddress}</span>
                </>
              ) : (
                <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#E25C5C'}}>
                  <MapPin size={18} />
                  <span>No address saved! Please add one in your Profile.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Table Selection Trigger */}
        {pickupMethod === 'table' && (
          <div className="table-selector-trigger fade-in">
            <button 
              className="btn-select-table glass-panel"
              onClick={() => setShowTableMap(true)}
            >
              {selectedTable ? (
                <>
                  <Check size={18} className="text-accent" />
                  <span>Delivery to {selectedTable.label}</span>
                </>
              ) : (
                <>
                  <MapPin size={18} className="text-muted" />
                  <span>Choose Table Lounge Layout</span>
                </>
              )}
              <ChevronRight size={18} className="ml-auto" />
            </button>
          </div>
        )}
      </div>

      {/* Payment Method Selector */}
      <div className="payment-method-section">
        <h3 className="section-subtitle font-playfair">Payment Method</h3>
        <div className="payment-options">
          <button 
            className={`pay-btn ${paymentMethod === 'credit' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('credit')}
          >
            <CreditCard size={20} />
            <span>Card</span>
          </button>
          <button 
            className={`pay-btn ${paymentMethod === 'sarawakpay' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('sarawakpay')}
          >
            <Smartphone size={20} />
            <span>S Pay</span>
          </button>
          <button 
            className={`pay-btn ${paymentMethod === 'tng' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('tng')}
          >
            <Wallet size={20} />
            <span>TnG</span>
          </button>
          <button 
            className={`pay-btn ${paymentMethod === 'grabpay' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('grabpay')}
          >
            <Wallet size={20} />
            <span>Grab</span>
          </button>
        </div>
      </div>

      {/* Slide-to-Pay Confirmation Slider */}
      <div className="payment-section">
        <div className="slide-pay-container glass-panel" style={{ '--slide-pct': `${slideVal}%` }}>
          <div className="slide-pay-label">
            <span>Swipe to Confirm Order</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={slideVal}
            onChange={handleSlideChange}
            onMouseUp={handleSlideRelease}
            onTouchEnd={handleSlideRelease}
            className="slide-pay-input"
          />
          <div className="slide-pay-thumb">
            <div className="thumb-cup">☕</div>
          </div>
        </div>
      </div>

      {/* Interactive Table Map Modal */}
      {showTableMap && (
        <div className="table-map-overlay glass-panel fade-in">
          <div className="map-modal">
            <div className="map-header">
              <h3 className="font-playfair text-primary">The HideOut Layout</h3>
              <button className="close-btn" onClick={() => setShowTableMap(false)}>✕</button>
            </div>
            
            <p className="text-sm text-muted mb-4">Tap the table or booth you are currently seated at.</p>
            
            <div className="lounge-map">
              {/* Stylized Visual Layout Map */}
              <div className="bar-counter">Bar Counter & Baristas</div>
              
              <div className="tables-grid">
                {tables.map(table => (
                  <button 
                    key={table.id}
                    className={`map-table-node ${table.type} ${selectedTable?.id === table.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedTable(table);
                      setShowTableMap(false);
                    }}
                  >
                    <span>{table.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutScreen;
