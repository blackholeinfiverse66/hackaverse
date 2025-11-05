import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../ui/Toast';
import Sidebar from '../navigation/Sidebar';
import Topbar from '../ui/Topbar';
import AIMentorAssistant from '../ui/AIMentorAssistant';

const AuthenticatedLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const adminSidebarItems = [
    { icon: 'uil-dashboard', label: 'Dashboard', path: '/admin' },
    { icon: 'uil-rocket', label: 'Projects', path: '/admin/projects' },
    { icon: 'uil-users-alt', label: 'Participants', path: '/admin/participants' },
    { icon: 'uil-file-check-alt', label: 'Submissions', path: '/admin/submissions' },
    { icon: 'uil-cog', label: 'Settings', path: '/admin/settings' }
  ];

  const participantSidebarItems = [
    { icon: 'uil-home', label: 'Home', path: '/app' },
    { icon: 'uil-rocket', label: 'Projects', path: '/app/projects' },
    { icon: 'uil-users-alt', label: 'Teams', path: '/app/teams' },
    { icon: 'uil-file-upload-alt', label: 'Submissions', path: '/app/submissions' },
    { icon: 'uil-user-circle', label: 'Profile', path: '/app/profile' }
  ];

  const judgeSidebarItems = [
    { icon: 'uil-dashboard', label: 'Dashboard', path: '/judge' },
    { icon: 'uil-list-ul', label: 'Queue', path: '/judge/queue' },
    { icon: 'uil-chart-line', label: 'My Scores', path: '/judge/scores' },
    { icon: 'uil-file-alt', label: 'Logs', path: '/logs' }
  ];

  const getSidebarItems = () => {
    switch (user?.role) {
      case 'admin': return adminSidebarItems;
      case 'judge': return judgeSidebarItems;
      default: return participantSidebarItems;
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className="min-h-screen bg-bg-primary">
      <Topbar />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
      <AIMentorAssistant />
    </div>
  );
};

export default AuthenticatedLayout;