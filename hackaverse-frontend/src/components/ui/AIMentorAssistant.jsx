import React, { useState } from 'react';

const AIMentorAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hi! I\'m your AI mentor. I can help you with coding questions, project ideas, and hackathon strategies. What would you like to know?'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'That\'s a great question! Let me help you with that. For hackathon projects, I recommend starting with a clear problem statement and building an MVP first.'
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-violet to-cyan flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 group animate-pulse"
        >
          <i className="uil uil-robot text-2xl group-hover:animate-bounce"></i>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-96 glass-card rounded-2xl border z-50 animate-slideIn">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-violet to-cyan rounded-full flex items-center justify-center">
                <i className="uil uil-robot text-white text-sm"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white">HackaVerse AI</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-success">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-white transition-colors"
            >
              <i className="uil uil-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.type === 'user' 
                    ? 'bg-cyan text-charcoal' 
                    : 'bg-white/10 text-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="form-control flex-1 text-sm"
              />
              <button 
                onClick={handleSendMessage}
                className="btn-primary w-11 h-11 flex items-center justify-center"
              >
                <i className="uil uil-message"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIMentorAssistant;