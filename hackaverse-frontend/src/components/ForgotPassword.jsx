import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from './Toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      toast.success('Password reset instructions sent to your email!');
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-[600px] h-[600px] bg-purple-primary/40 rounded-full blur-[150px] animate-float" 
                 style={{ top: '5%', left: '5%', animationDuration: '25s' }}></div>
            <div className="absolute w-[500px] h-[500px] bg-cyan-accent/30 rounded-full blur-[120px] animate-float" 
                 style={{ top: '50%', right: '10%', animationDuration: '30s', animationDelay: '5s' }}></div>
          </div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl animate-fade-in-up text-center">
            <div className="mb-6 text-6xl">✉️</div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Check Your Email
            </h2>
            <p className="text-gray-300 mb-8">
              We've sent password reset instructions to <span className="text-white font-semibold">{email}</span>
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400">
                Didn't receive the email? Check your spam folder or
              </p>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-2 text-cyan-400 hover:text-cyan-300 font-semibold disabled:opacity-50"
              >
                {loading ? 'Resending...' : 'Resend Instructions'}
              </button>
            </div>
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-[600px] h-[600px] bg-purple-primary/40 rounded-full blur-[150px] animate-float" 
               style={{ top: '5%', left: '5%', animationDuration: '25s' }}></div>
          <div className="absolute w-[500px] h-[500px] bg-cyan-accent/30 rounded-full blur-[120px] animate-float" 
               style={{ top: '50%', right: '10%', animationDuration: '30s', animationDelay: '5s' }}></div>
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-gray-400">
              Enter your email and we'll send you reset instructions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-semibold mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="builder@hackaverse.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Instructions...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Instructions</span>
                  <i className="uil uil-message text-xl"></i>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
              <i className="uil uil-arrow-left"></i>
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;