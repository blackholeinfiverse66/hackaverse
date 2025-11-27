import { useState, useEffect } from 'react';
import FilterToolbar from '../ui/FilterToolbar';
import { apiService } from '../../services/api';

const Teams = () => {
  const [filters, setFilters] = useState({
    search: '',
    sort: 'name',
    track: 'all'
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Team Alpha',
      tagline: 'Building the future with AI and machine learning',
      track: 'AI/ML',
      members: 4,
      projects: 2,
      rank: 1,
      avatar: null
    },
    {
      id: 2,
      name: 'Team Beta',
      tagline: 'Revolutionizing finance with blockchain technology',
      track: 'Web3',
      members: 3,
      projects: 1,
      rank: 5,
      avatar: null
    },
    {
      id: 3,
      name: 'Team Gamma',
      tagline: 'Creating immersive gaming experiences',
      track: 'Gaming',
      members: 5,
      projects: 3,
      rank: 2,
      avatar: null
    },
    {
      id: 4,
      name: 'Team Delta',
      tagline: 'Solving real-world problems with innovative solutions',
      track: 'Open Innovation',
      members: 4,
      projects: 2,
      rank: 8,
      avatar: null
    }
  ]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.teams.getAll();
        setTeams(response.data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        // Keep fallback mock data
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
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleReset = () => {
    setFilters({ search: '', sort: 'name', track: 'all' });
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
      placeholder: 'Sort',
      value: filters.sort,
      onChange: (value) => handleFilterChange('sort', value),
      options: [
        { value: 'name', label: 'Name' },
        { value: 'rank', label: 'Rank' },
        { value: 'projects', label: 'Projects' }
      ]
    }
  ];

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

  const TeamCard = ({ team }) => (
    <div className="glass-card rounded-2xl border p-5 h-[220px] flex flex-col hover:border-cyan/50 transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan to-violet rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{team.name.charAt(5)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{team.name}</h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getTrackColor(team.track)}`}>
              {team.track}
            </span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getRankColor(team.rank)}`}>
          #{team.rank}
        </span>
      </div>
      
      <p className="text-text-secondary text-sm mb-4 flex-1 line-clamp-2">{team.tagline}</p>
      
      <div className="flex justify-between items-center mb-4 text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <i className="uil uil-users-alt text-text-muted"></i>
            <span className="text-white">{team.members}</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="uil uil-rocket text-text-muted"></i>
            <span className="text-white">{team.projects}</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setSelectedTeam(team)}
        className="btn-primary w-full"
      >
        View Team
      </button>
    </div>
  );

  const TeamDetailDrawer = ({ team, onClose }) => (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan to-violet rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{team.name.charAt(5)}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">{team.name}</h2>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTrackColor(team.track)}`}>
                    {team.track}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRankColor(team.rank)}`}>
                    Rank #{team.rank}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-text-muted hover:text-white transition-colors"
            >
              <i className="uil uil-times text-lg"></i>
            </button>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed">{team.tagline}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-3">
            <button className="btn-primary flex-1 py-2.5 text-sm font-medium">Request to Join</button>
            <button className="btn-secondary flex-1 py-2.5 text-sm font-medium">Message Team</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-cyan mb-1">{team.members}</div>
              <div className="text-sm text-text-muted font-medium">Members</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-violet mb-1">{team.projects}</div>
              <div className="text-sm text-text-muted font-medium">Projects</div>
            </div>
          </div>
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
            <h1 className="text-4xl font-bold text-white">Teams</h1>
            <p className="text-text-muted">Find teammates and collaborate on projects</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-primary h-11 px-6" title="Create Team">
              <i className="uil uil-plus mr-2"></i>
              Create Team
            </button>
            <button className="btn-secondary h-11 w-11 flex items-center justify-center" title="Import">
              <i className="uil uil-upload-alt"></i>
            </button>
          </div>
        </div>

        {/* Filters */}
        <FilterToolbar
          searchPlaceholder="Search teams..."
          searchValue={filters.search}
          onSearchChange={(value) => handleFilterChange('search', value)}
          filters={toolbarFilters}
          onReset={handleReset}
          onApply={handleApply}
          hasChanges={hasChanges}
        />
      </div>

      {/* Teams Grid */}
      {filteredTeams.length === 0 ? (
        <div className="glass-card rounded-xl border p-16 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="uil uil-users-alt text-3xl text-text-muted"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">No teams found</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            {filters.search ? `No teams match "${filters.search}"` : 'Be the first to create a team and start building amazing projects!'}
          </p>
          <button className="btn-primary px-8 py-3">
            <i className="uil uil-plus mr-2"></i>
            Create Your Team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}

      {selectedTeam && (
        <TeamDetailDrawer
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
};

export default Teams;