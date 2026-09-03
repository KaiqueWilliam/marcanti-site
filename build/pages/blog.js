'use strict';
const T = require('../templates');
const { ui } = require('../data/site');

const POSTS_META = [
  {
    slug: 'o-impacto-dos-espacadores-de-plasticos-na-sustentacao-das-construcoes',
    img: 'construction-of-high-rise-building-in-moscow-city-small-1024x683.jpg',
    title: {
      pt: 'O Impacto dos Espaçadores de Plásticos na Sustentação das Construções',
      en: 'The Impact of Plastic Spacers on the Structural Support of Buildings',
      es: 'El Impacto de los Espaciadores de Plástico en la Sustentación de las Construcciones',
    },
  },
  {
    slug: 'tudo-sobre-os-espacadores',
    img: '001-abstandhalter-kunststoff-produktportrait-001-1024x683.jpg',
    title: {
      pt: 'Saiba Tudo Sobre os Espaçadores de Plástico',
      en: 'Everything You Need to Know About Plastic Spacers',
      es: 'Conoce Todo Sobre los Espaciadores de Plástico',
    },
  },
  {
    slug: 'vantagens-das-telhas-de-pvc-e-a-importancia-dos-kits-de-vedacao-e-fixacao',
    img: '262079-10.jpg',
    title: {
      pt: 'Vantagens das Telhas de PVC e a Importância dos Kits de Vedação e Fixação',
      en: 'Advantages of PVC Roof Tiles and the Importance of Sealing & Fixing Kits',
      es: 'Ventajas de las Tejas de PVC y la Importancia de los Kits de Sellado y Fijación',
    },
  },
  {
    slug: 'telha-de-pvc-e-seus-modelos',
    img: 'PVC.jpg',
    title: {
      pt: 'Telha de PVC e Seus Modelos',
      en: 'PVC Roof Tiles and Their Models',
      es: 'Teja de PVC y sus Modelos',
    },
  },
  {
    slug: 'pare-agora-de-usar-as-cocadinhas',
    img: 'download-1.jpg',
    title: {
      pt: 'Pare Agora de Usar as “Cocadinhas”!',
      en: 'Stop Using “Cocada” Spacers Now!',
      es: '¡Deja de Usar los “Cocaditas” Ahora!',
    },
  },
  {
    slug: 'cobrimento-de-armadura-como-escolher-o-espacador',
    img: 'Encaixe-Circula-01.jpg',
    title: {
      pt: 'Cobrimento de Armadura: Como Escolher o Espaçador Correto',
      en: 'Concrete Cover: How to Choose the Right Spacer',
      es: 'Recubrimiento de Armadura: Cómo Elegir el Separador Correcto',
    },
  },
  {
    slug: 'quantos-espacadores-por-m2-de-laje',
    img: 'Aplicacao-Cadeirinha.jpg',
    title: {
      pt: 'Quantos Espaçadores Usar por m² de Laje',
      en: 'How Many Spacers to Use per m² of Slab',
      es: 'Cuántos Separadores Usar por m² de Losa',
    },
  },
  {
    slug: 'por-que-a-armadura-corroi',
    img: 'corrosao-1.jpg',
    title: {
      pt: 'Por Que a Armadura Corrói — e o Que o Cobrimento Tem a Ver Com Isso',
      en: 'Why Reinforcement Corrodes — and What Cover Has to Do With It',
      es: 'Por Qué se Corroe la Armadura — y Qué Tiene que Ver el Recubrimiento',
    },
  },
  {
    slug: 'telha-de-pvc-vazando-no-parafuso',
    img: 'Kit-Vedacao-Para-Telha-de-PVC-com-fixacao.jpg',
    title: {
      pt: 'Telha de PVC Vazando no Ponto do Parafuso: Causas e Solução',
      en: 'PVC Roof Tile Leaking at the Screw: Causes and Solution',
      es: 'Teja de PVC con Filtración en el Tornillo: Causas y Solución',
    },
  },
];

// Slugs das páginas de destino, para os links dos posts não repetirem caminho
// longo no meio do texto e quebrarem em silêncio se um slug mudar.
const E = 'espacadores';
const CA = 'espacadores/linha-construcao/circular-aberto-linha-construcao';
const CD = 'espacadores/linha-construcao/cadeirinha-linha-construcao';
const CDP = 'espacadores/cadeirinha-pesada';
const MA = 'espacadores/linha-construcao/espacadores-multiapoio-linha-construcao';
const K = 'kit-vedacao';
const KF = 'kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc';
const COC = 'blog/pare-agora-de-usar-as-cocadinhas';

// Link interno contextual do post para a página de produto (auditoria 7).
// No texto do post, [[slug|rótulo]] vira um <a> para a URL daquele idioma —
// assim a marcação fica legível na fonte e a URL nunca sai errada.
const linkTokens = (text, lang) =>
  text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, slug, label) => `<a href="${T.url(lang, slug)}">${label}</a>`);

function renderBlocks(blocks, lang) {
  return blocks.map((b) => {
    if (b.type === 'p') return `<p>${linkTokens(b.text, lang)}</p>`;
    if (b.type === 'ul') return `<ul class="icon-list">${b.items.map((i) => `<li>${linkTokens(i, lang)}</li>`).join('')}</ul>`;
    if (b.type === 'h2') return `<h2>${linkTokens(b.text, lang)}</h2>`;
    return '';
  }).join('');
}

function shareSection(lang, slug, title) {
  const shareUrl = encodeURIComponent(`https://marcanti.ind.br${T.url(lang, 'blog/' + slug)}`);
  const shareText = encodeURIComponent(title);
  return `<div class="blog-share">
    <span>${ui.shareLabel[lang]}</span>
    <a href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank" rel="noopener">WhatsApp</a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener">LinkedIn</a>
    <a href="mailto:?subject=${shareText}&body=${shareUrl}">Email</a>
  </div>`;
}

function recentPostsSection(lang, currentSlug) {
  const others = POSTS_META.filter((p) => p.slug !== currentSlug).slice(0, 4);
  return `<div class="recent-posts">
    <h2>${ui.recentPosts[lang]}</h2>
    <div class="card-grid">
      ${others.map((p) => `<a class="card" href="${T.url(lang, 'blog/' + p.slug)}">
        ${T.renderImg(p.img, p.title[lang])}
        <div class="card-body"><h3>${p.title[lang]}</h3><span class="card-link">${ui.readMore[lang]} &rarr;</span></div>
      </a>`).join('')}
    </div>
  </div>`;
}

function postShell({ slug, title, seoTitle, img, description, ctaHeading, blocks }) {
  return {
    slug: `blog/${slug}`,
    // O <title> não precisa ser igual ao H1: quando o título do post passa dos
    // ~60 caracteres que o Google exibe, `seoTitle` traz uma versão curta para a
    // aba/SERP e o H1 na página continua com o título completo. Sem sufixo
    // "| Marcanti" para não gastar caracteres.
    title: seoTitle || title,
    image: img ? T.asset('img/' + img) : undefined,
    description,
    body(lang) {
      return `
${T.pageHero({ eyebrow: ui.ourBlog[lang], title: title[lang], bg: 'Quem-Somos.jpg', tag: 'h1', warm: true, divider: true })}
<section>
  <div class="container">
    ${T.crumbs(lang, [{ label: ui.ourBlog[lang], slug: 'blog' }, { label: title[lang] }])}
    <div class="blog-post-body">
      ${renderBlocks(blocks[lang], lang)}
      ${ctaHeading ? `<h2>${ctaHeading[lang]}</h2>` : ''}
      ${shareSection(lang, slug, title[lang])}
      ${recentPostsSection(lang, slug)}
    </div>
  </div>
</section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}`;
    },
  };
}

// ---------------- BLOG INDEX ----------------
const index = {
  slug: 'blog',
  title: { pt: 'Blog Técnico: Espaçadores e Injeção Plástica', en: 'Technical Blog: Spacers and Plastic Injection', es: 'Blog Técnico: Espaciadores e Inyección Plástica' },
  description: {
    pt: 'Conteúdo técnico sobre cobrimento de armadura, espaçadores, telha de PVC e injeção plástica para construção civil.',
    en: 'Technical content on concrete cover, spacers, PVC roof tiles and plastic injection molding for civil construction.',
    es: 'Contenido técnico sobre recubrimiento de armadura, espaciadores, teja de PVC e inyección plástica para la construcción.',
  },
  body(lang) {
    const intro = {
      pt: 'Descubra o mundo fascinante da indústria de plásticos e acompanhe as últimas tendências e inovações no blog da MARCANTI',
      en: 'Discover the fascinating world of the plastics industry and follow the latest trends and innovations on the MARCANTI blog',
      es: 'Descubre el fascinante mundo de la industria de plásticos y sigue las últimas tendencias e innovaciones en el blog de MARCANTI',
    }[lang];
    const cards = POSTS_META.map((p) => ({
      href: T.url(lang, 'blog/' + p.slug),
      img: p.img,
      title: p.title[lang],
      linkLabel: ui.readMore[lang],
    }));
    return `
${T.pageHero({ title: { pt: 'Blog', en: 'Blog', es: 'Blog' }[lang], subtitle: intro, bg: 'Quem-Somos.jpg', tag: 'h1', divider: true, warm: true })}
${T.cardGrid({ cards, cols: 3 })}
`;
  },
};

// ---------------- POST 1 ----------------
const post1 = postShell({
  slug: POSTS_META[0].slug,
  title: POSTS_META[0].title,
  seoTitle: {
    pt: 'Espaçadores Plásticos e Sustentação da Obra',
    en: 'Plastic Spacers and Structural Support',
    es: 'Espaciadores Plásticos y Sustentación de Obra',
  },
  img: POSTS_META[0].img,
  description: {
    pt: 'Como o espaçador plástico influencia durabilidade, consumo de aço e resíduo no canteiro — e por que o cobrimento correto evita corrosão.',
    en: 'How plastic spacers affect durability, steel consumption and site waste, and why correct concrete cover prevents corrosion.',
    es: 'Cómo el separador plástico influye en durabilidad, consumo de acero y residuos, y por qué el recubrimiento correcto evita corrosión.',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'Os espaçadores de plástico têm um papel importante na sustentação e durabilidade das construções modernas. São componentes discretos, muitas vezes pequenos e de aparência simples, mas desempenham uma função crucial para garantir a qualidade e a integridade das estruturas.' },
      { type: 'p', text: 'Os [[espacadores|espaçadores de plástico]] são utilizados em diversos contextos na construção civil, mas são mais comumente empregados na montagem de armaduras em estruturas de concreto armado. Sua principal função é manter o espaçamento adequado entre as barras de aço que compõem a armadura, garantindo que elas estejam corretamente posicionadas em relação ao concreto circundante.' },
      { type: 'p', text: 'Além de sua função de suporte e espaçamento, esses dispositivos têm impacto direto na sustentabilidade das construções, e aqui estão alguns pontos importantes:' },
      { type: 'ul', items: [
        'Redução do consumo de aço: ao utilizar espaçadores, é possível garantir que a quantidade correta de aço seja utilizada em cada estrutura, evitando desperdícios. O uso eficiente dos recursos é uma prática essencial para tornar a indústria da construção mais sustentável.',
        'Durabilidade das estruturas: o correto posicionamento das armaduras com o auxílio dos espaçadores contribui para a durabilidade das construções. O concreto armado é vulnerável à corrosão das barras de aço, que pode ocorrer caso haja contato direto entre as barras e o concreto. Os espaçadores ajudam a evitar esse problema, aumentando a vida útil da estrutura.',
        'Eficiência energética: estruturas bem projetadas e executadas com o auxílio de espaçadores adequados podem resultar em edificações mais eficientes energeticamente, já que uma estrutura bem montada reduz as chances de problemas futuros, como vazamentos ou rachaduras.',
        'Redução de resíduos: os espaçadores de plástico podem ser reutilizados em algumas situações, reduzindo a quantidade de resíduos de construção gerados. Além disso, os [[sustentabilidade|materiais plásticos utilizados na fabricação desses dispositivos podem ser reciclados]].',
        'Peso leve: o uso de espaçadores de plástico também facilita a logística da construção, uma vez que esses componentes são leves e fáceis de manusear, reduzindo o consumo de combustível durante o transporte.',
      ] },
      { type: 'p', text: 'Em resumo, os espaçadores de plástico desempenham um papel essencial na sustentação das construções, contribuindo para a durabilidade, eficiência energética e redução de resíduos. Ao serem utilizados de forma consciente e responsável, esses dispositivos ajudam a promover a construção de edificações mais sustentáveis e amigas do meio ambiente.' },
    ],
    en: [
      { type: 'p', text: 'Plastic spacers play an important role in the structural support and durability of modern buildings. They are discreet components, often small and simple-looking, yet they perform a crucial function in ensuring the quality and integrity of structures.' },
      { type: 'p', text: '[[espacadores|Plastic spacers]] are used in various contexts in civil construction, but are most commonly employed in assembling reinforcement in reinforced concrete structures. Their main function is to maintain proper spacing between the steel bars that make up the reinforcement, ensuring they are correctly positioned relative to the surrounding concrete.' },
      { type: 'p', text: 'Besides their support and spacing function, these devices have a direct impact on the sustainability of buildings — here are some important points:' },
      { type: 'ul', items: [
        'Reduced steel consumption: by using spacers, it is possible to ensure the correct amount of steel is used in each structure, avoiding waste. Efficient use of resources is an essential practice for making the construction industry more sustainable.',
        'Structural durability: correctly positioning the reinforcement with the help of spacers contributes to the durability of buildings. Reinforced concrete is vulnerable to corrosion of the steel bars, which can occur if there is direct contact between the bars and the concrete. Spacers help prevent this problem, extending the structure’s service life.',
        'Energy efficiency: well-designed structures built with proper spacers can result in more energy-efficient buildings, since a well-assembled structure reduces the chances of future problems such as leaks or cracks.',
        'Waste reduction: plastic spacers can be reused in some situations, reducing the amount of construction waste generated. In addition, the [[sustentabilidade|plastic materials used to manufacture these devices can be recycled]].',
        'Light weight: the use of plastic spacers also facilitates construction logistics, since these components are lightweight and easy to handle, reducing fuel consumption during transport.',
      ] },
      { type: 'p', text: 'In summary, plastic spacers play an essential role in supporting buildings, contributing to durability, energy efficiency and waste reduction. When used consciously and responsibly, these devices help promote the construction of more sustainable, environmentally friendly buildings.' },
    ],
    es: [
      { type: 'p', text: 'Los espaciadores de plástico cumplen un papel importante en la sustentación y durabilidad de las construcciones modernas. Son componentes discretos, muchas veces pequeños y de apariencia simple, pero desempeñan una función crucial para garantizar la calidad y la integridad de las estructuras.' },
      { type: 'p', text: 'Los [[espacadores|espaciadores de plástico]] se utilizan en diversos contextos de la construcción civil, pero se emplean más comúnmente en el montaje de armaduras en estructuras de concreto armado. Su función principal es mantener el espaciamiento adecuado entre las barras de acero que componen la armadura, garantizando que estén correctamente posicionadas respecto al concreto circundante.' },
      { type: 'p', text: 'Además de su función de soporte y espaciamiento, estos dispositivos tienen un impacto directo en la sostenibilidad de las construcciones. Estos son algunos puntos importantes:' },
      { type: 'ul', items: [
        'Reducción del consumo de acero: al utilizar espaciadores, es posible garantizar que se use la cantidad correcta de acero en cada estructura, evitando desperdicios. El uso eficiente de los recursos es una práctica esencial para hacer más sostenible la industria de la construcción.',
        'Durabilidad de las estructuras: el correcto posicionamiento de las armaduras con la ayuda de los espaciadores contribuye a la durabilidad de las construcciones. El concreto armado es vulnerable a la corrosión de las barras de acero, que puede ocurrir si hay contacto directo entre las barras y el concreto. Los espaciadores ayudan a evitar este problema, aumentando la vida útil de la estructura.',
        'Eficiencia energética: estructuras bien diseñadas y ejecutadas con espaciadores adecuados pueden resultar en edificaciones más eficientes energéticamente, ya que una estructura bien montada reduce las posibilidades de problemas futuros, como filtraciones o grietas.',
        'Reducción de residuos: los espaciadores de plástico pueden reutilizarse en algunas situaciones, reduciendo la cantidad de residuos de construcción generados. Además, los [[sustentabilidade|materiales plásticos utilizados en su fabricación pueden reciclarse]].',
        'Peso ligero: el uso de espaciadores de plástico también facilita la logística de la construcción, ya que estos componentes son livianos y fáciles de manejar, reduciendo el consumo de combustible durante el transporte.',
      ] },
      { type: 'p', text: 'En resumen, los espaciadores de plástico desempeñan un papel esencial en la sustentación de las construcciones, contribuyendo a la durabilidad, la eficiencia energética y la reducción de residuos. Utilizados de forma consciente y responsable, estos dispositivos ayudan a promover la construcción de edificaciones más sostenibles y amigables con el medio ambiente.' },
    ],
  },
});

// ---------------- POST 2 ----------------
const post2 = postShell({
  slug: POSTS_META[1].slug,
  title: POSTS_META[1].title,
  img: POSTS_META[1].img,
  description: {
    pt: 'Tipos de espaçador plástico por aplicação: armadura vertical, horizontal e malha. Onde usar cada um em fundação, laje, pilar e parede.',
    en: 'Types of plastic spacer by application: vertical, horizontal and mesh reinforcement. Where to use each in foundations, slabs and walls.',
    es: 'Tipos de separador plástico por aplicación: armadura vertical, horizontal y malla. Dónde usar cada uno en cimentación, losa y muro.',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'Os espaçadores de plástico são elementos utilizados na construção civil para garantir a correta posição e distância entre elementos estruturais, como barras de aço ou armaduras, dentro de estruturas de concreto armado. Eles desempenham um papel fundamental na garantia da qualidade e durabilidade das construções.' },
      { type: 'p', text: 'Tipos comuns de espaçadores de plástico:' },
      { type: 'ul', items: [
        'Espaçadores para armaduras verticais: são utilizados para manter as barras de aço em uma posição vertical correta, mantendo-as afastadas das formas de concreto durante a concretagem. Os principais utilizados são os [[espacadores/linha-construcao/circular-aberto-linha-construcao|Espaçadores Circular Aberto]] e [[espacadores/linha-postes/circular-fechado-linha-postes|Circular Fechado]].',
        'Espaçadores para armaduras horizontais: são usados para manter a distância adequada entre camadas de armadura em pisos ou lajes de concreto, evitando o surgimento de fissuras indesejadas. Alguns exemplos são os [[espacadores/linha-construcao/cadeirinha-linha-construcao|Espaçadores tipo Cadeirinha]] e [[espacadores/linha-construcao/espacadores-multiapoio-linha-construcao|Multiapoio]].',
        'Espaçadores para malhas de concreto: utilizados para posicionar adequadamente malhas de concreto, armaduras em forma de treliça usadas principalmente em pisos industriais e pavimentos. Os principais exemplos também são os Espaçadores tipo Cadeirinha e Multiapoio.',
      ] },
      { type: 'p', text: 'Aplicações específicas:' },
      { type: 'ul', items: [
        'Fundações: os espaçadores garantem que as armaduras das fundações estejam corretamente posicionadas para fornecer suporte e estabilidade adequados à estrutura.',
        'Lajes e pisos: são essenciais para manter a distância e o posicionamento correto das armaduras em lajes e pisos de concreto, prevenindo rachaduras e melhorando a resistência.',
        'Pilares e colunas: os espaçadores mantêm as barras de aço no lugar enquanto o concreto é aplicado, permitindo que o pilar ou coluna tenha a força necessária para suportar a carga da estrutura.',
        'Paredes: são usados em paredes de concreto armado para manter a armadura no lugar durante a concretagem, garantindo sua resistência e evitando problemas de integridade estrutural.',
      ] },
      { type: 'p', text: 'Importância na construção civil:' },
      { type: 'ul', items: [
        'Durabilidade: os espaçadores ajudam a prevenir o surgimento de fissuras e desplacamentos nas estruturas de concreto, garantindo a durabilidade e vida útil da construção.',
        'Resistência: uma disposição adequada das armaduras com o auxílio dos espaçadores melhora a resistência à tração e à compressão do concreto, tornando a estrutura mais robusta e segura.',
        'Evitar corrosão: o uso de espaçadores de plástico ajuda a manter as barras de aço afastadas das formas e do solo, reduzindo o risco de corrosão, especialmente em áreas de alta umidade.',
        'Precisão e qualidade: ao garantir o correto posicionamento das armaduras, os espaçadores contribuem para a precisão das medidas e evitam problemas de execução.',
        'Economia de tempo e recursos: o uso de espaçadores simplifica o processo de montagem das estruturas, reduzindo a necessidade de correções ou retrabalhos.',
      ] },
      { type: 'p', text: 'Em resumo, os espaçadores de plástico desempenham um papel crucial na construção civil, garantindo a integridade estrutural, durabilidade e segurança das edificações de concreto armado, ao mesmo tempo em que otimizam o processo construtivo.' },
    ],
    en: [
      { type: 'p', text: 'Plastic spacers are elements used in civil construction to ensure the correct position and distance between structural elements, such as steel bars or reinforcement, within reinforced concrete structures. They play a fundamental role in guaranteeing the quality and durability of buildings.' },
      { type: 'p', text: 'Common types of plastic spacers:' },
      { type: 'ul', items: [
        'Spacers for vertical reinforcement: used to keep steel bars in a correct vertical position, keeping them away from the concrete formwork during pouring. The main ones used are the [[espacadores/linha-construcao/circular-aberto-linha-construcao|Open Circular]] and [[espacadores/linha-postes/circular-fechado-linha-postes|Closed Circular]] spacers.',
        'Spacers for horizontal reinforcement: used to maintain proper distance between reinforcement layers in concrete floors or slabs, preventing unwanted cracks. Examples include the [[espacadores/linha-construcao/cadeirinha-linha-construcao|Chair-type]] and [[espacadores/linha-construcao/espacadores-multiapoio-linha-construcao|Multi-Support]] spacers.',
        'Spacers for concrete mesh: used to properly position concrete mesh — truss-shaped reinforcement mainly used in industrial floors and pavements. The main examples are also the Chair-type and Multi-Support spacers.',
      ] },
      { type: 'p', text: 'Specific applications:' },
      { type: 'ul', items: [
        'Foundations: spacers ensure that foundation reinforcement is correctly positioned to provide adequate support and stability to the structure.',
        'Slabs and floors: essential for maintaining correct distance and positioning of reinforcement in concrete slabs and floors, preventing cracks and improving strength.',
        'Columns and pillars: spacers keep the steel bars in place while the concrete is poured, allowing the column or pillar to have the necessary strength to support the structure’s load.',
        'Walls: used in reinforced concrete walls to keep the reinforcement in place during pouring, ensuring strength and avoiding structural integrity problems.',
      ] },
      { type: 'p', text: 'Importance in civil construction:' },
      { type: 'ul', items: [
        'Durability: spacers help prevent cracks and spalling in concrete structures, ensuring the durability and service life of the building.',
        'Strength: proper reinforcement layout with the help of spacers improves the tensile and compressive strength of the concrete, making the structure more robust and safe.',
        'Corrosion prevention: the use of plastic spacers helps keep steel bars away from the formwork and the ground, reducing the risk of corrosion, especially in high-humidity areas.',
        'Precision and quality: by ensuring the correct positioning of reinforcement, spacers contribute to dimensional accuracy and prevent execution problems.',
        'Time and resource savings: the use of spacers simplifies the structure assembly process, reducing the need for corrections or rework.',
      ] },
      { type: 'p', text: 'In summary, plastic spacers play a crucial role in civil construction, ensuring the structural integrity, durability and safety of reinforced concrete buildings, while optimizing the construction process.' },
    ],
    es: [
      { type: 'p', text: 'Los espaciadores de plástico son elementos utilizados en la construcción civil para garantizar la correcta posición y distancia entre elementos estructurales, como barras de acero o armaduras, dentro de estructuras de concreto armado. Cumplen un papel fundamental para garantizar la calidad y durabilidad de las construcciones.' },
      { type: 'p', text: 'Tipos comunes de espaciadores de plástico:' },
      { type: 'ul', items: [
        'Espaciadores para armaduras verticales: se utilizan para mantener las barras de acero en una posición vertical correcta, manteniéndolas alejadas de los encofrados durante el vaciado. Los principales son los [[espacadores/linha-construcao/circular-aberto-linha-construcao|Espaciadores Circular Abierto]] y [[espacadores/linha-postes/circular-fechado-linha-postes|Circular Cerrado]].',
        'Espaciadores para armaduras horizontales: se usan para mantener la distancia adecuada entre capas de armadura en pisos o losas de concreto, evitando la aparición de fisuras no deseadas. Algunos ejemplos son los [[espacadores/linha-construcao/cadeirinha-linha-construcao|espaciadores tipo Silla]] y [[espacadores/linha-construcao/espacadores-multiapoio-linha-construcao|Multiapoyo]].',
        'Espaciadores para mallas de concreto: utilizados para posicionar adecuadamente mallas de concreto, armaduras en forma de celosía usadas principalmente en pisos industriales y pavimentos. Los principales ejemplos también son los espaciadores tipo Silla y Multiapoyo.',
      ] },
      { type: 'p', text: 'Aplicaciones específicas:' },
      { type: 'ul', items: [
        'Cimentaciones: los espaciadores garantizan que las armaduras de las cimentaciones estén correctamente posicionadas para brindar el soporte y la estabilidad adecuados a la estructura.',
        'Losas y pisos: son esenciales para mantener la distancia y el posicionamiento correcto de las armaduras en losas y pisos de concreto, previniendo grietas y mejorando la resistencia.',
        'Pilares y columnas: los espaciadores mantienen las barras de acero en su lugar mientras se aplica el concreto, permitiendo que el pilar o columna tenga la fuerza necesaria para soportar la carga de la estructura.',
        'Muros: se usan en muros de concreto armado para mantener la armadura en su lugar durante el vaciado, garantizando su resistencia y evitando problemas de integridad estructural.',
      ] },
      { type: 'p', text: 'Importancia en la construcción civil:' },
      { type: 'ul', items: [
        'Durabilidad: los espaciadores ayudan a prevenir la aparición de fisuras y desprendimientos en las estructuras de concreto, garantizando la durabilidad y vida útil de la construcción.',
        'Resistencia: una disposición adecuada de las armaduras con ayuda de los espaciadores mejora la resistencia a la tracción y a la compresión del concreto, haciendo la estructura más robusta y segura.',
        'Evitar la corrosión: el uso de espaciadores de plástico ayuda a mantener las barras de acero alejadas de los encofrados y del suelo, reduciendo el riesgo de corrosión, especialmente en zonas de alta humedad.',
        'Precisión y calidad: al garantizar el correcto posicionamiento de las armaduras, los espaciadores contribuyen a la precisión de las medidas y evitan problemas de ejecución.',
        'Ahorro de tiempo y recursos: el uso de espaciadores simplifica el proceso de montaje de las estructuras, reduciendo la necesidad de correcciones o retrabajos.',
      ] },
      { type: 'p', text: 'En resumen, los espaciadores de plástico cumplen un papel crucial en la construcción civil, garantizando la integridad estructural, durabilidad y seguridad de las edificaciones de concreto armado, al mismo tiempo que optimizan el proceso constructivo.' },
    ],
  },
});

// ---------------- POST 3 ----------------
const post3 = postShell({
  slug: POSTS_META[2].slug,
  title: POSTS_META[2].title,
  seoTitle: {
    pt: 'Telha de PVC: Vantagens e Kit de Vedação',
    en: 'PVC Roof Tiles: Advantages and Sealing Kit',
    es: 'Teja de PVC: Ventajas y Kit de Sellado',
  },
  img: POSTS_META[2].img,
  description: {
    pt: 'Por que a telha de PVC é leve, resistente à umidade e durável — e o papel do kit de vedação e fixação no ponto onde o telhado vaza.',
    en: 'Why PVC roof tiles are light, moisture-resistant and durable, and the role of the sealing and fixing kit at the leak point.',
    es: 'Por qué la teja de PVC es ligera, resistente a la humedad y duradera, y el papel del kit de sellado en el punto de filtración.',
  },
  ctaHeading: {
    pt: 'Se interessou pelos Kits de Vedação? Fale conosco agora e solicite seu orçamento!',
    en: 'Interested in our Sealing Kits? Contact us now and request your quote!',
    es: '¿Te interesan los Kits de Sellado? ¡Contáctanos ahora y solicita tu presupuesto!',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'As Telhas de PVC, aliadas ao Kit de Vedação e Fixação, apresentam várias vantagens que as tornam uma escolha popular para coberturas em diversos tipos de construções.' },
      { type: 'p', text: 'Aqui estão algumas das principais vantagens das telhas de PVC:' },
      { type: 'ul', items: [
        'Leveza: as telhas de PVC são significativamente mais leves em comparação com outros materiais de cobertura, como telhas de cerâmica ou fibrocimento. Isso facilita o manuseio durante o transporte e a instalação, além de reduzir a carga sobre a estrutura do telhado.',
        'Resistência à umidade: o PVC é naturalmente resistente à umidade, o que evita problemas como o apodrecimento ou a corrosão das telhas. São uma excelente escolha para ambientes úmidos ou áreas costeiras.',
        'Durabilidade: quando bem fabricadas e instaladas, as telhas de PVC podem ter uma vida útil considerável, geralmente durando entre 20 e 25 anos, sem precisar de substituição.',
      ] },
      { type: 'p', text: 'Fonte: ABITELHA' },
      { type: 'p', text: 'Quanto aos [[kit-vedacao|Kits de Vedação e Fixação]], eles são extremamente importantes para garantir o bom desempenho e a durabilidade das telhas de PVC na cobertura. Esses kits geralmente incluem elementos como parafusos especiais, chapéu e calhas, que desempenham funções essenciais:' },
      { type: 'ul', items: [
        'Vedação: os kits de vedação ajudam a proteger o interior do telhado contra a entrada de água, poeira e outros elementos indesejados. São fundamentais para evitar vazamentos e infiltrações.',
        'Fixação adequada: os parafusos e outros componentes do kit de fixação são projetados para prender firmemente as telhas ao ripamento do telhado, garantindo que fiquem seguras mesmo em condições de ventos fortes.',
        'Dilatação térmica: o PVC pode sofrer dilatação e contração com as variações de temperatura. Os kits de fixação são projetados para permitir essa movimentação sem danificar as telhas ou o telhado.',
      ] },
      { type: 'p', text: 'Em resumo, os kits de vedação e fixação são elementos essenciais para garantir a estanqueidade, a segurança e a durabilidade das telhas de PVC na cobertura. Portanto, ao instalar telhas de PVC, é crucial utilizar os kits recomendados pelo fabricante e seguir as instruções de instalação para obter os melhores resultados possíveis.' },
    ],
    en: [
      { type: 'p', text: 'PVC roof tiles, combined with a Sealing & Fixing Kit, offer several advantages that make them a popular choice for roofing in various types of construction.' },
      { type: 'p', text: 'Here are some of the main advantages of PVC roof tiles:' },
      { type: 'ul', items: [
        'Light weight: PVC tiles are significantly lighter compared to other roofing materials, such as ceramic or fiber cement tiles. This makes handling easier during transport and installation, and reduces the load on the roof structure.',
        'Moisture resistance: PVC is naturally resistant to moisture, which prevents problems such as rotting or corrosion of the tiles. They are an excellent choice for humid environments or coastal areas.',
        'Durability: when well manufactured and installed, PVC tiles can have a considerable service life, typically lasting between 20 and 25 years without needing replacement.',
      ] },
      { type: 'p', text: 'Source: ABITELHA' },
      { type: 'p', text: 'As for [[kit-vedacao|Sealing & Fixing Kits]], they are extremely important to ensure the good performance and durability of PVC tiles on the roof. These kits generally include elements such as special screws, hat pieces and gutters, which perform essential functions:' },
      { type: 'ul', items: [
        'Sealing: sealing kits help protect the inside of the roof against the entry of water, dust and other unwanted elements. They are essential to prevent leaks and infiltration.',
        'Proper fixing: the screws and other components of the fixing kit are designed to firmly attach the tiles to the roof battens, ensuring they stay secure even in strong wind conditions.',
        'Thermal expansion: PVC can expand and contract with temperature variations. Fixing kits are designed to allow this movement without damaging the tiles or the roof.',
      ] },
      { type: 'p', text: 'In summary, sealing and fixing kits are essential elements to ensure the water-tightness, safety and durability of PVC tiles on the roof. Therefore, when installing PVC tiles, it is crucial to use the kits recommended by the manufacturer and follow the installation instructions to get the best possible results.' },
    ],
    es: [
      { type: 'p', text: 'Las Tejas de PVC, junto con el Kit de Sellado y Fijación, presentan varias ventajas que las convierten en una opción popular para cubiertas en diversos tipos de construcciones.' },
      { type: 'p', text: 'Estas son algunas de las principales ventajas de las tejas de PVC:' },
      { type: 'ul', items: [
        'Ligereza: las tejas de PVC son significativamente más livianas en comparación con otros materiales de cubierta, como tejas de cerámica o fibrocemento. Esto facilita el manejo durante el transporte y la instalación, además de reducir la carga sobre la estructura del techo.',
        'Resistencia a la humedad: el PVC es naturalmente resistente a la humedad, lo que evita problemas como el deterioro o la corrosión de las tejas. Son una excelente opción para ambientes húmedos o zonas costeras.',
        'Durabilidad: cuando están bien fabricadas e instaladas, las tejas de PVC pueden tener una vida útil considerable, generalmente entre 20 y 25 años, sin necesidad de sustitución.',
      ] },
      { type: 'p', text: 'Fuente: ABITELHA' },
      { type: 'p', text: 'En cuanto a los [[kit-vedacao|Kits de Sellado y Fijación]], son extremadamente importantes para garantizar el buen desempeño y la durabilidad de las tejas de PVC en la cubierta. Estos kits generalmente incluyen elementos como tornillos especiales, sombrerete y canaletas, que cumplen funciones esenciales:' },
      { type: 'ul', items: [
        'Sellado: los kits de sellado ayudan a proteger el interior del techo contra la entrada de agua, polvo y otros elementos no deseados. Son fundamentales para evitar filtraciones.',
        'Fijación adecuada: los tornillos y otros componentes del kit de fijación están diseñados para sujetar firmemente las tejas al listonado del techo, garantizando que permanezcan seguras incluso con vientos fuertes.',
        'Dilatación térmica: el PVC puede sufrir dilatación y contracción con las variaciones de temperatura. Los kits de fijación están diseñados para permitir ese movimiento sin dañar las tejas ni el techo.',
      ] },
      { type: 'p', text: 'En resumen, los kits de sellado y fijación son elementos esenciales para garantizar la estanqueidad, la seguridad y la durabilidad de las tejas de PVC en la cubierta. Por lo tanto, al instalar tejas de PVC, es crucial utilizar los kits recomendados por el fabricante y seguir las instrucciones de instalación para obtener los mejores resultados posibles.' },
    ],
  },
});

// ---------------- POST 4 ----------------
const post4 = postShell({
  slug: POSTS_META[3].slug,
  title: POSTS_META[3].title,
  img: POSTS_META[3].img,
  description: {
    pt: 'Telha de PVC colonial, minionda, plan e trapezoidal: onde cada modelo se aplica e as cores disponíveis no kit de vedação Marcanti.',
    en: 'Colonial, minionda, plan and trapezoidal PVC roof tiles: where each model fits and the colors available in the Marcanti sealing kit.',
    es: 'Teja de PVC colonial, minionda, plan y trapezoidal: dónde aplica cada modelo y los colores del kit de sellado Marcanti.',
  },
  ctaHeading: {
    pt: 'Se interessou pelos Kits de Vedação? Fale conosco agora e solicite seu orçamento!',
    en: 'Interested in our Sealing Kits? Contact us now and request your quote!',
    es: '¿Te interesan los Kits de Sellado? ¡Contáctanos ahora y solicita tu presupuesto!',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'As telhas de PVC (Policloreto de Vinila) são uma opção popular para coberturas devido à sua durabilidade, leveza, facilidade de instalação e resistência a intempéries. Elas são comumente usadas em diversos tipos de construções, desde residências até instalações industriais e comerciais. Vamos explorar alguns aspectos importantes sobre sua utilização, principais modelos e cores.' },
      { type: 'p', text: 'Utilização: as telhas de PVC são mais frequentemente utilizadas em coberturas devido às suas características vantajosas. Elas oferecem proteção contra chuva, sol e vento, além de serem resistentes a mofo e não propensas a cupins ou outros insetos. Também são uma alternativa econômica em comparação com outros materiais de cobertura, como telhas de cerâmica ou metal.' },
      { type: 'p', text: 'Principais modelos:' },
      { type: 'ul', items: [
        'Telha colonial: com um design mais tradicional, a telha colonial de PVC imita a aparência de telhas cerâmicas, mas com a leveza e a praticidade do PVC. É bastante usada em projetos residenciais e comerciais onde se deseja manter a estética de uma cobertura com telhas tradicionais.',
        'Telha Plan: é uma opção atraente para coberturas com estética moderna e limpa. Sua versatilidade, facilidade de limpeza, resistência e disponibilidade em várias cores e acabamentos tornam-na uma escolha popular em muitos projetos de construção.',
        'Telha Trapezoidal: é uma excelente opção para coberturas devido ao seu design eficiente, resistência estrutural, capacidade de escoamento de água e facilidade de instalação. Sua versatilidade e disponibilidade em várias cores tornam-na uma escolha popular para uma ampla gama de projetos.',
        'Telha Minionda: é o modelo mais comum de telha de PVC e possui formato ondulado, permitindo um encaixe eficiente e uma boa vazão da água da chuva. É muito utilizada em construções residenciais, agrícolas e industriais.',
      ] },
      { type: 'p', text: 'Fonte: ABITELHA' },
      { type: 'p', text: 'Cores: as telhas de PVC estão disponíveis em uma variedade de cores, embora isso possa variar dependendo do fabricante. As cores mais comuns incluem:' },
      { type: 'ul', items: [
        'Branco: é uma cor muito popular, pois reflete a luz solar, contribuindo para manter a temperatura mais amena no interior da construção. Além disso, o branco é uma escolha estética neutra e versátil.',
        'Cerâmica: essa cor é frequentemente escolhida quando se deseja uma aparência mais próxima da tradicional telha de cerâmica.',
        'Marfim: é uma cor muito utilizada por quem procura uma estética mais sofisticada e atual, dando um charme muito grande ao telhado.',
        'Concreto: uma cor mais neutra e que cai muito bem em ambientes modernos e em lugares mais frios.',
      ] },
      { type: 'p', text: 'É importante mencionar que as cores disponíveis podem variar entre diferentes marcas e regiões. Ao escolher a cor da telha, considere também o clima local, o design geral da construção e quaisquer restrições estabelecidas pelas normas locais de planejamento e construção.' },
      { type: 'p', text: 'Também temos todos esses modelos e cores para o [[kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc|Kit de Vedação e Fixação para telhas de PVC]]. Faça logo a sua cotação!' },
    ],
    en: [
      { type: 'p', text: 'PVC (Polyvinyl Chloride) roof tiles are a popular roofing option due to their durability, light weight, ease of installation and weather resistance. They are commonly used in various types of construction, from residences to industrial and commercial facilities. Let’s explore some important aspects of their use, main models and colors.' },
      { type: 'p', text: 'Use: PVC tiles are most often used for roofing due to their advantageous characteristics. They offer protection against rain, sun and wind, and are resistant to mold and not prone to termites or other insects. They are also an economical alternative compared to other roofing materials, such as ceramic or metal tiles.' },
      { type: 'p', text: 'Main models:' },
      { type: 'ul', items: [
        'Colonial tile: with a more traditional design, the PVC colonial tile mimics the look of ceramic tiles, but with the light weight and practicality of PVC. It is widely used in residential and commercial projects where the aesthetic of a traditional tile roof is desired.',
        'Plan tile: an attractive option for roofs with a modern, clean look. Its versatility, ease of cleaning, strength and availability in various colors and finishes make it a popular choice in many construction projects.',
        'Trapezoidal tile: an excellent option for roofing due to its efficient design, structural strength, water drainage capacity and ease of installation. Its versatility and availability in various colors make it a popular choice for a wide range of projects.',
        'Minionda (wavy) tile: the most common PVC tile model, with a wavy shape that allows efficient interlocking and good rainwater drainage. It is widely used in residential, agricultural and industrial construction.',
      ] },
      { type: 'p', text: 'Source: ABITELHA' },
      { type: 'p', text: 'Colors: PVC tiles are available in a variety of colors, although this may vary depending on the manufacturer. The most common colors include:' },
      { type: 'ul', items: [
        'White: a very popular color, as it reflects sunlight, helping keep the interior of the building cooler. White is also a neutral, versatile aesthetic choice.',
        'Ceramic: this color is often chosen when a look closer to the traditional ceramic tile is desired.',
        'Ivory: a color widely used by those seeking a more sophisticated, contemporary look, giving the roof a lot of charm.',
        'Concrete: a more neutral color that looks great in modern settings and colder climates.',
      ] },
      { type: 'p', text: 'It’s worth noting that available colors may vary between different brands and regions. When choosing the tile color, also consider the local climate, the overall design of the building, and any restrictions set by local planning and building codes.' },
      { type: 'p', text: 'We also carry all these models and colors for the [[kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc|Sealing & Fixing Kit for PVC roof tiles]]. Get your quote today!' },
    ],
    es: [
      { type: 'p', text: 'Las tejas de PVC (Policloruro de Vinilo) son una opción popular para cubiertas debido a su durabilidad, ligereza, facilidad de instalación y resistencia a la intemperie. Se utilizan comúnmente en diversos tipos de construcciones, desde viviendas hasta instalaciones industriales y comerciales. Exploremos algunos aspectos importantes sobre su uso, principales modelos y colores.' },
      { type: 'p', text: 'Uso: las tejas de PVC se utilizan con mayor frecuencia en cubiertas debido a sus características ventajosas. Ofrecen protección contra la lluvia, el sol y el viento, además de ser resistentes al moho y poco propensas a termitas u otros insectos. También son una alternativa económica en comparación con otros materiales de cubierta, como las tejas de cerámica o metal.' },
      { type: 'p', text: 'Principales modelos:' },
      { type: 'ul', items: [
        'Teja colonial: con un diseño más tradicional, la teja colonial de PVC imita la apariencia de las tejas cerámicas, pero con la ligereza y practicidad del PVC. Se usa mucho en proyectos residenciales y comerciales donde se desea mantener la estética de una cubierta con tejas tradicionales.',
        'Teja Plan: es una opción atractiva para cubiertas con estética moderna y limpia. Su versatilidad, facilidad de limpieza, resistencia y disponibilidad en varios colores y acabados la convierten en una opción popular en muchos proyectos de construcción.',
        'Teja Trapezoidal: es una excelente opción para cubiertas gracias a su diseño eficiente, resistencia estructural, capacidad de evacuación de agua y facilidad de instalación. Su versatilidad y disponibilidad en varios colores la hacen popular para una amplia gama de proyectos.',
        'Teja Minionda: es el modelo más común de teja de PVC y tiene forma ondulada, lo que permite un encaje eficiente y una buena evacuación del agua de lluvia. Se utiliza mucho en construcciones residenciales, agrícolas e industriales.',
      ] },
      { type: 'p', text: 'Fuente: ABITELHA' },
      { type: 'p', text: 'Colores: las tejas de PVC están disponibles en una variedad de colores, aunque esto puede variar según el fabricante. Los colores más comunes incluyen:' },
      { type: 'ul', items: [
        'Blanco: un color muy popular, ya que refleja la luz solar, ayudando a mantener una temperatura más agradable en el interior de la construcción. Además, el blanco es una elección estética neutra y versátil.',
        'Cerámica: este color se elige con frecuencia cuando se desea una apariencia más cercana a la teja de cerámica tradicional.',
        'Marfil: un color muy utilizado por quienes buscan una estética más sofisticada y actual, dando un gran encanto al techo.',
        'Concreto: un color más neutro que combina muy bien en ambientes modernos y en lugares más fríos.',
      ] },
      { type: 'p', text: 'Es importante mencionar que los colores disponibles pueden variar entre diferentes marcas y regiones. Al elegir el color de la teja, considera también el clima local, el diseño general de la construcción y cualquier restricción establecida por las normas locales de planeamiento y construcción.' },
      { type: 'p', text: 'También contamos con todos estos modelos y colores para el [[kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc|Kit de Sellado y Fijación para tejas de PVC]]. ¡Solicita ya tu cotización!' },
    ],
  },
});

// ---------------- POST 5 ----------------
const post5 = postShell({
  slug: POSTS_META[4].slug,
  title: POSTS_META[4].title,
  img: POSTS_META[4].img,
  description: {
    pt: 'Por que as cocadinhas de argamassa não atendem à NBR 6118: dimensionamento, controle de qualidade e a alternativa em espaçador plástico.',
    en: 'Why mortar "cocadinha" spacers do not meet NBR 6118: sizing, quality control and the plastic spacer alternative.',
    es: 'Por qué las cocaditas de mortero no cumplen la NBR 6118: dimensionamiento, control de calidad y la alternativa en separador plástico.',
  },
  ctaHeading: {
    pt: 'Se interessou pelos nossos espaçadores? Fale conosco agora e solicite seu orçamento!',
    en: 'Interested in our spacers? Contact us now and request your quote!',
    es: '¿Te interesan nuestros espaciadores? ¡Contáctanos ahora y solicita tu presupuesto!',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'Popularmente conhecidos como “cocadinhas”, esses “espaçadores” têm a forma de pequenos blocos ou discos, geralmente feitos nos canteiros de obras com a sobra de concreto ou argamassa.' },
      { type: 'p', text: 'Embora os espaçadores de cocada sejam amplamente utilizados em algumas regiões no Brasil, eles não são recomendados ou adotados de maneira generalizada na engenharia civil por vários motivos:' },
      { type: 'p', text: 'Normas e padrões: as normas técnicas nacionais e internacionais para a construção civil, como a ABNT NBR 6118, não contemplam o uso de “espaçadores de cocada” como uma prática recomendada. Essas normas estabelecem diretrizes e requisitos para garantir a segurança e a qualidade das estruturas, e o uso de espaçadores padronizados e certificados é mais comum, como os espaçadores de plásticos que têm essas garantias de qualidade.' },
      { type: 'p', text: 'Dimensionamento inadequado: os espaçadores de cocada não possuem um dimensionamento estrutural adequado, ou seja, não são projetados levando em consideração os esforços e as deformações esperados na estrutura. Isso pode resultar em problemas de integridade estrutural, como concentração de tensões e redução da capacidade de carga.' },
      { type: 'p', text: 'Controle de qualidade: as cocadinhas apresentam variações de tamanho, forma e resistência, uma vez que são produzidas de forma artesanal ou em pequenas fábricas. Essa falta de padronização dificulta o controle de qualidade e a garantia de que os espaçadores atendam aos requisitos estabelecidos.' },
      { type: 'p', text: 'Alternativas mais eficientes: existem no mercado uma variedade de espaçadores de concreto, principalmente espaçadores de plásticos, certificados e projetados de acordo com as normas técnicas, que oferecem melhor desempenho estrutural e garantem a qualidade da obra. Aqui na MARCANTI, esses espaçadores são produzidos em larga escala e passam por um rigoroso controle de qualidade, proporcionando mais confiabilidade e segurança para os nossos clientes!' },
      { type: 'p', text: 'Para não colocar sua obra em risco, você deve parar de usar as cocadinhas!' },
      { type: 'p', text: 'Procure a MARCANTI e solicite agora mesmo seu orçamento dos [[espacadores|espaçadores de plástico]]!' },
      { type: 'p', text: 'Fonte: ABITELHA' },
    ],
    en: [
      { type: 'p', text: 'Popularly known in Brazil as “cocadinhas” (little coconut candies, for their shape), these makeshift “spacers” are small blocks or discs, usually made on the job site from leftover concrete or mortar.' },
      { type: 'p', text: 'Although cocada spacers are widely used in some regions of Brazil, they are not recommended or broadly adopted in civil engineering, for several reasons:' },
      { type: 'p', text: 'Standards and codes: national and international technical standards for civil construction, such as ABNT NBR 6118, do not include the use of “cocada spacers” as a recommended practice. These standards set out guidelines and requirements to ensure the safety and quality of structures, and the use of standardized, certified spacers — such as plastic spacers, which carry these quality guarantees — is far more common.' },
      { type: 'p', text: 'Inadequate sizing: cocada spacers have no proper structural sizing — that is, they are not designed taking into account the expected loads and deformations of the structure. This can result in structural integrity problems, such as stress concentration and reduced load-bearing capacity.' },
      { type: 'p', text: 'Quality control: cocadinhas show variations in size, shape and strength, since they are made by hand or in small workshops. This lack of standardization makes quality control difficult and hinders any guarantee that the spacers meet established requirements.' },
      { type: 'p', text: 'More efficient alternatives: the market offers a variety of concrete spacers — mainly plastic spacers — that are certified and designed according to technical standards, offering better structural performance and ensuring the quality of the work. Here at MARCANTI, these spacers are produced at scale and undergo rigorous quality control, providing greater reliability and safety for our clients!' },
      { type: 'p', text: 'To avoid putting your project at risk, you should stop using cocadinhas!' },
      { type: 'p', text: 'Reach out to MARCANTI and request your [[espacadores|plastic spacer]] quote right now!' },
      { type: 'p', text: 'Source: ABITELHA' },
    ],
    es: [
      { type: 'p', text: 'Conocidos popularmente en Brasil como “cocaditas” (por su forma), estos “espaciadores” improvisados tienen forma de pequeños bloques o discos, generalmente hechos en la propia obra con sobras de concreto o mortero.' },
      { type: 'p', text: 'Aunque los espaciadores de cocada son ampliamente utilizados en algunas regiones de Brasil, no son recomendados ni adoptados de manera generalizada en la ingeniería civil, por varios motivos:' },
      { type: 'p', text: 'Normas y estándares: las normas técnicas nacionales e internacionales para la construcción civil, como la ABNT NBR 6118, no contemplan el uso de “espaciadores de cocada” como una práctica recomendada. Estas normas establecen directrices y requisitos para garantizar la seguridad y calidad de las estructuras, y es mucho más común el uso de espaciadores estandarizados y certificados, como los espaciadores de plástico, que cuentan con esas garantías de calidad.' },
      { type: 'p', text: 'Dimensionamiento inadecuado: los espaciadores de cocada no tienen un dimensionamiento estructural adecuado, es decir, no están diseñados considerando los esfuerzos y deformaciones esperados en la estructura. Esto puede resultar en problemas de integridad estructural, como concentración de tensiones y reducción de la capacidad de carga.' },
      { type: 'p', text: 'Control de calidad: las cocaditas presentan variaciones de tamaño, forma y resistencia, ya que se producen de forma artesanal o en pequeños talleres. Esta falta de estandarización dificulta el control de calidad y la garantía de que los espaciadores cumplan con los requisitos establecidos.' },
      { type: 'p', text: 'Alternativas más eficientes: en el mercado existe una variedad de espaciadores de concreto, principalmente espaciadores de plástico, certificados y diseñados conforme a las normas técnicas, que ofrecen mejor desempeño estructural y garantizan la calidad de la obra. Aquí en MARCANTI, estos espaciadores se producen a gran escala y pasan por un riguroso control de calidad, brindando más confiabilidad y seguridad a nuestros clientes.' },
      { type: 'p', text: '¡Para no poner en riesgo tu obra, debes dejar de usar las cocaditas!' },
      { type: 'p', text: '¡Contacta a MARCANTI y solicita ahora mismo tu presupuesto de [[espacadores|espaciadores de plástico]]!' },
      { type: 'p', text: 'Fuente: ABITELHA' },
    ],
  },
});


// ---------------- POST 6: COBRIMENTO ----------------
const post6 = postShell({
  slug: POSTS_META[5].slug,
  title: POSTS_META[5].title,
  seoTitle: {
    pt: 'Cobrimento de Armadura e o Espaçador Correto',
    en: 'Concrete Cover and the Right Spacer',
    es: 'Recubrimiento de Armadura y el Separador Correcto',
  },
  img: POSTS_META[5].img,
  description: {
    pt: 'O que é cobrimento, quem define o valor e como traduzir esse número no modelo de espaçador certo para cada posição da armadura.',
    en: 'What concrete cover is, who defines the value, and how to translate that number into the right spacer model for each rebar position.',
    es: 'Qué es el recubrimiento, quién define el valor y cómo traducir ese número en el modelo de separador correcto para cada posición.',
  },
  ctaHeading: {
    pt: 'Tem o cobrimento do projeto em mãos? Envie a lista e recebe a cotação.',
    en: 'Have the cover from your design? Send us the list and get a quote.',
    es: '¿Tienes el recubrimiento del proyecto? Envía la lista y recibe la cotización.',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'Cobrimento é a distância entre a face externa da armadura e a superfície do concreto. É esse trecho de concreto que protege o aço — e é ele que o espaçador existe para garantir.' },
      { type: 'h2', text: 'Quem define o cobrimento' },
      { type: 'p', text: 'O valor não é escolha de obra: vem do projeto estrutural. A ABNT NBR 6118 estabelece cobrimentos mínimos em função da classe de agressividade ambiental do local e do tipo de elemento estrutural, e o projetista aplica esses mínimos ao dimensionar a peça. Consulte a norma e o projeto — não existe um número universal que sirva para toda obra.' },
      { type: 'p', text: 'O que o canteiro decide é outra coisa: como fazer aquele cobrimento acontecer na prática, do primeiro ao último ponto da armadura. Aí entra o espaçador.' },
      { type: 'h2', text: 'Do número do projeto ao modelo do espaçador' },
      { type: 'p', text: 'Definido o cobrimento, faltam duas informações para escolher a peça: a posição da armadura e a bitola do aço.' },
      { type: 'ul', items: [
        'Armadura vertical — pilar, lateral de viga, poste, cortina de contenção. O espaçador precisa envolver ou abraçar a barra e apoiar na fôrma pela lateral. É o caso do [[' + CA + '|circular aberto]] e do circular fechado.',
        'Armadura horizontal — fundo de viga, laje, piso. O espaçador precisa sustentar o peso da armadura por baixo, apoiado na fôrma. É o caso da [[' + CD + '|cadeirinha]] e do [[' + MA + '|multiapoio]].',
        'Armadura horizontal pesada — laje espessa, sapata, bloco de fundação. A carga sobre cada ponto de apoio é maior e o modelo precisa ser reforçado, como a [[' + CDP + '|cadeirinha pesado]].',
      ] },
      { type: 'p', text: 'A bitola entra porque o encaixe do espaçador tem um limite: uma peça dimensionada para vergalhão fino não trava uma barra grossa, e o cobrimento deixa de ser garantido justamente onde a armadura é mais pesada.' },
      { type: 'h2', text: 'Erros que aparecem na obra' },
      { type: 'ul', items: [
        'Usar sobra de argamassa no lugar do espaçador. A peça não tem dimensão controlada, absorve água e se desagrega no manuseio — [[' + COC + '|já tratamos disso em outro post]].',
        'Escolher o modelo pelo cobrimento e esquecer a bitola. O espaçador até apoia, mas não trava a barra.',
        'Espaçar demais os pontos de apoio. Entre um espaçador e outro a armadura cede, e o cobrimento medido no ponto de apoio não é o cobrimento real do vão.',
        'Misturar cobrimentos na mesma peça. Se metade da laje está com 20 mm e metade com 30 mm, o projeto não foi cumprido em nenhuma das duas.',
      ] },
      { type: 'h2', text: 'A linha Marcanti em números' },
      { type: 'p', text: 'Nossos [[' + E + '|espaçadores]] cobrem de 15 a 50 mm de cobrimento e bitolas de 4,2 a 25 mm, em modelos para armadura vertical e horizontal. Cada página de produto traz a tabela completa de medidas — modelo, dimensões e bitola máxima — para você conferir contra o projeto antes de pedir.' },
    ],
    en: [
      { type: 'p', text: 'Concrete cover is the distance between the outer face of the reinforcement and the surface of the concrete. That layer of concrete is what protects the steel — and it is what the spacer exists to guarantee.' },
      { type: 'h2', text: 'Who defines the cover' },
      { type: 'p', text: 'The value is not a site decision: it comes from the structural design. In Brazil, ABNT NBR 6118 sets minimum covers according to the environmental aggressiveness class of the location and the type of structural element, and the designer applies those minimums when sizing the part. Check the standard and the design — there is no universal number that fits every job.' },
      { type: 'p', text: 'What the site decides is a different thing: how to make that cover actually happen, from the first to the last point of the reinforcement. That is where the spacer comes in.' },
      { type: 'h2', text: 'From the design number to the spacer model' },
      { type: 'p', text: 'Once the cover is set, two pieces of information are still missing: the position of the reinforcement and the rebar gauge.' },
      { type: 'ul', items: [
        'Vertical reinforcement — column, beam side, pole, retaining wall. The spacer has to wrap or grip the bar and bear against the formwork sideways. That is the [[' + CA + '|open circular]] and the closed circular.',
        'Horizontal reinforcement — beam soffit, slab, floor. The spacer has to carry the weight of the reinforcement from below, bearing on the formwork. That is the [[' + CD + '|chair]] and the [[' + MA + '|multi-support]].',
        'Heavy horizontal reinforcement — thick slab, footing, pile cap. The load on each support point is higher and the model has to be reinforced, like the [[' + CDP + '|heavy chair]].',
      ] },
      { type: 'p', text: 'The gauge matters because the spacer clip has a limit: a part sized for thin rebar will not lock a thick bar, and the cover stops being guaranteed exactly where the reinforcement is heaviest.' },
      { type: 'h2', text: 'Mistakes that show up on site' },
      { type: 'ul', items: [
        'Using leftover mortar instead of a spacer. The piece has no controlled dimension, absorbs water and crumbles in handling — [[' + COC + '|we covered that in another post]].',
        'Choosing the model by cover and forgetting the gauge. The spacer holds the bar up, but does not lock it.',
        'Spacing the support points too far apart. The reinforcement sags between spacers, and the cover measured at the support is not the real cover in the span.',
        'Mixing covers in the same element. If half the slab is at 20 mm and half at 30 mm, the design was met in neither.',
      ] },
      { type: 'h2', text: 'The Marcanti range in numbers' },
      { type: 'p', text: 'Our [[' + E + '|spacers]] cover 15 to 50 mm and rebar from 4.2 to 25 mm, in models for vertical and horizontal reinforcement. Every product page carries the full measurement table — model, dimensions and maximum gauge — so you can check it against the design before ordering.' },
    ],
    es: [
      { type: 'p', text: 'El recubrimiento es la distancia entre la cara externa de la armadura y la superficie del concreto. Esa capa de concreto es la que protege el acero — y es la que el separador existe para garantizar.' },
      { type: 'h2', text: 'Quién define el recubrimiento' },
      { type: 'p', text: 'El valor no es decisión de obra: viene del proyecto estructural. En Brasil, la ABNT NBR 6118 establece recubrimientos mínimos según la clase de agresividad ambiental del lugar y el tipo de elemento estructural, y el proyectista aplica esos mínimos al dimensionar la pieza. Consulta la norma y el proyecto — no existe un número universal que sirva para toda obra.' },
      { type: 'p', text: 'Lo que la obra decide es otra cosa: cómo hacer que ese recubrimiento ocurra en la práctica, del primero al último punto de la armadura. Ahí entra el separador.' },
      { type: 'h2', text: 'Del número del proyecto al modelo de separador' },
      { type: 'p', text: 'Definido el recubrimiento, faltan dos datos para elegir la pieza: la posición de la armadura y el calibre de la varilla.' },
      { type: 'ul', items: [
        'Armadura vertical — pilar, lateral de viga, poste, muro de contención. El separador necesita envolver o sujetar la barra y apoyar lateralmente en el encofrado. Es el caso del [[' + CA + '|circular abierto]] y del circular cerrado.',
        'Armadura horizontal — fondo de viga, losa, piso. El separador necesita sostener el peso de la armadura por debajo, apoyado en el encofrado. Es el caso de la [[' + CD + '|silla]] y del [[' + MA + '|multiapoyo]].',
        'Armadura horizontal pesada — losa gruesa, zapata, bloque de cimentación. La carga sobre cada punto de apoyo es mayor y el modelo necesita ser reforzado, como la [[' + CDP + '|silla pesada]].',
      ] },
      { type: 'p', text: 'El calibre importa porque el encaje del separador tiene un límite: una pieza dimensionada para varilla delgada no traba una barra gruesa, y el recubrimiento deja de estar garantizado justo donde la armadura es más pesada.' },
      { type: 'h2', text: 'Errores que aparecen en obra' },
      { type: 'ul', items: [
        'Usar sobra de mortero en lugar del separador. La pieza no tiene dimensión controlada, absorbe agua y se desagrega al manipularla — [[' + COC + '|ya lo tratamos en otro post]].',
        'Elegir el modelo por el recubrimiento y olvidar el calibre. El separador apoya, pero no traba la barra.',
        'Separar demasiado los puntos de apoyo. Entre un separador y otro la armadura cede, y el recubrimiento medido en el apoyo no es el real del vano.',
        'Mezclar recubrimientos en la misma pieza. Si media losa está con 20 mm y media con 30 mm, el proyecto no se cumplió en ninguna de las dos.',
      ] },
      { type: 'h2', text: 'La línea Marcanti en números' },
      { type: 'p', text: 'Nuestros [[' + E + '|espaciadores]] cubren de 15 a 50 mm de recubrimiento y calibres de 4,2 a 25 mm, en modelos para armadura vertical y horizontal. Cada página de producto trae la tabla completa de medidas — modelo, dimensiones y calibre máximo — para verificar contra el proyecto antes de pedir.' },
    ],
  },
});

// ---------------- POST 7: QUANTOS ESPAÇADORES POR m² ----------------
const post7 = postShell({
  slug: POSTS_META[6].slug,
  title: POSTS_META[6].title,
  img: POSTS_META[6].img,
  description: {
    pt: 'Não existe número único: a quantidade depende da bitola, do peso da malha e do tipo de espaçador. Veja o que define o espaçamento entre apoios.',
    en: 'There is no single number: quantity depends on rebar gauge, mesh weight and spacer type. Here is what actually sets the spacing between supports.',
    es: 'No existe un número único: la cantidad depende del calibre, del peso de la malla y del tipo de separador. Qué define el espaciamiento entre apoyos.',
  },
  ctaHeading: {
    pt: 'Descreva a laje na cotação que ajudamos a dimensionar a quantidade.',
    en: 'Describe the slab in your quote request and we will help size the quantity.',
    es: 'Describe la losa en la cotización y ayudamos a dimensionar la cantidad.',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'É a pergunta mais comum na hora de comprar, e a resposta honesta é que não existe um número que sirva para toda laje. O que existe é um critério — e ele é simples de aplicar.' },
      { type: 'h2', text: 'O critério: a armadura não pode ceder entre um apoio e outro' },
      { type: 'p', text: 'O cobrimento que interessa não é o que você mede em cima do espaçador. É o menor cobrimento da peça inteira, que quase sempre está no meio do vão entre dois apoios, onde a armadura cede pelo próprio peso e pelo peso de quem anda sobre ela durante a concretagem.' },
      { type: 'p', text: 'Se a malha visivelmente afunda entre dois espaçadores, o espaçamento está grande — independente de quantas peças por m² a conta deu.' },
      { type: 'h2', text: 'O que muda a quantidade' },
      { type: 'ul', items: [
        'Bitola do aço. Barra fina é menos rígida e cede em vão menor. A mesma laje pede mais pontos de apoio com bitola fina do que com bitola grossa.',
        'Peso da malha. Malha dupla ou com barras próximas carrega mais peso por metro quadrado sobre cada apoio.',
        'Tipo de espaçador. A [[' + CD + '|cadeirinha]] apoia em um ponto. O [[' + MA + '|multiapoio]] tem 120 mm de comprimento e apoia em vários pontos ao longo dessa extensão, o que reduz o número de peças por metro.',
        'Circulação durante a concretagem. Laje em que a equipe caminha sobre a armadura precisa de mais apoio do que laje concretada por bomba sem tráfego sobre a malha.',
        'Rigidez da fôrma. Fôrma que flexiona sob carga muda o apoio do espaçador e, com ele, o cobrimento.',
      ] },
      { type: 'h2', text: 'Como decidir na prática' },
      { type: 'p', text: 'Quem define o espaçamento é o projeto ou o engenheiro responsável, considerando esses fatores. O que dá para fazer no canteiro é conferir antes de concretar: monte um trecho, ande sobre ele como a equipe vai andar, e olhe o vão entre apoios. Se afundou, aproxime.' },
      { type: 'p', text: 'Vale medir também nos pontos críticos — borda de laje, encontro com viga e região de maior circulação — em vez de medir só no meio de um pano tranquilo.' },
      { type: 'h2', text: 'O erro que estraga a conta' },
      { type: 'p', text: 'Usar peça de dimensão não controlada. Um espaçador que se desagrega no manuseio ou que varia de altura de uma peça para outra faz o cobrimento variar mesmo com o espaçamento certo — [[' + COC + '|é o problema das cocadinhas]].' },
      { type: 'p', text: 'Nossos [[' + E + '|espaçadores]] têm altura controlada por injeção, e cada página de produto traz a tabela de medidas para você calcular em cima de valor conhecido.' },
    ],
    en: [
      { type: 'p', text: 'It is the most common question at purchase time, and the honest answer is that there is no number that fits every slab. What exists is a criterion — and it is simple to apply.' },
      { type: 'h2', text: 'The criterion: the reinforcement must not sag between supports' },
      { type: 'p', text: 'The cover that matters is not the one you measure on top of the spacer. It is the smallest cover in the whole element, which is almost always at midspan between two supports, where the reinforcement sags under its own weight and under the weight of whoever walks on it during the pour.' },
      { type: 'p', text: 'If the mesh visibly dips between two spacers, the spacing is too wide — no matter what the pieces-per-square-metre calculation said.' },
      { type: 'h2', text: 'What changes the quantity' },
      { type: 'ul', items: [
        'Rebar gauge. A thin bar is less stiff and sags over a shorter span. The same slab needs more support points with thin rebar than with thick.',
        'Mesh weight. A double mesh, or one with closely spaced bars, puts more weight per square metre on each support.',
        'Spacer type. The [[' + CD + '|chair]] supports at one point. The [[' + MA + '|multi-support]] is 120 mm long and bears at several points along that length, which cuts the number of pieces per metre.',
        'Foot traffic during the pour. A slab where the crew walks on the reinforcement needs more support than one poured by pump with no traffic on the mesh.',
        'Formwork stiffness. Formwork that flexes under load changes how the spacer bears, and with it the cover.',
      ] },
      { type: 'h2', text: 'How to decide in practice' },
      { type: 'p', text: 'The spacing is set by the design or the responsible engineer, weighing those factors. What the site can do is check before pouring: lay a stretch, walk on it the way the crew will, and look at the span between supports. If it dipped, bring them closer.' },
      { type: 'p', text: 'It is also worth measuring at the critical points — slab edge, junction with the beam and the busiest area — instead of only in the middle of a quiet bay.' },
      { type: 'h2', text: 'The mistake that ruins the calculation' },
      { type: 'p', text: 'Using a piece with no controlled dimension. A spacer that crumbles in handling, or whose height varies from one piece to the next, makes the cover vary even with the right spacing — [[' + COC + '|that is the problem with mortar spacers]].' },
      { type: 'p', text: 'Our [[' + E + '|spacers]] have injection-controlled height, and every product page carries the measurement table so you can calculate on a known value.' },
    ],
    es: [
      { type: 'p', text: 'Es la pregunta más común a la hora de comprar, y la respuesta honesta es que no existe un número que sirva para toda losa. Lo que existe es un criterio — y es simple de aplicar.' },
      { type: 'h2', text: 'El criterio: la armadura no puede ceder entre un apoyo y otro' },
      { type: 'p', text: 'El recubrimiento que importa no es el que mides encima del separador. Es el menor recubrimiento de toda la pieza, que casi siempre está en el centro del vano entre dos apoyos, donde la armadura cede por su propio peso y por el de quien camina sobre ella durante el vaciado.' },
      { type: 'p', text: 'Si la malla se hunde visiblemente entre dos separadores, el espaciamiento es grande — sin importar cuántas piezas por m² dio la cuenta.' },
      { type: 'h2', text: 'Qué cambia la cantidad' },
      { type: 'ul', items: [
        'Calibre de la varilla. Una barra delgada es menos rígida y cede en un vano menor. La misma losa pide más puntos de apoyo con calibre delgado que con calibre grueso.',
        'Peso de la malla. Una malla doble o con barras próximas carga más peso por metro cuadrado sobre cada apoyo.',
        'Tipo de separador. La [[' + CD + '|silla]] apoya en un punto. El [[' + MA + '|multiapoyo]] tiene 120 mm de largo y apoya en varios puntos a lo largo de esa extensión, lo que reduce la cantidad de piezas por metro.',
        'Circulación durante el vaciado. Una losa en la que el equipo camina sobre la armadura necesita más apoyo que una vaciada por bomba sin tránsito sobre la malla.',
        'Rigidez del encofrado. Un encofrado que flexiona bajo carga cambia el apoyo del separador y, con él, el recubrimiento.',
      ] },
      { type: 'h2', text: 'Cómo decidir en la práctica' },
      { type: 'p', text: 'Quien define el espaciamiento es el proyecto o el ingeniero responsable, considerando esos factores. Lo que se puede hacer en obra es verificar antes de vaciar: monta un tramo, camina sobre él como lo hará el equipo y observa el vano entre apoyos. Si se hundió, acércalos.' },
      { type: 'p', text: 'Vale medir también en los puntos críticos — borde de losa, encuentro con la viga y zona de mayor circulación — en lugar de medir solo en el centro de un paño tranquilo.' },
      { type: 'h2', text: 'El error que arruina la cuenta' },
      { type: 'p', text: 'Usar una pieza sin dimensión controlada. Un separador que se desagrega al manipularlo, o cuya altura varía de una pieza a otra, hace variar el recubrimiento aun con el espaciamiento correcto — [[' + COC + '|es el problema de las cocaditas]].' },
      { type: 'p', text: 'Nuestros [[' + E + '|espaciadores]] tienen altura controlada por inyección, y cada página de producto trae la tabla de medidas para calcular sobre un valor conocido.' },
    ],
  },
});

// ---------------- POST 8: POR QUE A ARMADURA CORRÓI ----------------
const post8 = postShell({
  slug: POSTS_META[7].slug,
  title: POSTS_META[7].title,
  seoTitle: {
    pt: 'Por Que a Armadura Corrói e o Papel do Cobrimento',
    en: 'Why Reinforcement Corrodes and the Role of Cover',
    es: 'Por Qué se Corroe la Armadura y el Papel del Recubrimiento',
  },
  img: POSTS_META[7].img,
  description: {
    pt: 'O concreto protege o aço pela alcalinidade. Carbonatação e cloretos destroem essa proteção — e o cobrimento é o que decide em quanto tempo.',
    en: 'Concrete protects steel through alkalinity. Carbonation and chlorides destroy that protection — and cover is what decides how long it takes.',
    es: 'El concreto protege el acero por su alcalinidad. La carbonatación y los cloruros destruyen esa protección — el recubrimiento decide en cuánto tiempo.',
  },
  ctaHeading: {
    pt: 'Garanta o cobrimento do projeto: solicite sua cotação.',
    en: 'Deliver the cover your design calls for: request a quote.',
    es: 'Garantiza el recubrimiento del proyecto: solicita tu cotización.',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'Aço enferruja quando exposto a umidade e oxigênio. Dentro do concreto, não deveria enferrujar — e quando enferruja, quase sempre a causa está no cobrimento.' },
      { type: 'h2', text: 'Por que o aço não corrói dentro do concreto' },
      { type: 'p', text: 'O concreto é fortemente alcalino. Essa alcalinidade forma na superfície da barra uma película passivadora, uma camada muito fina que impede a reação de corrosão de avançar. Enquanto essa película existe, a armadura fica protegida mesmo em presença de umidade.' },
      { type: 'p', text: 'A corrosão só começa quando alguma coisa destrói essa proteção. E são duas coisas, basicamente.' },
      { type: 'h2', text: 'Carbonatação' },
      { type: 'p', text: 'O gás carbônico do ar penetra pelos poros do concreto e reage com ele, reduzindo a alcalinidade. Essa reação avança de fora para dentro, como uma frente que caminha lentamente em direção à armadura. Quando a frente de carbonatação alcança a barra, a película passivadora se desfaz e a corrosão passa a ser possível.' },
      { type: 'p', text: 'O cobrimento é exatamente a distância que essa frente precisa vencer. É por isso que ele não é detalhe de acabamento: é o que determina em quantos anos o problema chega até o aço.' },
      { type: 'h2', text: 'Cloretos' },
      { type: 'p', text: 'Em ambiente marinho — e boa parte da construção na Bahia é litorânea — há um segundo mecanismo. Os cloretos presentes no ar e na água do mar penetram no concreto e atacam a película passivadora localmente, sem precisar reduzir a alcalinidade do conjunto. A corrosão começa em pontos isolados e se aprofunda.' },
      { type: 'p', text: 'Nos dois casos, quanto mais espesso e mais compacto o cobrimento, mais tempo o agente leva para chegar à barra.' },
      { type: 'h2', text: 'Por que a corrosão se acelera sozinha' },
      { type: 'p', text: 'O produto da corrosão ocupa mais volume que o aço que o originou. Essa expansão pressiona o concreto de dentro para fora, fissura o cobrimento e depois o desplaca. Com o concreto desplacado, a barra fica exposta direto ao ambiente e o processo, que era lento, passa a ser rápido.' },
      { type: 'p', text: 'É o que se vê na foto acima: o cobrimento desplacado e a armadura à mostra, já com perda de seção.' },
      { type: 'h2', text: 'Onde o cobrimento falha na prática' },
      { type: 'ul', items: [
        'Espaçamento grande demais entre apoios: a armadura cede no meio do vão e o cobrimento real fica menor que o de projeto.',
        'Espaçador de dimensão não controlada, que varia de altura de uma peça para outra.',
        'Espaçador que absorve água. Uma peça porosa em contato com a barra cria um caminho de umidade atravessando justamente a camada que deveria proteger.',
        'Armadura encostada na fôrma em algum ponto, o que zera o cobrimento localmente.',
      ] },
      { type: 'p', text: 'Nossos [[' + E + '|espaçadores]] são injetados em plástico: não absorvem água, não se desagregam no manuseio e mantêm a mesma altura da primeira à última peça. Se você ainda está definindo o modelo, o [[blog/cobrimento-de-armadura-como-escolher-o-espacador|post sobre cobrimento]] mostra como traduzir o valor do projeto na peça certa.' },
    ],
    en: [
      { type: 'p', text: 'Steel rusts when exposed to moisture and oxygen. Inside concrete, it should not — and when it does, the cause is almost always the cover.' },
      { type: 'h2', text: 'Why steel does not corrode inside concrete' },
      { type: 'p', text: 'Concrete is strongly alkaline. That alkalinity forms a passivating film on the surface of the bar, a very thin layer that stops the corrosion reaction from progressing. As long as that film exists, the reinforcement stays protected even in the presence of moisture.' },
      { type: 'p', text: 'Corrosion only starts when something destroys that protection. And there are basically two things.' },
      { type: 'h2', text: 'Carbonation' },
      { type: 'p', text: 'Carbon dioxide from the air penetrates the pores of the concrete and reacts with it, lowering the alkalinity. That reaction advances from the outside in, like a front slowly moving towards the reinforcement. When the carbonation front reaches the bar, the passivating film breaks down and corrosion becomes possible.' },
      { type: 'p', text: 'The cover is exactly the distance that front has to cross. That is why it is not a finishing detail: it is what determines how many years it takes for the problem to reach the steel.' },
      { type: 'h2', text: 'Chlorides' },
      { type: 'p', text: 'In a marine environment — and much of the construction in Bahia is coastal — there is a second mechanism. Chlorides present in sea air and water penetrate the concrete and attack the passivating film locally, without having to lower the alkalinity of the whole mass. Corrosion starts at isolated points and deepens.' },
      { type: 'p', text: 'In both cases, the thicker and more compact the cover, the longer the agent takes to reach the bar.' },
      { type: 'h2', text: 'Why corrosion accelerates on its own' },
      { type: 'p', text: 'The product of corrosion takes up more volume than the steel it came from. That expansion presses the concrete from the inside out, cracks the cover and then spalls it. With the concrete spalled, the bar is exposed directly to the environment and the process, which was slow, becomes fast.' },
      { type: 'p', text: 'That is what the photo above shows: spalled cover and exposed reinforcement, already losing section.' },
      { type: 'h2', text: 'Where cover fails in practice' },
      { type: 'ul', items: [
        'Support points spaced too far apart: the reinforcement sags at midspan and the real cover ends up smaller than the design value.',
        'A spacer with no controlled dimension, whose height varies from one piece to the next.',
        'A spacer that absorbs water. A porous piece in contact with the bar creates a moisture path running straight through the layer that was meant to protect it.',
        'Reinforcement touching the formwork at some point, which takes the cover to zero locally.',
      ] },
      { type: 'p', text: 'Our [[' + E + '|spacers]] are injection-moulded in plastic: they do not absorb water, do not crumble in handling and keep the same height from the first piece to the last. If you are still choosing the model, the [[blog/cobrimento-de-armadura-como-escolher-o-espacador|post on concrete cover]] shows how to translate the design value into the right part.' },
    ],
    es: [
      { type: 'p', text: 'El acero se oxida cuando queda expuesto a humedad y oxígeno. Dentro del concreto no debería oxidarse — y cuando lo hace, la causa casi siempre está en el recubrimiento.' },
      { type: 'h2', text: 'Por qué el acero no se corroe dentro del concreto' },
      { type: 'p', text: 'El concreto es fuertemente alcalino. Esa alcalinidad forma en la superficie de la barra una película pasivadora, una capa muy delgada que impide que la reacción de corrosión avance. Mientras esa película existe, la armadura queda protegida incluso en presencia de humedad.' },
      { type: 'p', text: 'La corrosión solo empieza cuando algo destruye esa protección. Y son básicamente dos cosas.' },
      { type: 'h2', text: 'Carbonatación' },
      { type: 'p', text: 'El dióxido de carbono del aire penetra por los poros del concreto y reacciona con él, reduciendo la alcalinidad. Esa reacción avanza de afuera hacia adentro, como un frente que camina lentamente hacia la armadura. Cuando el frente de carbonatación alcanza la barra, la película pasivadora se deshace y la corrosión pasa a ser posible.' },
      { type: 'p', text: 'El recubrimiento es exactamente la distancia que ese frente tiene que vencer. Por eso no es un detalle de acabado: es lo que determina en cuántos años el problema llega al acero.' },
      { type: 'h2', text: 'Cloruros' },
      { type: 'p', text: 'En ambiente marino — y buena parte de la construcción en Bahía es costera — hay un segundo mecanismo. Los cloruros presentes en el aire y el agua de mar penetran en el concreto y atacan la película pasivadora localmente, sin necesidad de reducir la alcalinidad del conjunto. La corrosión empieza en puntos aislados y se profundiza.' },
      { type: 'p', text: 'En ambos casos, cuanto más espeso y más compacto el recubrimiento, más tiempo tarda el agente en llegar a la barra.' },
      { type: 'h2', text: 'Por qué la corrosión se acelera sola' },
      { type: 'p', text: 'El producto de la corrosión ocupa más volumen que el acero que lo originó. Esa expansión presiona el concreto de adentro hacia afuera, fisura el recubrimiento y después lo desprende. Con el concreto desprendido, la barra queda expuesta directamente al ambiente y el proceso, que era lento, pasa a ser rápido.' },
      { type: 'p', text: 'Es lo que se ve en la foto de arriba: el recubrimiento desprendido y la armadura a la vista, ya con pérdida de sección.' },
      { type: 'h2', text: 'Dónde falla el recubrimiento en la práctica' },
      { type: 'ul', items: [
        'Espaciamiento demasiado grande entre apoyos: la armadura cede en el centro del vano y el recubrimiento real queda menor que el del proyecto.',
        'Separador de dimensión no controlada, cuya altura varía de una pieza a otra.',
        'Separador que absorbe agua. Una pieza porosa en contacto con la barra crea un camino de humedad que atraviesa justamente la capa que debería protegerla.',
        'Armadura apoyada en el encofrado en algún punto, lo que anula el recubrimiento localmente.',
      ] },
      { type: 'p', text: 'Nuestros [[' + E + '|espaciadores]] son inyectados en plástico: no absorben agua, no se desagregan al manipularlos y mantienen la misma altura de la primera a la última pieza. Si aún estás definiendo el modelo, el [[blog/cobrimento-de-armadura-como-escolher-o-espacador|post sobre recubrimiento]] muestra cómo traducir el valor del proyecto en la pieza correcta.' },
    ],
  },
});

// ---------------- POST 9: TELHA DE PVC VAZANDO NO PARAFUSO ----------------
const post9 = postShell({
  slug: POSTS_META[8].slug,
  title: POSTS_META[8].title,
  seoTitle: {
    pt: 'Telha de PVC Vazando no Parafuso: Causas e Solução',
    en: 'PVC Tile Leaking at the Screw: Causes and Fix',
    es: 'Teja de PVC con Filtración en el Tornillo: Solución',
  },
  img: POSTS_META[8].img,
  description: {
    pt: 'O furo do parafuso é o ponto fraco de qualquer telhado. No PVC, a dilatação térmica trabalha o furo. Causas comuns e como vedar de verdade.',
    en: 'The screw hole is the weak point of any roof. In PVC, thermal expansion works the hole open. Common causes and how to seal it properly.',
    es: 'El orificio del tornillo es el punto débil de cualquier techo. En PVC, la dilatación térmica trabaja el orificio. Causas y cómo sellarlo.',
  },
  ctaHeading: {
    pt: 'Precisa resolver a vedação? Solicite sua cotação do kit.',
    en: 'Need to fix the sealing? Request a quote for the kit.',
    es: '¿Necesitas resolver el sellado? Solicita tu cotización del kit.',
  },
  blocks: {
    pt: [
      { type: 'p', text: 'Telhado que goteja quase nunca vaza pelo meio da telha. Vaza no furo — o único lugar onde alguém abriu a cobertura de propósito para passar o parafuso.' },
      { type: 'h2', text: 'Por que o PVC agrava o problema' },
      { type: 'p', text: 'O PVC tem coeficiente de dilatação térmica alto. Uma telha exposta ao sol se expande durante o dia e contrai à noite, e essa movimentação é maior que a de outros materiais de cobertura. O parafuso, fixado na estrutura, não acompanha. O resultado é que a telha trabalha contra o parafuso, ciclo após ciclo, e o furo vai abrindo.' },
      { type: 'p', text: 'Por isso uma vedação que funcionou no primeiro mês pode falhar depois de uma estação: não é o material da vedação que necessariamente falhou, é o furo que aumentou.' },
      { type: 'h2', text: 'As causas mais comuns' },
      { type: 'ul', items: [
        'Furo maior que o necessário. Broca acima do diâmetro do parafuso deixa folga que nenhuma arruela cobre bem depois que a telha começa a trabalhar.',
        'Parafuso na parte baixa da onda. É por ali que a água escorre. O ponto de fixação tem que ficar na crista.',
        'Arruela de borracha genérica. Sem proteção contra o sol, endurece e trinca. É a peça que costuma falhar primeiro.',
        'Aperto excessivo. Apertar até deformar a telha em volta do furo cria um ponto de tensão permanente, e a trinca aparece a partir dele.',
        'Cabeça do parafuso exposta. Sem uma peça cobrindo, a cabeça acumula água e a folga fica sempre em contato com ela.',
        'Adaptação com massa ou silicone. Resolve por uma temporada e depois descola, porque a telha continua se movendo e a massa não.',
      ] },
      { type: 'h2', text: 'Como vedar de verdade' },
      { type: 'p', text: 'A solução é usar uma peça projetada para o ponto de fixação, em vez de improvisar em cima dele. O [[' + K + '|kit de vedação]] da Marcanti trabalha em três partes: a capa distribui a pressão do aperto numa área maior, em vez de concentrar em volta do furo; o anel de vedação fecha a passagem; e o chapéu cobre a cabeça do parafuso, tirando ela do contato direto com a água.' },
      { type: 'p', text: 'Como as peças são injetadas para essa função, a vedação continua fechada enquanto a telha se movimenta, que é exatamente o que a adaptação improvisada não consegue fazer.' },
      { type: 'h2', text: 'Na hora de instalar' },
      { type: 'ul', items: [
        'Fure na crista da onda, nunca na parte baixa.',
        'Use broca compatível com o parafuso, sem folga extra.',
        'Aperte até a vedação assentar, sem deformar a telha.',
        'Escolha a cor do kit conforme a telha — cerâmica, marfim, branco ou concreto.',
      ] },
      { type: 'p', text: 'Se a fixação for feita junto com a vedação, o [[' + KF + '|kit com parafuso incluso]] já traz o conjunto completo, com parafuso de 2,5 ou 3,5 polegadas conforme o modelo da telha.' },
    ],
    en: [
      { type: 'p', text: 'A dripping roof almost never leaks through the middle of the tile. It leaks at the hole — the one place where someone deliberately opened the covering to pass a screw through.' },
      { type: 'h2', text: 'Why PVC makes the problem worse' },
      { type: 'p', text: 'PVC has a high coefficient of thermal expansion. A tile in the sun expands during the day and contracts at night, and that movement is greater than in other roofing materials. The screw, fixed to the structure, does not follow. The result is that the tile works against the screw, cycle after cycle, and the hole gradually opens up.' },
      { type: 'p', text: 'That is why a seal that worked in the first month can fail after one season: it is not necessarily the sealing material that failed, it is the hole that got bigger.' },
      { type: 'h2', text: 'The most common causes' },
      { type: 'ul', items: [
        'A hole larger than needed. A drill bit above the screw diameter leaves a gap that no washer covers well once the tile starts moving.',
        'Screw in the valley of the wave. That is where the water runs. The fastening point has to be on the crest.',
        'A generic rubber washer. With no protection from the sun it hardens and cracks. It is usually the first part to fail.',
        'Over-tightening. Tightening until the tile deforms around the hole creates a permanent stress point, and the crack starts from there.',
        'Exposed screw head. With nothing covering it, the head collects water and the gap stays in permanent contact with it.',
        'Patching with mortar or silicone. It holds for a season and then peels off, because the tile keeps moving and the patch does not.',
      ] },
      { type: 'h2', text: 'How to seal it properly' },
      { type: 'p', text: 'The fix is to use a part designed for the fastening point instead of improvising over it. The Marcanti [[' + K + '|sealing kit]] works in three parts: the cap spreads the tightening pressure over a wider area instead of concentrating it around the hole; the sealing ring closes the passage; and the hat covers the screw head, taking it out of direct contact with water.' },
      { type: 'p', text: 'Because the parts are moulded for that job, the seal stays closed while the tile moves — which is exactly what an improvised patch cannot do.' },
      { type: 'h2', text: 'When installing' },
      { type: 'ul', items: [
        'Drill on the crest of the wave, never in the valley.',
        'Use a bit matched to the screw, with no extra clearance.',
        'Tighten until the seal seats, without deforming the tile.',
        'Choose the kit colour to match the tile — ceramic, ivory, white or concrete.',
      ] },
      { type: 'p', text: 'If the fixing is done together with the sealing, the [[' + KF + '|kit with the screw included]] comes as a complete set, with a 2.5 or 3.5 inch screw depending on the tile model.' },
    ],
    es: [
      { type: 'p', text: 'Un techo que gotea casi nunca filtra por el medio de la teja. Filtra en el orificio — el único lugar donde alguien abrió la cubierta a propósito para pasar el tornillo.' },
      { type: 'h2', text: 'Por qué el PVC agrava el problema' },
      { type: 'p', text: 'El PVC tiene un coeficiente de dilatación térmica alto. Una teja expuesta al sol se expande durante el día y se contrae de noche, y ese movimiento es mayor que el de otros materiales de cubierta. El tornillo, fijado a la estructura, no lo acompaña. El resultado es que la teja trabaja contra el tornillo, ciclo tras ciclo, y el orificio se va abriendo.' },
      { type: 'p', text: 'Por eso un sellado que funcionó el primer mes puede fallar después de una temporada: no es necesariamente el material del sellado el que falló, es el orificio que se agrandó.' },
      { type: 'h2', text: 'Las causas más comunes' },
      { type: 'ul', items: [
        'Orificio mayor que el necesario. Una broca por encima del diámetro del tornillo deja holgura que ninguna arandela cubre bien una vez que la teja empieza a trabajar.',
        'Tornillo en la parte baja de la onda. Es por ahí donde escurre el agua. El punto de fijación tiene que quedar en la cresta.',
        'Arandela de goma genérica. Sin protección contra el sol, se endurece y se agrieta. Suele ser la primera pieza en fallar.',
        'Apriete excesivo. Apretar hasta deformar la teja alrededor del orificio crea un punto de tensión permanente, y la grieta empieza ahí.',
        'Cabeza del tornillo expuesta. Sin una pieza que la cubra, la cabeza acumula agua y la holgura queda siempre en contacto con ella.',
        'Parche con masilla o silicona. Aguanta una temporada y después se despega, porque la teja sigue moviéndose y el parche no.',
      ] },
      { type: 'h2', text: 'Cómo sellar de verdad' },
      { type: 'p', text: 'La solución es usar una pieza diseñada para el punto de fijación, en lugar de improvisar sobre él. El [[' + K + '|kit de sellado]] de Marcanti trabaja en tres partes: la capa distribuye la presión del apriete en un área mayor, en lugar de concentrarla alrededor del orificio; el anillo de sellado cierra el paso; y el sombrerete cubre la cabeza del tornillo, sacándola del contacto directo con el agua.' },
      { type: 'p', text: 'Como las piezas están inyectadas para esa función, el sellado sigue cerrado mientras la teja se mueve, que es exactamente lo que la adaptación improvisada no consigue hacer.' },
      { type: 'h2', text: 'A la hora de instalar' },
      { type: 'ul', items: [
        'Perfora en la cresta de la onda, nunca en la parte baja.',
        'Usa una broca compatible con el tornillo, sin holgura extra.',
        'Aprieta hasta que el sellado asiente, sin deformar la teja.',
        'Elige el color del kit según la teja — cerámica, marfil, blanco o concreto.',
      ] },
      { type: 'p', text: 'Si la fijación se hace junto con el sellado, el [[' + KF + '|kit con tornillo incluido]] ya trae el conjunto completo, con tornillo de 2,5 o 3,5 pulgadas según el modelo de la teja.' },
    ],
  },
});


module.exports = [index, post1, post2, post3, post4, post5, post6, post7, post8, post9];
