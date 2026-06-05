import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import './ChatBubble.css';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Welcome back! How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Today's Special",
    "Recommend a Game",
    "Check Reservations"
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I can certainly help with that!";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('special')) {
        botResponse = "Today's special is the Matcha Affogato—a creamy vanilla bean ice cream drowned in premium ceremonial grade Uji matcha! Only RM 18.00.";
      } else if (lowerText.includes('game') || lowerText.includes('recommend')) {
        botResponse = "If you're with a group, the Billiards table in the back lounge is perfect! For a quiet date, I highly recommend our premium Chess boards.";
      } else if (lowerText.includes('reservation')) {
        botResponse = "You can view your active reservations on the Home screen or under the Profile tab! Need help booking a new one?";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <div className={`chat-backdrop ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`chat-bubble-container ${isOpen ? 'open' : ''}`}>
        {/* The floating button */}
      <button 
        className={`chat-toggle-btn ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={24} />
      </button>

      {/* The chat interface */}
      <div className={`chat-interface glass-panel ${isOpen ? 'active' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <div className="bot-avatar">
              <MessageSquare size={16} className="text-primary" />
            </div>
            <span className="font-playfair">HideOut Assistant</span>
          </div>
          <button className="chat-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
              <p>{msg.text}</p>
              {msg.sender === 'bot' && idx === 0 && <span className="msg-time">Just now</span>}
            </div>
          ))}
          {isTyping && (
            <div className="message bot-message typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
          
          {messages.length === 1 && !isTyping && (
            <div className="quick-replies">
              {quickReplies.map((reply, idx) => (
                <button 
                  key={idx} 
                  className="quick-reply-btn"
                  onClick={() => handleSend(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(message)}
          />
          <button className="send-btn" disabled={!message.trim()} onClick={() => handleSend(message)}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
