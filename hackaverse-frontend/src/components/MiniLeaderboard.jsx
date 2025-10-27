import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MiniLeaderboard = () => {
  const [topTeams, setTopTeams] = useState([
    { rank: 1, team: 'Team Beta', score: 95, trend: 'up', change: '+3' },
    { rank: 2, team: 'Team Alpha', score: 88, trend: 'down', change: '-1' },
    { rank: 3, team: 'Team Gamma', score: 82, trend: 'up', change: '+2' }
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTopTeams(prev => prev.map(team => ({
        ...team,
        score: team.score + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2)
      })).sort((a, b) => b.score - a.score).map((team, idx) => ({
        ...team,
        rank: idx + 1
      })));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full pulse-notify"></div>
          <h3 className="text-xl font-bold text-white">Live Leaderboard</h3>
        </div>
        <Link
          to="/results"
          className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition-colors"
        >
          View All
          <i className="uil uil-arrow-right"></i>
        </Link>
      </div>

      <div className="space-y-3">
        {topTeams.map((team, index) => (
          <div
            key={team.team}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Rank Badge */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
              team.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' :
              team.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
              'bg-gradient-to-br from-orange-400 to-orange-600 text-black'
            }`}>
              #{team.rank}
            </div>

            {/* Team Info */}
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {team.team}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Score: {team.score}</span>
                <span className={`flex items-center ${
                  team.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <i className={`uil ${team.trend === 'up' ? 'uil-arrow-up' : 'uil-arrow-down'}`}></i>
                  {team.change}
                </span>
              </div>
            </div>

            {/* Trophy for #1 */}
            {team.rank === 1 && (
              <i className="uil uil-trophy text-2xl text-yellow-400 animate-bounce"></i>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Updates every 10 seconds
      </p>
    </div>
  );
};

export default MiniLeaderboard;
