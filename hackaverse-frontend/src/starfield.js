// Simple Starfield Background
(function() {
  'use strict';
  
  let canvas, ctx, stars = [], animationId;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'starfield-canvas';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    
    resize();
    
    if (reducedMotion) {
      drawStatic();
    } else {
      animate();
    }
    
    window.addEventListener('resize', resize);
  }
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
  }
  
  function generateStars() {
    stars = [];
    const numStars = Math.min(400, Math.floor(window.innerWidth * window.innerHeight / 12000));
    
    for (let i = 0; i < numStars; i++) {
      const isAccent = Math.random() > 0.85;
      const accentColors = ['#2DD4BF', '#3B82F6', '#6366F1', '#A78BFA'];
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0.5 + Math.random() * 1.2,
        alpha: 0.4 + Math.random() * 0.6,
        baseAlpha: 0.4 + Math.random() * 0.6,
        twinkle: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: isAccent ? accentColors[Math.floor(Math.random() * accentColors.length)] : '#FFFFFF'
      });
    }
  }
  
  function drawStatic() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      
      if (star.color === '#FFFFFF') {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.baseAlpha})`;
      } else {
        const hex = star.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.baseAlpha})`;
      }
      
      ctx.fill();
    });
  }
  
  function animate() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const time = Date.now() * 0.001;
    
    stars.forEach(star => {
      const twinkleAlpha = star.baseAlpha + Math.sin(time * star.twinkle + star.phase) * 0.3;
      const alpha = Math.max(0.1, Math.min(1, twinkleAlpha));
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      
      if (star.color === '#FFFFFF') {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      } else {
        const hex = star.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      
      ctx.fill();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();