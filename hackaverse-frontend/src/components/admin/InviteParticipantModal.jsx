import React, { useState } from 'react';

const InviteParticipantModal = ({ isOpen, onClose, onSend }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'participant',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSend(formData);
      setFormData({
        email: '',
        name: '',
        role: 'participant',
        message: ''
      });
      onClose();
    } catch (error) {
      console.error('Failed to send invitation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl border max-w-md w-full">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Invite Participant</h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-white transition-colors"
            >
              <i className="uil uil-times text-xl"></i>
            </button>
          </div>
          <p className="text-text-secondary mt-2">Send an invitation to join the hackathon</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-cyan focus:ring-2 focus:ring-cyan/40 transition-colors"
              placeholder="Enter participant's full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-cyan focus:ring-2 focus:ring-cyan/40 transition-colors"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan focus:ring-2 focus:ring-cyan/40 transition-colors"
            >
              <option value="participant">Participant</option>
              <option value="mentor">Mentor</option>
              <option value="judge">Judge</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-cyan focus:ring-2 focus:ring-cyan/40 transition-colors resize-none"
              placeholder="Add a personal message to the invitation..."
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-cyan text-black rounded-lg hover:bg-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteParticipantModal;
