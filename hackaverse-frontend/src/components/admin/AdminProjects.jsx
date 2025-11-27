import { useState } from 'react';

const AdminProjects = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    track: 'all',
    status: 'all',
    sort: 'newest'
  });
  const [selectedItems] = useState([]);

  const [projects] = useState([
    {
      id: 1,
      title: 'AI Campus Navigator',
      team: 'Team Alpha',
      track: 'AI/ML',
      members: 4,
      updated: '2 hours ago',
      score: 8.5,
      status: 'submitted'
    },
    {
      id: 2,
      title: 'Blockchain Voting System',
      team: 'Team Beta',
      track: 'Web3',
      members: 3,
      updated: '1 day ago',
      score: null,
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'AR Study Assistant',
      team: 'Team Gamma',
      track: 'Gaming',
      members: 5,
      updated: '3 hours ago',
      score: 7.2,
      status: 'submitted'
    }
  ]);

  const tracks = ['all', 'AI/ML', 'Web3', 'Gaming', 'Open Innovation'];
  const statuses = ['all', 'submitted', 'in-progress', 'draft'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'score', label: 'Score' }
  ];

  const filteredProjects = projects.filter(project => {
    if (filters.search && !project.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.track !== 'all' && project.track !== filters.track) return false;
    if (filters.status !== 'all' && project.status !== filters.status) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'text-success bg-success/20';
      case 'in-progress': return 'text-warning bg-warning/20';
      case 'draft': return 'text-text-muted bg-gunmetal';
      default: return 'text-text-muted bg-gunmetal';
    }
  };

  const getTrackColor = (track) => {
    switch (track) {
      case 'AI/ML': return 'text-cyan bg-cyan/20';
      case 'Web3': return 'text-violet bg-violet/20';
      case 'Gaming': return 'text-lime bg-lime/20';
      case 'Open Innovation': return 'text-warning bg-warning/20';
      default: return 'text-text-muted bg-gunmetal';
    }
  };

  const ProjectCard = ({ project }) => (
    <div className="glass-card rounded-2xl border p-5 hover:bg-white/5 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-white">{project.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Team</span>
          <span className="text-white">{project.team}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Track</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getTrackColor(project.track)}`}>
            {project.track}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Members</span>
          <span className="text-white">{project.members}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Score</span>
          <span className="text-white">{project.score || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Updated</span>
          <span className="text-text-muted">{project.updated}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-0">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Projects</h1>
            <p className="text-text-muted">Manage and track hackathon projects</p>
          </div>
          <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`h-11 w-11 flex items-center justify-center rounded-xl transition-colors ${
              viewMode === 'grid' ? 'bg-cyan text-charcoal' : 'bg-white/10 text-text-secondary hover:text-white'
            }`}
          >
            <i className="uil uil-apps"></i>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`h-11 w-11 flex items-center justify-center rounded-xl transition-colors ${
              viewMode === 'table' ? 'bg-cyan text-charcoal' : 'bg-white/10 text-text-secondary hover:text-white'
            }`}
          >
            <i className="uil uil-list-ul"></i>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search projects..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          className="form-control h-11 w-64"
        />
        <select
          value={filters.track}
          onChange={(e) => setFilters({...filters, track: e.target.value})}
          className="form-control h-11 w-48"
        >
          {tracks.map(track => (
            <option key={track} value={track}>
              {track === 'all' ? 'All Tracks' : track}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          className="form-control h-11 w-32"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({...filters, sort: e.target.value})}
          className="form-control h-11 w-32"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Bulk Actions (Table View) */}
      {viewMode === 'table' && selectedItems.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-cyan/10 border border-cyan/30 rounded-2xl">
          <span className="text-cyan font-medium">{selectedItems.length} selected</span>
          <div className="flex gap-2">
            <button className="btn-primary h-10 px-4 text-sm">Approve</button>
            <button className="btn-secondary h-10 px-4 text-sm">Return with Feedback</button>
            <button className="btn-secondary h-10 px-4 text-sm">Archive</button>
          </div>
        </div>
      )}

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-card border-b border-white/10">
                <tr className="h-12">
                  <th className="text-left px-5 py-3 w-12">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[300px]">Title</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[150px]">Team</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[120px]">Track</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[100px]">Members</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[100px]">Score</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[120px]">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[140px]">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(project => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors h-14">
                    <td className="px-5 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-white">{project.title}</div>
                    </td>
                    <td className="px-5 py-3 text-text-secondary">{project.team}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTrackColor(project.track)}`}>
                        {project.track}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-white">{project.members}</td>
                    <td className="px-5 py-3 text-white">{project.score || '—'}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-text-muted text-sm">{project.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="glass-card rounded-2xl border p-12 text-center">
          <i className="uil uil-rocket text-4xl text-text-muted mb-4"></i>
          <h3 className="text-lg font-semibold text-white mb-2">No projects found</h3>
          <p className="text-text-muted">No projects match your current filter criteria.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminProjects;