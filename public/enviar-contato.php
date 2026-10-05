<?php
// Recebe o formulário de contato do site e envia por e-mail para a Soul SP.
// Responde em JSON quando chamado pelo site (fetch) e redireciona quando enviado sem JavaScript.

$DESTINO   = 'contato@soulsp.com.br';
$REMETENTE = 'contato@soulsp.com.br'; // precisa ser um e-mail do próprio domínio na Locaweb

$ajax = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false;

function responder($ok, $mensagem, $ajax) {
  if ($ajax) {
    http_response_code($ok ? 200 : 400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => $ok, 'mensagem' => $mensagem], JSON_UNESCAPED_UNICODE);
  } else {
    header('Location: /?contato=' . ($ok ? 'enviado' : 'erro') . '#contato', true, 303);
  }
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: /#contato', true, 303);
  exit;
}

// Campo isca: robôs preenchem, pessoas não veem
if (!empty($_POST['site'])) {
  responder(true, 'Mensagem enviada.', $ajax);
}

function limpar($valor, $max) {
  $valor = trim((string)$valor);
  $valor = str_replace(["\r", "\0"], '', $valor);
  return mb_substr($valor, 0, $max, 'UTF-8');
}

$nome     = limpar($_POST['nome'] ?? '', 120);
$email    = limpar($_POST['email'] ?? '', 160);
$telefone = limpar($_POST['telefone'] ?? '', 40);
$mensagem = limpar($_POST['mensagem'] ?? '', 4000);

// Nada de quebras de linha em campos que vão para cabeçalhos
$nome     = str_replace("\n", ' ', $nome);
$email    = str_replace("\n", '', $email);
$telefone = str_replace("\n", ' ', $telefone);

if ($nome === '' || $mensagem === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  responder(false, 'Preencha nome, um e-mail válido e a mensagem.', $ajax);
}

$assunto = 'Contato pelo site: ' . $nome;
$corpo  = "Nova mensagem pelo formulário do site soulsp.com.br\n\n";
$corpo .= "Nome: $nome\n";
$corpo .= "E-mail: $email\n";
if ($telefone !== '') $corpo .= "Telefone: $telefone\n";
$corpo .= "\nMensagem:\n$mensagem\n";

$cabecalhos  = "From: Site Soul SP <$REMETENTE>\r\n";
$cabecalhos .= "Reply-To: $email\r\n";
$cabecalhos .= "MIME-Version: 1.0\r\n";
$cabecalhos .= "Content-Type: text/plain; charset=UTF-8\r\n";
$cabecalhos .= "Content-Transfer-Encoding: 8bit\r\n";

$assuntoCodificado = '=?UTF-8?B?' . base64_encode($assunto) . '?=';
$enviado = mail($DESTINO, $assuntoCodificado, $corpo, $cabecalhos, '-f' . $REMETENTE);

if ($enviado) {
  responder(true, 'Mensagem enviada! Respondemos em breve.', $ajax);
}
responder(false, 'Não foi possível enviar agora. Tente pelo WhatsApp ou escreva para contato@soulsp.com.br.', $ajax);
