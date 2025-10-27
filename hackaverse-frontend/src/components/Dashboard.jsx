import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from './Toast';
import { SkeletonDashboard, SkeletonLeaderboard } from './SkeletonLoader';

const Dashboard = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('teams');
  const [projects, setProjects] = useState([]);
  const [scores, setScores] = useState([]);
  const [mentorMessages, setMentorMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Mock data - replace with API calls
      setProjects([
        { id: 1, name: 'AI Chatbot', category: 'AI/ML', submissionLink: 'https://example.com', team: 'Team Alpha', status: 'submitted' },
        { id: 2, name: 'Blockchain Game', category: 'Web3', submissionLink: 'https://example.com', team: 'Team Beta', status: 'in-progress' },
        { id: 3, name: 'VR Experience', category: 'Gaming', submissionLink: 'https://example.com', team: 'Team Gamma', status: 'submitted' }
      ]);
      setScores([
        { team: 'Team Alpha', score: 85, rank: 2, trend: 'up' },
        { team: 'Team Beta', score: 92, rank: 1, trend: 'up' },
        { team: 'Team Gamma', score: 78, rank: 3, trend: 'down' }
      ]);
      setMentorMessages([
        { id: 1, text: 'Welcome to HackaVerse! How can I help you today?', sender: 'AI Mentor', timestamp: new Date().toISOString() }
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsSending(true);
    const userMsg = { id: Date.now(), text: newMessage, sender: 'You', timestamp: new Date().toISOString() };
    setMentorMessages([...mentorMessages, userMsg]);
    setNewMessage('');
    
    // Simulate AI response delay
    setTimeout(async () => {
      try {
        // Mock API call to /agent
        const mockResponses = [
          "That's a great question! Let me help you with that...",
          "I'd recommend checking out the documentation for more details.",
          "Have you considered using React hooks for state management?",
          "Great progress! Keep up the good work!"
        ];
        const response = { 
          data: { 
            reply: mockResponses[Math.floor(Math.random() * mockResponses.length)] 
          } 
        };
        
        setMentorMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          text: response.data.reply, 
          sender: 'AI Mentor',
          timestamp: new Date().toISOString()
        }]);
        toast.success('Message sent successfully!');
      } catch (error) {
        toast.error('Failed to send message. Please try again.');
      } finally {
        setIsSending(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-20 px-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving Gradient Orbs */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute w-[350px] h-[350px] bg-cyan-accent/30 rounded-full blur-[90px] animate-float" 
               style={{ top: '15%', right: '15%', animationDuration: '20s' }}></div>
          <div className="absolute w-[300px] h-[300px] bg-purple-primary/25 rounded-full blur-[80px] animate-float" 
               style={{ bottom: '15%', left: '15%', animationDuration: '25s', animationDelay: '5s' }}></div>
        </div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const colors = ['bg-cyan-400/25', 'bg-purple-400/25'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className={`absolute w-2 h-2 ${color} rounded-full animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          );
        })}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">HackaVerse Dashboard</h1>
          <p className="text-gray-400">Monitor your team's progress and get AI assistance</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {[
            { id: 'teams', label: 'Teams & Projects', icon: '👥' },
            { id: 'judging', label: 'Judging & Scores', icon: '🏆' },
            { id: 'mentor', label: 'AI Mentor Feed', icon: '🤖' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 mx-1 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white scale-105 shadow-[0_0_20px_rgba(0,255,255,0.4)]' 
                  : 'bg-white/10 hover:bg-white/20 hover:scale-105'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <div className="animate-fadeIn">
            {activeTab === 'teams' && <SkeletonDashboard />}
            {activeTab === 'judging' && <SkeletonLeaderboard />}
            {activeTab === 'mentor' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="h-96 bg-black/20 rounded-lg animate-pulse"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fadeIn">
            {activeTab === 'teams' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors duration-300">{project.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        project.status === 'submitted' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2 flex items-center gap-2">
                      <span className="text-cyan-400">🎯</span>
                      Category: {project.category}
                    </p>
                    <p className="text-gray-300 mb-4 flex items-center gap-2">
                      <span className="text-purple-400">👥</span>
                      Team: {project.team}
                    </p>
                    <a 
                      href={project.submissionLink} 
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group-hover:gap-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Submission</span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'judging' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-3xl">🏆</span>
                  Live Judge Scores
                </h2>
                <div className="space-y-4">
                  {scores.map((score, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          score.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' :
                          score.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-black' :
                          'bg-gradient-to-r from-orange-400 to-orange-600 text-black'
                        }`}>
                          #{score.rank}
                        </div>
                        <span className="text-lg font-semibold group-hover:text-cyan-400 transition-colors duration-300">{score.team}</span>
                        {score.trend === 'up' ? (
                          <span className="text-green-400 text-xl animate-bounce">↑</span>
                        ) : (
                          <span className="text-red-400 text-xl">↓</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {score.score}
                          </div>
                          <div className="text-xs text-gray-400">points</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'mentor' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-3xl">🤖</span>
                  AI Mentor Chat
                </h2>
                <div className="h-96 overflow-y-auto mb-4 space-y-3 p-4 bg-black/20 rounded-lg scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
                  {mentorMessages.map((msg, index) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'} animate-slideIn`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`max-w-[80%] p-4 rounded-lg ${
                        msg.sender === 'You' 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_15px_rgba(0,255,255,0.3)]' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(128,0,128,0.3)]'
                      } transform hover:scale-105 transition-transform duration-200`}>
                        <div className="font-bold text-sm mb-1 opacity-90">{msg.sender}</div>
                        <div>{msg.text}</div>
                      </div>
                    </div>
                  ))}
                  {isSending && (
                    <div className="flex justify-start animate-slideIn">
                      <div className="bg-purple-500/50 p-4 rounded-lg">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-white rounded-full typing-dot"></div>
                          <div className="w-2 h-2 bg-white rounded-full typing-dot"></div>
                          <div className="w-2 h-2 bg-white rounded-full typing-dot"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isSending && sendMessage()}
                    disabled={isSending}
                    className="flex-1 p-3 bg-white/20 rounded-lg text-white placeholder-gray-300 border-2 border-transparent focus:border-cyan-400 transition-all duration-300 outline-none disabled:opacity-50"
                    placeholder="Ask the AI mentor..."
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isSending || !newMessage.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                  >
                    {isSending ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>🚀</span>
                    )}
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Back to Home */}
      <div className="mt-8 text-center">
        <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
          <i className="uil uil-arrow-left"></i>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;