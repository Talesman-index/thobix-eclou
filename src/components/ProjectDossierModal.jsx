import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../utils/sound';

export default function ProjectDossierModal({ project, isOpen, onClose, onOpenBooking }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const thumbnailStripRef = useRef(null);

  // Reset photo index when project changes
  useEffect(() => {
    if (project) {
      setCurrentPhotoIndex(0);
      setViewMode('slider');
    }
  }, [project]);

  // Lock body scroll and handle keyboard navigation
  useEffect(() => {
    if (!isOpen || !project) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'ArrowLeft') {
        goToPrev();
      }
      if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, project, currentPhotoIndex]);

  // Auto scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const activeThumb = thumbnailStripRef.current.children[currentPhotoIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [currentPhotoIndex, viewMode]);

  if (!isOpen || !project) return null;

  const totalPhotos = project.images.length;

  const goToPrev = () => {
    soundFx.playFilterTick();
    setCurrentPhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const goToNext = () => {
    soundFx.playFilterTick();
    setCurrentPhotoIndex((prev) => (prev + 1) % totalPhotos);
  };

  const selectPhoto = (index) => {
    soundFx.playShutterClick();
    setCurrentPhotoIndex(index);
    setViewMode('slider');
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    if (touchEndXRef.current === 0) return;
    if (deltaX > 45) {
      goToNext();
    } else if (deltaX < -45) {
      goToPrev();
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  const handleBooking = () => {
    onClose();
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking();
  };

  return (
    <div 
      className={`dossier-modal-backdrop ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target.classList.contains('dossier-modal-backdrop')) {
          onClose();
        }
      }}
    >
      <div className="dossier-modal-window">
        {/* Modal Topbar */}
        <header className="dossier-modal-header">
          <div className="dossier-header-left">
            <button 
              type="button" 
              className="dossier-back-btn-mobile"
              onClick={onClose}
              aria-label="Fermer le dossier"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <span className="dossier-badge-number">{project.num}</span>
            <div className="dossier-title-stack">
              <h2 className="dossier-header-title">{project.title}</h2>
              <span className="dossier-header-meta">
                {project.category} • {totalPhotos} Photos
              </span>
            </div>
          </div>

          <div className="dossier-header-right">
            {/* View Mode Toggle (Desktop) */}
            <div className="dossier-mode-toggle desktop-mode-toggle">
              <button 
                type="button" 
                className={`mode-toggle-btn ${viewMode === 'slider' ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playFilterTick();
                  setViewMode('slider');
                }}
                title="Mode Diaporama"
              >
                <span>DIAPORAMA</span>
              </button>
              <button 
                type="button" 
                className={`mode-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playFilterTick();
                  setViewMode('grid');
                }}
                title="Mode Grille de photos"
              >
                <span>GRILLE ({totalPhotos})</span>
              </button>
            </div>

            {/* Close Button */}
            <button 
              type="button" 
              className="dossier-close-button"
              onClick={onClose}
              aria-label="Fermer"
              title="Fermer (Échap)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* Modal Main Body */}
        <div className="dossier-modal-body">
          {/* Dedicated Clean Mode Switcher Bar on Mobile */}
          <div className="dossier-mobile-mode-bar">
            <button 
              type="button" 
              className={`mobile-mode-pill ${viewMode === 'slider' ? 'active' : ''}`}
              onClick={() => {
                soundFx.playFilterTick();
                setViewMode('slider');
              }}
            >
              DIAPORAMA
            </button>
            <button 
              type="button" 
              className={`mobile-mode-pill ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => {
                soundFx.playFilterTick();
                setViewMode('grid');
              }}
            >
              GRILLE ({totalPhotos})
            </button>
          </div>

          {viewMode === 'slider' ? (
            <div className="dossier-slider-layout">
              {/* Main Visual Stage */}
              <div 
                className="dossier-stage"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="dossier-stage-image-container">
                  {/* 4 Camera Viewfinder Framing Brackets */}
                  <span className="vf-corner top-left" aria-hidden="true"></span>
                  <span className="vf-corner top-right" aria-hidden="true"></span>
                  <span className="vf-corner bottom-left" aria-hidden="true"></span>
                  <span className="vf-corner bottom-right" aria-hidden="true"></span>

                  <img 
                    src={project.images[currentPhotoIndex]} 
                    alt={`${project.title} — Photo ${currentPhotoIndex + 1}`}
                    className="dossier-current-image"
                    key={currentPhotoIndex}
                  />

                  {/* Navigation Arrows */}
                  <button 
                    type="button" 
                    className="dossier-nav-arrow prev"
                    onClick={goToPrev}
                    aria-label="Photo précédente"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    className="dossier-nav-arrow next"
                    onClick={goToNext}
                    aria-label="Photo suivante"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>

                  {/* Photo Counter Overlay */}
                  <div className="dossier-counter-pill">
                    <span>{String(currentPhotoIndex + 1).padStart(2, '0')}</span>
                    <span className="counter-sep">/</span>
                    <span>{String(totalPhotos).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Horizontal Filmstrip / Thumbnails Ribbon */}
                <div className="dossier-thumbnails-wrapper">
                  <div className="dossier-thumbnails-strip" ref={thumbnailStripRef}>
                    {project.images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`dossier-thumb-item ${idx === currentPhotoIndex ? 'active' : ''}`}
                        onClick={() => selectPhoto(idx)}
                        aria-label={`Aller à la photo ${idx + 1}`}
                      >
                        <img src={imgUrl} alt={`Miniature ${idx + 1}`} loading="lazy" />
                        <span className="thumb-index-tag">{idx + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editorial Context & Story Sidebar */}
              <aside className="dossier-sidebar">
                <div className="dossier-sidebar-content">
                  <div className="dossier-sidebar-header">
                    <span className="dossier-cat-pill">✦ {project.category}</span>
                    <h3 className="dossier-sidebar-title">{project.subtitle}</h3>
                  </div>

                  <div className="dossier-story-card">
                    <h4 className="dossier-block-label">CONTEXTE DU PROJET & VISION ARTISTIQUE</h4>
                    <p className="dossier-story-paragraph">{project.story}</p>
                  </div>

                  <div className="dossier-meta-specs">
                    <div className="spec-row">
                      <span className="spec-label">CLIENT :</span>
                      <span className="spec-value">{project.client}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">LOCALISATION :</span>
                      <span className="spec-value">{project.location}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">ANNÉE :</span>
                      <span className="spec-value">{project.year}</span>
                    </div>
                    {project.exif && (
                      <div className="spec-row">
                        <span className="spec-label">TECHNIQUE :</span>
                        <span className="spec-value spec-exif">{project.exif}</span>
                      </div>
                    )}
                  </div>

                  {project.tags && (
                    <div className="dossier-tags-cloud">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="dossier-tag">#{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="dossier-cta-block">
                    <button 
                      type="button" 
                      className="dossier-reserve-btn"
                      onClick={handleBooking}
                    >
                      <span>RÉSERVER UNE SESSION SIMILAIRE</span>
                      <span className="btn-arrow">↗</span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            /* Complete Gallery Grid Mode */
            <div className="dossier-full-grid-view">
              <div className="dossier-grid-header-note">
                <p>Cliquez sur n'importe quelle photo pour l'afficher en plein écran dans le diaporama.</p>
              </div>
              <div className="dossier-all-photos-grid">
                {project.images.map((imgUrl, idx) => (
                  <div 
                    key={idx}
                    className="dossier-grid-photo-card"
                    onClick={() => selectPhoto(idx)}
                  >
                    <span className="vf-corner top-left" aria-hidden="true"></span>
                    <span className="vf-corner top-right" aria-hidden="true"></span>
                    <span className="vf-corner bottom-left" aria-hidden="true"></span>
                    <span className="vf-corner bottom-right" aria-hidden="true"></span>

                    <img src={imgUrl} alt={`${project.title} — ${idx + 1}`} loading="lazy" />
                    <div className="dossier-photo-hover-overlay">
                      <span className="hover-view-btn">AFFICHER № {idx + 1} ↗</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
