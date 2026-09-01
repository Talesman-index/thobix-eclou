import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/sound';

export default function Header({ onOpenBooking, theme = 'light', onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section for floating dock
      const sections = ['hero', 'about', 'gallery-highlight', 'why-me', 'services', 'projects', 'testimonials', 'booking-calendar', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    soundFx.playFilterTick();
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBooking = () => {
    soundFx.playShutterClick();
    setMobileMenuOpen(false);
    if (onOpenBooking) onOpenBooking();
  };

  const toggleMobileMenu = () => {
    soundFx.playFilterTick();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Premium Floating Glass Pill Dock */}
      <header className={`floating-dock-nav ${scrolled ? 'dock-visible' : 'dock-hidden'}`} aria-label="Navigation Principale">
        <div className="dock-pill-container">
          {/* Official THOBIX Brand Logo */}
          <a 
            href="#hero" 
            className="dock-brand-link" 
            onClick={(e) => handleNavClick(e, 'hero')}
            title="Thobix Eclou — Accueil"
          >
            <span className="dock-brand-text">THOBIX</span>
          </a>

          <div className="dock-divider-v"></div>

          {/* Desktop Navigation Links */}
          <nav className="dock-desktop-links">
            <a 
              href="#hero" 
              className={`dock-link ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              Accueil
            </a>

            <a 
              href="#about" 
              className={`dock-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              À propos
            </a>

            <a 
              href="#services" 
              className={`dock-link ${activeSection === 'services' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'services')}
            >
              Services
            </a>

            <a 
              href="#projects" 
              className={`dock-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              Portfolio
            </a>

            <a 
              href="#testimonials" 
              className={`dock-link ${activeSection === 'testimonials' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'testimonials')}
            >
              Témoignages
            </a>
          </nav>

          {/* Theme Mode Toggle Button (Light / Dark) */}
          <button 
            type="button" 
            className="dock-theme-toggle-btn"
            onClick={() => {
              soundFx.playFilterTick();
              if (onToggleTheme) onToggleTheme();
            }}
            aria-label={theme === 'dark' ? "Activer le mode clair" : "Activer le mode sombre"}
            title={theme === 'dark' ? "Mode Clair ☀️" : "Mode Sombre 🌙"}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="theme-icon sun-icon">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="theme-icon moon-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Desktop CTA Reserve Button */}
          <button 
            type="button" 
            className="dock-btn-reserve desktop-only-btn" 
            onClick={handleBooking}
          >
            <span>Réserver</span>
          </button>

          {/* Mobile Hamburger Button Trigger */}
          <button 
            type="button" 
            className={`dock-hamburger-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
          </button>
        </div>
      </header>

      {/* Luxury Full-Screen Mobile Drawer */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
        
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-menu-brand">
              <span className="mobile-brand-title">THOBIX ECLOU</span>
              <span className="mobile-brand-sub">Directeur Artistique & Photographe</span>
            </div>
            
            <div className="mobile-header-actions">
              <button 
                type="button" 
                className="mobile-theme-switch-pill"
                onClick={() => {
                  soundFx.playFilterTick();
                  if (onToggleTheme) onToggleTheme();
                }}
                aria-label="Changer de thème"
              >
                {theme === 'dark' ? (
                  <>
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                    </svg>
                    <span>Clair</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    <span>Sombre</span>
                  </>
                )}
              </button>

              <button 
                type="button" 
                className="mobile-close-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  soundFx.playFilterTick();
                  setMobileMenuOpen(false);
                }}
                aria-label="Fermer le menu"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <nav className="mobile-nav-links">
            <a 
              href="#hero" 
              className={`mobile-nav-item ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              <span className="nav-item-num">01</span>
              <span className="nav-item-text">Accueil</span>
              <span className="nav-item-arrow">→</span>
            </a>

            <a 
              href="#about" 
              className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              <span className="nav-item-num">02</span>
              <span className="nav-item-text">À propos & Vision</span>
              <span className="nav-item-arrow">→</span>
            </a>

            <a 
              href="#why-me" 
              className={`mobile-nav-item ${activeSection === 'why-me' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'why-me')}
            >
              <span className="nav-item-num">03</span>
              <span className="nav-item-text">Pourquoi moi ?</span>
              <span className="nav-item-arrow">→</span>
            </a>

            <a 
              href="#services" 
              className={`mobile-nav-item ${activeSection === 'services' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'services')}
            >
              <span className="nav-item-num">04</span>
              <span className="nav-item-text">Services & Formules</span>
              <span className="nav-item-arrow">→</span>
            </a>

            <a 
              href="#projects" 
              className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              <span className="nav-item-num">05</span>
              <span className="nav-item-text">Portfolio & Archives</span>
              <span className="nav-item-arrow">→</span>
            </a>

            <a 
              href="#testimonials" 
              className={`mobile-nav-item ${activeSection === 'testimonials' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'testimonials')}
            >
              <span className="nav-item-num">06</span>
              <span className="nav-item-text">Témoignages clients</span>
              <span className="nav-item-arrow">→</span>
            </a>
          </nav>

          <div className="mobile-menu-footer">
            <button 
              type="button" 
              className="mobile-reserve-cta"
              onClick={handleBooking}
            >
              <span>RÉSERVER UNE SESSION</span>
              <span className="btn-arrow">↗</span>
            </button>

            <div className="mobile-contact-meta">
              <span className="meta-loc">Afrique de l'Ouest • International</span>
              <div className="mobile-social-pills">
                <a href="https://www.instagram.com/mister_thobix" target="_blank" rel="noopener noreferrer">@mister_thobix</a>
                <span className="dot">•</span>
                <a href="https://wa.me/22901644343" target="_blank" rel="noopener noreferrer">WhatsApp (+229)</a>
                <span className="dot">•</span>
                <a href="https://www.facebook.com/thobix.eclou" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
