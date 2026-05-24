import React, { useState } from 'react';
import { Settings, ChevronRight, MapPin, CreditCard, LogOut, Play, Pause, Edit2, Check, Clock, ChevronDown, X } from 'lucide-react';
import './ProfileScreen.css';

const ProfileScreen = ({ onLogout, purchaseHistory = [], isDarkMode, setIsDarkMode, savedAddress, setSavedAddress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddressDrawer, setShowAddressDrawer] = useState(false);
  const [tempAddress, setTempAddress] = useState(savedAddress);
  
  const [profile, setProfile] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    avatar: '/assets/avatar.png'
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  return (
    <div className="profile-screen fade-in">
      <div className="profile-header">
        <h2 className="screen-title font-playfair text-primary">Your Profile</h2>
        <button className="settings-btn" onClick={() => setShowSettings(true)}>
          <Settings size={22} className="text-muted"/>
        </button>
      </div>

      <div className="profile-card glass-panel">
        <div className="profile-avatar">
          <img src={isEditing ? tempProfile.avatar : profile.avatar} alt="Profile" />
        </div>
        
        <div className="profile-info" style={{ flex: 1 }}>
          {isEditing ? (
            <div className="edit-form">
              <input 
                type="text" 
                className="edit-input title-input font-playfair"
                value={tempProfile.name}
                onChange={e => setTempProfile({...tempProfile, name: e.target.value})}
              />
              <input 
                type="email" 
                className="edit-input email-input text-muted text-sm"
                value={tempProfile.email}
                onChange={e => setTempProfile({...tempProfile, email: e.target.value})}
              />
            </div>
          ) : (
            <>
              <h3 className="font-playfair">{profile.name}</h3>
              <p className="text-muted text-sm">{profile.email}</p>
            </>
          )}
        </div>

        <div className="profile-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {isEditing ? (
            <button className="action-btn text-accent" onClick={handleSave}>
              <Check size={20} />
            </button>
          ) : (
            <button className="action-btn text-muted" onClick={handleEditClick}>
              <Edit2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-box glass-panel">
          <span className="stat-num text-primary font-playfair">140</span>
          <span className="stat-label text-muted">Points</span>
        </div>
        <div className="stat-box glass-panel">
          <span className="stat-num text-primary font-playfair">12</span>
          <span className="stat-label text-muted">Orders</span>
        </div>
        <div className="stat-box glass-panel">
          <span className="stat-num text-primary font-playfair">3</span>
          <span className="stat-label text-muted">Bookings</span>
        </div>
      </div>

      {/* Purchase History */}
      <div className="purchase-history mt-4">
        <h4 className="menu-title font-playfair text-primary">Recent Orders</h4>
        {purchaseHistory.length === 0 ? (
          <div className="empty-history glass-panel">
            <Clock size={24} className="text-muted" />
            <p className="text-muted mt-2">No past orders found.</p>
          </div>
        ) : (
          <div className="history-list">
            {purchaseHistory.map((order, idx) => (
              <button 
                key={idx} 
                className="history-item glass-panel"
                onClick={() => setSelectedReceipt(order)}
              >
                <div className="history-icon">
                  <span className="font-playfair text-accent text-lg">{order.items.length}</span>
                </div>
                <div className="history-details">
                  <h4 className="font-playfair">{order.id}</h4>
                  <p className="text-muted text-sm">{order.date}</p>
                </div>
                <div className="history-total">
                  <span className="font-playfair">RM {order.total}</span>
                  <ChevronRight size={16} className="text-muted ml-2" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Now Playing Spotify Vinyl Widget */}
      <div className="spotify-widget glass-panel">
        <div className="vinyl-container">
          <div className={`vinyl-disc ${isPlaying ? 'spin-animation' : ''}`}>
            <div className="vinyl-center"></div>
          </div>
        </div>
        <div className="track-info">
          <span className="widget-tag text-accent font-playfair">Lounge Ambience</span>
          <h4 className="track-title font-playfair">Midnight Jazz Grooves</h4>
          <p className="track-artist text-sm text-muted">Playing Live in Cafe</p>
        </div>
        <button className="btn-play-widget" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause size={20} className="text-primary"/> : <Play size={20} className="text-primary" />}
        </button>
      </div>

      <div className="profile-menu">
        <h4 className="menu-title font-playfair text-primary">Preferences</h4>
        <button className="menu-item glass-panel" onClick={() => { setTempAddress(savedAddress); setShowAddressDrawer(true); }}>
          <MapPin size={20} className="text-muted" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span>Saved Addresses</span>
            {savedAddress && <span className="text-xs text-muted" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'150px'}}>{savedAddress}</span>}
          </div>
          <ChevronRight size={18} className="text-muted ml-auto" />
        </button>
        <button className="menu-item glass-panel">
          <CreditCard size={20} className="text-muted" />
          <span>Payment Methods</span>
          <ChevronRight size={18} className="text-muted ml-auto" />
        </button>
        
        <h4 className="menu-title font-playfair text-primary mt-4">Account</h4>
        <button className="menu-item glass-panel" onClick={onLogout}>
          <LogOut size={20} className="text-muted" />
          <span>Log Out</span>
          <ChevronRight size={18} className="text-muted ml-auto" />
        </button>
      </div>
      {/* Digital Receipt Drawer */}
      <div className={`receipt-overlay ${selectedReceipt ? 'active' : ''}`} onClick={() => setSelectedReceipt(null)}></div>
      <div className={`receipt-drawer ${selectedReceipt ? 'open' : ''}`}>
        {selectedReceipt && (
          <div className="receipt-content">
            <div className="receipt-header">
              <h3 className="font-playfair text-primary">Digital Receipt</h3>
              <button className="close-btn" onClick={() => setSelectedReceipt(null)}>
                <X size={24} className="text-muted" />
              </button>
            </div>
            <div className="receipt-paper">
              <div className="receipt-brand">
                <h2 className="font-playfair">The HideOut</h2>
                <p className="text-sm text-muted">Summer Mall, Sarawak</p>
                <p className="text-xs text-muted">{selectedReceipt.date}</p>
                {selectedReceipt.pickupMethod === 'delivery' && (
                  <div className="mt-2 text-xs text-muted" style={{ borderTop: '1px dashed rgba(0,0,0,0.1)', paddingTop: '8px' }}>
                    <strong>Delivery Address:</strong><br/>
                    {selectedReceipt.deliveryAddress || 'N/A'}
                  </div>
                )}
                <div className="receipt-divider"></div>
                <p className="font-playfair text-lg">Order #{selectedReceipt.id}</p>
              </div>
              
              <div className="receipt-items mt-4">
                {selectedReceipt.items.map((item, idx) => (
                  <div key={idx} className="receipt-row">
                    <span>{item.qty}x {item.name}</span>
                    <span>RM {(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-divider"></div>
              
              <div className="receipt-totals">
                <div className="receipt-row text-sm text-muted">
                  <span>Subtotal</span>
                  <span>RM {(selectedReceipt.total / 1.06).toFixed(2)}</span>
                </div>
                <div className="receipt-row text-sm text-muted">
                  <span>Tax (6%)</span>
                  <span>RM {(selectedReceipt.total - (selectedReceipt.total / 1.06)).toFixed(2)}</span>
                </div>
                <div className="receipt-row receipt-grand-total font-playfair text-primary mt-2">
                  <span>Total</span>
                  <span>RM {selectedReceipt.total}</span>
                </div>
              </div>

              <div className="receipt-footer mt-4">
                <p className="text-sm text-muted">Paid via {selectedReceipt.paymentMethod.toUpperCase()}</p>
                <p className="text-xs text-muted mt-2">Thank you for visiting!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Drawer */}
      <div className={`receipt-overlay ${showSettings ? 'active' : ''}`} onClick={() => setShowSettings(false)}></div>
      <div className={`receipt-drawer ${showSettings ? 'open' : ''}`}>
        <div className="receipt-content">
          <div className="receipt-header">
            <h3 className="font-playfair text-primary">App Settings</h3>
            <button className="close-btn" onClick={() => setShowSettings(false)}>
              <X size={24} className="text-muted" />
            </button>
          </div>
          <div className="profile-menu mt-4">
            <button className="menu-item glass-panel">
              <span>Push Notifications</span>
              <div className="ml-auto text-accent"><Check size={18}/></div>
            </button>
            <button className="menu-item glass-panel" onClick={() => setIsDarkMode(!isDarkMode)}>
              <span>Dark Mode</span>
              <div className="ml-auto text-muted">{isDarkMode ? 'On' : 'Off'}</div>
            </button>
            <button className="menu-item glass-panel">
              <span>Privacy & Security</span>
              <ChevronRight size={18} className="text-muted ml-auto" />
            </button>
            <button className="menu-item glass-panel">
              <span>Help & Support</span>
              <ChevronRight size={18} className="text-muted ml-auto" />
            </button>
          </div>
          <div style={{textAlign: 'center', marginTop: '30px'}}>
            <p className="text-muted text-sm">App Version 1.0.4</p>
          </div>
        </div>
      </div>

      {/* Address Editor Drawer */}
      <div className={`receipt-overlay ${showAddressDrawer ? 'active' : ''}`} onClick={() => setShowAddressDrawer(false)}></div>
      <div className={`receipt-drawer ${showAddressDrawer ? 'open' : ''}`}>
        <div className="receipt-content">
          <div className="receipt-header">
            <h3 className="font-playfair text-primary">Saved Address</h3>
            <button className="close-btn" onClick={() => setShowAddressDrawer(false)}>
              <X size={24} className="text-muted" />
            </button>
          </div>
          <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p className="text-sm text-muted">Enter your default delivery address for faster checkout.</p>
            <textarea
              className="glass-panel"
              style={{ width: '100%', height: '100px', padding: '15px', borderRadius: '12px', border: 'none', fontFamily: 'inherit', resize: 'none', color: 'var(--color-text-dark)', outline: 'none' }}
              placeholder="e.g. 123 Forest Avenue, Apartment 4B..."
              value={tempAddress}
              onChange={(e) => setTempAddress(e.target.value)}
            />
            <button 
              className="btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                setSavedAddress(tempAddress);
                setShowAddressDrawer(false);
              }}
            >
              Save Address
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileScreen;
