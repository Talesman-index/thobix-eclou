import React from 'react';
import { useScrollReveal } from '../utils/useScrollReveal';

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Olivia Park",
    role: "Style Quarterly",
    avatar: "/images/2.jpeg",
    stars: 5,
    quote: "Un œil éditorial exceptionnel. Chaque image racontait une histoire complète tout en restant fidèle au brief. Un talent rare."
  },
  {
    id: 2,
    name: "Daniel Chen",
    role: "Atelier Nord",
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
  }
];

export default function Testimonials() {
  useScrollReveal('.reveal-testimonials', { threshold: 0.15 });

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        {/* Section Header (Screenshot 1) */}
        <div className="testimonials-header reveal-testimonials">
          <span className="testimonials-eyebrow">✦ AVIS & COLLABORATIONS</span>
          <h2 className="testimonials-title">Ce que disent mes clients</h2>
          <p className="testimonials-subtitle">
            De vrais mots de celles et ceux avec qui j'ai travaillé — leur expérience parle de mon approche mieux que je ne le pourrais.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <div key={item.id} className={`testimonial-card reveal-testimonials stagger-${idx + 1}`}>
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
