import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SearchOverlay from './SearchOverlay';
import AccountMenu from './AccountMenu';

const Topbar = () => {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && 
          document.activeElement.tagName !== 'INPUT' && 
          document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsSearchOpen(value.length > 0 || document.activeElement === searchInputRef.current);
  };

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
    // Close account menu if open
    setIsAccountMenuOpen(false);
  };

  const handleSearchBlur = (e) => {
    // Keep open if clicking within overlay
    setTimeout(() => {
      if (!searchInputRef.current?.matches(':focus')) {
        setIsSearchOpen(false);
      }
    }, 150);
  };

  const handleAccountMenuToggle = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
    // Close search if open
    setIsSearchOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchValue('');
    searchInputRef.current?.blur();
  };

  const closeAccountMenu = () => {
    setIsAccountMenuOpen(false);
  };

  return (
    <header className="topbar">
      <div className="topbar-content">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-white font-bold text-xl">HackaVerse</span>
        </Link>

        {/* Search */}
        <div className="topbar-search relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search submissions, teams, projects... (Press / to focus)"
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            role="combobox"
            aria-expanded={isSearchOpen}
            aria-controls="search-results"
            aria-autocomplete="list"
          />
          
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={closeSearch}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            inputRef={searchInputRef}
          />
        </div>

        {/* Actions */}
        <div className="topbar-actions">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <i className="uil uil-bell text-xl"></i>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Avatar */}
          <button
            ref={avatarRef}
            className="avatar-button"
            onClick={handleAccountMenuToggle}
            aria-haspopup="menu"
            aria-expanded={isAccountMenuOpen}
          >
            {user?.name?.charAt(0) || 'U'}
          </button>

          <AccountMenu
            isOpen={isAccountMenuOpen}
            onClose={closeAccountMenu}
            triggerRef={avatarRef}
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;