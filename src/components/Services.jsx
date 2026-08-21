import React from 'react';
import { soundFx } from '../utils/sound';

export default function Services({ onOpenBooking }) {
  const handleBooking = () => {
    soundFx.playShutterClick();
    onOpenBooking();
  };

  return (
    <section id="services" className="atelier-services-section">
      <div className="atelier-services-container">
        <div className="atelier-services-head">
          <div className="services-head-left">
            <span className="services-eyebrow">✦ EXPERTISE & SAVOIR-FAIRE</span>
            <h2 className="services-main-title">
              CE QUE JE VOUS <em className="title-accent">APPORTE.</em>
            </h2>
          </div>
          <div className="services-head-right">
            <p className="services-lead-text">
              Une écriture visuelle d'auteur soignée et intemporelle, au service des marques de luxe, des palaces et des tables gastronomiques d'exception.
            </p>
          </div>
        </div>

        <div className="services-grid-3">
          {/* Service 1 */}
          <div className="atelier-service-card" onClick={handleBooking}>
            <div className="service-card-image">
              <img 
                src="images/4.jpeg" 
                alt="Hôtellerie de Luxe & Architecture — Thobix Eclou" 
                loading="lazy" 
              />
              <div className="service-num-badge">01</div>
            </div>
            <div className="service-card-body">
              <h3 className="service-title">HÔTELLERIE DE LUXE & ARCHITECTURE</h3>
              <p className="service-desc">
                Suites présidentielles, spas et espaces d'exception. Une mise en lumière subtile des volumes et des atmosphères pour séduire une clientèle internationale exigeante.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="atelier-service-card" onClick={handleBooking}>
            <div className="service-card-image">
              <img 
                src="images/3.jpeg" 
                alt="Haute Gastronomie & Art Culinaire — Thobix Eclou" 
                loading="lazy" 
              />
              <div className="service-num-badge">02</div>
            </div>
            <div className="service-card-body">
              <h3 className="service-title">HAUTE GASTRONOMIE & ART CULINAIRE</h3>
              <p className="service-desc">
                Précision du geste, textures et glacis. Une photographie culinaire pensée pour magnifier les créations des chefs, susciter le désir et valoriser la haute table.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="atelier-service-card" onClick={handleBooking}>
            <div className="service-card-image">
              <img 
                src="images/2.jpeg" 
                alt="Direction Artistique & Image de Marque — Thobix Eclou" 
                loading="lazy" 
              />
              <div className="service-num-badge">03</div>
            </div>
            <div className="service-card-body">
              <h3 className="service-title">DIRECTION ARTISTIQUE & BRANDING</h3>
              <p className="service-desc">
                Du moodboard au plateau, production publicitaire et éditoriale complète. Des récits visuels sur-mesure pour vos lancements, vos égéries et vos événements d'envergure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
