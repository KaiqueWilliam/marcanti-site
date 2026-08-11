<?php
/**
 * Contact form mail handler for the Marcanti website.
 * Receives the POST from /pt|en|es/contato/ (assets/js/main.js) and sends an email via PHP mail().
 * Works out of the box on HostGator shared hosting (PHP + mail() enabled by default).
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

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');
$lang    = trim($_POST['lang'] ?? 'pt');

if ($name === '' || $email === '' || $phone === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    respond(false);
}

$subjects = [
    'pt' => 'Novo contato pelo site - MARCANTI',
    'en' => 'New website contact - MARCANTI',
    'es' => 'Nuevo contacto por el sitio web - MARCANTI',
];
$subject = $subjects[$lang] ?? $subjects['pt'];

$safe = fn($s) => str_replace(["\r", "\n"], ' ', $s);

$body = "Nome/Name: {$name}\n"
      . "Email: {$email}\n"
      . "Telefone/Phone: {$phone}\n"
      . "Idioma/Language: {$lang}\n\n"
      . "Mensagem/Message:\n{$message}\n";

$headers = "From: MARCANTI Website <no-reply@marcanti.ind.br>\r\n"
         . "Reply-To: " . $safe($email) . "\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $safe($subject), $body, $headers);

respond((bool) $sent);
