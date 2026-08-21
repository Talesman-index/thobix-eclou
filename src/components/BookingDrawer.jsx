import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/sound';

export default function BookingDrawer({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    email: '',
    projectType: 'hotellerie',
    message: ''
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.playShutterClick();
    onSubmitSuccess();
    setFormData({ name: '', brand: '', email: '', projectType: 'hotellerie', message: '' });
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('booking-drawer')) {
      onClose();
    }
  };

  return (
    <div 
      className={`booking-drawer ${isOpen ? 'active' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="booking-drawer-content">
        <div>
          <div className="booking-header">
            <h2>RÉSERVER UNE SESSION</h2>
            <button 
              type="button" 
              className="lightbox-close-btn"
              onClick={onClose}
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom Complet</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="ex: Jean Dupont"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Marque / Entreprise</label>
              <input 
                type="text" 
                id="brand" 
                name="brand" 
                placeholder="ex: Sofitel / Agence / Marque"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Adresse Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="ex: contact@entreprise.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectType">Type de Projet</label>
              <select 
                id="projectType" 
                name="projectType" 
                value={formData.projectType}
                onChange={handleChange}
              >
                <option value="hotellerie">Hôtellerie de Luxe & Palaces 5★</option>
                <option value="gastronomie">Haute Gastronomie & Art Culinaire</option>
                <option value="portrait">Portrait & Équipes Dirigeantes</option>
                <option value="evenement">Événement de Prestige & Sport</option>
                <option value="autre">Direction Artistique Sur-Mesure</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Description du Projet</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                required 
                placeholder="Décrivez votre projet, le calendrier et vos objectifs visuels..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn-submit-booking">
              <span>ENVOYER LA DEMANDE DE RÉSERVATION</span>
              <span className="btn-arrow">↗︎</span>
            </button>
          </form>
        </div>

        <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          ✦ Disponibilité : Bénin & Monde Entier • Réponse sous 24h
        </div>
      </div>
    </div>
  );
}
