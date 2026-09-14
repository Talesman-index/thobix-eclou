import React, { useEffect } from 'react';
import { soundFx } from '../utils/sound';
import { PROJECTS_COLLECTIONS } from '../data/projects';
import { SITE_CONFIG, SITE_URL } from '../config/site';

export default function LocalSeoPage({ 
  region = 'benin', 
  onOpenBooking, 
  onNavigate, 
  onOpenProject 
}) {
  const isBenin = region === 'benin' || region === 'cotonou';
  
  const pageData = isBenin ? {
    country: "Bénin",
    city: "Cotonou",
    title: "Photographe Professionnel & Directeur Artistique au Bénin (Cotonou)",
    eyebrow: "BÉNIN • COTONOU & ENVIRONS",
    tagline: "Portrait d'auteur, mode, hôtellerie 5 étoiles, haute gastronomie et direction artistique.",
    lead: "Basé à Cotonou et disponible à travers tout le Bénin ainsi qu'en Afrique de l'Ouest, Thobix Eclou conçoit des univers visuels singuliers pour des institutions prestigieuses, des personnalités éminentes, des créateurs de mode et des marques exigeantes.",
    accentColor: "rgba(93, 185, 171, 0.15)",
    projectFilter: (p) => {
      const tags = (p.tags || []).map(t => t.toLowerCase());
      const loc = (p.location || '').toLowerCase();
      return loc.includes('bénin') || loc.includes('cotonou') || tags.includes('bénin') || tags.includes('cotonou') || p.id === 'kon-dokpo-sofitel' || p.id === 'oui-chef-georgiana-viou' || p.id === 'port-autonome-cotonou';
    },
    otherRegion: {
      name: "Guinée (Conakry)",
      url: "/photographe-guinee"
    }
  } : {
    country: "Guinée",
    city: "Conakry",
    title: "Photographe Professionnel & Directeur Artistique en Guinée (Conakry)",
    eyebrow: "GUINÉE • CONAKRY & AFRIQUE DE L'OUEST",
    tagline: "Éditoriaux mode haute couture, portraits d'exception et campagnes créatives.",
    lead: "Travaillant régulièrement entre Conakry, Cotonou et l'Afrique de l'Ouest, Thobix Eclou accompagne les modèles, maisons de couture, artistes et marques dans la production de récits photographiques puissants, raffinés et intemporels.",
    accentColor: "rgba(100, 180, 160, 0.15)",
    projectFilter: (p) => {
      const tags = (p.tags || []).map(t => t.toLowerCase());
      const loc = (p.location || '').toLowerCase();
      return loc.includes('guinée') || loc.includes('conakry') || tags.includes('guinée') || tags.includes('conakry') || p.id === 'fanta-top-model-guinee' || p.id === 'djeinab-modele-guinee' || p.id === 'la-guineenne-modele-photo' || p.id === 'heritage-wax-couture' || p.id === 'shooting-mode-studio';
    },
    otherRegion: {
      name: "Bénin (Cotonou)",
      url: "/photographe-benin"
    }
  };

  const filteredProjects = PROJECTS_COLLECTIONS.filter(pageData.projectFilter);

  // Update dynamic document title & meta tags on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fullTitle = `${pageData.title} | Thobix Eclou`;
    document.title = fullTitle;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${pageData.title}. ${pageData.lead}`);
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const pageUrl = `${SITE_URL}/${isBenin ? 'photographe-benin' : 'photographe-guinee'}`;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', pageUrl);
    }
  }, [isBenin, pageData]);

  const handleBooking = () => {
    soundFx.playShutterClick();
    if (onOpenBooking) onOpenBooking(`Session ${pageData.country} (${pageData.city})`);
  };

  const handleProjectClick = (e, project) => {
    e.preventDefault();
    soundFx.playFilterTick();
    if (onOpenProject) {
      onOpenProject(project);
    }
  };

  return (
    <div className="local-seo-page-container">
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
          <span className="breadcrumb-current">
            Photographe {pageData.country} ({pageData.city})
          </span>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="local-seo-hero">
        <div className="local-seo-hero-badge">
          <span>{pageData.eyebrow}</span>
        </div>
        <h1 className="local-seo-title">{pageData.title}</h1>
        <p className="local-seo-subtitle">{pageData.tagline}</p>
        
        <div className="local-seo-lead-box">
          <p className="local-seo-lead-text">{pageData.lead}</p>
          <div className="local-seo-hero-actions">
            <button 
              type="button" 
              className="kaiser-manifesto-btn" 
              onClick={handleBooking}
            >
              <span>RÉSERVER UNE SESSION EN {pageData.country.toUpperCase()}</span>
              <span className="btn-arrow">↗</span>
            </button>
            <a 
              href="/" 
              className="local-seo-secondary-btn"
              onClick={(e) => {
                e.preventDefault();
                soundFx.playFilterTick();
                if (onNavigate) onNavigate('/');
              }}
            >
              Découvrir tout le portfolio
            </a>
          </div>
        </div>
      </header>

      {/* Featured Projects Grid in this Region */}
      <section className="local-seo-projects-section" aria-label={`Projets réalisés en ${pageData.country}`}>
        <div className="local-seo-section-header">
          <span className="seo-section-kicker">✦ SÉLECTION DE TRAVAUX</span>
          <h2 className="seo-section-title">Projets Réalisés &amp; Collaborations en {pageData.country}</h2>
          <p className="seo-section-desc">
            Chaque série est une exploration d'auteur, combinant exigence technique, scénographie lumineuse et respect des carnations.
          </p>
        </div>

        <div className="projects-viewfinder-grid">
          {filteredProjects.map((project, idx) => (
            <a 
              key={project.id} 
              href={`/projects/${project.id}`}
              className={`project-vf-card ${idx % 3 === 0 ? 'vf-card-wide' : ''}`}
              onClick={(e) => handleProjectClick(e, project)}
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
              title={`Consulter le projet ${project.title}`}
            >
              <div className="vf-card-top-meta">
                <div className="vf-card-title-col">
                  <h3 className="vf-title">{project.title}</h3>
                  <span className="vf-date">{project.year || '2025'}</span>
                </div>
                {project.subtitle && (
                  <p className="vf-card-subtitle">{project.subtitle}</p>
                )}
              </div>

              {/* Image Frame with 4 Camera Corner Brackets */}
              <div className="vf-image-frame">
                <span className="vf-corner top-left" aria-hidden="true"></span>
                <span className="vf-corner top-right" aria-hidden="true"></span>
                <span className="vf-corner bottom-left" aria-hidden="true"></span>
                <span className="vf-corner bottom-right" aria-hidden="true"></span>

                <img 
                  src={project.cover || (project.images && project.images[0]) || '/images/1.jpeg'} 
                  alt={`${project.title} — ${project.subtitle} | Photographie par Thobix Eclou`} 
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: project.coverPosition || 'center 20%' }}
                />

                <div className="vf-hover-overlay">
                  <span className="vf-badge-count">
                    {project.images ? `${project.images.length} PHOTOS` : 'DOSSIER COMPLET'}
                  </span>
                  <span className="vf-open-prompt">OUVRIR LE DOSSIER ↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Specific Service Offerings in this Region */}
      <section className="local-seo-services" aria-label="Services photographiques">
        <div className="local-seo-section-header">
          <span className="seo-section-kicker">✦ EXPERTISES</span>
          <h2 className="seo-section-title">Services &amp; Formats d'Intervention</h2>
        </div>

        <div className="seo-services-grid">
          <div className="seo-service-box">
            <span className="service-box-num">01</span>
            <h3 className="service-box-title">Portraits d'Auteur &amp; Personnalités</h3>
            <p className="service-box-desc">
              Portraits de dirigeants, personnalités publiques, artistes et créateurs. Éclairage soigné en studio mobile ou en lumière naturelle sculptée.
            </p>
          </div>

          <div className="seo-service-box">
            <span className="service-box-num">02</span>
            <h3 className="service-box-title">Mode Éditoriale &amp; Campagnes</h3>
            <p className="service-box-desc">
              Direction artistique complète pour lookbooks, défilés, agences de mannequins et marques de mode africaines et internationales.
            </p>
          </div>

          <div className="seo-service-box">
            <span className="service-box-num">03</span>
            <h3 className="service-box-title">Hôtellerie de Luxe &amp; Gastronomie</h3>
            <p className="service-box-desc">
              Valorisation d'établissements 5 étoiles, d'art de la table, d'expériences culinaires de chefs et d'événements de prestige.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Linking & Next Steps */}
      <footer className="local-seo-bottom-nav">
        <div className="local-seo-crosslink">
          <span>Vous préparez également un projet dans une autre région ?</span>
          <a 
            href={pageData.otherRegion.url} 
            className="seo-region-link"
            onClick={(e) => {
              e.preventDefault();
              soundFx.playFilterTick();
              if (onNavigate) onNavigate(pageData.otherRegion.url);
            }}
          >
            Découvrir les réalisations en {pageData.otherRegion.name} →
          </a>
        </div>

        <div className="local-seo-cta-banner">
          <div className="cta-banner-content">
            <h3 className="cta-banner-title">Concrétisez votre vision visuelle</h3>
            <p className="cta-banner-desc">
              Échangeons sur vos besoins, vos dates et les options de production adaptées à vos objectifs.
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
