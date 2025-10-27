import { useState } from 'react';
import { Link } from 'react-router-dom';

const TopBar = ({ isCollapsed = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  const notifications = [
    { id: 1, text: 'Team Beta overtook you in the leaderboard!', time: '2 min ago', type: 'warning' },
    { id: 2, text: 'New Web3 hackathon starting November 15th', time: '1 hour ago', type: 'info' },
    { id: 3, text: 'Your project submission was successful!', time: '3 hours ago', type: 'success' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <header className={`fixed top-0 right-0 h-16 bg-deep-navy/95 backdrop-blur-xl border-b border-white/10 z-30 flex items-center px-6 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'left-20' : 'left-64'
    }`}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
        <div className="relative">
          <i className="uil uil-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, teams, or categories..."
            className="w-full pl-12 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
          />
        </div>
      </form>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
          >
            <i className="uil uil-bell text-xl text-gray-400 group-hover:text-white"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pulse-notify"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-gray-900/95 backdrop-blur-xl rounded-lg border border-white/10 shadow-2xl animate-slideIn">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 $[
                        notif.type === 'warning' ? 'bg-yellow-400' :
                        notif.type === 'info' ? 'bg-cyan-400' :
                        'bg-green-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-white mb-1">{notif.text}</p>
                        <p className="text-xs text-gray-500">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-white/10 text-center">
                <button className="text-sm text-cyan-400 hover:text-cyan-300">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile / Login */}
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-white">John Doe</p>
              <p className="text-xs text-gray-400">Team Alpha</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white hover:scale-110 transition-transform duration-300">
              JD
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/register"
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
