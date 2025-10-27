import { useState, useEffect } from 'react';
import { SkeletonLeaderboard } from './SkeletonLoader';
import { FadeIn, ScaleIn } from './AnimationWrappers';

const ResultsPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Mock leaderboard data
      setLeaderboard([
        { rank: 1, team: 'Team Beta', score: 95, project: 'Blockchain Game', category: 'Web3', members: 4 },
        { rank: 2, team: 'Team Alpha', score: 88, project: 'AI Chatbot', category: 'AI/ML', members: 3 },
        { rank: 3, team: 'Team Gamma', score: 82, project: 'Web App', category: 'Open Innovation', members: 5 },
        { rank: 4, team: 'Team Delta', score: 78, project: 'VR Game', category: 'Gaming', members: 3 },
        { rank: 5, team: 'Team Epsilon', score: 75, project: 'DeFi Platform', category: 'Web3', members: 4 }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredLeaderboard = selectedCategory === 'all' 
    ? leaderboard 
    : leaderboard.filter(entry => entry.category === selectedCategory);

  const categories = ['all', 'AI/ML', 'Gaming', 'Web3', 'Open Innovation'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Enhanced Celebration Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Celebration Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 via-cyan-400/10 to-purple-400/10 animate-gradient-shift"></div>
        
        {/* Moving Gradient Orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[450px] h-[450px] bg-gold-400/20 rounded-full blur-[110px] animate-float" 
               style={{ top: '5%', left: '50%', animationDuration: '25s' }}></div>
          <div className="absolute w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-[100px] animate-float" 
               style={{ bottom: '10%', left: '20%', animationDuration: '28s', animationDelay: '5s' }}></div>
          <div className="absolute w-[380px] h-[380px] bg-purple-400/15 rounded-full blur-[95px] animate-float" 
               style={{ top: '40%', right: '15%', animationDuration: '30s', animationDelay: '8s' }}></div>
        </div>
      </div>
      
      {/* Animated Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-5%',
              backgroundColor: ['#FFD700', '#00FFFF', '#800080', '#FF1493'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <div className="text-6xl mb-4 animate-bounce">🏆</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gold-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              HackaVerse Results
            </h1>
            <p className="text-xl mb-8 text-gray-300">Congratulations to all participants!</p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white scale-105 shadow-[0_0_20px_rgba(0,255,255,0.4)]'
                      : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  {category === 'all' ? '🌍 All' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          {isLoading ? (
            <FadeIn duration={500}>
              <SkeletonLeaderboard />
            </FadeIn>
          ) : (
            <div className="space-y-4">
              {filteredLeaderboard.map((entry, index) => (
                <ScaleIn key={entry.rank} delay={index * 50} duration={500}>
                  <div
                    className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-500 hover:scale-105 cursor-pointer group hover-lift ${
                    entry.rank === 1 ? 'border-2 border-gold-400 shadow-[0_0_30px_rgba(255,215,0,0.3)]' :
                    entry.rank === 2 ? 'border-2 border-gray-400 shadow-[0_0_20px_rgba(192,192,192,0.2)]' :
                    entry.rank === 3 ? 'border-2 border-orange-400 shadow-[0_0_20px_rgba(255,165,0,0.2)]' :
                    'border border-white/20 hover:border-cyan-400/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                    {/* Rank Badge */}
                    <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-2xl md:text-3xl transform group-hover:scale-110 transition-transform duration-300 ${
                      entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]' :
                      entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black shadow-[0_0_15px_rgba(192,192,192,0.5)]' :
                      entry.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-black shadow-[0_0_15px_rgba(255,165,0,0.5)]' :
                      'bg-gradient-to-br from-cyan-500 to-purple-500 text-white'
                    }`}>
                      {entry.rank === 1 && <span className="absolute -top-2 -right-2 text-4xl animate-bounce">🌟</span>}
                      #{entry.rank}
                    </div>
                    
                    {/* Team Info */}
                    <div className="text-left">
                      <h3 className="text-xl md:text-2xl font-semibold group-hover:text-cyan-400 transition-colors duration-300">{entry.team}</h3>
                      <p className="text-gray-300 text-sm md:text-base">{entry.project}</p>
                      <div className="flex gap-2 mt-1 text-xs">
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">{entry.category}</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">{entry.members} members</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Score */}
                  <div className="mt-4 md:mt-0 text-center md:text-right">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {entry.score}
                    </div>
                    <div className="text-sm text-gray-400">points</div>
                  </div>
                </div>
                </ScaleIn>
              ))}
            </div>
          )}
          {filteredLeaderboard.length === 0 && (
            <div className="text-center py-12 animate-fadeIn">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-400">No teams found in this category</p>
            </div>
          )}
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-8 text-center">
        <a href="/" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
          <i className="uil uil-arrow-left"></i>
          <span>Back to Home</span>
        </a>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;