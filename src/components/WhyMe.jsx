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
                <span>✦ DEPUIS 2022</span>
              </div>
            </div>
            <div className="bento-card-info">
              <h3>L'Exigence du Terrain & de l'Art</h3>
              <p>Plus de 4 ans d'immersion au cœur de projets d'exception en Afrique de l'Ouest et à l'international, alliant rigueur technique et regard sensible.</p>
            </div>
          </div>

          {/* Bento Card 2: Matériel & Équipement Professionnel */}
          <div className="bento-card card-gear reveal-bento stagger-2">
            <div className="bento-gear-visual">
              <img 
                src="/images/canon_eos_r5.jpg" 
                alt="Matériel Professionnel & Équipement de Haute Précision" 
                loading="lazy"
                className="gear-camera-img"
              />
              <div className="gear-specs-pill">
                <span>ÉQUIPEMENT DE POINTE • HAUTE PRÉCISION</span>
              </div>
            </div>
            <div className="bento-card-info">
              <h3>Matériel Professionnel & Haute Précision</h3>
              <p>Optiques de prestige, modeleurs de lumière professionnels et étalonnage rigoureux : un arsenal technique haut de gamme pour garantir un piqué chirurgical et des rendus d'exception.</p>
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
              <picture>
                <source srcSet="/images/colorimetrie_carnations.webp" type="image/webp" />
                <img 
                  src="/images/colorimetrie_carnations.jpeg" 
                  alt="Colorimétrie & Sublimation des Carnations — Thobix Eclou" 
                  loading="lazy"
                />
              </picture>
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
