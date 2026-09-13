import React, { useEffect } from 'react';
import { soundFx } from '../utils/sound';
import { PROJECTS_COLLECTIONS } from '../data/projects';
import { SITE_CONFIG, SITE_URL } from '../config/site';

export default function CategoryPortfolioPage({ 
  categorySlug = null, 
  onNavigate, 
  onOpenBooking,
  onOpenProject 
}) {
  const currentCategory = SITE_CONFIG.categories.find(c => c.slug === categorySlug);

  const pageTitle = currentCategory 
    ? currentCategory.title 
    : "Portfolio & Archives Photographiques — Thobix Eclou";

  const pageDescription = currentCategory 
    ? currentCategory.description 
    : "Explorez l'ensemble des séries photographiques et directions artistiques réalisées par Thobix Eclou au Bénin, en Guinée et en Afrique de l'Ouest.";

  const filteredProjects = currentCategory
    ? PROJECTS_COLLECTIONS.filter(currentCategory.filter)
    : PROJECTS_COLLECTIONS;

  const pageUrl = currentCategory 
    ? `${SITE_URL}/portfolio/${currentCategory.slug}`
    : `${SITE_URL}/portfolio`;

  // Update dynamic document title & meta tags on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${pageTitle} | Thobix Eclou`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDescription);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', pageUrl);
    }
  }, [categorySlug, pageTitle, pageDescription, pageUrl]);

  const handleBooking = () => {
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking(currentCategory ? `Projet ${currentCategory.name}` : 'Session Portfolio');
  };

  const handleProjectClick = (e, project) => {
    e.preventDefault();
    soundFx.playFilterTick();
    if (onOpenProject) {
      onOpenProject(project);
    } else if (onNavigate) {
      onNavigate(`/projects/${project.id}`);
    }
  };

  const handleCategoryClick = (e, targetUrl) => {
    e.preventDefault();
    soundFx.playFilterTick();
    if (onNavigate) onNavigate(targetUrl);
  };

  return (
    <div className="category-portfolio-container">
      {/* Breadcrumb Navigation */}
      <nav className="seo-breadcrumb" aria-label="Fil d'Ariane">
        <div className="seo-breadcrumb-inner">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              soundFx.playFilterTick();
              if (onNavigate) onNavigate('/');
            }}
          >
            Accueil
          </a>
          <span className="breadcrumb-sep">/</span>
          {currentCategory ? (
            <>
              <a 
                href="/portfolio" 
                onClick={(e) => handleCategoryClick(e, '/portfolio')}
              >
                Portfolio
              </a>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{currentCategory.name}</span>
            </>
          ) : (
            <span className="breadcrumb-current">Portfolio Complet</span>
          )}
        </div>
      </nav>

      {/* Hero Header */}
      <header className="category-portfolio-hero">
        <div className="local-seo-hero-badge">
          <span>{currentCategory ? currentCategory.name : "PORTFOLIO & ARCHIVES"}</span>
        </div>
        <h1 className="local-seo-title">{pageTitle}</h1>
        <p className="category-portfolio-lead">{pageDescription}</p>

        {/* Crawlable Category Navigation Pills */}
        <nav className="category-nav-pills" aria-label="Catégories du portfolio">
          <a 
            href="/portfolio" 
            className={`category-pill-item ${!categorySlug ? 'active' : ''}`}
            onClick={(e) => handleCategoryClick(e, '/portfolio')}
          >
            Tous les projets ({PROJECTS_COLLECTIONS.length})
          </a>
          {SITE_CONFIG.categories.map((cat) => {
            const count = PROJECTS_COLLECTIONS.filter(cat.filter).length;
            return (
              <a 
                key={cat.slug} 
                href={`/portfolio/${cat.slug}`}
                className={`category-pill-item ${categorySlug === cat.slug ? 'active' : ''}`}
                onClick={(e) => handleCategoryClick(e, `/portfolio/${cat.slug}`)}
              >
                {cat.name} ({count})
              </a>
            );
          })}
        </nav>
      </header>

      {/* Projects Grid */}
      <section className="category-projects-section" aria-label="Projets de cette catégorie">
        <div className="local-seo-grid">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className="local-seo-card"
            >
              <a 
                href={`/projects/${project.id}`} 
                className="local-seo-card-image-wrap"
                onClick={(e) => handleProjectClick(e, project)}
                title={`Ouvrir le dossier ${project.title}`}
              >
                <img 
                  src={project.cover} 
                  alt={`${project.title} — ${project.subtitle} | Photographie par Thobix Eclou`} 
                  loading="lazy"
                  decoding="async"
                />
                <div className="local-seo-card-overlay">
                  <span className="local-seo-view-btn">Consulter le dossier ↗</span>
                </div>
                <span className="local-seo-tag-pill">{project.category}</span>
              </a>
              
              <div className="local-seo-card-body">
                <span className="local-seo-card-meta">{project.client} • {project.year}</span>
                <h2 className="local-seo-card-title">
                  <a 
                    href={`/projects/${project.id}`}
                    onClick={(e) => handleProjectClick(e, project)}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {project.title}
                  </a>
                </h2>
                <p className="local-seo-card-story">{project.subtitle}</p>
                <div className="local-seo-card-footer">
                  <span className="local-seo-card-count">{project.images.length} clichés HD</span>
                  <a 
                    href={`/projects/${project.id}`} 
                    className="local-seo-link"
                    onClick={(e) => handleProjectClick(e, project)}
                  >
                    Voir le projet →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <footer className="local-seo-bottom-nav">
        <div className="local-seo-cta-banner">
          <div className="cta-banner-content">
            <h3 className="cta-banner-title">Vous avez un projet éditorial ou commercial ?</h3>
            <p className="cta-banner-desc">
              Disponible pour des productions à Cotonou, Conakry et à travers toute l'Afrique de l'Ouest.
            </p>
          </div>
          <button 
            type="button" 
            className="kaiser-btn-reserve" 
            onClick={handleBooking}
          >
            Réserver un appel
          </button>
        </div>
      </footer>
    </div>
  );
}
