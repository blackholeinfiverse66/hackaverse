import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { FadeIn, ScaleIn } from './AnimationWrappers';
import MiniLeaderboard from './MiniLeaderboard';
import FloatingChatbot from './FloatingChatbot';
import Footer from './Footer';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const parallaxSlow = useParallax(0.15);
  const [howItWorksRef, howItWorksVisible] = useIntersectionObserver({ threshold: 0.3, once: true });

  // Handle 3D tilt effect
  const handleCardTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Enhanced Animated Background with Multiple Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1: Moving Gradient Orbs */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute w-[500px] h-[500px] bg-purple-primary/30 rounded-full blur-[120px] animate-float" 
               style={{ top: '10%', left: '10%', animationDuration: '20s' }}></div>
          <div className="absolute w-[400px] h-[400px] bg-cyan-accent/25 rounded-full blur-[100px] animate-float" 
               style={{ top: '60%', right: '15%', animationDuration: '25s', animationDelay: '5s' }}></div>
          <div className="absolute w-[450px] h-[450px] bg-magenta-primary/20 rounded-full blur-[110px] animate-float" 
               style={{ bottom: '10%', left: '40%', animationDuration: '30s', animationDelay: '10s' }}></div>
        </div>
        
        {/* Layer 2: Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-20 animate-gradient-shift">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-transparent to-cyan-500"></div>
        </div>
        
        {/* Layer 3: Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: `linear-gradient(rgba(191, 64, 191, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0, 242, 234, 0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>
      
      {/* Enhanced Floating Particles with Variety */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() > 0.7 ? 3 : 2;
          const colors = ['bg-cyan-400/40', 'bg-purple-400/40', 'bg-pink-400/40', 'bg-blue-400/40'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className={`absolute ${color} rounded-full animate-float`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                boxShadow: '0 0 10px currentColor'
              }}
            />
          );
        })}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* 3D Rotating Central Element */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
          style={{ transform: `translate(-50%, calc(-50% + ${parallaxSlow}px))` }}
        >
          <div className="w-96 h-96 animate-rotate3d">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#BF40BF', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#00F2EA', stopOpacity: 0.8}} />
                </linearGradient>
              </defs>
              {/* Neural Network Design */}
              <circle cx="100" cy="50" r="8" fill="url(#grad1)" />
              <circle cx="60" cy="100" r="8" fill="url(#grad1)" />
              <circle cx="140" cy="100" r="8" fill="url(#grad1)" />
              <circle cx="80" cy="150" r="8" fill="url(#grad1)" />
              <circle cx="120" cy="150" r="8" fill="url(#grad1)" />
              <line x1="100" y1="50" x2="60" y2="100" stroke="url(#grad1)" strokeWidth="2" opacity="0.6" />
              <line x1="100" y1="50" x2="140" y2="100" stroke="url(#grad1)" strokeWidth="2" opacity="0.6" />
              <line x1="60" y1="100" x2="80" y2="150" stroke="url(#grad1)" strokeWidth="2" opacity="0.6" />
              <line x1="60" y1="100" x2="120" y2="150" stroke="url(#grad1)" strokeWidth="2" opacity="0.6" />
              <line x1="140" y1="100" x2="80" y2="150" stroke="url(#grad1)" strokeWidth="2" opacity="0.6" />
              <line x1="140" y1="100" x2="120" y2="150" stroke="url(#grad1)" strokeWidth="2" opacity="0.6" />
            </svg>
          </div>
        </div>

        <div className={`transform transition-all duration-1000 relative z-10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold mb-6 text-shimmer relative">
            HackaVerse
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-primary to-transparent"></div>
            <p className="text-xl sm:text-2xl md:text-3xl font-display text-text-light tracking-wide">
              A Universe of Builders
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-cyan-accent to-transparent"></div>
          </div>
        </div>
        
        <p className={`text-base sm:text-lg md:text-xl mb-12 max-w-2xl text-text-light transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-10`}>
          AI-driven hackathons connecting creators across campuses.
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-10`}>
          <Link
            to="/register"
            className="group relative bg-gradient-primary text-white font-semibold py-4 px-10 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-glow hover:shadow-glow-purple magnetic-button"
          >
            <span className="relative z-10 flex items-center gap-2">
              <i className="uil uil-rocket text-xl"></i>
              Join Hackathon
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-magenta-primary to-purple-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            to="/results"
            className="btn-ghost font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 magnetic-button"
          >
            <i className="uil uil-trophy text-xl"></i>
            View Leaderboard
          </Link>
        </div>

        {/* Live Mini Leaderboard */}
        <div className={`max-w-md mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-10`}>
          <MiniLeaderboard />
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About HackaVerse</h2>
          <p className="text-lg text-gray-300">
            Experience the future of hackathons with AI-powered mentorship, automated judging, and seamless collaboration across universities.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-shimmer">Categories</h2>
          <p className="text-center text-text-light mb-16 text-lg">Choose your domain and build something extraordinary</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'AI/ML', icon: 'uil-brain', color: 'from-purple-primary to-cyan-accent', desc: 'Machine Learning & AI Solutions' },
              { name: 'Gaming', icon: 'uil-game-structure', color: 'from-magenta-primary to-purple-400', desc: 'Interactive Gaming Experiences' },
              { name: 'Web3', icon: 'uil-link-h', color: 'from-cyan-accent to-blue-400', desc: 'Blockchain & Decentralized Apps' },
              { name: 'Open Innovation', icon: 'uil-lightbulb-alt', color: 'from-yellow-400 to-orange-500', desc: 'Creative Problem Solving' }
            ].map((category, index) => (
              <div 
                key={category.name} 
                className="card-3d glass-card glow-border rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  '--glow-color-1': category.name === 'AI/ML' ? '#BF40BF' : 
                                     category.name === 'Gaming' ? '#C030D8' :
                                     category.name === 'Web3' ? '#00F2EA' : '#FFD700',
                  '--glow-color-2': category.name === 'AI/ML' ? '#00F2EA' : 
                                     category.name === 'Gaming' ? '#BF40BF' :
                                     category.name === 'Web3' ? '#60A5FA' : '#FB923C'
                }}
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardLeave}
              >
                <div className="card-3d-content">
                  <div className="icon-glow mx-auto mb-6 animate-iconFloat group-hover:scale-110 transition-transform duration-300 icon-pulse">
                    <i className={`${category.icon} text-5xl bg-gradient-to-br ${category.color} bg-clip-text text-transparent`}></i>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:${category.color} transition-all duration-300">
                    {category.name}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed">{category.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section ref={howItWorksRef} className="relative z-10 py-24 px-4 bg-deep-navy/30">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn direction="up" duration={800}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-shimmer">How it Works</h2>
            <p className="text-text-light mb-16 text-lg">Three simple steps to join the universe of builders</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {[
              { icon: 'uil-user-plus', title: 'Register', desc: 'Form your dream team and choose your challenge category.', delay: 0 },
              { icon: 'uil-robot', title: 'Build with AI', desc: 'Get intelligent mentorship from our HackaAgent throughout your journey.', delay: 200 },
              { icon: 'uil-trophy', title: 'Compete & Win', desc: 'Submit your project and climb the leaderboard to glory.', delay: 400 }
            ].map((step, index) => (
              <div key={step.title} className="relative">
                <div 
                  className="card-3d glass-card rounded-2xl p-8 hover:shadow-glow transition-all duration-500 cursor-pointer group"
                  onMouseMove={handleCardTilt}
                  onMouseLeave={handleCardLeave}
                  style={{
                    transitionDelay: `${step.delay}ms`,
                    opacity: howItWorksVisible ? 1 : 0,
                    transform: howItWorksVisible ? 'translateY(0)' : 'translateY(30px)'
                  }}
                >
                  <div className="card-3d-content relative">
                    <div className="icon-glow mx-auto mb-6 animate-iconFloat group-hover:scale-125 transition-transform duration-300 icon-pulse">
                      <i className={`${step.icon} text-5xl bg-gradient-primary bg-clip-text text-transparent`}></i>
                    </div>
                    <div 
                      className={`absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-display font-bold text-xl shadow-glow ${
                        howItWorksVisible ? 'number-reveal' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${step.delay}ms` }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-4 text-white">{step.title}</h3>
                  <p className="text-text-light leading-relaxed">{step.desc}</p>
                </div>
                {/* Animated Connector Arrow */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 z-20">
                    <svg 
                      width="32" 
                      height="2" 
                      viewBox="0 0 32 2" 
                      className={howItWorksVisible ? 'arrow-draw' : 'opacity-0'}
                      style={{ animationDelay: `${step.delay + 600}ms` }}
                    >
                      <line 
                        x1="0" 
                        y1="1" 
                        x2="32" 
                        y2="1" 
                        stroke="url(#arrowGrad)" 
                        strokeWidth="2"
                      />
                      <defs>
                        <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#BF40BF" />
                          <stop offset="100%" stopColor="#00F2EA" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects / Past Winners Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-shimmer">Featured Projects</h2>
          <p className="text-center text-text-light mb-16 text-lg">Discover what's possible with HackaVerse</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Neural Canvas', team: 'Team Quantum', category: 'AI/ML', icon: 'uil-brain', color: 'from-purple-primary to-cyan-accent' },
              { name: 'BlockChain RPG', team: 'Cyber Knights', category: 'Web3', icon: 'uil-game-structure', color: 'from-cyan-accent to-blue-400' },
              { name: 'EcoTrack AI', team: 'Green Innovators', category: 'Open Innovation', icon: 'uil-lightbulb-alt', color: 'from-yellow-400 to-green-500' }
            ].map((project, index) => (
              <div 
                key={project.name}
                className="glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-500 hover:scale-105 cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0 shadow-glow">
                    <i className={`${project.icon} text-3xl text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-cyan-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-text-light text-sm">{project.team}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white">
                    {project.category}
                  </span>
                  <i className="uil uil-trophy text-accent-gold text-2xl"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors / Partners Section - Infinite Marquee */}
      <section className="relative z-10 py-20 px-4 bg-deep-navy/20 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <FadeIn direction="up" duration={800}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Our Partners</h2>
            <p className="text-text-light">Powered by industry leaders and innovation partners</p>
          </FadeIn>
        </div>
        
        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex marquee">
            {/* First set of logos */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-16 px-8 flex-shrink-0">
                {[
                  { name: 'BHIV', icon: 'uil-atom' },
                  { name: 'Uni-Guru', icon: 'uil-graduation-cap' },
                  { name: 'TechCorp', icon: 'uil-bolt' },
                  { name: 'CloudNet', icon: 'uil-cloud-computing' },
                  { name: 'AI Labs', icon: 'uil-brain' },
                  { name: 'DevHub', icon: 'uil-code-branch' },
                  { name: 'DataVerse', icon: 'uil-database' },
                  { name: 'CyberShield', icon: 'uil-shield-check' }
                ].map((sponsor) => (
                  <div 
                    key={`${setIndex}-${sponsor.name}`}
                    className="group cursor-pointer transition-all duration-300 hover:scale-110 flex-shrink-0"
                  >
                    <div className="w-32 h-32 rounded-xl glass-card flex flex-col items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 hover-lift">
                      <i className={`${sponsor.icon} text-5xl text-text-light group-hover:text-transparent group-hover:bg-gradient-primary group-hover:bg-clip-text transition-all`}></i>
                      <p className="text-text-light text-sm mt-2 font-semibold">{sponsor.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Chatbot */}
      <FloatingChatbot />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;