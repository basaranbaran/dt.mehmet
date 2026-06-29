import React, { useEffect, useRef, useState } from 'react';

export default function ShapeDivider({ type = 'wave', position = 'bottom', color = 'fill-white', height = '50px' }) {
  const positionClass = position === 'top' ? 'top-0 left-0 rotate-180' : 'bottom-0 left-0';
  const containerRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const playState = isIntersecting ? 'running' : 'paused';
  
  // Render different SVG shapes with overlapping layers (widened to 116% width with -left-[8%] offset to allow animation drift without edges showing)
  const renderSvgContent = () => {
    if (!isIntersecting) return null;

    switch (type) {
      case 'wave':
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-[116%] -left-[8%] ${color}`} style={{ height }}>
            {/* Layer 1 - Soft wave background (drifts left, enhanced opacity) */}
            <path d="M-200,40 C100,90 400,20 700,90 C1000,20 1200,80 1400,50 V120 H-200 Z" className="opacity-35 animate-wave-left" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
            {/* Layer 2 - Medium wave midground (drifts right, enhanced opacity) */}
            <path d="M-200,65 C150,30 500,100 850,40 C1100,100 1250,70 1400,80 V120 H-200 Z" className="opacity-60 animate-wave-right" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
            {/* Layer 3 - Solid wave foreground (gentle motion anchor) */}
            <path d="M-200,90 C200,60 500,110 800,80 C1100,110 1300,90 1400,95 V120 H-200 Z" className="opacity-100 animate-wave-foreground" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
          </svg>
        );
      case 'curve':
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-[116%] -left-[8%] ${color}`} style={{ height }}>
            {/* Layer 1 - Soft curve background (drifts left, enhanced opacity) */}
            <path d="M-200,30 Q400,120 1000,40 T1400,70 V120 H-200 Z" className="opacity-35 animate-wave-left" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
            {/* Layer 2 - Medium curve midground (drifts right, enhanced opacity) */}
            <path d="M-200,55 Q500,20 1000,100 T1400,60 V120 H-200 Z" className="opacity-60 animate-wave-right" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
            {/* Layer 3 - Solid curve foreground (gentle motion anchor) */}
            <path d="M-200,80 Q600,110 1100,70 T1400,90 V120 H-200 Z" className="opacity-100 animate-wave-foreground" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
          </svg>
        );
      case 'slant':
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-[116%] -left-[8%] ${color}`} style={{ height }}>
            {/* Layer 1 - Soft slant background (drifts left, enhanced opacity) */}
            <path d="M-200,30 L1400,90 V120 H-200 Z" className="opacity-35 animate-slant-drift" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
            {/* Layer 2 - Medium slant midground (drifts right, enhanced opacity) */}
            <path d="M-200,65 L1400,55 V120 H-200 Z" className="opacity-60 animate-wave-right" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
            {/* Layer 3 - Solid slant foreground (gentle motion anchor) */}
            <path d="M-200,95 L1400,20 V120 H-200 Z" className="opacity-100 animate-wave-foreground" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
          </svg>
        );
      case 'animatedWaves':
        return (
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-[116%] -left-[8%] ${color}`} style={{ height }}>
            {/* Wave Layer 1 - Drifting slow left, enhanced opacity */}
            <path d="M-200,45 C150,90 350,10 500,50 C650,90 850,10 1000,50 C1150,90 1300,50 1400,50 V120 H-200 Z" className="opacity-35 animate-wave-left" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
            {/* Wave Layer 2 - Drifting medium right, enhanced opacity */}
            <path d="M-200,75 C100,45 350,95 600,55 C850,15 1100,95 1400,75 V120 H-200 Z" className="opacity-60 animate-wave-right" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
            {/* Wave Layer 3 - Solid foreground base (gentle motion anchor) */}
            <path d="M-200,100 C-50,80 150,120 300,100 C450,80 600,115 750,95 C900,75 1050,100 1200,100 C1250,100 1350,95 1400,100 V120 H-200 Z" className="opacity-100 animate-wave-foreground" style={{ animationPlayState: playState, willChange: 'transform' }}></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className={`absolute ${positionClass} w-full overflow-hidden leading-[0] z-10 pointer-events-none`}>
      {renderSvgContent()}
    </div>
  );
}

