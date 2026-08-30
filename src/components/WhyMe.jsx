import React from 'react';
import { soundFx } from '../utils/sound';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function WhyMe({ onOpenBooking }) {
  useScrollReveal('.reveal-bento', { threshold: 0.15 });

  return (
    <section className="whyme-section" id="why-me">
      <div className="container">
        <div className="whyme-header reveal-bento">
          <span className="whyme-eyebrow">✦ SIGNATURE ARTISTIQUE & ENGAGEMENT</span>
          <h2 className="whyme-title">Pourquoi confier votre image à Thobix ?</h2>
          <p className="whyme-lead">
            De l'hôtellerie 5★ aux portraits de cheffes étoilées et campagnes de haute couture, je conçois des images puissantes et intemporelles qui subliment votre héritage et captivent votre audience.
          </p>
        </div>

        {/* Bento Grid Layout with Stagger Animation */}
        <div className="whyme-bento-grid">
          {/* Bento Card 1: Expérience */}
          <div className="bento-card card-experience reveal-bento stagger-1">
            <div className="bento-visual">
              <img 
                src="/images/Thobix.WEBP" 
                alt="Thobix Eclou — Photographe & Directeur Artistique" 
                loading="lazy"
              />
              <div className="bento-polaroid-badge">
                <span>✦ DEPUIS 2018</span>
              </div>
            </div>
            <div className="bento-card-info">
              <h3>L'Exigence du Terrain & de l'Art</h3>
              <p>Plus de 7 ans d'immersion au cœur de projets d'exception en Afrique de l'Ouest et à l'international, alliant rigueur technique et regard sensible.</p>
            </div>
          </div>

          {/* Bento Card 2: Matériel Optique Professionnel Canon */}
          <div className="bento-card card-gear reveal-bento stagger-2">
            <div className="bento-gear-visual">
              <img 
                src="/images/canon_eos_r5.jpg" 
                alt="Boîtier Canon EOS R5 & Optiques Série L" 
                loading="lazy"
                className="gear-camera-img"
              />
              <div className="gear-specs-pill">
                <span>CANON EOS R5 • RF 50mm F/1.2 L</span>
              </div>
            </div>
            <div className="bento-card-info">
              <h3>Rigueur Optique Plein Format Canon</h3>
              <p>Boîtiers Canon haute résolution et focales fixes Série L pour un piqué chirurgical, une dynamique de lumière exceptionnelle et des tirages d'art impeccables.</p>
            </div>
          </div>

          {/* Bento Card 3: Vision & Scénographie */}
          <div className="bento-card card-vision reveal-bento stagger-3">
            <div className="bento-visual vision-bg">
              <img 
                src="/projects/heritage-wax-couture/photo-01.jpeg" 
                alt="Direction Artistique & Scénographie — Thobix Eclou" 
                loading="lazy"
              />
            </div>
            <div className="bento-card-info">
              <h3>Direction Artistique & Scénographie</h3>
              <p>Chaque prise de vue est pensée comme un tableau vivant : composition narrative, éclairage sculpté et valorisation authentique de votre univers.</p>
            </div>
          </div>

          {/* Bento Card 4: Retouche & Colorimétrie */}
          <div className="bento-card card-retouch reveal-bento stagger-4">
            <div className="bento-visual retouch-bg">
              <img 
                src="/images/Thobix_overview.WEBP" 
                alt="Colorimétrie & Sublimation des Carnations" 
                loading="lazy"
              />
              <div className="retouch-glow-overlay"></div>
            </div>
            <div className="bento-card-info">
              <h3>Colorimétrie & Respect des Carnations</h3>
              <p>Un traitement numérique d'orfèvre : respect absolu des teintes de peau, textures vivantes et palette éditoriale raffinée sans artifices.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
