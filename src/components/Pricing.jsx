import React from 'react';
import { PRICING_TIERS } from '../data/projects';
import { soundFx } from '../utils/sound';

export default function Pricing({ onOpenBooking }) {
  const handlePricingRowClick = (tierId) => {
    soundFx.playShutterClick();
    onOpenBooking(tierId);
  };

  return (
    <section id="pricing" className="inspiration-pricing-section">
      <div className="inspiration-pricing-container">
        <div className="inspiration-pricing-header">
          <span className="atelier-about-eyebrow">✦ TARIFS & FORMULES SUR-MESURE</span>
          <h2 className="pricing-watermark-title">TARIFS & FORMULES</h2>
          <p className="pricing-manifesto-lead">
            CHAQUE MOMENT CAPTURÉ EST UN SOUVENIR INESTIMABLE, UN TÉMOIGNAGE DE LA NATURE ÉPHÉMÈRE DU TEMPS. DÉCOUVREZ NOS FORMULES CONÇUES POUR PRÉSERVER L'ESSENCE DE VOTRE HISTOIRE AVEC LA PLUS HAUTE EXIGENCE.
          </p>
        </div>

        <div className="inspiration-pricing-list">
          {PRICING_TIERS.map((tier) => (
            <div 
              key={tier.id}
              className="inspiration-pricing-row"
              onClick={() => handlePricingRowClick(tier.id)}
            >
              <div className="pricing-row-title-col">
                <h3>{tier.name}</h3>
                <p>{tier.desc}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="pricing-tier-amount">{tier.price}</span>
                <span className="pricing-tier-arrow">↗︎</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
