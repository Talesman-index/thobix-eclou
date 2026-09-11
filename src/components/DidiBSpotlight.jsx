import React, { useState, useRef, useEffect } from 'react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const sectionRef = useRef(null);

  // Autoplay as soon as user scrolls into the section
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Gentle default volume
    audio.volume = 0.65;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User entered section: attempt autoplay
            const playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(() => {
                  // Autoplay policy prevented unmuted autoplay before interaction
                  setIsPlaying(false);
                });
            }
          } else {
            // User scrolled away from section: pause audio
            if (!audio.paused) {
              audio.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="didib-spotlight-section" id="didi-b-gold" ref={sectionRef}>
      {/* Hidden Audio Player for Good Vibes */}
      <audio 
        ref={audioRef}
        src="/audio/good-vibes.mp3"
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

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

        {/* Historic Context Story Banner with Interactive Vinyl Player */}
        <div className="didib-narrative-card">
          <div className="didib-turntable-block">
            <button 
              type="button"
              className={`didib-vinyl-decoration ${isPlaying ? 'is-spinning' : 'is-paused'}`}
              onClick={togglePlay}
              title={isPlaying ? "Mettre en pause « Good Vibes »" : "Écouter « Good Vibes » (Didi B ft. Zinoleesky)"}
              aria-label={isPlaying ? "Pause Good Vibes" : "Écouter Good Vibes"}
            >
              <div className="vinyl-groove" />
              
              {/* Center Gold Disc with Play/Pause Button */}
              <div className="vinyl-center">
                <span className="vinyl-play-icon" aria-hidden="true">
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" rx="1.5" />
                      <rect x="14" y="5" width="4" height="14" rx="1.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l12-7.36a1 1 0 0 0 0-1.72l-12-7.36A1 1 0 0 0 8 5.14z" />
                    </svg>
                  )}
                </span>
                <span className="vinyl-center-badge">TCSN</span>
              </div>

              {/* Glowing Sound Wave Rings when Playing */}
              {isPlaying && (
                <div className="vinyl-pulse-ring" aria-hidden="true" />
              )}
            </button>

            {/* Interactive Track Capsule Bar */}
            <div 
              className={`didib-audio-capsule ${isPlaying ? 'is-active' : ''}`}
              onClick={togglePlay}
              role="button"
              tabIndex={0}
            >
              <div className="capsule-equalizer" aria-hidden="true">
                <span className={`eq-bar ${isPlaying ? 'eq-play' : ''}`} />
                <span className={`eq-bar ${isPlaying ? 'eq-play' : ''}`} />
                <span className={`eq-bar ${isPlaying ? 'eq-play' : ''}`} />
              </div>
              <div className="capsule-text">
                <span className="capsule-song">Good Vibes</span>
                <span className="capsule-artist">Didi B • Zinoleesky</span>
              </div>
              <span className="capsule-action">
                {isPlaying ? "PAUSE" : "PLAY"}
              </span>
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
