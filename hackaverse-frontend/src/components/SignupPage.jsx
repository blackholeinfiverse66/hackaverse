import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from './Toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim()) {
      toast.error('Please enter your first name');
      return;
    }
    
    if (!formData.lastName.trim()) {
      toast.error('Please enter your last name');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    
    if (!formData.password) {
      toast.error('Please enter a password');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden">
      {/* Multi-layer Background System */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1: Moving Gradient Orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-[600px] h-[600px] bg-purple-primary/40 rounded-full blur-[150px] animate-float" 
               style={{ top: '5%', left: '5%', animationDuration: '25s' }}></div>
          <div className="absolute w-[500px] h-[500px] bg-cyan-accent/30 rounded-full blur-[120px] animate-float" 
               style={{ top: '50%', right: '10%', animationDuration: '30s', animationDelay: '5s' }}></div>
          <div className="absolute w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-[100px] animate-float" 
               style={{ bottom: '10%', left: '35%', animationDuration: '35s', animationDelay: '10s' }}></div>
        </div>
        
        {/* Layer 2: Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-15 animate-gradient-shift">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500"></div>
        </div>
        
        {/* Layer 3: Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        
        {/* Left Column - Brand & Visuals */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 relative overflow-hidden">
          {/* Dynamic Background Effect */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/20 via-transparent to-cyan-accent/20 animate-pulse-slow"></div>
            
            {/* Animated Constellation Map */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 800">
              {[...Array(50)].map((_, i) => {
                const x = Math.random() * 800;
                const y = Math.random() * 800;
                return (
                  <circle 
                    key={i} 
                    cx={x} 
                    cy={y} 
                    r={Math.random() * 2 + 1}
                    fill="#00F2EA"
                    className="animate-twinkle"
                    style={{ animationDelay: `${Math.random() * 3}s` }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Brand Content */}
          <div className="relative z-10 text-center max-w-lg">
            {/* Logo */}
            <div className="mb-8 animate-float">
              <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                <i className="uil uil-rocket text-7xl text-white"></i>
              </div>
            </div>

            {/* Tagline */}
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
              HackaVerse
            </h1>
            <p className="text-2xl md:text-3xl text-white font-semibold mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Create Your Account
            </p>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Join thousands of innovators creating the future through collaborative hackathons.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {[
                { icon: 'uil-users-alt', title: 'Team Collaboration', desc: 'Work with teammates' },
                { icon: 'uil-robot', title: 'AI Mentor', desc: 'Get intelligent help' },
                { icon: 'uil-trophy', title: 'Competitions', desc: 'Win prizes & recognition' },
                { icon: 'uil-chart-line', title: 'Progress Tracking', desc: 'Monitor your growth' }
              ].map((feature, i) => (
                <div key={i} className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-500/50 transition-all">
                  <i className={`${feature.icon} text-2xl text-cyan-400 mb-2`}></i>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Signup Form */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-cyan-500/50 mb-4">
                <i className="uil uil-rocket text-5xl text-white"></i>
              </div>
              <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                HackaVerse
              </h1>
            </div>

            {/* Form Card */}
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl animate-fade-in-up">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-gray-400">Join the universe of builders</p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="john.doe@hackaverse.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <i className={`uil ${showPassword ? 'uil-eye-slash' : 'uil-eye'} text-xl`}></i>
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <i className={`uil ${showConfirmPassword ? 'uil-eye-slash' : 'uil-eye'} text-xl`}></i>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <i className="uil uil-user-plus text-xl"></i>
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>

              {/* Team Registration Link */}
              <div className="mt-4 text-center">
                <p className="text-gray-400">
                  Want to register a team instead?{' '}
                  <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                    Register Team
                  </Link>
                </p>
              </div>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <i className="uil uil-arrow-left"></i>
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;