import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ParticipantHome = () => {
  const { user } = useAuth();
  
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-error bg-error/20';
      case 'warning': return 'text-warning bg-warning/20';
      case 'info': return 'text-cyan bg-cyan/20';
      default: return 'text-text-muted bg-gunmetal';
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-6 py-6 space-y-6">
      {/* Welcome Band */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name?.split(' ')[0] || 'Participant'}!</h1>
          <p className="text-text-muted mt-1">Ready to build something amazing and make your mark in the hackathon?</p>
        </div>

        {/* Action Cards Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl border p-5 h-[140px] flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-cyan/20 rounded-lg flex items-center justify-center">
                <i className="uil uil-users-alt text-cyan text-lg"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">Join a Team</h3>
                <p className="text-text-secondary text-sm">Connect with talented developers and designers</p>
              </div>
            </div>
            <Link to="/app/teams" className="btn-primary w-fit px-6">
              Find Teams
            </Link>
          </div>

          <div className="glass-card rounded-2xl border p-5 h-[140px] flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-violet/20 rounded-lg flex items-center justify-center">
                <i className="uil uil-rocket text-violet text-lg"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">Start Your Project</h3>
                <p className="text-text-secondary text-sm">Begin building your hackathon submission</p>
              </div>
            </div>
            <Link to="/app/projects" className="btn-primary w-fit px-6">
              Create Project
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl border p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/app/projects" className="flex flex-col items-center gap-3 p-4 h-24 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
            <i className="uil uil-rocket text-cyan text-xl group-hover:scale-110 transition-transform"></i>
            <span className="text-white text-sm font-medium">Start Project</span>
          </Link>
          <Link to="/app/teams" className="flex flex-col items-center gap-3 p-4 h-24 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
            <i className="uil uil-users-alt text-violet text-xl group-hover:scale-110 transition-transform"></i>
            <span className="text-white text-sm font-medium">Join Team</span>
          </Link>
          <Link to="/app/submissions" className="flex flex-col items-center gap-3 p-4 h-24 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
            <i className="uil uil-file-upload text-lime text-xl group-hover:scale-110 transition-transform"></i>
            <span className="text-white text-sm font-medium">Submit Work</span>
          </Link>
          <Link to="/app/profile" className="flex flex-col items-center gap-3 p-4 h-24 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
            <i className="uil uil-user-circle text-warning text-xl group-hover:scale-110 transition-transform"></i>
            <span className="text-white text-sm font-medium">Edit Profile</span>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Upcoming Deadlines */}
        <div className="glass-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {upcomingDeadlines.map(deadline => (
              <div key={deadline.id} className="flex items-center justify-between h-14 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-8 bg-gradient-to-b from-cyan to-violet rounded-full"></div>
                  <div>
                    <div className="font-medium text-white">{deadline.label}</div>
                    <div className="text-xs text-text-muted">{deadline.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deadline.status)}`}>
                    {deadline.remaining}
                  </span>
                  <button className="text-text-muted hover:text-white transition-colors">
                    <i className="uil uil-calendar-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Progress */}
        <div className="glass-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Your Progress</h2>
          <div className="space-y-6">
            {/* Profile Completion */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary text-sm">Profile Completion</span>
                <span className="text-white font-medium">{progress.profileCompletion}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-cyan to-violet h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progress.profileCompletion}%` }}
                ></div>
              </div>
              <div className="flex gap-2 text-xs">
                <Link to="/app/profile" className="text-cyan hover:text-white transition-colors">Add skills</Link>
                <span className="text-text-muted">•</span>
                <Link to="/app/profile" className="text-cyan hover:text-white transition-colors">Update bio</Link>
              </div>
            </div>

            {/* Team Status */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary text-sm">Team Status</span>
                <span className="text-success font-medium">{progress.teamStatus}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex gap-2 text-xs">
                <Link to="/app/teams" className="text-cyan hover:text-white transition-colors">View team</Link>
                <span className="text-text-muted">•</span>
                <button className="text-cyan hover:text-white transition-colors">Invite members</button>
              </div>
            </div>

            {/* Submission Status */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary text-sm">Submission Status</span>
                <span className="text-warning font-medium">{progress.submissionStatus}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="flex gap-2 text-xs">
                <Link to="/app/submissions" className="text-cyan hover:text-white transition-colors">View progress</Link>
                <span className="text-text-muted">•</span>
                <Link to="/app/projects" className="text-cyan hover:text-white transition-colors">Continue building</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantHome;