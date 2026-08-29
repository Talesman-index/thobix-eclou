import React from 'react';
import { soundFx } from '../utils/sound';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function Services({ onOpenBooking }) {
  useScrollReveal('.reveal-offers', { threshold: 0.15 });

  const handleSelectService = (serviceName) => {
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking(serviceName);
  };

  return (
    <section className="offers-dark-section" id="services">
      <div className="container">
        {/* Section Header (Screenshot 4) */}
        <div className="offers-header reveal-offers">
          <span className="offers-eyebrow">✦ PACKAGES & EXPERTISE</span>
          <h2 className="offers-title">Ce que je propose</h2>
          <p className="offers-lead">
            Une narration visuelle professionnelle pour les marques, les magazines et les particuliers, trois formules signature, une même exigence.
          </p>
        </div>

        {/* 3 Formules Columns (Screenshot 4) */}
        <div className="offers-grid-3">
          {/* Formule 01 */}
          <div className="offer-card reveal-offers stagger-1" onClick={() => handleSelectService('Portraits & Corporate')}>
            <div className="offer-card-top">
              <div className="offer-icon-wrap">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="offer-num">01</span>
            </div>

            <div className="offer-price-tag">À partir de 1 400 EUR</div>
            <h3 className="offer-title">Portraits & Corporate</h3>
            <p className="offer-desc">
              Portraits en studio ou en extérieur, avec une véritable signature éditoriale.
            </p>

            <ul className="offer-features">
              <li><span className="chk">✓</span> 12-20 images retouchées haute définition</li>
              <li><span className="chk">✓</span> Deux looks ou tenues stylisées</li>
              <li><span className="chk">✓</span> Galerie privée en ligne & droits d'usage</li>
            </ul>

            <button type="button" className="offer-action-link">
              <span>En savoir plus</span>
              <span className="arr">→</span>
            </button>
          </div>

          {/* Formule 02 */}
          <div className="offer-card featured-offer reveal-offers stagger-2" onClick={() => handleSelectService('Éditorial & Mode')}>
            <div className="offer-card-top">
              <div className="offer-icon-wrap">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <span className="offer-num">02</span>
            </div>

            <div className="offer-price-tag">À partir de 2 800 EUR</div>
            <h3 className="offer-title">Éditorial & Mode</h3>
            <p className="offer-desc">
              Direction artistique complète pour lookbooks, campagnes et parutions magazine.
            </p>

            <ul className="offer-features">
              <li><span className="chk">✓</span> Séance d'une demi-journée ou journée complète</li>
              <li><span className="chk">✓</span> Moodboard & concept sur-mesure</li>
              <li><span className="chk">✓</span> Coordination d'équipe & casting si requis</li>
            </ul>

            <button type="button" className="offer-action-link">
              <span>En savoir plus</span>
              <span className="arr">→</span>
            </button>
          </div>

          {/* Formule 03 */}
          <div className="offer-card reveal-offers stagger-3" onClick={() => handleSelectService('Marque & Commercial')}>
            <div className="offer-card-top">
              <div className="offer-icon-wrap">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.8" fill="none">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <span className="offer-num">03</span>
            </div>

            <div className="offer-price-tag">À partir de 3 600 EUR</div>
            <h3 className="offer-title">Marque & Commercial</h3>
            <p className="offer-desc">
              Images produit et marque conçues pour vendre aujourd'hui et durer des années.
            </p>

            <ul className="offer-features">
              <li><span className="chk">✓</span> Droits d'usage commercial complets inclus</li>
              <li><span className="chk">✓</span> Plusieurs ambiances & mises en scène</li>
              <li><span className="chk">✓</span> Livraison rapide sous 7 jours ouvrés</li>
            </ul>

            <button type="button" className="offer-action-link">
              <span>En savoir plus</span>
              <span className="arr">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
