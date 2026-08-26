import React, { useState } from 'react';
import { PROJECTS_COLLECTIONS } from '../data/projects';
import { soundFx } from '../utils/sound';

export default function ProjectsGrid({ onOpenProject }) {
  const [activeFilter, setActiveFilter] = useState('all');

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
        <div className="projects-hero-header">
          <div className="projects-title-group">
            <span className="atelier-about-eyebrow">✦ ARCHIVES & DOSSIERS DE PROJETS</span>
            <h2>Projets & Collections</h2>
            <p className="projects-manifesto-text">
              Découvrez les séries photographiques et reportages exclusifs signés Thobix Eclou. Cliquez sur un dossier pour parcourir l'ensemble des clichés et plonger au cœur du récit visuel.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="projects-filter-bar">
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
            PATRIMOINE & CULTURE
          </button>
          <button 
            type="button" 
            className={`filter-tab ${activeFilter === 'portrait' ? 'active' : ''}`}
            onClick={() => handleFilterChange('portrait')}
          >
            MODE & PORTRAIT
          </button>
          <button 
            type="button" 
            className={`filter-tab ${activeFilter === 'action' ? 'active' : ''}`}
            onClick={() => handleFilterChange('action')}
          >
            ÉVÉNEMENTS & SPORT
          </button>
        </div>

        {/* Projects Masonry Grid */}
        <div className="projects-masonry-grid">
          {filteredProjects.map((project) => {
            const previewThumbnails = project.images.slice(0, 4);
            const remainingCount = project.images.length - previewThumbnails.length;

            return (
              <article 
                key={project.id}
                className={`project-tile-card ${project.gridClass} project-dossier-card`}
                onClick={() => handleProjectClick(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleProjectClick(project);
                  }
                }}
              >
                <div className="project-tile-image">
                  <img 
                    src={project.cover} 
                    alt={project.title} 
                    loading="lazy" 
                  />

                  {/* Clean Minimalist Editorial Overlay */}
                  <div className="project-tile-content">
                    {/* Top Row: Discreet number & photo count */}
                    <div className="project-card-top-row">
                      <span className="editorial-card-num">{project.num}</span>
                      <span className="editorial-card-count">{project.images.length} PHOTOS</span>
                    </div>

                    {/* Bottom: Refined Category & Title */}
                    <div className="project-card-bottom">
                      <div className="editorial-card-category">
                        <span>✦ {project.category}</span>
                      </div>
                      <div className="editorial-title-row">
                        <h3 className="tile-title">{project.title}</h3>
                        <span className="editorial-arrow">↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
