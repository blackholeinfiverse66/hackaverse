import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from './Toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Welcome back, Builder!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`Redirecting to ${provider}...`);
    // Mock social login
    setTimeout(() => {
      toast.success(`Connected with ${provider}!`);
      navigate('/dashboard');
    }, 1500);
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

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
              filter: `hue-rotate(${Math.random() * 360}deg)`,
              transform: `scale(${Math.random() * 2 + 0.5})`
            }}
          />
        ))}
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
              Login to the Universe of Builders
            </p>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Join thousands of innovators creating the future through collaborative hackathons powered by AI.
            </p>

            {/* Floating Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {[
                { value: '10K+', label: 'Builders', icon: 'uil-users-alt' },
                { value: '500+', label: 'Projects', icon: 'uil-rocket' },
                { value: '50+', label: 'Events', icon: 'uil-calendar-alt' }
              ].map((stat, i) => (
                <div key={i} className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105">
                  <i className={`${stat.icon} text-3xl text-cyan-400 mb-2`}></i>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
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
                  Welcome Back, Builder
                </h2>
                <p className="text-gray-400">Continue your journey in the universe</p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('GitHub')}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl border border-gray-700 transition-all hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="mt-8 mb-6 flex items-center">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-4 text-gray-400 text-sm">OR</span>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="builder@hackaverse.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
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

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <i className="uil uil-arrow-right text-xl"></i>
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-2 text-center">
                <p className="text-gray-400 mb-4">
                  Don't have an account?
                </p>
                <Link 
                  to="/signup" 
                  className="block w-full py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all text-center font-semibold"
                >
                  Create Individual Account
                </Link>
                <p className="text-gray-400 text-sm mt-3">
                  Looking to register a team? <Link to="/register" className="text-cyan-400 hover:text-cyan-300">Register Team</Link>
                </p>
              </div>
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
  );
};

export default LoginPage;
