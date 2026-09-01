import React, { useState } from 'react';
import { PROJECTS_COLLECTIONS } from '../data/projects';
import { soundFx } from '../utils/sound';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function ProjectsGrid({ onOpenProject }) {
  const [activeFilter, setActiveFilter] = useState('all');
  useScrollReveal('.reveal-projects', { threshold: 0.1 });

  const handleFilterChange = (filter) => {
    soundFx.playFilterTick();
    setActiveFilter(filter);
  };

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_COLLECTIONS
    : PROJECTS_COLLECTIONS.filter((p) => {
        if (activeFilter === 'hotel') return p.categoryFilter === 'hotel';
        if (activeFilter === 'gastro') return p.categoryFilter === 'gastro';
        if (activeFilter === 'culture') return p.categoryFilter === 'culture';
        if (activeFilter === 'portrait') return p.categoryFilter === 'portrait';
        if (activeFilter === 'action') return p.categoryFilter === 'action' || p.categoryFilter === 'lifestyle';
        return true;
      });

  const handleProjectClick = (project) => {
    soundFx.playShutterClick();
    onOpenProject(project);
  };

  return (
    <section className="section-projects-redesign" id="projects">
      <div className="container">
        {/* "VU DANS" Press & Clients Ticker Strip */}
        <div className="vudans-strip reveal-projects">
          <span className="vudans-label">VU DANS</span>
          <div className="vudans-divider"></div>
          <div className="vudans-logos">
            <span className="vudans-item">SOFITEL</span>
            <span className="sep">•</span>
            <span className="vudans-item">GASTRONOMIE AFRIQUE</span>
            <span className="sep">•</span>
            <span className="vudans-item">CANAL+</span>
            <span className="sep">•</span>
            <span className="vudans-item">VOGUE ÉDITO</span>
            <span className="sep">•</span>
            <span className="vudans-item">PARIS MATCH</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="projects-hero-header reveal-projects">
          <div className="projects-title-group">
            <span className="atelier-about-eyebrow">✦ ARCHIVES & DOSSIERS DE PROJETS</span>
            <h2 className="projects-main-title">Projets & Collections</h2>
            <p className="projects-manifesto-text">
              Chaque image raconte une histoire. Des instants sincères et une direction artistique soignée pour sublimer vos moments les plus précieux.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="projects-filter-bar reveal-projects">
          <button 
            type="button" 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            TOUS LES DOSSIERS ({PROJECTS_COLLECTIONS.length})
          </button>
          <button 
            type="button" 
            className={`filter-tab ${activeFilter === 'hotel' ? 'active' : ''}`}
            onClick={() => handleFilterChange('hotel')}
          >
            HÔTELLERIE & LUXE
          </button>
          <button 
            type="button" 
            className={`filter-tab ${activeFilter === 'gastro' ? 'active' : ''}`}
            onClick={() => handleFilterChange('gastro')}
          >
            HAUTE GASTRONOMIE
          </button>
          <button 
            type="button" 
            className={`filter-tab ${activeFilter === 'culture' ? 'active' : ''}`}
            onClick={() => handleFilterChange('culture')}
          >
            CULTURE & ROYAUTÉ
          </button>
          <button 
            type="button" 
            className={`filter-tab ${activeFilter === 'portrait' ? 'active' : ''}`}
            onClick={() => handleFilterChange('portrait')}
          >
            MODE & PORTRAITS
          </button>
        </div>

        {/* Masonry / Grid with Camera Viewfinder Framing Brackets (Screenshot 5) */}
        <div className="projects-viewfinder-grid">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`project-vf-card reveal-projects stagger-${(idx % 4) + 1} ${idx % 3 === 0 ? 'vf-card-wide' : ''}`}
              onClick={() => handleProjectClick(project)}
            >
              <div className="vf-card-top-meta">
                <div className="vf-card-title-col">
                  <h3 className="vf-title">{project.title}</h3>
                  <span className="vf-date">{project.year || '2025'}</span>
                </div>
              </div>

              {/* Image Frame with 4 Camera Corner Brackets */}
              <div className="vf-image-frame">
                <span className="vf-corner top-left" aria-hidden="true"></span>
                <span className="vf-corner top-right" aria-hidden="true"></span>
                <span className="vf-corner bottom-left" aria-hidden="true"></span>
                <span className="vf-corner bottom-right" aria-hidden="true"></span>

                <img 
                  src={project.cover || (project.images && project.images[0]) || '/images/1.jpeg'} 
                  alt={project.title} 
                  loading="lazy"
                />

                <div className="vf-hover-overlay">
                  <span className="vf-badge-count">
                    {project.images ? `${project.images.length} PHOTOS` : 'DOSSIER COMPLET'}
                  </span>
                  <span className="vf-open-prompt">OUVRIR LE DOSSIER ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
