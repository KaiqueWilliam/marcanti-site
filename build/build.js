'use strict';
const fs = require('fs');
const path = require('path');
const T = require('./templates');
const { LANGS } = require('./data/site');

const pageModules = [
  ...require('./pages/main'),
  ...require('./pages/espacadores'),
  ...require('./pages/kit-vedacao'),
  ...require('./pages/blog'),
];

const ROOT = path.join(__dirname, '..');
let count = 0;

for (const pageDef of pageModules) {
  for (const lang of LANGS) {
    const meta = {
      path: pageDef.slug,
      title: pageDef.title[lang],
      description: (pageDef.description && pageDef.description[lang]) || '',
      image: pageDef.image || undefined, // absolute-or-relative path for og:image; falls back to hero/site default
      noindex: pageDef.noindex || undefined, // páginas de conversão (ex.: /obrigado/) não devem ranquear
    };
    const bodyHtml = pageDef.body(lang);
    const html = T.page(lang, meta, bodyHtml);
    const outDir = path.join(ROOT, lang, pageDef.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    count++;
  }
}

console.log(`Built ${pageModules.length} pages x ${LANGS.length} languages = ${count} HTML files.`);

const slugs = pageModules.map((p) => p.slug).sort();
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) {
  console.error('DUPLICATE SLUGS DETECTED:', dupes);
  process.exit(1);
}
