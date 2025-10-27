import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * FadeIn animation component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.direction - Animation direction ('up', 'down', 'left', 'right')
 * @param {number} props.delay - Animation delay in ms
 * @param {number} props.duration - Animation duration in ms
 * @param {string} props.className - Additional CSS classes
 */
export const FadeIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 600,
  className = '',
  once = true 
}) => {
  const [ref, isVisible] = useIntersectionObserver({ once, threshold: 0.1 });

  const directionStyles = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : undefined,
      }}
    >
      <div className={!isVisible ? directionStyles[direction] : ''}>
        {children}
      </div>
    </div>
  );
};

/**
 * ScaleIn animation component
 */
export const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 500,
  className = '',
  once = true 
}) => {
  const [ref, isVisible] = useIntersectionObserver({ once, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      }}
    >
      {children}
    </div>
  );
};

/**
 * StaggerChildren animation component
 */
export const StaggerChildren = ({ 
  children, 
  staggerDelay = 100,
  className = '' 
}) => {
  const [ref, isVisible] = useIntersectionObserver({ once: true, threshold: 0.1 });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div
              key={index}
              className="transition-all duration-500"
              style={{
                transitionDelay: `${index * staggerDelay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {child}
            </div>
          ))
        : children
      }
    </div>
  );
};
