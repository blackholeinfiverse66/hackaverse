import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiService } from '../../services/api';

const Teams = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filters, setFilters] = useState({
    search: searchParams.get('query') || '',
    track: 'all',
    sort: 'name'
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.teams.getAll();
        setTeams(response.data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        // Fallback to mock data for development
        if (import.meta.env.VITE_USE_MOCK_API !== 'false') {
          const mockTeams = [
            {
              id: 1,
              name: 'Team Alpha',
              tagline: 'Building the future with AI and machine learning',
              track: 'AI/ML',
              members: 4,
              projects: 2,
              rank: 1,
              avatar: null,
              openRoles: ['Frontend Developer', 'Data Scientist']
            },
            {
              id: 2,
              name: 'Team Beta',
              tagline: 'Revolutionizing finance with blockchain technology',
              track: 'Web3',
              members: 3,
              projects: 1,
              rank: 5,
              avatar: null,
              openRoles: ['Smart Contract Developer']
            },
            {
              id: 3,
              name: 'Team Gamma',
              tagline: 'Creating immersive gaming experiences',
              track: 'Gaming',
              members: 5,
              projects: 3,
              rank: 2,
              avatar: null,
              openRoles: ['Game Designer', '3D Artist']
            },
            {
              id: 4,
              name: 'Team Delta',
              tagline: 'Solving real-world problems with innovative solutions',
              track: 'Open Innovation',
              members: 4,
              projects: 2,
              rank: 8,
              avatar: null,
              openRoles: ['UI/UX Designer', 'Backend Developer']
            }
          ];
          setTeams(mockTeams);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(team => {
    if (filters.search && !team.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.track !== 'all' && team.track !== filters.track) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sort === 'name') return a.name.localeCompare(b.name);
    if (filters.sort === 'rank') return a.rank - b.rank;
    if (filters.sort === 'projects') return b.projects - a.projects;
    return 0;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setSearchParams({ query: filters.search });
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleReset = () => {
    setFilters({ search: '', track: 'all', sort: 'name' });
    setSearchParams({});
    setHasChanges(false);
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const handleApply = () => {
    setHasChanges(false);
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleCreateTeam = () => {
    navigate('/teams/create');
  };

  const handleViewTeam = (teamId) => {
    navigate(`/teams/${teamId}`);
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

  const getRankColor = (rank) => {
    if (rank <= 3) return 'text-warning bg-warning/20';
    if (rank <= 10) return 'text-success bg-success/20';
    return 'text-text-muted bg-gunmetal';
  };

  const TeamCard = ({ team, index }) => (
    <div
      className={`glass-card rounded-xl border border-white/10 p-5 hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/10/20 transition-all duration-300 cursor-pointer group hover:transform hover:scale-[1.02] hover:-translate-y-1 animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => handleViewTeam(team.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan to-violet rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{team.name.charAt(5)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-cyan transition-colors text-sm leading-tight">
              {team.name}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTrackColor(team.track)}`}>
              {team.track}
            </span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRankColor(team.rank)}`}>
          #{team.rank}
        </span>
      </div>

      <p className="text-text-secondary text-xs mb-3 line-clamp-2 leading-relaxed">{team.tagline}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <i className="uil uil-users-alt text-text-muted text-xs"></i>
              <span className="text-white">{team.members}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="uil uil-rocket text-text-muted text-xs"></i>
              <span className="text-white">{team.projects}</span>
            </div>
          </div>
        </div>
        {team.openRoles && team.openRoles.length > 0 && (
          <div className="text-xs text-text-muted">
            Open: {team.openRoles.slice(0, 2).join(', ')}
            {team.openRoles.length > 2 && ` +${team.openRoles.length - 2} more`}
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleViewTeam(team.id);
        }}
        className="btn-primary w-full py-2 text-sm relative overflow-hidden group/btn"
      >
        <span className="relative z-10">View Team</span>
        <div className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100 transition-transform duration-300 rounded"></div>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-white/10 rounded-lg w-40"></div>
            <div className="h-5 bg-white/5 rounded w-72"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[200px] bg-white/5 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Teams</h1>
            <p className="text-text-muted text-sm">Find teammates and collaborate on projects</p>
          </div>
          <button
            onClick={handleCreateTeam}
            className="px-5 py-2.5 bg-cyan hover:bg-cyan/80 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan/25 hover:scale-105 flex items-center gap-2"
          >
            <i className="uil uil-plus text-sm"></i>
            Create Team
          </button>
        </div>

        {/* Compact Filter Bar */}
        <div className="glass-card rounded-xl border border-white/10 p-4 shadow-lg">
          <div className="flex flex-wrap items-center gap-3">

            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <i className="uil uil-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted text-sm"></i>
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  onKeyPress={handleSearchSubmit}
                  className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Track Filter */}
            <select
              value={filters.track}
              onChange={(e) => handleFilterChange('track', e.target.value)}
              className={`px-3 py-2 bg-white/5 border rounded-full text-white text-sm focus:outline-none transition-all duration-200 ${
                filters.track !== 'all' ? 'border-cyan/50 shadow-lg shadow-cyan/10/20' : 'border-white/10'
              }`}
            >
              <option value="all">All Tracks</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Web3">Web3</option>
              <option value="Gaming">Gaming</option>
              <option value="Open Innovation">Open Innovation</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-cyan/50 focus:outline-none transition-colors"
            >
              <option value="name">Sort by Name</option>
              <option value="rank">Sort by Rank</option>
              <option value="projects">Sort by Projects</option>
            </select>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-text-secondary hover:text-white text-sm transition-all duration-200"
            >
              Reset
            </button>

            {/* Apply */}
            <button
              onClick={handleApply}
              disabled={!hasChanges}
              className="px-4 py-2 bg-cyan hover:bg-cyan/80 disabled:bg-white/5 disabled:text-text-muted text-black font-medium rounded-full text-sm transition-all duration-200 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Content */}
        {filteredTeams.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <i className="uil uil-users-alt text-2xl text-text-muted"></i>
              </div>
              <h3 className="text-xl font-semibold text-white">No teams found</h3>
              <p className="text-text-secondary max-w-sm">
                {filters.search ? `No teams match "${filters.search}"` : 'Be the first to create a team and start building amazing projects!'}
              </p>
              <button
                onClick={handleCreateTeam}
                className="px-6 py-3 bg-cyan hover:bg-cyan/80 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan/25 hover:scale-105 animate-pulse"
              >
                Create Your Team
              </button>
            </div>
          </div>
        ) : (
          <div className={`transition-all duration-500 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTeams.map((team, index) => (
                <TeamCard key={team.id} team={team} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
