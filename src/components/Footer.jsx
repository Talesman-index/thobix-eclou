import React from 'react';
import { soundFx } from '../utils/sound';

export default function Footer({ onOpenBooking }) {
  const handleBooking = () => {
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking();
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    soundFx.playFilterTick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerPhotos = [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
    "/images/6.jpeg",
    "/images/8.jpeg"
  ];

  return (
    <footer className="footer-kaiser-section" id="contact">
      <div className="footer-kaiser-wrapper">
        {/* Left Floating White Card (Screenshot 3) */}
        <div className="footer-white-card">
          <div className="footer-card-header">
            <h2 className="footer-card-title">Restons en contact</h2>
            <p className="footer-card-desc">
              Disponible pour des réservations, des campagnes et de belles collaborations. Basé en Afrique de l'Ouest, je travaille dans le monde entier.
            </p>
            <button 
              type="button" 
              className="footer-plan-btn"
              onClick={handleBooking}
            >
              <span>Planifier un appel</span>
              <span className="btn-arrow">↗</span>
            </button>
          </div>

          {/* Links 3-Columns Grid */}
          <div className="footer-card-links-grid">
            {/* Column 1: Liens rapides */}
            <div className="footer-links-col">
              <h4 className="col-heading">LIENS RAPIDES</h4>
              <ul>
                <li><a href="#hero" onClick={(e) => scrollTo(e, 'hero')}>Accueil</a></li>
                <li><a href="#about" onClick={(e) => scrollTo(e, 'about')}>À propos</a></li>
                <li><a href="#services" onClick={(e) => scrollTo(e, 'services')}>Services</a></li>
                <li><a href="#projects" onClick={(e) => scrollTo(e, 'projects')}>Portfolio</a></li>
                <li><a href="#testimonials" onClick={(e) => scrollTo(e, 'testimonials')}>Témoignages</a></li>
                <li><a href="#booking-calendar" onClick={(e) => scrollTo(e, 'booking-calendar')}>Réserver</a></li>
                <li><a href="#contact" onClick={(e) => scrollTo(e, 'contact')}>Contact</a></li>
              </ul>
            </div>

            {/* Column 2: Contact Direct Réel de Thobix */}
            <div className="footer-links-col">
              <h4 className="col-heading">CONTACT</h4>
              <ul>
                <li><a href="mailto:contact@thobix.com">contact@thobix.com</a></li>
                <li><a href="tel:+22901644343">+229 01 64 43 43</a></li>
                <li>
                  <a href="https://wa.me/22901644343" target="_blank" rel="noopener noreferrer">
                    WhatsApp (+229) ↗
                  </a>
                </li>
                <li className="location-item">
                  Afrique de l'Ouest & International
                </li>
              </ul>
            </div>

            {/* Column 3: Réseaux Sociaux Réels de Thobix */}
            <div className="footer-links-col">
              <h4 className="col-heading">RÉSEAUX</h4>
              <ul>
                <li>
                  <a href="https://www.instagram.com/mister_thobix" target="_blank" rel="noopener noreferrer">
                    Instagram @mister_thobix ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/thobix.eclou" target="_blank" rel="noopener noreferrer">
                    Facebook Thobix Eclou ↗
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/22901644343" target="_blank" rel="noopener noreferrer">
                    WhatsApp Direct ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="footer-card-bottom">
            <span>© 2026 Thobix Eclou Photography. Tous droits réservés.</span>
            <span className="footer-made-with">Afrique de l'Ouest & Partout où le besoin se fait sentir</span>
          </div>
        </div>

        {/* Right Vertical Photo Strip Collage (Screenshot 3) */}
        <div className="footer-photo-strip">
          <div className="photo-strip-grid">
            {footerPhotos.map((src, i) => (
              <div key={i} className="strip-photo-item">
                <img src={src} alt={`Thobix Eclou editorial photography ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
