// Configuration SEO & Métadonnées Globales — Thobix Eclou
// Supporte automatiquement le domaine Vercel actuel et le futur nom de domaine personnalisé via VITE_SITE_URL

export const SITE_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
  (typeof process !== 'undefined' && process.env && (process.env.VITE_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL)) ||
  'https://www.thobixeclou.com'
).replace(/\/$/, '');

export const SITE_CONFIG = {
  name: "Thobix Eclou",
  alternateName: "Thobix",
  title: "Thobix Eclou | Photographe & Directeur Artistique — Bénin, Guinée & Afrique de l'Ouest",
  titleTemplate: "%s | Thobix Eclou",
  defaultDescription: "Thobix Eclou est photographe professionnel et directeur artistique, disponible pour des projets au Bénin, en Guinée et à travers l'Afrique de l'Ouest. Portrait, mode, éditorial, gastronomie et campagnes de marque.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.jpg`,
  locale: "fr_FR",
  author: "Thobix Eclou",
  creator: "Thobix Eclou",
  publisher: "Thobix Eclou Photography",
  socials: {
    instagram: "https://www.instagram.com/mister_thobix",
    facebook: "https://www.facebook.com/thobix.eclou",
    whatsapp: "https://wa.me/22901644343",
    email: "contact@thobix.com",
    phone: "+22901644343"
  },
  categories: [
    {
      slug: "portrait",
      name: "Portraits d'Auteur",
      title: "Portraits d'Auteur & Personnalités — Thobix Eclou",
      description: "Portraits d'auteur, figures culturelles et personnalités capturés avec une scénographie lumineuse exigeante par Thobix Eclou au Bénin, en Guinée et en Afrique de l'Ouest.",
      filter: (p) => (p.categoryFilter === 'portrait' || (p.tags || []).some(t => t.toLowerCase().includes('portrait') || t.toLowerCase().includes('auteur')))
    },
    {
      slug: "mode",
      name: "Mode & Haute Couture",
      title: "Photographie de Mode & Haute Couture — Thobix Eclou",
      description: "Éditoriaux mode, haute couture, stylisme et beauté africaine contemporaine photographiés par Thobix Eclou entre Conakry, Cotonou et l'Afrique de l'Ouest.",
      filter: (p) => (p.categoryFilter === 'mode' || p.categoryFilter === 'fashion' || (p.tags || []).some(t => t.toLowerCase().includes('mode') || t.toLowerCase().includes('couture') || t.toLowerCase().includes('fashion')))
    },
    {
      slug: "editorial",
      name: "Éditoriaux & Récits Visuels",
      title: "Photographie Éditoriale & Récits Visuels — Thobix Eclou",
      description: "Séries éditoriales, reportages d'immersion culturelle et récits visuels d'exception réalisés par Thobix Eclou.",
      filter: (p) => ((p.tags || []).some(t => t.toLowerCase().includes('éditorial') || t.toLowerCase().includes('editorial') || t.toLowerCase().includes('street') || t.toLowerCase().includes('flânerie')) || p.categoryFilter === 'culture')
    },
    {
      slug: "art-direction",
      name: "Direction Artistique & Marques",
      title: "Direction Artistique, Hôtellerie 5★ & Gastronomie — Thobix Eclou",
      description: "Direction artistique, valorisation d'établissements hôteliers 5 étoiles, haute gastronomie étoilée et campagnes d'envergure pour marques de prestige.",
      filter: (p) => (p.categoryFilter === 'hotel' || p.categoryFilter === 'gastro' || (p.tags || []).some(t => t.toLowerCase().includes('sofitel') || t.toLowerCase().includes('luxe') || t.toLowerCase().includes('gastronomie') || t.toLowerCase().includes('industrie')))
    }
  ],
  regions: [
    {
      country: "Bénin",
      city: "Cotonou",
      slug: "photographe-benin",
      alias: "photographe-cotonou",
      title: "Photographe Professionnel & Directeur Artistique au Bénin (Cotonou) | Thobix Eclou",
      description: "Photographe professionnel et directeur artistique à Cotonou et au Bénin. Spécialiste du portrait d'auteur, de la mode, de l'hôtellerie de prestige et des campagnes de marque."
    },
    {
      country: "Guinée",
      city: "Conakry",
      slug: "photographe-guinee",
      alias: "photographe-conakry",
      title: "Photographe Professionnel & Directeur Artistique en Guinée (Conakry) | Thobix Eclou",
      description: "Photographe professionnel et directeur artistique à Conakry et en Guinée. Séries éditoriales, mode contemporaine, portraits d'auteur et productions créatives d'exception."
    }
  ]
};

// Helper pour générer le JSON-LD Schema.org Person & WebSite
export function getBaseJsonLd(currentUrl = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Thobix Eclou",
        "url": SITE_URL,
        "image": `${SITE_URL}/images/1.webp`,
        "jobTitle": ["Photographer", "Art Director"],
        "description": "Photographe professionnel et directeur artistique travaillant entre le Bénin, la Guinée et à travers l'Afrique de l'Ouest.",
        "sameAs": [
          SITE_CONFIG.socials.instagram,
          SITE_CONFIG.socials.facebook,
          SITE_CONFIG.socials.whatsapp
        ],
        "knowsAbout": [
          "Photographie professionnelle",
          "Direction artistique",
          "Photographie de mode",
          "Portrait d'art",
          "Haute Gastronomie",
          "Hôtellerie 5 étoiles",
          "Campagnes de marque"
        ],
        "areaServed": [
          {
            "@type": "Country",
            "name": "Bénin"
          },
          {
            "@type": "City",
            "name": "Cotonou"
          },
          {
            "@type": "Country",
            "name": "Guinée"
          },
          {
            "@type": "City",
            "name": "Conakry"
          },
          {
            "@type": "Continent",
            "name": "Afrique de l'Ouest"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "Thobix Eclou",
        "alternateName": "Thobix",
        "description": SITE_CONFIG.defaultDescription,
        "publisher": {
          "@id": `${SITE_URL}/#person`
        },
        "inLanguage": "fr-FR"
      },
      {
        "@type": "ProfilePage",
        "@id": `${currentUrl}#webpage`,
        "url": currentUrl,
        "name": SITE_CONFIG.title,
        "isPartOf": {
          "@id": `${SITE_URL}/#website`
        },
        "about": {
          "@id": `${SITE_URL}/#person`
        },
        "description": SITE_CONFIG.defaultDescription,
        "inLanguage": "fr-FR"
      }
    ]
  };
}
