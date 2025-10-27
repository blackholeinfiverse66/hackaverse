import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from './Toast';
import { SkeletonCard } from './SkeletonLoader';

const AdminPanel = () => {
  const toast = useToast();
  const [registrations, setRegistrations] = useState([]);
  const [judges, setJudges] = useState([]);
  const [newJudge, setNewJudge] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Mock data
      setRegistrations([
        { id: 1, teamName: 'Team Alpha', category: 'AI/ML', members: 3, status: 'confirmed', submittedAt: '2025-10-15' },
        { id: 2, teamName: 'Team Beta', category: 'Web3', members: 4, status: 'pending', submittedAt: '2025-10-16' },
        { id: 3, teamName: 'Team Gamma', category: 'Gaming', members: 2, status: 'confirmed', submittedAt: '2025-10-17' }
      ]);
      setJudges([
        { id: 1, name: 'Judge 1', email: 'judge1@example.com', specialization: 'AI/ML' },
        { id: 2, name: 'Judge 2', email: 'judge2@example.com', specialization: 'Web3' }
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  const addJudge = async () => {
    if (!newJudge.name || !newJudge.email) {
      toast.error('Please fill in all fields');
      return;
    }
    // Mock add judge
    setJudges([...judges, { id: Date.now(), ...newJudge, specialization: 'General' }]);
    setNewJudge({ name: '', email: '' });
    toast.success('Judge added successfully!');
  };

  const removeJudge = (judgeId) => {
    setJudges(judges.filter(j => j.id !== judgeId));
    toast.success('Judge removed successfully!');
  };

  const sendReminder = async (teamId) => {
    // Mock send reminder via N8N
    toast.success('Reminder sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-20 px-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving Gradient Orbs */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute w-[400px] h-[400px] bg-purple-primary/30 rounded-full blur-[100px] animate-float" 
               style={{ top: '10%', left: '20%', animationDuration: '22s' }}></div>
          <div className="absolute w-[350px] h-[350px] bg-magenta-primary/25 rounded-full blur-[90px] animate-float" 
               style={{ bottom: '15%', right: '20%', animationDuration: '26s', animationDelay: '4s' }}></div>
        </div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => {
          const colors = ['bg-purple-400/30', 'bg-pink-400/30', 'bg-cyan-400/30'];
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Panel</h1>
          <p className="text-gray-400">Manage judges, teams, and monitor hackathon progress</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Manage Judges */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">👨‍⚖️</span>
                Manage Judges
              </h2>
              <div className="mb-6 space-y-3">
                <input
                  type="text"
                  placeholder="Judge Name"
                  value={newJudge.name}
                  onChange={(e) => setNewJudge({ ...newJudge, name: e.target.value })}
                  className="w-full p-3 bg-white/20 rounded-lg text-white placeholder-gray-300 border-2 border-transparent focus:border-cyan-400 transition-all duration-300 outline-none"
                />
                <input
                  type="email"
                  placeholder="Judge Email"
                  value={newJudge.email}
                  onChange={(e) => setNewJudge({ ...newJudge, email: e.target.value })}
                  className="w-full p-3 bg-white/20 rounded-lg text-white placeholder-gray-300 border-2 border-transparent focus:border-purple-400 transition-all duration-300 outline-none"
                />
                <button
                  onClick={addJudge}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] flex items-center justify-center gap-2"
                >
                  <span className="text-xl">+</span>
                  Add Judge
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
                {judges.map((judge, index) => (
                  <div 
                    key={judge.id} 
                    className="flex justify-between items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div>
                      <div className="font-semibold group-hover:text-cyan-400 transition-colors duration-300">{judge.name}</div>
                      <div className="text-sm text-gray-400">{judge.email}</div>
                      <div className="text-xs text-purple-400 mt-1">{judge.specialization}</div>
                    </div>
                    <button
                      onClick={() => removeJudge(judge.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-all duration-300 hover:scale-110 text-red-300"
                      title="Remove judge"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitor Registrations */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">📊</span>
                Team Registrations
              </h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
                {registrations.map((reg, index) => (
                  <div 
                    key={reg.id} 
                    className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300 group border-l-4 border-transparent hover:border-cyan-400"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">{reg.teamName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reg.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/50' 
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
                      }`}>
                        {reg.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-300 flex items-center gap-2">
                        <span className="text-cyan-400">🎯</span>
                        Category: <span className="text-white">{reg.category}</span>
                      </p>
                      <p className="text-gray-300 flex items-center gap-2">
                        <span className="text-purple-400">👥</span>
                        Members: <span className="text-white">{reg.members}</span>
                      </p>
                      <p className="text-gray-300 flex items-center gap-2">
                        <span className="text-pink-400">📅</span>
                        Submitted: <span className="text-white">{reg.submittedAt}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => sendReminder(reg.id)}
                      className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(128,0,128,0.4)] flex items-center justify-center gap-2"
                    >
                      <span>🔔</span>
                      Send Reminder
                    </button>
                  </div>
                ))}
              </div>
            </div>
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

export default AdminPanel;