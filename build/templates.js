'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { business, waLink, navTree, topBarExtra, ui } = require('./data/site');
let imageMeta = {};
try {
  imageMeta = require('./image-meta.json');
} catch (e) {
  // Manifest not generated yet (run `npm run optimize-images`) — fall back to plain <img>.
}

// Short content hash appended as ?v= to style.css/main.js so we can tell the
// server (see .htaccess) to cache them for a year: the URL itself changes
// whenever the file does, so a stale cached copy is never served.
function fileHash(relPath) {
  try {
    const buf = fs.readFileSync(path.join(__dirname, '..', relPath));
    return crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);
  } catch (e) {
    return Date.now().toString(36);
  }
}
const ASSET_VERSION = {
  css: fileHash('assets/css/style.css'),
  js: fileHash('assets/js/main.js'),
};

const icons = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><path d="M2 6h20v12H2z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  whatsapp: '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.04 3C9.37 3 3.98 8.39 3.98 15.06c0 2.23.6 4.32 1.66 6.12L3 29l8.02-2.55a12.02 12.02 0 0 0 5.02 1.1h.01c6.66 0 12.05-5.4 12.05-12.06C28.1 8.4 22.71 3 16.04 3zm7.06 17.02c-.3.85-1.72 1.62-2.37 1.7-.6.08-1.37.11-2.2-.14-.51-.16-1.16-.37-2-.73-3.52-1.52-5.82-5.06-6-5.3-.18-.24-1.43-1.9-1.43-3.62 0-1.73.9-2.58 1.23-2.93.32-.35.7-.44.93-.44.24 0 .47 0 .68.01.22.01.51-.08.8.61.3.7 1.02 2.44 1.11 2.62.09.18.15.4.03.64-.12.24-.18.4-.36.6-.18.2-.38.46-.54.62-.18.18-.37.37-.16.73.21.35.94 1.55 2.02 2.51 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.4.24-.36.48-.3.8-.18.32.12 2.06.97 2.41 1.15.35.18.59.27.68.42.09.15.09.85-.21 1.7z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4L9 16.2z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  flagBR: '<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#009C3B"/><polygon points="12,2 22,8 12,14 2,8" fill="#FFDF00"/><circle cx="12" cy="8" r="3.2" fill="#002776"/></svg>',
  flagUS: '<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#B22234"/><rect y="1.23" width="24" height="1.23" fill="#fff"/><rect y="3.69" width="24" height="1.23" fill="#fff"/><rect y="6.15" width="24" height="1.23" fill="#fff"/><rect y="8.61" width="24" height="1.23" fill="#fff"/><rect y="11.07" width="24" height="1.23" fill="#fff"/><rect y="13.53" width="24" height="1.23" fill="#fff"/><rect width="10" height="8.61" fill="#3C3B6E"/></svg>',
  flagES: '<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#AA151B"/><rect y="4" width="24" height="8" fill="#F1BF00"/></svg>',
};

const url = (lang, slug) => `/${lang}/${slug ? slug + '/' : ''}`;
const asset = (p) => `/assets/${p}`;

// Renders <picture> with AVIF/WebP siblings (when optimize-images produced smaller
// versions) falling back to the original file, plus width/height to prevent layout
// shift. `file` is just the basename inside assets/img/ (e.g. "Foto01-1.jpg").
function renderImg(file, alt, { loading = 'lazy', cls, style } = {}) {
  const meta = imageMeta[file] || {};
  const dims = meta.width && meta.height ? ` width="${meta.width}" height="${meta.height}"` : '';
  const classAttr = cls ? ` class="${cls}"` : '';
  const styleAttr = style ? ` style="${style}"` : '';
  const fallbackSrc = asset('img/' + file);
  const imgTag = `<img src="${fallbackSrc}" alt="${alt || ''}" loading="${loading}" decoding="async"${dims}${classAttr}${styleAttr}>`;
  if (!meta.avif && !meta.webp) return imgTag;
  const base = file.replace(/\.(jpe?g|png)$/i, '');
  const sources = [
    meta.avif ? `<source srcset="${asset('img/' + base + '.avif')}" type="image/avif">` : '',
    meta.webp ? `<source srcset="${asset('img/' + base + '.webp')}" type="image/webp">` : '',
  ].join('');
  return `<picture>${sources}${imgTag}</picture>`;
}

function renderSubMenu(children, lang, currentPath) {
  if (!children || !children.length) return '';
  return `<ul class="sub-menu">${children.map((c) => renderNavItem(c, lang, currentPath)).join('')}</ul>`;
}

function renderNavItem(item, lang, currentPath) {
  const href = url(lang, item.slug);
  const active = currentPath === item.slug ? ' active' : '';
  const hasChildren = item.children && item.children.length;
  return `<li class="${hasChildren ? 'has-children' : ''}${active}">
    <a href="${href}">${item.label[lang]}${hasChildren ? icons.chevronDown : ''}</a>
    ${renderSubMenu(item.children, lang, currentPath)}
  </li>`;
}

function renderHeader(lang, currentPath) {
  const wa = waLink(lang);
  return `
<header>
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-left">
        <a class="top-bar-item" href="${wa}" target="_blank" rel="noopener"><span aria-hidden="true">${icons.phone}</span> ${business.phoneDisplay}</a>
        <a class="top-bar-item" href="mailto:${business.email}"><span aria-hidden="true">${icons.mail}</span> ${business.email}</a>
        <span class="top-bar-item hide-mobile"><span aria-hidden="true">${icons.clock}</span> <span class="hide-mobile">${business.hours[lang]}</span></span>
      </div>
      <div class="top-bar-right">
        <div class="top-bar-links">
          ${topBarExtra.map((t) => `<a href="${url(lang, t.slug)}">${t.label[lang]}</a>`).join('')}
        </div>
        <div class="top-bar-icons">
          <div class="lang-switch">
            <a href="/pt/${currentPath ? currentPath + '/' : ''}" class="${lang === 'pt' ? 'active' : ''}" aria-label="Português">${icons.flagBR}</a>
            <a href="/en/${currentPath ? currentPath + '/' : ''}" class="${lang === 'en' ? 'active' : ''}" aria-label="English">${icons.flagUS}</a>
            <a href="/es/${currentPath ? currentPath + '/' : ''}" class="${lang === 'es' ? 'active' : ''}" aria-label="Español">${icons.flagES}</a>
          </div>
          <a class="social-link" href="${business.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icons.linkedin}</a>
          <a class="social-link" href="${business.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="main-header">
    <div class="container">
      <a class="logo" href="${url(lang, '')}"><img src="${asset('img/logo-marcanti.png')}" alt="Marcanti" width="145" height="50"></a>
      <nav class="main-nav">
        <ul>${navTree.map((item) => renderNavItem(item, lang, currentPath)).join('')}</ul>
      </nav>
      <div class="header-cta">
        <a class="btn btn-brand-sm" href="${url(lang, 'contato')}"><span>${ui.requestQuote[lang]}</span></a>
      </div>
      <button class="nav-toggle" aria-label="Menu">${icons.menu}</button>
    </div>
  </div>
  <div class="nav-backdrop"></div>
</header>`;
}

function renderFooter(lang) {
  const wa = waLink(lang);
  const productCols = navTree.filter((n) => ['espacadores', 'kit-vedacao'].includes(n.key));
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <img class="footer-logo" src="${asset('img/logo-marcanti.png')}" alt="Marcanti" width="500" height="157" loading="lazy">
        <p>${ui.aboutFooter[lang]}</p>
        <h5 style="margin-top:24px;">${ui.whereWeAre[lang]}</h5>
        <p>${business.addressLines.join('<br>')}</p>
      </div>
      <div class="footer-col">
        <h5>${ui.productsLabel[lang]}</h5>
        <ul>
          ${navTree.filter((n) => n.key !== 'contato' && n.key !== 'tecnologia').map((n) => `<li><a href="${url(lang, n.slug)}">${n.label[lang]}</a></li>`).join('')}
          <li><a href="${url(lang, 'tecnologia')}">${navTree.find((n) => n.key === 'tecnologia').label[lang]}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>${ui.contactUsLabel[lang]}</h5>
        <div class="footer-contact-item">${icons.phone}<a href="${wa}" target="_blank" rel="noopener">${business.phoneDisplay}</a></div>
        <div class="footer-contact-item">${icons.mail}<a href="mailto:${business.email}">${business.email}</a></div>
        <div class="footer-contact-item">${icons.clock}<span>${business.hours[lang]}</span></div>
        <a class="btn btn-brand" style="margin-top:8px;" href="${url(lang, 'contato')}">${ui.requestQuote[lang]}</a>
      </div>
      <div class="footer-col">
        <h5>${ui.socialLabel[lang]}</h5>
        <div class="footer-social">
          <a href="${business.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icons.linkedin}</a>
          <a href="${business.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a>
          <a href="${wa}" target="_blank" rel="noopener" aria-label="WhatsApp">${icons.whatsapp}</a>
        </div>
        <h5 style="margin-top:28px;">${ui.catalogLabel[lang]}</h5>
        <a class="btn btn-outline" style="border-color:#3a4148; color:#fff;" href="${business.catalogUrl}" target="_blank" rel="noopener">${ui.downloadCatalog[lang]}</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} Marcanti. ${ui.allRightsReserved[lang]}</span>
      <a href="${url(lang, 'politica-de-privacidade')}">LGPD: ${ui.privacyPolicy[lang]}</a>
    </div>
  </div>
</footer>
<a class="whatsapp-float" href="${wa}" target="_blank" rel="noopener" aria-label="WhatsApp">${icons.whatsapp}</a>
<script src="${asset('js/main.js')}?v=${ASSET_VERSION.js}" defer></script>`;
}

function renderHead(lang, meta) {
  const hreflangs = ['pt', 'en', 'es'].map((l) => `<link rel="alternate" hreflang="${l}" href="https://marcanti.ind.br${url(l, meta.path)}">`).join('\n  ');
  const heroPreload = meta.preloadImage
    ? `<link rel="preload" as="image" href="${meta.preloadImage}" fetchpriority="high">\n`
    : '';
  return `<!DOCTYPE html>
<html lang="${lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en' : 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${meta.title}</title>
<meta name="description" content="${meta.description || ''}">
<link rel="canonical" href="https://marcanti.ind.br${url(lang, meta.path)}">
${hreflangs}
<link rel="icon" href="${asset('img/logo-marcanti.png')}">
${heroPreload}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&family=Roboto+Slab:wght@400;600;700&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset('css/style.css')}?v=${ASSET_VERSION.css}">
</head>`;
}

function page(lang, meta, bodyHtml) {
  const heroMatch = bodyHtml.match(/--hero-img:url\('([^']+)'\)/);
  const fullMeta = heroMatch ? { ...meta, preloadImage: heroMatch[1] } : meta;
  return `${renderHead(lang, fullMeta)}
<body>
${renderHeader(lang, meta.path)}
<main>
${bodyHtml}
</main>
${renderFooter(lang)}
</body>
</html>`;
}

// ---------- Reusable content block builders ----------

const heroStyle = (file, opacity) => {
  const parts = [];
  if (file) parts.push(`--hero-img:url('${asset('img/' + file)}')`);
  if (opacity !== undefined) parts.push(`--hero-tint-alpha:${opacity}`);
  return parts.length ? ` style="${parts.join(';')}"` : '';
};

function pageHero({ eyebrow, title, subtitle, bg, tag = 'h1', divider = false, warm = false, tint, opacity, cta }) {
  const classes = ['page-hero'];
  if (warm) classes.push('warm');
  if (tint) classes.push('tint-' + tint);
  const subtitleHtml = Array.isArray(subtitle)
    ? subtitle.map((s) => `<p class="lede">${s}</p>`).join('')
    : (subtitle ? `<p class="lede">${subtitle}</p>` : '');
  return `<section class="${classes.join(' ')}"${heroStyle(bg, opacity)}>
    <div class="container">
      ${eyebrow ? `<span class="breadcrumb-tag">${eyebrow}</span>` : ''}
      <${tag}>${title}</${tag}>
      ${divider ? '<span class="hero-divider"></span>' : ''}
      ${subtitleHtml}
      ${cta ? `<a class="btn btn-primary" style="margin-top:8px;" href="${cta.href}">${cta.label}</a>` : ''}
    </div>
  </section>`;
}

function crumbs(lang, items) {
  // items: [{label, slug}] slug undefined for current (last) item
  const home = ui.home[lang];
  const parts = [`<a href="${url(lang, '')}">${home}</a>`].concat(
    items.map((it) => (it.slug !== undefined ? `<a href="${url(lang, it.slug)}">${it.label}</a>` : `<span>${it.label}</span>`))
  );
  return `<div class="crumbs">${parts.join(' &raquo; ')}</div>`;
}

function splitSection({ eyebrow, title, paragraphs = [], img, reverse = false, cta, bg, mediaClass, ctaClass = 'btn-secondary', splitClass }) {
  return `<section${bg ? ' class="bg-light"' : ''}>
    <div class="container split${reverse ? ' reverse' : ''}${splitClass ? ' ' + splitClass : ''}">
      <div class="split-media${mediaClass ? ' ' + mediaClass : ''}">${renderImg(img, title || '')}</div>
      <div class="split-content">
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
        ${title ? `<h2>${title}</h2>` : ''}
        ${paragraphs.map((p) => `<p>${p}</p>`).join('')}
        ${cta ? `<a class="btn ${ctaClass}" href="${cta.href}">${cta.label}</a>` : ''}
      </div>
    </div>
  </section>`;
}

function cardGrid({ eyebrow, title, subtitle, cards, cols, imgFit }) {
  const gridClass = imgFit === 'contain' ? 'card-grid card-grid-contain' : 'card-grid';
  return `<section>
    <div class="container">
      <div class="text-center max-720 mx-auto">
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
        ${title ? `<h2>${title}</h2>` : ''}
        ${subtitle ? `<p class="lede">${subtitle}</p>` : ''}
      </div>
      <div class="${gridClass}"${cols ? ` style="grid-template-columns:repeat(${cols},1fr)"` : ''}>
        ${cards.map((c) => `<a class="card" href="${c.href}">
          ${renderImg(c.img, c.title)}
          <div class="card-body">
            <h3>${c.title}</h3>
            ${c.text ? `<p>${c.text}</p>` : ''}
            <span class="card-link">${c.linkLabel} &rarr;</span>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </section>`;
}

function stepGrid({ eyebrow, title, steps, theme }) {
  return `<section class="${theme === 'brand' ? 'bg-brand' : 'bg-light'}">
    <div class="container">
      <div class="text-center max-720 mx-auto">
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
        ${title ? `<h2>${title}</h2>` : ''}
      </div>
      <div class="step-grid">
        ${steps.map((s) => `<div class="step-card">
          ${renderImg(s.img, s.title)}
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function valueGrid({ eyebrow, title, values }) {
  return `<section>
    <div class="container">
      ${title ? `<div class="text-center max-720 mx-auto">${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}<h2>${title}</h2></div>` : ''}
      <div class="value-grid">
        ${values.map((v) => `<div class="value-card">${v.icon ? renderImg(v.icon, '', { cls: 'value-icon' }) : ''}<h3>${v.title}</h3><p>${v.text}</p></div>`).join('')}
      </div>
    </div>
  </section>`;
}

function galleryGrid({ title, subtitle, images, lang }) {
  const slides = images.map((file) => `<div class="carousel-slide">${renderImg(file, '')}</div>`).join('');
  return `<div class="gallery-block">
    ${title ? `<h2>${title}</h2>` : ''}
    ${subtitle ? `<p class="lede">${subtitle}</p>` : ''}
    <div class="carousel" data-carousel>
      <div class="carousel-track" tabindex="0">${slides}</div>
      <button type="button" class="carousel-arrow carousel-prev" aria-label="Anterior">${icons.chevronLeft}</button>
      <button type="button" class="carousel-arrow carousel-next" aria-label="Próximo">${icons.chevronRight}</button>
    </div>
  </div>`;
}

function colorSwatches({ title, colors, note, images }) {
  return `<div class="colors-block">
    ${title ? `<h2>${title}</h2>` : ''}
    ${note ? `<p>${note}</p>` : ''}
    <div class="color-gallery">
      ${colors.map((c, i) => {
        const file = images && images[i];
        return `<a class="color-gallery-item" href="${asset('img/' + file)}" target="_blank" rel="noopener" aria-label="${c}">
          ${renderImg(file, c)}
          <span>${c}</span>
        </a>`;
      }).join('')}
    </div>
  </div>`;
}

function infoBox(paragraphs) {
  return `<div class="info-box">${paragraphs.map((p) => `<p>${p}</p>`).join('')}</div>`;
}

function ctaBand({ title, text, lang }) {
  return `<section class="cta-band">
    <div class="container">
      <h2>${title}</h2>
      ${text ? `<p>${text}</p>` : ''}
      <a class="btn btn-primary" href="${url(lang, 'contato')}">${ui.requestQuote[lang]}</a>
    </div>
  </section>`;
}

function contactForm(lang, submitLabel) {
  return `<form class="contact-form" action="/contato.php" method="post"
    data-sending="${ui.sending[lang]}" data-success="${ui.formSuccess[lang]}" data-error="${ui.formError[lang]}">
    <input type="hidden" name="lang" value="${lang}">
    <div class="hp-field"><label>Website</label><input type="text" name="website" tabindex="-1" autocomplete="off"></div>
    <div class="form-group">
      <label for="f-name">${{ pt: 'Nome', en: 'Name', es: 'Nombre' }[lang]}</label>
      <input type="text" id="f-name" name="name" placeholder="${{ pt: 'Digite seu nome...', en: 'Enter your name...', es: 'Escribe tu nombre...' }[lang]}" required>
    </div>
    <div class="form-group">
      <label for="f-email">${{ pt: 'Email', en: 'Email', es: 'Correo electrónico' }[lang]}</label>
      <input type="email" id="f-email" name="email" placeholder="${{ pt: 'Digite seu email...', en: 'Enter your email...', es: 'Escribe tu correo...' }[lang]}" required>
    </div>
    <div class="form-group">
      <label for="f-phone">${{ pt: 'Telefone', en: 'Phone', es: 'Teléfono' }[lang]}</label>
      <input type="tel" id="f-phone" name="phone" placeholder="${{ pt: 'Digite seu telefone...', en: 'Enter your phone...', es: 'Escribe tu teléfono...' }[lang]}" required>
    </div>
    <div class="form-group">
      <label for="f-msg">${{ pt: 'Mensagem', en: 'Message', es: 'Mensaje' }[lang]}</label>
      <textarea id="f-msg" name="message" rows="5" placeholder="${{ pt: 'Digite sua mensagem...', en: 'Enter your message...', es: 'Escribe tu mensaje...' }[lang]}"></textarea>
    </div>
    <button type="submit" class="btn btn-secondary">${submitLabel || ui.sendMessage[lang]}</button>
    <div class="form-status" role="status"></div>
  </form>`;
}

module.exports = {
  icons, url, asset, page, renderImg,
  pageHero, crumbs, splitSection, cardGrid, stepGrid, valueGrid,
  galleryGrid, colorSwatches, infoBox, ctaBand, contactForm,
};
