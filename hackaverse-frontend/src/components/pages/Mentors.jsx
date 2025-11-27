import React, { useState, useEffect } from 'react';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const mockMentors = [
        {
          id: 1,
          name: 'Dr. Sarah Chen',
          title: 'AI Research Scientist',
          company: 'Google DeepMind',
          expertise: ['AI/ML', 'Computer Vision', 'Neural Networks'],
          rating: 4.9,
          sessions: 127,
          availability: 'available',
          nextSlot: '2024-01-16 14:00',
          bio: 'Leading AI researcher with 10+ years in machine learning and computer vision.',
          avatar: null
        },
        {
          id: 2,
          name: 'Alex Rodriguez',
          title: 'Blockchain Architect',
          company: 'Ethereum Foundation',
          expertise: ['Web3', 'Smart Contracts', 'DeFi'],
          rating: 4.8,
          sessions: 89,
          availability: 'busy',
          nextSlot: '2024-01-18 10:00',
          bio: 'Blockchain expert helping teams build decentralized applications.',
          avatar: null
        },
        {
          id: 3,
          name: 'Maya Patel',
          title: 'Game Developer',
          company: 'Unity Technologies',
          expertise: ['Gaming', 'AR/VR', 'Unity'],
          rating: 4.7,
          sessions: 156,
          availability: 'available',
          nextSlot: '2024-01-16 16:30',
          bio: 'Senior game developer specializing in immersive experiences.',
          avatar: null
        },
        {
          id: 4,
          name: 'David Kim',
          title: 'Startup Advisor',
          company: 'Y Combinator',
          expertise: ['Open Innovation', 'Product Strategy', 'Fundraising'],
          rating: 4.9,
          sessions: 203,
          availability: 'available',
          nextSlot: '2024-01-16 11:00',
          bio: 'Helping startups scale from idea to IPO.',
          avatar: null
        },
        {
          id: 5,
          name: 'Lisa Wang',
          title: 'UX Design Lead',
          company: 'Figma',
          expertise: ['UI/UX', 'Design Systems', 'User Research'],
          rating: 4.8,
          sessions: 94,
          availability: 'offline',
          nextSlot: '2024-01-19 09:00',
          bio: 'Design leader focused on creating intuitive user experiences.',
          avatar: null
        },
        {
          id: 6,
          name: 'James Thompson',
          title: 'DevOps Engineer',
          company: 'AWS',
          expertise: ['Cloud', 'DevOps', 'Infrastructure'],
          rating: 4.6,
          sessions: 78,
          availability: 'available',
          nextSlot: '2024-01-16 15:00',
          bio: 'Cloud infrastructure expert helping teams scale efficiently.',
          avatar: null
        }
      ];
      
      setMentors(mockMentors);
      setIsLoading(false);
    };

    fetchMentors();
  }, []);

  const getAvailabilityBadge = (availability) => {
    const styles = {
      available: 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30',
      busy: 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30',
      offline: 'bg-white/10 text-white/50 border border-white/20'
    };
    return styles[availability] || styles.offline;
  };

  const filteredMentors = mentors.filter(mentor => {
    if (filter === 'all') return true;
    if (filter === 'available') return mentor.availability === 'available';
    return mentor.expertise.some(skill => skill.toLowerCase().includes(filter.toLowerCase()));
  });

  const filters = [
    { key: 'all', label: 'All Mentors' },
    { key: 'available', label: 'Available Now' },
    { key: 'ai', label: 'AI/ML' },
    { key: 'web3', label: 'Web3' },
    { key: 'gaming', label: 'Gaming' },
    { key: 'design', label: 'Design' }
  ];

  if (isLoading) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 xl:px-8 py-8 text-white">
        <div className="mb-8">
          <div className="h-8 bg-white/10 rounded-lg w-32 mb-2 animate-pulse"></div>
          <div className="h-4 bg-white/5 rounded w-56 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8 text-white">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7C4DFF] via-[#6CCAFF] to-[#34D399] bg-clip-text text-transparent">
            Expert Mentors
          </h1>
          <p className="text-text-muted">Get guidance from industry professionals</p>
        </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.key 
                  ? 'bg-[#6CCAFF]/20 text-[#6CCAFF] border border-[#6CCAFF]/30' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        
        <div className="flex rounded-xl bg-white/5 border border-white/10 p-1 md:ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/50'}`}
          >
            <i className="uil uil-apps"></i>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/50'}`}
          >
            <i className="uil uil-list-ul"></i>
          </button>
        </div>
      </div>

      {/* Mentors Grid/List */}
      {filteredMentors.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <i className="uil uil-graduation-cap text-2xl text-white/40"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
          <p className="text-white/60">Try adjusting your filters to find available mentors.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <div
              key={mentor.id}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 hover:shadow-[0_0_0_1px_rgba(108,202,255,.25),_0_10px_30px_-12px_rgba(124,77,255,.35)] transition-all"
            >
              {/* Mentor Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#7C4DFF] to-[#6CCAFF] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg line-clamp-1">{mentor.name}</h3>
                  <p className="text-white/60 text-sm line-clamp-1">{mentor.title}</p>
                  <p className="text-white/50 text-xs">{mentor.company}</p>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getAvailabilityBadge(mentor.availability)}`}>
                  {mentor.availability}
                </span>
              </div>

              {/* Bio */}
              <p className="text-white/70 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-white/70"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 3 && (
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-white/70">
                    +{mentor.expertise.length - 3}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 pt-4 border-t border-white/10">
                <div className="flex items-center">
                  <i className="uil uil-star text-[#FFD700] mr-1"></i>
                  <span className="text-sm font-medium">{mentor.rating}</span>
                </div>
                <div className="text-sm text-white/60">
                  {mentor.sessions} sessions
                </div>
              </div>

              {/* Next Available */}
              {mentor.availability === 'available' && (
                <div className="mb-4 p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20">
                  <div className="text-xs text-[#22C55E] font-medium mb-1">Next Available</div>
                  <div className="text-sm text-white">
                    {new Date(mentor.nextSlot).toLocaleDateString()} at{' '}
                    {new Date(mentor.nextSlot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                className={`w-full h-11 rounded-xl font-semibold transition-all ${
                  mentor.availability === 'available'
                    ? 'bg-gradient-to-r from-[#7C4DFF] to-[#6CCAFF] text-white hover:opacity-95'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {mentor.availability === 'available' ? 'Book Session' : 'Request Guidance'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Mentor</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Expertise</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Rating</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Availability</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Next Slot</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMentors.map(mentor => (
                  <tr key={mentor.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#6CCAFF] flex items-center justify-center text-white font-bold text-sm mr-3">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{mentor.name}</div>
                          <div className="text-sm text-white/60">{mentor.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.slice(0, 2).map((skill, index) => (
                          <span key={index} className="px-2 py-1 rounded text-xs bg-white/10 text-white/70">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <i className="uil uil-star text-[#FFD700] mr-1"></i>
                        <span>{mentor.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getAvailabilityBadge(mentor.availability)}`}>
                        {mentor.availability}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-white/70">
                      {new Date(mentor.nextSlot).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-[#6CCAFF] hover:text-white transition-colors">
                        {mentor.availability === 'available' ? 'Book' : 'Request'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Mentors;