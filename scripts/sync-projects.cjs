const fs = require('fs');
const path = require('path');

const srcBase = path.resolve(__dirname, '../Thobix Project');
const destBase = path.resolve(__dirname, '../public/projects');

if (!fs.existsSync(destBase)) {
  fs.mkdirSync(destBase, { recursive: true });
}

// Slugs mapping for safe URLs and clean organization
const projectSlugs = {
  'ACS ELANO': 'acs-elano',
  'Fête de la musique': 'fete-de-la-musique',
  'Journée porte ouverte koffi et diabète': 'journee-porte-ouverte-diabete',
  "Kɔn ɖokpo L'ami Sofitel": 'kon-dokpo-sofitel',
  'OUI CHEF de Georgiana VIOU': 'oui-chef-georgiana-viou',
  'Pool party We Love Eya': 'pool-party-we-love-eya',
  'Restitution de trésor royaux au Nigeria': 'restitution-tresors-royaux-nigeria',
  'projet-Soirée au byblos au sofitel': 'soiree-byblos-sofitel',
  'remise de diplome': 'remise-de-diplomes',
  'shooting': 'shooting-mode-studio'
};

const entries = fs.readdirSync(srcBase);
const manifest = {};

entries.forEach(dirName => {
  const fullDirPath = path.join(srcBase, dirName);
  if (!fs.statSync(fullDirPath).isDirectory()) return;
  
  let matchedSlug = null;
  for (const [key, slug] of Object.entries(projectSlugs)) {
    if (key.normalize('NFC') === dirName.normalize('NFC') || 
        key.normalize('NFD') === dirName.normalize('NFD') || 
        key.toLowerCase() === dirName.toLowerCase()) {
      matchedSlug = slug;
      break;
    }
  }
  if (!matchedSlug) {
    matchedSlug = dirName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  const destDir = path.join(destBase, matchedSlug);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(fullDirPath)
    .filter(f => !f.startsWith('.') && (f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.WEBP')))
    .sort();

  const copiedFiles = [];
  files.forEach((file, index) => {
    const ext = path.extname(file).toLowerCase() || '.jpeg';
    const num = String(index + 1).padStart(2, '0');
    const newFileName = `photo-${num}${ext}`;
    const srcFilePath = path.join(fullDirPath, file);
    const destFilePath = path.join(destDir, newFileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    copiedFiles.push(`/projects/${matchedSlug}/${newFileName}`);
  });

  manifest[matchedSlug] = {
    originalName: dirName,
    slug: matchedSlug,
    count: copiedFiles.length,
    cover: copiedFiles[0],
    images: copiedFiles
  };
});

fs.writeFileSync(path.resolve(__dirname, '../src/data/projects-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Successfully organized', Object.keys(manifest).length, 'projects.');
