import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/sound';

export default function BookingDrawer({ isOpen, onClose, initialService = '', onSubmitSuccess }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Prepare custom prefilled text based on selected service or project
  const serviceText = initialService ? ` à propos de : "${initialService}"` : '';

  const whatsappMessage = encodeURIComponent(
    `Bonjour Thobix, je souhaite réserver une session photo / échanger avec vous sur un projet${serviceText}.`
  );
  const whatsappUrl = `https://wa.me/2290164434115?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(
    initialService 
      ? `Demande de session photo — ${initialService} — Thobix Eclou`
      : 'Demande de session photo & collaboration — Thobix Eclou'
  );
  const emailBody = encodeURIComponent(
    `Bonjour Thobix,\n\nJe vous contacte pour échanger sur une session photo / collaboration artistique${serviceText}.\n\nDate ou période souhaitée :\nLieu (Bénin / Guinée / Autre) :\nType de projet :\n\nBien cordialement,`
  );
  const emailUrl = `mailto:thobiseclou@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  const instagramUrl = 'https://www.instagram.com/mister_thobix';
  const facebookUrl = 'https://www.facebook.com/thobix.eclou';

  const handleChannelClick = (channelName) => {
    try {
      soundFx.playShutterClick();
    } catch {
      // sound optional
    }
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const handleCopyPhone = () => {
    try {
      navigator.clipboard.writeText('+2290164434115');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('booking-modal-overlay')) {
      onClose();
    }
  };

  return (
    <div 
      className={`booking-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="booking-modal-card">
        {/* Close Button */}
        <button 
          type="button" 
          className="booking-modal-close"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="booking-modal-header">
          <div className="booking-modal-badge">
            <span className="badge-dot"></span>
            RÉSERVATION & CONTACT DIRECT
          </div>
          <h2 id="booking-modal-title" className="booking-modal-title">
            Contacter <span>Thobix Eclou</span>
          </h2>
          <p className="booking-modal-sub">
            Choisissez votre canal privilégié pour échanger directement sur vos dates, votre brief ou obtenir un devis personnalisé :
          </p>

          {initialService && (
            <div className="booking-service-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
              <span>Projet sélectionné : <strong>{initialService}</strong></span>
            </div>
          )}
        </div>

        {/* Channels Grid */}
        <div className="booking-channels-grid">
          {/* 1. WhatsApp */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-card channel-whatsapp"
            onClick={() => handleChannelClick('WhatsApp')}
          >
            <div className="channel-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12.01 0C5.38 0 0 5.38 0 12.01c0 2.13.55 4.19 1.6 6.01L.06 24l6.17-1.61c1.76.96 3.75 1.47 5.78 1.47 6.63 0 12.01-5.38 12.01-12.01C24.02 5.38 18.64 0 12.01 0zm.01 22.01c-1.84 0-3.63-.5-5.2-1.44l-.37-.22-3.86 1.01 1.03-3.76-.24-.39c-1.04-1.64-1.58-3.54-1.58-5.49 0-5.52 4.49-10.01 10.02-10.01 5.52 0 10.01 4.49 10.01 10.01 0 5.53-4.49 10.02-10.01 10.02zm5.49-7.51c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.49-1.78-1.66-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35z"/>
              </svg>
            </div>
            <div className="channel-info">
              <div className="channel-tag-row">
                <span className="channel-name">WhatsApp</span>
                <span className="channel-pill-tag">Recommandé • Réponse Rapide</span>
              </div>
              <span className="channel-detail">+229 01 64 43 41 15 — Échange immédiat</span>
            </div>
            <div className="channel-action-arrow" aria-hidden="true">↗</div>
          </a>

          {/* 2. Email Direct */}
          <a 
            href={emailUrl} 
            className="channel-card channel-email"
            onClick={() => handleChannelClick('Email')}
          >
            <div className="channel-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div className="channel-info">
              <div className="channel-tag-row">
                <span className="channel-name">Email Professionnel</span>
                <span className="channel-pill-tag">Devis & Brief Pro</span>
              </div>
              <span className="channel-detail">thobiseclou@gmail.com — Envoi de brief</span>
            </div>
            <div className="channel-action-arrow" aria-hidden="true">↗</div>
          </a>

          {/* 3. Instagram DM */}
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-card channel-instagram"
            onClick={() => handleChannelClick('Instagram')}
          >
            <div className="channel-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div className="channel-info">
              <div className="channel-tag-row">
                <span className="channel-name">Instagram</span>
                <span className="channel-pill-tag">Portfolio & DM</span>
              </div>
              <span className="channel-detail">@mister_thobix — Message privé</span>
            </div>
            <div className="channel-action-arrow" aria-hidden="true">↗</div>
          </a>

          {/* 4. Facebook */}
          <a 
            href={facebookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-card channel-facebook"
            onClick={() => handleChannelClick('Facebook')}
          >
            <div className="channel-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="channel-info">
              <div className="channel-tag-row">
                <span className="channel-name">Facebook</span>
                <span className="channel-pill-tag">Page & Messenger</span>
              </div>
              <span className="channel-detail">Thobix Eclou — Actualités & contact</span>
            </div>
            <div className="channel-action-arrow" aria-hidden="true">↗</div>
          </a>
        </div>

        {/* Modal Footer */}
        <div className="booking-modal-footer">
          <div className="booking-modal-direct-phone">
            <div className="direct-phone-left">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="phone-icon-svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Appel direct : <strong>+229 01 64 43 41 15</strong></span>
            </div>
            <button 
              type="button" 
              className={`btn-copy-action ${copied ? 'is-copied' : ''}`}
              onClick={handleCopyPhone}
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '5px' }}>
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                  Numéro copié !
                </>
              ) : (
                'Copier le numéro'
              )}
            </button>
          </div>

          <div className="booking-modal-location-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="location-pin-svg">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Basé à Cotonou (Bénin) & Conakry (Guinée) — Déplacements régionaux & internationaux.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
