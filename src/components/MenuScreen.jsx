import React, { useState } from 'react';
import { Search, Plus, Minus, X, Heart, Lock, Key } from 'lucide-react';
import './MenuScreen.css';

const normalItems = [
  { id: 1, name: 'Speakeasy Espresso', desc: 'Our signature dark roast with notes of cocoa.', price: 4.50, category: 'Classics', img: '/assets/espresso.png' },
  { id: 2, name: 'Velvet Flat White', desc: 'Micro-foamed oat milk over double ristretto.', price: 5.50, category: 'Classics', img: '/assets/latte.png' },
  { id: 3, name: 'Smoked Maple Latte', desc: 'Infused with real wood smoke and maple syrup.', price: 6.50, category: 'Signature Pours', img: '/assets/latte.png' },
  { id: 4, name: 'Matcha Cloud', desc: 'Ceremonial grade matcha with vanilla sweet cream.', price: 6.00, category: 'Non-Coffee', img: '/assets/matcha.png' },
  { id: 5, name: 'Truffle Croissant', desc: 'Flaky pastry filled with dark chocolate truffle.', price: 4.00, category: 'Pastries', img: '/assets/pastry.png' },
  
  // New Bites
  { id: 6, name: 'Hideout Toast', desc: 'Pure Comfort. Thick, fluffy toast topped with golden torched marshmallows with chocolate drizzle.', price: 14.50, category: 'Bites', img: '/assets/toast.png' },
  { id: 7, name: 'Choc & Banana', desc: 'Decadent Treat. Layers of Nutella, fresh banana slices, chocolate sauce, and a side of ice cream.', price: 14.50, category: 'Bites', img: '/assets/toast.png' },
  { id: 8, name: 'Kaya & Butter', desc: 'Nostalgic Local. Classic kaya and butter toast served with soft-boiled eggs.', price: 13.90, category: 'Bites', img: '/assets/toast.png' },
  { id: 9, name: 'HK Style French', desc: 'Hong Kong Style. Crispy deep-fried toast coated in egg, finished with butter, condensed milk, and a scoop of ice cream.', price: 15.50, category: 'Bites', img: '/assets/toast.png' },
  { id: 10, name: 'Egg Mayo Sandwich', desc: 'Creamy egg mayo with fresh veggies, served in toasted bread. Comes with fries.', price: 13.90, category: 'Bites', img: '/assets/sandwich.png' },
  { id: 11, name: 'Crab Mayo Sandwich', desc: 'Juicy crab sticks tossed in mayo and seasonings, paired with fresh greens. Comes with fries.', price: 16.90, category: 'Bites', img: '/assets/sandwich.png' },
  { id: 12, name: 'Banana Fritters', desc: 'Crispy on the outside, soft and sweet on the inside.', price: 10.00, category: 'Bites', img: '/assets/pastry.png' },
  
  // Custom Noodle Base
  { id: 13, name: 'Custom Noodle Bowl', desc: 'Build your own bowl! Choose your noodles, combo tier, and fresh toppings.', price: 8.00, category: 'Noodles', img: '/assets/noodles.png' }
];



const standardToppingsList = ['Sausage', 'Fish Tofu', 'Enoki', 'Crab stick', 'Fishball'];
const premiumToppingsList = ['Spam', 'Kimchi', 'Cheese', 'Tteokbokki'];

const normalCategories = ['All', 'Noodles', 'Bites', 'Signature Pours', 'Classics', 'Non-Coffee', 'Pastries'];

const MenuScreen = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  
  // Customization state - General
  const [itemQuantity, setItemQuantity] = useState(1);

  // Customization state - Coffee
  const [size, setSize] = useState('Large'); // 'Regular' or 'Large'
  const [shots, setShots] = useState(2);
  const [sweetness, setSweetness] = useState(2); // 0-4 scale

  // Customization state - Noodles
  const [noodleBase, setNoodleBase] = useState('Instant Noodle'); // Instant Noodle | Ramyun
  const [comboType, setComboType] = useState('Standard'); // Standard | Premium
  const [toppingPackage, setToppingPackage] = useState(0); // 0, 1, 2, 3
  const [drinkUpgrade, setDrinkUpgrade] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState(new Set());

  const menuItems = normalItems;
  const categories = normalCategories;

  const filteredMenu = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) {
      newFavs.delete(id);
    } else {
      newFavs.add(id);
    }
    setFavorites(newFavs);
  };

  const toggleTopping = (topping) => {
    const newToppings = new Set(selectedToppings);
    if (newToppings.has(topping)) {
      newToppings.delete(topping);
    } else {
      newToppings.add(topping);
    }
    setSelectedToppings(newToppings);
  };

  const calculatePrice = () => {
    if (!selectedItem) return 0;
    
    if (selectedItem.category === 'Noodles') {
      let price = 0;
      if (comboType === 'Standard') {
        if (toppingPackage === 0) price = 8.00;
        else if (toppingPackage === 1) price = 9.00;
        else if (toppingPackage === 2) price = 10.50;
        else if (toppingPackage === 3) price = 12.00;
      } else {
        if (toppingPackage === 0) price = 10.00;
        else if (toppingPackage === 1) price = 11.00;
        else if (toppingPackage === 2) price = 13.00;
        else if (toppingPackage === 3) price = 14.50;
      }
      
      if (drinkUpgrade) price += 2.00;
      
      let premiumCount = 0;
      let standardCount = 0;
      
      selectedToppings.forEach(topping => {
        if (premiumToppingsList.includes(topping)) premiumCount++;
        else if (standardToppingsList.includes(topping)) standardCount++;
      });
      
      let freeSlots = toppingPackage;
      
      while (freeSlots > 0 && premiumCount > 0) {
        premiumCount--;
        freeSlots--;
      }
      
      while (freeSlots > 0 && standardCount > 0) {
        standardCount--;
        freeSlots--;
      }
      
      price += (premiumCount * 3.50);
      price += (standardCount * 2.50);
      
      return price * itemQuantity;
    } else if (selectedItem.category === 'Bites' || selectedItem.category === 'Pastries') {
      return selectedItem.price * itemQuantity;
    } else {
      // Coffee
      return (selectedItem.price + (shots > 2 ? 0.5 : 0) + (size === 'Large' ? 0.5 : 0)) * itemQuantity;
    }
  };

  const resetDrawerState = () => {
    setItemQuantity(1);
    setSize('Large');
    setShots(2);
    setSweetness(2);
    setNoodleBase('Instant Noodle');
    setComboType('Standard');
    setToppingPackage(0);
    setDrinkUpgrade(false);
    setSelectedToppings(new Set());
  };

  const closeDrawer = () => {
    setSelectedItem(null);
    resetDrawerState();
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      let details = '';
      if (selectedItem.category === 'Noodles') {
        details = `${noodleBase}, ${comboType} Combo (+${toppingPackage})`;
        if (drinkUpgrade) details += ' w/ Drink';
        if (selectedToppings.size > 0) {
          details += ` [${Array.from(selectedToppings).join(', ')}]`;
        }
      } else if (selectedItem.category === 'Bites' || selectedItem.category === 'Pastries') {
        details = 'Standard';
      } else {
        details = `${size}, ${shots} shots, Sugar Level ${sweetness}`;
      }

      onAddToCart({
        id: selectedItem.id + '-' + Date.now(),
        name: selectedItem.name,
        details: details,
        price: calculatePrice() / itemQuantity,
        qty: itemQuantity
      });
      closeDrawer();
    }
  };

  const renderDrawerContent = () => {
    if (selectedItem.category === 'Noodles') {
      return (
        <div className="drawer-content noodles-builder fade-in">
          <div className="custom-section flex-between">
            <h4>Quantity</h4>
            <div className="stepper glass-panel">
              <button onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}><Minus size={16}/></button>
              <span>{itemQuantity}</span>
              <button onClick={() => setItemQuantity(itemQuantity + 1)}><Plus size={16}/></button>
            </div>
          </div>

          <div className="custom-section">
            <h4>Noodle Base</h4>
            <div className="options-grid">
              <button className={`option-btn ${noodleBase === 'Instant Noodle' ? 'active' : ''}`} onClick={() => setNoodleBase('Instant Noodle')}>Instant Noodle</button>
              <button className={`option-btn ${noodleBase === 'Ramyun' ? 'active' : ''}`} onClick={() => setNoodleBase('Ramyun')}>Ramyun</button>
            </div>
          </div>
          
          <div className="custom-section">
            <h4>Combo Type</h4>
            <div className="options-grid">
              <button className={`option-btn ${comboType === 'Standard' ? 'active' : ''}`} onClick={() => setComboType('Standard')}>Standard Base</button>
              <button className={`option-btn ${comboType === 'Premium' ? 'active' : ''}`} onClick={() => setComboType('Premium')}>Premium Base</button>
            </div>
          </div>
          
          <div className="custom-section">
            <h4>Topping Package</h4>
            <div className="options-grid-4">
              {[0, 1, 2, 3].map(num => (
                <button key={num} className={`option-btn ${toppingPackage === num ? 'active' : ''}`} onClick={() => setToppingPackage(num)}>
                  {num === 0 ? 'A La Carte' : `+${num}`}
                </button>
              ))}
            </div>
          </div>
          
          <div className="custom-section flex-between">
            <h4>Add Drink Upgrade (+ RM 2.00)</h4>
            <button className={`toggle-btn ${drinkUpgrade ? 'active' : ''}`} onClick={() => setDrinkUpgrade(!drinkUpgrade)}>
              {drinkUpgrade ? 'Added' : 'Add'}
            </button>
          </div>
          
          <div className="custom-section">
            <h4>Select Toppings</h4>
            <p className="text-muted" style={{fontSize: '0.75rem', marginBottom: '10px'}}>Package includes {toppingPackage} toppings. Extras charged a la carte.</p>
            
            <h5 className="font-playfair text-primary" style={{marginTop: '15px', marginBottom: '8px'}}>Standard (+ RM 2.50)</h5>
            <div className="toppings-grid">
              {standardToppingsList.map(topping => (
                <button 
                  key={topping} 
                  className={`topping-checkbox ${selectedToppings.has(topping) ? 'checked' : ''}`}
                  onClick={() => toggleTopping(topping)}
                >
                  <div className={`checkbox-box ${selectedToppings.has(topping) ? 'checked' : ''}`}></div>
                  <span>{topping}</span>
                </button>
              ))}
            </div>
            
            <h5 className="font-playfair text-primary" style={{marginTop: '15px', marginBottom: '8px'}}>Premium (+ RM 3.50)</h5>
            <div className="toppings-grid">
              {premiumToppingsList.map(topping => (
                <button 
                  key={topping} 
                  className={`topping-checkbox ${selectedToppings.has(topping) ? 'checked' : ''}`}
                  onClick={() => toggleTopping(topping)}
                >
                  <div className={`checkbox-box ${selectedToppings.has(topping) ? 'checked' : ''}`}></div>
                  <span>{topping}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selectedItem.category === 'Bites' || selectedItem.category === 'Pastries') {
      return (
        <div className="drawer-content bites-drawer fade-in">
          <div className="item-full-desc text-muted" style={{marginBottom: '20px', lineHeight: '1.5'}}>
            {selectedItem.desc}
          </div>
          <div className="custom-section flex-between">
            <h4>Quantity</h4>
            <div className="stepper glass-panel">
              <button onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}><Minus size={16}/></button>
              <span>{itemQuantity}</span>
              <button onClick={() => setItemQuantity(itemQuantity + 1)}><Plus size={16}/></button>
            </div>
          </div>
        </div>
      );
    } else {
      // Coffee Drawer
      return (
        <div className="drawer-content coffee-drawer fade-in">
          <div className="custom-section flex-between">
            <h4>Quantity</h4>
            <div className="stepper glass-panel">
              <button onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}><Minus size={16}/></button>
              <span>{itemQuantity}</span>
              <button onClick={() => setItemQuantity(itemQuantity + 1)}><Plus size={16}/></button>
            </div>
          </div>

          <div className="custom-section">
            <h4>Size</h4>
            <div className="size-selector-tactile">
              <button 
                className={`size-card ${size === 'Regular' ? 'active' : ''}`}
                onClick={() => setSize('Regular')}
              >
                <svg className="cup-outline regular-cup" viewBox="0 0 50 70">
                  <path d="M10 10 L40 10 L35 60 L15 60 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                  <path d="M15 25 L35 25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/>
                </svg>
                <span>Regular</span>
              </button>
              <button 
                className={`size-card ${size === 'Large' ? 'active' : ''}`}
                onClick={() => setSize('Large')}
              >
                <svg className="cup-outline large-cup" viewBox="0 0 50 70">
                  <path d="M5 5 L45 5 L38 65 L12 65 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                  <path d="M10 25 L40 25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/>
                </svg>
                <span>Large</span>
              </button>
            </div>
          </div>

          <div className="custom-section">
            <h4>Milk Alternative</h4>
            <div className="milk-selector">
              <select className="glass-select">
                <option>Whole Milk</option>
                <option>Oat Milk (+0.50)</option>
                <option>Almond Milk (+0.50)</option>
              </select>
            </div>
          </div>

          <div className="custom-section flex-between">
            <h4>Espresso Shots</h4>
            <div className="stepper glass-panel">
              <button onClick={() => setShots(Math.max(0, shots - 1))}><Minus size={16}/></button>
              <span>{shots}</span>
              <button onClick={() => setShots(shots + 1)}><Plus size={16}/></button>
            </div>
          </div>

          <div className="custom-section">
            <h4>Sweetness Level</h4>
            <div className="slider-container">
              <input 
                type="range" 
                min="0" max="4" 
                value={sweetness}
                onChange={(e) => setSweetness(parseInt(e.target.value))}
                className="custom-slider"
              />
              <div className="slider-labels text-muted">
                <span>None</span>
                <span>Standard</span>
                <span>Extra</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="menu-screen fade-in">
      <div className={`menu-main ${selectedItem ? 'blurred' : ''}`}>

        <div className="menu-header">
          <div className="search-bar glass-panel">
            <Search size={20} className="text-muted" />
            <input type="text" placeholder="Search the hideout..." />
          </div>
          
          <div className="category-scroll">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {filteredMenu.map(item => (
            <div 
              key={item.id} 
              className="menu-item-card glass-panel"
              onClick={() => setSelectedItem(item)}
            >
              <div className="item-img-container">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="item-details">
                <div className="item-title-row">
                  <h3 className="font-playfair">{item.name}</h3>
                  <button className="favorite-btn" onClick={(e) => toggleFavorite(e, item.id)}>
                    <Heart size={18} className={favorites.has(item.id) ? 'heart-active' : 'heart-inactive'} />
                  </button>
                </div>
                <p className="item-desc text-muted">{item.desc}</p>
                <span className="item-price font-playfair">RM {item.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`customization-drawer glass-panel ${selectedItem ? 'open' : ''}`}>
        {selectedItem && (
          <>
            <div className="drawer-header">
              <h2 className="font-playfair">{selectedItem.name}</h2>
              <button className="close-btn" onClick={closeDrawer}>
                <X size={24} />
              </button>
            </div>
            
            {renderDrawerContent()}

            <div className="drawer-footer">
              <button className="btn-primary full-width" onClick={handleAddToCart}>
                Add to Cart - RM {calculatePrice().toFixed(2)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuScreen;
