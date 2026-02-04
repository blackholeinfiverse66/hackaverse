import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { useToast } from '../ui/Toast';

const Logs = () => {
  const [filters, setFilters] = useState({
    severity: 'all',
    source: 'all',
    track: 'all',
    date: 'today',
  });

  const [tailMode, setTailMode] = useState(false);
  const [lastRefresh, setLastRefresh] = useState('14:32:15');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toast = useToast();

  const severities = ['all', 'info', 'warn', 'error'];
  const sources = ['all', 'queue', 'agent', 'ui', 'api'];
  const tracks = ['all', 'AI/ML', 'Web3', 'Gaming', 'Open Innovation'];
  const dates = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
  ];

  // Fetch logs from API
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await apiService.admin.getLogs({
        severity: filters.severity === 'all' ? null : filters.severity,
        source: filters.source === 'all' ? null : filters.source,
        track: filters.track === 'all' ? null : filters.track,
        date_range: filters.date,
      });

      setLogs(response.data.logs || []);
      setLastRefresh(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError('Failed to fetch logs. Please try again.');
      toast.error('Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    let interval;
    if (tailMode) {
      interval = setInterval(fetchLogs, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, tailMode]);

  const filteredLogs = logs.filter((log) => {
    if (filters.severity !== 'all' && log.severity !== filters.severity) return false;
    if (filters.source !== 'all' && log.actor !== filters.source) return false;
    if (filters.track !== 'all' && log.track !== filters.track) return false;
    return true;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error':
        return 'text-error bg-error/20';
      case 'warn':
        return 'text-warning bg-warning/20';
      case 'info':
        return 'text-cyan bg-cyan/20';
      default:
        return 'text-text-muted bg-gunmetal';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return 'uil-exclamation-triangle';
      case 'warn':
        return 'uil-exclamation-circle';
      case 'info':
        return 'uil-info-circle';
      default:
        return 'uil-circle';
    }
  };

  return (
    <div className="min-h-screen pt-0">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">System Logs</h1>
            <p className="text-text-muted">
              Operational audit stream • Last refresh: {lastRefresh}
            </p>
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
              onClick={fetchLogs}
              className="btn-secondary h-10 px-4 text-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  Loading...
                </>
              ) : (
                <>
                  <i className="uil uil-refresh mr-2"></i>
                  Refresh
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <select
            value={filters.severity}
            onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
            className="form-control h-11 w-32"
          >
            {severities.map((severity) => (
              <option key={severity} value={severity}>
                {severity === 'all'
                  ? 'All'
                  : severity.charAt(0).toUpperCase() + severity.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filters.source}
            onChange={(e) => setFilters({ ...filters, source: e.target.value })}
            className="form-control h-11 w-32"
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source === 'all' ? 'All Sources' : source.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={filters.track}
            onChange={(e) => setFilters({ ...filters, track: e.target.value })}
            className="form-control h-11 w-48"
          >
            {tracks.map((track) => (
              <option key={track} value={track}>
                {track === 'all' ? 'All Tracks' : track}
              </option>
            ))}
          </select>

          <select
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="form-control h-11 w-32"
          >
            {dates.map((date) => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="glass-card rounded-2xl border p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
              <p className="text-cyan-400 font-medium">Loading logs...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card rounded-2xl border border-error/30 bg-error/10 p-6">
            <div className="flex items-center gap-3">
              <i className="uil uil-exclamation-triangle text-error text-xl"></i>
              <div>
                <h3 className="text-error font-semibold">Error Loading Logs</h3>
                <p className="text-text-muted mt-1">{error}</p>
              </div>
              <button
                onClick={fetchLogs}
                className="ml-auto btn-secondary h-8 px-4 text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Content when not loading and no error */}
        {!loading && !error && (
          <>
            {filteredLogs.length > 0 ? (
              <>
                {/* Logs Table */}
                <div className="glass-card rounded-2xl border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-bg-card border-b border-white/10">
                        <tr className="h-12">
                          <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[120px]">
                            Time
                          </th>
                          <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[100px]">
                            Severity
                          </th>
                          <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[240px]">
                            Event
                          </th>
                          <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[240px]">
                            Submission/Team
                          </th>
                          <th className="text-left px-5 py-3 font-semibold text-text-secondary min-w-[140px]">
                            Actor
                          </th>
                          <th className="text-left px-5 py-3 font-semibold text-text-secondary">
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLogs.map((log) => (
                          <tr
                            key={log.id}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors h-14"
                          >
                            <td className="px-5 py-3">
                              <div className="font-mono text-sm text-white">
                                {log.time}
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <i
                                  className={`uil ${getSeverityIcon(
                                    log.severity,
                                  )} text-sm`}
                                ></i>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(
                                    log.severity,
                                  )}`}
                                >
                                  {log.severity}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-white font-medium">
                              {log.event}
                            </td>
                            <td className="px-5 py-3">
                              {log.submission ? (
                                <div>
                                  <div className="text-cyan text-sm cursor-pointer hover:text-white">
                                    {log.submission}
                                  </div>
                                  <div className="text-text-muted text-xs">
                                    {log.team}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-text-muted">—</span>
                              )}
                            </td>
                            <td className="px-5 py-3 text-text-secondary text-sm">
                              {log.actor}
                            </td>
                            <td className="px-5 py-3 text-text-secondary">
                              {log.message}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
                  <div className="text-text-muted text-sm">
                    Showing {filteredLogs.length} of {logs.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-secondary h-10 px-3 text-sm">
                      Previous
                    </button>
                    <span className="h-10 px-3 bg-cyan text-charcoal rounded text-sm font-medium flex items-center">
                      1
                    </span>
                    <button className="btn-secondary h-10 px-3 text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-card rounded-2xl border p-12 text-center">
                <i className="uil uil-file-search-alt text-4xl text-text-muted mb-4"></i>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No log entries
                </h3>
                <p className="text-text-muted">
                  No log entries match the current filter criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Logs;
