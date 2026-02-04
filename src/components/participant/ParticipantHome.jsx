import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import QuickStartModal from './QuickStartModal';

const ParticipantHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [upcomingDeadlines] = useState([
    {
      id: 1,
      label: 'Project Submission',
      date: 'March 15, 2024',
      remaining: '5 days left',
      status: 'critical',
      type: 'submission'
    },
    {
      id: 2,
      label: 'Team Formation Deadline',
      date: 'March 10, 2024',
      remaining: '2 days left',
      status: 'warning',
      type: 'team'
    },
    {
      id: 3,
      label: 'Mentor Session',
      date: 'March 8, 2024',
      remaining: '1 day left',
      status: 'info',
      type: 'meeting'
    }
  ]);

  const [progress] = useState({
    profileCompletion: 85,
    teamStatus: 'Joined Team Alpha',
    submissionStatus: 'In Progress'
  });

  const [showQuickStart, setShowQuickStart] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'info': return 'text-cyan-400 bg-cyan-400/20 border-cyan-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'submission': return 'uil-file-upload';
      case 'team': return 'uil-users-alt';
      case 'meeting': return 'uil-calendar-alt';
      default: return 'uil-clock';
    }
  };

  const quickActions = [
    { icon: 'uil-rocket', label: 'Start Project', path: '/app/projects', color: 'cyan' },
    { icon: 'uil-users-alt', label: 'Join Team', path: '/app/teams', color: 'violet' },
    { icon: 'uil-file-upload-alt', label: 'Submit Work', path: '/app/submissions', color: 'lime' },
    { icon: 'uil-user-circle', label: 'Edit Profile', path: '/app/profile', color: 'orange' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-violet-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="mb-6">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="cosmic-text">Welcome back</span>
              <br />
              <span className="text-white">{user?.name?.split(' ')[0] || 'Participant'}</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Ready to build something amazing? Let's get started on your hackathon journey.
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/app/projects"
              className="btn-primary px-8 py-4 text-lg font-semibold group"
            >
              <i className="uil uil-rocket mr-3 group-hover:animate-bounce"></i>
              Start Your Project
              <i className="uil uil-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <Link
              to="/app/teams"
              className="btn-secondary px-8 py-4 text-lg font-semibold"
            >
              <i className="uil uil-users-alt mr-3"></i>
              Join a Team
            </Link>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div className="glass-card rounded-2xl border p-6 mb-12 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-wrap justify-center gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={action.path}
                to={action.path}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border border-${action.color}-400/30 bg-${action.color}-400/10 hover:bg-${action.color}-400/20 hover:border-${action.color}-400/50 transition-all duration-300 group animate-scale-in`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className={`w-8 h-8 bg-${action.color}-400/20 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-400/30 transition-colors`}>
                  <i className={`uil ${action.icon} text-${action.color}-400 text-sm`}></i>
                </div>
                <span className="text-white font-medium">{action.label}</span>
                <i className={`uil uil-arrow-right text-${action.color}-400 text-sm group-hover:translate-x-1 transition-transform`}></i>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid xl:grid-cols-[1.2fr_1fr] gap-8">
          {/* Upcoming Deadlines Timeline */}
          <div className="glass-card rounded-2xl border animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <i className="uil uil-calendar-alt text-cyan-400"></i>
                Upcoming Deadlines
              </h2>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                View all →
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={deadline.id} className="flex items-start gap-4 group animate-slide-in-left" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl border-2 ${getStatusColor(deadline.status)} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <i className={`uil ${getTimelineIcon(deadline.type)} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold text-lg">{deadline.label}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(deadline.status)}`}>
                          {deadline.remaining}
                        </span>
                      </div>
                      <p className="text-text-muted text-sm mb-3">{deadline.date}</p>
                      <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                        View details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your Progress */}
          <div className="glass-card rounded-2xl border p-6 animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <i className="uil uil-chart-line text-violet-400"></i>
              Your Progress
            </h2>
            <div className="space-y-8">
              {/* Profile Completion */}
              <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-text-muted text-sm font-medium">Profile Completion</span>
                  <span className="text-white font-bold text-lg">{progress.profileCompletion}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 h-full rounded-full transition-all duration-1000 ease-out shadow-lg animate-glow-pulse"
                    style={{ width: `${progress.profileCompletion}%` }}
                  ></div>
                </div>
                <div className="flex gap-3 text-xs">
                  <Link to="/app/profile" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Add skills</Link>
                  <span className="text-text-muted">•</span>
                  <Link to="/app/profile" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Update bio</Link>
                </div>
              </div>

              {/* Team Status */}
              <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-text-muted text-sm font-medium">Team Status</span>
                  <span className="text-green-400 font-bold text-lg">{progress.teamStatus}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-full rounded-full shadow-lg" style={{ width: '100%' }}></div>
                </div>
                <div className="flex gap-3 text-xs">
                  <Link to="/app/teams" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">View team</Link>
                  <span className="text-text-muted">•</span>
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                    Invite members
                  </button>
                </div>
              </div>

              {/* Submission Status */}
              <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-text-muted text-sm font-medium">Submission Status</span>
                  <span className="text-yellow-400 font-bold text-lg">{progress.submissionStatus}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full shadow-lg" style={{ width: '60%' }}></div>
                </div>
                <div className="flex gap-3 text-xs">
                  <Link to="/app/submissions" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">View progress</Link>
                  <span className="text-text-muted">•</span>
                  <Link to="/app/projects" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Continue building</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ParticipantHome;
