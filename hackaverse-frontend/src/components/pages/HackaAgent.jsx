import React, { useState, useEffect } from 'react';

const HackaAgent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedContext, setSelectedContext] = useState('general');

  const quickSuggestions = [
    { id: 1, text: 'Score my project', icon: 'uil-trophy' },
    { id: 2, text: 'Suggest features', icon: 'uil-lightbulb-alt' },
    { id: 3, text: 'Fix README', icon: 'uil-file-edit-alt' },
    { id: 4, text: 'Review code', icon: 'uil-code-branch' },
    { id: 5, text: 'Find teammates', icon: 'uil-users-alt' },
    { id: 6, text: 'Tech stack advice', icon: 'uil-layer-group' }
  ];

  const contextOptions = [
    { id: 'general', name: 'General Help', icon: 'uil-comment-alt-question' },
    { id: 'project1', name: 'AI Campus Navigator', icon: 'uil-rocket' },
    { id: 'project2', name: 'Blockchain Voting', icon: 'uil-rocket' },
    { id: 'team', name: 'Team Alpha', icon: 'uil-users-alt' }
  ];

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm HackaAgent, your AI assistant for the hackathon. I can help you with project ideas, code reviews, team formation, and more. How can I assist you today?",
        sender: 'agent',
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = {
      'score my project': "I'd be happy to help score your project! Based on the AI Campus Navigator, here's my assessment:\n\n🏆 **Innovation**: 9/10 - Great use of computer vision\n🔧 **Technical**: 8/10 - Solid implementation\n🎯 **Impact**: 9/10 - Solves real campus problems\n📊 **Presentation**: 7/10 - Could use better demo\n\n**Overall**: 82/100 - Excellent work! Consider adding real-time navigation updates.",
      
      'suggest features': "Here are some feature suggestions for your AI Campus Navigator:\n\n✨ **Core Features**:\n• Voice-guided navigation\n• Accessibility mode for visually impaired\n• Real-time crowd density mapping\n• Integration with campus events\n\n🚀 **Advanced Features**:\n• AR overlay for directions\n• Social features (find friends)\n• Emergency evacuation routes\n• Multi-language support",
      
      'fix readme': "I can help improve your README! Here's a better structure:\n\n📋 **Suggested README Template**:\n```markdown\n# AI Campus Navigator\n\n## 🎯 Problem Statement\n[Describe the navigation challenges]\n\n## 💡 Solution\n[Your AI-powered approach]\n\n## 🛠️ Tech Stack\n[List technologies used]\n\n## 🚀 Getting Started\n[Installation & setup steps]\n\n## 📱 Features\n[Key functionality]\n\n## 🏆 Demo\n[Screenshots/video]\n```",
      
      'default': "That's an interesting question! I can help you with various aspects of your hackathon project. Would you like me to:\n\n• Review your code or architecture\n• Suggest improvements or new features\n• Help with presentation strategies\n• Provide technical guidance\n• Assist with team coordination\n\nWhat specific area would you like to focus on?"
    };

    const responseText = responses[messageText.toLowerCase()] || responses['default'];

    const agentMessage = {
      id: Date.now() + 1,
      text: responseText,
      sender: 'agent',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, agentMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 xl:px-8 py-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7C4DFF] via-[#6CCAFF] to-[#34D399] bg-clip-text text-transparent">
          HackaAgent
        </h1>
        <p className="text-white/70 mt-2">Your AI assistant for hackathon success</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Window */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#6CCAFF] flex items-center justify-center mr-3">
                  <i className="uil uil-robot text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold">HackaAgent</h3>
                  <div className="flex items-center text-sm text-white/60">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full mr-2 animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#7C4DFF] to-[#6CCAFF] text-white rounded-br-sm'
                        : 'bg-white/[0.05] border border-white/10 text-white rounded-bl-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.text}</div>
                    <div className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-white/50'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.05] border border-white/10 p-4 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your hackathon project..."
                    className="w-full h-12 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/40 focus:border-[#6CCAFF] focus:ring-2 focus:ring-[#6CCAFF]/40 transition-all resize-none"
                    rows="1"
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#6CCAFF] text-white hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  <i className="uil uil-message"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div className="space-y-6">
          {/* Quick Suggestions */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <i className="uil uil-lightbulb-alt text-[#6CCAFF] mr-2"></i>
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {quickSuggestions.map(suggestion => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSendMessage(suggestion.text)}
                  className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <div className="flex items-center">
                    <i className={`${suggestion.icon} text-[#6CCAFF] mr-3 group-hover:text-white transition-colors`}></i>
                    <span className="text-sm">{suggestion.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Context Selection */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <i className="uil uil-layer-group text-[#6CCAFF] mr-2"></i>
              Context
            </h3>
            <div className="space-y-2">
              {contextOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedContext(option.id)}
                  className={`w-full p-3 rounded-xl transition-all text-left ${
                    selectedContext === option.id
                      ? 'bg-[#6CCAFF]/20 border border-[#6CCAFF]/30 text-[#6CCAFF]'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`${option.icon} mr-3`}></i>
                    <span className="text-sm">{option.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <i className="uil uil-info-circle text-[#6CCAFF] mr-2"></i>
              Tips
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start">
                <i className="uil uil-check-circle text-[#22C55E] mr-2 mt-0.5 flex-shrink-0"></i>
                <span>Be specific about your project details</span>
              </div>
              <div className="flex items-start">
                <i className="uil uil-check-circle text-[#22C55E] mr-2 mt-0.5 flex-shrink-0"></i>
                <span>Ask for code reviews and improvements</span>
              </div>
              <div className="flex items-start">
                <i className="uil uil-check-circle text-[#22C55E] mr-2 mt-0.5 flex-shrink-0"></i>
                <span>Get help with presentation strategies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackaAgent;