import React, { useState } from 'react';
import FilterToolbar from '../ui/FilterToolbar';

const Submissions = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    search: '',
    track: 'all',
    stage: 'all',
    sort: 'newest'
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const [submissions] = useState([
    {
      id: 1,
      project: 'AI Campus Navigator',
      team: 'Team Alpha',
      status: 'scoring',
      stage: 'technical',
      score: 92,
      submitted: '2024-03-07 14:30',
      track: 'AI/ML',
      repoUrl: 'github.com/alpha/ai-nav',
      demoUrl: 'demo.ai-nav.com',
      judges: ['judge-001', 'judge-002']
    },
    {
      id: 2,
      project: 'Blockchain Voting',
      team: 'Team Beta',
      status: 'passed',
      stage: 'final',
      score: 88,
      submitted: '2024-03-06 16:45',
      track: 'Web3',
      repoUrl: 'github.com/beta/voting',
      demoUrl: null,
      judges: ['judge-001', 'judge-003']
    },
    {
      id: 3,
      project: 'AR Study Assistant',
      team: 'Team Gamma',
      status: 'queued',
      stage: 'initial',
      score: null,
      submitted: '2024-03-05 12:15',
      track: 'Gaming',
      repoUrl: 'github.com/gamma/ar-study',
      demoUrl: 'ar-study.demo.com',
      judges: []
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All', count: submissions.length },
    { id: 'queued', label: 'Queued', count: submissions.filter(s => s.status === 'queued').length },
    { id: 'scoring', label: 'Scoring', count: submissions.filter(s => s.status === 'scoring').length },
    { id: 'passed', label: 'Passed', count: submissions.filter(s => s.status === 'passed').length },
    { id: 'failed', label: 'Failed', count: submissions.filter(s => s.status === 'failed').length }
  ];

  

  const filteredSubmissions = submissions.filter(submission => {
    if (activeTab !== 'all' && submission.status !== activeTab) return false;
    if (filters.search && !submission.project.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.track !== 'all' && submission.track !== filters.track) return false;
    if (filters.stage !== 'all' && submission.stage !== filters.stage) return false;
    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleReset = () => {
    setFilters({ search: '', track: 'all', stage: 'all', sort: 'newest' });
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
      placeholder: 'Stage',
      value: filters.stage,
      onChange: (value) => handleFilterChange('stage', value),
      options: [
        { value: 'all', label: 'All Stages' },
        { value: 'initial', label: 'Initial' },
        { value: 'technical', label: 'Technical' },
        { value: 'final', label: 'Final' }
      ]
    },
    {
      placeholder: 'Sort',
      value: filters.sort,
      onChange: (value) => handleFilterChange('sort', value),
      options: [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'priority', label: 'Priority' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success bg-success/20';
      case 'failed': return 'text-error bg-error/20';
      case 'scoring': return 'text-warning bg-warning/20';
      case 'queued': return 'text-cyan bg-cyan/20';
      default: return 'text-text-muted bg-gunmetal';
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'final': return 'text-success bg-success/20';
      case 'technical': return 'text-warning bg-warning/20';
      case 'initial': return 'text-text-muted bg-gunmetal';
      default: return 'text-text-muted bg-gunmetal';
    }
  };

  const SubmissionDrawer = ({ submission, onClose }) => (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
      <div className="glass-card w-full max-w-[700px] max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white">{submission.project}</h2>
            <p className="text-text-muted text-sm">{submission.team} • {submission.track}</p>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-white p-1">
            <i className="uil uil-times text-xl"></i>
          </button>
        </div>
        
        <div className="p-5 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Links & Resources</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-text-secondary text-sm">Repository</label>
                  <div className="text-cyan hover:text-white cursor-pointer">{submission.repoUrl}</div>
                </div>
                {submission.demoUrl && (
                  <div>
                    <label className="text-text-secondary text-sm">Demo</label>
                    <div className="text-cyan hover:text-white cursor-pointer">{submission.demoUrl}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Review Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Stage</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStageColor(submission.stage)}`}>
                    {submission.stage}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Score</span>
                  <span className="text-white font-medium">{submission.score || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Review History</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-2 h-8 bg-success rounded-full"></div>
                <div>
                  <div className="font-medium text-white">Submitted</div>
                  <div className="text-xs text-text-muted">{submission.submitted}</div>
                </div>
              </div>
              {submission.status !== 'queued' && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-2 h-8 bg-warning rounded-full"></div>
                  <div>
                    <div className="font-medium text-white">Under Review</div>
                    <div className="text-xs text-text-muted">Currently being evaluated</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Assigned Judges</h3>
            <div className="flex flex-wrap gap-2">
              {submission.judges.length > 0 ? (
                submission.judges.map(judge => (
                  <span key={judge} className="px-3 py-1 bg-violet/20 text-violet rounded-full text-sm">
                    {judge}
                  </span>
                ))
              ) : (
                <span className="text-text-muted">No judges assigned yet</span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn-primary flex-1">Update Submission</button>
            <button className="btn-secondary">Download Report</button>
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
            <h1 className="text-4xl font-bold text-white">Submissions</h1>
            <p className="text-text-muted">Track and manage your project submissions</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-primary h-11 px-6" title="Submit Project">
              <i className="uil uil-plus mr-2"></i>
              Submit Project
            </button>
            <button className="btn-secondary h-11 w-11 flex items-center justify-center" title="Export">
              <i className="uil uil-download-alt"></i>
            </button>
          </div>
        </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-cyan text-charcoal'
                : 'bg-white/10 text-text-secondary hover:text-white hover:bg-white/20'
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-1 bg-black/20 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <FilterToolbar
        searchPlaceholder="Search submissions..."
        searchValue={filters.search}
        onSearchChange={(value) => handleFilterChange('search', value)}
        filters={toolbarFilters}
        onReset={handleReset}
        onApply={handleApply}
        hasChanges={hasChanges}
      />

      {/* Submissions Table */}
      <div className="glass-card rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-card border-b border-white/10">
              <tr className="h-12">
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[300px]">Project</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[150px]">Team</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[120px]">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[100px]">Stage</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[100px]">Score</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[160px]">Submitted</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map(submission => (
                <tr key={submission.id} className="border-b border-white/5 hover:bg-white/5 transition-colors h-14">
                  <td className="px-5 py-3">
                    <div>
                      <div className="font-medium text-white">{submission.project}</div>
                      <div className="text-xs text-text-muted">{submission.track}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-text-secondary">{submission.team}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStageColor(submission.stage)}`}>
                      {submission.stage}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white">{submission.score || '—'}</td>
                  <td className="px-5 py-3 text-text-muted text-sm">{submission.submitted}</td>
                  <td className="px-5 py-3">
                    <button 
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-cyan hover:text-white transition-colors"
                    >
                      <i className="uil uil-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="glass-card rounded-2xl border p-12 text-center">
          <i className="uil uil-file-upload text-4xl text-text-muted mb-4"></i>
          <h3 className="text-lg font-semibold text-white mb-2">No submissions found</h3>
          <p className="text-text-muted">No submissions match your current filter criteria.</p>
        </div>
      )}

      {selectedSubmission && (
        <SubmissionDrawer 
          submission={selectedSubmission} 
          onClose={() => setSelectedSubmission(null)} 
        />
      )}
      </div>
    </div>
  );
};

export default Submissions;