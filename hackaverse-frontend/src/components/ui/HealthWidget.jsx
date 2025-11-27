import { useState, useEffect } from 'react';

const HealthWidget = () => {
  const [health, setHealth] = useState('Stable');
  const [isVisible, setIsVisible] = useState(true);

  const healthStates = {
    'Stable': { color: 'success', icon: 'uil-check-circle' },
    'Improving': { color: 'cyan', icon: 'uil-arrow-up-right' },
    'Rising': { color: 'warning', icon: 'uil-exclamation-triangle' }
  };

  const colorClassMap = {
    success: 'text-success',
    cyan: 'text-cyan',
    warning: 'text-warning'
  };

  useEffect(() => {
    // Simulate health status changes
    const interval = setInterval(() => {
      const states = ['Stable', 'Improving', 'Rising'];
      const randomState = states[Math.floor(Math.random() * states.length)];
      setHealth(randomState);
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const currentHealth = healthStates[health];
  const currentClass = colorClassMap[currentHealth.color] || 'text-text-muted';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="glass-card p-3 flex items-center gap-3 min-w-[140px]">
        <i className={`uil ${currentHealth.icon} ${currentClass}`}></i>
        <div>
          <div className="text-xs text-text-muted">Health</div>
          <div className={`text-sm font-medium ${currentClass}`}>{health}</div>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-text-muted hover:text-text-primary transition-colors ml-2"
        >
          <i className="uil uil-times text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default HealthWidget;