import React, { useEffect, useRef } from 'react';
import { soundFx } from '../utils/sound';

export default function LightboxModal({ 
  photos = [], 
  currentIndex = 0, 
  isOpen = false, 
  onClose, 
  onNavigate 
}) {
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  useEffect(() => {
    if (!isOpen || photos.length === 0) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen || photos.length === 0 || currentIndex === null) return null;

  const currentPhoto = photos[currentIndex];
  if (!currentPhoto) return null;

  const total = photos.length;

  const goToPrev = () => {
    soundFx.playFilterTick();
    const prev = (currentIndex - 1 + total) % total;
    if (onNavigate) onNavigate(prev);
  };

  const goToNext = () => {
    soundFx.playFilterTick();
    const next = (currentIndex + 1) % total;
    if (onNavigate) onNavigate(next);
  };

  // Touch Swipe Handlers
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

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('single-photo-modal-backdrop')) {
      onClose();
    }
  };

  return (
    <div 
      className={`single-photo-modal-backdrop ${isOpen ? 'active' : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        className="single-photo-modal-window"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar with Close Button */}
        <div className="single-photo-topbar">
          <div className="photo-index-badge">
            <span>PHOTO {String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="sep">/</span>
            <span>{String(total).padStart(2, '0')}</span>
          </div>

          <button 
            type="button" 
            className="single-photo-close-btn"
            onClick={onClose}
            aria-label="Fermer"
            title="Fermer (Échap)"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Main Stage with Viewfinder Framing Brackets */}
        <div className="single-photo-stage">
          <span className="vf-corner top-left" aria-hidden="true"></span>
          <span className="vf-corner top-right" aria-hidden="true"></span>
          <span className="vf-corner bottom-left" aria-hidden="true"></span>
          <span className="vf-corner bottom-right" aria-hidden="true"></span>

          <img 
            src={typeof currentPhoto === 'string' ? currentPhoto : currentPhoto.src} 
            alt={currentPhoto.title || `Photo ${currentIndex + 1}`}
            className="single-photo-img"
            key={currentIndex}
          />

          {/* Navigation Arrows */}
          <button 
            type="button" 
            className="single-photo-nav prev"
            onClick={goToPrev}
            aria-label="Photo précédente"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button 
            type="button" 
            className="single-photo-nav next"
            onClick={goToNext}
            aria-label="Photo suivante"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Bottom Caption Bar */}
        {currentPhoto.title && (
          <div className="single-photo-caption-bar">
            <span className="caption-title">{currentPhoto.title}</span>
            {currentPhoto.caption && (
              <span className="caption-sub">{currentPhoto.caption}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
