import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../../services/api';

const HackaAgent = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: '👋 Hello! I\'m HackaAgent, your AI assistant for the Hackaverse platform. I can help you with:\n\n• **Coding questions** and debugging\n• **Project ideas** and planning\n• **Hackathon strategies**\n• **Technical guidance**\n• **Best practices**\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Call the backend API for AI response
      const response = await apiService.agent.sendMessage({
        message: inputMessage
      });

      const aiMessage = {
        type: 'ai',
        content: response.data.response || 'I\'m sorry, I couldn\'t process your request right now. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'ai',
        content: 'Sorry, I encountered an error. Please check your connection and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickSuggestions = [
    "How do I start a React project?",
    "Best practices for API design",
    "Ideas for hackathon projects",
    "How to debug JavaScript errors",
    "Database design tips",
    "Deployment strategies"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1128] to-[#15193B]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#BF40BF] to-[#00F2EA] rounded-2xl flex items-center justify-center shadow-lg">
              <i className="uil uil-robot text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">HackaAgent</h1>
              <p className="text-white/70">Your AI assistant for hackathon success</p>
            </div>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="glass-card rounded-2xl border border-white/20 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6 bg-white/5">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'ai' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-[#BF40BF] to-[#00F2EA] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="uil uil-robot text-white text-sm"></i>
                  </div>
                )}

                <div className={`max-w-[70%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-[#00F2EA] to-[#BF40BF] text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                  <div className={`text-xs text-white/50 mt-2 flex items-center gap-2 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.type === 'user' && (
                      <i className="uil uil-check-circle text-green-400 text-xs"></i>
                    )}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00F2EA] to-[#BF40BF] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="uil uil-user text-white text-sm"></i>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 bg-gradient-to-r from-[#BF40BF] to-[#00F2EA] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <i className="uil uil-robot text-white text-sm"></i>
                </div>
                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-white/70 text-sm">HackaAgent is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed Layout */}
          <div className="border-t border-white/10 p-6 bg-white/5">
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about coding, projects, or hackathons..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-[#00F2EA] focus:border-transparent min-h-[44px] max-h-32"
                  rows={1}
                  disabled={isLoading}
                  style={{ minHeight: '44px', maxHeight: '128px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#BF40BF] to-[#00F2EA] hover:from-[#C030D8] hover:to-[#00E0D0] text-white font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00F2EA] focus:ring-offset-2 focus:ring-offset-[#0D1128] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ height: '44px' }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="uil uil-message mr-2"></i>
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-xs text-white/50 mt-2 flex justify-between items-center">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span className="text-xs">
                <i className="uil uil-lock mr-1"></i>
                End-to-end encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Quick Suggestions - Fixed Layout */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <i className="uil uil-lightbulb"></i>
            Quick Suggestions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="glass-card rounded-xl border border-white/20 p-4 hover:border-cyan-400/30 transition-all duration-200 text-left group"
              >
                <div className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">
                  {suggestion}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackaAgent;
