/**
 * KKS Groupe Électrique SARLU — Public Website Script
 * Framework MOKILI
 */

document.addEventListener('DOMContentLoaded', () => {
  initWebsite();
  
  // Listen to live CMS updates
  window.addEventListener('kks_data_updated', (e) => {
    renderDynamicContent(e.detail);
  });
});

function initWebsite() {
  const data = window.KKS_CMS ? window.KKS_CMS.getData() : window.DEFAULT_KKS_DATA;
  renderDynamicContent(data);
  setupNavigation();
  setupLightbox();
  initMap(data);
}

function renderDynamicContent(data) {
  if (!data) return;

  // Render company texts
  document.querySelectorAll('[data-cms="company.name"]').forEach(el => el.textContent = data.company.name);
  document.querySelectorAll('[data-cms="company.tagline"]').forEach(el => el.textContent = data.company.tagline);
  document.querySelectorAll('[data-cms="company.subTagline"]').forEach(el => el.textContent = data.company.subTagline);
  document.querySelectorAll('[data-cms="company.address"]').forEach(el => el.textContent = data.company.address);
  document.querySelectorAll('[data-cms="company.phone"]').forEach(el => el.textContent = data.company.phone);
  document.querySelectorAll('[data-cms="company.email"]').forEach(el => {
    el.textContent = data.company.email;
    if (el.tagName === 'A') el.href = 'mailto:' + data.company.email;
  });
  document.querySelectorAll('[data-cms="company.openingHours"]').forEach(el => el.textContent = data.company.openingHours);
  
  // Phone links
  const telHref = 'tel:' + data.company.phoneClean;
  document.querySelectorAll('.js-tel-link').forEach(el => el.href = telHref);

  // WhatsApp links
  const waMsg = encodeURIComponent("Bonjour KKS Groupe Électrique, je souhaite avoir des informations concernant vos services.");
  const waHref = 'https://wa.me/' + data.company.phoneClean.replace('+', '') + '?text=' + waMsg;
  document.querySelectorAll('.js-wa-link').forEach(el => el.href = waHref);

  // Hero Texts
  const heroTitleEl = document.getElementById('cms-hero-title');
  if (heroTitleEl && data.company.heroTitle) {
    heroTitleEl.innerHTML = data.company.heroTitle.replace(/(ingénierie|installations électriques|Kinshasa)/gi, '<span class="highlight">$1</span>');
  }
  const heroSubEl = document.getElementById('cms-hero-subtitle');
  if (heroSubEl && data.company.heroSubtitle) heroSubEl.textContent = data.company.heroSubtitle;

  // About Texts
  const aboutP1 = document.getElementById('cms-about-1');
  const aboutP2 = document.getElementById('cms-about-2');
  const aboutP3 = document.getElementById('cms-about-3');
  if (aboutP1) aboutP1.textContent = data.company.aboutText1;
  if (aboutP2) aboutP2.textContent = data.company.aboutText2;
  if (aboutP3) aboutP3.textContent = data.company.aboutText3;

  // Render Media
  if (data.media) {
    if (data.media.logo) {
      document.querySelectorAll('.logo-img, .site-logo img').forEach(img => img.src = data.media.logo);
    }
    if (data.media.aboutImage) {
      const aboutImg = document.querySelector('.about-img');
      if (aboutImg) aboutImg.src = data.media.aboutImage;
    }
    if (data.media.heroCardImage) {
      const heroImg = document.querySelector('.hero-card-img');
      if (heroImg) heroImg.src = data.media.heroCardImage;
    }
    if (data.media.video) {
      const videoEl = document.querySelector('.video-player');
      if (videoEl) {
        const srcEl = videoEl.querySelector('source');
        if (srcEl && srcEl.src !== data.media.video) {
          srcEl.src = data.media.video;
          if (data.media.videoPoster) videoEl.poster = data.media.videoPoster;
          videoEl.load();
        }
      }
    }
  }

  // Render Domains (Page 3 PDF)
  renderDomains(data.domains);

  // Render Services
  renderServices(data.services, data.company);

  // Render Projects / Chantiers
  renderProjects(data.projects);

  // Render Products
  renderProducts(data.products || [], data.company);

  // Render Strengths / Pourquoi KKS
  renderStrengths(data.strengths);

  // Render SNEL Partnership Items
  renderSNEL(data.snelPartnership);

  // Set Official Docs
  document.querySelectorAll('[data-cms="company.rccm"]').forEach(el => el.textContent = data.company.rccm || '');
  document.querySelectorAll('[data-cms="company.idnat"]').forEach(el => el.textContent = data.company.idnat || '');
  document.querySelectorAll('[data-cms="company.impot"]').forEach(el => el.textContent = data.company.impot || '');
}

function renderDomains(domains) {
  const container = document.getElementById('domains-container');
  if (!container || !domains) return;

  container.innerHTML = domains.map(d => `
    <div class="domain-card">
      <div class="domain-num">${d.num}</div>
      <h3 class="domain-title">${escapeHTML(d.title)}</h3>
      <p class="domain-desc">${escapeHTML(d.description)}</p>
    </div>
  `).join('');
}

function renderServices(services, company) {
  const container = document.getElementById('services-container');
  if (!container || !services) return;

  const waMsgBase = "Bonjour KKS Groupe Électrique, je souhaite un devis / des informations pour le service : ";
  const phoneClean = company && company.phoneClean ? company.phoneClean.replace('+', '') : '243983030088';

  container.innerHTML = services.map(s => {
    const waUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(waMsgBase + s.title)}`;
    return `
      <div class="service-card" data-service-id="${s.id}">
        <div class="service-top">
          <div class="service-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <span class="service-num">${s.num}</span>
        </div>
        <h3 class="service-title">${escapeHTML(s.title)}</h3>
        <p class="service-desc">${escapeHTML(s.description)}</p>
        <div class="service-footer">
          <a href="${waUrl}" target="_blank" rel="noopener" class="service-cta">
            Demander ce service &rarr;
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container || !projects) return;

  container.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-thumb-wrap" onclick="openLightbox('${p.image}', '${escapeHTML(p.title)} - ${escapeHTML(p.location)}')">
        <img src="${p.image}" alt="${escapeHTML(p.title)}" class="project-thumb" loading="lazy">
        <span class="project-badge">${escapeHTML(p.badge || 'Réalisation')}</span>
        <div class="project-zoom-btn" title="Agrandir la photo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
      </div>
      <div class="project-body">
        <div class="project-loc">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${escapeHTML(p.location)}
        </div>
        <h3 class="project-title">${escapeHTML(p.title)}</h3>
        <p class="project-desc">${escapeHTML(p.description)}</p>
        <div class="project-highlights">
          ${(p.highlights || []).map(h => `<span class="project-tag">${escapeHTML(h)}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderProducts(products, company) {
  const container = document.getElementById('products-container');
  if (!container || !products) return;

  const waMsgBase = "Bonjour KKS Groupe Électrique, je souhaite acheter ou avoir des informations sur le produit : ";
  const phoneClean = company && company.phoneClean ? company.phoneClean.replace('+', '') : '243983030088';

  container.innerHTML = products.map(p => {
    const waUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(waMsgBase + p.name)}`;
    return `
      <div class="project-card product-card">
        <div class="project-img-box">
          <img src="${p.image}" alt="Produit ${escapeHTML(p.name)}" class="project-img" loading="lazy" style="object-fit: cover;">
          <div class="project-overlay" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);">
            <span class="project-client" style="background-color: var(--primary); color: white; padding: 0.35rem 0.75rem; border-radius: 4px; font-weight: bold;">
              ${escapeHTML(p.price)}
            </span>
          </div>
        </div>
        <div class="project-content" style="display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;">
          <div>
            <h3 class="project-title" style="margin-top: 0.5rem;">${escapeHTML(p.name)}</h3>
            <p class="project-desc">${escapeHTML(p.description)}</p>
          </div>
          <div class="service-footer" style="margin-top: 1.5rem;">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="width: 100%; text-align: center; display: block; padding: 0.75rem;">
              Acheter sur WhatsApp
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 0.5rem;"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderStrengths(strengths) {
  const container = document.getElementById('strengths-container');
  if (!container || !strengths) return;

  container.innerHTML = strengths.map(st => `
    <div class="why-card">
      <div class="why-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
      <div class="why-num">${st.num}</div>
      <h3 class="why-title">${escapeHTML(st.title)}</h3>
      <p class="why-desc">${escapeHTML(st.description)}</p>
    </div>
  `).join('');
}

function renderSNEL(snelData) {
  const container = document.getElementById('snel-specs-container');
  if (!container || !snelData || !snelData.items) return;

  container.innerHTML = snelData.items.map(item => `
    <div class="snel-spec-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${escapeHTML(item)}</span>
    </div>
  `).join('');
}

function setupNavigation() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('drawer-close-btn');

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

function setupLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  if (!modal) return;

  function closeModal() {
    modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

window.openLightbox = function(imgSrc, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (modal && img) {
    img.src = imgSrc;
    if (cap) cap.textContent = caption || '';
    modal.classList.add('active');
  }
};

function initMap(data) {
  const mapElement = document.getElementById('kks-map');
  if (!mapElement || typeof L === 'undefined') return;

  // Coordonnées Kinshasa Huilerie / Commune de Kinshasa
  const kinshasaCoords = [-4.3168, 15.3125];

  const map = L.map('kks-map', {
    center: kinshasaCoords,
    zoom: 14,
    scrollWheelZoom: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const marker = L.marker(kinshasaCoords).addTo(map);
  const popupContent = `
    <div style="font-family: system-ui; padding: 4px;">
      <strong style="color: #0F172A; font-size: 14px;">KKS Groupe Électrique SARLU</strong><br>
      <span style="font-size: 12px; color: #64748B;">Huilerie, avenue Luvungi N°158, Q/Dialo, C/Kinshasa</span><br>
      <a href="tel:${data.company.phoneClean}" style="color: #D97706; font-weight: bold; font-size: 12px; text-decoration: none; display: inline-block; margin-top: 4px;">
        📞 ${data.company.phone}
      </a>
    </div>
  `;
  marker.bindPopup(popupContent).openPopup();
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}