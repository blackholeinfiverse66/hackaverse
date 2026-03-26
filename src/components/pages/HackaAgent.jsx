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

  // Wake up backend on mount
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await fetch('http://127.0.0.1:8000/ping', {
          headers: { 'X-API-Key': '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778' }
        });
      } catch (e) {
        console.log('Backend warming up...');
      }
    };
    wakeUpBackend();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const userInput = inputMessage;
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      console.log('[HackaAgent Frontend] Sending message:', userInput);
      
      const response = await apiService.agent.sendMessage({
        question: userInput
      });

      console.log('[HackaAgent Frontend] Response received:', response);
      console.log('[HackaAgent Frontend] Response data:', response.data);

      const aiMessage = {
        type: 'ai',
        content: response.data?.response || response.data?.result || response.data?.data?.result || 'I\'m sorry, I couldn\'t process your request right now. Please try again.',
        timestamp: new Date()
      };

      console.log('[HackaAgent Frontend] AI message:', aiMessage);
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('[HackaAgent Frontend] Full error:', error);
      console.error('[HackaAgent Frontend] Error response:', error.response?.data);
      console.error('[HackaAgent Frontend] Error status:', error.response?.status);
      console.error('[HackaAgent Frontend] Error message:', error.message);
      
      let errorMsg = 'An error occurred. Please try again.';
      
      if (!error.response) {
        errorMsg = `Network error: ${error.message}. Make sure backend is running at http://127.0.0.1:8000`;
      } else if (error.response?.status === 404) {
        errorMsg = 'API endpoint not found. Backend route may not be registered.';
      } else if (error.response?.status === 401) {
        errorMsg = 'Authentication error. Please check API key.';
      } else if (error.response?.status === 422) {
        const detail = error.response?.data?.detail;
        if (Array.isArray(detail)) {
          errorMsg = `Validation error: ${detail.map(d => d.msg).join(', ')}`;
        } else {
          errorMsg = `Validation error: ${detail || 'Invalid request format'}`;
        }
      } else if (error.response?.data?.detail) {
        errorMsg = error.response.data.detail;
      } else if (error.userMessage) {
        errorMsg = error.userMessage;
      }
      
      console.error('[HackaAgent Frontend] Final error message:', errorMsg);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: errorMsg,
        timestamp: new Date()
      }]);
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
    <div className="relative h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-[#0D1128] to-[#15193B] -mx-8 -mb-8">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/10 bg-[#0D1128]/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#BF40BF] to-[#00F2EA] rounded-lg flex items-center justify-center">
            <i className="uil uil-robot text-white"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">HackaAgent</h1>
            <p className="text-white/50 text-xs">AI Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="absolute top-[73px] bottom-[73px] left-0 right-0 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'ai' && (
              <div className="w-8 h-8 bg-gradient-to-r from-[#BF40BF] to-[#00F2EA] rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="uil uil-robot text-white text-sm"></i>
              </div>
            )}
            <div className={`max-w-[75%] ${message.type === 'user' ? 'order-first' : ''}`}>
              <div className={`p-3 rounded-xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-[#00F2EA] to-[#BF40BF] text-white'
                  : 'bg-white/10 text-white border border-white/20'
              }`}>
                <div className="text-sm whitespace-pre-wrap break-words">{message.content}</div>
              </div>
              <div className={`text-xs text-white/40 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-r from-[#00F2EA] to-[#BF40BF] rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="uil uil-user text-white text-sm"></i>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-r from-[#BF40BF] to-[#00F2EA] rounded-lg flex items-center justify-center animate-pulse">
              <i className="uil uil-robot text-white text-sm"></i>
            </div>
            <div className="bg-white/10 border border-white/20 p-3 rounded-xl min-w-[120px]">
              <div className="flex gap-1.5 items-center">
                <span className="text-white/70 text-sm font-medium">Thinking</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#00F2EA] to-[#BF40BF] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#00F2EA] to-[#BF40BF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#00F2EA] to-[#BF40BF] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4 bg-[#0D1128]/80 backdrop-blur-sm z-10">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask me anything..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-[#00F2EA]"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-gradient-to-r from-[#BF40BF] to-[#00F2EA] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <i className="uil uil-message"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackaAgent;
