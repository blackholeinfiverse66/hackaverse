import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const JudgeHome = () => {
  const { user } = useAuth();
  const [stats] = useState({
    pendingReviews: 23,
    completedReviews: 45,
    averageScore: 7.8,
    totalSubmissions: 68,
    deltas: { pending: '+3', completed: '+12', avgScore: '+0.2', total: '+5' }
  });

  const [recentSubmissions] = useState([
    { id: 1, title: 'AI Campus Navigator', team: 'Team Alpha', track: 'AI/ML', status: 'pending', updated: '2 hours ago' },
    { id: 2, title: 'Smart Waste Management', team: 'Team Delta', track: 'Open Innovation', status: 'pending', updated: '4 hours ago' },
    { id: 3, title: 'Blockchain Voting', team: 'Team Beta', track: 'Web3', status: 'scored', updated: '1 day ago' },
    { id: 4, title: 'AR Study Assistant', team: 'Team Gamma', track: 'Gaming', status: 'pending', updated: '1 day ago' }
  ]);

  const StatCard = ({ icon, value, label, delta, color }) => (
    <div className="glass-card rounded-2xl border p-5 h-[120px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className={`w-5 h-5 bg-${color}/20 rounded flex items-center justify-center`}>
          <i className={`uil ${icon} text-${color} text-sm`}></i>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${
          delta.startsWith('+') ? 'text-success bg-success/20' : 'text-error bg-error/20'
        }`}>
          {delta}
        </span>
      </div>
      <div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-text-muted">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-6 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-text-muted text-sm mt-1">S02 / 2025</p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1.5fr_1fr] lg:grid-cols-1 gap-6">
        <div className="space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon="uil-clock" 
              value={stats.pendingReviews} 
              label="Pending Reviews" 
              delta={stats.deltas.pending}
              color="warning"
            />
            <StatCard 
              icon="uil-check" 
              value={stats.completedReviews} 
              label="Completed" 
              delta={stats.deltas.completed}
              color="success"
            />
            <StatCard 
              icon="uil-star" 
              value={stats.averageScore} 
              label="Avg Score" 
              delta={stats.deltas.avgScore}
              color="cyan"
            />
            <StatCard 
              icon="uil-file-alt" 
              value={stats.totalSubmissions} 
              label="Total Submissions" 
              delta={stats.deltas.total}
              color="violet"
            />
          </div>

          {/* Recent Submissions */}
          <div className="glass-card rounded-2xl border">
            <div className="p-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Recent Submissions</h2>
            </div>
            <div className="divide-y divide-white/5">
              {recentSubmissions.map(submission => (
                <div key={submission.id} className="p-5 hover:bg-white/5 transition-colors cursor-pointer h-16 flex items-center">
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 w-full items-center">
                    <div className="min-w-0">
                      <div className="font-medium text-white truncate">{submission.title}</div>
                      <div className="text-sm text-text-muted">{submission.team} • {submission.track}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                      submission.status === 'pending' 
                        ? 'bg-warning/20 text-warning' 
                        : 'bg-success/20 text-success'
                    }`}>
                      {submission.status}
                    </span>
                    <div className="text-sm text-text-muted">{submission.updated}</div>
                    <button className="text-cyan hover:text-white transition-colors text-sm w-fit h-10 px-3 rounded border border-cyan/30 hover:bg-cyan/10">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="glass-card rounded-2xl border p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/judge/queue" className="block">
                <button className="w-full btn-primary h-12 text-left px-4 flex items-center">
                  <i className="uil uil-list-ul mr-3 text-xl"></i>
                  <div>
                    <div className="font-medium">View Queue</div>
                    <div className="text-xs opacity-80">Review pending submissions</div>
                  </div>
                </button>
              </Link>
              <Link to="/judge/scores" className="block">
                <button className="w-full btn-secondary h-12 text-left px-4 flex items-center">
                  <i className="uil uil-chart-line mr-3 text-xl"></i>
                  <div>
                    <div className="font-medium">My Scores</div>
                    <div className="text-xs opacity-70">View scoring history</div>
                  </div>
                </button>
              </Link>
              <button className="w-full btn-secondary h-12 text-left px-4 flex items-center">
                <i className="uil uil-download-alt mr-3 text-xl"></i>
                <div>
                  <div className="font-medium">Export Results</div>
                  <div className="text-xs opacity-70">Download CSV report</div>
                </div>
              </button>
              <button className="w-full btn-secondary h-12 text-left px-4 flex items-center">
                <i className="uil uil-book-open mr-3 text-xl"></i>
                <div>
                  <div className="font-medium">Guidelines</div>
                  <div className="text-xs opacity-70">Judging criteria</div>
                </div>
              </button>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="glass-card rounded-2xl border p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center h-11">
                <span className="text-text-secondary">Review Session</span>
                <span className="text-white font-medium">2:00 PM - 4:00 PM</span>
              </div>
              <div className="flex justify-between items-center h-11">
                <span className="text-text-secondary">Final Scoring</span>
                <span className="text-white font-medium">4:30 PM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center h-11">
                <span className="text-text-secondary">Deliberation</span>
                <span className="text-white font-medium">6:30 PM - 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeHome;