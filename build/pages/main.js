'use strict';
const T = require('../templates');
const { business, ui } = require('../data/site');

const t = (obj, lang) => obj[lang];

// ---------------- HOME ----------------
const home = {
  slug: '',
  title: {
    pt: 'Marcanti – Espaçadores de Concreto e Kits de Vedação',
    en: 'Marcanti – Concrete Spacers and Sealing Kits',
    es: 'Marcanti – Espaciadores de Concreto y Kits de Sellado',
  },
  description: {
    pt: 'Transformamos o plástico em produtos de alta qualidade para a construção civil e indústria: espaçadores de concreto e kits de vedação para telhas de PVC.',
    en: 'We transform plastic into high-quality products for civil construction and industry: concrete spacers and sealing kits for PVC roof tiles.',
    es: 'Transformamos el plástico en productos de alta calidad para la construcción civil y la industria: espaciadores de concreto y kits de sellado para tejas de PVC.',
  },
  body(lang) {
    const hero = {
      pt: { h1: 'A base das estruturas sólidas na construção civil e indústrias', p: 'Transformamos o plástico em produtos de alta qualidade para diversos setores da indústria.', cta: 'Fale com Especialistas' },
      en: { h1: 'The foundation of solid structures in civil construction and industry', p: 'We transform plastic into high-quality products for a wide range of industrial sectors.', cta: 'Talk to Our Specialists' },
      es: { h1: 'La base de las estructuras sólidas en la construcción civil y la industria', p: 'Transformamos el plástico en productos de alta calidad para diversos sectores de la industria.', cta: 'Habla con Especialistas' },
    }[lang];

    const espacadoresLabel = { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' }[lang];
    const kitsLabel = { pt: 'Kits de Vedação', en: 'Sealing Kits', es: 'Kits de Sellado' }[lang];

    const sust = {
      pt: { eyebrow: 'Sustentabilidade', title: 'Sustentabilidade', p: 'Na MARCANTI, a responsabilidade ambiental é um compromisso, por isso, nossa matéria-prima é totalmente reciclável, mantendo a alta qualidade e resistência dos nossos produtos, sem impactar no meio ambiente.' },
      en: { eyebrow: 'Sustainability', title: 'Sustainability', p: 'At MARCANTI, environmental responsibility is a commitment — that’s why our raw material is fully recyclable, preserving the high quality and strength of our products without impacting the environment.' },
      es: { eyebrow: 'Sostenibilidad', title: 'Sostenibilidad', p: 'En MARCANTI, la responsabilidad ambiental es un compromiso; por eso, nuestra materia prima es totalmente reciclable, manteniendo la alta calidad y resistencia de nuestros productos sin impactar el medio ambiente.' },
    }[lang];

    const espacadoresTeaser = {
      pt: { eyebrow: 'Espaçadores', title: 'Proteja sua obra da corrosão', p: 'Os espaçadores plásticos têm como funcionalidades garantir o espaçamento e alinhamento adequados da armadura de ferro, protegendo as estruturas da corrosão e melhorando a qualidade e a durabilidade do concreto da sua construção.' },
      en: { eyebrow: 'Spacers', title: 'Protect your project from corrosion', p: 'Plastic spacers ensure proper spacing and alignment of the steel reinforcement, protecting structures from corrosion and improving the quality and durability of your construction’s concrete.' },
      es: { eyebrow: 'Espaciadores', title: 'Protege tu obra de la corrosión', p: 'Los espaciadores plásticos garantizan el espaciamiento y alineación adecuados de la armadura de hierro, protegiendo las estructuras de la corrosión y mejorando la calidad y durabilidad del concreto de tu construcción.' },
    }[lang];

    const kitTeaser = {
      pt: { eyebrow: 'Kit vedação', title: 'Praticidade e confiabilidade', p: 'O Kit de Vedação da MARCANTI é de simples instalação e fácil manuseio, tendo um design minimalista e cores específicas para a sua telha de PVC, que permite uma perfeita cobertura da fixação e uma ótima vedação.' },
      en: { eyebrow: 'Sealing kit', title: 'Practicality and reliability', p: 'The MARCANTI Sealing Kit is simple to install and easy to handle, with a minimalist design and specific colors for your PVC roof tile, providing perfect fastener coverage and outstanding sealing.' },
      es: { eyebrow: 'Kit de sellado', title: 'Practicidad y confiabilidad', p: 'El Kit de Sellado de MARCANTI es de instalación simple y fácil manejo, con un diseño minimalista y colores específicos para tu teja de PVC, permitiendo una cobertura perfecta de la fijación y un sellado excelente.' },
    }[lang];

    const clients = {
      pt: { title: 'Empresas que utilizam nossos produtos', note: 'Construtoras, indústrias e distribuidores em toda a Bahia e no Brasil confiam nos produtos MARCANTI.' },
      en: { title: 'Companies that use our products', note: 'Construction companies, industries and distributors across Bahia and Brazil rely on MARCANTI products.' },
      es: { title: 'Empresas que utilizan nuestros productos', note: 'Constructoras, industrias y distribuidores en toda Bahía y Brasil confían en los productos MARCANTI.' },
    }[lang];

    return `
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

${T.splitSection({ eyebrow: espacadoresTeaser.eyebrow, title: espacadoresTeaser.title, paragraphs: [espacadoresTeaser.p], img: 'corrosao-1.jpg', imgAlt: { pt: 'Armadura de aço corroída por cobrimento de concreto insuficiente', en: 'Steel reinforcement corroded by insufficient concrete cover', es: 'Armadura de acero corroída por recubrimiento de concreto insuficiente' }[lang], reverse: true, bg: true, ctaClass: 'btn-brand', cta: { href: T.url(lang, 'espacadores'), label: ui.learnMore[lang] } })}

${T.splitSection({ eyebrow: kitTeaser.eyebrow, title: kitTeaser.title, paragraphs: [kitTeaser.p], img: 'FOTO02-1-1.jpg', imgAlt: { pt: 'Componentes do kit de vedação Marcanti: chapéu, capa, anel de vedação e parafuso', en: 'MARCANTI sealing kit components: hat, cap, sealing ring and screw', es: 'Componentes del kit de sellado MARCANTI: sombrerete, capa, anillo de sellado y tornillo' }[lang], mediaClass: 'split-media-sm', ctaClass: 'btn-brand', cta: { href: T.url(lang, 'kit-vedacao'), label: ui.learnMore[lang] } })}

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
  title: { pt: 'Quem Somos – Marcanti', en: 'About Us – Marcanti', es: 'Quiénes Somos – Marcanti' },
  description: {
    pt: 'Conheça a MARCANTI: liderança em transformação de plásticos com excelência e inovação, fundada em 2012.',
    en: 'Meet MARCANTI: leadership in plastic transformation with excellence and innovation, founded in 2012.',
    es: 'Conoce MARCANTI: liderazgo en transformación de plásticos con excelencia e innovación, fundada en 2012.',
  },
  body(lang) {
    const c = {
      pt: {
        eyebrow: 'Quem Somos',
        subtitle: 'Liderança em Transformação de Plásticos com Excelência e Inovação',
        title: 'Qualidade Superior em Peças Técnicas de Plástico para Construção Civil e Clientes Exigentes',
        paragraphs: [
          'Fundada em 2012 por um Engenheiro Químico altamente experiente no mercado de plásticos, a MARCANTI é uma empresa que se destaca pela sua excelência. Com uma equipe técnica capacitada e um fundador com formação em mestrado, a empresa está sempre preparada para enfrentar desafios e buscar o desenvolvimento de novos negócios.',
          'Com quatro máquinas de injeção de última geração, a MARCANTI se dedica à transformação de plásticos, focando principalmente na produção de peças técnicas para o mercado da construção civil. Além disso, a empresa também oferece serviços de terceirização da produção de peças para clientes diversos, que possuem um alto nível de exigência.',
          'A MARCANTI busca constantemente aprimorar seus processos e se manter atualizada com as melhores práticas do mercado. Com suas modernas máquinas e um corpo técnico altamente qualificado, a empresa garante a entrega de produtos de alta qualidade, atendendo às demandas dos seus clientes de forma eficiente e confiável.',
          'Com um histórico sólido e uma reputação de excelência, a MARCANTI se destaca como uma referência no setor de transformação de plásticos, oferecendo soluções personalizadas e inovadoras para atender às necessidades específicas de cada cliente.',
        ],
        values: [
          { title: 'Missão', text: 'Crescer prioritariamente através da Inovação.', icon: '13-blueprint.png' },
          { title: 'Visão', text: 'Ser referência na fabricação de seus produtos visando ultrapassar a expectativa dos seus clientes.', icon: '29-engineer.png' },
          { title: 'Princípios e Valores', text: 'Utilizar a ética e transparência em todos os processos internos e externos, cuidando dos seus talentos e do meio ambiente.', icon: '02-ruler.png' },
        ],
      },
      en: {
        eyebrow: 'About Us',
        subtitle: 'Leadership in Plastic Transformation with Excellence and Innovation',
        title: 'Superior Quality in Technical Plastic Parts for Civil Construction and Demanding Clients',
        paragraphs: [
          'Founded in 2012 by a Chemical Engineer with extensive experience in the plastics market, MARCANTI is a company defined by excellence. With a skilled technical team and a founder holding a master’s degree, the company is always ready to face challenges and pursue new business development.',
          'With four state-of-the-art injection molding machines, MARCANTI is dedicated to plastic transformation, focusing mainly on producing technical parts for the civil construction market. The company also offers outsourced parts production services for a variety of clients with high standards.',
          'MARCANTI constantly seeks to improve its processes and stay up to date with the best market practices. With its modern machinery and a highly qualified technical staff, the company guarantees the delivery of high-quality products, meeting client demands efficiently and reliably.',
          'With a solid track record and a reputation for excellence, MARCANTI stands out as a reference in the plastics transformation sector, offering personalized and innovative solutions to meet each client’s specific needs.',
        ],
        values: [
          { title: 'Mission', text: 'To grow primarily through Innovation.', icon: '13-blueprint.png' },
          { title: 'Vision', text: 'To be a reference in manufacturing our products, aiming to exceed our clients’ expectations.', icon: '29-engineer.png' },
          { title: 'Principles and Values', text: 'To act with ethics and transparency in all internal and external processes, while caring for our people and the environment.', icon: '02-ruler.png' },
        ],
      },
      es: {
        eyebrow: 'Quiénes Somos',
        subtitle: 'Liderazgo en Transformación de Plásticos con Excelencia e Innovación',
        title: 'Calidad Superior en Piezas Técnicas de Plástico para la Construcción Civil y Clientes Exigentes',
        paragraphs: [
          'Fundada en 2012 por un Ingeniero Químico altamente experimentado en el mercado de plásticos, MARCANTI es una empresa que se destaca por su excelencia. Con un equipo técnico capacitado y un fundador con formación de maestría, la empresa está siempre preparada para enfrentar desafíos y buscar el desarrollo de nuevos negocios.',
          'Con cuatro máquinas de inyección de última generación, MARCANTI se dedica a la transformación de plásticos, enfocándose principalmente en la producción de piezas técnicas para el mercado de la construcción civil. Además, la empresa también ofrece servicios de tercerización de producción de piezas para diversos clientes con un alto nivel de exigencia.',
          'MARCANTI busca constantemente perfeccionar sus procesos y mantenerse actualizada con las mejores prácticas del mercado. Con sus modernas máquinas y un equipo técnico altamente calificado, la empresa garantiza la entrega de productos de alta calidad, atendiendo las demandas de sus clientes de forma eficiente y confiable.',
          'Con un historial sólido y una reputación de excelencia, MARCANTI se destaca como referencia en el sector de transformación de plásticos, ofreciendo soluciones personalizadas e innovadoras para atender las necesidades específicas de cada cliente.',
        ],
        values: [
          { title: 'Misión', text: 'Crecer prioritariamente a través de la Innovación.', icon: '13-blueprint.png' },
          { title: 'Visión', text: 'Ser referencia en la fabricación de sus productos, buscando superar las expectativas de sus clientes.', icon: '29-engineer.png' },
          { title: 'Principios y Valores', text: 'Utilizar la ética y la transparencia en todos los procesos internos y externos, cuidando a su talento humano y al medio ambiente.', icon: '02-ruler.png' },
        ],
      },
    }[lang];

    return `
${T.pageHero({ title: c.eyebrow, subtitle: c.subtitle, bg: 'Quem-Somos.jpg', tag: 'h1', divider: true, warm: true })}
${T.splitSection({ title: c.title, paragraphs: c.paragraphs.slice(0, 2), img: 'FOTO05.jpg', imgAlt: { pt: 'Espaçadores plásticos multiapoio produzidos pela Marcanti', en: 'Multi-support plastic spacers produced by MARCANTI', es: 'Separadores plásticos multiapoyo producidos por MARCANTI' }[lang], splitClass: 'split-roomy' })}
${T.splitSection({ paragraphs: c.paragraphs.slice(2), img: 'Quem-Somos.jpg', imgAlt: { pt: 'Engenheiro analisando as plantas de um projeto de construção', en: 'Engineer reviewing the blueprints of a construction project', es: 'Ingeniero analizando los planos de un proyecto de construcción' }[lang], reverse: true, splitClass: 'split-roomy' })}
${T.valueGrid({ values: c.values })}
`;
  },
};

// ---------------- TECNOLOGIA ----------------
const tecnologia = {
  slug: 'desenvolvimento-de-produtos',
  title: { pt: 'Desenvolvimento de Produtos Plásticos – Marcanti', en: 'Plastic Product Development – Marcanti', es: 'Desarrollo de Productos Plásticos – Marcanti' },
  description: {
    pt: 'Consultoria em Desenvolvimento de Produtos na Indústria de Transformações Plásticas.',
    en: 'Product Development Consulting in the Plastics Transformation Industry.',
    es: 'Consultoría en Desarrollo de Productos en la Industria de Transformación de Plásticos.',
  },
  body(lang) {
    const c = {
      pt: {
        eyebrow: 'Desenvolvimento de Produtos',
        title: 'Consultoria em Desenvolvimento de Produtos Plásticos',
        paragraphs: [
          'Entender e identificar o que seu cliente necessita e manter a alta qualidade dos seus produtos, são fatores fundamentais para que sua empresa obtenha sucesso.',
          'Visando promover o desenvolvimento de produtos inovadores, a MARCANTI também realiza Consultoria em Desenvolvimento de Produtos na Indústria de Transformações Plásticas.',
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
          'Understanding and identifying what your client needs, and maintaining the high quality of your products, are fundamental factors for your company’s success.',
          'Aiming to promote the development of innovative products, MARCANTI also provides Product Development Consulting in the Plastics Transformation Industry.',
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
          'Entender e identificar lo que su cliente necesita y mantener la alta calidad de sus productos son factores fundamentales para que su empresa tenga éxito.',
          'Con el objetivo de promover el desarrollo de productos innovadores, MARCANTI también ofrece Consultoría en Desarrollo de Productos en la Industria de Transformación de Plásticos.',
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
  title: { pt: 'Contato – Marcanti', en: 'Contact – Marcanti', es: 'Contacto – Marcanti' },
  description: {
    pt: 'Entre em contato com a MARCANTI e solicite seu orçamento de espaçadores de concreto e kits de vedação.',
    en: 'Get in touch with MARCANTI and request your quote for concrete spacers and sealing kits.',
    es: 'Ponte en contacto con MARCANTI y solicita tu presupuesto de espaciadores de concreto y kits de sellado.',
  },
  body(lang) {
    const c = {
      pt: {
        title: 'Bem-vindo(a) à nossa página de contato!',
        paragraphs: [
          'Preencha este formulário agora solicitando seu orçamento, dúvidas ou sugestões, que entraremos em contato com você o mais rápido possível.',
          'Estamos ansiosos para atendê-lo(a), proporcionar a melhor experiência possível e compartilhar as últimas inovações e soluções na construção civil. Entre em contato e temos a certeza que faremos uma grande parceira para crescermos juntos e mais fortes.',
          'Estamos aqui para atender às suas necessidades e construir um futuro de sucesso.',
        ],
      },
      en: {
        title: 'Welcome to our contact page!',
        paragraphs: [
          'Fill out this form now to request your quote, ask questions or share suggestions, and we will get back to you as soon as possible.',
          'We look forward to assisting you, providing the best possible experience and sharing the latest innovations and solutions in civil construction. Get in touch — we are certain we will build a great partnership to grow together, stronger.',
          'We are here to meet your needs and build a successful future.',
        ],
      },
      es: {
        title: '¡Bienvenido(a) a nuestra página de contacto!',
        paragraphs: [
          'Completa este formulario ahora para solicitar tu presupuesto, dudas o sugerencias, y nos pondremos en contacto contigo lo antes posible.',
          'Estamos ansiosos por atenderte, brindarte la mejor experiencia posible y compartir las últimas innovaciones y soluciones en la construcción civil. Contáctanos y estamos seguros de que formaremos una gran alianza para crecer juntos y más fuertes.',
          'Estamos aquí para atender tus necesidades y construir un futuro de éxito.',
        ],
      },
    }[lang];
    const submitLabel = { pt: 'Solicite seu orçamento', en: 'Request your quote', es: 'Solicita tu presupuesto' }[lang];
    return `
<section class="page-hero warm">
  <div class="container contact-layout">
    <div class="contact-card">
      <h1>${c.title}</h1>
      <span class="hero-divider"></span>
      ${c.paragraphs.map((p) => `<p>${p}</p>`).join('')}
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
  title: { pt: 'Sustentabilidade – Marcanti', en: 'Sustainability – Marcanti', es: 'Sostenibilidad – Marcanti' },
  description: {
    pt: 'Na MARCANTI buscamos constantemente soluções eco-friendly na indústria de plásticos. Matéria-prima 100% reciclável.',
    en: 'At MARCANTI we constantly pursue eco-friendly solutions in the plastics industry. 100% recyclable raw material.',
    es: 'En MARCANTI buscamos constantemente soluciones eco-friendly en la industria de plásticos. Materia prima 100% reciclable.',
  },
  body(lang) {
    const c = {
      pt: {
        eyebrow: 'Sustentabilidade',
        intro: 'Comprometidos com um futuro sustentável, na MARCANTI buscamos constantemente soluções eco-friendly na indústria de plásticos para preservar o meio ambiente e criar um impacto positivo na sociedade.',
        title: 'Nosso processo sustentável',
        paragraphs: [
          'Pensando em uma forma de medir o desempenho de sustentabilidade da MARCANTI, nossa empresa é pautada no ESG (Environmental, Social e Governance), que diz respeito à integração da geração de valor econômico aliado à preocupação com as questões ambientais, sociais e de governança corporativa.',
          'Nossos princípios e valores estão muito ligados à responsabilidade e comprometimento social e ambiental com o mercado que atuamos, nossos clientes, colaboradores e fornecedores.',
          'Nossa matéria-prima é 100% reciclável, mantendo a alta qualidade e resistência dos nossos produtos, sem impactar no meio ambiente.',
        ],
      },
      en: {
        eyebrow: 'Sustainability',
        intro: 'Committed to a sustainable future, at MARCANTI we constantly pursue eco-friendly solutions in the plastics industry to preserve the environment and create a positive impact on society.',
        title: 'Our sustainable process',
        paragraphs: [
          'As a way to measure MARCANTI’s sustainability performance, our company is guided by ESG (Environmental, Social and Governance) principles, which integrate the generation of economic value with concern for environmental, social and corporate governance issues.',
          'Our principles and values are deeply tied to responsibility and social and environmental commitment toward the market we serve, our clients, employees and suppliers.',
          'Our raw material is 100% recyclable, preserving the high quality and strength of our products without impacting the environment.',
        ],
      },
      es: {
        eyebrow: 'Sostenibilidad',
        intro: 'Comprometidos con un futuro sostenible, en MARCANTI buscamos constantemente soluciones eco-friendly en la industria de plásticos para preservar el medio ambiente y crear un impacto positivo en la sociedad.',
        title: 'Nuestro proceso sostenible',
        paragraphs: [
          'Como una forma de medir el desempeño de sostenibilidad de MARCANTI, nuestra empresa se guía por el ESG (Environmental, Social and Governance), que integra la generación de valor económico junto con la preocupación por las cuestiones ambientales, sociales y de gobernanza corporativa.',
          'Nuestros principios y valores están muy ligados a la responsabilidad y el compromiso social y ambiental con el mercado en el que actuamos, nuestros clientes, colaboradores y proveedores.',
          'Nuestra materia prima es 100% reciclable, manteniendo la alta calidad y resistencia de nuestros productos, sin impactar el medio ambiente.',
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
  title: { pt: 'Catálogo de Produtos – Marcanti', en: 'Product Catalog – Marcanti', es: 'Catálogo de Productos – Marcanti' },
  description: {
    pt: 'Baixe o catálogo completo de produtos MARCANTI: espaçadores de concreto e kits de vedação.',
    en: 'Download the complete MARCANTI product catalog: concrete spacers and sealing kits.',
    es: 'Descarga el catálogo completo de productos MARCANTI: espaciadores de concreto y kits de sellado.',
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
  title: { pt: 'Política de Privacidade – Marcanti', en: 'Privacy Policy – Marcanti', es: 'Política de Privacidad – Marcanti' },
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

module.exports = [home, quemSomos, tecnologia, contato, sustentabilidade, catalogo, privacidade];
