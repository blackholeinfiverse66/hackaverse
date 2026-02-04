import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AnnouncementModal from './AnnouncementModal';

const AdminHome = () => {
  const { logout } = useAuth();
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  const [kpis] = useState({
    totalParticipants: 156,
    activeProjects: 42,
    submissions: 38,
    activeTeams: 35,
    deltas: { participants: '+12', projects: '+5', submissions: '+8', teams: '+3' }
  });

  const [recentActivity] = useState([
    { id: 1, event: 'New Submission', icon: 'uil-file-upload', scope: 'AI Campus Navigator / Team Alpha', actor: 'participant-001', when: '2 min ago', action: 'View' },
    { id: 2, event: 'Team Created', icon: 'uil-users-alt', scope: 'Team Delta', actor: 'participant-045', when: '15 min ago', action: 'View' },
    { id: 3, event: 'Judge Assigned', icon: 'uil-user-check', scope: 'Blockchain Voting / Team Beta', actor: 'admin-001', when: '1 hour ago', action: 'View' },
    { id: 4, event: 'Project Updated', icon: 'uil-edit', scope: 'AR Study Assistant / Team Gamma', actor: 'participant-023', when: '2 hours ago', action: 'View' },
    { id: 5, event: 'Registration', icon: 'uil-user-plus', scope: 'New Participant', actor: 'system', when: '3 hours ago', action: 'View' }
  ]);

  const [systemHealth] = useState({
    server: 'online',
    database: 'healthy',
    apiResponse: 145,
    uptime: '99.8%'
  });

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
              onClick={() => window.location.reload()}
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
            {recentActivity.map(activity => (
              <div key={activity.id} className="p-5 hover:bg-white/5 transition-colors">
                <div className="grid grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <i className={`uil ${activity.icon} text-cyan`}></i>
                    <span className="font-medium text-white">{activity.event}</span>
                  </div>
                  <span className="text-text-secondary text-sm truncate">{activity.scope}</span>
                  <span className="text-text-muted text-sm">{activity.actor}</span>
                  <span className="text-text-muted text-sm">{activity.when}</span>
                  <button
                    className="text-cyan hover:text-white text-sm"
                    onClick={() => window.open(`/admin/activities/${activity.id}`, '_blank')}
                  >
                    {activity.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* System Health */}
          <div className="glass-card rounded-2xl border p-5">
            <h2 className="text-lg font-semibold text-white mb-4">System Health</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Server</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(systemHealth.server)}`}>
                  {systemHealth.server}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Database</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(systemHealth.database)}`}>
                  {systemHealth.database}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">API Response</span>
                <span className="text-white font-medium">{systemHealth.apiResponse}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Uptime</span>
                <span className="text-success font-medium">{systemHealth.uptime}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card rounded-2xl border p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button
                className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => window.open('/admin/settings/judges', '_blank')}
              >
                <div className="font-medium text-white">Invite Judges</div>
                <div className="text-xs text-text-muted">Send invitations to new judges</div>
              </button>
              <button
                className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => window.open('/admin/settings/tracks', '_blank')}
              >
                <div className="font-medium text-white">Sync Categories</div>
                <div className="text-xs text-text-muted">Update tracks and categories</div>
              </button>
              <button className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors">
                <div className="font-medium text-white">Open Submissions</div>
                <div className="text-xs text-text-muted">Enable submission window</div>
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
          // TODO: Implement API call to send announcement
        }}
      />
    </div>
  );
};

export default AdminHome;