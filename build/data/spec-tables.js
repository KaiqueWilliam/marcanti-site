// Measurement tables for the spacer product pages — transcribed from the catalog
// dimension drawings (assets/img/Title*.png and the two WhatsApp jpegs), which are
// kept on the page only as a visual reference. These objects are the source of
// truth that gets rendered as a real HTML <table> (SEO + mobile + copy-paste).
'use strict';

// "Até 16" / "Up to 16" / "Hasta 16"
const upTo = (v) => ({ pt: `Até ${v}`, en: `Up to ${v}`, es: `Hasta ${v}` });

const COL = {
  modelo: { id: 'modelo', label: { pt: 'Modelo', en: 'Model', es: 'Modelo' } },
  a: { id: 'a', label: { pt: 'Dimensão A (mm)', en: 'Dimension A (mm)', es: 'Dimensión A (mm)' } },
  b: { id: 'b', label: { pt: 'Dimensão B (mm)', en: 'Dimension B (mm)', es: 'Dimensión B (mm)' } },
  c: { id: 'c', label: { pt: 'Dimensão C (mm)', en: 'Dimension C (mm)', es: 'Dimensión C (mm)' } },
  d: { id: 'd', label: { pt: 'Dimensão D (mm)', en: 'Dimension D (mm)', es: 'Dimensión D (mm)' } },
  e: { id: 'e', label: { pt: 'Dimensão E (mm)', en: 'Dimension E (mm)', es: 'Dimensión E (mm)' } },
  acoMm: { id: 'acoMm', label: { pt: 'Aço (mm)', en: 'Rebar (mm)', es: 'Acero (mm)' } },
  acoPol: { id: 'acoPol', label: { pt: 'Aço (pol)', en: 'Rebar (in)', es: 'Acero (pulg)' } },
  pack: { id: 'pack', label: { pt: 'Peças / embalagem', en: 'Pieces / pack', es: 'Piezas / paquete' } },
};

const onRequest = { pt: 'Sob consulta', en: 'On request', es: 'Bajo consulta' };

// Cadeirinha (CD) — Linha Postes + Linha Construção (Title.png)
const cadeirinha = {
  cols: [COL.modelo, COL.a, COL.b, COL.acoMm, COL.acoPol],
  rows: [
    { modelo: 'CD 25-15', a: '25', b: '15', acoMm: upTo('16'), acoPol: upTo('5/8"') },
    { modelo: 'CD 25-20', a: '25', b: '20', acoMm: upTo('16'), acoPol: upTo('5/8"') },
    { modelo: 'CD 25-30', a: '25', b: '30', acoMm: upTo('16'), acoPol: upTo('5/8"') },
  ],
};

// Espaçador Circular Aberto (EC) — Linha Postes + Linha Construção (Title-2.png)
const circularAberto = {
  cols: [COL.modelo, COL.a, COL.b, COL.acoMm, COL.acoPol],
  rows: [
    { modelo: 'EC 15', a: '40', b: '15', acoMm: '4,2 – 12,5', acoPol: '3/16" – 1/2"' },
    { modelo: 'EC 20', a: '50', b: '20', acoMm: '4,2 – 12,5', acoPol: '3/16" – 1/2"' },
    { modelo: 'EC 25', a: '59', b: '25', acoMm: '4,2 – 12,5', acoPol: '3/16" – 1/2"' },
    { modelo: 'EC 30', a: '70', b: '30', acoMm: '4,2 – 12,5', acoPol: '3/16" – 1/2"' },
    { modelo: 'EC 35', a: '81', b: '35', acoMm: '4,2 – 16', acoPol: '3/16" – 5/8"' },
    { modelo: 'EC 40', a: '89', b: '40', acoMm: '4,2 – 16', acoPol: '3/16" – 5/8"' },
  ],
};

// Espaçador Circular Fechado (ECF) — Linha Postes (Title-1.png)
const circularFechado = {
  cols: [COL.modelo, COL.a, COL.b, COL.acoMm, COL.acoPol],
  rows: [
    { modelo: 'ECF 15-12', a: '42', b: '15', acoMm: upTo('10'), acoPol: upTo('3/8"') },
    { modelo: 'ECF 15-15', a: '45', b: '15', acoMm: upTo('12,5'), acoPol: upTo('1/2"') },
    { modelo: 'ECF 15-20', a: '50', b: '15', acoMm: upTo('16'), acoPol: upTo('5/8"') },
    { modelo: 'ECF 20-12', a: '52', b: '20', acoMm: upTo('10'), acoPol: upTo('3/8"') },
    { modelo: 'ECF 20-15', a: '55', b: '20', acoMm: upTo('12,5'), acoPol: upTo('1/2"') },
    { modelo: 'ECF 20-20', a: '60', b: '20', acoMm: upTo('16'), acoPol: upTo('5/8"') },
  ],
};

// Espaçador Circular Fechado Ferro Duplo — Linha Postes (WhatsApp-...-10.29.36 jpeg)
const circularFechadoFerroDuplo = {
  cols: [COL.modelo, COL.a, COL.b, COL.c, COL.d, COL.acoMm, COL.acoPol, COL.pack],
  rows: [
    { modelo: 'ECF 20-12', a: '55', b: '20', c: '2', d: '12,5', acoMm: upTo('12,5'), acoPol: upTo('1/2"'), pack: '1.500' },
  ],
};

// Espaçadores Multiapoio (EMA M) — Linha Construção (Title-3.png)
const multiapoio = {
  cols: [COL.modelo, COL.a],
  rows: [
    { modelo: 'EMA M15', a: '15' },
    { modelo: 'EMA M20', a: '20' },
    { modelo: 'EMA M25', a: '25' },
    { modelo: 'EMA M30', a: '30' },
    { modelo: 'EMA M35', a: '35' },
    { modelo: 'EMA M40', a: '40' },
  ],
  note: {
    pt: 'Comprimento (120 mm) e largura (40 mm) são iguais em todos os modelos — só a altura (A) muda.',
    en: 'Length (120 mm) and width (40 mm) are the same on every model — only the height (A) changes.',
    es: 'El largo (120 mm) y el ancho (40 mm) son iguales en todos los modelos — solo cambia la altura (A).',
  },
};

// Cadeirinha Pesado (CDP) — WhatsApp-...-09.30.20 jpeg
const cadeirinhaPesado = {
  cols: [COL.modelo, COL.a, COL.b, COL.c, COL.d, COL.e, COL.acoMm, COL.acoPol, COL.pack],
  rows: [
    { modelo: 'CDP 25-30', a: '30', b: '25', c: '25', d: '20', e: '9', acoMm: upTo('25'), acoPol: upTo('1"'), pack: onRequest },
    { modelo: 'CDP 25-35', a: '35', b: '25', c: '25', d: '20', e: '9', acoMm: upTo('25'), acoPol: upTo('1"'), pack: '750' },
    { modelo: 'CDP 25-40', a: '40', b: '25', c: '25', d: '20', e: '9', acoMm: upTo('25'), acoPol: upTo('1"'), pack: '650' },
    { modelo: 'CDP 25-50', a: '50', b: '25', c: '25', d: '20', e: '9', acoMm: upTo('25'), acoPol: upTo('1"'), pack: '550' },
  ],
};

// Bloco "como escolher o modelo" do hub de espaçadores (auditoria 4.3).
// Os códigos vêm das tabelas acima, não do texto da auditoria: ela cita
// "CDL 25-15" e "ECF 20-16", que não existem no catálogo (são CD e ECF 20-20).
const comoEscolher = {
  cols: [
    { id: 'armadura', label: { pt: 'Se a armadura é', en: 'If the reinforcement is', es: 'Si la armadura es' } },
    { id: 'use', label: { pt: 'Use', en: 'Use', es: 'Usa' } },
    { id: 'modelos', label: { pt: 'Modelos', en: 'Models', es: 'Modelos' } },
  ],
  rows: [
    {
      armadura: { pt: 'Vertical — pilar, lateral de viga, poste', en: 'Vertical — column, beam side, pole', es: 'Vertical — pilar, lateral de viga, poste' },
      use: { pt: 'Circular aberto ou fechado', en: 'Open or closed circular', es: 'Circular abierto o cerrado' },
      modelos: 'EC 15 a EC 40 · ECF 15-12 a ECF 20-20',
    },
    {
      armadura: { pt: 'Horizontal leve — fundo de viga, laje', en: 'Light horizontal — beam soffit, slab', es: 'Horizontal ligera — fondo de viga, losa' },
      use: { pt: 'Cadeirinha ou multiapoio', en: 'Chair or multi-support', es: 'Silla o multiapoyo' },
      modelos: 'CD 25-15 a CD 25-30 · EMA M15 a EMA M40',
    },
    {
      armadura: { pt: 'Horizontal pesada — laje espessa, sapata, bloco', en: 'Heavy horizontal — thick slab, footing, pile cap', es: 'Horizontal pesada — losa gruesa, zapata, bloque' },
      use: { pt: 'Cadeirinha pesado', en: 'Heavy chair', es: 'Silla pesada' },
      modelos: 'CDP 25-30 a CDP 25-50',
    },
  ],
  note: {
    pt: 'Na dúvida, descreva a aplicação na cotação — nós indicamos o modelo.',
    en: 'Not sure? Describe the application in your quote request and we will recommend the model.',
    es: '¿En duda? Describe la aplicación en la cotización y nosotros indicamos el modelo.',
  },
};

module.exports = {
  comoEscolher,
  cadeirinha,
  circularAberto,
  circularFechado,
  circularFechadoFerroDuplo,
  multiapoio,
  cadeirinhaPesado,
};
