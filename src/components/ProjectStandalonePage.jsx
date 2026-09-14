import React, { useEffect, useState } from 'react';
import { soundFx } from '../utils/sound';
import { PROJECTS_COLLECTIONS } from '../data/projects';
import { SITE_CONFIG, SITE_URL } from '../config/site';

export default function ProjectStandalonePage({ 
  projectId, 
  onNavigate, 
  onOpenBooking,
  onOpenLightbox 
}) {
  const projectIndex = PROJECTS_COLLECTIONS.findIndex(p => p.id === projectId);
  const project = projectIndex !== -1 ? PROJECTS_COLLECTIONS[projectIndex] : PROJECTS_COLLECTIONS[0];
  
  const prevProject = projectIndex > 0 ? PROJECTS_COLLECTIONS[projectIndex - 1] : PROJECTS_COLLECTIONS[PROJECTS_COLLECTIONS.length - 1];
  const nextProject = projectIndex < PROJECTS_COLLECTIONS.length - 1 ? PROJECTS_COLLECTIONS[projectIndex + 1] : PROJECTS_COLLECTIONS[0];

  // Primary category resolution
  const getPrimaryCategory = () => {
    const f = project.categoryFilter || '';
    if (f === 'mode' || f === 'fashion') return { slug: 'mode', name: 'Mode & Haute Couture' };
    if (f === 'portrait') return { slug: 'portrait', name: "Portraits d'Auteur" };
    if (f === 'hotel' || f === 'gastro') return { slug: 'art-direction', name: 'Direction Artistique' };
    if (f === 'culture' || f === 'action' || f === 'lifestyle') return { slug: 'editorial', name: 'Éditoriaux' };
    return { slug: 'portrait', name: "Portraits d'Auteur" };
  };

  const primaryCat = getPrimaryCategory();

  // Dynamic Tag URL resolver
  const getTagUrl = (tag) => {
    const t = tag.toLowerCase();
    if (t.includes('bénin') || t.includes('cotonou')) return '/photographe-benin';
    if (t.includes('guinée') || t.includes('conakry')) return '/photographe-guinee';
    if (t.includes('mode') || t.includes('couture') || t.includes('wax') || t.includes('fashion') || t.includes('top model')) return '/portfolio/mode';
    if (t.includes('portrait') || t.includes('artiste') || t.includes('didi') || t.includes('auteur')) return '/portfolio/portrait';
    if (t.includes('gastronomie') || t.includes('sofitel') || t.includes('luxe') || t.includes('industrie') || t.includes('architecture')) return '/portfolio/art-direction';
    return '/portfolio/editorial';
  };

  // Related projects recommendation
  const relatedProjects = PROJECTS_COLLECTIONS.filter(p => {
    if (p.id === project.id) return false;
    const sameCat = p.categoryFilter === project.categoryFilter;
    const sharedTag = (p.tags || []).some(t => (project.tags || []).includes(t));
    return sameCat || sharedTag;
  }).slice(0, 3);

  // Dynamic meta tags & JSON-LD update
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!project) return;

    const pageTitle = `${project.title} — ${project.client || 'Portfolio'} | Thobix Eclou`;
    document.title = pageTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${project.subtitle} — Série photographique réalisée par Thobix Eclou. ${project.story.slice(0, 140)}...`);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `${SITE_URL}/projects/${project.id}`);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Projet introuvable</h2>
        <a href="/" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/'); }}>Retour au portfolio</a>
      </div>
    );
  }

  const handleBooking = () => {
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking(`Projet ${project.title}`);
  };

  const isBenin = (project.tags || []).some(t => t.toLowerCase().includes('bénin') || t.toLowerCase().includes('cotonou')) || 
                  (project.location || '').toLowerCase().includes('bénin') || (project.location || '').toLowerCase().includes('cotonou');

  const isGuinee = (project.tags || []).some(t => t.toLowerCase().includes('guinée') || t.toLowerCase().includes('conakry')) || 
                   (project.location || '').toLowerCase().includes('guinée') || (project.location || '').toLowerCase().includes('conakry');

  return (
    <article className="project-standalone-container">
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
          <a 
            href="/portfolio" 
            onClick={(e) => {
              e.preventDefault();
              soundFx.playFilterTick();
              if (onNavigate) onNavigate('/portfolio');
            }}
          >
            Portfolio
          </a>
          <span className="breadcrumb-sep">/</span>
          <a 
            href={`/portfolio/${primaryCat.slug}`}
            onClick={(e) => {
              e.preventDefault();
              soundFx.playFilterTick();
              if (onNavigate) onNavigate(`/portfolio/${primaryCat.slug}`);
            }}
          >
            {primaryCat.name}
          </a>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{project.title}</span>
        </div>
      </nav>

      {/* Project Hero Header */}
      <header className="standalone-project-header">
        <div className="standalone-header-meta">
          <span className="standalone-num">{project.num}</span>
          <a 
            href={`/portfolio/${primaryCat.slug}`} 
            className="standalone-cat-badge-link"
            onClick={(e) => {
              e.preventDefault();
              soundFx.playFilterTick();
              if (onNavigate) onNavigate(`/portfolio/${primaryCat.slug}`);
            }}
          >
            {project.category}
          </a>
          <span className="standalone-year">{project.year}</span>
        </div>

        <h1 className="standalone-title">{project.title}</h1>
        <p className="standalone-subtitle">{project.subtitle}</p>

        {/* Project Facts Bar */}
        <div className="standalone-facts-bar">
          <div className="fact-item">
            <span className="fact-label">CLIENT / CADRE</span>
            <span className="fact-value">{project.client}</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">RÔLE</span>
            <span className="fact-value">Direction Artistique &amp; Prise de Vue</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">LOCALISATION</span>
            <span className="fact-value">{project.location}</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">IMAGES</span>
            <span className="fact-value">{project.images.length} Clichés HD</span>
          </div>
        </div>
      </header>

      {/* Context & Narrative Story */}
      <section className="standalone-story-section">
        <div className="standalone-story-content">
          <h2 className="standalone-story-heading">Contexte &amp; Vision Artistique</h2>
          <p className="standalone-story-text">{project.story}</p>

          {project.exif && (
            <div className="standalone-exif-pill">
              <span className="exif-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </span>
              <span className="exif-text">Spécifications : {project.exif}</span>
            </div>
          )}

          {/* Semantic & Crawlable Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="standalone-tags-list" aria-label="Thématiques & Tags du projet">
              {project.tags.map((tag, idx) => {
                const targetUrl = getTagUrl(tag);
                return (
                  <a 
                    key={idx} 
                    href={targetUrl} 
                    className="standalone-tag-link"
                    onClick={(e) => {
                      e.preventDefault();
                      soundFx.playFilterTick();
                      if (onNavigate) onNavigate(targetUrl);
                    }}
                    title={`Voir les projets associés à ${tag}`}
                  >
                    #{tag}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="standalone-story-cta">
          <div className="story-cta-box">
            <h4>Un projet photographique similaire ?</h4>
            <p>Discutons de votre vision, de vos délais et des formats de production adaptés.</p>
            <button 
              type="button" 
              className="kaiser-btn-reserve" 
              onClick={handleBooking}
            >
              Réserver une session
            </button>
          </div>
        </div>
      </section>

      {/* Full Photographic Gallery */}
      <section className="standalone-gallery-section" aria-label={`Galerie complète du projet ${project.title}`}>
        <div className="standalone-gallery-header">
          <h2 className="standalone-gallery-title">Planches Contact &amp; Galerie Complète</h2>
          <span className="standalone-gallery-count">{project.images.length} Photographies HD</span>
        </div>

        <div className="standalone-gallery-grid">
          {project.images.map((imgSrc, imgIdx) => (
            <figure 
              key={imgIdx} 
              className="standalone-photo-item"
              onClick={() => {
                if (onOpenLightbox) {
                  soundFx.playFilterTick();
                  onOpenLightbox(project.images, imgIdx);
                }
              }}
            >
              <img 
                src={imgSrc} 
                alt={`${project.title} — Cliché ${imgIdx + 1} par Thobix Eclou`} 
                loading="lazy"
                decoding="async"
              />
              <figcaption className="standalone-photo-caption">
                <span>{project.title}</span>
                <span className="photo-index">№ {String(imgIdx + 1).padStart(2, '0')}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Related Projects / Projets Similaires (Maillage Interne Robuste) */}
      {relatedProjects.length > 0 && (
        <section className="standalone-related-section" aria-label="Projets similaires">
          <div className="standalone-gallery-header">
            <h2 className="standalone-gallery-title">Projets Similaires &amp; Réalisations Liées</h2>
            <a 
              href={`/portfolio/${primaryCat.slug}`}
              className="seo-region-link"
              onClick={(e) => {
                e.preventDefault();
                soundFx.playFilterTick();
                if (onNavigate) onNavigate(`/portfolio/${primaryCat.slug}`);
              }}
            >
              Voir la catégorie {primaryCat.name} →
            </a>
          </div>

          <div className="projects-viewfinder-grid">
            {relatedProjects.map((rel) => (
              <a 
                key={rel.id} 
                href={`/projects/${rel.id}`}
                className="project-vf-card"
                onClick={(e) => {
                  e.preventDefault();
                  soundFx.playFilterTick();
                  if (onNavigate) onNavigate(`/projects/${rel.id}`);
                }}
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
                title={`Consulter le projet ${rel.title}`}
              >
                <div className="vf-card-top-meta">
                  <div className="vf-card-title-col">
                    <h3 className="vf-title">{rel.title}</h3>
                    <span className="vf-date">{rel.year || '2025'}</span>
                  </div>
                  {rel.subtitle && (
                    <p className="vf-card-subtitle">{rel.subtitle}</p>
                  )}
                </div>

                <div className="vf-image-frame">
                  <span className="vf-corner top-left" aria-hidden="true"></span>
                  <span className="vf-corner top-right" aria-hidden="true"></span>
                  <span className="vf-corner bottom-left" aria-hidden="true"></span>
                  <span className="vf-corner bottom-right" aria-hidden="true"></span>

                  <img 
                    src={rel.cover || (rel.images && rel.images[0]) || '/images/1.jpeg'} 
                    alt={`${rel.title} — ${rel.subtitle} | Photographie par Thobix Eclou`} 
                    loading="lazy" 
                    decoding="async" 
                    style={{ objectPosition: rel.coverPosition || 'center 20%' }}
                  />

                  <div className="vf-hover-overlay">
                    <span className="vf-badge-count">
                      {rel.images ? `${rel.images.length} PHOTOS` : 'DOSSIER COMPLET'}
                    </span>
                    <span className="vf-open-prompt">OUVRIR LE DOSSIER ↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Next / Previous Project Navigation */}
      <nav className="standalone-project-nav" aria-label="Projets Suivant et Précédent">
        <a 
          href={`/projects/${prevProject.id}`}
          className="project-nav-link prev"
          onClick={(e) => {
            e.preventDefault();
            soundFx.playFilterTick();
            if (onNavigate) onNavigate(`/projects/${prevProject.id}`);
          }}
        >
          <span className="nav-sub">← PROJET PRÉCÉDENT</span>
          <span className="nav-main">{prevProject.title}</span>
        </a>

        <a 
          href={`/projects/${nextProject.id}`}
          className="project-nav-link next"
          onClick={(e) => {
            e.preventDefault();
            soundFx.playFilterTick();
            if (onNavigate) onNavigate(`/projects/${nextProject.id}`);
          }}
        >
          <span className="nav-sub">PROJET SUIVANT →</span>
          <span className="nav-main">{nextProject.title}</span>
        </a>
      </nav>

      {/* Regional Linking & Return to Portfolio */}
      <footer className="standalone-footer-nav">
        <div className="standalone-regional-links">
          {isBenin && (
            <a 
              href="/photographe-benin"
              className="regional-badge-link"
              onClick={(e) => {
                e.preventDefault();
                soundFx.playFilterTick();
                if (onNavigate) onNavigate('/photographe-benin');
              }}
            >
              Voir toutes les réalisations au Bénin (Cotonou) →
            </a>
          )}
          {isGuinee && (
            <a 
              href="/photographe-guinee"
              className="regional-badge-link"
              onClick={(e) => {
                e.preventDefault();
                soundFx.playFilterTick();
                if (onNavigate) onNavigate('/photographe-guinee');
              }}
            >
              Voir toutes les réalisations en Guinée (Conakry) →
            </a>
          )}
          <a 
            href="/portfolio"
            className="return-portfolio-link"
            onClick={(e) => {
              e.preventDefault();
              soundFx.playFilterTick();
              if (onNavigate) onNavigate('/portfolio');
            }}
          >
            ← Consulter l'ensemble des collections du portfolio
          </a>
        </div>
      </footer>
    </article>
  );
}
