import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function CreateTeam() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hackathon_id: '',
    team_name: '',
    project_title: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveHackathons();
  }, []);

  const fetchActiveHackathons = async () => {
    try {
      const response = await api.get('/hackathons/active');
      setHackathons(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch hackathons:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await api.post('/teams/create', {
        ...formData,
        leader_id: user.id
      });
      
      localStorage.setItem('team_id', response.data.data.team_id);
      alert('Team created successfully! You are the team leader.');
      navigate('/teams');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Your Team</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select Hackathon</label>
            <select
              value={formData.hackathon_id}
              onChange={(e) => setFormData({ ...formData, hackathon_id: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Choose a hackathon...</option>
              {hackathons.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({new Date(h.start_date).toLocaleDateString()} - {new Date(h.end_date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Team Name</label>
            <input
              type="text"
              value={formData.team_name}
              onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your team name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project Title</label>
            <input
              type="text"
              value={formData.project_title}
              onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="What will you build?"
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You will be the team leader. After creating the team, you can invite members to join.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating Team...' : 'Create Team'}
          </button>
        </form>
      </div>
    </div>
  );
}
