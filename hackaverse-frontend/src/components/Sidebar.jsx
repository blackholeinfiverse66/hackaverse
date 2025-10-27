import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onChatbotOpen, isCollapsed, setIsCollapsed }) => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: 'uil-estate', section: 'hero' },
    { id: 'about', label: 'About', icon: 'uil-info-circle', section: 'about' },
    { id: 'categories', label: 'Categories', icon: 'uil-apps', section: 'categories' },
    { id: 'projects', label: 'Projects', icon: 'uil-rocket', section: 'projects' },
    { id: 'partners', label: 'Partners', icon: 'uil-users-alt', section: 'partners' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-deep-navy/95 backdrop-blur-xl border-r border-white/10 z-40 flex flex-col transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10 flex items-center justify-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
            <i className="uil uil-rocket text-2xl text-white"></i>
          </div>
          <h1 className={`text-2xl font-display font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap transition-all duration-300 overflow-hidden ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            HackaVerse
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.section)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative ${
                  activeSection === item.section
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/50 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <i className={`${item.icon} text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}></i>
                <span className={`font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
                  isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}>{item.label}</span>
                {activeSection === item.section && (
                  <div className={`w-2 h-2 bg-cyan-400 rounded-full pulse-notify transition-all duration-300 ${
                    isCollapsed ? 'ml-0' : 'ml-auto'
                  }`}></div>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="my-4 border-t border-white/10"></div>

        {/* HackaAgent */}
        <button
          onClick={onChatbotOpen}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
          title={isCollapsed ? 'HackaAgent' : ''}
        >
          <i className="uil uil-robot text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0"></i>
          <span className={`font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>HackaAgent</span>
          <div className={`w-2 h-2 bg-green-400 rounded-full pulse-notify transition-all duration-300 ${
            isCollapsed ? 'ml-0' : 'ml-auto'
          }`}></div>
        </button>
      </nav>

      {/* Main CTA & Toggle Button Container */}
      <div className="border-t border-white/10">
        {/* Main CTA */}
        <div className="p-4">
          <Link
            to="/register"
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-glow-purple magnetic-button ${
              isCollapsed ? 'px-3' : 'px-6'
            }`}
            title={isCollapsed ? 'Join Hackathon' : ''}
          >
            <i className="uil uil-plus-circle text-xl flex-shrink-0"></i>
            <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}>Join Hackathon</span>
          </Link>
        </div>

        {/* Toggle Button */}
        <div className="p-4 pt-0">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white py-3 px-4 rounded-lg transition-all duration-300 group"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <i className={`uil uil-angle-double-left text-xl transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : 'rotate-0'
            }`}></i>
            <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}>Collapse</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
