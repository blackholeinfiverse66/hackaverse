import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSyncContext } from '../../contexts/SyncContext';
import { useNavigate } from 'react-router-dom';
import AnnouncementModal from './AnnouncementModal';
import { useToast, ToastContainer } from '../../hooks/useToast.jsx';
import { ConfirmDialog } from '../ui/ConfirmDialog';

const AdminHome = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { teams, hackathons, submissions, activities } = useSyncContext();
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const { toasts, success, error: showError } = useToast();

  const [kpis, setKpis] = useState({
    totalParticipants: 0,
    activeProjects: 0,
    submissions: 0,
    activeTeams: 0,
    deltas: { participants: '+0', projects: '+0', submissions: '+0', teams: '+0' }
  });

  useEffect(() => {
    const uniqueParticipants = new Set();
    teams.forEach(team => {
      team.members?.forEach(member => {
        const memberId = typeof member === 'object' ? member.user_id : member;
        uniqueParticipants.add(memberId);
      });
    });

    setKpis({
      totalParticipants: uniqueParticipants.size,
      activeProjects: submissions.length,
      submissions: submissions.length,
      activeTeams: teams.length,
      deltas: { participants: '+0', projects: '+0', submissions: '+0', teams: '+0' }
    });
  }, [teams, submissions]);

  const getActivityIcon = (type) => {
    const icons = {
      'hackathon_created': 'uil-trophy',
      'team_created': 'uil-users-alt',
      'submission': 'uil-file-upload',
      'judge_assigned': 'uil-user-check',
      'project_updated': 'uil-edit',
      'registration': 'uil-user-plus'
    };
    return icons[type] || 'uil-clipboard-notes';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const KPICard = ({ icon, value, label, delta }) => (
    <div className="glass-card rounded-2xl border p-5 h-[120px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="w-5 h-5 bg-cyan/20 rounded flex items-center justify-center">
          <i className={`uil ${icon} text-cyan text-sm`}></i>
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'healthy': return 'text-success bg-success/20';
      case 'degraded': return 'text-warning bg-warning/20';
      case 'offline': return 'text-error bg-error/20';
      default: return 'text-text-muted bg-gunmetal';
    }
  };

  return (
    <div className="min-h-screen pt-0 ">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-text-muted">Season 02 / 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn-primary h-11 px-6"
              title="Create Announcement"
              onClick={() => setIsAnnouncementModalOpen(true)}
            >
              <i className="uil uil-megaphone mr-2"></i>
              Announce
            </button>
            <button
              className="btn-secondary h-11 w-11 flex items-center justify-center"
              title="Refresh"
            >
              <i className="uil uil-refresh"></i>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
            icon="uil-users-alt" 
            value={kpis.totalParticipants} 
            label="Total Participants" 
            delta={kpis.deltas.participants}
          />
          <KPICard 
            icon="uil-rocket" 
            value={kpis.activeProjects} 
            label="Active Projects" 
            delta={kpis.deltas.projects}
          />
          <KPICard 
            icon="uil-file-upload" 
            value={kpis.submissions} 
            label="Submissions" 
            delta={kpis.deltas.submissions}
          />
          <KPICard 
            icon="uil-sitemap" 
            value={kpis.activeTeams} 
            label="Active Teams" 
            delta={kpis.deltas.teams}
          />
        </div>

        <div className="grid xl:grid-cols-[1.5fr_1fr] lg:grid-cols-1 gap-6">
          {/* Recent Activity */}
          <div className="glass-card rounded-2xl border">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              <button
                className="text-cyan hover:text-white text-sm"
                onClick={() => window.open('/admin/activities', '_blank')}
              >
                View all
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {activities.length === 0 ? (
                <div className="p-12 text-center">
                  <i className="uil uil-clipboard-notes text-4xl text-text-muted mb-4"></i>
                  <h3 className="text-lg font-semibold text-white mb-2">No recent activity</h3>
                  <p className="text-text-muted">Activity will appear here as events occur</p>
                </div>
              ) : (
                activities.slice(0, 10).map(activity => (
                  <div key={activity._id || activity.id} className="p-5 hover:bg-white/5 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-cyan/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`uil ${getActivityIcon(activity.activity_type)} text-cyan`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white">{activity.title}</div>
                        <div className="text-sm text-text-secondary mt-1">{activity.description}</div>
                        <div className="text-xs text-text-muted mt-2">
                          {activity.actor_name} • {formatTimestamp(activity.timestamp || activity.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* System Health */}
            <div className="glass-card rounded-2xl border p-5">
              <h2 className="text-lg font-semibold text-white mb-4">System Health</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Server</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor('online')}`}>
                    online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Database</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor('healthy')}`}>
                    healthy
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">API Response</span>
                  <span className="text-white font-medium">145ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Uptime</span>
                  <span className="text-success font-medium">99.8%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl border p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3"
                  onClick={() => navigate('/admin/hackathons')}
                >
                  <i className="uil uil-plus-circle text-cyan text-xl"></i>
                  <div>
                    <div className="font-medium text-white">Create Hackathon</div>
                    <div className="text-xs text-text-muted">Start a new hackathon event</div>
                  </div>
                </button>
                <button
                  className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3"
                  onClick={() => navigate('/admin/participants')}
                >
                  <i className="uil uil-user-plus text-cyan text-xl"></i>
                  <div>
                    <div className="font-medium text-white">Invite Participants</div>
                    <div className="text-xs text-text-muted">Send invitations to participants</div>
                  </div>
                </button>
                <button
                  className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3"
                  onClick={() => navigate('/admin/settings')}
                >
                  <i className="uil uil-user-check text-cyan text-xl"></i>
                  <div>
                    <div className="font-medium text-white">Invite Judges</div>
                    <div className="text-xs text-text-muted">Add judges to evaluate projects</div>
                  </div>
                </button>
                <button
                  className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3"
                  onClick={() => navigate('/admin/projects')}
                >
                  <i className="uil uil-rocket text-cyan text-xl"></i>
                  <div>
                    <div className="font-medium text-white">View Projects</div>
                    <div className="text-xs text-text-muted">Browse all submitted projects</div>
                  </div>
                </button>
                <button
                  className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3"
                  onClick={() => navigate('/admin/participants')}
                >
                  <i className="uil uil-users-alt text-cyan text-xl"></i>
                  <div>
                    <div className="font-medium text-white">Manage Participants</div>
                    <div className="text-xs text-text-muted">View and manage all participants</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        onSend={(data) => {
          console.log('Sending announcement:', data);
        }}
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default AdminHome;
