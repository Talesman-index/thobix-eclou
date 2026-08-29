import React from 'react';
import { soundFx } from '../utils/sound';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function WhyMe({ onOpenBooking }) {
  useScrollReveal('.reveal-bento', { threshold: 0.15 });

  return (
    <section className="whyme-section" id="why-me">
      <div className="container">
        <div className="whyme-header reveal-bento">
          <span className="whyme-eyebrow">✦ VALEUR AJOUTÉE & ENGAGEMENT</span>
          <h2 className="whyme-title">Pourquoi moi ?</h2>
          <p className="whyme-lead">
            La grande photographie est bien plus qu'un service, c'est une collaboration fondée sur la confiance, le goût et un souci obsessionnel du détail.
          </p>
        </div>

        {/* Bento Grid Layout with Stagger Animation */}
        <div className="whyme-bento-grid">
          {/* Bento Card 1: Expérience */}
          <div className="bento-card card-experience reveal-bento stagger-1">
            <div className="bento-visual">
              <img 
                src="/images/Thobix.WEBP" 
                alt="Une décennie derrière l'objectif — Thobix Eclou" 
                loading="lazy"
              />
              <div className="bento-polaroid-badge">
                <span>✦ THOBIX ECLOU</span>
              </div>
            </div>
            <div className="bento-card-info">
              <h3>Une décennie derrière l'objectif</h3>
              <p>Une maîtrise forgée sur le terrain, des palaces aux défilés de mode internationaux.</p>
            </div>
          </div>

          {/* Bento Card 2: Matériel Optique Professionnel */}
          <div className="bento-card card-gear reveal-bento stagger-2">
            <div className="bento-gear-visual">
              <div className="gear-lens-graphic">
                <span className="lens-spec">50mm F/1.2 • 85mm F/1.4 • SONY GM</span>
                <span className="lens-ring"></span>
                <span className="lens-core"></span>
              </div>
            </div>
            <div className="bento-card-info">
              <h3>Photographié avec du matériel professionnel</h3>
              <p>Boîtiers plein format haute résolution et optiques d'exception pour un piqué parfait.</p>
            </div>
          </div>

          {/* Bento Card 3: Vision & Regard */}
          <div className="bento-card card-vision reveal-bento stagger-3">
            <div className="bento-visual vision-bg">
              <img 
                src="/images/1.jpeg" 
                alt="À la hauteur de votre vision" 
                loading="lazy"
              />
            </div>
            <div className="bento-card-info">
              <h3>À la hauteur de votre vision</h3>
              <p>Une direction artistique sur-mesure qui capte l'essence unique de votre univers.</p>
            </div>
          </div>

          {/* Bento Card 4: Retouche experte incluse */}
          <div className="bento-card card-retouch reveal-bento stagger-4">
            <div className="bento-visual retouch-bg">
              <img 
                src="/images/Thobix_overview.WEBP" 
                alt="Retouche experte, incluse" 
                loading="lazy"
              />
              <div className="retouch-glow-overlay"></div>
            </div>
            <div className="bento-card-info">
              <h3>Retouche experte, incluse</h3>
              <p>Colorimétrie éditoriale raffinée, respect des carnations et textures naturelles.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
