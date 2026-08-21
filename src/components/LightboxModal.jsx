import React, { useEffect } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { soundFx } from '../utils/sound';

export default function LightboxModal({ selectedIndex, onClose, onNavigate, onOpenBooking }) {
  useEffect(() => {
    if (selectedIndex === null) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const prev = (selectedIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
        soundFx.playFilterTick();
        onNavigate(prev);
      }
      if (e.key === 'ArrowRight') {
        const next = (selectedIndex + 1) % PROJECTS_DATA.length;
        soundFx.playFilterTick();
        onNavigate(next);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, onClose, onNavigate]);

  if (selectedIndex === null) return null;

  const project = PROJECTS_DATA[selectedIndex];
  if (!project) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    soundFx.playFilterTick();
    const prev = (selectedIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    onNavigate(prev);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    soundFx.playFilterTick();
    const next = (selectedIndex + 1) % PROJECTS_DATA.length;
    onNavigate(next);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('lightbox-modal')) {
      onClose();
    }
  };

  return (
    <div 
      className={`lightbox-modal ${selectedIndex !== null ? 'active' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="lightbox-content-card">
        <button 
          type="button" 
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* Left Side — Image View & Nav */}
        <div className="lightbox-image-wrapper">
          <button 
            type="button" 
            className="lightbox-nav-btn prev"
            onClick={handlePrev}
            aria-label="Image précédente"
          >
            ←
          </button>
          <img src={project.file} alt={project.title} />
          <button 
            type="button" 
            className="lightbox-nav-btn next"
            onClick={handleNext}
            aria-label="Image suivante"
          >
            →
          </button>
        </div>

        {/* Right Side — Metadata & Story */}
        <div className="lightbox-info-side">
          <div>
            <span className="lightbox-category-tag">
              {project.num} • {project.category}
            </span>
            <h2 className="lightbox-title">{project.title}</h2>
            <p className="lightbox-subtitle">{project.subtitle}</p>
            <p className="lightbox-story-text">{project.story}</p>
          </div>

          <div>
            <div className="lightbox-meta-block">
              <div><strong>CLIENT :</strong> {project.client}</div>
              <div><strong>LIEU :</strong> {project.location}</div>
              <div>
                <strong>EXIF :</strong> 
                <span className="exif-badge">{project.exif}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-primary-atelier"
              style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}
              onClick={() => {
                onClose();
                soundFx.playShutterClick();
                onOpenBooking();
              }}
            >
              <span>COMMANDER CETTE PRESTATION</span>
              <span className="btn-arrow">↗︎</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
