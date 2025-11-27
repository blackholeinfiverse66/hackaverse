// Simple Starfield Implementation
(function() {
  'use strict';
  
  let canvas, ctx, stars = [];
  
  function init() {
    console.log('Initializing simple starfield...');
    canvas = document.createElement('canvas');
    canvas.id = 'simple-starfield-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '0';  // Set to 0 to ensure it's visible
    canvas.style.pointerEvents = 'none';
    canvas.style.background = '#000000';
    
    // Insert as first child to ensure it's at the back
    if (document.body.firstChild) {
      document.body.insertBefore(canvas, document.body.firstChild);
    } else {
      document.body.appendChild(canvas);
    }
    
    console.log('Simple canvas inserted into DOM:', canvas);
    ctx = canvas.getContext('2d');
    
    resize();
    animate();
    
    window.addEventListener('resize', resize);
    console.log('Simple starfield initialization complete');
  }
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
  }
  
  function generateStars() {
    stars = [];
    const numStars = Math.min(300, Math.floor(window.innerWidth * window.innerHeight / 10000));
    console.log('Generating', numStars, 'stars for simple starfield');
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0.5 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.7,
        twinkle: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }
    console.log('Stars generated:', stars.length);
  }
  
  function animate() {
    // Clear canvas with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const time = Date.now() * 0.001;
    
    // Draw stars
    stars.forEach(star => {
      const twinkleAlpha = star.alpha + Math.sin(time * star.twinkle + star.phase) * 0.3;
      const alpha = Math.max(0.1, Math.min(1, twinkleAlpha));
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();