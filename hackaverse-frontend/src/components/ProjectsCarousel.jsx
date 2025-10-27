import { useState, useRef } from 'react';

const ProjectsCarousel = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = [
    { name: 'Neural Canvas', team: 'Team Quantum', category: 'AI/ML', icon: 'uil-brain', color: 'from-purple-primary to-cyan-accent', description: 'AI-powered art generation platform' },
    { name: 'BlockChain RPG', team: 'Cyber Knights', category: 'Web3', icon: 'uil-game-structure', color: 'from-cyan-accent to-blue-400', description: 'Decentralized gaming ecosystem' },
    { name: 'EcoTrack AI', team: 'Green Innovators', category: 'Open Innovation', icon: 'uil-lightbulb-alt', color: 'from-yellow-400 to-green-500', description: 'Carbon footprint tracker' },
    { name: 'HealthBot', team: 'Med Tech', category: 'AI/ML', icon: 'uil-heartbeat', color: 'from-red-400 to-pink-500', description: 'AI medical assistant' },
    { name: 'DeFi Dashboard', team: 'Crypto Crew', category: 'Web3', icon: 'uil-chart-line', color: 'from-blue-400 to-purple-500', description: 'Real-time DeFi analytics' },
    { name: 'VR Arena', team: 'Reality Shift', category: 'Gaming', icon: 'uil-vr', color: 'from-magenta-primary to-purple-400', description: 'Multiplayer VR battles' },
    { name: 'CodeMentor AI', team: 'Dev Squad', category: 'AI/ML', icon: 'uil-code', color: 'from-cyan-400 to-green-400', description: 'AI coding assistant' },
    { name: 'NFT Marketplace', team: 'Digital Artists', category: 'Web3', icon: 'uil-image', color: 'from-purple-400 to-pink-400', description: 'Decentralized art platform' }
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(() => {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
      }, 300);
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-900/90 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <i className="uil uil-angle-left text-2xl"></i>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-900/90 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <i className="uil uil-angle-right text-2xl"></i>
        </button>
      )}

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        className="carousel-container flex gap-6 overflow-x-auto pb-4"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="card-3d glass-card glow-border rounded-2xl p-6 flex-shrink-0 w-80 cursor-pointer group hover-lift"
            style={{
              '--glow-color-1': project.color.split(' ')[0].replace('from-', ''),
              '--glow-color-2': project.color.split(' ')[2]
            }}
          >
            <div className="card-3d-content">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0 shadow-glow`}>
                  <i className={`${project.icon} text-3xl text-white`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-cyan-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-text-light text-sm">{project.team}</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white`}>
                  {project.category}
                </span>
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm">
                  View <i className="uil uil-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
