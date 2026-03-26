import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useToast } from '../../components/ui/Toast';

const TeamInviteModal = ({ isOpen, onClose, teamId }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      console.log('Sending invitation with:', { team_id: teamId, invitee_email: email });
      
      const response = await apiService.teams.sendInvitation({
        team_id: teamId,
        invitee_email: email
      });
      
      console.log('Invitation response:', response);
      
      if (response.data?.success) {
        toast.success('Team invitation sent successfully!');
        setEmail('');
        setErrors({});
        setTimeout(() => onClose(), 1500);
      } else {
        const errorMsg = response.data?.message || 'Failed to send invitation';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Invitation error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMsg = error.response?.data?.detail || 
                      error.response?.data?.message || 
                      error.message || 
                      'Failed to send team invitation';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl border max-w-md w-full">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Invite Team Member</h2>
            <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
              <i className="uil uil-times text-xl"></i>
            </button>
          </div>
          <p className="text-text-secondary mt-2">Send an invitation to join your team</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Team Member Email *</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:border-cyan focus:ring-2 focus:ring-cyan/40 transition-colors ${
                errors.email ? 'border-red-500' : 'border-white/10'
              }`}
              placeholder="Enter team member's email"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-cyan text-black rounded-lg hover:bg-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Sending...' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamInviteModal;
