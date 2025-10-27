import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParallax } from '../hooks/useParallax';
import { FadeIn, ScaleIn } from './AnimationWrappers';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import MiniLeaderboard from './MiniLeaderboard';
import ProjectsCarousel from './ProjectsCarousel';
import Footer from './Footer';
import AppShell from './AppShell';

const LandingPageNew = () => {
  const [isVisible, setIsVisible] = useState(false);
  const parallaxSlow = useParallax(0.15);
  const [howItWorksRef, howItWorksVisible] = useIntersectionObserver({ threshold: 0.3, once: true });

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <AppShell>
      <div className="relative overflow-hidden text-white">
        {/* Enhanced Animated Background with Multiple Layers */}
        <div className="fixed inset-0 pointer-events-none -z-10">
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

        {/* Enhanced Floating Particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
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

        {/* Section 1: Home Dashboard */}
        <section id="hero" className="relative z-10 px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[60%_40%] gap-8 items-start">
              {/* Left Column - Welcome */}
              <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="mb-8">
                  <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-shimmer">
                    A Universe of Builders
                  </h1>
                  <p className="text-xl md:text-2xl text-text-light mb-8 max-w-2xl">
                    AI-driven hackathons connecting creators across campuses. Experience the future of collaborative innovation.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/results"
                      className="btn-ghost font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 magnetic-button"
                    >
                      <i className="uil uil-trophy text-xl"></i>
                      View All Teams
                    </Link>
                    <Link
                      to="/dashboard"
                      className="bg-white/10 hover:bg-white/20 border border-white/20 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <i className="uil uil-chart-line text-xl"></i>
                      My Dashboard
                    </Link>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Active Teams', value: '150+', icon: 'uil-users-alt' },
                    { label: 'Projects', value: '89', icon: 'uil-rocket' },
                    { label: 'Categories', value: '4', icon: 'uil-apps' }
                  ].map((stat, i) => (
                    <div key={i} className="glass-card rounded-lg p-4 text-center hover-lift">
                      <i className={`${stat.icon} text-3xl text-cyan-400 mb-2`}></i>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Live Leaderboard */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <MiniLeaderboard />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Information Hub - Combined About & How It Works */}
        <section id="about" className="relative z-10 px-8 py-20 bg-deep-navy/30">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up" duration={800}>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-shimmer">Welcome to the Universe</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experience the future of hackathons with AI-powered mentorship, automated judging, and seamless collaboration across universities.
                </p>
              </div>
            </FadeIn>

            {/* How it Works - Integrated */}
            <div ref={howItWorksRef} className="mt-16">
              <h3 className="text-3xl font-display font-bold text-center mb-12 text-white">How it Works</h3>
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
          </div>
        </section>

        {/* Section 3: Discovery Zone - Categories */}
        <section id="categories" className="relative z-10 px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up" duration={800}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-shimmer">Categories</h2>
              <p className="text-center text-text-light mb-16 text-lg">Choose your domain and build something extraordinary</p>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'AI/ML', icon: 'uil-brain', color: 'from-purple-primary to-cyan-accent', desc: 'Machine Learning & AI Solutions' },
                { name: 'Gaming', icon: 'uil-game-structure', color: 'from-magenta-primary to-purple-400', desc: 'Interactive Gaming Experiences' },
                { name: 'Web3', icon: 'uil-link-h', color: 'from-cyan-accent to-blue-400', desc: 'Blockchain & Decentralized Apps' },
                { name: 'Open Innovation', icon: 'uil-lightbulb-alt', color: 'from-yellow-400 to-orange-500', desc: 'Creative Problem Solving' }
              ].map((category, index) => (
                <ScaleIn key={category.name} delay={index * 100} duration={600}>
                  <div 
                    className="card-3d glass-card glow-border rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer group"
                    style={{
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
                      <h3 className="text-2xl font-display font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300">
                        {category.name}
                      </h3>
                      <p className="text-text-light text-sm leading-relaxed">{category.desc}</p>
                    </div>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3.5: Featured Projects - Horizontal Carousel */}
        <section id="projects" className="relative z-10 px-8 py-20 bg-deep-navy/20">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up" duration={800}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-shimmer">Featured Projects</h2>
              <p className="text-center text-text-light mb-16 text-lg">Discover what's possible with HackaVerse</p>
            </FadeIn>
            <ProjectsCarousel />
          </div>
        </section>

        {/* Section 4: Partners Marquee */}
        <section id="partners" className="relative z-10 py-20 px-8 bg-deep-navy/30 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-12">
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
                      className="group cursor-pointer transition-all duration-300 hover:scale-110 flex-shrink-0 relative z-[1] hover:z-10"
                    >
                      <div className="w-32 h-32 rounded-xl glass-card flex flex-col items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 hover-lift hover:shadow-[0_0_30px_rgba(0,242,234,0.5)]">
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

        {/* Footer */}
        <Footer />
      </div>
    </AppShell>
  );
};

export default LandingPageNew;
