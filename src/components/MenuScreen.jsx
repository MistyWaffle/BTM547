import React, { useState, Component } from 'react';
import { createPortal } from 'react-dom';
import { Search, Plus, Minus, X, Heart } from 'lucide-react';
import './MenuScreen.css';

const normalItems = [
  // Noodles
  { id: 1, name: 'Custom Noodle Bowl', desc: 'Build your own bowl! Choose your noodles, combo tier, and fresh toppings.', price: 8.00, category: 'Noodles', img: '/assets/Noodle_Combos.jpeg' },
  
  // Bites
  { id: 2, name: 'Hideout Toast', desc: 'Thick, fluffy toast topped with golden-torched marshmallows with chocolate drizzle.', price: 14.50, category: 'Bites', img: '/assets/Hideout_Toast.jpeg' },
  { id: 3, name: 'Choc & Banana', desc: 'Layers of Nutella, fresh banana slices, chocolate sauce, and a side of ice cream.', price: 14.50, category: 'Bites', img: '/assets/Choc_and_Banana.jpeg' },
  { id: 4, name: 'Kaya & Butter', desc: 'Classic kaya and butter toast served with soft-boiled eggs.', price: 13.90, category: 'Bites', img: '/assets/Kaya_and_Butter.jpeg' },
  { id: 5, name: 'HK Style French', desc: 'Crispy deep-fried toast coated in egg, finished with butter, condensed milk, and a scoop of ice cream.', price: 15.50, category: 'Bites', img: '/assets/Hong_Kong_Style_French_Toast.jpeg' },
  { id: 6, name: 'Banana Fritters', desc: 'Crispy on the outside, soft and sweet on the inside!', price: 10.00, category: 'Bites', img: '/assets/Banana_Fritters.jpeg' },
  { id: 7, name: 'Banana Cheese Fritters', desc: 'Crispy banana fritters topped with grated cheddar cheese and a drizzle of sweet condensed milk.', price: 12.50, category: 'Bites', img: '/assets/Banana_Fritters.jpeg' },
  { id: 8, name: 'Egg Mayo Sandwich', desc: 'Creamy egg mayo with fresh veggies, served in toasted bread — comes with fries.', price: 13.90, category: 'Bites', img: '/assets/Tuna_Mayo_Sandwich.jpeg' },
  { id: 9, name: 'Tuna Mayo Sandwich', desc: 'Savory tuna mixed with mayo and herbs, layered with crisp veggies — comes with fries.', price: 15.90, category: 'Bites', img: '/assets/Tuna_Mayo_Sandwich.jpeg' },
  { id: 10, name: 'Crab Mayo Sandwich', desc: 'Juicy crab sticks tossed in mayo and seasonings, paired with fresh greens — comes with fries.', price: 16.90, category: 'Bites', img: '/assets/Tuna_Mayo_Sandwich.jpeg' },

  // Platters
  { id: 11, name: 'Custom Platter', desc: 'Choose your combo and mix standard and premium items.', price: 15.50, category: 'Platters', img: '/assets/Ala_Carte.jpeg' },

  // Icy Bowls
  { id: 12, name: 'ABC', desc: 'Classic shaved ice dessert.', price: 7.00, category: 'Icy Bowls', img: '/assets/Icy_Boals.jpeg' },
  { id: 13, name: 'Cendol', desc: 'Sweet pandan jelly in coconut milk.', price: 7.00, category: 'Icy Bowls', img: '/assets/Icy_Boals.jpeg' },
  { id: 14, name: 'Jagung Ice', desc: 'Sweet corn shaved ice.', price: 7.00, category: 'Icy Bowls', img: '/assets/Icy_Boals.jpeg' },
  { id: 15, name: 'Red Bean Ice', desc: 'Red bean shaved ice.', price: 7.00, category: 'Icy Bowls', img: '/assets/Icy_Boals.jpeg' },
  { id: 16, name: 'Mixed Fruits', desc: 'Refreshing mixed fruits shaved ice.', price: 7.00, category: 'Icy Bowls', img: '/assets/Icy_Boals.jpeg' },
  { id: 17, name: 'White Lady', desc: 'Signature milky shaved ice dessert.', price: 7.00, category: 'Icy Bowls', img: '/assets/Icy_Boals.jpeg' },
  { id: 18, name: 'Milo/Oreo', desc: 'Milo and Oreo shaved ice.', price: 8.00, category: 'Icy Bowls', img: '/assets/Icy_Boals.jpeg' },
  { id: 19, name: 'Mango', desc: 'Fresh mango shaved ice.', price: 10.00, category: 'Icy Bowls', img: '/assets/Icy_Boals.jpeg' },
  { id: 20, name: 'Subak Hwachae', desc: 'Shareable (3-4 pax) Korean watermelon punch.', price: 30.00, category: 'Icy Bowls', img: '/assets/Subak_Hwachae.jpeg' },

  // Drinks
  { id: 21, name: 'Kopi', desc: 'Local coffee.', price: 3.00, category: 'Drinks', hasVariants: true, hotPrice: 3.0, coldPrice: 3.5, img: '/assets/drinks.jpeg' },
  { id: 22, name: 'Kopi O', desc: 'Local black coffee with sugar.', price: 3.00, category: 'Drinks', hasVariants: true, hotPrice: 3.0, coldPrice: 3.5, img: '/assets/drinks.jpeg' },
  { id: 23, name: 'Kopi C', desc: 'Local coffee with evaporated milk.', price: 3.00, category: 'Drinks', hasVariants: true, hotPrice: 3.0, coldPrice: 3.5, img: '/assets/drinks.jpeg' },
  { id: 24, name: 'Teh', desc: 'Local milk tea.', price: 3.00, category: 'Drinks', hasVariants: true, hotPrice: 3.0, coldPrice: 3.5, img: '/assets/drinks.jpeg' },
  { id: 25, name: 'Teh O', desc: 'Local tea with sugar.', price: 3.00, category: 'Drinks', hasVariants: true, hotPrice: 3.0, coldPrice: 3.5, img: '/assets/drinks.jpeg' },
  { id: 26, name: 'Teh C', desc: 'Local tea with evaporated milk.', price: 3.00, category: 'Drinks', hasVariants: true, hotPrice: 3.0, coldPrice: 3.5, img: '/assets/drinks.jpeg' },
  { id: 27, name: 'Milo', desc: 'Chocolate malt drink.', price: 4.00, category: 'Drinks', hasVariants: true, hotPrice: 4.0, coldPrice: 4.5, img: '/assets/drinks.jpeg' },
  { id: 28, name: 'Milo O', desc: 'Chocolate malt drink without milk.', price: 4.00, category: 'Drinks', hasVariants: true, hotPrice: 4.0, coldPrice: 4.5, img: '/assets/drinks.jpeg' },
  { id: 29, name: 'Milo C', desc: 'Chocolate malt drink with evaporated milk.', price: 4.00, category: 'Drinks', hasVariants: true, hotPrice: 4.0, coldPrice: 4.5, img: '/assets/drinks.jpeg' },
  { id: 30, name: 'Ribena Sprite', desc: 'Refreshing mix.', price: 6.00, category: 'Drinks', hasVariants: true, hotPrice: null, coldPrice: 6.0, img: '/assets/drinks.jpeg' },
  { id: 31, name: 'Bandung', desc: 'Rose syrup with milk.', price: 5.50, category: 'Drinks', hasVariants: true, hotPrice: null, coldPrice: 5.5, img: '/assets/drinks.jpeg' },
  { id: 32, name: 'Canned Drinks', desc: 'Various canned drinks.', price: 3.00, category: 'Drinks', hasVariants: true, hotPrice: null, coldPrice: 3.0, img: '/assets/drinks.jpeg' },
  { id: 33, name: 'Floats', desc: 'Canned drink + ice cream.', price: 6.50, category: 'Drinks', isFloat: true, img: '/assets/Floats.jpeg' }
];

const standardToppingsList = ['Sausage', 'Fish Tofu', 'Enoki', 'Crab stick', 'Fishball'];
const premiumToppingsList = ['Spam', 'Kimchi', 'Cheese', 'Tteokbokki'];

const platterStandardItems = ['Cocktail chicken sausage', 'Fries', 'Wedges', 'Tater tots', 'Nuggets'];
const platterPremiumItems = ['Fish fingers', 'Onion rings', 'Mozzarella cheese sticks', 'Popcorn chicken'];
const platterSauces = ['Tomato & Chilli', 'Tartar Sauce', 'Cheese Dip'];

const bitesAddonsList = [
  {name: 'Egg', price: 1.50},
  {name: 'Cheese', price: 2.00},
  {name: 'Drink (Canned/Coffee/Tea)', price: 2.00}
];

const normalCategories = ['All', 'Noodles', 'Bites', 'Platters', 'Icy Bowls', 'Drinks'];

class ModalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Modal rendering crash caught:", error, errorInfo);
    if (this.props.onReset) {
      // Defer state reset to avoid updating state during an existing render cycle
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

const MenuScreen = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  
  // Customization state - General
  const [itemQuantity, setItemQuantity] = useState(1);

  // Customization state - Noodles
  const [noodleBase, setNoodleBase] = useState('Instant Noodle');
  const [comboType, setComboType] = useState('Standard'); 
  const [toppingPackage, setToppingPackage] = useState(0); 
  const [drinkUpgrade, setDrinkUpgrade] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState(new Set()); // Shared by Noodles & Platters

  // Customization state - Platters
  const [platterCombo, setPlatterCombo] = useState('Twin Sparks'); // Twin Sparks | Campfire Trio | Blazing Feast | Ala Carte
  const [selectedSauces, setSelectedSauces] = useState(new Set(['Tomato & Chilli']));

  // Customization state - Bites
  const [bitesAddons, setBitesAddons] = useState(new Set());

  // Customization state - Drinks
  const [drinkVariant, setDrinkVariant] = useState('Cold');
  const [floatVariant, setFloatVariant] = useState('Vanilla');

  const menuItems = normalItems;
  const categories = normalCategories;

  const filteredMenu = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) newFavs.delete(id);
    else newFavs.add(id);
    setFavorites(newFavs);
  };

  const toggleSetItem = (set, item, setter) => {
    const newSet = new Set(set);
    if (newSet.has(item)) newSet.delete(item);
    else newSet.add(item);
    setter(newSet);
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
      while (freeSlots > 0 && premiumCount > 0) { premiumCount--; freeSlots--; }
      while (freeSlots > 0 && standardCount > 0) { standardCount--; freeSlots--; }
      
      price += (premiumCount * 3.50) + (standardCount * 2.50);
      return price * itemQuantity;

    } else if (selectedItem.category === 'Platters') {
      let price = 0;
      if (platterCombo === 'Twin Sparks') price = 15.50;
      else if (platterCombo === 'Campfire Trio') price = 23.50;
      else if (platterCombo === 'Blazing Feast') price = 33.00;
      else if (platterCombo === 'Ala Carte') {
        let pCount = 0;
        let sCount = 0;
        selectedToppings.forEach(topping => {
          if (platterPremiumItems.includes(topping)) pCount++;
          else if (platterStandardItems.includes(topping)) sCount++;
        });
        price = (pCount * 9.50) + (sCount * 8.00);
      }
      
      let saucePrice = 0;
      selectedSauces.forEach(s => {
        if (s === 'Tartar Sauce' || s === 'Cheese Dip') saucePrice += 1.50;
      });
      
      return (price + saucePrice) * itemQuantity;

    } else if (selectedItem.category === 'Bites') {
      let price = selectedItem.price;
      bitesAddons.forEach(addon => {
        const addonObj = bitesAddonsList.find(a => a.name === addon);
        if (addonObj) price += addonObj.price;
      });
      return price * itemQuantity;

    } else if (selectedItem.category === 'Drinks') {
      let price = selectedItem.price;
      if (selectedItem.isFloat) {
        price = 6.50;
      } else if (selectedItem.hasVariants) {
        price = drinkVariant === 'Cold' ? selectedItem.coldPrice : (selectedItem.hotPrice || selectedItem.coldPrice);
      }
      return price * itemQuantity;

    } else {
      // Icy Bowls
      return selectedItem.price * itemQuantity;
    }
  };

  const getSafePrice = () => {
    try {
      const price = calculatePrice();
      return (typeof price === 'number' && !isNaN(price)) ? price : 0;
    } catch (err) {
      console.error("calculatePrice crashed:", err);
      return 0;
    }
  };

  const resetDrawerState = () => {
    setItemQuantity(1);
    setNoodleBase('Instant Noodle');
    setComboType('Standard');
    setToppingPackage(0);
    setDrinkUpgrade(false);
    setSelectedToppings(new Set());
    setBitesAddons(new Set());
    setPlatterCombo('Twin Sparks');
    setSelectedSauces(new Set(['Tomato & Chilli']));
    setDrinkVariant('Cold');
    setFloatVariant('Vanilla');
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
        if (selectedToppings.size > 0) details += ` [${Array.from(selectedToppings).join(', ')}]`;
      } else if (selectedItem.category === 'Platters') {
        details = `${platterCombo}`;
        if (selectedToppings.size > 0) details += ` [${Array.from(selectedToppings).join(', ')}]`;
        if (selectedSauces.size > 0) details += ` Sauce: ${Array.from(selectedSauces).join(', ')}`;
      } else if (selectedItem.category === 'Bites') {
        details = 'Standard';
        if (bitesAddons.size > 0) details += ` + ${Array.from(bitesAddons).join(', ')}`;
      } else if (selectedItem.category === 'Drinks') {
        if (selectedItem.isFloat) details = `Float with ${floatVariant} Ice Cream`;
        else details = drinkVariant;
      } else {
        details = 'Standard';
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
            <h4>Add Drink (+ RM 2.00)</h4>
            <button className={`toggle-btn ${drinkUpgrade ? 'active' : ''}`} onClick={() => setDrinkUpgrade(!drinkUpgrade)}>
              {drinkUpgrade ? 'Added' : 'Add'}
            </button>
          </div>
          
          <div className="custom-section">
            <h4>Select Toppings</h4>
            <h5 className="font-playfair text-primary" style={{marginTop: '15px', marginBottom: '8px'}}>Standard (+ RM 2.50)</h5>
            <div className="toppings-grid">
              {standardToppingsList.map(topping => (
                <button key={topping} className={`topping-checkbox ${selectedToppings.has(topping) ? 'checked' : ''}`} onClick={() => toggleSetItem(selectedToppings, topping, setSelectedToppings)}>
                  <div className={`checkbox-box ${selectedToppings.has(topping) ? 'checked' : ''}`}></div>
                  <span>{topping}</span>
                </button>
              ))}
            </div>
            
            <h5 className="font-playfair text-primary" style={{marginTop: '15px', marginBottom: '8px'}}>Premium (+ RM 3.50)</h5>
            <div className="toppings-grid">
              {premiumToppingsList.map(topping => (
                <button key={topping} className={`topping-checkbox ${selectedToppings.has(topping) ? 'checked' : ''}`} onClick={() => toggleSetItem(selectedToppings, topping, setSelectedToppings)}>
                  <div className={`checkbox-box ${selectedToppings.has(topping) ? 'checked' : ''}`}></div>
                  <span>{topping}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selectedItem.category === 'Platters') {
      return (
        <div className="drawer-content platter-builder fade-in">
          <div className="custom-section flex-between">
            <h4>Quantity</h4>
            <div className="stepper glass-panel">
              <button onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}><Minus size={16}/></button>
              <span>{itemQuantity}</span>
              <button onClick={() => setItemQuantity(itemQuantity + 1)}><Plus size={16}/></button>
            </div>
          </div>

          <div className="custom-section">
            <h4>Platter Combo</h4>
            <div className="options-grid">
              <button className={`option-btn ${platterCombo === 'Twin Sparks' ? 'active' : ''}`} onClick={() => setPlatterCombo('Twin Sparks')}>Twin Sparks</button>
              <button className={`option-btn ${platterCombo === 'Campfire Trio' ? 'active' : ''}`} onClick={() => setPlatterCombo('Campfire Trio')}>Campfire Trio</button>
              <button className={`option-btn ${platterCombo === 'Blazing Feast' ? 'active' : ''}`} onClick={() => setPlatterCombo('Blazing Feast')}>Blazing Feast</button>
              <button className={`option-btn ${platterCombo === 'Ala Carte' ? 'active' : ''}`} onClick={() => setPlatterCombo('Ala Carte')}>Ala Carte</button>
            </div>
          </div>

          <div className="custom-section">
            <h4>Select Items</h4>
            <p className="text-muted" style={{fontSize: '0.75rem', marginBottom: '10px'}}>Twin Sparks (1 Std + 1 Prem), Campfire Trio (Up to 1 Prem), Blazing Feast (Up to 2 Prem).</p>
            
            <h5 className="font-playfair text-primary" style={{marginBottom: '8px'}}>Standard Items</h5>
            <div className="toppings-grid">
              {platterStandardItems.map(item => (
                <button key={item} className={`topping-checkbox ${selectedToppings.has(item) ? 'checked' : ''}`} onClick={() => toggleSetItem(selectedToppings, item, setSelectedToppings)}>
                  <div className={`checkbox-box ${selectedToppings.has(item) ? 'checked' : ''}`}></div>
                  <span>{item}</span>
                </button>
              ))}
            </div>

            <h5 className="font-playfair text-primary" style={{marginTop: '15px', marginBottom: '8px'}}>Premium Items</h5>
            <div className="toppings-grid">
              {platterPremiumItems.map(item => (
                <button key={item} className={`topping-checkbox ${selectedToppings.has(item) ? 'checked' : ''}`} onClick={() => toggleSetItem(selectedToppings, item, setSelectedToppings)}>
                  <div className={`checkbox-box ${selectedToppings.has(item) ? 'checked' : ''}`}></div>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="custom-section">
            <h4>Sauces</h4>
            <div className="toppings-grid">
              {platterSauces.map(sauce => (
                <button key={sauce} className={`topping-checkbox ${selectedSauces.has(sauce) ? 'checked' : ''}`} onClick={() => toggleSetItem(selectedSauces, sauce, setSelectedSauces)}>
                  <div className={`checkbox-box ${selectedSauces.has(sauce) ? 'checked' : ''}`}></div>
                  <span>{sauce} {sauce !== 'Tomato & Chilli' && '(+RM1.50)'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selectedItem.category === 'Bites') {
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
          <div className="custom-section">
            <h4>Add-Ons</h4>
            <div className="toppings-grid">
              {bitesAddonsList.map(addon => (
                <button key={addon.name} className={`topping-checkbox ${bitesAddons.has(addon.name) ? 'checked' : ''}`} onClick={() => toggleSetItem(bitesAddons, addon.name, setBitesAddons)}>
                  <div className={`checkbox-box ${bitesAddons.has(addon.name) ? 'checked' : ''}`}></div>
                  <span>{addon.name} (+RM{addon.price.toFixed(2)})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selectedItem.category === 'Drinks') {
      return (
        <div className="drawer-content drinks-drawer fade-in">
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

          {!selectedItem.isFloat && selectedItem.hasVariants && (
            <div className="custom-section">
              <h4>Type</h4>
              <div className="options-grid">
                {selectedItem.hotPrice && (
                  <button className={`option-btn ${drinkVariant === 'Hot' ? 'active' : ''}`} onClick={() => setDrinkVariant('Hot')}>Hot</button>
                )}
                {selectedItem.coldPrice && (
                  <button className={`option-btn ${drinkVariant === 'Cold' ? 'active' : ''}`} onClick={() => setDrinkVariant('Cold')}>Cold</button>
                )}
              </div>
            </div>
          )}

          {selectedItem.isFloat && (
            <div className="custom-section">
              <h4>Ice Cream Flavor</h4>
              <div className="options-grid">
                <button className={`option-btn ${floatVariant === 'Vanilla' ? 'active' : ''}`} onClick={() => setFloatVariant('Vanilla')}>Vanilla</button>
                <button className={`option-btn ${floatVariant === 'Chocolate' ? 'active' : ''}`} onClick={() => setFloatVariant('Chocolate')}>Chocolate</button>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      // Icy Bowls
      return (
        <div className="drawer-content icy-drawer fade-in">
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
              onClick={() => {
                setSelectedItem(item);
                if (item.category === 'Drinks' && item.hasVariants) {
                  setDrinkVariant(item.coldPrice ? 'Cold' : 'Hot');
                }
              }}
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
                <span className="item-price font-playfair">
                  {item.category === 'Drinks' && item.hasVariants 
                    ? `RM ${(item.hotPrice || item.coldPrice).toFixed(2)}` 
                    : `RM ${item.price.toFixed(2)}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {createPortal(
        <>
          <div className={`modal-backdrop ${selectedItem ? 'open' : ''}`} onClick={closeDrawer}></div>
          <div className={`customization-drawer glass-panel ${selectedItem ? 'open' : ''}`}>
            {selectedItem && (
              <ModalErrorBoundary onReset={closeDrawer}>
                <div className="drawer-header">
                  <h2 className="font-playfair">{selectedItem.name || 'Item Details'}</h2>
                  <button className="close-btn" onClick={closeDrawer}>
                    <X size={24} />
                  </button>
                </div>
                
                {renderDrawerContent()}

                <div className="drawer-footer">
                  <button className="btn-primary full-width" onClick={handleAddToCart}>
                    Add to Cart - RM {getSafePrice().toFixed(2)}
                  </button>
                </div>
              </ModalErrorBoundary>
            )}
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default MenuScreen;
