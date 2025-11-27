// Enhanced Cosmic Starfield Background
(function() {
  'use strict';

  let canvas, ctx, stars = [], animationId;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'starfield-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-999999';  // Ensure it's at the very back
    canvas.style.pointerEvents = 'none';
    canvas.style.background = '#000000';

    // Insert as first child to ensure it's at the back
    if (document.body.firstChild) {
      document.body.insertBefore(canvas, document.body.firstChild);
    } else {
      document.body.appendChild(canvas);
    }

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
    const numStars = Math.min(1200, Math.floor(window.innerWidth * window.innerHeight / 5000));

    // Add more larger cosmic elements (nebulae/galaxies) with increased intensity
    const numCosmicElements = Math.min(8, Math.floor(window.innerWidth * window.innerHeight / 30000));

    for (let i = 0; i < numCosmicElements; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 30 + Math.random() * 60,
        alpha: 0.08 + Math.random() * 0.15,
        baseAlpha: 0.08 + Math.random() * 0.15,
        twinkle: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: ['#BF40BF', '#C030D8', '#00F2EA', '#2DD4BF', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 6)],
        isCosmicElement: true,
        driftX: (Math.random() - 0.5) * 0.05,
        driftY: (Math.random() - 0.5) * 0.05,
        pulseSpeed: 0.5 + Math.random() * 1.5
      });
    }

    // Add more shooting stars with increased frequency and variety
    const numShootingStars = Math.min(6, Math.floor(window.innerWidth * window.innerHeight / 40000));

    for (let i = 0; i < numShootingStars; i++) {
      stars.push({
        x: -50,
        y: Math.random() * canvas.height * 0.6,
        radius: 1.2 + Math.random() * 4,
        alpha: 0.8 + Math.random() * 0.2,
        baseAlpha: 0.8 + Math.random() * 0.2,
        twinkle: 0,
        phase: 0,
        color: ['#FFFFFF', '#00F2EA', '#BF40BF', '#2DD4BF'][Math.floor(Math.random() * 4)],
        isShootingStar: true,
        velocityX: 2 + Math.random() * 8,
        velocityY: 0.5 + Math.random() * 3,
        trail: [],
        trailLength: 20 + Math.random() * 30,
        spawnTime: Math.random() * 20000 // Random spawn timing
      });
    }

    // Add aurora-like effects for more cosmic atmosphere
    const numAuroraElements = Math.min(3, Math.floor(window.innerWidth * window.innerHeight / 80000));

    for (let i = 0; i < numAuroraElements; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.1 + Math.random() * canvas.height * 0.3,
        radius: 80 + Math.random() * 120,
        alpha: 0.03 + Math.random() * 0.08,
        baseAlpha: 0.03 + Math.random() * 0.08,
        twinkle: Math.random() * 0.01 + 0.002,
        phase: Math.random() * Math.PI * 2,
        color: ['#00F2EA', '#BF40BF', '#2DD4BF', '#6366F1'][Math.floor(Math.random() * 4)],
        isAurora: true,
        waveOffset: Math.random() * Math.PI * 2,
        waveSpeed: 0.5 + Math.random() * 1.5,
        gradientStops: 8 + Math.floor(Math.random() * 12)
      });
    }

    // Add energy particles for more intensity
    const numEnergyParticles = Math.min(50, Math.floor(window.innerWidth * window.innerHeight / 20000));

    for (let i = 0; i < numEnergyParticles; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0.5 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.7,
        baseAlpha: 0.3 + Math.random() * 0.7,
        twinkle: Math.random() * 0.08 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: ['#00F2EA', '#2DD4BF', '#3B82F6', '#6366F1', '#A78BFA', '#FF6B6B'][Math.floor(Math.random() * 6)],
        isEnergyParticle: true,
        velocityX: (Math.random() - 0.5) * 0.1,
        velocityY: (Math.random() - 0.5) * 0.1,
        energyPulse: Math.random() * 0.05 + 0.02
      });
    }

    for (let i = 0; i < numStars; i++) {
      // Use enhanced cosmic color palette with more vibrant colors
      const isAccent = Math.random() > 0.4;
      const accentColors = ['#BF40BF', '#C030D8', '#00F2EA', '#2DD4BF', '#3B82F6', '#6366F1', '#A78BFA', '#FF6B6B', '#4ECDC4', '#45B7D1'];

      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0.5 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.8,
        baseAlpha: 0.3 + Math.random() * 0.8,
        twinkle: Math.random() * 0.06 + 0.008,
        phase: Math.random() * Math.PI * 2,
        color: isAccent ? accentColors[Math.floor(Math.random() * accentColors.length)] : '#FFFFFF',
        isCosmicElement: false,
        isEnergyParticle: false
      });
    }

  }

  function drawStatic() {

    // Draw cosmic background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0D1128');
    gradient.addColorStop(1, '#15193B');
    ctx.fillStyle = gradient;
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

    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cosmic background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0D1128');
    gradient.addColorStop(1, '#15193B');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const time = Date.now() * 0.001;

    stars.forEach(star => {
      ctx.save();

      if (star.isCosmicElement) {
        // Animate cosmic elements with pulsing effect
        const pulseAlpha = star.baseAlpha + Math.sin(time * star.twinkle + star.phase) * 0.3;
        const alpha = Math.max(0.02, Math.min(0.2, pulseAlpha));

        ctx.shadowBlur = star.radius * 2;
        ctx.shadowColor = star.color;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (star.isShootingStar) {
        // Animate shooting stars with trails
        star.x += star.velocityX;
        star.y += star.velocityY;

        // Add current position to trail
        star.trail.push({ x: star.x, y: star.y, alpha: star.alpha });

        // Remove old trail points
        if (star.trail.length > star.trailLength) {
          star.trail.shift();
        }

        // Draw trail
        star.trail.forEach((point, index) => {
          const trailAlpha = (point.alpha * index) / star.trail.length;
          ctx.globalAlpha = trailAlpha;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, star.radius * (index / star.trail.length), 0, Math.PI * 2);
          ctx.fill();
        });

        // Reset shooting star when it goes off screen
        if (star.x > canvas.width + 50 || star.y > canvas.height + 50) {
          star.x = -50;
          star.y = Math.random() * canvas.height * 0.6;
          star.trail = [];
        }
      } else if (star.isAurora) {
        // Animate aurora effects with wave patterns
        const waveY = star.y + Math.sin(time * star.waveSpeed + star.waveOffset) * 20;
        const alpha = star.baseAlpha + Math.sin(time * star.twinkle + star.phase) * 0.05;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;

        // Create gradient for aurora effect
        const auroraGradient = ctx.createRadialGradient(star.x, waveY, 0, star.x, waveY, star.radius);
        auroraGradient.addColorStop(0, star.color);
        auroraGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = auroraGradient;
        ctx.beginPath();
        ctx.arc(star.x, waveY, star.radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (star.isEnergyParticle) {
        // Animate energy particles with pulsing
        const energyAlpha = star.baseAlpha + Math.sin(time * star.energyPulse + star.phase) * 0.3;
        const alpha = Math.max(0.1, Math.min(1, energyAlpha));

        star.x += star.velocityX;
        star.y += star.velocityY;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Animate regular stars with twinkling
        const twinkleAlpha = star.baseAlpha + Math.sin(time * star.twinkle + star.phase) * 0.5;
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
      }

      ctx.restore();
    });

    animationId = requestAnimationFrame(animate);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Cleanup animation on unload
  window.addEventListener('beforeunload', () => {
    if (typeof animationId !== 'undefined') {
      cancelAnimationFrame(animationId);
    }
  });
})();
