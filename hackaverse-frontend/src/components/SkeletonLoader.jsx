/**
 * Skeleton Loader Components for better loading states
 */

export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 ${className}`}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-white/20 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-white/20 rounded"></div>
          <div className="h-3 bg-white/20 rounded w-5/6"></div>
        </div>
        <div className="h-8 bg-white/20 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export const SkeletonText = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div 
          key={i} 
          className="h-3 bg-white/20 rounded" 
          style={{ width: `${100 - (i * 10)}%` }}
        ></div>
      ))}
    </div>
  );
};

export const SkeletonCircle = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`${sizes[size]} bg-white/20 rounded-full animate-pulse ${className}`}></div>
  );
};

export const SkeletonLeaderboard = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-center justify-between border border-white/20"
        >
          <div className="flex items-center gap-4 flex-1">
            <SkeletonCircle size="lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/20 rounded w-1/3 animate-pulse"></div>
              <div className="h-3 bg-white/20 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
          <div className="w-20 h-10 bg-white/20 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonDashboard = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
