import React, { useEffect, useRef } from 'react';
import { soundFx } from '../utils/sound';

export default function FilmRolls({ onSelectPhoto }) {
  const sectionRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    let requestFrameId;

    const handleScroll = () => {
      if (!sectionRef.current || !col1Ref.current || !col2Ref.current || !col3Ref.current) return;
      if (window.innerWidth < 768) {
        col1Ref.current.style.transform = 'none';
        col2Ref.current.style.transform = 'none';
        col3Ref.current.style.transform = 'none';
        return;
      }
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom > -200 && rect.top < windowHeight + 200) {
        const offset = windowHeight / 2 - (rect.top + rect.height / 2);
        col1Ref.current.style.transform = `translate3d(0, ${offset * -0.12}px, 0)`;
        col2Ref.current.style.transform = `translate3d(0, ${offset * 0.14}px, 0)`;
        col3Ref.current.style.transform = `translate3d(0, ${offset * -0.18}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(requestFrameId);
      requestFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(requestFrameId);
    };
  }, []);

  const handleCardClick = (photoIndex) => {
    soundFx.playShutterClick();
    onSelectPhoto(photoIndex);
  };

  return (
    <section className="section-film-rolls" id="film-rolls" ref={sectionRef}>
      <div className="container">
        <div className="film-rolls-header">
          <span className="atelier-about-eyebrow">✦ EXPLORATION VISUELLE PARALLÈLE</span>
          <h2 className="film-rolls-title">SÉRIES EN DÉFILEMENT</h2>
          <p className="projects-manifesto-text" style={{ margin: '0.8rem auto 0 auto' }}>
            Un défilé continu d'images capturées sur le terrain : immersion culinaire, élégance hôtelière et moments d'intensité.
          </p>
        </div>

        <div className="film-rolls-grid">
          {/* Column 1 */}
          <div className="film-column" ref={col1Ref}>
            <div className="film-card" onClick={() => handleCardClick(0)}>
              <img src="/images/7.jpeg" alt="Sofitel Cotonou Marina" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">Sofitel Cotonou Marina</span>
              </div>
            </div>
            <div className="film-card" onClick={() => handleCardClick(4)}>
              <img src="/images/5.jpeg" alt="Lévitation Bartender" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">Lévitation Bartender</span>
              </div>
            </div>
            <div className="film-card" onClick={() => handleCardClick(6)}>
              <img src="/images/1.jpeg" alt="Nuit Émeraude — Casino" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">Nuit Émeraude — Casino</span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="film-column" ref={col2Ref}>
            <div className="film-card" onClick={() => handleCardClick(1)}>
              <img src="/images/8.jpeg" alt="Festin Doré sous Cuivre" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">Festin Doré sous Cuivre</span>
              </div>
            </div>
            <div className="film-card" onClick={() => handleCardClick(5)}>
              <img src="/images/9.jpeg" alt="Fine Dining Sushis" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">Fine Dining Sushis</span>
              </div>
            </div>
            <div className="film-card" onClick={() => handleCardClick(7)}>
              <img src="/images/3.jpeg" alt="Table de Roulette VIP" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">Table de Roulette VIP</span>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="film-column" ref={col3Ref}>
            <div className="film-card" onClick={() => handleCardClick(2)}>
              <img src="/images/6.jpeg" alt="High-Kick FBMMA Combat" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">High-Kick FBMMA Combat</span>
              </div>
            </div>
            <div className="film-card" onClick={() => handleCardClick(3)}>
              <img src="/images/10.jpeg" alt="La Rosace Écarlate" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">La Rosace Écarlate</span>
              </div>
            </div>
            <div className="film-card" onClick={() => handleCardClick(9)}>
              <img src="/images/2.jpeg" alt="FBMMA Action Freeze" loading="lazy" />
              <div className="film-card-overlay">
                <span className="film-card-title">FBMMA Action Freeze</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
