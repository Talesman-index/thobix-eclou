import React from 'react';
import { soundFx } from '../utils/sound';
import { useScrollReveal } from '../utils/useScrollReveal';

export const COLLAGE_GALLERY_ITEMS = [
  {
    id: 0,
    src: "/images/2.jpeg",
    title: "Fight Night — Arts Martiaux & Dynamisme",
    caption: "Capture dynamique de mouvements sur le ring • Précision et vitesse"
  },
  {
    id: 1,
    src: "/images/3.jpeg",
    title: "Casino & Atmosphère Feutrée",
    caption: "Scénographie tamisée et jeux de lumières chaudes"
  },
  {
    id: 2,
    src: "/images/4.jpeg",
    title: "Arcade & Nightlife VIP",
    caption: "Sélection éditoriale — Contrastes vibrants et immersion festive"
  },
  {
    id: 3,
    src: "/images/6.jpeg",
    title: "Entraînement & Combat",
    caption: "Intensité brute et concentration sportive"
  },
  {
    id: 4,
    src: "/images/8.jpeg",
    title: "Haute Gastronomie & Art de la Table",
    caption: "Texture dorée et mise en scène culinaire raffinée"
  }
];

export default function FilmRolls({ onSelectPhoto, onOpenBooking }) {
  useScrollReveal('.reveal-collage', { threshold: 0.15 });

  const handlePhotoClick = (index) => {
    soundFx.playShutterClick();
    if (onSelectPhoto) onSelectPhoto(index);
  };

  const handleBooking = () => {
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking();
  };

  return (
    <section className="gallery-collage-section" id="gallery-highlight">
      <div className="collage-container">
        {/* Left Side: Statement & CTA (Screenshot 2) */}
        <div className="collage-statement-col reveal-collage">
          <button 
            type="button" 
            className="collage-reserve-btn"
            onClick={handleBooking}
          >
            <span>Réserver une séance</span>
            <span className="btn-arrow">↗</span>
          </button>

          <p className="collage-manifesto-text">
            J'aide les marques et les créatifs à bâtir des images durables, pensées avec intention, précision et respect de l'histoire derrière chaque prise.
          </p>

          <div className="collage-tagline-sub">
            <span className="dot-pulse"></span>
            <span>Direction Artistique • Mode • Gastronomie • Hôtellerie</span>
          </div>
        </div>

        {/* Center/Right Side: Asymmetrical Collage with Pure Photo Viewers */}
        <div className="collage-stage reveal-collage">
          {/* Top Left Floating Image */}
          <div 
            className="collage-card card-top-left parallax-card-tl"
            onClick={() => handlePhotoClick(0)}
            title="Afficher la photo en plein écran"
          >
            <img 
              src={COLLAGE_GALLERY_ITEMS[0].src} 
              alt={COLLAGE_GALLERY_ITEMS[0].title} 
              loading="lazy"
            />
          </div>

          {/* Top Right Floating Image */}
          <div 
            className="collage-card card-top-right parallax-card-tr"
            onClick={() => handlePhotoClick(1)}
            title="Afficher la photo en plein écran"
          >
            <img 
              src={COLLAGE_GALLERY_ITEMS[1].src} 
              alt={COLLAGE_GALLERY_ITEMS[1].title} 
              loading="lazy"
            />
          </div>

          {/* Large Centerpiece Hero Portrait */}
          <div 
            className="collage-card card-center-hero parallax-card-center"
            onClick={() => handlePhotoClick(2)}
            title="Afficher la photo en plein écran"
          >
            <img 
              src={COLLAGE_GALLERY_ITEMS[2].src} 
              alt={COLLAGE_GALLERY_ITEMS[2].title} 
              loading="eager"
            />
            <div className="card-center-badge">
              <span>✦ SÉLECTION ÉDITORIALE</span>
            </div>
          </div>

          {/* Bottom Left Floating Image */}
          <div 
            className="collage-card card-bottom-left parallax-card-bl"
            onClick={() => handlePhotoClick(3)}
            title="Afficher la photo en plein écran"
          >
            <img 
              src={COLLAGE_GALLERY_ITEMS[3].src} 
              alt={COLLAGE_GALLERY_ITEMS[3].title} 
              loading="lazy"
            />
          </div>

          {/* Bottom Right Floating Image */}
          <div 
            className="collage-card card-bottom-right parallax-card-br"
            onClick={() => handlePhotoClick(4)}
            title="Afficher la photo en plein écran"
          >
            <img 
              src={COLLAGE_GALLERY_ITEMS[4].src} 
              alt={COLLAGE_GALLERY_ITEMS[4].title} 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
