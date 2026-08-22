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
            Des collections sur-mesure conçues pour capturer et sublimer vos projets d'exception.
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
                <p className="pricing-tier-desc">{tier.desc}</p>

                {tier.features && (
                  <div className="pricing-features-grid">
                    {tier.features.map((feat, i) => (
                      <span key={i} className="pricing-feature-pill">
                        ✦ {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pricing-row-price-col">
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
