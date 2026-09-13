import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROJECTS_COLLECTIONS } from '../src/data/projects.js';
import { SITE_CONFIG } from '../src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = (process.env.VITE_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thobixeclou.com').replace(/\/$/, '');
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const baseHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(baseHtmlPath)) {
  console.error('Error: dist/index.html does not exist.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

// 1. Generate Sitemap XML (Strictly canonical https://www.thobixeclou.com/ URLs)
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const routes = [
    { url: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    { url: `${SITE_URL}/portfolio`, priority: '0.95', changefreq: 'weekly' },
    { url: `${SITE_URL}/portfolio/portrait`, priority: '0.9', changefreq: 'weekly' },
    { url: `${SITE_URL}/portfolio/mode`, priority: '0.9', changefreq: 'weekly' },
    { url: `${SITE_URL}/portfolio/editorial`, priority: '0.9', changefreq: 'weekly' },
    { url: `${SITE_URL}/portfolio/art-direction`, priority: '0.9', changefreq: 'weekly' },
    { url: `${SITE_URL}/photographe-benin`, priority: '0.9', changefreq: 'weekly' },
    { url: `${SITE_URL}/photographe-cotonou`, priority: '0.85', changefreq: 'weekly' },
    { url: `${SITE_URL}/photographe-guinee`, priority: '0.9', changefreq: 'weekly' },
    { url: `${SITE_URL}/photographe-conakry`, priority: '0.85', changefreq: 'weekly' },
  ];

  PROJECTS_COLLECTIONS.forEach((project) => {
    routes.push({
      url: `${SITE_URL}/projects/${project.id}`,
      priority: '0.85',
      changefreq: 'monthly',
      lastmod: today,
    });
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map((r) => {
    return `  <url>
    <loc>${r.url}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('✓ Generated sitemap.xml with', routes.length, 'canonical URLs');
}

// 2. Generate robots.txt
function generateRobotsTxt() {
  const robotsContent = `# robots.txt pour Thobix Eclou Portfolio
User-agent: *
Allow: /

# Sitemap Officiel
Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf-8');
  console.log('✓ Generated robots.txt');
}

// Helper: inject metadata into base HTML
function injectMeta(template, { title, description, canonicalUrl, ogImage, ogType = 'website', jsonLd = null, preRenderedHtml = '' }) {
  let html = template;

  // Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

  // Description
  html = html.replace(
    /<meta name="description" content=".*?"\/?>/i,
    `<meta name="description" content="${description}">`
  );

  // Remove any legacy meta keywords
  html = html.replace(/<meta name="keywords" content=".*?"\/?>\s*/i, '');

  // Canonical
  html = html.replace(
    /<link rel="canonical" href=".*?"\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}">`
  );

  // Open Graph Title
  html = html.replace(
    /<meta property="og:title" content=".*?"\/?>/i,
    `<meta property="og:title" content="${title}">`
  );

  // Open Graph Description
  html = html.replace(
    /<meta property="og:description" content=".*?"\/?>/i,
    `<meta property="og:description" content="${description}">`
  );

  // Open Graph URL
  html = html.replace(
    /<meta property="og:url" content=".*?"\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}">`
  );

  // Open Graph Type
  html = html.replace(
    /<meta property="og:type" content=".*?"\/?>/i,
    `<meta property="og:type" content="${ogType}">`
  );

  // Open Graph Image
  if (ogImage) {
    html = html.replace(
      /<meta property="og:image" content=".*?"\/?>/i,
      `<meta property="og:image" content="${ogImage}">`
    );
    html = html.replace(
      /<meta property="og:image:secure_url" content=".*?"\/?>/i,
      `<meta property="og:image:secure_url" content="${ogImage}">`
    );
    html = html.replace(
      /<meta name="twitter:image" content=".*?"\/?>/i,
      `<meta name="twitter:image" content="${ogImage}">`
    );
  }

  // Twitter Title & Desc
  html = html.replace(
    /<meta name="twitter:title" content=".*?"\/?>/i,
    `<meta name="twitter:title" content="${title}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?"\/?>/i,
    `<meta name="twitter:description" content="${description}">`
  );

  // Inject additional JSON-LD before </head>
  if (jsonLd) {
    const jsonLdTag = `\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
    html = html.replace('</head>', `${jsonLdTag}\n</head>`);
  }

  // Pre-rendered HTML inside #root (clean crawlable HTML, gracefully hydrated by React)
  if (preRenderedHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${preRenderedHtml}</div>`);
  }

  return html;
}

// 3. Pre-render Landing Pages (Bénin / Guinée) with crawlable semantic markup and cross-links
function generateLandingPages() {
  const pages = [
    {
      dir: 'photographe-benin',
      title: "Photographe Professionnel & Directeur Artistique au Bénin (Cotonou) | Thobix Eclou",
      description: "Thobix Eclou, photographe professionnel et directeur artistique disponible à Cotonou et au Bénin. Portrait d'auteur, mode, gastronomie et campagnes de marque.",
      canonicalUrl: `${SITE_URL}/photographe-benin`,
      ogImage: `${SITE_URL}/og-image.jpg`,
      h1: "Photographe Professionnel & Directeur Artistique au Bénin — Cotonou",
      contentLead: "Thobix Eclou réalise des travaux photographiques et de direction artistique de haute volée au Bénin : Sofitel Cotonou Marina, Cheffe Georgiana Viou (Étoile Michelin), Port Autonome de Cotonou, Cabinet Koffi & Diabaté, Zone Industrielle GDIZ, Centre EYA et créateurs contemporains.",
      regionName: "Bénin",
      otherRegionName: "Guinée (Conakry)",
      otherRegionUrl: `${SITE_URL}/photographe-guinee`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Thobix Eclou — Photographe Bénin & Cotonou",
        "url": `${SITE_URL}/photographe-benin`,
        "image": `${SITE_URL}/og-image.jpg`,
        "telephone": "+2290164434115",
        "priceRange": "450.000 FCFA - 1.200.000 FCFA",
        "areaServed": [
          { "@type": "City", "name": "Cotonou" },
          { "@type": "Country", "name": "Bénin" }
        ],
        "knowsAbout": ["Portrait d'Auteur", "Haute Gastronomie", "Hôtellerie 5 Étoiles", "Mode Éditoriale"]
      },
      breadcrumbs: [
        { name: "Accueil", url: `${SITE_URL}/` },
        { name: "Photographe Bénin", url: `${SITE_URL}/photographe-benin` }
      ]
    },
    {
      dir: 'photographe-cotonou',
      title: "Photographe Professionnel à Cotonou | Thobix Eclou",
      description: "Photographe professionnel et directeur artistique basé à Cotonou. Portraits d'exception, mode, hôtellerie de luxe et productions visuelles de marque au Bénin.",
      canonicalUrl: `${SITE_URL}/photographe-benin`,
      ogImage: `${SITE_URL}/og-image.jpg`,
      h1: "Photographe Professionnel à Cotonou — Thobix Eclou",
      contentLead: "Thobix Eclou est photographe et directeur artistique intervenant à Cotonou pour des séries de portraits, campagnes de mode et reportages de prestige.",
      regionName: "Cotonou",
      otherRegionName: "Guinée (Conakry)",
      otherRegionUrl: `${SITE_URL}/photographe-guinee`,
      breadcrumbs: [
        { name: "Accueil", url: `${SITE_URL}/` },
        { name: "Photographe Cotonou", url: `${SITE_URL}/photographe-benin` }
      ]
    },
    {
      dir: 'photographe-guinee',
      title: "Photographe Professionnel & Directeur Artistique en Guinée (Conakry) | Thobix Eclou",
      description: "Photographe professionnel et directeur artistique intervenant à Conakry et en Guinée. Séries éditoriales, mode contemporaine, portraits d'auteur et campagnes créatives.",
      canonicalUrl: `${SITE_URL}/photographe-guinee`,
      ogImage: `${SITE_URL}/og-image.jpg`,
      h1: "Photographe Professionnel & Directeur Artistique en Guinée — Conakry",
      contentLead: "Thobix Eclou accompagne les modèles, personnalités et maisons de mode en Guinée : Fanta (Top Model Guinée 2026), Djeinaba, street couture à Conakry et campagnes contemporaines en Afrique de l'Ouest.",
      regionName: "Guinée",
      otherRegionName: "Bénin (Cotonou)",
      otherRegionUrl: `${SITE_URL}/photographe-benin`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Thobix Eclou — Photographe Guinée & Conakry",
        "url": `${SITE_URL}/photographe-guinee`,
        "image": `${SITE_URL}/og-image.jpg`,
        "telephone": "+2290164434115",
        "priceRange": "450.000 FCFA - 1.200.000 FCFA",
        "areaServed": [
          { "@type": "City", "name": "Conakry" },
          { "@type": "Country", "name": "Guinée" }
        ],
        "knowsAbout": ["Mode Haute Couture", "Portrait d'Art", "Fashion Editorial", "Direction Artistique"]
      },
      breadcrumbs: [
        { name: "Accueil", url: `${SITE_URL}/` },
        { name: "Photographe Guinée", url: `${SITE_URL}/photographe-guinee` }
      ]
    },
    {
      dir: 'photographe-conakry',
      title: "Photographe Professionnel à Conakry | Thobix Eclou",
      description: "Photographe professionnel et directeur artistique disponible à Conakry pour éditoriaux mode, portraits d'auteur et collaborations créatives en Guinée.",
      canonicalUrl: `${SITE_URL}/photographe-guinee`,
      ogImage: `${SITE_URL}/og-image.jpg`,
      h1: "Photographe Professionnel à Conakry — Thobix Eclou",
      contentLead: "Direction artistique et photographie de mode à Conakry par Thobix Eclou. Collaborations avec les créateurs et modèles guinéens.",
      regionName: "Conakry",
      otherRegionName: "Bénin (Cotonou)",
      otherRegionUrl: `${SITE_URL}/photographe-benin`,
      breadcrumbs: [
        { name: "Accueil", url: `${SITE_URL}/` },
        { name: "Photographe Conakry", url: `${SITE_URL}/photographe-guinee` }
      ]
    }
  ];

  pages.forEach((p) => {
    const targetFolder = path.join(distDir, p.dir);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const breadcrumbJsonLd = p.breadcrumbs ? {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": p.breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": b.name,
        "item": b.url
      }))
    } : null;

    const combinedJsonLd = p.jsonLd && breadcrumbJsonLd ? {
      "@context": "https://schema.org",
      "@graph": [p.jsonLd, breadcrumbJsonLd]
    } : (p.jsonLd || breadcrumbJsonLd);

    const preRendered = `
      <main class="ssr-prerender-content local-seo-prerender">
        <nav aria-label="Fil d'Ariane">
          <a href="/">Accueil</a> &gt; <span>${p.regionName}</span>
        </nav>
        <header>
          <h1>${p.h1}</h1>
          <p class="lead-text">${p.contentLead}</p>
        </header>
        <section>
          <h2>Explorer les expertises de Thobix Eclou</h2>
          <ul>
            <li><a href="/portfolio/portrait">Portraits d'Auteur</a></li>
            <li><a href="/portfolio/mode">Mode &amp; Haute Couture</a></li>
            <li><a href="/portfolio/editorial">Séries Éditoriales</a></li>
            <li><a href="/portfolio/art-direction">Direction Artistique</a></li>
          </ul>
          <p>Découvrir également : <a href="${p.otherRegionUrl}">${p.otherRegionName}</a> | <a href="/portfolio">Tous les projets</a></p>
        </section>
      </main>
    `;

    const renderedHtml = injectMeta(baseHtml, {
      title: p.title,
      description: p.description,
      canonicalUrl: p.canonicalUrl,
      ogImage: p.ogImage,
      jsonLd: combinedJsonLd,
      preRenderedHtml: preRendered,
    });

    fs.writeFileSync(path.join(targetFolder, 'index.html'), renderedHtml, 'utf-8');
    console.log(`✓ Pre-rendered /${p.dir}/index.html`);
  });
}

// 4. Pre-render Portfolio & Category Pages (/portfolio, /portfolio/portrait, /portfolio/mode, etc.)
function generateCategoryPages() {
  const categoryPages = [
    {
      dir: 'portfolio',
      title: "Portfolio & Archives Photographiques | Thobix Eclou",
      description: "Explorez l'ensemble des séries photographiques et directions artistiques réalisées par Thobix Eclou au Bénin, en Guinée et en Afrique de l'Ouest.",
      canonicalUrl: `${SITE_URL}/portfolio`,
      h1: "Portfolio & Archives Photographiques — Thobix Eclou",
      lead: "Une collection d'œuvres d'auteur embrassant le portrait de prestige, la mode haute couture, la gastronomie étoilée et l'hôtellerie palatiale.",
      projects: PROJECTS_COLLECTIONS,
      breadcrumbs: [
        { name: "Accueil", url: `${SITE_URL}/` },
        { name: "Portfolio", url: `${SITE_URL}/portfolio` }
      ]
    },
    ...SITE_CONFIG.categories.map((cat) => ({
      dir: `portfolio/${cat.slug}`,
      title: `${cat.title} | Thobix Eclou`,
      description: cat.description,
      canonicalUrl: `${SITE_URL}/portfolio/${cat.slug}`,
      h1: `${cat.name} — Thobix Eclou`,
      lead: cat.description,
      projects: PROJECTS_COLLECTIONS.filter(cat.filter),
      breadcrumbs: [
        { name: "Accueil", url: `${SITE_URL}/` },
        { name: "Portfolio", url: `${SITE_URL}/portfolio` },
        { name: cat.name, url: `${SITE_URL}/portfolio/${cat.slug}` }
      ]
    }))
  ];

  categoryPages.forEach((catPage) => {
    const targetFolder = path.join(distDir, catPage.dir);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": catPage.breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": b.name,
        "item": b.url
      }))
    };

    const collectionJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": catPage.title,
      "description": catPage.description,
      "url": catPage.canonicalUrl,
      "author": {
        "@type": "Person",
        "name": "Thobix Eclou",
        "url": SITE_URL
      }
    };

    const combinedJsonLd = {
      "@context": "https://schema.org",
      "@graph": [collectionJsonLd, breadcrumbJsonLd]
    };

    const preRendered = `
      <main class="ssr-prerender-content category-prerender">
        <nav aria-label="Fil d'Ariane">
          ${catPage.breadcrumbs.map((b, i) => i === catPage.breadcrumbs.length - 1 ? `<span>${b.name}</span>` : `<a href="${b.url.replace(SITE_URL, '') || '/'}">${b.name}</a> &gt; `).join('')}
        </nav>
        <header>
          <h1>${catPage.h1}</h1>
          <p class="lead-text">${catPage.lead}</p>
        </header>
        <section class="projects-list">
          <h2>Projets &amp; Séries Photographiques</h2>
          <div>
            ${catPage.projects.map((p) => `
              <article>
                <h3><a href="/projects/${p.id}">${p.title}</a></h3>
                <p>${p.subtitle} — <em>${p.client} (${p.year})</em></p>
                <a href="/projects/${p.id}">
                  <img src="${p.cover}" alt="${p.title} — Photographie par Thobix Eclou" loading="lazy" />
                </a>
              </article>
            `).join('\n')}
          </div>
        </section>
        <nav aria-label="Catégories sœurs">
          <p>Explorer d'autres univers :</p>
          <ul>
            <li><a href="/portfolio/portrait">Portraits d'Auteur</a></li>
            <li><a href="/portfolio/mode">Mode &amp; Haute Couture</a></li>
            <li><a href="/portfolio/editorial">Séries Éditoriales</a></li>
            <li><a href="/portfolio/art-direction">Direction Artistique</a></li>
          </ul>
        </nav>
      </main>
    `;

    const renderedHtml = injectMeta(baseHtml, {
      title: catPage.title,
      description: catPage.description,
      canonicalUrl: catPage.canonicalUrl,
      ogImage: `${SITE_URL}/og-image.jpg`,
      jsonLd: combinedJsonLd,
      preRenderedHtml: preRendered,
    });

    fs.writeFileSync(path.join(targetFolder, 'index.html'), renderedHtml, 'utf-8');
    console.log(`✓ Pre-rendered /${catPage.dir}/index.html (${catPage.projects.length} projets)`);
  });
}

// 5. Pre-render All Project Pages (/projects/:id)
function generateProjectPages() {
  PROJECTS_COLLECTIONS.forEach((project, index) => {
    const targetFolder = path.join(distDir, 'projects', project.id);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const pageTitle = `${project.title} — ${project.client || 'Portfolio'} | Thobix Eclou`;
    const pageDesc = `${project.subtitle} — Série photographique et direction artistique réalisées par Thobix Eclou (${project.location}, ${project.year}). ${project.story.slice(0, 130)}...`;
    const canonicalUrl = `${SITE_URL}/projects/${project.id}`;
    const ogImage = `${SITE_URL}${project.cover}`;

    // Get 3 related projects for internal linking
    const otherProjects = PROJECTS_COLLECTIONS.filter(p => p.id !== project.id);
    const relatedProjects = [
      otherProjects[(index + 1) % otherProjects.length],
      otherProjects[(index + 2) % otherProjects.length],
      otherProjects[(index + 3) % otherProjects.length]
    ];

    const projectJsonLd = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.title,
      "headline": project.subtitle,
      "description": project.story,
      "creator": {
        "@type": "Person",
        "name": "Thobix Eclou",
        "url": SITE_URL
      },
      "dateCreated": project.year,
      "image": ogImage,
      "genre": project.category,
      "locationCreated": {
        "@type": "Place",
        "name": project.location
      },
      "about": project.client
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": `${SITE_URL}/portfolio` },
        { "@type": "ListItem", "position": 3, "name": project.title, "item": canonicalUrl }
      ]
    };

    const combinedJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        projectJsonLd,
        breadcrumbJsonLd
      ]
    };

    const preRendered = `
      <article class="ssr-prerender-content project-prerender">
        <nav aria-label="Fil d'Ariane">
          <a href="/">Accueil</a> &gt; <a href="/portfolio">Portfolio</a> &gt; <span>${project.title}</span>
        </nav>
        <header>
          <h1>${project.title}</h1>
          <p class="project-subtitle"><strong>${project.subtitle}</strong></p>
          <p class="project-meta">
            <span><strong>Client :</strong> ${project.client}</span> | 
            <span><strong>Année :</strong> ${project.year}</span> | 
            <span><strong>Lieu :</strong> ${project.location}</span> |
            <span><strong>Catégorie :</strong> ${project.category}</span>
          </p>
        </header>

        <section class="project-story">
          <h2>Récit du projet</h2>
          <p>${project.story}</p>
          ${project.exif ? `<p class="project-exif"><small>Données techniques de prise de vue : ${project.exif}</small></p>` : ''}
        </section>

        <nav class="project-tags" aria-label="Thématiques associées">
          ${(project.tags || []).map(t => `<a href="/portfolio">#${t}</a>`).join(' ')}
        </nav>

        <section class="project-gallery">
          <h2>Galerie photographique (${project.images.length} clichés)</h2>
          <div>
            ${project.images.map((src, i) => `
              <figure>
                <img src="${src}" alt="${project.title} — Photographie par Thobix Eclou (${i + 1}/${project.images.length})" loading="lazy" />
                <figcaption>${project.title} — Cliché ${i + 1}</figcaption>
              </figure>
            `).join('\n')}
          </div>
        </section>

        <aside class="related-projects">
          <h3>Autres projets photographiques récents de Thobix Eclou</h3>
          <ul>
            ${relatedProjects.map(rel => `
              <li>
                <a href="/projects/${rel.id}">
                  <strong>${rel.title}</strong> — ${rel.subtitle} (${rel.year})
                </a>
              </li>
            `).join('\n')}
          </ul>
          <p><a href="/portfolio">← Revenir à l'ensemble du Portfolio</a></p>
        </aside>

        <footer>
          <p>Direction artistique et photographies conçues par <a href="/">Thobix Eclou</a>, photographe professionnel au Bénin, en Guinée et en Afrique de l'Ouest.</p>
        </footer>
      </article>
    `;

    const renderedHtml = injectMeta(baseHtml, {
      title: pageTitle,
      description: pageDesc,
      canonicalUrl: canonicalUrl,
      ogImage: ogImage,
      ogType: 'article',
      jsonLd: combinedJsonLd,
      preRenderedHtml: preRendered,
    });

    fs.writeFileSync(path.join(targetFolder, 'index.html'), renderedHtml, 'utf-8');
  });

  console.log(`✓ Pre-rendered ${PROJECTS_COLLECTIONS.length} project pages in /projects/*/index.html with full SEO markup`);
}

// Execute all
console.log('🚀 Generating SEO static assets & category routes...');
generateSitemap();
generateRobotsTxt();
generateLandingPages();
generateCategoryPages();
generateProjectPages();
console.log('✅ SEO generation completed successfully!');
