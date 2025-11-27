import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate developer interested in AI and blockchain technologies. Love building innovative solutions that make a difference.',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.dev',
    trackInterest: 'AI/ML',
    emailNotifications: true,
    projectUpdates: true
  });
  
  const [errors, setErrors] = useState({});
  const [charCounts, setCharCounts] = useState({ bio: 0 });

  const [skills, setSkills] = useState(['JavaScript', 'React', 'Python', 'Machine Learning', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: newValue 
    }));
    
    if (name === 'bio') {
      setCharCounts(prev => ({ ...prev, bio: value.length }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    setHasChanges(true);
  };
  
  const handlePaste = (e, fieldName) => {
    const pastedText = e.clipboardData.getData('text');
    
    // Auto-expand handles on paste
    if (fieldName === 'github' && !pastedText.startsWith('http')) {
      e.preventDefault();
      const normalized = normalizeUrl(pastedText, 'github');
      setFormData(prev => ({ ...prev, [fieldName]: normalized }));
      setHasChanges(true);
    } else if (fieldName === 'linkedin' && !pastedText.startsWith('http')) {
      e.preventDefault();
      const normalized = normalizeUrl(pastedText, 'linkedin');
      setFormData(prev => ({ ...prev, [fieldName]: normalized }));
      setHasChanges(true);
    }
  };
    
    
  const normalizeUrl = (url, type) => {
    if (!url) return '';
    
    let normalized = url.trim().toLowerCase();
    
    // Auto-expand handles
    if (type === 'github' && !normalized.startsWith('http')) {
      normalized = `https://github.com/${normalized}`;
    } else if (type === 'linkedin' && !normalized.startsWith('http')) {
      normalized = `https://linkedin.com/in/${normalized}`;
    }
    
    // Ensure protocol
    if (!normalized.startsWith('http')) {
      normalized = `https://${normalized}`;
    }
    
    // Remove trailing slash except root
    if (normalized.endsWith('/') && normalized !== 'https://' && normalized !== 'http://') {
      normalized = normalized.slice(0, -1);
    }
    
    return normalized;
  };
  
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' : '';
      case 'bio':
        return value.length > 500 ? 'Bio must be under 500 characters' : '';
      case 'github':
        if (value && !value.match(/^https:\/\/(www\.)?github\.com\/.+/)) {
          return 'Enter a valid GitHub URL (e.g., https://github.com/johndoe)';
        }
        return '';
      case 'linkedin':
        if (value && !value.match(/^https:\/\/(www\.)?linkedin\.com\/(in|company)\/.+/)) {
          return 'Enter a valid LinkedIn URL (e.g., https://linkedin.com/in/johndoe)';
        }
        return '';
      case 'website':
        if (value && !value.match(/^https?:\/\/.+\..+/)) {
          return 'Enter a valid website URL';
        }
        return '';
      default:
        return '';
    }
  };
  
  const getUrlStatus = (name, value) => {
    if (!value) return null;
    const error = validateField(name, value);
    return error ? 'invalid' : 'valid';
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      setHasChanges(true);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }
    
    // Normalize URLs on save
    const normalizedData = {
      ...formData,
      github: normalizeUrl(formData.github, 'github'),
      linkedin: normalizeUrl(formData.linkedin, 'linkedin'),
      website: normalizeUrl(formData.website, 'website')
    };
    
    setFormData(normalizedData);
    setIsEditing(false);
    setHasChanges(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setHasChanges(false);
    setErrors({});
    // Reset form data to original values
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Passionate developer interested in AI and blockchain technologies. Love building innovative solutions that make a difference.',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      website: 'https://johndoe.dev',
      trackInterest: 'AI/ML',
      emailNotifications: true,
      projectUpdates: true
    });
  };
  
  useEffect(() => {
    setCharCounts({ bio: formData.bio.length });
  }, [formData.bio]);
  
  

  return (
    <div className="min-h-screen pt-0">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Profile Settings</h1>
            <p className="text-text-muted">Manage your account information and preferences</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-primary h-11 px-6"
          >
            <i className="uil uil-edit mr-2"></i>
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        {/* Left Column - Form */}
        <div className="form-section space-y-6">
          {/* Basic Information */}
          <div className="glass-card rounded-2xl border-white/12 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label required">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={!isEditing}
                  className="form-control"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  required
                />
                {errors.name && <div id="name-error" className="form-error">{errors.name}</div>}
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email (read-only)</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  className="form-control readonly"
                  aria-readonly="true"
                  disabled
                  title="Managed by your account / SSO"
                />
                <div className="form-helper">Email cannot be changed</div>
              </div>
              
              <div>
                <label htmlFor="bio" className="form-label">Bio</label>
                <div className="form-helper mb-2">Share a concise summary—max 300 chars</div>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={!isEditing}
                  maxLength={500}
                  className="form-control form-textarea"
                  placeholder="Tell us about yourself..."
                  aria-describedby={errors.bio ? 'bio-error' : 'bio-counter'}
                />
                <div className="flex justify-between items-center">
                  {errors.bio && <div id="bio-error" className="form-error">{errors.bio}</div>}
                  <div id="bio-counter" className="char-counter ml-auto">
                    {charCounts.bio}/300 {charCounts.bio > 300 ? '(soft limit exceeded)' : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-card rounded-2xl border-white/12 p-5">
            <h2 className="text-lg font-semibold text-white mb-6">Social Links</h2>
            <div className="form-group">
              <div className="url-field">
                <label htmlFor="github" className="form-label">GitHub</label>
                <div className="url-icon">
                  <i className="uil uil-github"></i>
                </div>
                <input
                  id="github"
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onPaste={(e) => handlePaste(e, 'github')}
                  disabled={!isEditing}
                  className="form-control"
                  placeholder="https://github.com/username"
                  aria-describedby={errors.github ? 'github-error' : 'github-helper'}
                />
                <div className="url-actions">
                  {getUrlStatus('github', formData.github) && (
                    <span className={`url-status ${getUrlStatus('github', formData.github)}`}>
                      {getUrlStatus('github', formData.github) === 'valid' ? 'Valid' : 'Invalid'}
                    </span>
                  )}
                  <button
                    type="button"
                    className="url-open"
                    disabled={!formData.github || getUrlStatus('github', formData.github) !== 'valid'}
                    onClick={() => window.open(formData.github, '_blank')}
                    title="Open in new tab"
                  >
                    <i className="uil uil-external-link-alt"></i>
                  </button>
                </div>
                <div id="github-helper" className="form-helper">Enter your GitHub profile or repository URL</div>
                {errors.github && <div id="github-error" className="form-error">{errors.github}</div>}
              </div>
              
              <div className="url-field">
                <label htmlFor="linkedin" className="form-label">LinkedIn</label>
                <div className="url-icon">
                  <i className="uil uil-linkedin"></i>
                </div>
                <input
                  id="linkedin"
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onPaste={(e) => handlePaste(e, 'linkedin')}
                  disabled={!isEditing}
                  className="form-control"
                  placeholder="https://linkedin.com/in/username"
                  aria-describedby={errors.linkedin ? 'linkedin-error' : 'linkedin-helper'}
                />
                <div className="url-actions">
                  {getUrlStatus('linkedin', formData.linkedin) && (
                    <span className={`url-status ${getUrlStatus('linkedin', formData.linkedin)}`}>
                      {getUrlStatus('linkedin', formData.linkedin) === 'valid' ? 'Valid' : 'Invalid'}
                    </span>
                  )}
                  <button
                    type="button"
                    className="url-open"
                    disabled={!formData.linkedin || getUrlStatus('linkedin', formData.linkedin) !== 'valid'}
                    onClick={() => window.open(formData.linkedin, '_blank')}
                    title="Open in new tab"
                  >
                    <i className="uil uil-external-link-alt"></i>
                  </button>
                </div>
                <div id="linkedin-helper" className="form-helper">Enter your LinkedIn profile URL</div>
                {errors.linkedin && <div id="linkedin-error" className="form-error">{errors.linkedin}</div>}
              </div>
              
              <div className="url-field">
                <label htmlFor="website" className="form-label">Website</label>
                <div className="url-icon">
                  <i className="uil uil-globe"></i>
                </div>
                <input
                  id="website"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={!isEditing}
                  className="form-control"
                  placeholder="https://yourdomain.com"
                  aria-describedby={errors.website ? 'website-error' : 'website-helper'}
                />
                <div className="url-actions">
                  {getUrlStatus('website', formData.website) && (
                    <span className={`url-status ${getUrlStatus('website', formData.website)}`}>
                      {getUrlStatus('website', formData.website) === 'valid' ? 'Valid' : 'Invalid'}
                    </span>
                  )}
                  <button
                    type="button"
                    className="url-open"
                    disabled={!formData.website || getUrlStatus('website', formData.website) !== 'valid'}
                    onClick={() => window.open(formData.website, '_blank')}
                    title="Open in new tab"
                  >
                    <i className="uil uil-external-link-alt"></i>
                  </button>
                </div>
                <div id="website-helper" className="form-helper">Enter your personal or portfolio website URL</div>
                {errors.website && <div id="website-error" className="form-error">{errors.website}</div>}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card rounded-2xl border-white/12 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Preferences</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="trackInterest" className="form-label">Track Interest</label>
                <select
                  id="trackInterest"
                  name="trackInterest"
                  value={formData.trackInterest}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-control"
                >
                  <option value="AI/ML">AI/ML</option>
                  <option value="Web3">Web3</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Open Innovation">Open Innovation</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="rounded"
                  />
                  <span className="text-white text-sm">Email notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="projectUpdates"
                    checked={formData.projectUpdates}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="rounded"
                  />
                  <span className="text-white text-sm">Project update notifications</span>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="glass-card rounded-2xl border-white/12 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Security</h2>
            <div className="space-y-4">
              <button className="btn-secondary w-full justify-start h-11">
                <i className="uil uil-key-skeleton mr-2"></i>
                Reset Password
              </button>
              <button className="btn-secondary w-full justify-start h-11">
                <i className="uil uil-shield-check mr-2"></i>
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="glass-card rounded-2xl border p-5 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{user?.name}</h3>
            <p className="text-text-muted text-sm mb-3">{user?.email}</p>
            <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
              Active Participant
            </span>
          </div>

          {/* Skills */}
          <div className="glass-card rounded-2xl border p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-blue-500 hover:text-white"
                    >
                      <i className="uil uil-times text-xs"></i>
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="Add skill..."
                  className="form-control flex-1 text-sm"
                />
                <button onClick={addSkill} className="btn-primary w-10 h-10 flex items-center justify-center">
                  <i className="uil uil-plus"></i>
                </button>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="glass-card rounded-2xl border p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
            <div className="space-y-4">
              <Link to="/app/projects" className="flex justify-between items-center hover:bg-white/5 p-2 rounded-xl transition-colors">
                <span className="text-text-secondary">Projects</span>
                <span className="text-white font-medium">3</span>
              </Link>
              <Link to="/app/teams" className="flex justify-between items-center hover:bg-white/5 p-2 rounded-xl transition-colors">
                <span className="text-text-secondary">Teams Joined</span>
                <span className="text-white font-medium">2</span>
              </Link>
              <Link to="/app/submissions" className="flex justify-between items-center hover:bg-white/5 p-2 rounded-xl transition-colors">
                <span className="text-text-secondary">Submissions</span>
                <span className="text-white font-medium">1</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      {hasChanges && isEditing && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xl z-50 min-w-[320px] glass-card">
          <span className="text-white font-medium">Unsaved changes</span>
          <div className="flex gap-3">
            <button 
              onClick={handleCancel}
              className="btn-ghost h-10 px-4 text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={Object.keys(errors).some(key => errors[key])}
              className="btn-primary h-10 px-6 text-sm"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          Profile updated successfully!
        </div>
      )}
      </div>
    </div>
  );
};

export default ProfilePage;