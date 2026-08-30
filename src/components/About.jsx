import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../utils/sound';

export default function About({ onOpenBooking }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const manifestoText = "Chaque image doit interrompre le défilement et lancer une histoire. Je réalise des travaux mode et éditoriaux qui mêlent lumière, attitude et émotion, pour créer des images dont le monde se souvient.";
  const words = manifestoText.split(' ');

  useEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is visible in viewport
      if (rect.bottom > 0 && rect.top < windowHeight) {
        setIsInView(true);
        // Calculate progress from 0 (entering bottom) to 1 (leaving top)
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const rawProgress = currentDistance / totalDistance;
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));
        
        setScrollProgress(clampedProgress);

        // Update CSS variables for smooth GPU parallax
        const parallaxImgY = (clampedProgress - 0.5) * -60; // moves upwards as scroll goes down
        const parallaxTagY = (clampedProgress - 0.5) * 40;
        
        sectionRef.current.style.setProperty('--about-img-y', `${parallaxImgY.toFixed(2)}px`);
        sectionRef.current.style.setProperty('--about-tag-y', `${parallaxTagY.toFixed(2)}px`);
      }
    };

    const onScrollThrottled = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScrollThrottled);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleBooking = () => {
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking();
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    soundFx.playFilterTick();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="kaiser-about-section" id="about" ref={sectionRef}>
      <div className="kaiser-about-split">
        {/* Left Manifesto Column (White Studio Canvas) */}
        <div className="kaiser-about-left">
          <div className="kaiser-manifesto-content">
            <span className="kaiser-manifesto-eyebrow">✦ VISION & MANIFESTE</span>
            
            {/* Scroll-Driven Text Reveal with Word Highlighting */}
            <p className={`kaiser-manifesto-quote ${isInView ? 'in-view' : ''}`}>
              {words.map((word, idx) => {
                // Calculate word activation threshold based on scroll progress
                const wordThreshold = 0.15 + (idx / words.length) * 0.45;
                const isLit = scrollProgress >= wordThreshold;

                return (
                  <span 
                    key={idx} 
                    className={`manifesto-word ${isLit ? 'lit' : ''}`}
                    style={{
                      transitionDelay: `${idx * 18}ms`
                    }}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </p>

            <div className="kaiser-about-meta">
              <div className="kaiser-signature-block">
                <span className="kaiser-signature-name">Thobix Eclou</span>
                <span className="kaiser-signature-role">Directeur Artistique & Photographe • Afrique de l'Ouest</span>
              </div>

              <div className="kaiser-about-actions">
                <button 
                  type="button" 
                  className="kaiser-manifesto-btn"
                  onClick={handleBooking}
                >
                  <span>RÉSERVER UNE SESSION</span>
                  <span className="btn-arrow">↗︎</span>
                </button>
                <a 
                  href="#projects" 
                  className="kaiser-manifesto-link"
                  onClick={scrollToProjects}
                >
                  DÉCOUVRIR LE PORTFOLIO
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Portrait Column (Contemporary Editorial Canvas with Silky Scroll Parallax) */}
        <div className="kaiser-about-right">
          <div className="kaiser-about-visual-wrap">
            <div className="kaiser-about-character parallax-img">
              <img 
                src="/images/2.png" 
                alt="Thobix Eclou — Portrait & Vision Artistique" 
                className="kaiser-editorial-portrait"
                loading="lazy"
              />
            </div>
          </div>

          {/* Vertical Tagline with Scroll Parallax */}
          <div className="kaiser-about-vertical-tag parallax-tag">
            <span>Des images qui font regarder le monde deux fois.</span>
          </div>

          {/* Bottom Indicator */}
          <div className="kaiser-about-scroll-tag">
            <a href="#projects" onClick={scrollToProjects}>
              <span>Faites défiler</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
