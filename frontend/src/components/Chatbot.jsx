import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Initialize chat when component mounts or chat opens
  useEffect(() => {
    if (isChatOpen && chat.length === 0) {
      handleBotResponse("👋 Hi! I'm your MediBridge assistant. How can I help you today?", [
        'Donations', 'Volunteer', 'Hospitals', 'Other'
      ]);
    }
  }, [isChatOpen, chat.length]);

  const handleBotResponse = (text, options = []) => {
    setChat(prev => [...prev, { 
      sender: 'bot', 
      text: text,
      options: options 
    }]);
  };

  const handleUserClick = async (message) => {
    // Add user message to chat
    setChat(prev => [...prev, { sender: 'user', text: message }]);

    try {
      const response = await axios.post('http://localhost:8080/api/chat/reply', { 
        message: message.toLowerCase() 
      });
      
      // Extract the last bot message to determine options
      const lastBotMessage = response.data;
      let options = [];
      
      if (lastBotMessage.includes('Donations') && lastBotMessage.includes('Volunteer')) {
        options = ['Donations', 'Volunteer', 'Hospitals', 'Other'];
      } else if (lastBotMessage.includes('Blood') && lastBotMessage.includes('Organs')) {
        options = ['Blood', 'Organs', 'Goods', 'Money'];
      } else if (lastBotMessage.includes('questions?')) {
        options = ['Yes', 'No'];
      }
      
      handleBotResponse(lastBotMessage, options);
    } catch (error) {
      console.error('Error:', error);
      handleBotResponse('⚠️ Something went wrong. Please try again.', ['Retry']);
    }
  };

  return (
    <div className={`chatbot-container ${isChatOpen ? 'open' : ''}`}>
      <button className="chatbot-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
        💬
      </button>

      {isChatOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>MediBridge Assistant</h3>
          </div>
          <div className="chatbot-messages">
            {chat.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
                {msg.options && msg.options.length > 0 && (
                  <div className="chatbot-options">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        className="chatbot-option"
                        onClick={() => handleUserClick(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;