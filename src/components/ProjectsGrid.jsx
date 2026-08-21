import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { soundFx } from '../utils/sound';

export default function ProjectsGrid({ onSelectPhoto }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filter) => {
    soundFx.playFilterTick();
    setActiveFilter(filter);
  };

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((project) => project.categoryFilter === activeFilter);

  return (
    <section className="section-projects-redesign" id="projects">
      <div className="container">
        <div className="projects-hero-header">
          <div className="projects-title-group">
            <h2>Projets & Collections</h2>
            <p className="projects-manifesto-text">
              Photographie d'auteur & direction artistique sur-mesure. Capturer l'élégance, valoriser votre savoir-faire avec la plus haute exigence.
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
            TOUS LES PROJETS
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
            className={`filter-tab ${activeFilter === 'bar' ? 'active' : ''}`}
            onClick={() => handleFilterChange('bar')}
          >
            PORTRAIT & BAR
          </button>
          <button 
            type="button" 
            className={`filter-tab ${activeFilter === 'action' ? 'active' : ''}`}
            onClick={() => handleFilterChange('action')}
          >
            ÉVÉNEMENTS & SPORT
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="projects-masonry-grid">
          {filteredProjects.map((project, index) => {
            // Find global index in PROJECTS_DATA
            const globalIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);

            return (
              <div 
                key={project.id}
                className={`project-tile-card ${project.gridClass}`}
                onClick={() => {
                  soundFx.playShutterClick();
                  onSelectPhoto(globalIndex);
                }}
              >
                <div className="project-tile-image">
                  <img src={project.file} alt={project.title} loading="lazy" />
                  <div className="project-tile-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span className="tile-num-badge">{project.num}</span>
                      <span className="tile-category-tag">{project.category}</span>
                    </div>
                    <div>
                      <h3 className="tile-title">{project.title}</h3>
                      <p className="tile-subtitle">{project.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
