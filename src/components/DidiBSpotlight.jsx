import React, { useState } from 'react';

const DIDI_B_PHOTOS = [
  {
    id: 1,
    src: "/projects/didi-b-disque-dor/photo-01.webp",
    fallback: "/projects/didi-b-disque-dor/photo-01.jpeg",
    title: "Le Cliché Officiel du Disque d'Or",
    subtitle: "Portrait en denim brut & carafe d'art gravé sur la plaque TCSN",
    tag: "Cliché Plaque Officielle"
  },
  {
    id: 2,
    src: "/projects/didi-b-disque-dor/photo-02.webp",
    fallback: "/projects/didi-b-disque-dor/photo-02.jpeg",
    title: "Didi B & la Plaque TCSN TurnTable Nigeria",
    subtitle: "Célébration officielle du Disque d'Or pour « Good Vibes » feat. Zinoleesky",
    tag: "Certification TCSN 🇳🇬"
  },
  {
    id: 3,
    src: "/projects/didi-b-disque-dor/photo-03.webp",
    fallback: "/projects/didi-b-disque-dor/photo-03.jpeg",
    title: "Mojaveli — Souveraineté & Joaillerie",
    subtitle: "Mains jointes pavées de diamants & montre Rolex or",
    tag: "Portrait Haute Joaillerie"
  },
  {
    id: 4,
    src: "/projects/didi-b-disque-dor/photo-04.webp",
    fallback: "/projects/didi-b-disque-dor/photo-04.jpeg",
    title: "Introspection & Triomphe",
    subtitle: "L'attitude d'un leader du rap francophone à Lagos",
    tag: "Éditorial Mode"
  },
  {
    id: 5,
    src: "/projects/didi-b-disque-dor/photo-05.webp",
    fallback: "/projects/didi-b-disque-dor/photo-05.jpeg",
    title: "Le Regard Mojaveli",
    subtitle: "Posture iconique, chaîne Jesus piece sertie & lunettes fumées",
    tag: "Portrait Signature"
  }
];

export default function DidiBSpotlight({ onOpenPhoto, onOpenDossier }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  return (
    <section className="didib-spotlight-section" id="didi-b-gold">
      {/* Background Gold Ambient Glows */}
      <div className="didib-gold-ambient-glow left-glow" aria-hidden="true" />
      <div className="didib-gold-ambient-glow right-glow" aria-hidden="true" />

      <div className="didib-spotlight-container">
        {/* Prestige Header */}
        <header className="didib-header">
          <div className="didib-prestige-badge">
            <span className="didib-badge-icon">✦</span>
            <span className="didib-badge-text">ÉVÉNEMENT & CERTIFICATION HISTORIQUE</span>
          </div>
          
          <h2 className="didib-title">
            DIDI B <span className="didib-title-gold">LE CLICHÉ DU DISQUE D'OR</span>
          </h2>
          
          <p className="didib-lead-quote">
            Premier artiste d'Afrique francophone certifié Disque d'Or au Nigeria
          </p>
        </header>

        {/* Historic Context Story Banner */}
        <div className="didib-narrative-card">
          <div className="didib-vinyl-decoration" aria-hidden="true">
            <div className="vinyl-groove" />
            <div className="vinyl-center">
              <span>TCSN</span>
            </div>
          </div>
          <div className="didib-narrative-text">
            <div className="didib-narrative-eyebrow">
              RECORD HISTORIQUE & COLLABORATION INTERNATIONALE
            </div>
            <p>
              Un jalon historique pour le rap et la musique africaine. Avec son single à succès mondial « Good Vibes » en duo avec l'étoile montante nigériane Zinoleesky, Didi B est officiellement devenu le tout premier artiste francophone de l'histoire certifié Disque d'Or au Nigeria par le TurnTable Certification System of Nigeria (TCSN), franchissant le cap prestigieux de 50 000 unités vendues.
            </p>
            <p>
              Pour matérialiser ce triomphe et orner la plaque commémorative officielle aux côtés du vinyle doré, c'est le portrait exclusif capturé par le photographe Thobix Eclou qui a été sélectionné. Une consécration photographique qui témoigne de la puissance visuelle d'un instant gravé dans les annales de l'industrie musicale panafricaine.
            </p>
          </div>
        </div>

        {/* Central Visual Showdown: Cliché Original vs Plaque Officielle */}
        <div className="didib-dual-showcase">
          {/* Card 1: Original Shot */}
          <div 
            className="didib-showcase-card original-card"
            onClick={() => onOpenPhoto && onOpenPhoto(0)}
            role="button"
            tabIndex={0}
          >
            <div className="didib-card-media-wrapper">
              <picture>
                <source srcSet="/projects/didi-b-disque-dor/photo-01.webp" type="image/webp" />
                <img 
                  src="/projects/didi-b-disque-dor/photo-01.jpeg" 
                  alt="Portrait original de Didi B par Thobix Eclou" 
                  className="didib-card-img"
                  loading="lazy"
                />
              </picture>
              <span className="didib-card-pill pill-gold">CLICHÉ ORIGINAL</span>
            </div>
            <div className="didib-card-info">
              <span className="didib-card-camera-tag">50mm • Retouche Éditoriale • Signature Thobix Eclou</span>
              <h3 className="didib-card-title">Le Portrait d'Auteur</h3>
              <p className="didib-card-desc">
                Didi B en denim brut et carafe de tequila d'exception, capturé avec un éclairage sculpté lors de sa tournée.
              </p>
            </div>
          </div>

          {/* Golden Bridge Indicator */}
          <div className="didib-bridge-indicator">
            <div className="bridge-line" />
            <div className="bridge-badge">
              <span className="bridge-arrow">⇄</span>
              <span className="bridge-label">GRAVÉ SUR LA PLAQUE</span>
            </div>
            <div className="bridge-line" />
          </div>

          {/* Card 2: Official Plaque Award */}
          <div 
            className="didib-showcase-card plaque-card"
            onClick={() => onOpenPhoto && onOpenPhoto(1)}
            role="button"
            tabIndex={0}
          >
            <div className="didib-card-media-wrapper">
              <picture>
                <source srcSet="/projects/didi-b-disque-dor/photo-02.webp" type="image/webp" />
                <img 
                  src="/projects/didi-b-disque-dor/photo-02.jpeg" 
                  alt="Didi B brandissant son Disque d'Or TCSN Nigeria avec la photo de Thobix Eclou" 
                  className="didib-card-img"
                  loading="lazy"
                />
              </picture>
              <span className="didib-card-pill pill-tcsn">TCSN NIGERIA 🇳🇬</span>
            </div>
            <div className="didib-card-info">
              <span className="didib-card-camera-tag">TurnTable Certification System of Nigeria</span>
              <h3 className="didib-card-title">La Plaque du Disque d'Or</h3>
              <p className="didib-card-desc">
                Didi B recevant son trophée officiel à Lagos avec la photo de Thobix Eclou imprimée à gauche du vinyle doré.
              </p>
            </div>
          </div>
        </div>

        {/* Prestigous Certification Numbers Bar */}
        <div className="didib-metrics-grid">
          <div className="didib-metric-item">
            <div className="didib-metric-val">50 000+</div>
            <div className="didib-metric-label">Unités Certifiées Or</div>
            <div className="didib-metric-sub">Marché Nigérian & Streaming</div>
          </div>
          <div className="didib-metric-item">
            <div className="didib-metric-val">1er</div>
            <div className="didib-metric-label">Artiste Francophone</div>
            <div className="didib-metric-sub">Dans l'histoire du Nigeria</div>
          </div>
          <div className="didib-metric-item">
            <div className="didib-metric-val">TCSN</div>
            <div className="didib-metric-label">TurnTable Charts</div>
            <div className="didib-metric-sub">Organisme officiel de certification</div>
          </div>
          <div className="didib-metric-item">
            <div className="didib-metric-val">THOBIX</div>
            <div className="didib-metric-label">Photographe Auteur</div>
            <div className="didib-metric-sub">Cliché officiel de la plaque</div>
          </div>
        </div>

        {/* Complete Session Gallery Viewer */}
        <div className="didib-gallery-preview">
          <div className="didib-gallery-header">
            <div>
              <span className="didib-gallery-eyebrow">SESSION COMPLÈTE</span>
              <h3 className="didib-gallery-title">Les 5 Clichés de la Collection Mojaveli</h3>
            </div>
            <button 
              type="button" 
              className="didib-view-all-btn"
              onClick={() => onOpenDossier && onOpenDossier()}
            >
              <span>Ouvrir le dossier complet</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>

          <div className="didib-thumbnails-strip">
            {DIDI_B_PHOTOS.map((photo, idx) => (
              <div 
                key={photo.id}
                className={`didib-thumb-card ${idx === activePhotoIndex ? 'is-active' : ''}`}
                onClick={() => {
                  setActivePhotoIndex(idx);
                  if (onOpenPhoto) onOpenPhoto(idx);
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  loading="lazy"
                />
                <div className="didib-thumb-overlay">
                  <span className="thumb-num">0{idx + 1}</span>
                  <span className="thumb-tag">{photo.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
