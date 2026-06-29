import React, { useEffect, useRef, useState } from 'react';
import { clinicConfig } from '../config';

export default function AnimatedBackground({ section }) {
  const bgConfig = clinicConfig.backgroundAnimations;
  
  if (!bgConfig || !bgConfig.enabled) return null;
  
  const sectionConfig = bgConfig.sections?.[section];
  if (!sectionConfig || sectionConfig.type === 'none') return null;

  const currentTheme = clinicConfig.theme;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if the screen is mobile width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { 
        threshold: 0.02,
        rootMargin: "50px 0px 50px 0px" // pre-trigger slightly before entry
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Return null on mobile to completely bypass heavy SVG/Canvas rendering
  if (isMobile) return null;

  // Helper to resolve color values to palette colors or direct hex codes
  const resolveColor = (colorVal) => {
    if (!colorVal) return 'transparent';
    if (currentTheme[colorVal]) return currentTheme[colorVal];
    return colorVal;
  };

  const c1 = resolveColor(sectionConfig.color1);
  const c2 = resolveColor(sectionConfig.color2);
  const c3 = resolveColor(sectionConfig.color3);

  const opacity = sectionConfig.opacity || 0.1;

  // We wrap all backgrounds in a transition container that wakes up when intersecting
  const renderBackgroundContent = () => {
    // If not intersecting at all, avoid rendering animation layers to save browser resources
    if (!isIntersecting) return null;

    const playState = isIntersecting ? 'running' : 'paused';

    switch (sectionConfig.type) {
      case 'gradientWave':
        return (
          <>
            <div 
              className="absolute -top-[25%] -left-[15%] w-[70%] h-[70%] rounded-full"
              style={{ background: `radial-gradient(ellipse at center, ${c1}55 0%, ${c1}22 40%, transparent 70%)`, willChange: 'opacity' }}
            />
            <div 
              className="absolute -bottom-[25%] -right-[15%] w-[80%] h-[80%] rounded-full"
              style={{ background: `radial-gradient(ellipse at center, ${c2 || c1}44 0%, ${c2 || c1}18 40%, transparent 70%)`, willChange: 'opacity' }}
            />
            <div 
              className="absolute top-[20%] left-[25%] w-[60%] h-[60%] rounded-full"
              style={{ background: `radial-gradient(ellipse at center, ${c2 || c1}33 0%, transparent 65%)` }}
            />
          </>
        );

      case 'blobDrift':
        const blobCount = sectionConfig.blobCount || 3;
        return (
          <>
            {blobCount >= 1 && (
              <div 
                className="absolute -top-[10%] -left-[5%] w-[450px] h-[450px] rounded-full blur-[45px] animate-morph-1"
                style={{ backgroundColor: c1, opacity: 0.65, animationPlayState: playState, willChange: 'transform, opacity' }}
              />
            )}
            {blobCount >= 2 && (
              <div 
                className="absolute -bottom-[10%] -right-[5%] w-[550px] h-[550px] rounded-full blur-[50px] animate-morph-2"
                style={{ backgroundColor: c2 || c1, opacity: 0.55, animationPlayState: playState, willChange: 'transform, opacity' }}
              />
            )}
            {blobCount >= 3 && (
              <div 
                className="absolute top-[35%] right-[25%] w-[400px] h-[400px] rounded-full blur-[40px] animate-morph-3"
                style={{ backgroundColor: c3 || c1, opacity: 0.6, animationPlayState: playState, willChange: 'transform, opacity' }}
              />
            )}
            {blobCount >= 4 && (
              <div 
                className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] rounded-full blur-[35px] animate-morph-1"
                style={{ backgroundColor: c1, opacity: 0.5, animationDelay: '-12s', animationPlayState: playState, willChange: 'transform, opacity' }}
              />
            )}
          </>
        );

      case 'movingGrid':
        return (
          <div className="perspective-grid-container">
            {/* Dynamic Scrolling Grid lines in 3D perspective */}
            <div 
              className="perspective-grid-mesh animate-grid-scroll"
              style={{ 
                backgroundImage: `
                  linear-gradient(to right, ${c1} 1.2px, transparent 1.2px),
                  linear-gradient(to bottom, ${c1} 1.2px, transparent 1.2px)
                `,
                backgroundSize: '48px 48px',
                opacity: 0.65,
                animationPlayState: playState,
                willChange: 'transform'
              }}
            />
            {/* Moving Scanner Laser Line in 3D perspective */}
            <div 
              className="absolute top-0 left-0 w-full h-[100px] animate-grid-sweep opacity-75"
              style={{ 
                background: `linear-gradient(to bottom, transparent, ${c1} 50%, transparent)`,
                animationPlayState: playState,
                willChange: 'transform, opacity'
              }}
            />
          </div>
        );

      case 'particleDrift':
        return <CanvasParticles color={c1} particleCount={sectionConfig.particleCount || 45} opacity={opacity} isIntersecting={isIntersecting} />;

      case 'glowingRadial':
        return (
          <>
            <div 
              className="absolute -top-[15%] -left-[15%] w-[60%] h-[60%] rounded-full blur-[55px] animate-spotlight-pulse"
              style={{ background: `radial-gradient(circle, ${c1} 0%, transparent 80%)`, animationPlayState: playState, willChange: 'transform, opacity' }}
            />
            <div 
              className="absolute -bottom-[15%] -right-[15%] w-[60%] h-[60%] rounded-full blur-[55px] animate-spotlight-pulse"
              style={{ background: `radial-gradient(circle, ${c2 || c1} 0%, transparent 80%)`, animationDelay: '-7.5s', animationPlayState: playState, willChange: 'transform, opacity' }}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none transition-opacity duration-[800ms] ease-out`}
      style={{ 
        opacity: isIntersecting ? opacity : 0,
      }}
    >
      {renderBackgroundContent()}
    </div>
  );
}

// Canvas-based performant floating particles with interactive cursor repulsion
function CanvasParticles({ color, particleCount, opacity, isIntersecting }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // If the section is not visible, do not run anything, keep canvas blank and save CPU/GPU resources
    if (!isIntersecting) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resolve parent section element for wider mouse tracking
    const sectionElement = canvas.closest('section') || canvas.parentElement;

    let animationId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      const rect = sectionElement.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      sectionElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Re-calculate canvas size on resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle representation
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 3 + 1.2; // 1.2px to 4.2px
        this.speedY = Math.random() * 0.4 + 0.15; // slow drift up
        this.speedX = (Math.random() - 0.5) * 0.25; // drift side to side
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.65 + 0.25;
        this.fadeInSpeed = 0.01 + Math.random() * 0.015;
        this.flickerSpeed = 0.005 + Math.random() * 0.015;
        this.flickerAngle = Math.random() * Math.PI;
      }

      update() {
        // Apply normal speeds
        this.y -= this.speedY;
        this.x += this.speedX;

        // Mouse Repulsion Force
        if (mouse.x > -500 && mouse.y > -500) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const activeRadius = 160;

          if (dist < activeRadius) {
            const force = (activeRadius - dist) / activeRadius;
            const angle = Math.atan2(dy, dx);
            // Push outwards away from cursor
            this.x += Math.cos(angle) * force * 3;
            this.y += Math.sin(angle) * force * 3;
          }
        }

        // fade in
        if (this.alpha < this.maxAlpha) {
          this.alpha += this.fadeInSpeed;
        }

        // shimmer/flicker
        this.flickerAngle += this.flickerSpeed;
        this.currentAlpha = this.alpha + Math.sin(this.flickerAngle) * 0.2;
        if (this.currentAlpha < 0) this.currentAlpha = 0;
        if (this.currentAlpha > 1) this.currentAlpha = 1;

        // Reset if goes off-screen
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = this.currentAlpha;
        ctx.fill();
      }
    }

    // Initialize particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sectionElement) {
        sectionElement.removeEventListener('mousemove', handleMouseMove);
        sectionElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, [color, particleCount, isIntersecting]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none"
    />
  );
}

