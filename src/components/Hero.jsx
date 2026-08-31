import React, { useState, useRef, useEffect } from 'react';
import { soundFx } from '../utils/sound';

export default function Hero({ onOpenBooking }) {
  const [isFlashing, setIsFlashing] = useState(false);
  const heroRef = useRef(null);

  // Interactive subtle mouse parallax
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    
    heroRef.current.style.setProperty('--mouse-x', x.toFixed(3));
    heroRef.current.style.setProperty('--mouse-y', y.toFixed(3));
  };

  const handleMouseLeave = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty('--mouse-x', '0');
    heroRef.current.style.setProperty('--mouse-y', '0');
  };

  // Camera Flash Trigger
  const triggerShutterFlash = () => {
    soundFx.playShutterClick();
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 220);
  };

  const handleBookingClick = () => {
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking();
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    soundFx.playFilterTick();
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className={`kaiser-hero-section ${isFlashing ? 'camera-flashing' : ''}`} 
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Visual Camera Flash Overlay */}
      <div className="camera-flash-overlay" aria-hidden="true"></div>

      {/* Top Bar Metadata */}
      <div className="kaiser-hero-topbar">
        <div className="kaiser-hero-top-left">
          <span className="kaiser-brand-tag">PORTFOLIO</span>
        </div>

        <div className="kaiser-hero-top-right">
          <div className="kaiser-author-title">
            <span className="kaiser-author-name">Thobix Eclou</span>
            <span className="kaiser-author-role">Photographe & Directeur Artistique</span>
          </div>
          <div className="kaiser-author-meta">
            <span className="meta-dash">—</span>
            <span>AFRIQUE DE L'OUEST • INTERNATIONAL — DEPUIS 2022</span>
          </div>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="kaiser-hero-stage">
        {/* Viewfinder Frame Container */}
        <div className="kaiser-viewfinder-box">
          {/* 4 Corner Viewfinder Brackets */}
          <span className="kaiser-bracket top-left" aria-hidden="true"></span>
          <span className="kaiser-bracket top-right" aria-hidden="true"></span>
          <span className="kaiser-bracket bottom-left" aria-hidden="true"></span>
          <span className="kaiser-bracket bottom-right" aria-hidden="true"></span>

          {/* Giant Signature Typography with Parallax Layer */}
          <div className="kaiser-name-wrap">
            <h1 className="sr-only">Thobix Eclou — Photographe & Directeur Artistique</h1>
            <picture>
              <source srcSet="/images/signature.webp" type="image/webp" />
              <img 
                src="/images/signature.png" 
                alt="Thobix Eclou" 
                className="kaiser-signature-img"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </picture>
          </div>

          {/* Photographer Portrait Visual with Depth Parallax Layer */}
          <div className="kaiser-portrait-container">
            <img 
              src="/images/1.webp" 
              alt="Thobix Eclou — Photographe & Directeur Artistique" 
              className="kaiser-portrait-img"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>

          {/* Setting / Aperture Flash Trigger Button */}
          <button 
            type="button" 
            className="kaiser-icon-trigger" 
            onClick={triggerShutterFlash}
            aria-label="Déclencher la caméra"
            title="Déclencheur photographique (Clic pour déclencher)"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Bar Controls */}
      <div className="kaiser-hero-bottombar">
        <a href="#about" className="kaiser-scroll-indicator" onClick={scrollToAbout}>
          <span>Faites défiler</span>
          <span className="scroll-arrow">↓</span>
        </a>

        <div className="kaiser-bottom-actions">
          {/* Reserve Pill Button */}
          <button 
            type="button" 
            className="kaiser-btn-reserve" 
            onClick={handleBookingClick}
          >
            Réserver
          </button>
        </div>
      </div>
    </section>
  );
}
