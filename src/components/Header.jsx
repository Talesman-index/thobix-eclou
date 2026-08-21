import React, { useState } from 'react';
import { soundFx } from '../utils/sound';

export default function Header({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookingClick = () => {
    soundFx.playShutterClick();
    onOpenBooking();
  };

  const toggleMobileMenu = () => {
    soundFx.playFilterTick();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="marlia-header">
        <div className="marlia-nav-container">
          <nav className="nav-left">
            <a href="#about" className="marlia-nav-link">À PROPOS.</a>
            <a href="#projects" className="marlia-nav-link">PROJETS.</a>
          </nav>

          <a href="#hero" className="nav-center-brand" aria-label="Thobix Eclou - Accueil">
            <span className="nav-diamond-icon">✦</span>
            <span className="marlia-brand-name">THOBIX ECLOU</span>
          </a>

          <nav className="nav-right">
            <a href="#services" className="marlia-nav-link">PRESTATIONS.</a>
            <a href="#pricing" className="marlia-nav-link">TARIFS.</a>
            <button 
              type="button" 
              className="btn-nav-reserve" 
              onClick={handleBookingClick}
            >
              <span>RÉSERVER</span>
            </button>
          </nav>

          <button 
            type="button" 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Menu Mobile"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <button 
          type="button" 
          className="mobile-nav-close" 
          onClick={toggleMobileMenu}
        >
          ✕
        </button>
        <a href="#hero" className="mobile-nav-link" onClick={toggleMobileMenu}>ACCUEIL</a>
        <a href="#about" className="mobile-nav-link" onClick={toggleMobileMenu}>À PROPOS</a>
        <a href="#projects" className="mobile-nav-link" onClick={toggleMobileMenu}>PROJETS</a>
        <a href="#services" className="mobile-nav-link" onClick={toggleMobileMenu}>PRESTATIONS</a>
        <a href="#pricing" className="mobile-nav-link" onClick={toggleMobileMenu}>TARIFS</a>
        <button 
          type="button" 
          className="btn-primary-atelier" 
          onClick={() => { toggleMobileMenu(); handleBookingClick(); }}
        >
          <span>RÉSERVER UNE SESSION</span>
          <span className="btn-arrow">↗︎</span>
        </button>
      </div>
    </>
  );
}
