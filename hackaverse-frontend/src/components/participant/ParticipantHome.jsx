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
    <div className="min-h-screen pt-0">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Welcome back, {user?.name?.split(' ')[0] || 'Participant'}
            </h1>
            <p className="text-text-muted">Track your progress and explore new opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn-primary h-11 px-6"
              title="Quick Start"
              onClick={() => console.log('Quick start clicked')}
            >
              <i className="uil uil-play mr-2"></i>
              Quick Start
            </button>
            <button
              className="btn-secondary h-11 w-11 flex items-center justify-center"
              title="Help"
              onClick={() => console.log('Help clicked')}
            >
              <i className="uil uil-question-circle"></i>
            </button>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/app/teams"
            className="glass-card rounded-xl border p-6 hover:border-cyan/30 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                <i className="uil uil-users-alt text-cyan text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Join a Team</h3>
                <p className="text-text-secondary">Connect with talented developers and designers</p>
              </div>
            </div>
            <div className="text-cyan text-sm font-medium group-hover:text-cyan/80 transition-colors">
              Find Teams →
            </div>
          </Link>

          <Link
            to="/app/projects"
            className="glass-card rounded-xl border p-6 hover:border-violet/30 transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-violet/10 rounded-lg flex items-center justify-center group-hover:bg-violet/20 transition-colors">
                <i className="uil uil-rocket text-violet text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Start Your Project</h3>
                <p className="text-text-secondary">Begin building your hackathon submission</p>
              </div>
            </div>
            <div className="text-violet text-sm font-medium group-hover:text-violet/80 transition-colors">
              Create Project →
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-xl border p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/app/projects"
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 bg-cyan/10 rounded-lg flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                <i className="uil uil-rocket text-cyan text-lg"></i>
              </div>
              <span className="text-white text-sm font-medium">Start Project</span>
            </Link>
            <Link
              to="/app/teams"
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 bg-violet/10 rounded-lg flex items-center justify-center group-hover:bg-violet/20 transition-colors">
                <i className="uil uil-users-alt text-violet text-lg"></i>
              </div>
              <span className="text-white text-sm font-medium">Join Team</span>
            </Link>
            <Link
              to="/app/submissions"
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 bg-lime/10 rounded-lg flex items-center justify-center group-hover:bg-lime/20 transition-colors">
                <i className="uil uil-file-upload text-lime text-lg"></i>
              </div>
              <span className="text-white text-sm font-medium">Submit Work</span>
            </Link>
            <Link
              to="/app/profile"
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                <i className="uil uil-user-circle text-orange text-lg"></i>
              </div>
              <span className="text-white text-sm font-medium">Edit Profile</span>
            </Link>
          </div>
        </div>

        <div className="grid xl:grid-cols-[1.5fr_1fr] lg:grid-cols-1 gap-6">
          {/* Upcoming Deadlines */}
          <div className="glass-card rounded-2xl border">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Upcoming Deadlines</h2>
              <button className="text-cyan hover:text-white text-sm">View all</button>
            </div>
            <div className="divide-y divide-white/5">
              {upcomingDeadlines.map(deadline => (
                <div key={deadline.id} className="p-5 hover:bg-white/5 transition-colors h-16 flex items-center">
                  <div className="grid grid-cols-[auto_2fr_1fr_auto] gap-4 w-full items-center">
                    <div className="flex items-center gap-3">
                      <i className={`uil ${deadline.type === 'submission' ? 'uil-file-upload' : deadline.type === 'team' ? 'uil-users-alt' : 'uil-calendar-alt'} text-cyan`}></i>
                      <span className="font-medium text-white">{deadline.label}</span>
                    </div>
                    <span className="text-text-secondary text-sm">{deadline.date}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${getStatusColor(deadline.status)}`}>
                      {deadline.remaining}
                    </span>
                    <button
                      className="text-cyan hover:text-white text-sm"
                      onClick={() => console.log(`View ${deadline.label} clicked`)}
                    >
                      View
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
                  <button
                    className="text-cyan hover:text-white transition-colors"
                    onClick={() => console.log('Invite members clicked')}
                  >
                    Invite members
                  </button>
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
    </div>
  );
};

export default ParticipantHome;