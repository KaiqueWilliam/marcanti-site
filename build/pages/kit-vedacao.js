'use strict';
const T = require('../templates');
const { ui } = require('../data/site');

const colorsParagraph = {
  pt: 'Disponível em uma variedade de cores, incluindo Cerâmica, Marfim, Concreto e Branco, você pode escolher a opção que melhor se adequa ao estilo e design do seu telhado. Essas opções de cores permitem que você tenha não apenas uma vedação eficaz, mas também uma aparência estética harmoniosa e atraente.',
  en: 'Available in a variety of colors, including Ceramic, Ivory, Concrete and White, you can choose the option that best suits the style and design of your roof. These color options let you enjoy not only effective sealing, but also a harmonious and attractive look.',
  es: 'Disponible en una variedad de colores, incluyendo Cerámica, Marfil, Concreto y Blanco, puedes elegir la opción que mejor se adapte al estilo y diseño de tu techo. Estas opciones de color te permiten tener no solo un sellado eficaz, sino también una apariencia estética armoniosa y atractiva.',
};
const colorNames = {
  pt: ['Cerâmica', 'Marfim', 'Branco', 'Concreto'],
  en: ['Ceramic', 'Ivory', 'White', 'Concrete'],
  es: ['Cerámica', 'Marfil', 'Blanco', 'Concreto'],
};
const modelNames = {
  pt: {
    colonial: 'Telha Colonial', minionda: 'Telha Minionda', plan: 'Telha Plan', trapezoidal: 'Telha Trapezoidal',
  },
  en: {
    colonial: 'Colonial Tile', minionda: 'Minionda Tile', plan: 'Plan Tile', trapezoidal: 'Trapezoidal Tile',
  },
  es: {
    colonial: 'Teja Colonial', minionda: 'Teja Minionda', plan: 'Teja Plan', trapezoidal: 'Teja Trapezoidal',
  },
};
const modelDescriptions = {
  pt: [
    'Telha Colonial: Com um design tradicional e elegante, a Telha Colonial da MARCANTI traz um charme atemporal aos projetos. Com sua aparência semelhante a uma telha cerâmica, proporciona um visual clássico e sofisticado, combinado com os benefícios do PVC, como leveza e facilidade de instalação.',
    'Telha Minionda: A Telha Minionda apresenta um perfil ondulado, trazendo dinamismo e movimento visual ao telhado. Seu design versátil é ideal para projetos que buscam uma estética moderna e contemporânea. Além disso, a Telha Minionda oferece excelente resistência e durabilidade, garantindo proteção contra intempéries.',
    'Telha Plan: Com um design simples e minimalista, a Telha Plan é uma opção clássica e discreta. Sua superfície plana proporciona um acabamento suave e uniforme ao telhado, conferindo um visual clean e elegante. Além disso, a Telha Plan oferece praticidade na instalação e excelente resistência aos elementos.',
    'Telha Trapezoidal: A Telha Trapezoidal é uma escolha popular para projetos comerciais e industriais, bem como residenciais. Seu perfil trapezoidal oferece resistência estrutural superior, tornando-a adequada para coberturas de grandes vãos. Além disso, a Telha Trapezoidal apresenta uma aparência moderna e robusta, combinando eficiência e estética.',
  ],
  en: [
    'Colonial Tile: With a traditional and elegant design, MARCANTI’s Colonial Tile brings timeless charm to projects. With an appearance similar to a ceramic tile, it provides a classic, sophisticated look combined with the benefits of PVC, such as light weight and ease of installation.',
    'Minionda Tile: The Minionda Tile features a wavy profile, bringing dynamism and visual movement to the roof. Its versatile design is ideal for projects seeking a modern, contemporary look. It also offers excellent strength and durability, ensuring protection against the elements.',
    'Plan Tile: With a simple, minimalist design, the Plan Tile is a classic, understated option. Its flat surface provides a smooth, uniform finish to the roof, giving it a clean, elegant look. It also offers ease of installation and excellent resistance to the elements.',
    'Trapezoidal Tile: The Trapezoidal Tile is a popular choice for commercial and industrial as well as residential projects. Its trapezoidal profile offers superior structural strength, making it suitable for covering large spans. It also has a modern, robust look, combining efficiency and aesthetics.',
  ],
  es: [
    'Teja Colonial: Con un diseño tradicional y elegante, la Teja Colonial de MARCANTI aporta un encanto atemporal a los proyectos. Con una apariencia similar a una teja cerámica, ofrece un aspecto clásico y sofisticado, combinado con los beneficios del PVC, como la ligereza y la facilidad de instalación.',
    'Teja Minionda: La Teja Minionda presenta un perfil ondulado, aportando dinamismo y movimiento visual al techo. Su diseño versátil es ideal para proyectos que buscan una estética moderna y contemporánea. Además, ofrece excelente resistencia y durabilidad, garantizando protección contra la intemperie.',
    'Teja Plan: Con un diseño simple y minimalista, la Teja Plan es una opción clásica y discreta. Su superficie plana proporciona un acabado suave y uniforme al techo, otorgando un aspecto limpio y elegante. Además, ofrece practicidad en la instalación y excelente resistencia a los elementos.',
    'Teja Trapezoidal: La Teja Trapezoidal es una opción popular para proyectos comerciales e industriales, así como residenciales. Su perfil trapezoidal ofrece una resistencia estructural superior, siendo adecuada para cubiertas de grandes luces. Además, presenta una apariencia moderna y robusta, combinando eficiencia y estética.',
  ],
};

const modelImages = ['modelo-colonial.png', 'modelo-minionda.png', 'modelo-plan.png', 'modelo-trapezoidal.png'];

function modelsSection(lang) {
  return `<div class="section-tight">
    <h2>${ui.availableModels[lang]}</h2>
    <div class="tile-grid">
      ${modelDescriptions[lang].map((d, i) => {
        const [name, ...rest] = d.split(': ');
        return `<div class="tile">${T.renderImg(modelImages[i], name)}<h3>${name}</h3><p>${rest.join(': ')}</p></div>`;
      }).join('')}
    </div>
  </div>`;
}

const colorImagesSwatch = ['color-ceramica.png', 'color-marfim.jpg', 'color-branco.jpg', 'color-concreto.jpg'];
const colorImagesKit = ['color-kit-ceramica.png', 'color-kit-marfim.png', 'color-kit-branco.png', 'color-kit-concreto.png'];

function colorsSection(lang, images) {
  return `<div class="section-tight">${T.colorSwatches({ title: ui.availableColors[lang], colors: colorNames[lang], note: colorsParagraph[lang], images: images || colorImagesSwatch })}</div>`;
}

// =================== HUB ===================
const hub = {
  slug: 'kit-vedacao',
  title: { pt: 'Kit Vedação – Marcanti', en: 'Sealing Kit – Marcanti', es: 'Kit de Sellado – Marcanti' },
  description: {
    pt: 'Kit de Vedação MARCANTI para telhados: solução completa para proteção e durabilidade contra água, vento e infiltrações.',
    en: 'MARCANTI Sealing Kit for roofs: complete solution for protection and durability against water, wind and leaks.',
    es: 'Kit de Sellado MARCANTI para techos: solución completa para protección y durabilidad contra agua, viento e infiltraciones.',
  },
  body(lang) {
    const intro = {
      pt: 'O kit de vedação de telhados da MARCANTI é a solução completa para garantir a máxima proteção e durabilidade ao seu telhado. Desenvolvido com materiais de alta qualidade e tecnologia avançada, nosso kit de vedação oferece uma barreira eficaz contra a infiltração de água, vento e outros elementos indesejados.',
      en: 'MARCANTI’s roof sealing kit is the complete solution to ensure maximum protection and durability for your roof. Developed with high-quality materials and advanced technology, our sealing kit offers an effective barrier against water infiltration, wind and other unwanted elements.',
      es: 'El kit de sellado de techos de MARCANTI es la solución completa para garantizar la máxima protección y durabilidad de tu techo. Desarrollado con materiales de alta calidad y tecnología avanzada, nuestro kit de sellado ofrece una barrera eficaz contra la infiltración de agua, viento y otros elementos no deseados.',
    }[lang];
    const noScrew = { pt: 'Sem Parafuso', en: 'Without Screw', es: 'Sin Tornillo' }[lang];
    const withScrew = { pt: 'Com Parafuso', en: 'With Screw', es: 'Con Tornillo' }[lang];
    const cards = [
      { href: T.url(lang, 'kit-vedacao/kit-vedacao-para-telha-de-pvc'), img: 'Copia-de-Title-1-1024x1024.png', title: { pt: 'Kit Vedação Para Telha de PVC', en: 'Sealing Kit for PVC Roof Tiles', es: 'Kit de Sellado para Teja de PVC' }[lang], text: noScrew },
      { href: T.url(lang, 'kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc'), img: 'FOTO02-1-1.jpg', title: { pt: 'Vedação e Fixação Para Telha de PVC', en: 'Sealing & Fixing Kit for PVC Roof Tiles', es: 'Kit de Sellado y Fijación para Teja de PVC' }[lang], text: withScrew },
      { href: T.url(lang, 'kit-vedacao/kit-de-vedacao-universal-para-diversos-tipos-de-telhas'), img: 'Design-sem-nome-4-universal-hq.png', title: { pt: 'Kit Vedação Universal (Para Diversos Tipos de Telhas)', en: 'Universal Sealing Kit (For Various Roof Tile Types)', es: 'Kit de Sellado Universal (Para Varios Tipos de Tejas)' }[lang], text: noScrew },
      { href: T.url(lang, 'kit-vedacao/kit-vedacao-e-fixacao-universal'), img: 'Design-sem-nome-1-hq.png', title: { pt: 'Kit Vedação e Fixação Universal (Para Diversos Tipos de Telhas)', en: 'Universal Sealing & Fixing Kit (For Various Roof Tile Types)', es: 'Kit Universal de Sellado y Fijación (Para Varios Tipos de Tejas)' }[lang], text: withScrew },
    ].map((c) => ({ ...c, linkLabel: ui.viewProduct[lang] }));
    return `
${T.pageHero({ title: { pt: 'Kit Vedação', en: 'Sealing Kit', es: 'Kit de Sellado' }[lang], subtitle: intro, bg: 'Quem-Somos.jpg', tag: 'h1', divider: true, warm: true })}
${T.cardGrid({ cards, cols: 2, imgFit: 'contain' })}
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

function crumbItems(lang, label) {
  return [{ label: { pt: 'Kit Vedação', en: 'Sealing Kit', es: 'Kit de Sellado' }[lang], slug: 'kit-vedacao' }, { label }];
}

// =================== Kit Vedação e Fixação Universal ===================
const kitFixacaoUniversal = {
  slug: 'kit-vedacao/kit-vedacao-e-fixacao-universal',
  title: { pt: 'Kit Vedação e Fixação Universal – Marcanti', en: 'Universal Sealing & Fixing Kit – Marcanti', es: 'Kit Universal de Sellado y Fijación – Marcanti' },
  description: {
    pt: 'Kit Vedação e Fixação Universal MARCANTI para diversos tipos de telhas, com parafuso incluso.',
    en: 'MARCANTI Universal Sealing & Fixing Kit for various roof tile types, screw included.',
    es: 'Kit Universal de Sellado y Fijación MARCANTI para varios tipos de tejas, con tornillo incluido.',
  },
  body(lang) {
    const h3 = { pt: 'Kit Vedação e Fixação Universal', en: 'Universal Sealing & Fixing Kit', es: 'Kit Universal de Sellado y Fijación' }[lang];
    const intro = { pt: 'O Kit de Vedação para Telha de PVC da MARCANTI é a solução perfeita para garantir a estanqueidade e durabilidade do seu telhado.', en: 'MARCANTI’s Sealing Kit for PVC roof tiles is the perfect solution to ensure the water-tightness and durability of your roof.', es: 'El Kit de Sellado para Teja de PVC de MARCANTI es la solución perfecta para garantizar la estanqueidad y durabilidad de tu techo.' }[lang];
    const about = {
      pt: ['O Kit de Vedação e Fixação Universal para diversos tipos de telhas da MARCANTI é um conjunto composto pelo kit universal e o parafuso.', 'É um Kit que substitui as peças: capa, anel de vedação e chapéu, em um único item.'],
      en: ['MARCANTI’s Universal Sealing & Fixing Kit for various roof tile types is a set made up of the universal kit plus the screw.', 'It is a kit that replaces the cap, sealing ring and hat pieces with a single item.'],
      es: ['El Kit Universal de Sellado y Fijación para varios tipos de tejas de MARCANTI es un conjunto compuesto por el kit universal y el tornillo.', 'Es un kit que reemplaza las piezas: capa, anillo de sellado y sombrerete, en un único artículo.'],
    }[lang];
    return `
${T.pageHero({ title: h3, subtitle: intro, bg: 'Quem-Somos.jpg', tag: 'h1', warm: true, divider: true })}
<section><div class="container">
  ${T.crumbs(lang, crumbItems(lang, h3))}
  ${T.splitSection({ title: ui.aboutProduct[lang], paragraphs: about, img: 'Design-sem-nome-1-hq.png', imgAlt: { pt: 'Kit de vedação e fixação universal da Marcanti', en: 'MARCANTI universal sealing and fixing kit', es: 'Kit universal de sellado y fijación de MARCANTI' }[lang] })}
  ${colorsSection(lang)}
</div></section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

// =================== Kit de Vedação Universal Para Diversos Tipos de Telhas ===================
const kitUniversal = {
  slug: 'kit-vedacao/kit-de-vedacao-universal-para-diversos-tipos-de-telhas',
  title: { pt: 'Kit de Vedação Universal Para Diversos Tipos de Telhas – Marcanti', en: 'Universal Sealing Kit for Various Roof Tile Types – Marcanti', es: 'Kit de Sellado Universal para Varios Tipos de Tejas – Marcanti' },
  description: {
    pt: 'Kit de Vedação Universal MARCANTI: solução versátil para vedação adequada em diferentes tipos de telhados. Parafuso não incluso.',
    en: 'MARCANTI Universal Sealing Kit: versatile solution for proper sealing across different roof types. Screw not included.',
    es: 'Kit de Sellado Universal MARCANTI: solución versátil para un sellado adecuado en diferentes tipos de techos. Tornillo no incluido.',
  },
  body(lang) {
    const h3 = { pt: 'Kit de Vedação Universal Para Diversos Tipos de Telhas', en: 'Universal Sealing Kit for Various Roof Tile Types', es: 'Kit de Sellado Universal para Varios Tipos de Tejas' }[lang];
    const intro = { pt: 'O Kit de Vedação Universal para Diversos Tipos de Telhas da MARCANTI é uma solução versátil e eficiente para garantir a vedação adequada em diferentes tipos de telhados.', en: 'MARCANTI’s Universal Sealing Kit for Various Roof Tile Types is a versatile, efficient solution to ensure proper sealing across different roof types.', es: 'El Kit de Sellado Universal para Varios Tipos de Tejas de MARCANTI es una solución versátil y eficiente para garantizar el sellado adecuado en diferentes tipos de techos.' }[lang];
    const about = {
      pt: ['É um Kit que substitui as peças: capa, anel de vedação e chapéu, em um único item. O parafuso não está incluso.', 'Vale lembrar que para utilizar o Kit é necessário um parafuso. É ele que vai fazer a fixação do Kit na telha e na estrutura do telhado.', 'Oferecemos um Kit com o parafuso incluído. Conheça clicando no botão abaixo.'],
      en: ['It is a kit that replaces the cap, sealing ring and hat pieces with a single item. The screw is not included.', 'Keep in mind that a screw is required to use the kit — it is what fixes the kit to the roof tile and the roof structure.', 'We also offer a kit with the screw included. Check it out using the button below.'],
      es: ['Es un kit que reemplaza las piezas: capa, anillo de sellado y sombrerete, en un único artículo. El tornillo no está incluido.', 'Vale recordar que para utilizar el kit es necesario un tornillo. Es él quien fija el kit a la teja y a la estructura del techo.', 'Ofrecemos un kit con el tornillo incluido. Conócelo haciendo clic en el botón de abajo.'],
    }[lang];
    const fixLabel = { pt: 'Kit Vedação e Fixação', en: 'Sealing & Fixing Kit', es: 'Kit de Sellado y Fijación' }[lang];
    return `
${T.pageHero({ title: h3, subtitle: intro, bg: 'Quem-Somos.jpg', tag: 'h1', warm: true, divider: true })}
<section><div class="container">
  ${T.crumbs(lang, crumbItems(lang, h3))}
  ${T.splitSection({ title: ui.aboutProduct[lang], paragraphs: about, img: 'Design-sem-nome-4-universal-hq.png', imgAlt: { pt: 'Kit de vedação universal da Marcanti para diversos tipos de telha', en: 'MARCANTI universal sealing kit for various roof tile types', es: 'Kit de sellado universal de MARCANTI para varios tipos de teja' }[lang], cta: { href: T.url(lang, 'kit-vedacao/kit-vedacao-e-fixacao-universal'), label: fixLabel } })}
  ${colorsSection(lang)}
</div></section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

// =================== Kit Vedação Para Telha de PVC ===================
const kitPvc = {
  slug: 'kit-vedacao/kit-vedacao-para-telha-de-pvc',
  title: { pt: 'Kit Vedação Para Telha de PVC – Marcanti', en: 'Sealing Kit for PVC Roof Tiles – Marcanti', es: 'Kit de Sellado para Teja de PVC – Marcanti' },
  description: {
    pt: 'Kit de Vedação para Telha de PVC MARCANTI: capa, anel de vedação e chapéu. Parafuso não incluso.',
    en: 'MARCANTI Sealing Kit for PVC roof tiles: cap, sealing ring and hat. Screw not included.',
    es: 'Kit de Sellado para Teja de PVC MARCANTI: capa, anillo de sellado y sombrerete. Tornillo no incluido.',
  },
  body(lang) {
    const h3 = { pt: 'Kit Vedação Para Telha de PVC', en: 'Sealing Kit for PVC Roof Tiles', es: 'Kit de Sellado para Teja de PVC' }[lang];
    const intro = { pt: 'O Kit de Vedação para Telha de PVC da MARCANTI é a solução perfeita para garantir a estanqueidade e durabilidade do seu telhado.', en: 'MARCANTI’s Sealing Kit for PVC roof tiles is the perfect solution to ensure the water-tightness and durability of your roof.', es: 'El Kit de Sellado para Teja de PVC de MARCANTI es la solución perfecta para garantizar la estanqueidad y durabilidad de tu techo.' }[lang];
    const about = {
      pt: ['O Kit de Vedação para Telha de PVC da MARCANTI é um conjunto completo de vedação projetado especificamente para telhas de PVC.', 'Composto por três peças essenciais – capa, anel de vedação e chapéu –, este kit oferece uma solução abrangente para garantir a estanqueidade e durabilidade do seu telhado de PVC.'],
      en: ['MARCANTI’s Sealing Kit for PVC roof tiles is a complete sealing set designed specifically for PVC roof tiles.', 'Made up of three essential pieces — cap, sealing ring and hat — this kit offers a comprehensive solution to ensure the water-tightness and durability of your PVC roof.'],
      es: ['El Kit de Sellado para Teja de PVC de MARCANTI es un conjunto completo de sellado diseñado específicamente para tejas de PVC.', 'Compuesto por tres piezas esenciales — capa, anillo de sellado y sombrerete —, este kit ofrece una solución integral para garantizar la estanqueidad y durabilidad de tu techo de PVC.'],
    }[lang];
    const noScrewTitle = { pt: 'Kit Sem Parafuso de Fixação', en: 'Kit Without Fixing Screw', es: 'Kit Sin Tornillo de Fijación' }[lang];
    const noScrewP = {
      pt: ['Vale lembrar que para utilizar o Kit é necessário um parafuso. É ele que vai fazer a fixação do Kit na telha e na estrutura do telhado.', 'Oferecemos um Kit com o Parafuso incluído. Conheça clicando no botão abaixo.'],
      en: ['Keep in mind that a screw is required to use the kit — it is what fixes the kit to the roof tile and the roof structure.', 'We also offer a kit with the screw included. Check it out using the button below.'],
      es: ['Vale recordar que para utilizar el kit es necesario un tornillo. Es él quien fija el kit a la teja y a la estructura del techo.', 'Ofrecemos un kit con el tornillo incluido. Conócelo haciendo clic en el botón de abajo.'],
    }[lang];
    const fixLabel = { pt: 'Kit Vedação e Fixação', en: 'Sealing & Fixing Kit', es: 'Kit de Sellado y Fijación' }[lang];
    return `
${T.pageHero({ title: h3, subtitle: intro, bg: 'Quem-Somos.jpg', tag: 'h1', warm: true, divider: true })}
<section><div class="container">
  ${T.crumbs(lang, crumbItems(lang, h3))}
  ${T.splitSection({ title: ui.aboutProduct[lang], paragraphs: about, img: 'Kit-Vedacao-Para-Telha-de-PVC.jpg', imgAlt: { pt: 'Kit de vedação para telha de PVC da Marcanti: capa, anel de vedação e chapéu', en: 'MARCANTI sealing kit for PVC roof tiles: cap, sealing ring and hat', es: 'Kit de sellado para teja de PVC de MARCANTI: capa, anillo de sellado y sombrerete' }[lang] })}
  <div class="section-tight">${T.splitSection({ title: noScrewTitle, paragraphs: noScrewP, img: 'Copia-de-Title.png', cta: { href: T.url(lang, 'kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc'), label: fixLabel } })}</div>
  ${colorsSection(lang, colorImagesKit)}
  ${modelsSection(lang)}
</div></section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

// =================== Kit Vedação e Fixação Para Telha de PVC ===================
const kitPvcFixacao = {
  slug: 'kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc',
  title: { pt: 'Kit Vedação e Fixação Para Telha de PVC – Marcanti', en: 'Sealing & Fixing Kit for PVC Roof Tiles – Marcanti', es: 'Kit de Sellado y Fijación para Teja de PVC – Marcanti' },
  description: {
    pt: 'Kit de Vedação e Fixação para Telha de PVC MARCANTI: instalação segura e vedação eficiente, com parafuso incluso.',
    en: 'MARCANTI Sealing & Fixing Kit for PVC roof tiles: safe installation and efficient sealing, screw included.',
    es: 'Kit de Sellado y Fijación para Teja de PVC MARCANTI: instalación segura y sellado eficiente, con tornillo incluido.',
  },
  body(lang) {
    const h3 = { pt: 'Kit Vedação e Fixação Para Telha de PVC', en: 'Sealing & Fixing Kit for PVC Roof Tiles', es: 'Kit de Sellado y Fijación para Teja de PVC' }[lang];
    const intro = { pt: 'O Kit de Vedação e Fixação para Telha de PVC da MARCANTI é a solução completa para garantir a instalação segura e vedação eficiente das suas telhas de PVC.', en: 'MARCANTI’s Sealing & Fixing Kit for PVC roof tiles is the complete solution to ensure safe installation and efficient sealing of your PVC roof tiles.', es: 'El Kit de Sellado y Fijación para Teja de PVC de MARCANTI es la solución completa para garantizar la instalación segura y el sellado eficiente de tus tejas de PVC.' }[lang];
    const about = {
      pt: ['Esse kit é projetado especificamente para telhas de PVC, oferecendo os componentes essenciais para um telhado bem protegido e duradouro.', 'O kit inclui uma combinação de itens cuidadosamente selecionados, como perfis de vedação, parafusos e acessórios de fixação.', 'Os perfis de vedação são projetados para se encaixarem perfeitamente nas telhas de PVC, criando uma vedação confiável contra a entrada de água, poeira e outros elementos indesejados.'],
      en: ['This kit is designed specifically for PVC roof tiles, offering the essential components for a well-protected, long-lasting roof.', 'The kit includes a combination of carefully selected items, such as sealing profiles, screws and fixing accessories.', 'The sealing profiles are designed to fit perfectly onto PVC roof tiles, creating a reliable seal against water, dust and other unwanted elements.'],
      es: ['Este kit está diseñado específicamente para tejas de PVC, ofreciendo los componentes esenciales para un techo bien protegido y duradero.', 'El kit incluye una combinación de elementos cuidadosamente seleccionados, como perfiles de sellado, tornillos y accesorios de fijación.', 'Los perfiles de sellado están diseñados para encajar perfectamente en las tejas de PVC, creando un sellado confiable contra la entrada de agua, polvo y otros elementos no deseados.'],
    }[lang];
    const withFixTitle = { pt: 'Kit com Fixação', en: 'Kit with Fixing', es: 'Kit con Fijación' }[lang];
    const withFixP = {
      pt: ['Kit acompanhado de um parafuso. Este é utilizado para fixar as telhas na estrutura do telhado.', 'Podem ser utilizados tanto um parafuso de 2,5″ (6,35cm) quanto um de 3,5″ (8,89cm), tudo depende do modelo da telha.', 'É o parafuso que vai fazer a fixação do Kit na telha e na estrutura do telhado.'],
      en: ['Kit supplied with a screw, used to fix the tiles to the roof structure.', 'Either a 2.5″ (6.35cm) or a 3.5″ (8.89cm) screw can be used, depending on the tile model.', 'It is the screw that fixes the kit to the roof tile and the roof structure.'],
      es: ['Kit que incluye un tornillo, utilizado para fijar las tejas a la estructura del techo.', 'Se puede utilizar tanto un tornillo de 2,5″ (6,35 cm) como uno de 3,5″ (8,89 cm), según el modelo de la teja.', 'Es el tornillo el que fija el kit a la teja y a la estructura del techo.'],
    }[lang];
    return `
${T.pageHero({ title: h3, subtitle: intro, bg: 'Quem-Somos.jpg', tag: 'h1', warm: true, divider: true })}
<section><div class="container">
  ${T.crumbs(lang, crumbItems(lang, h3))}
  ${T.splitSection({ title: ui.aboutProduct[lang], paragraphs: about, img: 'Kit-Vedacao-e-Fixacao-Para-Telha-de-PVC-com-vedacao.jpg', imgAlt: { pt: 'Kit de vedação e fixação para telha de PVC da Marcanti, com parafuso', en: 'MARCANTI sealing and fixing kit for PVC roof tiles, with screw', es: 'Kit de sellado y fijación para teja de PVC de MARCANTI, con tornillo' }[lang] })}
  <div class="section-tight">${T.splitSection({ title: withFixTitle, paragraphs: withFixP, img: 'Kit-Vedacao-Para-Telha-de-PVC-com-fixacao.jpg' })}</div>
  ${colorsSection(lang, colorImagesKit)}
  ${modelsSection(lang)}
</div></section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
  },
};

module.exports = [hub, kitFixacaoUniversal, kitUniversal, kitPvc, kitPvcFixacao];
