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
];

function renderBlocks(blocks) {
  return blocks.map((b) => {
    if (b.type === 'p') return `<p>${b.text}</p>`;
    if (b.type === 'ul') return `<ul class="icon-list">${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    if (b.type === 'h2') return `<h2>${b.text}</h2>`;
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
    <h3>${ui.recentPosts[lang]}</h3>
    <div class="card-grid">
      ${others.map((p) => `<a class="card" href="${T.url(lang, 'blog/' + p.slug)}">
        <img src="${T.asset('img/' + p.img)}" alt="${p.title[lang]}" loading="lazy">
        <div class="card-body"><h3>${p.title[lang]}</h3><span class="card-link">${ui.readMore[lang]} &rarr;</span></div>
      </a>`).join('')}
    </div>
  </div>`;
}

function postShell({ slug, title, ctaHeading, blocks }) {
  return {
    slug: `blog/${slug}`,
    title: { pt: `${title.pt} – Marcanti`, en: `${title.en} – Marcanti`, es: `${title.es} – Marcanti` },
    description: {
      pt: blocks.pt.find((b) => b.type === 'p').text.slice(0, 155),
      en: blocks.en.find((b) => b.type === 'p').text.slice(0, 155),
      es: blocks.es.find((b) => b.type === 'p').text.slice(0, 155),
    },
    body(lang) {
      return `
${T.pageHero({ eyebrow: ui.ourBlog[lang], title: title[lang], bg: 'Quem-Somos.jpg', tag: 'h2', warm: true, divider: true })}
<section>
  <div class="container">
    ${T.crumbs(lang, [{ label: ui.ourBlog[lang], slug: 'blog' }, { label: title[lang] }])}
    <div class="blog-post-body">
      ${renderBlocks(blocks[lang])}
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
  title: { pt: 'Blog – Marcanti', en: 'Blog – Marcanti', es: 'Blog – Marcanti' },
  description: {
    pt: 'Descubra o mundo fascinante da indústria de plásticos e acompanhe as últimas tendências e inovações no blog da MARCANTI.',
    en: 'Discover the fascinating world of the plastics industry and follow the latest trends and innovations on the MARCANTI blog.',
    es: 'Descubre el fascinante mundo de la industria de plásticos y sigue las últimas tendencias e innovaciones en el blog de MARCANTI.',
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
${T.pageHero({ title: { pt: 'Blog', en: 'Blog', es: 'Blog' }[lang], subtitle: intro, bg: 'Quem-Somos.jpg', tag: 'h3', divider: true, warm: true })}
${T.cardGrid({ cards, cols: 3 })}
`;
  },
};

// ---------------- POST 1 ----------------
const post1 = postShell({
  slug: POSTS_META[0].slug,
  title: POSTS_META[0].title,
  blocks: {
    pt: [
      { type: 'p', text: 'Os espaçadores de plástico têm um papel importante na sustentação e durabilidade das construções modernas. São componentes discretos, muitas vezes pequenos e de aparência simples, mas desempenham uma função crucial para garantir a qualidade e a integridade das estruturas.' },
      { type: 'p', text: 'Os espaçadores de plástico são utilizados em diversos contextos na construção civil, mas são mais comumente empregados na montagem de armaduras em estruturas de concreto armado. Sua principal função é manter o espaçamento adequado entre as barras de aço que compõem a armadura, garantindo que elas estejam corretamente posicionadas em relação ao concreto circundante.' },
      { type: 'p', text: 'Além de sua função de suporte e espaçamento, esses dispositivos têm impacto direto na sustentabilidade das construções, e aqui estão alguns pontos importantes:' },
      { type: 'ul', items: [
        'Redução do consumo de aço: ao utilizar espaçadores, é possível garantir que a quantidade correta de aço seja utilizada em cada estrutura, evitando desperdícios. O uso eficiente dos recursos é uma prática essencial para tornar a indústria da construção mais sustentável.',
        'Durabilidade das estruturas: o correto posicionamento das armaduras com o auxílio dos espaçadores contribui para a durabilidade das construções. O concreto armado é vulnerável à corrosão das barras de aço, que pode ocorrer caso haja contato direto entre as barras e o concreto. Os espaçadores ajudam a evitar esse problema, aumentando a vida útil da estrutura.',
        'Eficiência energética: estruturas bem projetadas e executadas com o auxílio de espaçadores adequados podem resultar em edificações mais eficientes energeticamente, já que uma estrutura bem montada reduz as chances de problemas futuros, como vazamentos ou rachaduras.',
        'Redução de resíduos: os espaçadores de plástico podem ser reutilizados em algumas situações, reduzindo a quantidade de resíduos de construção gerados. Além disso, os materiais plásticos utilizados na fabricação desses dispositivos podem ser reciclados.',
        'Peso leve: o uso de espaçadores de plástico também facilita a logística da construção, uma vez que esses componentes são leves e fáceis de manusear, reduzindo o consumo de combustível durante o transporte.',
      ] },
      { type: 'p', text: 'Em resumo, os espaçadores de plástico desempenham um papel essencial na sustentação das construções, contribuindo para a durabilidade, eficiência energética e redução de resíduos. Ao serem utilizados de forma consciente e responsável, esses dispositivos ajudam a promover a construção de edificações mais sustentáveis e amigas do meio ambiente.' },
    ],
    en: [
      { type: 'p', text: 'Plastic spacers play an important role in the structural support and durability of modern buildings. They are discreet components, often small and simple-looking, yet they perform a crucial function in ensuring the quality and integrity of structures.' },
      { type: 'p', text: 'Plastic spacers are used in various contexts in civil construction, but are most commonly employed in assembling reinforcement in reinforced concrete structures. Their main function is to maintain proper spacing between the steel bars that make up the reinforcement, ensuring they are correctly positioned relative to the surrounding concrete.' },
      { type: 'p', text: 'Besides their support and spacing function, these devices have a direct impact on the sustainability of buildings — here are some important points:' },
      { type: 'ul', items: [
        'Reduced steel consumption: by using spacers, it is possible to ensure the correct amount of steel is used in each structure, avoiding waste. Efficient use of resources is an essential practice for making the construction industry more sustainable.',
        'Structural durability: correctly positioning the reinforcement with the help of spacers contributes to the durability of buildings. Reinforced concrete is vulnerable to corrosion of the steel bars, which can occur if there is direct contact between the bars and the concrete. Spacers help prevent this problem, extending the structure’s service life.',
        'Energy efficiency: well-designed structures built with proper spacers can result in more energy-efficient buildings, since a well-assembled structure reduces the chances of future problems such as leaks or cracks.',
        'Waste reduction: plastic spacers can be reused in some situations, reducing the amount of construction waste generated. In addition, the plastic materials used to manufacture these devices can be recycled.',
        'Light weight: the use of plastic spacers also facilitates construction logistics, since these components are lightweight and easy to handle, reducing fuel consumption during transport.',
      ] },
      { type: 'p', text: 'In summary, plastic spacers play an essential role in supporting buildings, contributing to durability, energy efficiency and waste reduction. When used consciously and responsibly, these devices help promote the construction of more sustainable, environmentally friendly buildings.' },
    ],
    es: [
      { type: 'p', text: 'Los espaciadores de plástico cumplen un papel importante en la sustentación y durabilidad de las construcciones modernas. Son componentes discretos, muchas veces pequeños y de apariencia simple, pero desempeñan una función crucial para garantizar la calidad y la integridad de las estructuras.' },
      { type: 'p', text: 'Los espaciadores de plástico se utilizan en diversos contextos de la construcción civil, pero se emplean más comúnmente en el montaje de armaduras en estructuras de concreto armado. Su función principal es mantener el espaciamiento adecuado entre las barras de acero que componen la armadura, garantizando que estén correctamente posicionadas respecto al concreto circundante.' },
      { type: 'p', text: 'Además de su función de soporte y espaciamiento, estos dispositivos tienen un impacto directo en la sostenibilidad de las construcciones. Estos son algunos puntos importantes:' },
      { type: 'ul', items: [
        'Reducción del consumo de acero: al utilizar espaciadores, es posible garantizar que se use la cantidad correcta de acero en cada estructura, evitando desperdicios. El uso eficiente de los recursos es una práctica esencial para hacer más sostenible la industria de la construcción.',
        'Durabilidad de las estructuras: el correcto posicionamiento de las armaduras con la ayuda de los espaciadores contribuye a la durabilidad de las construcciones. El concreto armado es vulnerable a la corrosión de las barras de acero, que puede ocurrir si hay contacto directo entre las barras y el concreto. Los espaciadores ayudan a evitar este problema, aumentando la vida útil de la estructura.',
        'Eficiencia energética: estructuras bien diseñadas y ejecutadas con espaciadores adecuados pueden resultar en edificaciones más eficientes energéticamente, ya que una estructura bien montada reduce las posibilidades de problemas futuros, como filtraciones o grietas.',
        'Reducción de residuos: los espaciadores de plástico pueden reutilizarse en algunas situaciones, reduciendo la cantidad de residuos de construcción generados. Además, los materiales plásticos utilizados en su fabricación pueden reciclarse.',
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
  blocks: {
    pt: [
      { type: 'p', text: 'Os espaçadores de plástico são elementos utilizados na construção civil para garantir a correta posição e distância entre elementos estruturais, como barras de aço ou armaduras, dentro de estruturas de concreto armado. Eles desempenham um papel fundamental na garantia da qualidade e durabilidade das construções.' },
      { type: 'p', text: 'Tipos comuns de espaçadores de plástico:' },
      { type: 'ul', items: [
        'Espaçadores para armaduras verticais: são utilizados para manter as barras de aço em uma posição vertical correta, mantendo-as afastadas das formas de concreto durante a concretagem. Os principais utilizados são os Espaçadores Circular Aberto e Circular Fechado.',
        'Espaçadores para armaduras horizontais: são usados para manter a distância adequada entre camadas de armadura em pisos ou lajes de concreto, evitando o surgimento de fissuras indesejadas. Alguns exemplos são os Espaçadores tipo Cadeirinha e Multiapoio.',
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
        'Spacers for vertical reinforcement: used to keep steel bars in a correct vertical position, keeping them away from the concrete formwork during pouring. The main ones used are the Open Circular and Closed Circular spacers.',
        'Spacers for horizontal reinforcement: used to maintain proper distance between reinforcement layers in concrete floors or slabs, preventing unwanted cracks. Examples include the Chair-type and Multi-Support spacers.',
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
        'Espaciadores para armaduras verticales: se utilizan para mantener las barras de acero en una posición vertical correcta, manteniéndolas alejadas de los encofrados durante el vaciado. Los principales son los Espaciadores Circular Abierto y Circular Cerrado.',
        'Espaciadores para armaduras horizontales: se usan para mantener la distancia adecuada entre capas de armadura en pisos o losas de concreto, evitando la aparición de fisuras no deseadas. Algunos ejemplos son los espaciadores tipo Silla y Multiapoyo.',
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
      { type: 'p', text: 'Quanto aos Kits de Vedação e Fixação, eles são extremamente importantes para garantir o bom desempenho e a durabilidade das telhas de PVC na cobertura. Esses kits geralmente incluem elementos como parafusos especiais, chapéu e calhas, que desempenham funções essenciais:' },
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
      { type: 'p', text: 'As for Sealing & Fixing Kits, they are extremely important to ensure the good performance and durability of PVC tiles on the roof. These kits generally include elements such as special screws, hat pieces and gutters, which perform essential functions:' },
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
      { type: 'p', text: 'En cuanto a los Kits de Sellado y Fijación, son extremadamente importantes para garantizar el buen desempeño y la durabilidad de las tejas de PVC en la cubierta. Estos kits generalmente incluyen elementos como tornillos especiales, sombrerete y canaletas, que cumplen funciones esenciales:' },
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
      { type: 'p', text: 'Também temos todos esses modelos e cores para o Kit de Vedação e Fixação para telhas de PVC. Faça logo a sua cotação!' },
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
      { type: 'p', text: 'We also carry all these models and colors for the Sealing & Fixing Kit for PVC roof tiles. Get your quote today!' },
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
      { type: 'p', text: 'También contamos con todos estos modelos y colores para el Kit de Sellado y Fijación para tejas de PVC. ¡Solicita ya tu cotización!' },
    ],
  },
});

// ---------------- POST 5 ----------------
const post5 = postShell({
  slug: POSTS_META[4].slug,
  title: POSTS_META[4].title,
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
      { type: 'p', text: 'Procure a MARCANTI e solicite agora mesmo seu orçamento dos espaçadores de plástico!' },
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
      { type: 'p', text: 'Reach out to MARCANTI and request your plastic spacer quote right now!' },
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
      { type: 'p', text: '¡Contacta a MARCANTI y solicita ahora mismo tu presupuesto de espaciadores de plástico!' },
      { type: 'p', text: 'Fuente: ABITELHA' },
    ],
  },
});

module.exports = [index, post1, post2, post3, post4, post5];
