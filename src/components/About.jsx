import React from 'react';
import { soundFx } from '../utils/sound';

export default function About({ onOpenBooking }) {
  return (
    <section className="atelier-about-section" id="about">
      <div className="atelier-about-container">
        <div className="atelier-about-grid">
          <div className="atelier-portrait-wrapper">
            <div className="atelier-portrait-card">
              <img 
                src="/images/Thobix_WEBP.WEBP" 
                alt="Thobix Eclou — Photographe & Directeur Artistique au Bénin" 
                loading="lazy" 
              />
              <div className="portrait-badge-overlay">
                <span className="badge-dot"></span>
                <span className="badge-text">THOBIX ECLOU — AFRIQUE DE L'OUEST & LÀ OÙ LE BESOIN SE FAIT SENTIR</span>
              </div>
            </div>
          </div>

          <div className="atelier-about-content">
            <span className="atelier-about-eyebrow">✦ VISION ÉDITORIALE & DIRECTION ARTISTIQUE</span>
            <h2 className="atelier-about-title">
              SUBLIMER VOTRE HISTOIRE, CAPTIVER VOTRE AUDIENCE.
            </h2>
            <p className="atelier-about-desc">
              Photographe professionnel et directeur artistique basé en Afrique de l'Ouest et là où le besoin se fait sentir, spécialisé dans l'hôtellerie de luxe, la haute gastronomie, les événements de prestige et les récits visuels à forte identité.
            </p>

            <div className="atelier-stats-row">
              <div className="stat-item">
                <span className="stat-val">100+</span>
                <span className="stat-lbl">Projets Réalisés</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">5★</span>
                <span className="stat-lbl">Standards de Luxe</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">100%</span>
                <span className="stat-lbl">Sur-Mesure</span>
              </div>
            </div>

            <div className="atelier-actions">
              <button 
                type="button" 
                className="btn-primary-atelier"
                onClick={() => {
                  soundFx.playShutterClick();
                  onOpenBooking();
                }}
              >
                <span>RÉSERVER UNE SESSION</span>
                <span className="btn-arrow">↗︎</span>
              </button>
              <a href="#projects" className="btn-secondary-atelier">
                DÉCOUVRIR LE PORTFOLIO
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
