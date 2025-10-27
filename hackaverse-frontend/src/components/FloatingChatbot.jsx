import { useState, useRef, useEffect } from 'react';
import { useToast } from './Toast';

const FloatingChatbot = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true); // Auto-open when triggered from sidebar
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm HackaAgent 🤖 How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "When is the next hackathon?",
    "Find me a team",
    "What are winning projects?",
    "How does judging work?"
  ];

  const generateBotResponse = (userMessage) => {
    const responses = {
      hackathon: "Our next Web3 hackathon starts on November 15th, 2025! Registration is open now.",
      team: "Check out the Team Finder section below! We have 15 teams actively looking for members.",
      projects: "Last month's winners were: Neural Canvas (AI/ML), BlockChain RPG (Web3), and EcoTrack AI (Open Innovation). Check the Featured Projects section!",
      judging: "Projects are judged on innovation (30%), technical execution (30%), design (20%), and presentation (20%). Our AI assists with preliminary scoring!",
      default: "That's a great question! Our team will get back to you soon. Meanwhile, check out our dashboard for more info!"
    };

    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes('hackathon') || lowerMsg.includes('next') || lowerMsg.includes('when')) {
      return responses.hackathon;
    } else if (lowerMsg.includes('team') || lowerMsg.includes('member')) {
      return responses.team;
    } else if (lowerMsg.includes('project') || lowerMsg.includes('winner') || lowerMsg.includes('winning')) {
      return responses.projects;
    } else if (lowerMsg.includes('judg') || lowerMsg.includes('score')) {
      return responses.judging;
    }
    return responses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group chat-bubble-in"
          aria-label="Open AI Chatbot"
        >
          <i className="uil uil-robot text-3xl text-white group-hover:scale-110 transition-transform"></i>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white pulse-notify"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-purple-500/30 flex flex-col chat-bubble-in overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className="uil uil-robot text-2xl text-white"></i>
              </div>
              <div>
                <h3 className="font-bold text-white">HackaAgent</h3>
                <p className="text-xs text-white/80">AI-Powered Assistant</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                if (onClose) onClose();
              }}
              className="text-white/80 hover:text-white transition-colors text-2xl"
            >
              <i className="uil uil-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-500/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors border border-white/20"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-white/20 focus:border-purple-400 outline-none transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="uil uil-message text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
