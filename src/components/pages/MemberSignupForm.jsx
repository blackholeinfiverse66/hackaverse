import React, { useState } from 'react';

/**
 * Member Signup Form - shown after accepting invitation
 * Collects member name and optional bio
 */
const MemberSignupForm = ({ invitation, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    member_name: '',
    member_bio: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.member_name.trim()) {
      errors.member_name = 'Full name is required';
    } else if (formData.member_name.trim().length < 2) {
      errors.member_name = 'Name must be at least 2 characters';
    } else if (formData.member_name.trim().length > 100) {
      errors.member_name = 'Name cannot exceed 100 characters';
    }

    if (formData.member_bio && formData.member_bio.length > 500) {
      errors.member_bio = 'Bio cannot exceed 500 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-2xl p-8 border border-blue-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to the Team!</h2>
          <p className="text-slate-400 text-sm">
            Let's get you set up as a team member
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Team Info */}
        <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-400 mb-1">Team</p>
          <p className="font-semibold text-white">{invitation?.team_name}</p>
          <p className="text-sm text-slate-400 mt-3 mb-1">Hackathon</p>
          <p className="font-semibold text-white">{invitation?.hackathon_name}</p>
          <p className="text-sm text-slate-400 mt-3 mb-1">Email</p>
          <p className="font-semibold text-white text-sm">{invitation?.invitee_email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="member_name"
              value={formData.member_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={loading}
              maxLength="100"
              className={`w-full px-4 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all ${
                validationErrors.member_name ? 'border-red-500' : 'border-slate-600'
              }`}
              required
            />
            {validationErrors.member_name && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.member_name}</p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              {formData.member_name.length}/100 characters
            </p>
          </div>

          {/* Bio Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Short Bio (Optional)
            </label>
            <textarea
              name="member_bio"
              value={formData.member_bio}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself (e.g., roles, interests, experience)"
              disabled={loading}
              maxLength="500"
              rows="4"
              className={`w-full px-4 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all resize-none ${
                validationErrors.member_bio ? 'border-red-500' : 'border-slate-600'
              }`}
            />
            {validationErrors.member_bio && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.member_bio}</p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              {formData.member_bio.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center mt-6"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Completing...
              </>
            ) : (
              'Complete Profile & Join Team'
            )}
          </button>

          <p className="text-center text-xs text-slate-500 mt-4">
            ✓ You can change this information later in team settings
          </p>
        </form>
      </div>
    </div>
  );
};

export default MemberSignupForm;
