import React from 'react';

export default function Hero() {
  return (
    <section className="alexa-hero-section" id="hero">
      <div className="alexa-hero-container">
        <div className="alexa-image-frame">
          <img 
            src="/images/4.jpeg" 
            alt="Thobix Eclou — Direction Artistique & Photographie de Prestige" 
            loading="eager" 
          />
        </div>
        <div className="alexa-name-overlay">
          <h1 className="alexa-name-left">THOBIX</h1>
          <div className="alexa-bio-center">
            <span className="bio-line">PHOTOGRAPHE &</span>
            <span className="bio-line">DIRECTEUR ARTISTIQUE</span>
          </div>
          <h1 className="alexa-name-right">ECLOU</h1>
        </div>
      </div>
    </section>
  );
}
