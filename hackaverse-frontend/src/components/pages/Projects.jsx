import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterToolbar from '../ui/FilterToolbar';
import { apiService } from '../../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    track: 'all',
    status: 'all',
    sort: 'newest'
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.projects.getAll();
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        // Fallback to mock data for development
        if (import.meta.env.VITE_USE_MOCK_API !== 'false') {
          const mockProjects = [
            { 
              id: 1, 
              title: 'AI Campus Navigator', 
              team: 'Team Alpha', 
              track: 'AI/ML', 
              status: 'submitted', 
              updated: '2 hours ago', 
              score: 92, 
              members: 4 
            },
            { 
              id: 2, 
              title: 'Blockchain Voting System', 
              team: 'Team Beta', 
              track: 'Web3', 
              status: 'in-progress', 
              updated: '1 day ago', 
              score: null, 
              members: 3 
            },
            { 
              id: 3, 
              title: 'AR Study Assistant', 
              team: 'Team Gamma', 
              track: 'Gaming', 
              status: 'draft', 
              updated: '3 hours ago', 
              score: null, 
              members: 5 
            }
          ];
          setProjects(mockProjects);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filters.search && !project.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.track !== 'all' && project.track !== filters.track) return false;
    if (filters.status !== 'all' && project.status !== filters.status) return false;
    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleReset = () => {
    setFilters({ search: '', track: 'all', status: 'all', sort: 'newest' });
    setHasChanges(false);
  };

  const handleApply = () => {
    setHasChanges(false);
  };

  const toolbarFilters = [
    {
      placeholder: 'Track',
      value: filters.track,
      onChange: (value) => handleFilterChange('track', value),
      options: [
        { value: 'all', label: 'All Tracks' },
        { value: 'AI/ML', label: 'AI/ML' },
        { value: 'Web3', label: 'Web3' },
        { value: 'Gaming', label: 'Gaming' },
        { value: 'Open Innovation', label: 'Open Innovation' }
      ]
    },
    {
      placeholder: 'Status',
      value: filters.status,
      onChange: (value) => handleFilterChange('status', value),
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'submitted', label: 'Submitted' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'draft', label: 'Draft' }
      ]
    },
    {
      placeholder: 'Sort',
      value: filters.sort,
      onChange: (value) => handleFilterChange('sort', value),
      options: [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'score', label: 'Score' }
      ]
    }
  ];

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
    <div className="glass-card rounded-xl border p-6 hover:border-cyan/30 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-cyan transition-colors leading-tight">
          {project.title}
        </h3>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center">
            <i className="uil uil-users-alt text-text-muted text-xs"></i>
          </div>
          <span className="text-text-secondary text-sm">{project.team}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTrackColor(project.track)}`}>
            {project.track}
          </span>
          <span className="text-text-muted text-xs">{project.members} members</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-xs text-text-muted">Updated {project.updated}</span>
        {project.score && (
          <div className="flex items-center gap-1.5">
            <i className="uil uil-trophy text-warning text-sm"></i>
            <span className="text-sm font-semibold text-white">{project.score}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-white/10 rounded-lg w-40"></div>
            <div className="h-5 bg-white/5 rounded w-72"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[200px] bg-white/5 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Projects</h1>
            <p className="text-text-muted">Build and showcase your hackathon projects</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-primary h-11 px-6" title="Create Project">
              <i className="uil uil-plus mr-2"></i>
              Create Project
            </button>
            <button className="btn-secondary h-11 w-11 flex items-center justify-center" title="Import">
              <i className="uil uil-upload-alt"></i>
            </button>
          </div>
        </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <FilterToolbar
            searchPlaceholder="Search projects..."
            searchValue={filters.search}
            onSearchChange={(value) => handleFilterChange('search', value)}
            filters={toolbarFilters}
            onReset={handleReset}
            onApply={handleApply}
            hasChanges={hasChanges}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              viewMode === 'grid' ? 'bg-cyan text-black shadow-lg' : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
            }`}
          >
            <i className="uil uil-apps text-sm"></i>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
              viewMode === 'table' ? 'bg-cyan text-black shadow-lg' : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
            }`}
          >
            <i className="uil uil-list-ul text-sm"></i>
          </button>
        </div>
      </div>

      {/* Bulk Actions (Table View) */}
      {viewMode === 'table' && selectedItems.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-cyan/10 border border-cyan/30 rounded-2xl">
          <span className="text-cyan font-medium">{selectedItems.length} selected</span>
          <div className="flex gap-2">
            <button className="btn-primary h-10 px-4 text-sm">Open</button>
            <button className="btn-secondary h-10 px-4 text-sm">Submit</button>
            <button className="btn-secondary h-10 px-4 text-sm">Archive</button>
          </div>
        </div>
      )}

      {/* Content */}
      {filteredProjects.length === 0 ? (
        <div className="glass-card rounded-xl border p-16 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="uil uil-rocket text-3xl text-text-muted"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">No projects found</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            {filters.search ? `No projects match "${filters.search}"` : 'Start building something amazing and showcase your work!'}
          </p>
          <button className="btn-primary px-8 py-3">
            <i className="uil uil-plus mr-2"></i>
            Create Your First Project
          </button>
        </div>
      ) : viewMode === 'grid' ? (
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
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[320px]">Project</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[180px]">Team</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[120px]">Track</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[120px]">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[120px]">Score</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[160px]">Updated</th>
                  <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[140px]">Actions</th>
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
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-white">{project.score || '—'}</td>
                    <td className="px-5 py-3 text-text-muted text-sm">{project.updated}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-cyan hover:text-white text-sm">Open</button>
                        <button className="text-text-muted hover:text-white text-sm">Menu</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Projects;