// Soul SP — filtro de roteiros e montagem do pedido sob medida.
(function () {
  var WHATSAPP = 'https://wa.me/5511953403761';

  // Filtro de roteiros
  var filtros = document.querySelectorAll('[data-filtro]');
  var cards = document.querySelectorAll('.card[data-cat]');
  filtros.forEach(function (botao) {
    botao.addEventListener('click', function () {
      var filtro = botao.getAttribute('data-filtro');
      filtros.forEach(function (b) { b.setAttribute('aria-pressed', String(b === botao)); });
      cards.forEach(function (card) {
        card.hidden = filtro !== 'todos' && card.getAttribute('data-cat') !== filtro;
      });
    });
  });

  // Sob medida: grupos de múltipla escolha e de escolha única
  var cta = document.getElementById('pedir-roteiro');
  var multiplos = ['interesses', 'adicionais'];
  var unicos = ['tamanhos', 'formatos', 'veiculos'];

  function botoes(id) { return document.querySelectorAll('#' + id + ' .pilula'); }
  function marcados(id) {
    var lista = [];
    botoes(id).forEach(function (b) {
      if (b.getAttribute('aria-pressed') === 'true') lista.push(b.textContent.trim());
    });
    return lista;
  }

  function atualizarLink() {
    var interesses = marcados('interesses');
    var tamanho = marcados('tamanhos')[0];
    var formato = marcados('formatos')[0];
    var veiculo = marcados('veiculos')[0];
    var adicionais = marcados('adicionais');
    var msg = 'Olá! Quero um roteiro sob medida em São Paulo.'
      + (interesses.length ? ' Interesses: ' + interesses.join(', ') + '.' : '')
      + (tamanho ? ' Grupo: ' + tamanho + ' pessoas.' : '')
      + (formato ? ' Formato: ' + formato.toLowerCase() + '.' : '')
      + (veiculo ? ' Transporte: ' + veiculo.toLowerCase() + '.' : '')
      + (adicionais.length ? ' Itens adicionais: ' + adicionais.join(', ').toLowerCase() + '.' : '');
    cta.href = WHATSAPP + '?text=' + encodeURIComponent(msg);
  }

  multiplos.forEach(function (id) {
    botoes(id).forEach(function (b) {
      b.addEventListener('click', function () {
        b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
        atualizarLink();
      });
    });
  });

  unicos.forEach(function (id) {
    var grupo = botoes(id);
    grupo.forEach(function (b) {
      b.addEventListener('click', function () {
        var ligar = b.getAttribute('aria-pressed') !== 'true';
        grupo.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', String(ligar));
        atualizarLink();
      });
    });
  });

  atualizarLink();
})();

// Formulário de contato por e-mail
(function () {
  var form = document.getElementById('form-contato');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var botao = form.querySelector('button[type="submit"]');

  function mostrar(texto, tipo) {
    status.textContent = texto;
    status.className = 'form-status ' + tipo;
  }

  var params = new URLSearchParams(location.search);
  if (params.get('contato') === 'enviado') mostrar('Mensagem enviada! Respondemos em breve.', 'ok');
  if (params.get('contato') === 'erro') mostrar('Não foi possível enviar. Confira os campos e tente de novo.', 'erro');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var invalido = null;
    form.querySelectorAll('[required]').forEach(function (campo) {
      var ok = campo.value.trim() !== '' && (campo.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value.trim()));
      campo.setAttribute('aria-invalid', String(!ok));
      if (!ok && !invalido) invalido = campo;
    });
    if (invalido) {
      mostrar('Preencha nome, um e-mail válido e a mensagem.', 'erro');
      invalido.focus();
      return;
    }
    botao.disabled = true;
    mostrar('Enviando…', '');
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        mostrar(res.mensagem, res.ok ? 'ok' : 'erro');
        if (res.ok) form.reset();
      })
      .catch(function () {
        mostrar('Não foi possível enviar agora. Tente pelo WhatsApp ou escreva para contato@soulsp.com.br.', 'erro');
      })
      .then(function () { botao.disabled = false; });
  });
})();
