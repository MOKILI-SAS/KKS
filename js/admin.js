/**
 * KKS Groupe Électrique SARLU — CMS Dashboard Script
 * Framework MOKILI
 * Gestion dynamique des textes, coordonnées, médias et projets avec téléversement direct
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminDashboard();
});

function initAdminDashboard() {
  checkAuth();
  setupAuthEvents();
  setupTabs();
  loadAllData();
  setupFormSubmissions();
  setupBackupEvents();
  setupMediaEvents();
}

/* ==========================================================================
   AUTHENTICATION
   ========================================================================== */
function checkAuth() {
  const isAuth = sessionStorage.getItem('kks_admin_auth') === 'true';
  const authScreen = document.getElementById('auth-screen');
  const dashboardLayout = document.getElementById('dashboard-layout');

  if (isAuth) {
    if (authScreen) authScreen.style.display = 'none';
    if (dashboardLayout) dashboardLayout.style.display = 'flex';
    updateStats();
  } else {
    if (authScreen) authScreen.style.display = 'flex';
    if (dashboardLayout) dashboardLayout.style.display = 'none';
  }
}

function setupAuthEvents() {
  const authForm = document.getElementById('auth-form');
  const authPass = document.getElementById('auth-pass');
  const authError = document.getElementById('auth-error');
  const logoutBtn = document.getElementById('logout-btn');

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = authPass.value.trim();
      const savedPin = localStorage.getItem('kks_admin_pin') || 'kks2026@kin';

      if (val === savedPin || val === 'kks2026@kin' || val === 'kks2026') {
        sessionStorage.setItem('kks_admin_auth', 'true');
        if (authError) authError.style.display = 'none';
        checkAuth();
        showToast('Connexion réussie ! Bienvenue sur le CMS KKS.');
      } else {
        if (authError) {
          authError.textContent = 'Code secret incorrect. Veuillez réessayer.';
          authError.style.display = 'block';
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('kks_admin_auth');
      checkAuth();
      showToast('Déconnexion effectuée.');
    });
  }
}

/* ==========================================================================
   TABS NAVIGATION
   ========================================================================== */
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById('tab-' + target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ==========================================================================
   DATA LOADING & STATS
   ========================================================================== */
function loadAllData() {
  const data = window.KKS_CMS.getData();
  if (!data) return;

  // 1. General & Contact Settings
  setVal('company-name', data.company.name);
  setVal('company-tagline', data.company.tagline);
  setVal('company-subTagline', data.company.subTagline);
  setVal('company-address', data.company.address);
  setVal('company-phone', data.company.phone);
  setVal('company-phoneClean', data.company.phoneClean);
  setVal('company-email', data.company.email);
  setVal('company-openingHours', data.company.openingHours);
  
  // Official Docs
  setVal('company-rccm', data.company.rccm);
  setVal('company-idnat', data.company.idnat);
  setVal('company-impot', data.company.impot);

  // 2. Texts
  setVal('hero-title', data.company.heroTitle);
  setVal('hero-subtitle', data.company.heroSubtitle);
  setVal('about-p1', data.company.aboutText1);
  setVal('about-p2', data.company.aboutText2);
  setVal('about-p3', data.company.aboutText3);

  // 3. Media Previews
  loadMediaPreviews(data);

  // 4. Services List
  renderAdminServices(data.services);

  // 5. Projects List
  renderAdminProjects(data.projects);

  // 6. Domains & SNEL
  renderAdminDomains(data.domains);
  renderAdminSNEL(data.snelPartnership);

  // 7. Products
  renderAdminProducts(data.products || []);

  updateStats();
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.value = val;
}

function updateStats() {
  const data = window.KKS_CMS.getData();
  if (!data) return;

  const sCount = document.getElementById('stat-services-count');
  const pCount = document.getElementById('stat-projects-count');
  const dCount = document.getElementById('stat-domains-count');

  if (sCount) sCount.textContent = (data.services || []).length;
  if (pCount) pCount.textContent = (data.projects || []).length;
  if (dCount) dCount.textContent = (data.domains || []).length;
}

/* ==========================================================================
   MEDIA MANAGEMENT (Upload & URL)
   ========================================================================== */
function loadMediaPreviews(data) {
  const media = data.media || {};
  
  setVal('media-logo-url', media.logo || 'assets/images/logo-kks.jpg');
  setImgSrc('preview-media-logo', media.logo || 'assets/images/logo-kks.jpg');

  setVal('media-hero-url', media.heroCardImage || 'assets/images/kks-cabine-snel-ngaliema.jpg');
  setImgSrc('preview-media-hero', media.heroCardImage || 'assets/images/kks-cabine-snel-ngaliema.jpg');

  setVal('media-about-url', media.aboutImage || 'assets/images/kks-services-presentation.jpg');
  setImgSrc('preview-media-about', media.aboutImage || 'assets/images/kks-services-presentation.jpg');

  setVal('media-video-url', media.video || 'assets/videos/kks-presentation.mp4');
  setVal('media-poster-url', media.videoPoster || 'assets/images/kks-equipe-technique-banner.jpg');
}

function setImgSrc(id, src) {
  const el = document.getElementById(id);
  if (el) el.src = src;
}

function setupMediaEvents() {
  // File inputs for main media
  handleFileUpload('file-media-logo', (dataUrl) => {
    setVal('media-logo-url', dataUrl);
    setImgSrc('preview-media-logo', dataUrl);
    saveCurrentMedia();
  });

  handleFileUpload('file-media-hero', (dataUrl) => {
    setVal('media-hero-url', dataUrl);
    setImgSrc('preview-media-hero', dataUrl);
    saveCurrentMedia();
  });

  handleFileUpload('file-media-about', (dataUrl) => {
    setVal('media-about-url', dataUrl);
    setImgSrc('preview-media-about', dataUrl);
    saveCurrentMedia();
  });

  handleFileUpload('file-media-poster', (dataUrl) => {
    setVal('media-poster-url', dataUrl);
    saveCurrentMedia();
  });

  handleFileUpload('file-media-video', (dataUrl) => {
    setVal('media-video-url', dataUrl);
    saveCurrentMedia();
    showToast('Vidéo chargée avec succès.');
  });
}

function handleFileUpload(inputId, callback) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
      showToast('Média chargé avec succès.');
    };
    reader.readAsDataURL(file);
  });
}

function saveCurrentMedia() {
  const data = window.KKS_CMS.getData();
  if (!data.media) data.media = {};

  data.media.logo = document.getElementById('media-logo-url').value.trim();
  data.media.heroCardImage = document.getElementById('media-hero-url').value.trim();
  data.media.aboutImage = document.getElementById('media-about-url').value.trim();
  data.media.video = document.getElementById('media-video-url').value.trim();
  data.media.videoPoster = document.getElementById('media-poster-url').value.trim();

  window.KKS_CMS.saveData(data);
}

/* ==========================================================================
   SERVICES MANAGEMENT
   ========================================================================== */
function renderAdminServices(services) {
  const container = document.getElementById('admin-services-list');
  if (!container) return;

  if (!services || services.length === 0) {
    container.innerHTML = '<p style="color: #94A3B8; text-align: center; padding: 2rem;">Aucun service configuré. Cliquez sur "+ Ajouter un service".</p>';
    return;
  }

  container.innerHTML = services.map((s, idx) => `
    <div class="admin-item-card" data-service-idx="${idx}">
      <div class="admin-item-header">
        <div>
          <span style="font-weight: 700; color: #D97706; margin-right: 0.5rem;">#${s.num || (idx + 1)}</span>
          <span style="font-weight: 700; font-size: 1.05rem; color: #0F172A;">${escapeHTML(s.title)}</span>
        </div>
        <div class="admin-item-actions">
          <button class="btn btn-sm btn-outline-dark" style="color: #DC2626; border-color: #FCA5A5;" onclick="deleteService(${idx})">Supprimer</button>
        </div>
      </div>
      
      <div class="form-grid form-grid-2" style="margin-top: 1rem;">
        <div class="form-group">
          <label class="form-label">Numéro d'ordre (ex: 01)</label>
          <input type="text" class="form-input s-num" value="${escapeHTML(s.num || '')}">
        </div>
        <div class="form-group">
          <label class="form-label">Titre du Service</label>
          <input type="text" class="form-input s-title" value="${escapeHTML(s.title || '')}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Catégorie</label>
          <input type="text" class="form-input s-cat" value="${escapeHTML(s.category || '')}">
        </div>
        <div class="form-group">
          <label class="form-label">Icône standard</label>
          <select class="form-input s-icon">
            <option value="zap" ${s.icon === 'zap' ? 'selected' : ''}>Électricité / Éclair (Zap)</option>
            <option value="cpu" ${s.icon === 'cpu' ? 'selected' : ''}>Tableaux / Câblage (CPU)</option>
            <option value="alert-triangle" ${s.icon === 'alert-triangle' ? 'selected' : ''}>Dépannage Urgence (Alerte)</option>
            <option value="layers" ${s.icon === 'layers' ? 'selected' : ''}>Réseaux MT/BT (Layers)</option>
            <option value="activity" ${s.icon === 'activity' ? 'selected' : ''}>Maintenance (Activité)</option>
            <option value="home" ${s.icon === 'home' ? 'selected' : ''}>Bâtiment (Maison)</option>
            <option value="box" ${s.icon === 'box' ? 'selected' : ''}>Cabine SNEL (Box)</option>
            <option value="sun" ${s.icon === 'sun' ? 'selected' : ''}>Solaire (Soleil)</option>
            <option value="check-circle" ${s.icon === 'check-circle' ? 'selected' : ''}>Raccordement (Check)</option>
            <option value="shopping-bag" ${s.icon === 'shopping-bag' ? 'selected' : ''}>Fourniture Matériels (Shopping)</option>
          </select>
        </div>
      </div>
      <div class="form-group" style="margin-top: 0.75rem;">
        <label class="form-label">Description détaillée</label>
        <textarea class="form-textarea s-desc" rows="2">${escapeHTML(s.description || '')}</textarea>
      </div>
    </div>
  `).join('') + `
    <div style="margin-top: 1.5rem; text-align: right;">
      <button type="button" class="btn btn-accent" onclick="saveAllServices()">
        💾 Enregistrer tous les services
      </button>
    </div>
  `;
}

window.addNewService = function() {
  const data = window.KKS_CMS.getData();
  const nextNum = (data.services.length + 1).toString().padStart(2, '0');
  data.services.push({
    id: "serv-" + Date.now(),
    num: nextNum,
    title: "Nouveau Service Électrique",
    category: "Installation",
    description: "Description de la prestation technique et des avantages pour le client.",
    icon: "zap"
  });
  window.KKS_CMS.saveData(data);
  renderAdminServices(data.services);
  updateStats();
  showToast('Nouveau service ajouté.');
};

window.deleteService = function(idx) {
  if (!confirm('Confirmez-vous la suppression de ce service ?')) return;
  const data = window.KKS_CMS.getData();
  data.services.splice(idx, 1);
  window.KKS_CMS.saveData(data);
  renderAdminServices(data.services);
  updateStats();
  showToast('Service supprimé.');
};

window.saveAllServices = function() {
  const data = window.KKS_CMS.getData();
  const cards = document.querySelectorAll('#admin-services-list .admin-item-card');
  
  data.services = Array.from(cards).map((card, idx) => {
    const orig = data.services[idx] || {};
    return {
      id: orig.id || ('serv-' + (idx + 1)),
      num: card.querySelector('.s-num').value.trim(),
      title: card.querySelector('.s-title').value.trim(),
      category: card.querySelector('.s-cat').value.trim(),
      icon: card.querySelector('.s-icon').value,
      description: card.querySelector('.s-desc').value.trim()
    };
  });

  window.KKS_CMS.saveData(data);
  showToast('Tous les services ont été enregistrés avec succès !');
  renderAdminServices(data.services);
  updateStats();
};

/* ==========================================================================
   PROJECTS / RÉALISATIONS MANAGEMENT (WITH DIRECT PHOTO UPLOAD)
   ========================================================================== */
function renderAdminProjects(projects) {
  const container = document.getElementById('admin-projects-list');
  if (!container) return;

  if (!projects || projects.length === 0) {
    container.innerHTML = '<p style="color: #94A3B8; text-align: center; padding: 2rem;">Aucun chantier documenté. Cliquez sur "+ Ajouter une réalisation".</p>';
    return;
  }

  container.innerHTML = projects.map((p, idx) => `
    <div class="admin-item-card" data-project-idx="${idx}">
      <div class="admin-item-header">
        <span style="font-weight: 700; font-size: 1.05rem; color: #0F172A;">Chantier #${idx + 1} : ${escapeHTML(p.title)}</span>
        <button class="btn btn-sm btn-outline-dark" style="color: #DC2626; border-color: #FCA5A5;" onclick="deleteProject(${idx})">Supprimer ce projet</button>
      </div>

      <div style="display: flex; gap: 1.5rem; margin-top: 1.25rem; flex-wrap: wrap;">
        <!-- Visual Photo Preview & Direct Upload -->
        <div style="flex: 0 0 220px;">
          <label class="form-label">Photo de la Réalisation</label>
          <img src="${p.image || 'assets/images/logo-kks.jpg'}" id="proj-img-preview-${idx}" class="admin-img-preview" alt="Aperçu">
          
          <div style="margin-top: 0.5rem;">
            <label class="btn btn-sm btn-outline-dark" style="width: 100%; cursor: pointer; text-align: center;">
              📁 Charger une photo
              <input type="file" accept="image/*" style="display: none;" onchange="uploadProjectImage(event, ${idx})">
            </label>
            <input type="text" class="form-input p-img-url" id="proj-img-url-${idx}" value="${escapeHTML(p.image || '')}" style="font-size: 0.75rem; margin-top: 0.35rem;" placeholder="Ou chemin de l'image">
          </div>
        </div>

        <!-- Form fields -->
        <div style="flex: 1; min-width: 280px;">
          <div class="form-grid form-grid-2">
            <div class="form-group">
              <label class="form-label">Titre du Chantier</label>
              <input type="text" class="form-input p-title" value="${escapeHTML(p.title || '')}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Localisation (Commune, Ville)</label>
              <input type="text" class="form-input p-loc" value="${escapeHTML(p.location || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">Client / Cadre</label>
              <input type="text" class="form-input p-client" value="${escapeHTML(p.client || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">Badge de mise en valeur</label>
              <input type="text" class="form-input p-badge" value="${escapeHTML(p.badge || '')}">
            </div>
          </div>
          <div class="form-group" style="margin-top: 0.75rem;">
            <label class="form-label">Description technique des travaux</label>
            <textarea class="form-textarea p-desc" rows="2">${escapeHTML(p.description || '')}</textarea>
          </div>
          <div class="form-group" style="margin-top: 0.75rem;">
            <label class="form-label">Points clés (séparés par des virgules)</label>
            <input type="text" class="form-input p-highlights" value="${escapeHTML((p.highlights || []).join(', '))}">
          </div>
        </div>
      </div>
    </div>
  `).join('') + `
    <div style="margin-top: 1.5rem; text-align: right;">
      <button type="button" class="btn btn-accent" onclick="saveAllProjects()">
        💾 Enregistrer toutes les réalisations
      </button>
    </div>
  `;
}

window.uploadProjectImage = function(e, idx) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    const preview = document.getElementById(`proj-img-preview-${idx}`);
    const inputUrl = document.getElementById(`proj-img-url-${idx}`);
    if (preview) preview.src = dataUrl;
    if (inputUrl) inputUrl.value = dataUrl;
    showToast('Photo chargée pour ce chantier.');
  };
  reader.readAsDataURL(file);
};

window.addNewProject = function() {
  const data = window.KKS_CMS.getData();
  data.projects.push({
    id: "proj-" + Date.now(),
    title: "Nouveau Chantier Documenté",
    location: "Kinshasa, RDC",
    client: "Client Privé / SNEL",
    type: "Moyenne Tension / Basse Tension",
    badge: "Réalisation KKS",
    image: "assets/images/kks-services-presentation.jpg",
    description: "Description complète des travaux réalisés, respect des normes et mise en conformité.",
    highlights: ["Travaux certifiés", "Matériels homologués", "Sécurité garantie"]
  });
  window.KKS_CMS.saveData(data);
  renderAdminProjects(data.projects);
  updateStats();
  showToast('Nouveau chantier ajouté.');
};

window.deleteProject = function(idx) {
  if (!confirm('Voulez-vous vraiment supprimer cette réalisation ?')) return;
  const data = window.KKS_CMS.getData();
  data.projects.splice(idx, 1);
  window.KKS_CMS.saveData(data);
  renderAdminProjects(data.projects);
  updateStats();
  showToast('Chantier supprimé.');
};

window.saveAllProjects = function() {
  const data = window.KKS_CMS.getData();
  const cards = document.querySelectorAll('#admin-projects-list .admin-item-card');

  data.projects = Array.from(cards).map((card, idx) => {
    const orig = data.projects[idx] || {};
    const hlRaw = card.querySelector('.p-highlights').value;
    const hlArray = hlRaw.split(',').map(s => s.trim()).filter(Boolean);

    return {
      id: orig.id || ('proj-' + (idx + 1)),
      title: card.querySelector('.p-title').value.trim(),
      location: card.querySelector('.p-loc').value.trim(),
      client: card.querySelector('.p-client').value.trim(),
      badge: card.querySelector('.p-badge').value.trim(),
      image: card.querySelector('.p-img-url').value.trim() || orig.image,
      description: card.querySelector('.p-desc').value.trim(),
      highlights: hlArray.length > 0 ? hlArray : orig.highlights
    };
  });

  window.KKS_CMS.saveData(data);
  showToast('Toutes les réalisations ont été enregistrées !');
  renderAdminProjects(data.projects);
  updateStats();
};

/* ==========================================================================
   DOMAINS & SNEL
   ========================================================================== */
function renderAdminDomains(domains) {
  const container = document.getElementById('admin-domains-list');
  if (!container || !domains) return;

  container.innerHTML = domains.map((d, idx) => `
    <div class="admin-item-card" style="margin-bottom: 1rem;">
      <div class="form-grid form-grid-2">
        <div class="form-group">
          <label class="form-label">Numéro Pôle</label>
          <input type="text" class="form-input d-num" value="${escapeHTML(d.num)}">
        </div>
        <div class="form-group">
          <label class="form-label">Titre du Pôle</label>
          <input type="text" class="form-input d-title" value="${escapeHTML(d.title)}" required>
        </div>
      </div>
      <div class="form-group" style="margin-top: 0.75rem;">
        <label class="form-label">Description du Pôle d'intervention</label>
        <textarea class="form-textarea d-desc" rows="2">${escapeHTML(d.description)}</textarea>
      </div>
    </div>
  `).join('') + `
    <button type="button" class="btn btn-accent" onclick="saveDomains()" style="margin-top: 0.5rem;">
      💾 Enregistrer les 3 Pôles
    </button>
  `;
}

window.saveDomains = function() {
  const data = window.KKS_CMS.getData();
  const cards = document.querySelectorAll('#admin-domains-list .admin-item-card');

  data.domains = Array.from(cards).map((card, idx) => ({
    id: data.domains[idx]?.id || ('domain-' + (idx + 1)),
    num: card.querySelector('.d-num').value.trim(),
    title: card.querySelector('.d-title').value.trim(),
    description: card.querySelector('.d-desc').value.trim(),
    icon: data.domains[idx]?.icon || 'zap',
    badge: data.domains[idx]?.badge || 'Spécialité'
  }));

  window.KKS_CMS.saveData(data);
  showToast('Pôles d\'intervention enregistrés !');
};

function renderAdminSNEL(snel) {
  const container = document.getElementById('admin-snel-list');
  if (!container || !snel) return;

  container.innerHTML = `
    <div class="form-group">
      <label class="form-label">Titre Partenariat</label>
      <input type="text" id="snel-title" class="form-input" value="${escapeHTML(snel.title || '')}">
    </div>
    <div class="form-group" style="margin-top: 0.75rem;">
      <label class="form-label">Sous-titre / Description</label>
      <textarea id="snel-desc" class="form-textarea" rows="2">${escapeHTML(snel.subtitle || '')}</textarea>
    </div>
    <div class="form-group" style="margin-top: 0.75rem;">
      <label class="form-label">Spécifications techniques (1 par ligne)</label>
      <textarea id="snel-items" class="form-textarea" rows="5">${escapeHTML((snel.items || []).join('\n'))}</textarea>
    </div>
    <button type="button" class="btn btn-accent" onclick="saveSNEL()" style="margin-top: 1rem;">
      💾 Enregistrer les Spécifications SNEL
    </button>
  `;
}

window.saveSNEL = function() {
  const data = window.KKS_CMS.getData();
  const itemsRaw = document.getElementById('snel-items').value;
  const items = itemsRaw.split('\n').map(s => s.trim()).filter(Boolean);

  data.snelPartnership = {
    title: document.getElementById('snel-title').value.trim(),
    subtitle: document.getElementById('snel-desc').value.trim(),
    badge: data.snelPartnership?.badge || "Partenaire Qualifié SNEL",
    items: items
  };

  window.KKS_CMS.saveData(data);
  showToast('Spécifications SNEL enregistrées !');
};

/* ==========================================================================
   PRODUCTS MANAGEMENT
   ========================================================================== */
function renderAdminProducts(products) {
  const container = document.getElementById('admin-products-list');
  if (!container) return;

  if (!products || products.length === 0) {
    container.innerHTML = '<p style="color: #94A3B8; text-align: center; padding: 2rem;">Aucun produit configuré. Cliquez sur "+ Ajouter un produit".</p>';
    return;
  }

  container.innerHTML = products.map((p, idx) => `
    <div class="admin-item-card" data-product-idx="${idx}">
      <div class="admin-item-header">
        <span style="font-weight: 700; font-size: 1.05rem; color: #0F172A;">Produit #${idx + 1} : ${escapeHTML(p.name)}</span>
        <button class="btn btn-sm btn-outline-dark" style="color: #DC2626; border-color: #FCA5A5;" onclick="deleteProduct(${idx})">Supprimer ce produit</button>
      </div>

      <div style="display: flex; gap: 1.5rem; margin-top: 1.25rem; flex-wrap: wrap;">
        <!-- Visual Photo Preview & Direct Upload -->
        <div style="flex: 0 0 220px;">
          <label class="form-label">Photo du Produit</label>
          <img src="${p.image || 'assets/images/logo-kks.jpg'}" id="prod-img-preview-${idx}" class="admin-img-preview" alt="Aperçu">
          
          <div style="margin-top: 0.5rem;">
            <label class="btn btn-sm btn-outline-dark" style="width: 100%; cursor: pointer; text-align: center;">
              📁 Charger une photo
              <input type="file" accept="image/*" style="display: none;" onchange="uploadProductImage(event, ${idx})">
            </label>
            <input type="text" class="form-input prod-img-url" id="prod-img-url-${idx}" value="${escapeHTML(p.image || '')}" style="font-size: 0.75rem; margin-top: 0.35rem;" placeholder="Ou chemin de l'image">
          </div>
        </div>

        <!-- Form fields -->
        <div style="flex: 1; min-width: 280px;">
          <div class="form-grid form-grid-2">
            <div class="form-group">
              <label class="form-label">Nom du Produit</label>
              <input type="text" class="form-input prod-name" value="${escapeHTML(p.name || '')}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Prix (ex: $150, Sur devis)</label>
              <input type="text" class="form-input prod-price" value="${escapeHTML(p.price || '')}">
            </div>
          </div>
          <div class="form-group" style="margin-top: 0.75rem;">
            <label class="form-label">Description du Produit</label>
            <textarea class="form-textarea prod-desc" rows="2">${escapeHTML(p.description || '')}</textarea>
          </div>
        </div>
      </div>
    </div>
  `).join('') + `
    <div style="margin-top: 1.5rem; text-align: right;">
      <button type="button" class="btn btn-accent" onclick="saveAllProducts()">
        💾 Enregistrer tous les produits
      </button>
    </div>
  `;
}

window.uploadProductImage = function(e, idx) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    const preview = document.getElementById(`prod-img-preview-${idx}`);
    const inputUrl = document.getElementById(`prod-img-url-${idx}`);
    if (preview) preview.src = dataUrl;
    if (inputUrl) inputUrl.value = dataUrl;
    showToast('Photo du produit chargée.');
  };
  reader.readAsDataURL(file);
};

window.addNewProduct = function() {
  const data = window.KKS_CMS.getData();
  if (!data.products) data.products = [];
  data.products.push({
    id: "prod-" + Date.now(),
    name: "Nouveau Produit Électrique",
    price: "Sur devis",
    image: "assets/images/logo-kks.jpg",
    description: "Description détaillée du produit et de ses caractéristiques techniques."
  });
  window.KKS_CMS.saveData(data);
  renderAdminProducts(data.products);
  updateStats();
  showToast('Nouveau produit ajouté.');
};

window.deleteProduct = function(idx) {
  if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
  const data = window.KKS_CMS.getData();
  data.products.splice(idx, 1);
  window.KKS_CMS.saveData(data);
  renderAdminProducts(data.products);
  updateStats();
  showToast('Produit supprimé.');
};

window.saveAllProducts = function() {
  const data = window.KKS_CMS.getData();
  const cards = document.querySelectorAll('#admin-products-list .admin-item-card');

  data.products = Array.from(cards).map((card, idx) => {
    const orig = data.products[idx] || {};
    return {
      id: orig.id || ('prod-' + (idx + 1)),
      name: card.querySelector('.prod-name').value.trim(),
      price: card.querySelector('.prod-price').value.trim(),
      image: card.querySelector('.prod-img-url').value.trim() || orig.image,
      description: card.querySelector('.prod-desc').value.trim()
    };
  });

  window.KKS_CMS.saveData(data);
  showToast('Tous les produits ont été enregistrés !');
  renderAdminProducts(data.products);
  updateStats();
};

/* ==========================================================================
   FORM SUBMISSIONS & BACKUP
   ========================================================================== */
function setupFormSubmissions() {
  // General & Contact Form
  const formGen = document.getElementById('form-general');
  if (formGen) {
    formGen.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = window.KKS_CMS.getData();

      data.company.name = document.getElementById('company-name').value.trim();
      data.company.tagline = document.getElementById('company-tagline').value.trim();
      data.company.subTagline = document.getElementById('company-subTagline').value.trim();
      data.company.address = document.getElementById('company-address').value.trim();
      data.company.phone = document.getElementById('company-phone').value.trim();
      data.company.phoneClean = document.getElementById('company-phoneClean').value.trim();
      data.company.email = document.getElementById('company-email').value.trim();
      data.company.openingHours = document.getElementById('company-openingHours').value.trim();

      data.company.heroTitle = document.getElementById('hero-title').value.trim();
      data.company.heroSubtitle = document.getElementById('hero-subtitle').value.trim();
      data.company.aboutText1 = document.getElementById('about-p1').value.trim();
      data.company.aboutText2 = document.getElementById('about-p2').value.trim();
      data.company.aboutText3 = document.getElementById('about-p3').value.trim();

      data.company.rccm = document.getElementById('company-rccm') ? document.getElementById('company-rccm').value.trim() : '';
      data.company.idnat = document.getElementById('company-idnat') ? document.getElementById('company-idnat').value.trim() : '';
      data.company.impot = document.getElementById('company-impot') ? document.getElementById('company-impot').value.trim() : '';

      window.KKS_CMS.saveData(data);
      showToast('Coordonnées et textes généraux enregistrés avec succès !');
    });
  }

  // Media Form Save
  const formMedia = document.getElementById('form-media');
  if (formMedia) {
    formMedia.addEventListener('submit', (e) => {
      e.preventDefault();
      saveCurrentMedia();
      showToast('Tous les médias ont été mis à jour.');
    });
  }

  // Security Form (PIN)
  const formSec = document.getElementById('form-security');
  if (formSec) {
    formSec.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPin = document.getElementById('new-pin').value.trim();
      if (newPin.length >= 4) {
        localStorage.setItem('kks_admin_pin', newPin);
        showToast('Code PIN modifié avec succès !');
        document.getElementById('new-pin').value = '';
      } else {
        alert('Le code PIN doit comporter au moins 4 caractères.');
      }
    });
  }
}

function setupBackupEvents() {
  const exportBtn = document.getElementById('btn-export-json');
  const importInput = document.getElementById('input-import-json');
  const resetBtn = document.getElementById('btn-reset-default');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      window.KKS_CMS.exportJSON();
      showToast('Fichier JSON de sauvegarde téléchargé.');
    });
  }

  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const res = window.KKS_CMS.importJSON(event.target.result);
        if (res.success) {
          loadAllData();
          showToast('Données restaurées avec succès !');
        } else {
          alert('Erreur lors de l\'importation : ' + res.error);
        }
      };
      reader.readAsText(file);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Attention : toutes vos modifications manuelles seront remplacées par les données d\'origine du portfolio KKS. Continuer ?')) {
        window.KKS_CMS.resetToDefault();
        loadAllData();
        showToast('Données réinitialisées avec succès.');
      }
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(msg) {
  let toast = document.querySelector('.admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}