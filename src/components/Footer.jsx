import React from 'react';
import { soundFx } from '../utils/sound';

export default function Footer({ onOpenBooking }) {
  const handleBooking = () => {
    soundFx.playShutterClick();
    onOpenBooking();
  };

  return (
    <footer className="atelier-site-footer">
      <div className="atelier-footer-container">
        {/* CTA Card */}
        <div className="atelier-footer-cta-card">
          <div className="cta-card-content">
            <span className="cta-card-tag">✦ PROJET VISUEL SUR-MESURE</span>
            <h2 className="cta-card-title">
              Sublimez votre marque <br />
              <em className="cta-title-accent">avec des visuels d'exception.</em>
            </h2>
          </div>
          <div className="cta-card-actions">
            <button 
              type="button" 
              className="footer-cta-btn-primary"
              onClick={handleBooking}
            >
              <span>DÉMARRER UN PROJET</span>
              <span className="btn-arrow">↗︎</span>
            </button>
            <a 
              href="https://wa.me/22901644343" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-cta-btn-whatsapp"
            >
              WHATSAPP (+229)
            </a>
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="footer-grid-4">
          <div>
            <h3 className="footer-col-title">THOBIX ECLOU</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '320px' }}>
              Photographe d'Auteur & Directeur Artistique basé en Afrique de l'Ouest. Intervention partout où le besoin se fait sentir & à l'international.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">NAVIGATION</h4>
            <div className="footer-col-links">
              <a href="#hero">Accueil</a>
              <a href="#about">À propos</a>
              <a href="#projects">Projets</a>
              <a href="#services">Prestations</a>
              <a href="#pricing">Tarifs</a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">RÉSEAUX</h4>
            <div className="footer-col-links">
              <a href="https://www.instagram.com/mister_thobix" target="_blank" rel="noopener noreferrer">
                Instagram @mister_thobix ↗︎
              </a>
              <a href="https://www.facebook.com/thobix.eclou" target="_blank" rel="noopener noreferrer">
                Facebook Thobix Eclou ↗︎
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">CONTACT</h4>
            <div className="footer-col-links">
              <a href="mailto:contact@thobix.com">contact@thobix.com</a>
              <a href="tel:+22901644343">+229 01 64 43 43</a>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Afrique de l'Ouest & Partout où le besoin se fait sentir
              </span>
            </div>
          </div>
        </div>

        {/* Infinite Single-Line Horizontal Marquee Ticker */}
        <div className="footer-ticker-wrapper">
          <div className="footer-ticker-track">
            <span>THOBIX ECLOU</span>
            <span className="ticker-star">✦</span>
            <span>THOBIX ECLOU</span>
            <span className="ticker-star">✦</span>
            <span>THOBIX ECLOU</span>
            <span className="ticker-star">✦</span>
            <span>THOBIX ECLOU</span>
            <span className="ticker-star">✦</span>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>© 2024 Thobix Eclou. Tous droits réservés.</span>
          <span>Afrique de l'Ouest & Partout où le besoin se fait sentir</span>
        </div>
      </div>
    </footer>
  );
}
