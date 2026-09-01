import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/useScrollReveal';
import { soundFx } from '../utils/sound';

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Olivia Park",
    role: "Directrice Éditoriale, Style Quarterly",
    avatar: "/images/2.jpeg",
    stars: 5,
    quote: "Un œil éditorial exceptionnel. Chaque image racontait une histoire complète tout en restant fidèle au brief. Un talent rare."
  },
  {
    id: 2,
    name: "Daniel Chen",
    role: "Fondateur & DA, Atelier Nord",
    avatar: "/images/3.jpeg",
    stars: 5,
    quote: "Thobix capte la lumière comme personne et ne manque jamais l'instant décisif. Un résultat bien au-delà de nos attentes."
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "Créatrice de Haute Joaillerie",
    avatar: "/images/4.jpeg",
    stars: 5,
    quote: "Thobix a rendu toute la séance d'une simplicité déconcertante. Les images ont sublimé mes créations et leur histoire avec une élégance pure."
  },
  {
    id: 4,
    name: "Cheffe Georgiana Viou",
    role: "Cheffe Étoilée Michelin",
    avatar: "/images/1.jpeg",
    stars: 5,
    quote: "Une sensibilité gastronomique et humaine remarquable. Il a su retranscrire toute la rigueur et l'émotion de ma brigade."
  },
  {
    id: 5,
    name: "Marc-Aurèle Dossou",
    role: "Directeur de Campagne, Cotonou Luxury",
    avatar: "/images/6.jpeg",
    stars: 5,
    quote: "Une vision artistique moderne, un sens inné du cadrage et une ponctualité exemplaire sur chaque projet d'envergure."
  },
  {
    id: 6,
    name: "Elena Rostova",
    role: "Commissaire d'Exposition",
    avatar: "/images/8.jpeg",
    stars: 5,
    quote: "Ses tirages ont une profondeur et une âme uniques. Thobix sait révéler l'invisible avec une délicatesse magistrale."
  }
];

export default function Testimonials() {
  useScrollReveal('.reveal-testimonials', { threshold: 0.15 });
  const trackRef = useRef(null);

  const scrollLeft = () => {
    soundFx.playFilterTick();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    soundFx.playFilterTick();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  // Tripled array for seamless infinite marquee loop
  const marqueeItems = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="testimonials-header reveal-testimonials">
          <span className="testimonials-eyebrow">✦ AVIS & COLLABORATIONS</span>
          <h2 className="testimonials-title">Ce que disent mes clients</h2>
          <p className="testimonials-subtitle">
            De vrais mots de celles et ceux avec qui j'ai travaillé. Leur expérience parle de mon approche mieux que je ne le pourrais.
          </p>

          {/* Navigation Controls for Left/Right Scrolling */}
          <div className="testimonials-slider-controls">
            <button 
              type="button" 
              className="testimonials-ctrl-btn" 
              onClick={scrollLeft}
              aria-label="Témoignage précédent"
            >
              ←
            </button>
            <span className="testimonials-ctrl-hint">Glisser ou survoler pour figer</span>
            <button 
              type="button" 
              className="testimonials-ctrl-btn" 
              onClick={scrollRight}
              aria-label="Témoignage suivant"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Horizontal Streaming Carousel Track */}
      <div className="testimonials-stream-wrapper" ref={trackRef}>
        <div className="testimonials-marquee-track">
          {marqueeItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="testimonial-card stream-card">
              <div className="testimonial-card-top">
                <div className="testimonial-avatar-wrap">
                  <img src={item.avatar} alt={item.name} loading="lazy" />
                </div>
                <div className="testimonial-stars">
                  {'★'.repeat(item.stars)}
                </div>
              </div>

              <blockquote className="testimonial-quote">
                « {item.quote} »
              </blockquote>

              <div className="testimonial-author">
                <span className="author-name">{item.name}</span>
                <span className="author-role">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
