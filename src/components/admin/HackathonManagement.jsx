import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast, ToastContainer } from '../../hooks/useToast.jsx';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { FormSkeleton, CardSkeleton } from '../ui/Skeletons';

export default function HackathonManagement() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    max_team_size: 5,
    min_team_size: 2
  });
  const [errors, setErrors] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, hackathonId: null, currentStatus: null });
  const { toasts, success, error: showError } = useToast();

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/hackathons');
      setHackathons(response.data.data || []);
    } catch (err) {
      showError('Failed to fetch hackathons');
      console.error('Failed to fetch hackathons:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.start_date) newErrors.start_date = 'Start date is required';
    if (!formData.end_date) newErrors.end_date = 'End date is required';
    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      newErrors.end_date = 'End date must be after start date';
    }
    if (formData.min_team_size < 1) newErrors.min_team_size = 'Must be at least 1';
    if (formData.max_team_size < formData.min_team_size) {
      newErrors.max_team_size = 'Must be greater than min size';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await api.post('/admin/hackathons', formData);
      setFormData({ name: '', description: '', start_date: '', end_date: '', max_team_size: 5, min_team_size: 2 });
      setErrors({});
      success('Hackathon created successfully!');
      fetchHackathons();
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to create hackathon');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    setConfirmDialog({ isOpen: true, hackathonId: id, currentStatus });
  };

  const confirmToggleStatus = async () => {
    try {
      await api.patch(`/admin/hackathons/${confirmDialog.hackathonId}`, { 
        status: confirmDialog.currentStatus === 'active' ? 'inactive' : 'active' 
      });
      success(`Hackathon ${confirmDialog.currentStatus === 'active' ? 'deactivated' : 'activated'} successfully!`);
      fetchHackathons();
    } catch (err) {
      showError('Failed to update status');
    } finally {
      setConfirmDialog({ isOpen: false, hackathonId: null, currentStatus: null });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-white mb-1">Hackathon Management</h1>

      <div className="glass-card rounded-2xl border border-white/10 p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Create New Hackathon</h2>
        {loading ? (
          <FormSkeleton />
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-text-muted focus:border-cyan/50 focus:outline-none ${errors.name ? 'border-red-500' : 'border-white/10'}`}
              required
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-text-muted focus:border-cyan/50 focus:outline-none ${errors.description ? 'border-red-500' : 'border-white/10'}`}
              rows="3"
              required
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Start Date</label>
              <input
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white focus:border-cyan/50 focus:outline-none ${errors.start_date ? 'border-red-500' : 'border-white/10'}`}
                required
              />
              {errors.start_date && <p className="text-red-400 text-xs mt-1">{errors.start_date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">End Date</label>
              <input
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white focus:border-cyan/50 focus:outline-none ${errors.end_date ? 'border-red-500' : 'border-white/10'}`}
                required
              />
              {errors.end_date && <p className="text-red-400 text-xs mt-1">{errors.end_date}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Min Team Size</label>
              <input
                type="number"
                value={formData.min_team_size}
                onChange={(e) => setFormData({ ...formData, min_team_size: parseInt(e.target.value) })}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white focus:border-cyan/50 focus:outline-none ${errors.min_team_size ? 'border-red-500' : 'border-white/10'}`}
                min="1"
                required
              />
              {errors.min_team_size && <p className="text-red-400 text-xs mt-1">{errors.min_team_size}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Max Team Size</label>
              <input
                type="number"
                value={formData.max_team_size}
                onChange={(e) => setFormData({ ...formData, max_team_size: parseInt(e.target.value) })}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white focus:border-cyan/50 focus:outline-none ${errors.max_team_size ? 'border-red-500' : 'border-white/10'}`}
                min="1"
                required
              />
              {errors.max_team_size && <p className="text-red-400 text-xs mt-1">{errors.max_team_size}</p>}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan hover:bg-cyan/80 text-black font-medium px-6 py-2 rounded-lg disabled:opacity-50 transition-all"
          >
            {loading ? 'Creating...' : 'Create Hackathon'}
          </button>
        </form>
        )}
      </div>

      <div className="glass-card rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Active Hackathons</h2>
        {loading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : hackathons.length === 0 ? (
          <p className="text-text-muted">No hackathons yet</p>
        ) : (
          <div className="space-y-4">
            {hackathons.map((h) => (
              <div key={h.id} className="border border-white/10 rounded-lg p-4 bg-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{h.name}</h3>
                    <p className="text-text-secondary text-sm">{h.description}</p>
                    <p className="text-sm mt-2 text-text-muted">
                      {new Date(h.start_date).toLocaleDateString()} - {new Date(h.end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-text-muted">Team Size: {h.min_team_size}-{h.max_team_size}</p>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(h.id, h.status)}
                    className={`px-4 py-2 rounded-lg font-medium ${h.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                  >
                    {h.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <ToastContainer toasts={toasts} />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, hackathonId: null, currentStatus: null })}
        onConfirm={confirmToggleStatus}
        title={`${confirmDialog.currentStatus === 'active' ? 'Deactivate' : 'Activate'} Hackathon`}
        message={`Are you sure you want to ${confirmDialog.currentStatus === 'active' ? 'deactivate' : 'activate'} this hackathon?`}
        confirmText={confirmDialog.currentStatus === 'active' ? 'Deactivate' : 'Activate'}
        type={confirmDialog.currentStatus === 'active' ? 'danger' : 'primary'}
      />
    </div>
  );
}
