'use strict';
const T = require('../templates');
const { business, ui, waLink } = require('../data/site');

const t = (obj, lang) => obj[lang];

// ---------------- HOME ----------------
const home = {
  slug: '',
  title: {
    pt: 'Espaçadores Plásticos para Concreto | Marcanti',
    en: 'Plastic Concrete Spacers | Marcanti',
    es: 'Espaciadores Plásticos para Concreto | Marcanti',
  },
  description: {
    pt: 'Fabricante de espaçadores plásticos e kits de vedação em Lauro de Freitas, BA. Produção própria e entrega no Nordeste. Peça sua cotação.',
    en: 'Manufacturer of plastic spacers and sealing kits in Lauro de Freitas, Bahia. In-house production, direct from the factory. Get a quote.',
    es: 'Fabricante de espaciadores plásticos y kits de sellado en Lauro de Freitas, BA. Producción propia y entrega en el Nordeste. Pide cotización.',
  },
  body(lang) {
    // Auditoria 4.1: o H1 antigo era bonito e não dizia o que a empresa vende;
    // quem chega pelo Google buscando espaçador precisa confirmar na hora que
    // chegou no lugar certo. O CTA também passa a dizer o que acontece no clique.
    const hero = {
      pt: { h1: 'Espaçadores plásticos para concreto, fabricados na Bahia', p: 'Fabricamos espaçadores para armadura e kits de vedação para telha de PVC desde 2012, em Lauro de Freitas. Produção própria, sem intermediário.', cta: 'Solicitar cotação' },
      en: { h1: 'Plastic concrete spacers, made in Bahia', p: 'We have been making spacers for reinforcement and sealing kits for PVC roof tiles since 2012, in Lauro de Freitas. Our own production, no middleman.', cta: 'Request a quote' },
      es: { h1: 'Espaciadores plásticos para concreto, fabricados en Bahía', p: 'Fabricamos espaciadores para armadura y kits de sellado para teja de PVC desde 2012, en Lauro de Freitas. Producción propia, sin intermediario.', cta: 'Solicitar cotización' },
    }[lang];

    const espacadoresLabel = { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang];
    const kitsLabel = { pt: 'Kits de Vedação', en: 'Sealing Kits', es: 'Kits de Sellado' }[lang];

    const sust = {
      pt: { eyebrow: 'Sustentabilidade', title: 'Matéria-prima reciclável', p: 'A matéria-prima dos espaçadores e kits Marcanti é 100% reciclável. Ao fim do ciclo, volta para a cadeia de reciclagem em vez de virar resíduo.' },
      en: { eyebrow: 'Sustainability', title: 'Recyclable raw material', p: 'The raw material in Marcanti spacers and kits is 100% recyclable. At the end of its cycle it goes back into the recycling chain instead of becoming waste.' },
      es: { eyebrow: 'Sostenibilidad', title: 'Materia prima reciclable', p: 'La materia prima de los espaciadores y kits Marcanti es 100% reciclable. Al final del ciclo vuelve a la cadena de reciclaje en lugar de convertirse en residuo.' },
    }[lang];

    // Auditoria 4.1: em vez de explicar o que o produto faz, explicar o que
    // acontece quando o cobrimento falha — e por que argamassa não resolve.
    const espacadoresTeaser = {
      pt: { eyebrow: 'Espaçadores', title: 'Cobrimento errado é corrosão na armadura', p: [
        'O espaçador tem uma função só: manter o cobrimento entre a armadura e a face do concreto. Quando o cobrimento falha, a armadura fica exposta à umidade e à carbonatação, e a corrosão começa a comprometer a estrutura antes do previsto em projeto.',
        'Nossos espaçadores são injetados em plástico, com encaixe entre peças e travamento no vergalhão. Não absorvem água, não se desagregam no transporte e mantêm a medida do primeiro ao último ponto da armadura.',
      ] },
      en: { eyebrow: 'Spacers', title: 'Wrong cover means corroded reinforcement', p: [
        'A spacer has one job: to hold the cover between the reinforcement and the face of the concrete. When the cover fails, the reinforcement is exposed to moisture and carbonation, and corrosion starts to compromise the structure earlier than the design assumed.',
        'Our spacers are injection-moulded in plastic, interlocking with each other and clipping onto the rebar. They do not absorb water, do not crumble in transport, and hold the measurement from the first to the last point of the reinforcement.',
      ] },
      es: { eyebrow: 'Espaciadores', title: 'Recubrimiento equivocado es corrosión en la armadura', p: [
        'El espaciador tiene una sola función: mantener el recubrimiento entre la armadura y la cara del concreto. Cuando el recubrimiento falla, la armadura queda expuesta a la humedad y a la carbonatación, y la corrosión empieza a comprometer la estructura antes de lo previsto en el proyecto.',
        'Nuestros espaciadores son inyectados en plástico, con encaje entre piezas y trabado en la varilla. No absorben agua, no se desagregan en el transporte y mantienen la medida del primero al último punto de la armadura.',
      ] },
    }[lang];

    const kitTeaser = {
      pt: { eyebrow: 'Kit vedação', title: 'Vedação da telha de PVC sem improviso', p: 'O kit de vedação da Marcanti fecha o ponto de fixação da telha com peça própria, dispensando adaptação com massa ou borracha genérica. Instalação sem ferramenta especial, com opções com e sem parafuso e cores para acompanhar a telha.' },
      en: { eyebrow: 'Sealing kit', title: 'Sealing a PVC roof tile without improvising', p: 'The Marcanti sealing kit closes the tile fastening point with a purpose-made part, with no mortar patch or generic rubber washer. It installs without special tools, with and without screw, in colours that match the tile.' },
      es: { eyebrow: 'Kit de sellado', title: 'Sellado de la teja de PVC sin improvisar', p: 'El kit de sellado de Marcanti cierra el punto de fijación de la teja con una pieza propia, sin adaptación con masilla ni goma genérica. Se instala sin herramienta especial, con y sin tornillo, en colores que acompañan la teja.' },
    }[lang];

    // Auditoria 4.1: a home não dava um único motivo para preferir a Marcanti.
    // Os anos são calculados a partir de 2012 para o texto não envelhecer.
    const anos = new Date().getFullYear() - 2012;
    const porque = {
      pt: {
        title: 'Fábrica em Lauro de Freitas, entrega no Nordeste',
        values: [
          { title: 'Fabricante direto', text: 'Você compra de quem injeta a peça. Sem camada de distribuidor entre o preço e a obra.' },
          { title: 'Desde 2012', text: `${anos} anos fornecendo para construtoras, fábricas de pré-moldados e lojas de material de construção.` },
          { title: 'Produção regional', text: 'Produção na Bahia. Prazo de entrega medido em dias, não em semanas de frete vindo do Sudeste.' },
          { title: 'Capacidade sob demanda', text: 'Além do catálogo, produzimos peça técnica sob projeto para outros setores.' },
        ],
      },
      en: {
        title: 'Factory in Lauro de Freitas, delivery across the Northeast',
        values: [
          { title: 'Direct manufacturer', text: 'You buy from whoever moulds the part. No distributor layer between the price and the job site.' },
          { title: 'Since 2012', text: `${anos} years supplying construction companies, precast plants and building materials stores.` },
          { title: 'Regional production', text: 'Production in Bahia. Delivery measured in days, not in weeks of freight coming from the Southeast.' },
          { title: 'Capacity on demand', text: 'Beyond the catalogue, we produce technical parts to the client’s own design for other sectors.' },
        ],
      },
      es: {
        title: 'Fábrica en Lauro de Freitas, entrega en el Nordeste',
        values: [
          { title: 'Fabricante directo', text: 'Compras a quien inyecta la pieza. Sin capa de distribuidor entre el precio y la obra.' },
          { title: 'Desde 2012', text: `${anos} años suministrando a constructoras, fábricas de prefabricados y tiendas de materiales de construcción.` },
          { title: 'Producción regional', text: 'Producción en Bahía. Plazo de entrega medido en días, no en semanas de flete desde el Sudeste.' },
          { title: 'Capacidad bajo demanda', text: 'Además del catálogo, producimos pieza técnica bajo proyecto del cliente para otros sectores.' },
        ],
      },
    }[lang];

    const clients = {
      pt: { title: 'Empresas que utilizam nossos produtos', note: 'Construtoras, indústrias e distribuidores em toda a Bahia e no Brasil confiam nos produtos MARCANTI.' },
      en: { title: 'Companies that use our products', note: 'Construction companies, industries and distributors across Bahia and Brazil rely on MARCANTI products.' },
      es: { title: 'Empresas que utilizan nuestros productos', note: 'Constructoras, industrias y distribuidores en toda Bahía y Brasil confían en los productos MARCANTI.' },
    }[lang];

    return `
${T.organizationLd(lang)}
${'<section class="hero" style="--hero-img:url(\'' + T.asset('img/Vigas-de-Aco-Construcao-Civil.jpg') + '\')">'}
  <div class="container">
    <div class="hero-grid">
      <div class="hero-content">
        <h1>${hero.h1}</h1>
        <p>${hero.p}</p>
        <a class="hero-cta" href="${T.url(lang, 'contato')}">${hero.cta} <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      </div>
      <a class="hero-card" href="${T.url(lang, 'espacadores')}" style="--hero-card-img:url('${T.asset('img/Foto01-1.jpg')}')">
        <span class="hero-card-label">${espacadoresLabel}</span>
      </a>
      <a class="hero-card" href="${T.url(lang, 'kit-vedacao')}" style="--hero-card-img:url('${T.asset('img/FOTO02-1-1.jpg')}')">
        <span class="hero-card-label">${kitsLabel}</span>
      </a>
    </div>
  </div>
</section>

${T.splitSection({ eyebrow: sust.eyebrow, title: sust.title, paragraphs: [sust.p], img: 'Sustentabilidade-1.jpg', imgAlt: { pt: 'Muda de planta nas mãos, simbolizando o compromisso ambiental da Marcanti', en: 'Seedling held in cupped hands, symbolizing MARCANTI’s environmental commitment', es: 'Plántula sostenida en las manos, símbolo del compromiso ambiental de MARCANTI' }[lang], ctaClass: 'btn-brand', cta: { href: T.url(lang, 'sustentabilidade'), label: ui.learnMore[lang] } })}

${T.splitSection({ eyebrow: espacadoresTeaser.eyebrow, title: espacadoresTeaser.title, paragraphs: espacadoresTeaser.p, img: 'corrosao-1.jpg', imgAlt: { pt: 'Armadura de aço corroída por cobrimento de concreto insuficiente', en: 'Steel reinforcement corroded by insufficient concrete cover', es: 'Armadura de acero corroída por recubrimiento de concreto insuficiente' }[lang], reverse: true, bg: true, ctaClass: 'btn-brand', cta: { href: T.url(lang, 'espacadores'), label: ui.learnMore[lang] } })}

${T.splitSection({ eyebrow: kitTeaser.eyebrow, title: kitTeaser.title, paragraphs: [kitTeaser.p], img: 'FOTO02-1-1.jpg', imgAlt: { pt: 'Componentes do kit de vedação Marcanti: chapéu, capa, anel de vedação e parafuso', en: 'MARCANTI sealing kit components: hat, cap, sealing ring and screw', es: 'Componentes del kit de sellado MARCANTI: sombrerete, capa, anillo de sellado y tornillo' }[lang], mediaClass: 'split-media-sm', ctaClass: 'btn-brand', cta: { href: T.url(lang, 'kit-vedacao'), label: ui.learnMore[lang] } })}

${T.valueGrid({ title: porque.title, values: porque.values })}

<section class="bg-light">
  <div class="container text-center">
    <h2>${clients.title}</h2>
    <p class="clients-note">${clients.note}</p>
    <div class="clients-grid">
      ${[['client-direcional.png', 'Direcional'], ['client-precon.png', 'Precon'], ['client-lacom.png', 'LA.com'], ['client-civil.png', 'Civil']].map(([file, name]) => `<div class="client-slot">${T.renderImg(file, { pt: `Logo ${name}`, en: `${name} logo`, es: `Logo ${name}` }[lang])}</div>`).join('')}
    </div>
  </div>
</section>

${T.ctaBand({ title: ui.receiveProposal[lang], lang })}
`;
  },
};

// ---------------- QUEM SOMOS ----------------
const quemSomos = {
  slug: 'quem-somos',
  title: { pt: 'Fábrica de Injeção Plástica na Bahia | Marcanti', en: 'Plastic Injection Factory in Bahia | Marcanti', es: 'Fábrica de Inyección Plástica en Bahía | Marcanti' },
  description: {
    pt: 'Injeção plástica técnica para construção civil desde 2012, com fábrica própria em Lauro de Freitas, BA. Conheça a Marcanti.',
    en: 'Technical plastic injection molding for civil construction since 2012, with our own factory in Lauro de Freitas, Bahia.',
    es: 'Inyección plástica técnica para la construcción civil desde 2012, con fábrica propia en Lauro de Freitas, BA. Conoce Marcanti.',
  },
  body(lang) {
    const c = {
      pt: {
        eyebrow: 'Injeção plástica técnica para construção civil, desde 2012',
        subtitle: 'Fábrica própria em Lauro de Freitas, Bahia.',
        title: 'Qualidade Superior em Peças Técnicas de Plástico para Construção Civil e Clientes Exigentes',
        paragraphs: [
          'A Marcanti nasceu em 2012, fundada por um engenheiro químico com mestrado e carreira construída dentro da indústria petroquímica e de transformação de plásticos. Essa origem define como a empresa opera: decisão técnica antes de decisão comercial, e produto que se justifica pela especificação.',
          'Produzimos peças técnicas injetadas para o mercado de construção civil — espaçadores para armadura e kits de vedação para telha — e também assumimos a produção terceirizada de peças para clientes de outros setores, com controle dimensional e repetibilidade.',
        ],
        values: [
          { title: 'Missão', text: 'Entregar inovação e qualidade na produção e comercialização de peças plásticas, atendendo às expectativas dos clientes.', icon: '13-blueprint.png' },
          { title: 'Visão', text: 'Ser reconhecida como a melhor empresa de injeção plástica em inovação de produtos e processos.', icon: '29-engineer.png' },
          { title: 'Valores', text: 'Segurança · Saúde e bem-estar · Ética e respeito · Resolutividade · Sustentabilidade', icon: '02-ruler.png' },
        ],
      },
      en: {
        eyebrow: 'Technical plastic injection for civil construction, since 2012',
        subtitle: 'Our own factory in Lauro de Freitas, Bahia, Brazil.',
        title: 'Superior Quality in Technical Plastic Parts for Civil Construction and Demanding Clients',
        paragraphs: [
          'Marcanti was founded in 2012 by a chemical engineer with a master’s degree and a career built inside the petrochemical and plastics processing industry. That origin shapes how the company works: the technical decision comes before the commercial one, and a product has to justify itself on specification.',
          'We produce technical injection-moulded parts for the civil construction market — spacers for reinforcement and sealing kits for roof tiles — and we also take on outsourced parts production for clients in other sectors, with dimensional control and repeatability.',
        ],
        values: [
          { title: 'Mission', text: 'To deliver innovation and quality in the production and sale of plastic parts, meeting our clients’ expectations.', icon: '13-blueprint.png' },
          { title: 'Vision', text: 'To be recognised as the best plastic injection moulding company in product and process innovation.', icon: '29-engineer.png' },
          { title: 'Values', text: 'Safety · Health and wellbeing · Ethics and respect · Resolutiveness · Sustainability', icon: '02-ruler.png' },
        ],
      },
      es: {
        eyebrow: 'Inyección plástica técnica para la construcción civil, desde 2012',
        subtitle: 'Fábrica propia en Lauro de Freitas, Bahía.',
        title: 'Calidad Superior en Piezas Técnicas de Plástico para la Construcción Civil y Clientes Exigentes',
        paragraphs: [
          'Marcanti nació en 2012, fundada por un ingeniero químico con maestría y una carrera construida dentro de la industria petroquímica y de transformación de plásticos. Ese origen define cómo opera la empresa: decisión técnica antes que decisión comercial, y producto que se justifica por la especificación.',
          'Producimos piezas técnicas inyectadas para el mercado de la construcción civil — espaciadores para armadura y kits de sellado para teja — y también asumimos la producción tercerizada de piezas para clientes de otros sectores, con control dimensional y repetibilidad.',
        ],
        values: [
          { title: 'Misión', text: 'Entregar innovación y calidad en la producción y comercialización de piezas plásticas, atendiendo las expectativas de los clientes.', icon: '13-blueprint.png' },
          { title: 'Visión', text: 'Ser reconocida como la mejor empresa de inyección plástica en innovación de productos y procesos.', icon: '29-engineer.png' },
          { title: 'Valores', text: 'Seguridad · Salud y bienestar · Ética y respeto · Resolutividad · Sostenibilidad', icon: '02-ruler.png' },
        ],
      },
    }[lang];

    return `
${T.pageHero({ title: c.eyebrow, subtitle: c.subtitle, bg: 'Quem-Somos.jpg', tag: 'h1', divider: true, warm: true })}
${T.splitSection({ title: c.title, paragraphs: [c.paragraphs[0]], img: 'FOTO05.jpg', imgAlt: { pt: 'Espaçadores plásticos multiapoio produzidos pela Marcanti', en: 'Multi-support plastic spacers produced by MARCANTI', es: 'Separadores plásticos multiapoyo producidos por MARCANTI' }[lang], splitClass: 'split-roomy' })}
${T.splitSection({ paragraphs: [c.paragraphs[1]], img: 'Quem-Somos.jpg', imgAlt: { pt: 'Engenheiro analisando as plantas de um projeto de construção', en: 'Engineer reviewing the blueprints of a construction project', es: 'Ingeniero analizando los planos de un proyecto de construcción' }[lang], reverse: true, splitClass: 'split-roomy' })}
${T.valueGrid({ values: c.values })}
`;
  },
};

// ---------------- TECNOLOGIA ----------------
const tecnologia = {
  slug: 'desenvolvimento-de-produtos',
  title: { pt: 'Desenvolvimento de Produtos Plásticos | Marcanti', en: 'Plastic Product Development | Marcanti', es: 'Desarrollo de Productos Plásticos | Marcanti' },
  description: {
    pt: 'Da ideia à peça piloto: modelagem, estudo de eficiência e análise de custo antes do investimento em molde. Diagnóstico gratuito.',
    en: 'From idea to pilot part: modeling, efficiency study and cost analysis before investing in a mold. Free initial diagnosis.',
    es: 'De la idea a la pieza piloto: modelado, estudio de eficiencia y análisis de costo antes de invertir en molde. Diagnóstico gratuito.',
  },
  body(lang) {
    const c = {
      pt: {
        eyebrow: 'Desenvolvimento de Produtos',
        title: 'Consultoria em Desenvolvimento de Produtos Plásticos',
        paragraphs: [
          'Da ideia à peça piloto. A Marcanti desenvolve produtos injetados para empresas que precisam substituir um componente, reduzir o custo de uma peça ou criar um item novo — com análise técnica e de viabilidade financeira antes do investimento em molde.',
        ],
        title2: 'Consultoria em Desenvolvimento de Produtos na Indústria de Transformações Plásticas',
        paragraphs2: [
          'Composto por um corpo técnico de alto nível, a Consultoria tem como objetivo desenvolver novos produtos, com foco na garantia de qualidade e eficiência.',
          'Este serviço oferece soluções completas, customizáveis e ágeis para o desenvolvimento e modelagem de produtos inovadores, tornando sua empresa mais competitiva no mercado.',
        ],
        title3: 'A Consultoria atua no processo de desenvolvimento de novos produtos, modelagem, produção de peças pilotos e viabilidade financeira.',
        stepsEyebrow: 'Etapas da Consultoria',
        steps: [
          { title: 'Diagnóstico gratuito', text: 'Fornecemos um diagnóstico completamente gratuito com nossos especialistas para que possamos entender a sua ideia e como podemos te ajudar a desenvolver um novo produto.' },
          { title: 'Planejamento', text: 'Gerenciamos os passos que serão feitos no seu projeto, as etapas personalizadas, além de apresentarmos o cronograma da consultoria e os preços.' },
          { title: 'Modelagem', text: 'A equipe técnica de alto nível apoiada por infraestrutura com tecnologia de ponta, oferece soluções ágeis e customizáveis de modelagem para seu produto.' },
          { title: 'Estudo de eficiência do produto', text: 'A consultoria também analisa as características técnicas, como resistência e qualidade do produto, garantindo a confiabilidade para seu cliente.' },
          { title: 'Análise de custos', text: 'Além disso, também analisamos se o seu produto é viável financeiramente quanto irá custar para produzi-lo e, claro, se você irá ter lucro com ele.' },
        ],
      },
      en: {
        eyebrow: 'Product Development',
        title: 'Plastic Product Development Consulting',
        paragraphs: [
          'From idea to pilot part. Marcanti develops injection-moulded products for companies that need to replace a component, bring a part’s cost down or create a new item — with technical and financial feasibility analysis before any investment in tooling.',
        ],
        title2: 'Product Development Consulting in the Plastics Transformation Industry',
        paragraphs2: [
          'Made up of a senior technical team, the Consulting service aims to develop new products with a focus on quality assurance and efficiency.',
          'This service offers complete, customizable and agile solutions for the development and modeling of innovative products, making your company more competitive in the market.',
        ],
        title3: 'The Consulting service works across new product development, modeling, pilot part production and financial feasibility.',
        stepsEyebrow: 'Consulting Steps',
        steps: [
          { title: 'Free diagnosis', text: 'We provide a completely free diagnosis with our specialists so we can understand your idea and how we can help you develop a new product.' },
          { title: 'Planning', text: 'We manage the steps to be taken in your project, the customized stages, and present the consulting timeline and pricing.' },
          { title: 'Modeling', text: 'Our senior technical team, backed by state-of-the-art infrastructure, offers agile and customizable modeling solutions for your product.' },
          { title: 'Product efficiency study', text: 'The consulting service also analyzes technical characteristics such as strength and product quality, ensuring reliability for your client.' },
          { title: 'Cost analysis', text: 'We also analyze whether your product is financially viable — how much it will cost to produce and, of course, whether it will be profitable.' },
        ],
      },
      es: {
        eyebrow: 'Desarrollo de Productos',
        title: 'Consultoría en Desarrollo de Productos Plásticos',
        paragraphs: [
          'De la idea a la pieza piloto. Marcanti desarrolla productos inyectados para empresas que necesitan sustituir un componente, reducir el costo de una pieza o crear un artículo nuevo — con análisis técnico y de viabilidad financiera antes de invertir en el molde.',
        ],
        title2: 'Consultoría en Desarrollo de Productos en la Industria de Transformación de Plásticos',
        paragraphs2: [
          'Compuesta por un equipo técnico de alto nivel, la Consultoría tiene como objetivo desarrollar nuevos productos, con foco en la garantía de calidad y eficiencia.',
          'Este servicio ofrece soluciones completas, personalizables y ágiles para el desarrollo y modelado de productos innovadores, haciendo que su empresa sea más competitiva en el mercado.',
        ],
        title3: 'La Consultoría actúa en el proceso de desarrollo de nuevos productos, modelado, producción de piezas piloto y viabilidad financiera.',
        stepsEyebrow: 'Etapas de la Consultoría',
        steps: [
          { title: 'Diagnóstico gratuito', text: 'Ofrecemos un diagnóstico completamente gratuito con nuestros especialistas para entender su idea y cómo podemos ayudarlo a desarrollar un nuevo producto.' },
          { title: 'Planificación', text: 'Gestionamos los pasos que se realizarán en su proyecto, las etapas personalizadas, además de presentar el cronograma de la consultoría y los precios.' },
          { title: 'Modelado', text: 'El equipo técnico de alto nivel, respaldado por infraestructura con tecnología de punta, ofrece soluciones ágiles y personalizables de modelado para su producto.' },
          { title: 'Estudio de eficiencia del producto', text: 'La consultoría también analiza las características técnicas, como resistencia y calidad del producto, garantizando la confiabilidad para su cliente.' },
          { title: 'Análisis de costos', text: 'Además, analizamos si su producto es viable financieramente, cuánto costará producirlo y, por supuesto, si tendrá ganancias con él.' },
        ],
      },
    }[lang];
    const talkToConsultants = { pt: 'Fale com nossos consultores', en: 'Talk to our consultants', es: 'Habla con nuestros consultores' }[lang];
    const consultantsCta = { href: T.url(lang, 'contato'), label: talkToConsultants };

    return `
<section class="page-hero tint-blue">
  <div class="container tecnologia-hero-grid">
    <div class="tecnologia-hero-content">
      <span class="breadcrumb-tag">${c.eyebrow}</span>
      <h1>${c.title}</h1>
      ${c.paragraphs.map((p) => `<p class="lede">${p}</p>`).join('')}
      <a class="btn btn-primary" style="margin-top:8px;" href="${consultantsCta.href}">${consultantsCta.label}</a>
    </div>
    <div class="tecnologia-hero-photos">
      <span class="tecnologia-hero-photo" style="background-image:url('${T.asset('img/construction-site-compress.jpg')}')"></span>
      <span class="tecnologia-hero-photo" style="background-image:url('${T.asset('img/modern-architecture-buildings-in-vienna-austria-eu-small.jpg')}')"></span>
      <span class="tecnologia-hero-photo" style="background-image:url('${T.asset('img/cement-factory-at-night-compress.jpg')}')"></span>
    </div>
  </div>
</section>
${T.splitSection({ title: c.title2, paragraphs: c.paragraphs2, img: 'men-engineers-standing-outdoors-on-construction-si-small.jpg', imgAlt: { pt: 'Dois engenheiros com colete e capacete analisando um tablet em obra de estrutura metálica', en: 'Two engineers in hi-vis vests and hard hats reviewing a tablet on a steel-frame construction site', es: 'Dos ingenieros con chaleco y casco revisando una tableta en una obra de estructura metálica' }[lang], cta: consultantsCta, ctaClass: 'btn-primary' })}
<section>
  <div class="container text-center">
    <h2 class="max-720 mx-auto">${c.title3}</h2>
  </div>
</section>
${T.stepGrid({ eyebrow: c.stepsEyebrow, theme: 'brand', steps: c.steps.map((s, i) => ({ ...s, img: ['Etapa-Diagnostico-gratuito.png', 'Etapa-Plan.png', 'Etapa-model.png', 'Etapa-Estudo.png', 'Etapa-Estudo-Cutos.png'][i] })) })}
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}
`;
  },
};

// ---------------- CONTATO ----------------
const contato = {
  slug: 'contato',
  title: { pt: 'Solicite uma Cotação | Marcanti Plásticos', en: 'Request a Quote | Marcanti Plastics', es: 'Solicita una Cotización | Marcanti Plásticos' },
  description: {
    pt: 'Peça cotação de espaçadores e kits de vedação direto com o fabricante. Atendimento de seg. a sex., 7h às 17h.',
    en: 'Request a quote for spacers and sealing kits direct from the manufacturer. Mon to Fri, 7am to 5pm.',
    es: 'Pide cotización de espaciadores y kits de sellado directo con el fabricante. De lun. a vie., 7h a 17h.',
  },
  body(lang) {
    const c = {
      pt: {
        title: 'Solicite uma cotação',
        paragraphs: [
          'Informe modelo, cobrimento e quantidade. Se ainda não tiver a especificação definida, descreva a aplicação — nós indicamos o modelo adequado.',
          'Respondemos em horário comercial, de segunda a sexta, das 7h às 17h.',
        ],
        whereLabel: 'Onde estamos',
        hoursLabel: 'Atendimento',
      },
      en: {
        title: 'Request a quote',
        paragraphs: [
          'Tell us the model, concrete cover and quantity. If you do not have the specification yet, describe the application — we will recommend the right model.',
          'We reply during business hours, Monday to Friday, 7am to 5pm.',
        ],
        whereLabel: 'Where we are',
        hoursLabel: 'Opening hours',
      },
      es: {
        title: 'Solicita una cotización',
        paragraphs: [
          'Indica modelo, recubrimiento y cantidad. Si aún no tienes la especificación definida, describe la aplicación — nosotros indicamos el modelo adecuado.',
          'Respondemos en horario comercial, de lunes a viernes, de 7h a 17h.',
        ],
        whereLabel: 'Dónde estamos',
        hoursLabel: 'Atención',
      },
    }[lang];
    const submitLabel = { pt: 'Solicitar cotação', en: 'Request quote', es: 'Solicitar cotización' }[lang];
    return `
<section class="page-hero warm">
  <div class="container contact-layout">
    <div class="contact-card">
      <h1>${c.title}</h1>
      <span class="hero-divider"></span>
      ${c.paragraphs.map((p) => `<p>${p}</p>`).join('')}
      <h2 class="contact-card-sub">${c.whereLabel}</h2>
      <p>${business.addressLines.join('<br>')}</p>
      <h2 class="contact-card-sub">${c.hoursLabel}</h2>
      <p>${business.hours[lang]}<br>
        <a href="mailto:${business.email}">${business.email}</a><br>
        <a href="${waLink(lang)}" target="_blank" rel="noopener">${business.phoneDisplay}</a></p>
    </div>
    <div>
      ${T.contactForm(lang, submitLabel)}
    </div>
  </div>
</section>
`;
  },
};

// ---------------- SUSTENTABILIDADE ----------------
const sustentabilidade = {
  slug: 'sustentabilidade',
  title: { pt: 'Matéria-Prima Reciclável na Injeção | Marcanti', en: 'Recyclable Raw Material in Injection | Marcanti', es: 'Materia Prima Reciclable en Inyección | Marcanti' },
  description: {
    pt: 'Espaçadores produzidos com matéria-prima reciclável, sem perda de resistência. Menos resíduo no canteiro de obras.',
    en: 'Spacers produced with recyclable raw material, with no loss of strength. Less waste on the construction site.',
    es: 'Espaciadores producidos con materia prima reciclable, sin pérdida de resistencia. Menos residuos en la obra.',
  },
  body(lang) {
    const c = {
      // Auditoria 4.9: fora o bloco sobre a sigla ESG e o "eco-friendly", que não
      // diziam nada concreto. Escrito na versão "reciclável", que é o que o site
      // afirma hoje; se a seção 9 #1 confirmar "reciclada", é troca de palavra.
      pt: {
        eyebrow: 'Matéria-prima reciclável na injeção plástica',
        intro: 'A matéria-prima usada na produção dos espaçadores e kits Marcanti é 100% reciclável.',
        title: 'Escolha técnica antes de ser ambiental',
        paragraphs: [
          'O material entrega a resistência e a estabilidade dimensional exigidas pela aplicação e, ao fim do ciclo, volta para a cadeia de reciclagem em vez de virar resíduo.',
          'Espaçador plástico também reduz resíduo no canteiro. Diferente da alternativa em argamassa, não se desagrega no transporte nem no manuseio, o que significa menos perda por embalagem e menos entulho gerado na obra.',
        ],
      },
      en: {
        eyebrow: 'Recyclable raw material in plastic injection',
        intro: 'The raw material used to produce Marcanti spacers and kits is 100% recyclable.',
        title: 'A technical choice before an environmental one',
        paragraphs: [
          'The material delivers the strength and dimensional stability the application demands and, at the end of its cycle, goes back into the recycling chain instead of becoming waste.',
          'Plastic spacers also cut waste on site. Unlike the mortar alternative, they do not crumble in transport or handling, which means less loss per pack and less rubble generated on the job.',
        ],
      },
      es: {
        eyebrow: 'Materia prima reciclable en la inyección plástica',
        intro: 'La materia prima usada en la producción de los espaciadores y kits Marcanti es 100% reciclable.',
        title: 'Una elección técnica antes que ambiental',
        paragraphs: [
          'El material entrega la resistencia y la estabilidad dimensional que exige la aplicación y, al final del ciclo, vuelve a la cadena de reciclaje en lugar de convertirse en residuo.',
          'El separador plástico también reduce residuos en la obra. A diferencia de la alternativa en mortero, no se desagrega en el transporte ni en el manejo, lo que significa menos pérdida por embalaje y menos escombro generado.',
        ],
      },
    }[lang];

    return `
${T.pageHero({ title: c.eyebrow, subtitle: c.intro, tag: 'h1', bg: 'Sustentabilidade.jpg', warm: true, divider: true, opacity: 0.85 })}
${T.splitSection({ title: c.title, paragraphs: c.paragraphs, img: 'Sustentabilidade-02-1024x1024.jpg', imgAlt: { pt: 'Diagrama do ciclo de reciclagem dos espaçadores Marcanti: consumo, coleta, processamento, fabricação e reutilização na obra', en: 'Diagram of the MARCANTI spacer recycling cycle: consumption, collection, processing, manufacturing and reuse on site', es: 'Diagrama del ciclo de reciclaje de los separadores MARCANTI: consumo, recolección, procesamiento, fabricación y reutilización en obra' }[lang] })}
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}
`;
  },
};

// ---------------- CATALOGO ----------------
const catalogo = {
  slug: 'catalogo-de-produtos',
  title: { pt: 'Catálogo Técnico de Produtos | Marcanti', en: 'Technical Product Catalog | Marcanti', es: 'Catálogo Técnico de Productos | Marcanti' },
  description: {
    pt: 'Baixe o catálogo com as medidas de toda a linha de espaçadores e kits de vedação Marcanti: modelos, cobrimentos e bitolas.',
    en: 'Download the catalog with measurements for the full Marcanti spacer and sealing kit range: models, covers and rebar gauges.',
    es: 'Descarga el catálogo con las medidas de toda la línea de espaciadores y kits de sellado Marcanti: modelos, recubrimientos y calibres.',
  },
  body(lang) {
    const title = { pt: 'Faça o download do nosso catálogo', en: 'Download our catalog', es: 'Descarga nuestro catálogo' }[lang];
    const sub = {
      pt: 'Conheça em detalhes toda a linha de espaçadores e kits de vedação MARCANTI.',
      en: 'Explore the full MARCANTI line of spacers and sealing kits in detail.',
      es: 'Conoce en detalle toda la línea de espaciadores y kits de sellado MARCANTI.',
    }[lang];
    return `
<section class="text-center">
  <div class="container">
    <span class="eyebrow">${{ pt: 'Catálogo', en: 'Catalog', es: 'Catálogo' }[lang]}</span>
    <h1>${title}</h1>
    <p class="lede max-720 mx-auto">${sub}</p>
    <a class="btn btn-secondary" style="margin-top:16px;" href="${business.catalogUrl}" target="_blank" rel="noopener">${ui.downloadCatalog[lang]}</a>
  </div>
</section>
`;
  },
};

// ---------------- PRIVACY POLICY ----------------
const privacidade = {
  slug: 'politica-de-privacidade',
  title: { pt: 'Política de Privacidade | Marcanti', en: 'Privacy Policy | Marcanti', es: 'Política de Privacidad | Marcanti' },
  description: {
    pt: 'Como a MARCANTI trata os dados pessoais coletados neste site, em conformidade com a LGPD.',
    en: 'How MARCANTI handles personal data collected on this website.',
    es: 'Cómo MARCANTI trata los datos personales recopilados en este sitio web.',
  },
  body(lang) {
    const c = {
      pt: {
        title: 'Política de Privacidade',
        intro: 'A MARCANTI respeita a sua privacidade e está comprometida com a proteção dos dados pessoais tratados por meio deste site, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).',
        sections: [
          { h: 'Dados coletados', p: 'Coletamos apenas os dados fornecidos voluntariamente por você através do nosso formulário de contato: nome, e-mail, telefone e o conteúdo da sua mensagem.' },
          { h: 'Finalidade', p: 'Os dados coletados são utilizados exclusivamente para responder às suas solicitações de orçamento, dúvidas ou sugestões, e não são compartilhados com terceiros para fins comerciais.' },
          { h: 'Armazenamento e segurança', p: 'As informações são armazenadas com cuidado e utilizadas apenas pela equipe MARCANTI para o atendimento comercial.' },
          { h: 'Seus direitos', p: 'Você pode, a qualquer momento, solicitar a atualização, correção ou exclusão dos seus dados pessoais entrando em contato pelo e-mail contato@marcanti.ind.br.' },
        ],
      },
      en: {
        title: 'Privacy Policy',
        intro: 'MARCANTI respects your privacy and is committed to protecting the personal data processed through this website, in accordance with Brazil’s General Data Protection Law (LGPD – Law No. 13,709/2018).',
        sections: [
          { h: 'Data collected', p: 'We only collect data you voluntarily provide through our contact form: name, email, phone number, and the content of your message.' },
          { h: 'Purpose', p: 'The data collected is used exclusively to respond to your quote requests, questions, or suggestions, and is not shared with third parties for commercial purposes.' },
          { h: 'Storage and security', p: 'Information is stored carefully and used only by the MARCANTI team for customer service purposes.' },
          { h: 'Your rights', p: 'You may, at any time, request the update, correction, or deletion of your personal data by contacting us at contato@marcanti.ind.br.' },
        ],
      },
      es: {
        title: 'Política de Privacidad',
        intro: 'MARCANTI respeta tu privacidad y está comprometida con la protección de los datos personales tratados a través de este sitio web, de conformidad con la Ley General de Protección de Datos de Brasil (LGPD – Ley n.º 13.709/2018).',
        sections: [
          { h: 'Datos recopilados', p: 'Recopilamos únicamente los datos que proporcionas voluntariamente a través de nuestro formulario de contacto: nombre, correo electrónico, teléfono y el contenido de tu mensaje.' },
          { h: 'Finalidad', p: 'Los datos recopilados se utilizan exclusivamente para responder a tus solicitudes de presupuesto, dudas o sugerencias, y no se comparten con terceros con fines comerciales.' },
          { h: 'Almacenamiento y seguridad', p: 'La información se almacena con cuidado y es utilizada únicamente por el equipo de MARCANTI para fines de atención al cliente.' },
          { h: 'Tus derechos', p: 'Puedes, en cualquier momento, solicitar la actualización, corrección o eliminación de tus datos personales escribiendo a contato@marcanti.ind.br.' },
        ],
      },
    }[lang];
    return `
${T.pageHero({ title: c.title, tag: 'h1' })}
<section>
  <div class="container max-720">
    <p class="lede">${c.intro}</p>
    ${c.sections.map((s) => `<h2>${s.h}</h2><p>${s.p}</p>`).join('')}
  </div>
</section>
`;
  },
};

// ---------------- OBRIGADO (pós-envio do formulário) ----------------
// URL própria para servir de conversão no GA4 / Google Ads: sem ela a campanha
// não consegue medir cotação (auditoria 4.10). noindex porque é página de
// funil, não de busca.
const obrigado = {
  slug: 'obrigado',
  noindex: true,
  title: { pt: 'Solicitação recebida | Marcanti', en: 'Request received | Marcanti', es: 'Solicitud recibida | Marcanti' },
  description: {
    pt: 'Recebemos sua solicitação de cotação. Nosso time comercial responde em até 1 dia útil.',
    en: 'We have received your quote request. Our sales team replies within 1 business day.',
    es: 'Recibimos tu solicitud de presupuesto. Nuestro equipo comercial responde en 1 día hábil.',
  },
  body(lang) {
    const c = {
      pt: {
        title: 'Recebemos sua solicitação',
        lede: 'Nosso time comercial responde em até 1 dia útil.',
        faster: 'Se preferir adiantar, chame no WhatsApp:',
        wa: 'Falar no WhatsApp',
        next: 'Enquanto isso',
        catalog: 'Baixar o catálogo técnico',
        products: 'Ver a linha de espaçadores',
      },
      en: {
        title: 'We have received your request',
        lede: 'Our sales team replies within 1 business day.',
        faster: 'To move faster, reach us on WhatsApp:',
        wa: 'Chat on WhatsApp',
        next: 'In the meantime',
        catalog: 'Download the technical catalog',
        products: 'See the spacer range',
      },
      es: {
        title: 'Recibimos tu solicitud',
        lede: 'Nuestro equipo comercial responde en un máximo de 1 día hábil.',
        faster: 'Si prefieres adelantar, escríbenos por WhatsApp:',
        wa: 'Hablar por WhatsApp',
        next: 'Mientras tanto',
        catalog: 'Descargar el catálogo técnico',
        products: 'Ver la línea de espaciadores',
      },
    }[lang];
    const wa = waLink(lang);
    return `
${T.pageHero({ title: c.title, subtitle: c.lede, tag: 'h1', tint: 'blue' })}
<section>
  <div class="container max-720 text-center">
    <p class="lede">${c.faster} <strong>${business.phoneDisplay}</strong></p>
    <a class="btn btn-primary" href="${wa}" target="_blank" rel="noopener">${c.wa}</a>
    <h2 style="margin-top:48px;">${c.next}</h2>
    <p>
      <a class="btn btn-outline" href="${business.catalogUrl}" target="_blank" rel="noopener">${c.catalog}</a>
      <a class="btn btn-outline" href="${T.url(lang, 'espacadores')}">${c.products}</a>
    </p>
  </div>
</section>
`;
  },
};


// ---------------- PÁGINA REGIONAL: SALVADOR / RMS ----------------
// Auditoria seção 6 e 10: "espaçador plástico Salvador" é busca transacional de
// baixa dificuldade onde nem o concorrente regional nem os nacionais estão
// posicionados. Linkada do rodapé e do hub de espaçadores para não ficar órfã.
const salvador = {
  slug: 'espacadores-plasticos-salvador',
  title: {
    pt: 'Espaçadores Plásticos em Salvador e RMS | Marcanti',
    en: 'Plastic Spacers in Salvador, Bahia | Marcanti',
    es: 'Espaciadores Plásticos en Salvador, Bahía | Marcanti',
  },
  description: {
    pt: 'Fabricante de espaçadores plásticos e kits de vedação em Lauro de Freitas, na Região Metropolitana de Salvador. Direto da fábrica para a obra.',
    en: 'Manufacturer of plastic spacers and sealing kits in Lauro de Freitas, in the Salvador metropolitan region of Bahia. Direct from factory to site.',
    es: 'Fabricante de espaciadores plásticos y kits de sellado en Lauro de Freitas, en la Región Metropolitana de Salvador. De la fábrica a la obra.',
  },
  body(lang) {
    const c = {
      pt: {
        title: 'Espaçadores plásticos em Salvador e região metropolitana',
        lede: 'A Marcanti fabrica em Lauro de Freitas, dentro da Região Metropolitana de Salvador. Espaçadores para armadura e kits de vedação saem da fábrica para a obra sem depender de frete vindo do Sudeste.',
        whoTitle: 'Quem compra da Marcanti na região',
        who: [
          { title: 'Construtoras', text: 'Espaçadores para laje, viga, pilar e fundação, com cobrimento de 15 a 50 mm.' },
          { title: 'Fábricas de pré-moldados', text: 'Circular aberto e fechado para postes, estacas e cruzetas de concreto.' },
          { title: 'Lojas de material de construção', text: 'Linha completa de espaçadores e kits de vedação para revenda.' },
          { title: 'Indústrias de telha de PVC', text: 'Kits de vedação e fixação nas quatro cores da linha.' },
        ],
        citiesTitle: 'Região Metropolitana de Salvador',
        citiesText: 'A fábrica fica em Lauro de Freitas, que integra a Região Metropolitana de Salvador junto com Camaçari, Candeias, Dias d’Ávila, Itaparica, Madre de Deus, Mata de São João, Pojuca, São Francisco do Conde, São Sebastião do Passé, Simões Filho e Vera Cruz. Atendemos também o interior da Bahia e os demais estados do Nordeste.',
        productsTitle: 'O que fornecemos',
        spacersCta: 'Ver a linha de espaçadores',
        kitsCta: 'Ver os kits de vedação',
        faq: [
          { q: 'Vocês entregam em Salvador?', a: 'Sim. A fábrica fica em Lauro de Freitas, na própria Região Metropolitana de Salvador, e atendemos toda a região, o interior da Bahia e os demais estados do Nordeste.' },
          { q: 'Qual o prazo de entrega na região metropolitana?', a: 'O prazo depende do modelo e do volume. Informe a quantidade na cotação e retornamos com o prazo junto com o preço.' },
          { q: 'Vocês vendem direto ou só por distribuidor?', a: 'Direto. Você compra de quem injeta a peça, sem camada de distribuidor entre o preço e a obra.' },
        ],
      },
      en: {
        title: 'Plastic spacers in Salvador and its metropolitan region',
        lede: 'Marcanti manufactures in Lauro de Freitas, inside the Salvador metropolitan region of Bahia. Spacers for reinforcement and sealing kits go from the factory to the job site without depending on freight from the Southeast.',
        whoTitle: 'Who buys from Marcanti in the region',
        who: [
          { title: 'Construction companies', text: 'Spacers for slabs, beams, columns and foundations, with cover from 15 to 50 mm.' },
          { title: 'Precast concrete plants', text: 'Open and closed circular spacers for concrete poles, piles and crossarms.' },
          { title: 'Building materials stores', text: 'The full spacer and sealing kit range for resale.' },
          { title: 'PVC roof tile manufacturers', text: 'Sealing and fixing kits in all four colours of the range.' },
        ],
        citiesTitle: 'The Salvador metropolitan region',
        citiesText: 'The factory is in Lauro de Freitas, part of the Salvador metropolitan region together with Camaçari, Candeias, Dias d’Ávila, Itaparica, Madre de Deus, Mata de São João, Pojuca, São Francisco do Conde, São Sebastião do Passé, Simões Filho and Vera Cruz. We also serve inland Bahia and the other states of the Brazilian Northeast.',
        productsTitle: 'What we supply',
        spacersCta: 'See the spacer range',
        kitsCta: 'See the sealing kits',
        faq: [
          { q: 'Do you deliver in Salvador?', a: 'Yes. The factory is in Lauro de Freitas, inside the Salvador metropolitan region itself, and we serve the whole region, inland Bahia and the other states of the Northeast.' },
          { q: 'What is the delivery time in the metropolitan region?', a: 'It depends on the model and the volume. Tell us the quantity in your quote request and we will come back with the lead time along with the price.' },
          { q: 'Do you sell direct or only through distributors?', a: 'Direct. You buy from whoever moulds the part, with no distributor layer between the price and the job site.' },
        ],
      },
      es: {
        title: 'Espaciadores plásticos en Salvador y su región metropolitana',
        lede: 'Marcanti fabrica en Lauro de Freitas, dentro de la Región Metropolitana de Salvador, en Bahía. Los espaciadores para armadura y los kits de sellado salen de la fábrica a la obra sin depender de flete del Sudeste.',
        whoTitle: 'Quién compra a Marcanti en la región',
        who: [
          { title: 'Constructoras', text: 'Espaciadores para losa, viga, pilar y cimentación, con recubrimiento de 15 a 50 mm.' },
          { title: 'Fábricas de prefabricados', text: 'Circular abierto y cerrado para postes, pilotes y crucetas de concreto.' },
          { title: 'Tiendas de materiales de construcción', text: 'Línea completa de espaciadores y kits de sellado para reventa.' },
          { title: 'Industrias de teja de PVC', text: 'Kits de sellado y fijación en los cuatro colores de la línea.' },
        ],
        citiesTitle: 'Región Metropolitana de Salvador',
        citiesText: 'La fábrica está en Lauro de Freitas, que integra la Región Metropolitana de Salvador junto con Camaçari, Candeias, Dias d’Ávila, Itaparica, Madre de Deus, Mata de São João, Pojuca, São Francisco do Conde, São Sebastião do Passé, Simões Filho y Vera Cruz. Atendemos también el interior de Bahía y los demás estados del Nordeste.',
        productsTitle: 'Qué suministramos',
        spacersCta: 'Ver la línea de espaciadores',
        kitsCta: 'Ver los kits de sellado',
        faq: [
          { q: '¿Entregan en Salvador?', a: 'Sí. La fábrica está en Lauro de Freitas, dentro de la propia Región Metropolitana de Salvador, y atendemos toda la región, el interior de Bahía y los demás estados del Nordeste.' },
          { q: '¿Cuál es el plazo de entrega en la región metropolitana?', a: 'Depende del modelo y del volumen. Indica la cantidad en la cotización y respondemos con el plazo junto con el precio.' },
          { q: '¿Venden directo o solo por distribuidor?', a: 'Directo. Compras a quien inyecta la pieza, sin capa de distribuidor entre el precio y la obra.' },
        ],
      },
    }[lang];
    return `
${T.pageHero({ title: c.title, subtitle: c.lede, tag: 'h1', bg: 'Vigas-de-Aco-Construcao-Civil.jpg', warm: true, divider: true })}
${T.valueGrid({ title: c.whoTitle, values: c.who })}
<section class="bg-light">
  <div class="container max-720">
    <h2>${c.citiesTitle}</h2>
    <p>${c.citiesText}</p>
  </div>
</section>
<section>
  <div class="container text-center">
    <h2>${c.productsTitle}</h2>
    <p style="margin-top:20px;">
      <a class="btn btn-secondary" href="${T.url(lang, 'espacadores')}">${c.spacersCta}</a>
      <a class="btn btn-secondary" href="${T.url(lang, 'kit-vedacao')}">${c.kitsCta}</a>
    </p>
  </div>
</section>
<section>
  <div class="container max-720">
    ${T.faqBlock({ title: ui.faqTitle[lang], items: c.faq })}
  </div>
</section>
${T.ctaBand({ title: ui.receiveProposal[lang], lang })}
`;
  },
};

module.exports = [home, quemSomos, tecnologia, contato, sustentabilidade, catalogo, privacidade, obrigado, salvador];
