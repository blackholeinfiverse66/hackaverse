import { useState } from 'react';

const Logs = () => {
  const [filters, setFilters] = useState({
    severity: 'all',
    source: 'all',
    track: 'all',
    date: 'today'
  });
  
  const [tailMode, setTailMode] = useState(false);
  const [lastRefresh, setLastRefresh] = useState('14:32:15');
  
  const [logs] = useState([
    { id: 1, time: '14:32:15', severity: 'info', event: 'Queue Updated', submission: 'AI Campus Navigator', team: 'Team Alpha', actor: 'system', message: 'Submission moved to review queue' },
    { id: 2, time: '14:28:42', severity: 'info', event: 'Judge Assignment', submission: 'Blockchain Voting', team: 'Team Beta', actor: 'judge-001', message: 'Judge assigned to submission' },
    { id: 3, time: '14:25:18', severity: 'warn', event: 'API Timeout', submission: null, team: null, actor: 'system', message: 'External API response timeout (5s)' },
    { id: 4, time: '14:22:03', severity: 'info', event: 'Status Change', submission: 'AR Study Assistant', team: 'Team Gamma', actor: 'system', message: 'Submission status updated to pending' },
    { id: 5, time: '14:18:55', severity: 'error', event: 'Upload Failed', submission: 'Smart Waste Management', team: 'Team Delta', actor: 'ui', message: 'File upload failed - invalid format' },
    { id: 6, time: '14:15:30', severity: 'info', event: 'Queue Refresh', submission: null, team: null, actor: 'system', message: 'Judge queue refreshed automatically' },
    { id: 7, time: '14:12:17', severity: 'info', event: 'Track Assignment', submission: null, team: null, actor: 'admin-001', message: 'Judge assigned to AI/ML track' },
    { id: 8, time: '14:08:44', severity: 'info', event: 'Submission Update', submission: 'Blockchain Voting', team: 'Team Beta', actor: 'api', message: 'Submission metadata updated' }
  ]);

  const severities = ['all', 'info', 'warn', 'error'];
  const sources = ['all', 'queue', 'agent', 'ui', 'api'];
  const tracks = ['all', 'AI/ML', 'Web3', 'Gaming', 'Open Innovation'];
  const dates = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' }
  ];

  const filteredLogs = logs.filter(log => {
    if (filters.severity !== 'all' && log.severity !== filters.severity) return false;
    if (filters.source !== 'all' && log.actor !== filters.source) return false;
    return true;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'text-error bg-error/20';
      case 'warn': return 'text-warning bg-warning/20';
      case 'info': return 'text-cyan bg-cyan/20';
      default: return 'text-text-muted bg-gunmetal';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error': return 'uil-exclamation-triangle';
      case 'warn': return 'uil-exclamation-circle';
      case 'info': return 'uil-info-circle';
      default: return 'uil-circle';
    }
  };

  return (
    <div className="min-h-screen pt-0">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">System Logs</h1>
            <p className="text-text-muted">Operational audit stream • Last refresh: {lastRefresh}</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input 
                type="checkbox" 
                checked={tailMode}
                onChange={(e) => setTailMode(e.target.checked)}
                className="rounded"
            />
            Tail mode
          </label>
          <button 
            onClick={() => setLastRefresh(new Date().toLocaleTimeString())}
            className="btn-secondary h-10 px-4 text-sm"
          >
            <i className="uil uil-refresh mr-2"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <select 
          value={filters.severity} 
          onChange={(e) => setFilters({...filters, severity: e.target.value})}
          className="form-control h-11 w-32"
        >
          {severities.map(severity => (
            <option key={severity} value={severity}>
              {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
            </option>
          ))}
        </select>
        
        <select 
          value={filters.source} 
          onChange={(e) => setFilters({...filters, source: e.target.value})}
          className="form-control h-11 w-32"
        >
          {sources.map(source => (
            <option key={source} value={source}>
              {source === 'all' ? 'All Sources' : source.toUpperCase()}
            </option>
          ))}
        </select>
        
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
          value={filters.date} 
          onChange={(e) => setFilters({...filters, date: e.target.value})}
          className="form-control h-11 w-32"
        >
          {dates.map(date => (
            <option key={date.value} value={date.value}>{date.label}</option>
          ))}
        </select>
      </div>

      {/* Logs Table */}
      <div className="glass-card rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-card border-b border-white/10">
              <tr className="h-12">
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[120px]">Time</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[100px]">Severity</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[240px]">Event</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[240px]">Submission/Team</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[140px]">Actor</th>
                <th className="text-left px-5 py-3 font-semibold text-text-secondary flex-1">Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors h-14">
                  <td className="px-5 py-3">
                    <div className="font-mono text-sm text-white">{log.time}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <i className={`uil ${getSeverityIcon(log.severity)} text-sm`}></i>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-white font-medium">{log.event}</td>
                  <td className="px-5 py-3">
                    {log.submission ? (
                      <div>
                        <div className="text-cyan text-sm cursor-pointer hover:text-white">{log.submission}</div>
                        <div className="text-text-muted text-xs">{log.team}</div>
                      </div>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-text-secondary text-sm">{log.actor}</td>
                  <td className="px-5 py-3 text-text-secondary">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="glass-card rounded-2xl border p-12 text-center">
          <i className="uil uil-file-search-alt text-4xl text-text-muted mb-4"></i>
          <h3 className="text-lg font-semibold text-white mb-2">No log entries</h3>
          <p className="text-text-muted">No log entries match the current filter criteria.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="text-text-muted text-sm">
          Showing {filteredLogs.length} of {logs.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary h-10 px-3 text-sm">Previous</button>
          <span className="h-10 px-3 bg-cyan text-charcoal rounded text-sm font-medium flex items-center">1</span>
          <button className="btn-secondary h-10 px-3 text-sm">Next</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Logs;