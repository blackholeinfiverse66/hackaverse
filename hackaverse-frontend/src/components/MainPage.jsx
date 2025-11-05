import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, Navigate } from 'react-router-dom';
import AuthModal from './auth/AuthModal';

const MainPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Check if user is already authenticated and redirect
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'admin' ? '/admin' : '/app';
      window.location.href = redirectPath;
    }
  }, [isAuthenticated, user]);

  // Open auth modal if redirectTo is present in state
  useEffect(() => {
    if (location.state?.redirectTo) {
      setIsAuthModalOpen(true);
    }
  }, [location.state]);

  // If already authenticated, redirect immediately
  if (isAuthenticated && user) {
    const redirectPath = user.role === 'admin' ? '/admin' : '/app';
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="relative overflow-hidden text-white bg-charcoal">
      {/* Enhanced Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan to-violet rounded-lg flex items-center justify-center">
                <span className="text-charcoal font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold tracking-tight">HackaVerse</span>
              <span className="px-2 py-1 bg-cyan/20 text-cyan text-xs font-medium rounded-full">S02</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#tracks" className="text-text-secondary hover:text-white transition-colors">Tracks</a>
              <a href="#leaderboard" className="text-text-secondary hover:text-white transition-colors">Leaderboard</a>
              <a href="#projects" className="text-text-secondary hover:text-white transition-colors">Projects</a>
              <a href="#about" className="text-text-secondary hover:text-white transition-colors">About</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 text-text-secondary hover:text-white transition-colors text-sm"
              >
                Log in
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="btn-primary px-6 text-sm"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Grid Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(74, 200, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 200, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/50 to-charcoal"></div>
      </div>

      {/* Hero Section - 2 Column Layout */}
      <section className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-success/20 text-success text-sm font-medium rounded-full animate-pulse">
                    🔴 Live Registration
                  </span>
                  <span className="text-text-muted text-sm">Ends in 3 days</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Future</span>
                  <br />
                  <span className="relative">
                    Together
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan to-violet rounded-full"></div>
                  </span>
                </h1>
                <p className="text-xl text-text-secondary leading-relaxed max-w-lg">
                  India's premier student hackathon platform. AI-powered mentorship, 
                  fair automated scoring, and ₹5L+ in prizes.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-primary px-8 py-4 text-lg font-semibold"
                >
                  <i className="uil uil-rocket mr-2"></i>
                  Join Hackathon
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-secondary px-8 py-4 text-lg"
                >
                  <i className="uil uil-compass mr-2"></i>
                  Explore Tracks
                </button>
              </div>

              {/* Trust Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan">1,247</div>
                  <div className="text-sm text-text-muted">Teams Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet">₹5L+</div>
                  <div className="text-sm text-text-muted">Prize Pool</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-lime countdown">72:14:35</div>
                  <div className="text-sm text-text-muted">Time Left</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">24/7</div>
                  <div className="text-sm text-text-muted">AI Mentors</div>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Element */}
            <div className="relative">
              <div className="relative z-10">
                {/* Terminal-style AI Code Assistant Mockup */}
                <div className="glass-card rounded-2xl p-6 max-w-lg mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-error rounded-full"></div>
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                    </div>
                    <span className="text-text-muted text-sm ml-2">HackaVerse AI Assistant</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan">$</span>
                      <span className="text-text-secondary">hacka init --project="Smart Campus"</span>
                    </div>
                    <div className="text-success">✓ Project initialized successfully</div>
                    <div className="text-success">✓ AI mentor assigned: Dr. Sarah Chen</div>
                    <div className="text-success">✓ Team matching: 3 developers found</div>
                    <div className="flex items-start gap-2">
                      <span className="text-violet">AI:</span>
                      <span className="text-text-primary">Ready to build something amazing? 
                      I'll help you with architecture, code reviews, and deployment strategies.</span>
                    </div>
                    <div className="flex items-center gap-2 animate-pulse">
                      <span className="text-cyan">$</span>
                      <span className="text-text-secondary">_</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan/20 to-violet/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-violet/10 to-lime/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Pills Section */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl hover:border-cyan/50 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan/20 rounded-xl flex items-center justify-center group-hover:bg-cyan/30 transition-colors">
                  <i className="uil uil-robot text-cyan text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">AI Mentor Advantage</h3>
                  <p className="text-text-muted text-sm">24/7 expert guidance and code reviews</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl hover:border-violet/50 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet/20 rounded-xl flex items-center justify-center group-hover:bg-violet/30 transition-colors">
                  <i className="uil uil-chart-line text-violet text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Fair Automated Scoring</h3>
                  <p className="text-text-muted text-sm">Unbiased evaluation with transparent metrics</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl hover:border-lime/50 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-lime/20 rounded-xl flex items-center justify-center group-hover:bg-lime/30 transition-colors">
                  <i className="uil uil-users-alt text-lime text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Smart Team Matching</h3>
                  <p className="text-text-muted text-sm">Find perfect teammates across campuses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard + Winners Section */}
      <section id="leaderboard" className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Live Competition</h2>
            <p className="text-text-secondary text-lg">Track the best teams and celebrate winners</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Live Leaderboard Preview */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  Live Leaderboard
                </h3>
                <button className="text-cyan hover:text-white transition-colors text-sm">
                  View Full Leaderboard →
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { rank: 1, team: 'Team Phoenix', score: 2847, delta: '+12', trend: 'up' },
                  { rank: 2, team: 'Team Nova', score: 2831, delta: '-1', trend: 'down' },
                  { rank: 3, team: 'Team Quantum', score: 2798, delta: '+3', trend: 'up' },
                  { rank: 4, team: 'Team Nexus', score: 2756, delta: '+2', trend: 'up' },
                  { rank: 5, team: 'Team Apex', score: 2743, delta: '-2', trend: 'down' }
                ].map(team => (
                  <div key={team.rank} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        team.rank === 1 ? 'bg-warning text-charcoal' :
                        team.rank === 2 ? 'bg-text-muted text-charcoal' :
                        team.rank === 3 ? 'bg-warning/60 text-charcoal' :
                        'bg-white/10 text-white'
                      }`}>
                        {team.rank}
                      </div>
                      <div>
                        <div className="font-medium text-white">{team.team}</div>
                        <div className="text-xs text-text-muted">Updated 2 min ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-mono">{team.score.toLocaleString()}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        team.trend === 'up' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                      }`}>
                        {team.trend === 'up' ? '↗' : '↘'} {team.delta.replace(/[+-]/, '')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Winners */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Hall of Fame</h3>
                <div className="flex gap-2">
                  <button className="text-cyan hover:text-white transition-colors text-sm">
                    Watch Demos
                  </button>
                  <button className="text-cyan hover:text-white transition-colors text-sm">
                    View All →
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { 
                    place: '🥇', 
                    team: 'Team Phoenix', 
                    project: 'AI Code Assistant',
                    tags: ['AI/ML', 'NLP', 'React'],
                    prize: '₹2,00,000'
                  },
                  { 
                    place: '🥈', 
                    team: 'Team Nova', 
                    project: 'Smart Campus IoT',
                    tags: ['IoT', 'Python', 'AWS'],
                    prize: '₹1,50,000'
                  },
                  { 
                    place: '🥉', 
                    team: 'Team Quantum', 
                    project: 'Blockchain Voting',
                    tags: ['Web3', 'Solidity', 'React'],
                    prize: '₹1,00,000'
                  }
                ].map((winner, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <span className="text-2xl">{winner.place}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{winner.team}</span>
                        <span className="text-success text-sm font-medium">{winner.prize}</span>
                      </div>
                      <div className="text-text-secondary mb-2">{winner.project}</div>
                      <div className="flex gap-2">
                        {winner.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/10 text-text-muted text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="btn-secondary px-6">
              <i className="uil uil-trophy mr-2"></i>
              Hall of Fame
            </button>
            <button className="btn-secondary px-6">
              <i className="uil uil-play mr-2"></i>
              Watch Winning Demos
            </button>
            <button className="btn-primary px-6">
              <i className="uil uil-chart-line mr-2"></i>
              View Full Leaderboard
            </button>
          </div>
        </div>
      </section>



      {/* Why HackaVerse Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why HackaVerse?</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              More than just a hackathon - it's your launchpad to a successful tech career
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 text-center hover:border-cyan/50 transition-all duration-300">
              <div className="w-16 h-16 bg-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="uil uil-briefcase-alt text-cyan text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Career Acceleration</h3>
              <p className="text-text-secondary leading-relaxed">
                Get noticed by top recruiters. Our winners have landed internships at Google, Microsoft, and unicorn startups.
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 text-center hover:border-violet/50 transition-all duration-300">
              <div className="w-16 h-16 bg-violet/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="uil uil-robot text-violet text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Learning</h3>
              <p className="text-text-secondary leading-relaxed">
                Learn from industry experts through our AI mentorship system. Get personalized guidance and instant feedback.
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-8 text-center hover:border-lime/50 transition-all duration-300">
              <div className="w-16 h-16 bg-lime/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="uil uil-folder-open text-lime text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Portfolio Builder</h3>
              <p className="text-text-secondary leading-relaxed">
                Build impressive projects that showcase your skills. Every submission becomes part of your professional portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Tracks Section */}
      <section id="tracks" className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Track</h2>
            <p className="text-text-secondary text-lg">Four exciting domains to showcase your skills</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'AI/ML',
                icon: 'uil-brain',
                color: 'cyan',
                description: 'Machine Learning, NLP, Computer Vision',
                projects: 89,
                prize: '₹2L'
              },
              {
                name: 'Web3',
                icon: 'uil-link-h',
                color: 'violet',
                description: 'Blockchain, DeFi, Smart Contracts',
                projects: 67,
                prize: '₹1.5L'
              },
              {
                name: 'Gaming',
                icon: 'uil-game-structure',
                color: 'lime',
                description: 'Game Development, AR/VR, Unity',
                projects: 45,
                prize: '₹1L'
              },
              {
                name: 'Open Innovation',
                icon: 'uil-lightbulb-alt',
                color: 'warning',
                description: 'IoT, Fintech, Social Impact',
                projects: 78,
                prize: '₹1.5L'
              }
            ].map((track, i) => (
              <div key={i} className={`glass-card rounded-2xl p-6 hover:border-${track.color}/50 transition-all duration-300 cursor-pointer group`}>
                <div className={`w-12 h-12 bg-${track.color}/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${track.color}/30 transition-colors`}>
                  <i className={`uil ${track.icon} text-${track.color} text-xl`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">{track.name}</h3>
                <p className="text-text-muted text-sm mb-4">{track.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">{track.projects} projects</span>
                  <span className={`text-${track.color} font-semibold`}>{track.prize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Student Projects</h2>
            <p className="text-text-secondary text-lg">Incredible innovations built by students like you</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'EcoTrack - Carbon Footprint Monitor',
                team: 'Team GreenTech',
                image: '/api/placeholder/400/240',
                tags: ['IoT', 'React', 'Python'],
                description: 'Real-time carbon footprint tracking using IoT sensors and ML predictions.',
                github: '#',
                demo: '#'
              },
              {
                title: 'MediChain - Healthcare Records',
                team: 'Team HealthTech',
                image: '/api/placeholder/400/240',
                tags: ['Blockchain', 'React', 'Solidity'],
                description: 'Secure, decentralized healthcare record management system.',
                github: '#',
                demo: '#'
              },
              {
                title: 'CodeMentor AI - Learning Assistant',
                team: 'Team EduTech',
                image: '/api/placeholder/400/240',
                tags: ['AI/ML', 'NLP', 'Python'],
                description: 'AI-powered coding mentor that provides personalized learning paths.',
                github: '#',
                demo: '#'
              }
            ].map((project, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden hover:border-cyan/50 transition-all duration-300 group">
                <div className="aspect-video bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center">
                  <i className="uil uil-image text-4xl text-white/50"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan transition-colors">{project.title}</h3>
                  <p className="text-text-muted text-sm mb-3">{project.team}</p>
                  <p className="text-text-secondary text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/10 text-text-muted text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 btn-secondary py-2 text-sm">
                      <i className="uil uil-github mr-1"></i>
                      Code
                    </button>
                    <button className="flex-1 btn-primary py-2 text-sm">
                      <i className="uil uil-external-link-alt mr-1"></i>
                      Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Process */}
      <section className="relative z-10 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan to-violet rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Register & Team Up</h3>
                <p className="text-text-muted text-sm">Join solo or find teammates through our smart matching system</p>
              </div>
            </div>
            
            <i className="uil uil-arrow-right text-text-muted text-2xl hidden md:block"></i>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-violet to-lime rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Build with AI Guidance</h3>
                <p className="text-text-muted text-sm">Get 24/7 mentorship from industry experts and AI assistants</p>
              </div>
            </div>
            
            <i className="uil uil-arrow-right text-text-muted text-2xl hidden md:block"></i>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-lime to-warning rounded-2xl flex items-center justify-center">
                <span className="text-charcoal font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Submit & Win</h3>
                <p className="text-text-muted text-sm">Fair automated scoring and exciting prizes await the best projects</p>
              </div>
            </div>
          </div>
          
          <button className="btn-primary px-8 py-4 text-lg">
            <i className="uil uil-book-open mr-2"></i>
            Read the Complete Guide
          </button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-gunmetal/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan to-violet rounded-lg flex items-center justify-center">
                  <span className="text-charcoal font-bold text-lg">H</span>
                </div>
                <span className="text-xl font-bold">HackaVerse</span>
              </div>
              <p className="text-text-secondary mb-6 max-w-md">
                India's premier student hackathon platform. Build the future with AI-powered mentorship and fair competition.
              </p>
              <div className="flex gap-4">
                <i className="uil uil-twitter text-text-muted hover:text-cyan cursor-pointer transition-colors text-xl"></i>
                <i className="uil uil-github text-text-muted hover:text-cyan cursor-pointer transition-colors text-xl"></i>
                <i className="uil uil-linkedin text-text-muted hover:text-cyan cursor-pointer transition-colors text-xl"></i>
                <i className="uil uil-discord text-text-muted hover:text-cyan cursor-pointer transition-colors text-xl"></i>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-3 text-sm text-text-muted">
                <div className="hover:text-white cursor-pointer transition-colors">Tracks</div>
                <div className="hover:text-white cursor-pointer transition-colors">Leaderboard</div>
                <div className="hover:text-white cursor-pointer transition-colors">Projects</div>
                <div className="hover:text-white cursor-pointer transition-colors">Mentorship</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-3 text-sm text-text-muted">
                <div className="hover:text-white cursor-pointer transition-colors">Documentation</div>
                <div className="hover:text-white cursor-pointer transition-colors">API Reference</div>
                <div className="hover:text-white cursor-pointer transition-colors">Support</div>
                <div className="hover:text-white cursor-pointer transition-colors">Community</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-text-muted text-sm">
              © 2025 HackaVerse. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-text-muted">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-colors">Code of Conduct</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectTo={location.state?.redirectTo}
      />
    </div>
  );
};

export default MainPage;