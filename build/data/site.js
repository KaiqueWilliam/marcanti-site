// Shared site-wide data: languages, business info, navigation tree, footer, common UI strings.
'use strict';

const LANGS = ['pt', 'en', 'es'];

const business = {
  phoneDisplay: '+55 71 9 9985-1125',
  whatsappNumber: '5571999851125',
  whatsappMessage: {
    pt: 'Olá, quero fazer um orçamento na MARCANTI',
    en: 'Hello, I would like to request a quote from MARCANTI',
    es: 'Hola, quiero solicitar un presupuesto a MARCANTI',
  },
  email: 'contato@marcanti.ind.br',
  hours: {
    pt: 'Seg a Sex das 07h às 17h',
    en: 'Mon–Fri, 7am to 5pm',
    es: 'Lun a Vie de 07h a 17h',
  },
  addressLines: [
    'Rua Estrela do Mar, 546',
    'Quadra 04 – Lote 14 – Galpão 02',
    'Buraquinho – Lauro de Freitas – Bahia',
    'CEP: 42710-570, Brasil',
  ],
  linkedin: 'https://br.linkedin.com/company/marcanti-pl-sticos',
  instagram: 'https://instagram.com/marcantiplasticos',
  catalogUrl: 'https://drive.google.com/file/d/1fv_CMziaxdMT8-CmR9kagBYCmf1rM0r2/view?usp=sharing',
};

function waLink(lang) {
  const text = encodeURIComponent(business.whatsappMessage[lang]);
  return `https://api.whatsapp.com/send/?phone=${business.whatsappNumber}&text=${text}&type=phone_number&app_absent=0`;
}

// Navigation tree. `slug` is identical across languages (kept simple & maintainable),
// only the labels are translated.
const navTree = [
  { key: 'quem-somos', slug: 'quem-somos', label: { pt: 'Quem Somos', en: 'About Us', es: 'Quiénes Somos' } },
  { key: 'blog', slug: 'blog', label: { pt: 'Blog', en: 'Blog', es: 'Blog' } },
  {
    key: 'espacadores', slug: 'espacadores', label: { pt: 'Espaçadores', en: 'Spacers', es: 'Espaciadores' },
    children: [
      {
        key: 'linha-postes', slug: 'espacadores/linha-postes', label: { pt: 'Linha Postes', en: 'Pole Line', es: 'Línea Postes' },
        children: [
          { key: 'cadeirinha-postes', slug: 'espacadores/linha-postes/cadeirinha-linha-postes', label: { pt: 'Cadeirinha Linha Postes', en: 'Chair Spacer – Pole Line', es: 'Separador Silla – Línea Postes' } },
          { key: 'circular-fechado-postes', slug: 'espacadores/linha-postes/circular-fechado-linha-postes', label: { pt: 'Circular Fechado Linha Postes', en: 'Closed Circular Spacer – Pole Line', es: 'Separador Circular Cerrado – Línea Postes' } },
          { key: 'circular-aberto-postes', slug: 'espacadores/linha-postes/circular-aberto-linha-postes', label: { pt: 'Circular Aberto Linha Postes', en: 'Open Circular Spacer – Pole Line', es: 'Separador Circular Abierto – Línea Postes' } },
        ],
      },
      {
        key: 'linha-construcao', slug: 'espacadores/linha-construcao', label: { pt: 'Linha Construção', en: 'Construction Line', es: 'Línea Construcción' },
        children: [
          { key: 'cadeirinha-construcao', slug: 'espacadores/linha-construcao/cadeirinha-linha-construcao', label: { pt: 'Cadeirinha Linha Construção', en: 'Chair Spacer – Construction Line', es: 'Separador Silla – Línea Construcción' } },
          { key: 'cadeirinha-pesada', slug: 'espacadores/cadeirinha-pesada', label: { pt: 'Cadeirinha Pesado', en: 'Heavy Chair Spacer', es: 'Separador Silla Pesada' } },
          { key: 'circular-aberto-construcao', slug: 'espacadores/linha-construcao/circular-aberto-linha-construcao', label: { pt: 'Circular Aberto Linha Construção', en: 'Open Circular Spacer – Construction Line', es: 'Separador Circular Abierto – Línea Construcción' } },
          { key: 'multiapoio-construcao', slug: 'espacadores/linha-construcao/espacadores-multiapoio-linha-construcao', label: { pt: 'Espaçadores Multiapoio Linha Construção', en: 'Multi-Support Spacer – Construction Line', es: 'Separador Multiapoyo – Línea Construcción' } },
        ],
      },
    ],
  },
  {
    key: 'kit-vedacao', slug: 'kit-vedacao', label: { pt: 'Kit Vedação', en: 'Sealing Kit', es: 'Kit de Sellado' },
    children: [
      { key: 'kit-fixacao-universal', slug: 'kit-vedacao/kit-vedacao-e-fixacao-universal', label: { pt: 'Kit Vedação e Fixação Universal', en: 'Universal Sealing & Fixing Kit', es: 'Kit Universal de Sellado y Fijación' } },
      { key: 'kit-universal', slug: 'kit-vedacao/kit-de-vedacao-universal-para-diversos-tipos-de-telhas', label: { pt: 'Kit de Vedação Universal Para Diversos Tipos de Telhas', en: 'Universal Sealing Kit for Various Roof Tile Types', es: 'Kit de Sellado Universal para Varios Tipos de Tejas' } },
      { key: 'kit-pvc', slug: 'kit-vedacao/kit-vedacao-para-telha-de-pvc', label: { pt: 'Kit Vedação Para Telha de PVC', en: 'Sealing Kit for PVC Roof Tiles', es: 'Kit de Sellado para Teja de PVC' } },
      { key: 'kit-pvc-fixacao', slug: 'kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc', label: { pt: 'Kit Vedação e Fixação Para Telha de PVC', en: 'Sealing & Fixing Kit for PVC Roof Tiles', es: 'Kit de Sellado y Fijación para Teja de PVC' } },
    ],
  },
  // Renomeada de "Tecnologia" (auditoria 3.6): a URL e o rótulo não correspondiam
  // ao conteúdo, que é consultoria em desenvolvimento de produtos. 301 no .htaccess.
  { key: 'desenvolvimento', slug: 'desenvolvimento-de-produtos', label: { pt: 'Desenvolvimento de Produtos', en: 'Product Development', es: 'Desarrollo de Productos' } },
  { key: 'contato', slug: 'contato', label: { pt: 'Contato', en: 'Contact', es: 'Contacto' } },
];

const topBarExtra = [
  { key: 'sustentabilidade', slug: 'sustentabilidade', label: { pt: 'Sustentabilidade', en: 'Sustainability', es: 'Sostenibilidad' } },
  { key: 'catalogo', slug: 'catalogo-de-produtos', label: { pt: 'Catálogo', en: 'Catalog', es: 'Catálogo' } },
];

// Campos do formulário de cotação (auditoria 3.7 / 4.10). Os `value` das listas
// são slugs estáveis, iguais nos 3 idiomas: um lead vindo da página ES chega no
// e-mail/CRM com o mesmo identificador de um lead da página PT. O contato.php
// traduz o slug de volta para o rótulo em português na hora de montar o e-mail.
const form = {
  selectPlaceholder: { pt: 'Selecione...', en: 'Select...', es: 'Selecciona...' },
  optional: { pt: 'opcional', en: 'optional', es: 'opcional' },
  name: {
    label: { pt: 'Nome', en: 'Name', es: 'Nombre' },
    placeholder: { pt: 'Seu nome', en: 'Your name', es: 'Tu nombre' },
  },
  company: {
    label: { pt: 'Empresa', en: 'Company', es: 'Empresa' },
    placeholder: { pt: 'Nome da empresa', en: 'Company name', es: 'Nombre de la empresa' },
  },
  email: {
    label: { pt: 'E-mail', en: 'Email', es: 'Correo electrónico' },
    placeholder: { pt: 'seu@email.com.br', en: 'you@email.com', es: 'tu@correo.com' },
  },
  phone: {
    label: { pt: 'Telefone / WhatsApp', en: 'Phone / WhatsApp', es: 'Teléfono / WhatsApp' },
    placeholder: { pt: '(71) 9 9999-9999', en: '+55 71 99999-9999', es: '+55 71 99999-9999' },
  },
  city: {
    label: { pt: 'Cidade / UF', en: 'City / State', es: 'Ciudad / Estado' },
    placeholder: { pt: 'Salvador / BA', en: 'Salvador / BA', es: 'Salvador / BA' },
  },
  segment: {
    label: { pt: 'Segmento', en: 'Segment', es: 'Segmento' },
    options: [
      { value: 'construtora', label: { pt: 'Construtora', en: 'Construction company', es: 'Constructora' } },
      { value: 'pre-moldados', label: { pt: 'Fábrica de pré-moldados', en: 'Precast concrete plant', es: 'Fábrica de prefabricados' } },
      { value: 'loja-material', label: { pt: 'Loja de material de construção', en: 'Building materials store', es: 'Tienda de materiales de construcción' } },
      { value: 'telha-pvc', label: { pt: 'Indústria de telha de PVC', en: 'PVC roof tile manufacturer', es: 'Industria de tejas de PVC' } },
      { value: 'terceirizacao', label: { pt: 'Terceirização de injeção', en: 'Outsourced injection molding', es: 'Tercerización de inyección' } },
      { value: 'outro', label: { pt: 'Outro', en: 'Other', es: 'Otro' } },
    ],
  },
  product: {
    label: { pt: 'Produto de interesse', en: 'Product of interest', es: 'Producto de interés' },
    options: [
      { value: 'espacadores-construcao', label: { pt: 'Espaçadores – Linha Construção', en: 'Spacers – Construction Line', es: 'Espaciadores – Línea Construcción' } },
      { value: 'espacadores-postes', label: { pt: 'Espaçadores – Linha Postes', en: 'Spacers – Pole Line', es: 'Espaciadores – Línea Postes' } },
      { value: 'kit-vedacao', label: { pt: 'Kit de vedação', en: 'Sealing kit', es: 'Kit de sellado' } },
      { value: 'injecao-terceirizada', label: { pt: 'Injeção terceirizada', en: 'Outsourced injection molding', es: 'Inyección tercerizada' } },
      { value: 'nao-sei', label: { pt: 'Não sei ainda', en: 'Not sure yet', es: 'Aún no lo sé' } },
    ],
  },
  quantity: {
    label: { pt: 'Quantidade estimada', en: 'Estimated quantity', es: 'Cantidad estimada' },
    placeholder: { pt: 'Ex.: 5.000 peças', en: 'e.g. 5,000 pieces', es: 'Ej.: 5.000 piezas' },
  },
  message: {
    label: { pt: 'Mensagem', en: 'Message', es: 'Mensaje' },
    placeholder: {
      pt: 'Informe modelo, cobrimento e quantidade. Se ainda não tiver a especificação, descreva a aplicação.',
      en: 'Tell us the model, concrete cover and quantity. If you do not have the spec yet, describe the application.',
      es: 'Indica modelo, recubrimiento y cantidad. Si aún no tienes la especificación, describe la aplicación.',
    },
  },
  consent: {
    // {link} é substituído pelo <a> para a Política de Privacidade no template.
    text: {
      pt: 'Autorizo a Marcanti a usar meus dados para responder a esta solicitação, conforme a {link}. Posso solicitar a exclusão a qualquer momento.',
      en: 'I authorize Marcanti to use my data to respond to this request, in accordance with the {link}. I may request deletion at any time.',
      es: 'Autorizo a Marcanti a usar mis datos para responder a esta solicitud, conforme a la {link}. Puedo solicitar la eliminación en cualquier momento.',
    },
  },
};

const ui = {
  requestQuote: { pt: 'Solicitar Orçamento', en: 'Request a Quote', es: 'Solicitar Presupuesto' },
  sendMessage: { pt: 'Enviar Mensagem', en: 'Send Message', es: 'Enviar Mensaje' },
  sending: { pt: 'Enviando...', en: 'Sending...', es: 'Enviando...' },
  formSuccess: { pt: 'Mensagem enviada com sucesso! Retornaremos em breve.', en: 'Message sent successfully! We will get back to you shortly.', es: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.' },
  formError: { pt: 'Algo deu errado. Tente novamente ou fale conosco pelo WhatsApp.', en: 'Something went wrong. Please try again or reach us on WhatsApp.', es: 'Algo salió mal. Intenta de nuevo o contáctanos por WhatsApp.' },
  learnMore: { pt: 'Saiba Mais', en: 'Learn More', es: 'Saber Más' },
  viewProduct: { pt: 'Ver Produto', en: 'View Product', es: 'Ver Producto' },
  downloadCatalog: { pt: 'Baixar Catálogo', en: 'Download Catalog', es: 'Descargar Catálogo' },
  readMore: { pt: 'Ler Mais', en: 'Read More', es: 'Leer Más' },
  recentPosts: { pt: 'Posts Recentes', en: 'Recent Posts', es: 'Publicaciones Recientes' },
  shareLabel: { pt: 'Gostou do Conteúdo? Compartilhe!', en: 'Liked this content? Share it!', es: '¿Te gustó el contenido? ¡Compártelo!' },
  home: { pt: 'Início', en: 'Home', es: 'Inicio' },
  ourBlog: { pt: 'Nosso Blog', en: 'Our Blog', es: 'Nuestro Blog' },
  siteTitleSuffix: { pt: '– Marcanti', en: '– Marcanti', es: '– Marcanti' },
  privacyPolicy: { pt: 'Política de Privacidade', en: 'Privacy Policy', es: 'Política de Privacidad' },
  aboutFooter: { pt: 'Transformamos o plástico em material técnico para a construção civil e para a indústria.', en: 'We transform plastic into technical material for civil construction and industry.', es: 'Transformamos el plástico en material técnico para la construcción civil y la industria.' },
  whereWeAre: { pt: 'Onde Estamos:', en: 'Where We Are:', es: 'Dónde Estamos:' },
  productsLabel: { pt: 'Produtos', en: 'Products', es: 'Productos' },
  contactUsLabel: { pt: 'Fale Conosco', en: 'Contact Us', es: 'Contáctanos' },
  socialLabel: { pt: 'Redes Sociais', en: 'Social Media', es: 'Redes Sociales' },
  catalogLabel: { pt: 'Catálogo', en: 'Catalog', es: 'Catálogo' },
  receiveProposal: { pt: 'Receba a sua proposta', en: 'Get your proposal', es: 'Recibe tu propuesta' },
  allRightsReserved: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
  aboutProduct: { pt: 'Sobre o Produto', en: 'About the Product', es: 'Sobre el Producto' },
  fitSystem: { pt: 'Sistema de Encaixe e Aplicação', en: 'Fitting System & Application', es: 'Sistema de Encaje y Aplicación' },
  availableSizes: { pt: 'Tamanhos Disponíveis', en: 'Available Sizes', es: 'Tamaños Disponibles' },
  availableColors: { pt: 'Cores Disponíveis', en: 'Available Colors', es: 'Colores Disponibles' },
  availableModels: { pt: 'Modelos Disponíveis', en: 'Available Models', es: 'Modelos Disponibles' },
};

module.exports = { LANGS, business, waLink, navTree, topBarExtra, ui, form };
