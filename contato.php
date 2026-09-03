<?php
/**
 * Contact form mail handler for the Marcanti website.
 * Receives the POST from /pt|en|es/contato/ (assets/js/main.js) and sends an email via PHP mail().
 * Works out of the box on HostGator shared hosting (PHP + mail() enabled by default).
 *
 * The qualification fields (company, city, segment, product, quantity) exist so the
 * sales team can prioritise the lead and quote on the first reply — see the site
 * audit, sections 3.7 / 4.10.
 */

header('Content-Type: application/json; charset=utf-8');

// Where quote requests should be delivered. Change this if needed.
$to = 'contato@marcanti.ind.br';

function respond($ok, $extra = []) {
    echo json_encode(array_merge(['ok' => $ok], $extra));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false);
}

// Honeypot: if this hidden field was filled in, silently pretend success (bot trap).
if (!empty($_POST['website'])) {
    respond(true);
}

$field = fn($k) => trim($_POST[$k] ?? '');

$name     = $field('name');
$company  = $field('company');
$email    = $field('email');
$phone    = $field('phone');
$city     = $field('city');
$segment  = $field('segment');
$product  = $field('product');
$quantity = $field('quantity');
$message  = $field('message');
$lang     = $field('lang') ?: 'pt';
$consent  = !empty($_POST['consent']);

// The selects post stable slugs (same in every language) so a lead from the ES
// page lands in the inbox/CRM with the same identifier as one from the PT page.
// Anything not on these lists is discarded rather than echoed into the email.
$segments = [
    'construtora'   => 'Construtora',
    'pre-moldados'  => 'Fábrica de pré-moldados',
    'loja-material' => 'Loja de material de construção',
    'telha-pvc'     => 'Indústria de telha de PVC',
    'terceirizacao' => 'Terceirização de injeção',
    'outro'         => 'Outro',
];
$products = [
    'espacadores-construcao' => 'Espaçadores – Linha Construção',
    'espacadores-postes'     => 'Espaçadores – Linha Postes',
    'kit-vedacao'            => 'Kit de vedação',
    'injecao-terceirizada'   => 'Injeção terceirizada',
    'nao-sei'                => 'Não sei ainda',
];

$segmentLabel = $segments[$segment] ?? '';
$productLabel = $products[$product] ?? '';

$missingRequired = $name === '' || $company === '' || $email === '' || $phone === ''
    || $city === '' || $segmentLabel === '' || $productLabel === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL);

// LGPD: without the explicit consent checkbox there is no lawful basis to store
// or answer the lead, so the submission is rejected rather than silently sent.
if ($missingRequired || !$consent) {
    http_response_code(422);
    respond(false);
}

$subjects = [
    'pt' => 'Nova cotação pelo site - MARCANTI',
    'en' => 'New quote request - MARCANTI',
    'es' => 'Nueva solicitud de presupuesto - MARCANTI',
];
$subject = $subjects[$lang] ?? $subjects['pt'];
$subject .= ' | ' . $segmentLabel . ' | ' . $productLabel;

// Strips CR/LF so a crafted value cannot inject extra mail headers.
$safe = fn($s) => str_replace(["\r", "\n"], ' ', $s);

$body = "Nome:      {$name}\n"
      . "Empresa:   {$company}\n"
      . "E-mail:    {$email}\n"
      . "Telefone:  {$phone}\n"
      . "Cidade/UF: {$city}\n"
      . "Segmento:  {$segmentLabel}\n"
      . "Produto:   {$productLabel}\n"
      . "Quantidade: " . ($quantity !== '' ? $quantity : '(não informada)') . "\n"
      . "Idioma:    {$lang}\n"
      . "Consentimento LGPD: sim (" . date('d/m/Y H:i:s') . ")\n\n"
      . "Mensagem:\n" . ($message !== '' ? $message : '(sem mensagem)') . "\n";

$headers = "From: MARCANTI Website <no-reply@marcanti.ind.br>\r\n"
         . "Reply-To: " . $safe($email) . "\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $safe($subject), $body, $headers);

respond((bool) $sent);
