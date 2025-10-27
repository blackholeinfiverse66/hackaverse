import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from './Toast';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // Step 1: Team Profile
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamLogoPreview, setTeamLogoPreview] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [category, setCategory] = useState('');
  
  // Step 2: Invite Members
  const [members, setMembers] = useState([{ name: 'You (Creator)', email: 'creator@hackaverse.com', status: 'confirmed' }]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [inviteInput, setInviteInput] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    { id: 'ai-ml', name: 'AI/ML', icon: 'uil-brain', gradient: 'from-purple-primary to-purple-600', description: 'Machine Learning & AI' },
    { id: 'gaming', name: 'Gaming', icon: 'uil-game-structure', gradient: 'from-green-accent to-green-600', description: 'Game Development' },
    { id: 'web3', name: 'Web3', icon: 'uil-bitcoin-circle', gradient: 'from-yellow-accent to-yellow-600', description: 'Blockchain & Crypto' },
    { id: 'open-innovation', name: 'Open Innovation', icon: 'uil-lightbulb-alt', gradient: 'from-cyan-accent to-blue-500', description: 'Any Creative Idea' }
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeamLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendInvite = () => {
    if (inviteInput.trim()) {
      setPendingInvites([...pendingInvites, { email: inviteInput, status: 'pending' }]);
      setInviteInput('');
      toast.success(`Invite sent to ${inviteInput}`);
    }
  };

  const handleGenerateInviteLink = () => {
    const link = `https://hackaverse.com/join/${Math.random().toString(36).substr(2, 9)}`;
    setInviteLink(link);
    navigator.clipboard.writeText(link);
    toast.success('Invite link copied to clipboard!');
  };

  const handleNext = () => {
    // Validation
    if (currentStep === 1) {
      if (!teamName.trim()) {
        toast.error('Please enter a team name');
        return;
      }
      if (!category) {
        toast.error('Please select a category');
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      toast.success(`Step ${currentStep} completed!`);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const formData = {
        teamName,
        teamDescription,
        category,
        teamLogo,
        members,
        pendingInvites
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      toast.success('Team created successfully!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center max-w-md w-full border border-white/20 transform animate-scaleIn">
          <div className="mb-6 text-6xl animate-bounce">✅</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Registration Successful!</h2>
          <p className="text-lg mb-6">Welcome to HackaVerse. Check your email for confirmation.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const stepTitles = [
    { number: 1, title: 'Team Profile', subtitle: 'Define your team identity' },
    { number: 2, title: 'Invite Members', subtitle: 'Build your squad' },
    { number: 3, title: 'Review & Submit', subtitle: 'Confirm and create' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden flex items-center justify-center p-6">
      {/* Multi-layer Background System */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1: Moving Gradient Orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-[600px] h-[600px] bg-purple-primary/40 rounded-full blur-[150px] animate-float" 
               style={{ top: '5%', left: '5%', animationDuration: '25s' }}></div>
          <div className="absolute w-[500px] h-[500px] bg-cyan-accent/30 rounded-full blur-[120px] animate-float" 
               style={{ top: '50%', right: '10%', animationDuration: '30s', animationDelay: '5s' }}></div>
          <div className="absolute w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-[100px] animate-float" 
               style={{ bottom: '10%', left: '35%', animationDuration: '35s', animationDelay: '10s' }}></div>
        </div>
        
        {/* Layer 2: Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-15 animate-gradient-shift">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500"></div>
        </div>
        
        {/* Layer 3: Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>
      {/* Unified Registration Card */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-10 md:p-12 shadow-2xl animate-fadeInUp">
          
          {/* Card Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Register Your Team
            </h1>
            <p className="text-gray-300 text-lg">Join the universe of builders and innovators</p>
            <p className="text-gray-400 text-sm mt-2">
              Looking to join as an individual? <a href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">Sign up here</a>
            </p>
          </div>

          {/* Progressive Stepper with Connected Lines */}
          <div className="mb-12">
            <div className="flex justify-between items-start relative">
              {/* Progress Line Container */}
              <div className="absolute top-6 left-0 right-0 flex items-center px-12" style={{ zIndex: 0 }}>
                <div className="flex-1 flex gap-2">
                  {/* Line 1->2 */}
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                      style={{ width: currentStep >= 2 ? '100%' : '0%' }}
                    ></div>
                  </div>
                  {/* Line 2->3 */}
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-500"
                      style={{ width: currentStep >= 3 ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Step Circles */}
              {stepTitles.map((step) => (
                <div key={step.number} className="flex flex-col items-center flex-1 relative" style={{ zIndex: 1 }}>
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 scale-110' 
                        : 'bg-white/20 text-gray-400'
                    }`}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-semibold transition-colors ${
                      currentStep >= step.number ? 'text-cyan-400' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className={`text-xs mt-1 transition-colors ${
                      currentStep >= step.number ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-[550px]">
            
            {/* Step 1: Team Profile (Consolidated) */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Logo + Team Name Row */}
                <div className="grid md:grid-cols-[220px_1fr] gap-6 items-start">
                  
                  {/* Team Logo Upload */}
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3">Team Logo</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-44 h-44 rounded-full border-2 border-dashed border-white/30 hover:border-cyan-500 transition-all cursor-pointer flex items-center justify-center overflow-hidden group relative bg-white/5 hover:bg-white/10"
                    >
                      {teamLogoPreview ? (
                        <img src={teamLogoPreview} alt="Team Logo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <i className="uil uil-image-upload text-5xl text-gray-400 group-hover:text-cyan-400 transition-colors mb-2"></i>
                          <p className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors">Click to upload</p>
                        </div>
                      )}
                      {teamLogoPreview && (
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-semibold">Change Logo</p>
                        </div>
                      )}
                    </div>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Team Name & Description */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <label className="block text-white text-sm font-semibold mb-3">Team Name *</label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-lg"
                        placeholder="e.g., The Code Crusaders"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm font-semibold mb-3">Team Description</label>
                      <textarea
                        value={teamDescription}
                        onChange={(e) => setTeamDescription(e.target.value)}
                        rows="4"
                        className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                        placeholder="A brief mission statement or what makes your team unique..."
                      />
                    </div>
                  </div>
                </div>

                {/* Category Selection - Icon Grid */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-4">Select Category *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                          category === cat.id
                            ? 'border-cyan-500 bg-gradient-to-br ' + cat.gradient + ' shadow-lg shadow-cyan-500/30 scale-105'
                            : 'border-white/20 bg-white/5 hover:border-white/40 hover:scale-102'
                        }`}
                      >
                        {/* Checkmark Badge */}
                        {category === cat.id && (
                          <div className="absolute -top-2 -right-2 w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                            <i className="uil uil-check text-white text-sm font-bold"></i>
                          </div>
                        )}
                        
                        <i className={`uil ${cat.icon} text-5xl mb-3 block transition-colors ${
                          category === cat.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}></i>
                        <h3 className={`font-bold text-lg mb-1 transition-colors ${
                          category === cat.id ? 'text-white' : 'text-gray-200 group-hover:text-white'
                        }`}>{cat.name}</h3>
                        <p className={`text-xs transition-colors ${
                          category === cat.id ? 'text-white/90' : 'text-gray-400 group-hover:text-gray-300'
                        }`}>{cat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Invite Members */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Invite Input */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-3">Invite by Email or Username</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={inviteInput}
                      onChange={(e) => setInviteInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
                      className="flex-1 px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="teammate@email.com or @username"
                    />
                    <button
                      type="button"
                      onClick={handleSendInvite}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <i className="uil uil-message"></i>
                      <span className="hidden sm:inline">Send Invite</span>
                    </button>
                  </div>
                </div>

                {/* Current Team Members */}
                <div>
                  <h3 className="text-white text-sm font-semibold mb-4 flex items-center">
                    <i className="uil uil-users-alt mr-2 text-green-400"></i>
                    My Team ({members.length})
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    {members.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{member.name}</p>
                            <p className="text-gray-400 text-sm">{member.email}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                          {member.status === 'confirmed' ? '✓ Confirmed' : 'Member'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Invites */}
                {pendingInvites.length > 0 && (
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-4 flex items-center">
                      <i className="uil uil-clock mr-2 text-yellow-400"></i>
                      Pending Invites ({pendingInvites.length})
                    </h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                      {pendingInvites.map((invite, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                              <i className="uil uil-envelope text-xl"></i>
                            </div>
                            <p className="text-gray-300">{invite.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                              Pending
                            </span>
                            <button
                              type="button"
                              onClick={() => setPendingInvites(pendingInvites.filter((_, i) => i !== index))}
                              className="text-red-400 hover:text-red-300 px-2 py-1 hover:bg-red-500/10 rounded transition-colors"
                            >
                              <i className="uil uil-times"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shareable Link */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleGenerateInviteLink}
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                  >
                    <i className="uil uil-link text-xl group-hover:text-cyan-400 transition-colors"></i>
                    <span>Or get a shareable invite link</span>
                  </button>
                  {inviteLink && (
                    <div className="mt-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl animate-fade-in">
                      <p className="text-cyan-400 text-sm mb-2 flex items-center gap-2">
                        <i className="uil uil-check-circle"></i>
                        Link copied to clipboard!
                      </p>
                      <p className="text-gray-300 text-xs break-all font-mono bg-black/30 p-2 rounded">{inviteLink}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <i className="uil uil-check-circle text-7xl text-cyan-400 mb-4 inline-block animate-bounce-slow"></i>
                  <h2 className="text-3xl font-bold text-white mb-2">Review Your Team</h2>
                  <p className="text-gray-400">Make sure everything looks good before creating your team</p>
                </div>

                {/* Team Summary */}
                <div className="space-y-5">
                  
                  {/* Team Info Card */}
                  <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl hover:border-cyan-500/50 transition-all">
                    <div className="flex items-center gap-5 mb-4">
                      {teamLogoPreview ? (
                        <img src={teamLogoPreview} alt="Team Logo" className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500/30" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-cyan-500/30">
                          {teamName.charAt(0) || 'T'}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">{teamName || 'Team Name'}</h3>
                        <p className="text-gray-400">{teamDescription || 'No description provided'}</p>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    {category && (
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categories.find(c => c.id === category)?.gradient} flex items-center justify-center`}>
                          <i className={`uil ${categories.find(c => c.id === category)?.icon} text-2xl text-white`}></i>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
                          <p className="text-white font-semibold text-lg">{categories.find(c => c.id === category)?.name}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Members Summary */}
                  <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl hover:border-purple-500/50 transition-all">
                    <h4 className="text-white font-semibold mb-4 flex items-center text-lg">
                      <i className="uil uil-users-alt mr-2 text-cyan-400 text-xl"></i>
                      Team Members
                    </h4>
                    <div className="space-y-2">
                      {members.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{member.name}</p>
                            <p className="text-gray-400 text-xs">{member.email}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            ✓
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {pendingInvites.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                          <i className="uil uil-clock text-yellow-400"></i>
                          + {pendingInvites.length} pending invite{pendingInvites.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-10 pt-8 border-t border-white/10">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2 group"
              >
                <i className="uil uil-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={(currentStep === 1 && (!teamName || !category)) || loading}
              className="ml-auto px-10 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Team...</span>
                </>
              ) : currentStep === totalSteps ? (
                <>
                  <i className="uil uil-rocket text-xl"></i>
                  Create Team
                </>
              ) : (
                <>
                  Next Step
                  <i className="uil uil-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </>
              )}
            </button>
          </div>
          
          {/* Back to Home Button */}
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <i className="uil uil-arrow-left"></i>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
