import React, { useState } from 'react';
import '../styles/Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(prev => {
      const newState = !prev;
      if (newState && messages.length === 0) {
        setMessages([{ text: "👋 Hi! I’m MediBot. How can I assist you today?", sender: 'bot' }]);
      }
      return newState;
    });
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, newMessage]);
      setInput('');

      // Simulated bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { text: '🤖 Thanks! We’ll get back to you.', sender: 'bot' }
        ]);
      }, 1000);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
