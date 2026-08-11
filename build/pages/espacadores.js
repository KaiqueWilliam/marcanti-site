'use strict';
const T = require('../templates');
const { ui } = require('../data/site');

const genericIntro = {
  pt: 'Com os espaçadores multiapoio da MARCANTI, você tem a solução perfeita para suportar e posicionar de forma precisa e estável os elementos estruturais, oferecendo máxima resistência e segurança para os seus projetos.',
  en: 'With MARCANTI spacers, you get the perfect solution to support and position structural elements precisely and stably, offering maximum strength and safety for your projects.',
  es: 'Con los espaciadores de MARCANTI, tienes la solución perfecta para soportar y posicionar de forma precisa y estable los elementos estructurales, ofreciendo máxima resistencia y seguridad para tus proyectos.',
};
const fitSystemText = {
  pt: 'Todos os espaçadores vêm com a funcionalidade de encaixar em outras peças. Isso permite algumas configurações diferentes. Veja nas fotos abaixo algumas aplicações.',
  en: 'All spacers feature interlocking connections with other pieces, allowing for different configurations. See some applications in the photos below.',
  es: 'Todos los espaciadores cuentan con la función de encajarse con otras piezas, lo que permite distintas configuraciones. Mira algunas aplicaciones en las fotos a continuación.',
};
const lineLabel = {
  postes: { pt: 'LINHA POSTES', en: 'POLE LINE', es: 'LÍNEA POSTES' },
  construcao: { pt: 'LINHA CONSTRUÇÃO', en: 'CONSTRUCTION LINE', es: 'LÍNEA CONSTRUCCIÓN' },
};

function productShell({ slug, crumbItems, eyebrow, h3, intro, sections, extraSections = [] }) {
  return {
    slug,
    title: null, // set by caller
    description: null,
    body(lang) {
      return `
${T.pageHero({ eyebrow: eyebrow[lang], title: h3[lang], subtitle: intro[lang], bg: 'Quem-Somos.jpg', tag: 'h3', warm: true, divider: true })}
<section>
  <div class="container">
    ${T.crumbs(lang, crumbItems(lang))}
    ${sections.map((s) => s(lang)).join('')}
    ${extraSections.map((s) => s(lang)).join('')}
  </div>
</section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
    },
  };
}

function aboutSection({ img, paragraphs }) {
  return (lang) => T.splitSection({ title: ui.aboutProduct[lang], paragraphs: paragraphs[lang], img });
}
function fitSection({ images }) {
  return (lang) => `<div class="section-tight">${T.galleryGrid({ title: ui.fitSystem[lang], subtitle: fitSystemText[lang], images })}</div>`;
}
function sizesSection({ paragraphs, img }) {
  return (lang) => `<div class="section-tight"><h2>${ui.availableSizes[lang]}</h2><div class="split"><div>${T.infoBox(paragraphs[lang])}</div>${img ? `<div><img src="${T.asset('img/' + img)}" alt="" loading="lazy" style="border-radius:8px;"></div>` : ''}</div></div>`;
}

// =================== ESPAÇADORES HUB ===================
const hub = {
  slug: 'espacadores',
  title: { pt: 'Espaçadores – Marcanti', en: 'Spacers – Marcanti', es: 'Espaciadores – Marcanti' },
  description: {
    pt: 'Espaçadores de concreto MARCANTI: Linha Postes e Linha Construção, garantindo segurança, durabilidade e eficiência.',
    en: 'MARCANTI concrete spacers: Pole Line and Construction Line, ensuring safety, durability and efficiency.',
    es: 'Espaciadores de concreto MARCANTI: Línea Postes y Línea Construcción, garantizando seguridad, durabilidad y eficiencia.',
  },
  body(lang) {
    const c = {
      pt: { eyebrow: 'Espaçadores', intro: 'Descubra a excelência dos espaçadores de linha para poste e linha de construção da MARCANTI, garantindo segurança, durabilidade e eficiência em suas instalações.' },
      en: { eyebrow: 'Spacers', intro: 'Discover the excellence of MARCANTI’s pole line and construction line spacers, ensuring safety, durability and efficiency in your installations.' },
      es: { eyebrow: 'Espaciadores', intro: 'Descubre la excelencia de los espaciadores de línea para postes y línea de construcción de MARCANTI, garantizando seguridad, durabilidad y eficiencia en tus instalaciones.' },
    }[lang];
    const cards = [
      { href: T.url(lang, 'espacadores/linha-postes'), img: 'FOTO04.jpg', title: { pt: 'Linha Postes', en: 'Pole Line', es: 'Línea Postes' }[lang] },
      { href: T.url(lang, 'espacadores/linha-construcao'), img: 'Foto01-1.jpg', title: { pt: 'Linha Construção', en: 'Construction Line', es: 'Línea Construcción' }[lang] },
    ].map((c2) => ({ ...c2, linkLabel: ui.viewProduct[lang] }));
    return `
${T.pageHero({ title: c.eyebrow, subtitle: c.intro, bg: 'Quem-Somos.jpg', tag: 'h3', divider: true, warm: true })}
${T.cardGrid({ cards, cols: 2 })}
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

// =================== LINHA POSTES HUB ===================
const linhaPostesHub = {
  slug: 'espacadores/linha-postes',
  title: { pt: 'Linha Postes – Marcanti', en: 'Pole Line – Marcanti', es: 'Línea Postes – Marcanti' },
  description: {
    pt: 'Espaçadores Linha Postes MARCANTI: Circular Fechado, Circular Aberto, Cadeirinha e Cadeirinha Pesado, para alinhamento preciso e confiável.',
    en: 'MARCANTI Pole Line spacers: Closed Circular, Open Circular, Chair and Heavy Chair, for precise and reliable alignment.',
    es: 'Espaciadores Línea Postes MARCANTI: Circular Cerrado, Circular Abierto, Silla y Silla Pesada, para una alineación precisa y confiable.',
  },
  body(lang) {
    const intro = { pt: 'Os espaçadores de linha da MARCANTI são a escolha ideal para a construção civil, proporcionando um alinhamento preciso e confiável, garantindo a qualidade e segurança das suas instalações.', en: 'MARCANTI’s line spacers are the ideal choice for civil construction, providing precise and reliable alignment, ensuring the quality and safety of your installations.', es: 'Los espaciadores de línea de MARCANTI son la opción ideal para la construcción civil, proporcionando una alineación precisa y confiable, garantizando la calidad y seguridad de tus instalaciones.' }[lang];
    const title = { pt: 'Linha Postes', en: 'Pole Line', es: 'Línea Postes' }[lang];
    const cards = [
      { href: T.url(lang, 'espacadores/linha-postes/circular-fechado-linha-postes'), img: 'Espacador-circular-fechado-1.jpg', title: { pt: 'Circular Fechado', en: 'Closed Circular', es: 'Circular Cerrado' }[lang] },
      { href: T.url(lang, 'espacadores/linha-postes/circular-aberto-linha-postes'), img: 'FOTO04.jpg', title: { pt: 'Circular Aberto', en: 'Open Circular', es: 'Circular Abierto' }[lang] },
      { href: T.url(lang, 'espacadores/linha-postes/cadeirinha-linha-postes'), img: 'Cadeirinha.jpg', title: { pt: 'Cadeirinha', en: 'Chair Spacer', es: 'Separador Silla' }[lang] },
      { href: T.url(lang, 'espacadores/cadeirinha-pesada'), img: 'WhatsApp-Image-2026-032-30-at-10.26s.18-1-2.jpeg', title: { pt: 'Cadeirinha Pesado', en: 'Heavy Chair Spacer', es: 'Separador Silla Pesada' }[lang] },
    ].map((c) => ({ ...c, linkLabel: ui.viewProduct[lang] }));
    return `
${T.pageHero({ title, subtitle: intro, tag: 'h3', bg: 'Quem-Somos.jpg', warm: true, divider: true })}
<section><div class="container">${T.crumbs(lang, [{ label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' }, { label: title }])}</div></section>
${T.cardGrid({ cards, cols: 4 })}
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

// =================== LINHA CONSTRUÇÃO HUB ===================
const linhaConstrucaoHub = {
  slug: 'espacadores/linha-construcao',
  title: { pt: 'Linha Construção – Marcanti', en: 'Construction Line – Marcanti', es: 'Línea Construcción – Marcanti' },
  description: {
    pt: 'Espaçadores Linha Construção MARCANTI: Multiapoio, Circular Aberto, Cadeirinha e Cadeirinha Pesado, para alinhamento preciso e confiável.',
    en: 'MARCANTI Construction Line spacers: Multi-Support, Open Circular, Chair and Heavy Chair, for precise and reliable alignment.',
    es: 'Espaciadores Línea Construcción MARCANTI: Multiapoyo, Circular Abierto, Silla y Silla Pesada, para una alineación precisa y confiable.',
  },
  body(lang) {
    const intro = { pt: 'Os espaçadores de linha da MARCANTI são a escolha ideal para a construção civil, proporcionando um alinhamento preciso e confiável, garantindo a qualidade e segurança das suas instalações.', en: 'MARCANTI’s line spacers are the ideal choice for civil construction, providing precise and reliable alignment, ensuring the quality and safety of your installations.', es: 'Los espaciadores de línea de MARCANTI son la opción ideal para la construcción civil, proporcionando una alineación precisa y confiable, garantizando la calidad y seguridad de tus instalaciones.' }[lang];
    const title = { pt: 'Linha Construção', en: 'Construction Line', es: 'Línea Construcción' }[lang];
    const cards = [
      { href: T.url(lang, 'espacadores/linha-construcao/espacadores-multiapoio-linha-construcao'), img: 'Foto01-1.jpg', title: { pt: 'Espaçadores Multiapoio', en: 'Multi-Support Spacer', es: 'Separador Multiapoyo' }[lang] },
      { href: T.url(lang, 'espacadores/linha-construcao/circular-aberto-linha-construcao'), img: 'FOTO04.jpg', title: { pt: 'Circular Aberto', en: 'Open Circular', es: 'Circular Abierto' }[lang] },
      { href: T.url(lang, 'espacadores/linha-construcao/cadeirinha-linha-construcao'), img: 'Cadeirinha.jpg', title: { pt: 'Cadeirinha', en: 'Chair Spacer', es: 'Separador Silla' }[lang] },
      { href: T.url(lang, 'espacadores/cadeirinha-pesada'), img: 'WhatsApp-Image-2026-032-30-at-10.26s.18-1-4.jpeg', title: { pt: 'Cadeirinha Pesado', en: 'Heavy Chair Spacer', es: 'Separador Silla Pesada' }[lang] },
    ].map((c) => ({ ...c, linkLabel: ui.viewProduct[lang] }));
    return `
${T.pageHero({ title, subtitle: intro, tag: 'h3', bg: 'Quem-Somos.jpg', warm: true, divider: true })}
<section><div class="container">${T.crumbs(lang, [{ label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' }, { label: title }])}</div></section>
${T.cardGrid({ cards, cols: 4 })}
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

// =================== PRODUCT: Cadeirinha (shared text, 2 pages: postes + construcao) ===================
function makeCadeirinha(line) {
  const isPostes = line === 'postes';
  const parentSlug = isPostes ? 'espacadores/linha-postes' : 'espacadores/linha-construcao';
  const parentLabel = { pt: isPostes ? 'Linha Postes' : 'Linha Construção', en: isPostes ? 'Pole Line' : 'Construction Line', es: isPostes ? 'Línea Postes' : 'Línea Construcción' };
  const h3 = { pt: 'Cadeirinha', en: 'Chair Spacer', es: 'Separador Silla' };
  const about = {
    pt: ['Espaçadores tipo “cadeirinha” foram projetados para dar maior estabilidade das armaduras na horizontal. O produto é indicado para utilização de fundos de vigas, lajes, postes e pré moldados.'],
    en: ['“Chair” type spacers are designed to provide greater stability for horizontal reinforcement. The product is suitable for use at the base of beams, slabs, poles and precast elements.'],
    es: ['Los espaciadores tipo “silla” fueron diseñados para dar mayor estabilidad a las armaduras en posición horizontal. El producto está indicado para el fondo de vigas, losas, postes y prefabricados.'],
  };
  const sizesP = {
    pt: ['Cada modelo possui dois tamanhos de cobrimento “A” e “B”, conforme a sua necessidade.', 'Pode ser utilizado em ferragens de várias bitolas, até 12,5mm.'],
    en: ['Each model has two cover sizes, “A” and “B”, according to your needs.', 'It can be used with rebar of various gauges, up to 12.5mm.'],
    es: ['Cada modelo tiene dos tamaños de recubrimiento “A” y “B”, según tu necesidad.', 'Puede utilizarse en varillas de diferentes calibres, hasta 12,5 mm.'],
  };
  return {
    ...productShell({
      slug: `${parentSlug}/cadeirinha-linha-${line}`,
      crumbItems: (lang) => [
        { label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' },
        { label: parentLabel[lang], slug: parentSlug },
        { label: h3[lang] },
      ],
      eyebrow: lineLabel[line],
      h3,
      intro: genericIntro,
      sections: [
        aboutSection({ img: 'Design-sem-nome-cadeirinha.jpg', paragraphs: about }),
        fitSection({ images: ['D_NQ_NP_995317-MLB27759536075_072018-O-1.webp', 'Aplicacao-Cadeirinha.jpg'] }),
        sizesSection({ paragraphs: sizesP, img: 'Title.png' }),
      ],
    }),
    title: {
      pt: `Cadeirinha Linha ${isPostes ? 'Postes' : 'Construção'} – Marcanti`,
      en: `Chair Spacer – ${isPostes ? 'Pole' : 'Construction'} Line – Marcanti`,
      es: `Separador Silla – Línea ${isPostes ? 'Postes' : 'Construcción'} – Marcanti`,
    },
    description: {
      pt: 'Espaçador tipo cadeirinha MARCANTI: maior estabilidade das armaduras na horizontal, indicado para vigas, lajes, postes e pré-moldados.',
      en: 'MARCANTI chair-type spacer: greater stability for horizontal reinforcement, suitable for beams, slabs, poles and precast elements.',
      es: 'Separador tipo silla MARCANTI: mayor estabilidad de las armaduras en horizontal, indicado para vigas, losas, postes y prefabricados.',
    },
  };
}

// =================== PRODUCT: Circular Aberto (shared text, 2 pages) ===================
function makeCircularAberto(line) {
  const isPostes = line === 'postes';
  const parentSlug = isPostes ? 'espacadores/linha-postes' : 'espacadores/linha-construcao';
  const parentLabel = { pt: isPostes ? 'Linha Postes' : 'Linha Construção', en: isPostes ? 'Pole Line' : 'Construction Line', es: isPostes ? 'Línea Postes' : 'Línea Construcción' };
  const h3 = { pt: 'Espaçador Circular Aberto', en: 'Open Circular Spacer', es: 'Separador Circular Abierto' };
  const intro = {
    pt: 'Os espaçadores circulares abertos da MARCANTI são projetados para garantir um espaçamento uniforme e seguro entre armaduras, facilitando o processo de construção e garantindo a qualidade e durabilidade das estruturas.',
    en: 'MARCANTI’s open circular spacers are designed to ensure uniform and safe spacing between reinforcement bars, easing the construction process and ensuring the quality and durability of the structures.',
    es: 'Los espaciadores circulares abiertos de MARCANTI están diseñados para garantizar un espaciamiento uniforme y seguro entre armaduras, facilitando el proceso de construcción y garantizando la calidad y durabilidad de las estructuras.',
  };
  const about = {
    pt: ['Foi projetado para centralizar e cobrir a Armação da Ferragem/Armadura e a face de concreto em construções, com um encaixe específico para garantir o alojamento e fixação perfeita da armação. É indicado para colunas, laterais de vigas, cortina de contenção, poste e pré moldados de concreto.'],
    en: ['It is designed to center and cover the reinforcement and the concrete face in constructions, with a specific fitting to ensure the perfect housing and fixing of the reinforcement. It is suitable for columns, beam sides, retaining walls, poles and precast concrete elements.'],
    es: ['Está diseñado para centrar y cubrir la armadura y la cara de concreto en construcciones, con un encaje específico para garantizar el alojamiento y la fijación perfecta de la armadura. Está indicado para columnas, laterales de vigas, muros de contención, postes y prefabricados de concreto.'],
  };
  const sizesP = {
    pt: ['O comprimento total de uma peça dessas está representado pela letra “A”. Já a letra “B” é a dimensão do cobrimento de concreto.'],
    en: ['The total length of one of these pieces is represented by the letter “A”. The letter “B” is the concrete cover dimension.'],
    es: ['El largo total de una de estas piezas está representado por la letra “A”. La letra “B” es la dimensión del recubrimiento de concreto.'],
  };
  return {
    ...productShell({
      slug: `${parentSlug}/circular-aberto-linha-${line}`,
      crumbItems: (lang) => [
        { label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' },
        { label: parentLabel[lang], slug: parentSlug },
        { label: h3[lang] },
      ],
      eyebrow: lineLabel[line],
      h3,
      intro,
      sections: [
        aboutSection({ img: 'FOTO04.jpg', paragraphs: about }),
        fitSection({ images: ['Encaixe-Circula-01.jpg', 'Encaixe-Circula-02.jpg', 'Encaixe-Circula-03.jpg'] }),
        sizesSection({ paragraphs: sizesP, img: 'Title-2.png' }),
      ],
    }),
    title: {
      pt: `Circular Aberto Linha ${isPostes ? 'Postes' : 'Construção'} – Marcanti`,
      en: `Open Circular Spacer – ${isPostes ? 'Pole' : 'Construction'} Line – Marcanti`,
      es: `Separador Circular Abierto – Línea ${isPostes ? 'Postes' : 'Construcción'} – Marcanti`,
    },
    description: {
      pt: 'Espaçador Circular Aberto MARCANTI: espaçamento uniforme e seguro entre armaduras, para colunas, vigas, cortinas de contenção e pré-moldados.',
      en: 'MARCANTI Open Circular Spacer: uniform and safe spacing between reinforcement bars, for columns, beams, retaining walls and precast elements.',
      es: 'Separador Circular Abierto MARCANTI: espaciamiento uniforme y seguro entre armaduras, para columnas, vigas, muros de contención y prefabricados.',
    },
  };
}

// =================== PRODUCT: Circular Fechado (Linha Postes only — 2 variants on one page) ===================
const circularFechadoPostes = (() => {
  const parentSlug = 'espacadores/linha-postes';
  const h3a = { pt: 'Espaçador Circular Fechado', en: 'Closed Circular Spacer', es: 'Separador Circular Cerrado' };
  const h3b = { pt: 'Espaçador Circular Fechado Ferro Duplo', en: 'Closed Circular Spacer – Double Rebar', es: 'Separador Circular Cerrado Hierro Doble' };
  const aboutA = {
    pt: ['Foi projetado para centralizar e garantir o cobrimento correto da Armação da Ferragem/Armadura e a face de concreto em construções. É indicado para postes e estacas de concreto pré fabricado.'],
    en: ['It is designed to center and ensure proper cover of the reinforcement and the concrete face in constructions. It is suitable for precast concrete poles and piles.'],
    es: ['Está diseñado para centrar y garantizar el recubrimiento correcto de la armadura y la cara de concreto en construcciones. Está indicado para postes y pilotes de concreto prefabricado.'],
  };
  const aboutB = {
    pt: ['Foi projetado para centralizar e garantir o cobrimento correto de postes e estacas de concreto. É indicado para postes e estacas de concreto pré fabricado.'],
    en: ['It is designed to center and ensure proper cover for concrete poles and piles. It is suitable for precast concrete poles and piles.'],
    es: ['Está diseñado para centrar y garantizar el recubrimiento correcto de postes y pilotes de concreto. Está indicado para postes y pilotes de concreto prefabricado.'],
  };
  const sizesP = {
    pt: ['O comprimento total de uma peça dessas está representado pela letra “A”. Já a letra “B” é a dimensão do cobrimento de concreto.'],
    en: ['The total length of one of these pieces is represented by the letter “A”. The letter “B” is the concrete cover dimension.'],
    es: ['El largo total de una de estas piezas está representado por la letra “A”. La letra “B” es la dimensión del recubrimiento de concreto.'],
  };
  return {
    slug: `${parentSlug}/circular-fechado-linha-postes`,
    title: { pt: 'Circular Fechado Linha Postes – Marcanti', en: 'Closed Circular Spacer – Pole Line – Marcanti', es: 'Separador Circular Cerrado – Línea Postes – Marcanti' },
    description: {
      pt: 'Espaçador Circular Fechado MARCANTI (simples e ferro duplo): centraliza e garante o cobrimento correto em postes e estacas de concreto pré-fabricado.',
      en: 'MARCANTI Closed Circular Spacer (single and double rebar): centers and ensures proper cover for precast concrete poles and piles.',
      es: 'Separador Circular Cerrado MARCANTI (simple y hierro doble): centra y garantiza el recubrimiento correcto en postes y pilotes de concreto prefabricado.',
    },
    body(lang) {
      const crumbs = T.crumbs(lang, [
        { label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' },
        { label: { pt: 'Linha Postes', en: 'Pole Line', es: 'Línea Postes' }[lang], slug: parentSlug },
        { label: h3a[lang] },
      ]);
      return `
${T.pageHero({ eyebrow: lineLabel.postes[lang], title: h3a[lang], subtitle: genericIntro[lang], bg: 'Quem-Somos.jpg', tag: 'h3', warm: true, divider: true })}
<section><div class="container">${crumbs}
  ${T.splitSection({ title: ui.aboutProduct[lang], paragraphs: aboutA[lang], img: 'Design-sem-nome-circular-fechado.png' })}
  <div class="section-tight">${T.galleryGrid({ title: ui.fitSystem[lang], subtitle: fitSystemText[lang], images: ['WhatsApp-Image-2023-08-18-at-13.37.14.jpeg', '9474da9844790fd15981a02f7a35cf16.jpg'] })}</div>
  <div class="section-tight"><h2>${ui.availableSizes[lang]}</h2><div class="split"><div>${T.infoBox(sizesP[lang])}</div><div><img src="${T.asset('img/Title-1.png')}" alt="" loading="lazy" style="border-radius:8px;"></div></div></div>
</div></section>
${T.pageHero({ eyebrow: lineLabel.postes[lang], title: h3b[lang], subtitle: genericIntro[lang], bg: 'Quem-Somos.jpg', tag: 'h3', warm: true, divider: true })}
<section><div class="container">
    ${T.splitSection({ title: ui.aboutProduct[lang], paragraphs: aboutB[lang], img: '4538d41e-933d-4118-89de-2b10e4e9f96a.png' })}
    <div class="section-tight"><h2>${ui.availableSizes[lang]}</h2><div class="split"><div>${T.infoBox(sizesP[lang])}</div><div><img src="${T.asset('img/WhatsApp-Image-2026-03-31-at-10.29.36-1024x739.jpeg')}" alt="" loading="lazy" style="border-radius:8px;"></div></div></div>
</div></section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
    },
  };
})();

// =================== PRODUCT: Espaçadores Multiapoio (Linha Construção only) ===================
const multiapoioConstrucao = (() => {
  const parentSlug = 'espacadores/linha-construcao';
  const h3 = { pt: 'Espaçadores MultiApoio', en: 'Multi-Support Spacer', es: 'Separador Multiapoyo' };
  const about = {
    pt: ['Os espaçadores multiapoio, do modelo “centopéia”, são indicados na aplicação em fundos de vigas, lajes, pisos e blocos de fundações.', 'Foi projetado para distanciar a Armação da Ferragem/Armadura e a face de concreto em construções.'],
    en: ['Multi-support spacers, in the “centipede” style, are suitable for use at the base of beams, slabs, floors and foundation blocks.', 'It is designed to keep the reinforcement at the correct distance from the concrete face in constructions.'],
    es: ['Los separadores multiapoyo, de modelo “ciempiés”, están indicados para el fondo de vigas, losas, pisos y bloques de cimentación.', 'Está diseñado para distanciar la armadura de la cara de concreto en las construcciones.'],
  };
  const sizesP = {
    pt: ['A única medida que muda de um modelo pro outro é a altura do espaçador, representado pela letra “A”. O comprimento (120mm) e a largura (40mm) se mantém iguais em todos os modelos.'],
    en: ['The only measurement that changes from one model to another is the spacer height, represented by the letter “A”. The length (120mm) and width (40mm) remain the same across all models.'],
    es: ['La única medida que cambia de un modelo a otro es la altura del separador, representada por la letra “A”. El largo (120 mm) y el ancho (40 mm) se mantienen iguales en todos los modelos.'],
  };
  return {
    ...productShell({
      slug: `${parentSlug}/espacadores-multiapoio-linha-construcao`,
      crumbItems: (lang) => [
        { label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' },
        { label: { pt: 'Linha Construção', en: 'Construction Line', es: 'Línea Construcción' }[lang], slug: parentSlug },
        { label: h3[lang] },
      ],
      eyebrow: lineLabel.construcao,
      h3,
      intro: genericIntro,
      sections: [
        aboutSection({ img: 'Foto01-1.jpg', paragraphs: about }),
        fitSection({ images: ['Sistema-de-enxaixe-01.jpg', 'Sistema-de-enxaixe-02.jpg', 'Aplicacao-01-1.jpg', 'Aplicacao-02-1.jpg', 'Aplicacao-03-1.jpg'] }),
        sizesSection({ paragraphs: sizesP, img: 'Title-3.png' }),
      ],
    }),
    title: { pt: 'Espaçadores Multiapoio Linha Construção – Marcanti', en: 'Multi-Support Spacer – Construction Line – Marcanti', es: 'Separador Multiapoyo – Línea Construcción – Marcanti' },
    description: {
      pt: 'Espaçador Multiapoio MARCANTI, modelo centopéia, indicado para fundos de vigas, lajes, pisos e blocos de fundação.',
      en: 'MARCANTI Multi-Support Spacer, centipede style, suitable for the base of beams, slabs, floors and foundation blocks.',
      es: 'Separador Multiapoyo MARCANTI, modelo ciempiés, indicado para el fondo de vigas, losas, pisos y bloques de cimentación.',
    },
  };
})();

// =================== PRODUCT: Cadeirinha Pesado (shared by both lines) ===================
const cadeirinhaPesada = (() => {
  const h3 = { pt: 'Cadeirinha Pesado', en: 'Heavy Chair Spacer', es: 'Separador Silla Pesada' };
  const about = {
    pt: ['Indicado para armaduras horizontais pesadas: lajes, fundo de vigas, fundação (sapatas e blocos) e pré-moldados. Por ser reforçado, esse modelo suporta aços de bitolas maiores do que o “Cadeirinha Leve”.'],
    en: ['Designed for heavy horizontal reinforcement: slabs, beam soffits, foundations (footings and pile caps) and precast elements. Being reinforced, this model supports larger rebar gauges than the “Light Chair” model.'],
    es: ['Indicado para armaduras horizontales pesadas: losas, fondo de vigas, cimentación (zapatas y bloques) y prefabricados. Por ser reforzado, este modelo soporta varillas de mayor calibre que el modelo “Silla Liviana”.'],
  };
  const sizesP = {
    pt: ['Cada modelo possui dois tamanhos de cobrimento “A” e “B”, conforme a sua necessidade.', 'Pode ser utilizado em ferragens de várias bitolas.'],
    en: ['Each model has two cover sizes, “A” and “B”, according to your needs.', 'It can be used with rebar of various gauges.'],
    es: ['Cada modelo tiene dos tamaños de recubrimiento “A” y “B”, según tu necesidad.', 'Puede utilizarse en varillas de diferentes calibres.'],
  };
  return {
    ...productShell({
      slug: 'espacadores/cadeirinha-pesada',
      crumbItems: (lang) => [
        { label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' },
        { label: h3[lang] },
      ],
      eyebrow: { pt: '', en: '', es: '' },
      h3,
      intro: genericIntro,
      sections: [
        aboutSection({ img: 'WhatsApp-Image-2026-032-30-at-10.26s.18-1-3.jpeg', paragraphs: about }),
        fitSection({ images: ['D_NQ_NP_995317-MLB27759536075_072018-O-1.webp', 'Aplicacao-Cadeirinha.jpg'] }),
        sizesSection({ paragraphs: sizesP, img: 'WhatsApp-Image-2026-03-31-at-09.30.20.jpeg' }),
      ],
    }),
    title: { pt: 'Cadeirinha Pesado – Marcanti', en: 'Heavy Chair Spacer – Marcanti', es: 'Separador Silla Pesada – Marcanti' },
    description: {
      pt: 'Espaçador Cadeirinha Pesado MARCANTI: reforçado para armaduras horizontais pesadas, indicado para lajes, vigas, fundações e pré-moldados.',
      en: 'MARCANTI Heavy Chair Spacer: reinforced for heavy horizontal reinforcement, suitable for slabs, beams, foundations and precast elements.',
      es: 'Separador Silla Pesada MARCANTI: reforzado para armaduras horizontales pesadas, indicado para losas, vigas, cimentaciones y prefabricados.',
    },
  };
})();

module.exports = [
  hub,
  linhaPostesHub,
  linhaConstrucaoHub,
  makeCadeirinha('postes'),
  makeCadeirinha('construcao'),
  makeCircularAberto('postes'),
  makeCircularAberto('construcao'),
  circularFechadoPostes,
  multiapoioConstrucao,
  cadeirinhaPesada,
];
