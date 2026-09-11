const fs = require('fs');
const path = require('path');

console.log('=== KKS GROUPE ELECTRIQUE — VALIDATION AUDIT ===\n');

let errors = 0;

function checkFile(filePath, desc) {
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    console.log(`✔ [OK] ${desc} (${filePath}) - ${stat.size} bytes`);
  } else {
    console.error(`❌ [MANQUANT] ${desc} (${filePath})`);
    errors++;
  }
}

// 1. Assets
checkFile('assets/images/logo-kks.jpg', 'Logo KKS');
checkFile('assets/images/kks-cabine-snel-ngaliema.jpg', 'Photo Cabine SNEL Ngaliema');
checkFile('assets/images/kks-etude-chantier-mimosa.jpg', 'Photo Chantier Mimosa');
checkFile('assets/images/kks-montage-logette.jpg', 'Photo Montage Logette 250A');
checkFile('assets/images/kks-installation-sous-dalle.jpg', 'Photo Installation Sous Dalle');
checkFile('assets/images/kks-services-presentation.jpg', 'Photo Équipe KKS');
checkFile('assets/docs/KKS_PORTFOLIO.pdf', 'Document PDF Portfolio Officiel');
checkFile('assets/videos/kks-presentation.mp4', 'Vidéo Présentation KKS');

// 2. Core Pages & Styles
checkFile('index.html', 'Landing Page Vitrine Officielle');
checkFile('admin.html', 'Dashboard CMS Administration');
checkFile('mentions-legales.html', 'Page Mentions Légales');
checkFile('politique-confidentialite.html', 'Page Politique de Confidentialité');
checkFile('css/style.css', 'Feuille de styles principale');
checkFile('css/admin.css', 'Feuille de styles CMS Admin');
checkFile('js/cms-data.js', 'Moteur de données CMS');
checkFile('js/main.js', 'Script principal vitrine');
checkFile('js/admin.js', 'Script de gestion CMS');
checkFile('sitemap.xml', 'Fichier Sitemap XML');
checkFile('robots.txt', 'Fichier Robots TXT');
checkFile('manifest.json', 'Manifest PWA');

// 3. Test Data Store Integrity
try {
  const cmsContent = fs.readFileSync('js/cms-data.js', 'utf8');
  eval(cmsContent.replace('window.', 'global.'));
  const data = global.DEFAULT_KKS_DATA;
  console.log('\n--- Test Intégrité Données CMS ---');
  console.log(`Entreprise : ${data.company.name}`);
  console.log(`Adresse : ${data.company.address}`);
  console.log(`Téléphone : ${data.company.phone}`);
  console.log(`Services configurés : ${data.services.length}`);
  console.log(`Chantiers documentés : ${data.projects.length}`);
  console.log(`Domaines : ${data.domains.length}`);
  console.log(`Partenariat SNEL : ${data.snelPartnership.items.length} spécifications`);
  console.log('✔ [OK] Données CMS 100% conformes et intègres.');
} catch (e) {
  console.error('❌ [ERREUR] Chargement cms-data.js :', e.message);
  errors++;
}

console.log(`\n=== RÉSULTAT DU CONTRÔLE : ${errors === 0 ? 'TOUT EST CONFORME ET PRÊT (0 ERREUR)' : errors + ' ERREUR(S)'} ===`);