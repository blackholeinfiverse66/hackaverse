import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Tooltip from '../ui/Tooltip';

const Sidebar = ({ items }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea, [contenteditable]')) {
          setIsCollapsed(!isCollapsed);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCollapsed]);

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ item, isCollapsed }) => {
    const active = isActive(item.path);
    
    const itemContent = (
      <Link
        to={item.path}
        className={`group flex items-center h-11 rounded-xl transition-all relative ${
          isCollapsed 
            ? 'w-11 justify-center mx-auto' 
            : 'gap-3 px-3'
        } ${
          active 
            ? 'text-white bg-white/10 border border-white/20' 
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        {active && (
          <div className="absolute left-[-2px] top-2 bottom-2 w-[3px] bg-[#4AA8FF] rounded-r-sm"></div>
        )}
        
        <div className="relative flex items-center justify-center">
          <i className={`${item.icon} text-xl min-w-[20px]`}></i>
          {item.hasPresence && (
            <div className="absolute right-1 top-1 w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
          )}
        </div>
        
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );

    return isCollapsed ? (
      <Tooltip content={item.label}>
        {itemContent}
      </Tooltip>
    ) : itemContent;
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-[#0B1422]/95 border-r border-white/10 backdrop-blur transition-all duration-150 z-30 ${
      isCollapsed ? 'w-[84px]' : 'w-[264px]'
    }`}>
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#7C4DFF] to-[#6CCAFF] flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-white">HackaVerse</span>
          )}
        </div>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto w-9 h-9 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
          title={`${isCollapsed ? 'Expand' : 'Collapse'} (C)`}
        >
          <i className={`uil uil-angle-left text-white/70 transition-transform duration-150 ${
            isCollapsed ? 'rotate-180' : ''
          }`}></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className={`py-4 overflow-y-auto flex-1 px-2`} role="navigation" aria-label="Primary">
        <div className={isCollapsed ? 'space-y-3' : 'space-y-1'}>
          {items.map(item => (
            <NavItem key={item.path} item={item} isCollapsed={isCollapsed} />
          ))}
        </div>
      </nav>


    </aside>
  );
};

export default Sidebar;