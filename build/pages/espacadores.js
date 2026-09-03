'use strict';
const T = require('../templates');
const { ui } = require('../data/site');
const SPEC = require('../data/spec-tables');

const dimDiagramAlt = {
  pt: 'Desenho técnico do espaçador com as cotas de dimensão (A, B, C…) indicadas',
  en: 'Technical drawing of the spacer with the dimension callouts (A, B, C…) marked',
  es: 'Dibujo técnico del separador con las cotas de dimensión (A, B, C…) indicadas',
};

// Cada produto abre com o texto do próprio produto. Antes, cinco páginas
// (cadeirinha nas duas linhas, circular fechado nas duas variantes e cadeirinha
// pesado) abriam com o texto do multiapoio — auditoria 4.5.
const introCadeirinha = {
  pt: 'O espaçador cadeirinha sustenta a armadura horizontal na altura de cobrimento definida em projeto. Os quatro pés distribuem a carga sobre a fôrma e o encaixe superior trava o vergalhão, mantendo a barra na posição durante a concretagem.',
  en: 'The chair spacer holds horizontal reinforcement at the concrete cover set in the design. Its four feet spread the load over the formwork and the top clip locks the rebar, keeping the bar in position while the concrete is poured.',
  es: 'El separador silla sostiene la armadura horizontal a la altura de recubrimiento definida en el proyecto. Las cuatro patas distribuyen la carga sobre el encofrado y el encaje superior traba la varilla durante el vaciado.',
};
const introCadeirinhaPesado = {
  pt: 'Cadeirinha reforçada para armadura horizontal pesada. Suporta bitolas maiores que a cadeirinha comum e mantém o cobrimento em laje espessa, sapata e bloco de fundação, onde a carga sobre o espaçador é maior.',
  en: 'Reinforced chair spacer for heavy horizontal reinforcement. It takes larger rebar gauges than the standard chair and holds the cover in thick slabs, footings and pile caps, where the load on the spacer is higher.',
  es: 'Silla reforzada para armadura horizontal pesada. Soporta calibres mayores que la silla común y mantiene el recubrimiento en losa gruesa, zapata y bloque de cimentación, donde la carga sobre el separador es mayor.',
};
const introCircularFechado = {
  pt: 'O espaçador circular fechado envolve o vergalhão por inteiro e garante o cobrimento em todas as direções. Indicado para postes e estacas de concreto pré-fabricado, onde a peça é concretada em fôrma fechada.',
  en: 'The closed circular spacer wraps the rebar completely and holds the cover in every direction. Suitable for precast concrete poles and piles, where the part is cast in a closed mould.',
  es: 'El separador circular cerrado envuelve por completo la varilla y garantiza el recubrimiento en todas las direcciones. Indicado para postes y pilotes de concreto prefabricado, colados en encofrado cerrado.',
};
const introCircularFechadoDuplo = {
  pt: 'Versão com alojamento central maior, para armadura com duas barras no mesmo ponto. Mesma aplicação em postes e estacas pré-fabricados.',
  en: 'Version with a larger central housing, for reinforcement with two bars at the same point. Same application in precast poles and piles.',
  es: 'Versión con alojamiento central mayor, para armadura con dos barras en el mismo punto. Misma aplicación en postes y pilotes prefabricados.',
};
const introMultiapoio = {
  pt: 'O espaçador multiapoio, modelo centopeia, apoia a armadura horizontal em vários pontos ao longo de 120 mm. Distribui a carga e reduz o número de peças por metro em fundo de viga, laje, piso e bloco de fundação.',
  en: 'The multi-support spacer, in the centipede style, holds horizontal reinforcement at several points along 120 mm. It spreads the load and cuts the number of pieces per metre in beam soffits, slabs, floors and foundation blocks.',
  es: 'El separador multiapoyo, modelo ciempiés, apoya la armadura horizontal en varios puntos a lo largo de 120 mm. Distribuye la carga y reduce la cantidad de piezas por metro en fondo de viga, losa, piso y bloque de cimentación.',
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

const productCategory = { pt: 'Espaçador para armadura de concreto', en: 'Spacer for concrete reinforcement', es: 'Separador para armadura de concreto' };
const productMaterial = { pt: 'Plástico injetado', en: 'Injection-molded plastic', es: 'Plástico inyectado' };

function productShell({ slug, crumbItems, eyebrow, h3, intro, sections, extraSections = [], schemaImage }) {
  return {
    slug,
    title: null, // set by caller
    description: null,
    body(lang, meta) {
      return `
${meta ? T.productLd({ lang, meta, name: h3[lang], image: schemaImage, category: productCategory[lang], material: productMaterial[lang] }) : ''}
${T.pageHero({ eyebrow: eyebrow[lang], title: h3[lang], subtitle: intro[lang], bg: 'Quem-Somos.jpg', tag: 'h1', warm: true, divider: true })}
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

function aboutSection({ img, imgAlt, paragraphs }) {
  return (lang) => T.splitSection({ title: ui.aboutProduct[lang], paragraphs: paragraphs[lang], img, imgAlt: imgAlt && imgAlt[lang] });
}
function fitSection({ images, alt }) {
  return (lang) => `<div class="section-tight">${T.galleryGrid({ title: ui.fitSystem[lang], subtitle: fitSystemText[lang], images, alt: alt && alt[lang] })}</div>`;
}
function renderSizes(lang, { paragraphs, img, table }) {
  return `<div class="section-tight">
    <h2>${ui.availableSizes[lang]}</h2>
    <div class="split">
      <div>${T.infoBox(paragraphs[lang])}</div>
      ${img ? `<div>${T.renderImg(img, dimDiagramAlt[lang], { style: 'border-radius:8px;' })}</div>` : ''}
    </div>
    ${table ? T.specTable(table, lang) : ''}
  </div>`;
}
function sizesSection({ paragraphs, img, table }) {
  return (lang) => renderSizes(lang, { paragraphs, img, table });
}

// =================== ESPAÇADORES HUB ===================
const hub = {
  slug: 'espacadores',
  title: { pt: 'Espaçadores Plásticos para Armadura | Marcanti', en: 'Plastic Spacers for Rebar | Marcanti', es: 'Espaciadores Plásticos para Armadura | Marcanti' },
  description: {
    pt: 'Espaçadores para cobrimento de armadura: circular, cadeirinha e multiapoio. De 15 a 50 mm, bitolas de 4,2 a 25 mm. Veja a linha.',
    en: 'Spacers for concrete cover: circular, chair and multi-support. From 15 to 50 mm, rebar from 4.2 to 25 mm. See the full range.',
    es: 'Espaciadores para recubrimiento de armadura: circular, silla y multiapoyo. De 15 a 50 mm, varillas de 4,2 a 25 mm. Ver la línea.',
  },
  body(lang) {
    const c = {
      pt: {
        eyebrow: 'Espaçadores',
        intro: [
          'Espaçador é a peça que garante o cobrimento — a distância entre a armadura e a face externa do concreto — definido em projeto. Também chamados de distanciadores, cobrem armadura vertical e horizontal, obra convencional e pré-moldado, com cobrimentos de 15 a 50 mm.',
          'A linha se divide em duas: Linha Construção, para lajes, vigas, pilares e fundações; e Linha Postes, para postes, estacas e demais pré-moldados.',
        ],
        chooseTitle: 'Como escolher o modelo',
      },
      en: {
        eyebrow: 'Spacers',
        intro: [
          'A spacer is the part that holds the concrete cover — the distance between the reinforcement and the outer face of the concrete — set in the design. Our range covers vertical and horizontal reinforcement, cast-in-place and precast, with covers from 15 to 50 mm.',
          'The range splits in two: the Construction Line, for slabs, beams, columns and foundations; and the Pole Line, for poles, piles and other precast parts.',
        ],
        chooseTitle: 'How to choose the model',
      },
      es: {
        eyebrow: 'Espaciadores',
        intro: [
          'El espaciador es la pieza que garantiza el recubrimiento — la distancia entre la armadura y la cara externa del concreto — definido en el proyecto. También llamados distanciadores, cubren armadura vertical y horizontal, obra convencional y prefabricado, con recubrimientos de 15 a 50 mm.',
          'La línea se divide en dos: Línea Construcción, para losas, vigas, pilares y cimentaciones; y Línea Postes, para postes, pilotes y demás prefabricados.',
        ],
        chooseTitle: 'Cómo elegir el modelo',
      },
    }[lang];
    const cards = [
      { href: T.url(lang, 'espacadores/linha-postes'), img: 'FOTO04.jpg', title: { pt: 'Linha Postes', en: 'Pole Line', es: 'Línea Postes' }[lang] },
      { href: T.url(lang, 'espacadores/linha-construcao'), img: 'Foto01-1.jpg', title: { pt: 'Linha Construção', en: 'Construction Line', es: 'Línea Construcción' }[lang] },
    ].map((c2) => ({ ...c2, linkLabel: ui.viewProduct[lang] }));
    return `
${T.pageHero({ title: c.eyebrow, subtitle: c.intro, bg: 'Quem-Somos.jpg', tag: 'h1', divider: true, warm: true })}
${T.cardGrid({ cards, cols: 2 })}
<section class="bg-light">
  <div class="container">
    <h2>${c.chooseTitle}</h2>
    ${T.specTable(SPEC.comoEscolher, lang)}
  </div>
</section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

// =================== LINHA POSTES HUB ===================
const linhaPostesHub = {
  slug: 'espacadores/linha-postes',
  title: { pt: 'Espaçadores para Postes e Pré-Moldados | Marcanti', en: 'Spacers for Poles and Precast | Marcanti', es: 'Espaciadores para Postes y Prefabricados | Marcanti' },
  description: {
    pt: 'Circular aberto, circular fechado e cadeirinha para postes, estacas e peças de concreto pré-moldado. Fabricante na Bahia.',
    en: 'Open circular, closed circular and chair spacers for poles, piles and precast concrete parts. Manufacturer in Bahia.',
    es: 'Circular abierto, circular cerrado y silla para postes, pilotes y piezas de concreto prefabricado. Fabricante en Bahía.',
  },
  body(lang) {
    const intro = {
      pt: 'A Linha Postes atende postes, estacas e demais peças de concreto pré-moldado: circular aberto e fechado para a armadura vertical, cadeirinha para a horizontal. Cobrimentos de 15 a 40 mm.',
      en: 'The Pole Line covers poles, piles and other precast concrete parts: open and closed circular for vertical reinforcement, chair for horizontal. Covers from 15 to 40 mm.',
      es: 'La Línea Postes atiende postes, pilotes y demás piezas de concreto prefabricado: circular abierto y cerrado para la armadura vertical, silla para la horizontal. Recubrimientos de 15 a 40 mm.',
    }[lang];
    const title = { pt: 'Linha Postes', en: 'Pole Line', es: 'Línea Postes' }[lang];
    const cards = [
      { href: T.url(lang, 'espacadores/linha-postes/circular-fechado-linha-postes'), img: 'Espacador-circular-fechado-1.jpg', title: { pt: 'Circular Fechado', en: 'Closed Circular', es: 'Circular Cerrado' }[lang] },
      { href: T.url(lang, 'espacadores/linha-postes/circular-aberto-linha-postes'), img: 'FOTO04.jpg', title: { pt: 'Circular Aberto', en: 'Open Circular', es: 'Circular Abierto' }[lang] },
      { href: T.url(lang, 'espacadores/linha-postes/cadeirinha-linha-postes'), img: 'Cadeirinha.jpg', title: { pt: 'Cadeirinha', en: 'Chair Spacer', es: 'Separador Silla' }[lang] },
      { href: T.url(lang, 'espacadores/cadeirinha-pesada'), img: 'WhatsApp-Image-2026-032-30-at-10.26s.18-1-2.jpeg', title: { pt: 'Cadeirinha Pesado', en: 'Heavy Chair Spacer', es: 'Separador Silla Pesada' }[lang] },
    ].map((c) => ({ ...c, linkLabel: ui.viewProduct[lang] }));
    return `
${T.pageHero({ title, subtitle: intro, tag: 'h1', bg: 'Quem-Somos.jpg', warm: true, divider: true })}
<section><div class="container">${T.crumbs(lang, [{ label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' }, { label: title }])}</div></section>
${T.cardGrid({ cards, cols: 4 })}
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

// =================== LINHA CONSTRUÇÃO HUB ===================
const linhaConstrucaoHub = {
  slug: 'espacadores/linha-construcao',
  title: { pt: 'Espaçadores para Laje, Viga e Pilar | Marcanti', en: 'Spacers for Slab, Beam and Column | Marcanti', es: 'Espaciadores para Losa, Viga y Pilar | Marcanti' },
  description: {
    pt: 'Cadeirinha, circular aberto e multiapoio para fundo de viga, laje, pilar e fundação. Cobrimento de 15 a 50 mm. Direto da fábrica.',
    en: 'Chair, open circular and multi-support spacers for beam soffit, slab, column and foundation. Cover 15 to 50 mm. Direct from factory.',
    es: 'Silla, circular abierto y multiapoyo para fondo de viga, losa, pilar y cimentación. Recubrimiento de 15 a 50 mm. Directo de fábrica.',
  },
  body(lang) {
    const intro = {
      pt: 'A Linha Construção atende armadura vertical e horizontal em obra convencional: fundo de viga, laje, pilar, sapata, bloco de fundação e piso. Cobrimentos de 15 a 50 mm, compatíveis com bitolas de 4,2 mm a 25 mm.',
      en: 'The Construction Line covers vertical and horizontal reinforcement in cast-in-place work: beam soffit, slab, column, footing, pile cap and floor. Covers from 15 to 50 mm, for rebar from 4.2 mm to 25 mm.',
      es: 'La Línea Construcción atiende armadura vertical y horizontal en obra convencional: fondo de viga, losa, pilar, zapata, bloque de cimentación y piso. Recubrimientos de 15 a 50 mm, para varillas de 4,2 mm a 25 mm.',
    }[lang];
    const title = { pt: 'Linha Construção', en: 'Construction Line', es: 'Línea Construcción' }[lang];
    const cards = [
      { href: T.url(lang, 'espacadores/linha-construcao/espacadores-multiapoio-linha-construcao'), img: 'Foto01-1.jpg', title: { pt: 'Espaçadores Multiapoio', en: 'Multi-Support Spacer', es: 'Separador Multiapoyo' }[lang] },
      { href: T.url(lang, 'espacadores/linha-construcao/circular-aberto-linha-construcao'), img: 'FOTO04.jpg', title: { pt: 'Circular Aberto', en: 'Open Circular', es: 'Circular Abierto' }[lang] },
      { href: T.url(lang, 'espacadores/linha-construcao/cadeirinha-linha-construcao'), img: 'Cadeirinha.jpg', title: { pt: 'Cadeirinha', en: 'Chair Spacer', es: 'Separador Silla' }[lang] },
      { href: T.url(lang, 'espacadores/cadeirinha-pesada'), img: 'WhatsApp-Image-2026-032-30-at-10.26s.18-1-4.jpeg', title: { pt: 'Cadeirinha Pesado', en: 'Heavy Chair Spacer', es: 'Separador Silla Pesada' }[lang] },
    ].map((c) => ({ ...c, linkLabel: ui.viewProduct[lang] }));
    return `
${T.pageHero({ title, subtitle: intro, tag: 'h1', bg: 'Quem-Somos.jpg', warm: true, divider: true })}
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
      intro: introCadeirinha,
      schemaImage: 'Design-sem-nome-cadeirinha.jpg',
      sections: [
        aboutSection({
          img: 'Design-sem-nome-cadeirinha.jpg',
          imgAlt: { pt: 'Espaçador plástico tipo cadeirinha da Marcanti', en: 'MARCANTI plastic chair-type spacer', es: 'Separador plástico tipo silla de MARCANTI' },
          paragraphs: about,
        }),
        fitSection({
          images: ['D_NQ_NP_995317-MLB27759536075_072018-O-1.webp', 'Aplicacao-Cadeirinha.jpg'],
          alt: { pt: 'Espaçador cadeirinha sustentando a armadura horizontal', en: 'Chair spacer supporting horizontal reinforcement', es: 'Separador silla sosteniendo la armadura horizontal' },
        }),
        sizesSection({ paragraphs: sizesP, img: 'Title.png', table: SPEC.cadeirinha }),
      ],
    }),
    // Title e description diferentes por linha: as duas páginas compartilham o
    // mesmo corpo, então sem isso o Google veria conteúdo praticamente duplicado.
    title: isPostes
      ? { pt: 'Espaçador Cadeirinha para Postes | Marcanti', en: 'Chair Spacer for Poles | Marcanti', es: 'Separador Silla para Postes | Marcanti' }
      : { pt: 'Espaçador Cadeirinha 15, 20 e 30 mm | Marcanti', en: 'Chair Spacer 15, 20 and 30 mm | Marcanti', es: 'Separador Silla 15, 20 y 30 mm | Marcanti' },
    description: isPostes
      ? {
        pt: 'Espaçador cadeirinha da Linha Postes, para armadura horizontal em postes e pré-moldados. Cobrimento 15, 20 e 30 mm, bitola até 16 mm.',
        en: 'Pole Line chair spacer for horizontal reinforcement in poles and precast parts. Cover 15, 20 and 30 mm, rebar up to 16 mm.',
        es: 'Separador silla de la Línea Postes, para armadura horizontal en postes y prefabricados. Recubrimiento 15, 20 y 30 mm, varilla hasta 16 mm.',
      }
      : {
        pt: 'Espaçador cadeirinha para laje e fundo de viga. Cobrimento 15, 20 e 30 mm, bitola até 16 mm. Veja as medidas e peça cotação.',
        en: 'Chair spacer for slabs and beam soffits. Cover 15, 20 and 30 mm, rebar up to 16 mm. See the measurements and request a quote.',
        es: 'Separador silla para losas y fondo de viga. Recubrimiento 15, 20 y 30 mm, varilla hasta 16 mm. Ver medidas y pedir cotización.',
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
      schemaImage: 'FOTO04.jpg',
      sections: [
        aboutSection({
          img: 'FOTO04.jpg',
          imgAlt: { pt: 'Espaçador plástico circular aberto da Marcanti', en: 'MARCANTI plastic open circular spacer', es: 'Separador plástico circular abierto de MARCANTI' },
          paragraphs: about,
        }),
        fitSection({
          images: ['Encaixe-Circula-01.jpg', 'Encaixe-Circula-02.jpg', 'Encaixe-Circula-03.jpg'],
          alt: { pt: 'Encaixe do espaçador circular aberto no vergalhão', en: 'Open circular spacer clipped onto the rebar', es: 'Encaje del separador circular abierto en la varilla' },
        }),
        sizesSection({ paragraphs: sizesP, img: 'Title-2.png', table: SPEC.circularAberto }),
      ],
    }),
    // Título e descrição por linha, pelo mesmo motivo da cadeirinha: as duas
    // páginas compartilham o corpo e não podem competir entre si na busca.
    title: isPostes
      ? { pt: 'Espaçador Circular Aberto para Postes | Marcanti', en: 'Open Circular Spacer for Poles | Marcanti', es: 'Separador Circular Abierto para Postes | Marcanti' }
      : { pt: 'Espaçador Circular Aberto EC 15 a EC 40 | Marcanti', en: 'Open Circular Spacer EC 15 to EC 40 | Marcanti', es: 'Separador Circular Abierto EC 15 a EC 40 | Marcanti' },
    description: isPostes
      ? {
        pt: 'Espaçador circular aberto da Linha Postes, para postes, estacas e cortina de contenção. Cobrimento 15 a 40 mm, bitola de 4,2 a 16 mm.',
        en: 'Pole Line open circular spacer for poles, piles and retaining walls. Cover 15 to 40 mm, rebar from 4.2 to 16 mm.',
        es: 'Separador circular abierto de la Línea Postes, para postes, pilotes y muros de contención. Recubrimiento 15 a 40 mm, varilla 4,2 a 16 mm.',
      }
      : {
        pt: 'Espaçador circular aberto para pilar e lateral de viga. Cobrimento 15 a 40 mm, bitola de 4,2 a 16 mm. Direto do fabricante.',
        en: 'Open circular spacer for columns and beam sides. Cover 15 to 40 mm, rebar from 4.2 to 16 mm. Direct from the manufacturer.',
        es: 'Separador circular abierto para pilar y lateral de viga. Recubrimiento 15 a 40 mm, varilla de 4,2 a 16 mm. Directo del fabricante.',
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
    title: { pt: 'Espaçador Circular Fechado para Postes | Marcanti', en: 'Closed Circular Spacer for Poles | Marcanti', es: 'Separador Circular Cerrado para Postes | Marcanti' },
    description: {
      pt: 'Espaçador circular fechado para postes e estacas de concreto pré-moldado. Cobrimento 15 e 20 mm, versões simples e ferro duplo.',
      en: 'Closed circular spacer for precast concrete poles and piles. Cover 15 and 20 mm, single and double rebar versions.',
      es: 'Separador circular cerrado para postes y pilotes de concreto prefabricado. Recubrimiento 15 y 20 mm, versiones simple y hierro doble.',
    },
    body(lang, meta) {
      const crumbs = T.crumbs(lang, [
        { label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang], slug: 'espacadores' },
        { label: { pt: 'Linha Postes', en: 'Pole Line', es: 'Línea Postes' }[lang], slug: parentSlug },
        { label: h3a[lang] },
      ]);
      return `
${meta ? T.productLd({ lang, meta, name: h3a[lang], image: 'Design-sem-nome-circular-fechado.png', category: productCategory[lang], material: productMaterial[lang] }) : ''}
${T.pageHero({ eyebrow: lineLabel.postes[lang], title: h3a[lang], subtitle: introCircularFechado[lang], bg: 'Quem-Somos.jpg', tag: 'h1', warm: true, divider: true })}
<section><div class="container">${crumbs}
  ${T.splitSection({ title: ui.aboutProduct[lang], paragraphs: aboutA[lang], img: 'Design-sem-nome-circular-fechado.png', imgAlt: { pt: 'Espaçador plástico circular fechado da Marcanti', en: 'MARCANTI plastic closed circular spacer', es: 'Separador plástico circular cerrado de MARCANTI' }[lang] })}
  <div class="section-tight">${T.galleryGrid({ title: ui.fitSystem[lang], subtitle: fitSystemText[lang], images: ['WhatsApp-Image-2023-08-18-at-13.37.14.jpeg', '9474da9844790fd15981a02f7a35cf16.jpg'], alt: { pt: 'Espaçador circular fechado montado na armadura de um poste', en: 'Closed circular spacer fitted on a pole reinforcement cage', es: 'Separador circular cerrado montado en la armadura de un poste' }[lang] })}</div>
  ${renderSizes(lang, { paragraphs: sizesP, img: 'Title-1.png', table: SPEC.circularFechado })}
</div></section>
${T.pageHero({ eyebrow: lineLabel.postes[lang], title: h3b[lang], subtitle: introCircularFechadoDuplo[lang], bg: 'Quem-Somos.jpg', tag: 'h2', warm: true, divider: true })}
<section><div class="container">
    ${T.splitSection({ title: ui.aboutProduct[lang], paragraphs: aboutB[lang], img: '4538d41e-933d-4118-89de-2b10e4e9f96a.png', imgAlt: { pt: 'Espaçador circular fechado para ferro duplo da Marcanti', en: 'MARCANTI closed circular spacer for double rebar', es: 'Separador circular cerrado para hierro doble de MARCANTI' }[lang] })}
    ${renderSizes(lang, { paragraphs: sizesP, img: 'WhatsApp-Image-2026-03-31-at-10.29.36-1024x739.jpeg', table: SPEC.circularFechadoFerroDuplo })}
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
      intro: introMultiapoio,
      schemaImage: 'Foto01-1.jpg',
      sections: [
        aboutSection({
          img: 'Foto01-1.jpg',
          imgAlt: { pt: 'Espaçador plástico multiapoio (modelo centopeia) da Marcanti', en: 'MARCANTI multi-support (centipede) plastic spacer', es: 'Separador plástico multiapoyo (modelo ciempiés) de MARCANTI' },
          paragraphs: about,
        }),
        fitSection({
          images: ['Sistema-de-enxaixe-01.jpg', 'Sistema-de-enxaixe-02.jpg', 'Aplicacao-01-1.jpg', 'Aplicacao-02-1.jpg', 'Aplicacao-03-1.jpg'],
          alt: { pt: 'Espaçador multiapoio no fundo da armadura de uma laje', en: 'Multi-support spacer under a slab reinforcement mesh', es: 'Separador multiapoyo bajo la armadura de una losa' },
        }),
        sizesSection({ paragraphs: sizesP, img: 'Title-3.png', table: SPEC.multiapoio }),
      ],
    }),
    title: { pt: 'Espaçador Multiapoio 15 a 40 mm | Marcanti', en: 'Multi-Support Spacer 15 to 40 mm | Marcanti', es: 'Separador Multiapoyo 15 a 40 mm | Marcanti' },
    description: {
      pt: 'Espaçador multiapoio para fundo de viga, laje, piso e bloco de fundação. Seis cobrimentos, de 15 a 40 mm. Peça sua cotação.',
      en: 'Multi-support spacer for beam soffits, slabs, floors and foundation blocks. Six covers, from 15 to 40 mm. Request a quote.',
      es: 'Separador multiapoyo para fondo de viga, losa, piso y bloque de cimentación. Seis recubrimientos, de 15 a 40 mm. Pide cotización.',
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
      intro: introCadeirinhaPesado,
      schemaImage: 'WhatsApp-Image-2026-032-30-at-10.26s.18-1-3.jpeg',
      sections: [
        aboutSection({
          img: 'WhatsApp-Image-2026-032-30-at-10.26s.18-1-3.jpeg',
          imgAlt: { pt: 'Espaçador cadeirinha pesado reforçado da Marcanti', en: 'MARCANTI reinforced heavy chair spacer', es: 'Separador silla pesada reforzado de MARCANTI' },
          paragraphs: about,
        }),
        fitSection({
          images: ['D_NQ_NP_995317-MLB27759536075_072018-O-1.webp', 'Aplicacao-Cadeirinha.jpg'],
          alt: { pt: 'Espaçador cadeirinha pesado sustentando armadura horizontal pesada', en: 'Heavy chair spacer supporting heavy horizontal reinforcement', es: 'Separador silla pesada sosteniendo armadura horizontal pesada' },
        }),
        sizesSection({ paragraphs: sizesP, img: 'WhatsApp-Image-2026-03-31-at-09.30.20.jpeg', table: SPEC.cadeirinhaPesado }),
      ],
    }),
    title: { pt: 'Espaçador Cadeirinha Pesado até 25 mm | Marcanti', en: 'Heavy Chair Spacer up to 25 mm | Marcanti', es: 'Separador Silla Pesada hasta 25 mm | Marcanti' },
    description: {
      pt: 'Cadeirinha reforçada para laje espessa, sapata e bloco. Cobrimento 30 a 50 mm, bitola até 25 mm. Veja as especificações.',
      en: 'Reinforced chair spacer for thick slabs, footings and pile caps. Cover 30 to 50 mm, rebar up to 25 mm. See the specifications.',
      es: 'Silla reforzada para losa gruesa, zapata y bloque. Recubrimiento 30 a 50 mm, varilla hasta 25 mm. Ver las especificaciones.',
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
