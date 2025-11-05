import { useState, useEffect, useRef } from 'react';
import UIPortal from './UIPortal';

const SearchOverlay = ({ isOpen, onClose, searchValue, onSearchChange, inputRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState([]);
  const overlayRef = useRef(null);

  const mockResults = [
    { id: 1, type: 'submission', title: 'AI Campus Navigator', subtitle: 'Team Alpha • AI/ML Track', icon: 'uil-file-alt' },
    { id: 2, type: 'team', title: 'Team Beta', subtitle: '3 members • Web3 Track', icon: 'uil-users-alt' },
    { id: 3, type: 'project', title: 'Blockchain Voting', subtitle: 'In Progress • Web3', icon: 'uil-rocket' },
    { id: 4, type: 'participant', title: 'John Doe', subtitle: 'AI/ML Specialist', icon: 'uil-user' }
  ];

  useEffect(() => {
    if (searchValue.trim()) {
      const filtered = mockResults.filter(item => 
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchValue.toLowerCase())
      );
      setResults(filtered);
      setActiveIndex(0);
    } else {
      setResults([]);
    }
  }, [searchValue]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[activeIndex]) {
            handleSelect(results[activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, activeIndex, onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target) && 
          inputRef.current && !inputRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (window.innerWidth < 768) {
        document.body.classList.add('search-open');
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('search-open');
    };
  }, [isOpen, onClose]);

  const handleSelect = (item) => {
    console.log('Selected:', item);
    onClose();
  };

  const getPosition = () => {
    if (!inputRef.current) return {};
    
    const rect = inputRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      left: rect.left,
      width: Math.min(rect.width, 720)
    };
  };

  if (!isOpen) return null;

  const position = getPosition();
  const groupedResults = results.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  return (
    <UIPortal>
      <div 
        ref={overlayRef}
        className="search-overlay"
        style={position}
        role="listbox"
        aria-label="Search results"
      >
        {results.length > 0 ? (
          Object.entries(groupedResults).map(([type, items]) => (
            <div key={type}>
              <div className="search-section">
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </div>
              {items.map((item, index) => {
                const globalIndex = results.indexOf(item);
                return (
                  <div
                    key={item.id}
                    className={`search-item ${globalIndex === activeIndex ? 'active' : ''}`}
                    role="option"
                    aria-selected={globalIndex === activeIndex}
                    onClick={() => handleSelect(item)}
                  >
                    <i className={`${item.icon} search-item-icon`}></i>
                    <div className="search-item-content">
                      <div className="search-item-title">{item.title}</div>
                      <div className="search-item-subtitle">{item.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : searchValue.trim() ? (
          <div className="search-empty">
            <i className="uil uil-search search-empty-icon"></i>
            <div className="search-empty-title">No results found</div>
            <div className="search-empty-text">Try different keywords or check spelling</div>
            <button className="btn-ghost">Open advanced search</button>
          </div>
        ) : (
          <div className="search-empty">
            <i className="uil uil-search search-empty-icon"></i>
            <div className="search-empty-title">Start typing to search</div>
            <div className="search-empty-text">Find submissions, teams, projects, and participants</div>
          </div>
        )}
      </div>
    </UIPortal>
  );
};

export default SearchOverlay;