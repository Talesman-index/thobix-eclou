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
            De l'hôtellerie 5★ aux portraits de sommités et campagnes de haute couture, je conçois des images puissantes et intemporelles qui subliment votre héritage et captivent votre audience.
          </p>
        </div>

        {/* Creative Asymmetrical Bento Editorial Grid */}
        <div className="whyme-creative-bento">
          {/* Row 1 - Card 1 (Span 7): Master Portrait & Direction Artistique */}
          <div className="bento-creative-card card-experience-hero reveal-bento stagger-1">
            <div className="bento-hero-visual">
              <picture>
                <source srcSet="/images/Thobix.WEBP" type="image/webp" />
                <img 
                  src="/images/Thobix.WEBP" 
                  alt="Thobix Eclou — Directeur Artistique & Photographe" 
                  loading="lazy"
                />
              </picture>
              <div className="bento-polaroid-pill">
                <span className="pill-dot">●</span>
                <span>DEPUIS 2022 • DIRECTION ARTISTIQUE</span>
              </div>
              <div className="bento-viewfinder-brackets" aria-hidden="true">
                <span className="b-corner tl"></span>
                <span className="b-corner tr"></span>
                <span className="b-corner bl"></span>
                <span className="b-corner br"></span>
              </div>
            </div>
            <div className="bento-hero-info">
              <span className="bento-tag-mini">EXPÉRIENCE & REGARD D'AUTEUR</span>
              <h3>L'Exigence du Terrain & de l'Art</h3>
              <p>Plus de 4 ans d'immersion au cœur de projets d'exception en Afrique de l'Ouest et à l'international, alliant rigueur technique, sensibilité narrative et excellence esthétique.</p>
            </div>
          </div>

          {/* Row 1 - Card 2 (Span 5): Studio Gear & Optical Precision */}
          <div className="bento-creative-card card-gear-studio reveal-bento stagger-2">
            <div className="bento-gear-visual">
              <picture>
                <source srcSet="/images/studio_gear_optics.webp" type="image/webp" />
                <img 
                  src="/images/studio_gear_optics.jpeg" 
                  alt="Matériel Professionnel & Optiques de Haute Précision" 
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="bento-gear-info">
              <h3>Matériel Professionnel & Haute Précision</h3>
              <p>Optiques de prestige, modeleurs de lumière professionnels et étalonnage rigoureux : un arsenal de pointe pour garantir un piqué chirurgical et des rendus d'exception.</p>
            </div>
          </div>

          {/* Row 2 - Card 3 (Span 5): Scenography & Heritage Framing */}
          <div className="bento-creative-card card-vision-couture reveal-bento stagger-3">
            <div className="bento-vision-visual">
              <img 
                src="/projects/heritage-wax-couture/photo-01.jpeg" 
                alt="Direction Artistique & Scénographie — Thobix Eclou" 
                loading="lazy"
              />
              <div className="bento-art-badge">
                <span>SCÉNOGRAPHIE ÉDITORIALE</span>
              </div>
            </div>
            <div className="bento-vision-info">
              <h3>Direction Artistique & Scénographie</h3>
              <p>Chaque prise de vue est pensée comme un tableau vivant : composition narrative, éclairage sculpté et valorisation authentique de votre univers.</p>
            </div>
          </div>

          {/* Row 2 - Card 4 (Span 7): Colorimetry & Chromatic Skin Tones */}
          <div className="bento-creative-card card-colorimetry-master reveal-bento stagger-4">
            <div className="colorimetry-split-grid">
              <div className="colorimetry-portrait-visual">
                <picture>
                  <source srcSet="/images/colorimetrie_carnations.webp" type="image/webp" />
                  <img 
                    src="/images/colorimetrie_carnations.jpeg" 
                    alt="Colorimétrie & Respect des Carnations — Thobix Eclou" 
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="colorimetry-editorial-content">
                <div className="colorimetry-palette-bar">
                  <span className="palette-label">NUANCIER CARNATIONS</span>
                  <div className="palette-swatches">
                    <span className="swatch swatch-terracotta" title="Terracotta Warm"></span>
                    <span className="swatch swatch-emerald" title="Émeraude Impérial"></span>
                    <span className="swatch swatch-gold" title="Ocre Doré"></span>
                    <span className="swatch swatch-deep" title="Noir Profond"></span>
                  </div>
                </div>
                <h3>Colorimétrie & Respect des Carnations</h3>
                <p>Un traitement numérique d'orfèvre : respect absolu des teintes de peau naturelles, textures vivantes et palette éditoriale raffinée sans aucun artifice.</p>
                <div className="colorimetry-meta-pills">
                  <span className="meta-pill">✓ Teintes Réelles</span>
                  <span className="meta-pill">✓ Zéro Lissage Excessif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
