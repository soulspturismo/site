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

  // Sob medida: interesses (vários) e tamanho do grupo (um só)
  var interesses = document.querySelectorAll('#interesses .pilula');
  var tamanhos = document.querySelectorAll('#tamanhos .pilula');
  var cta = document.getElementById('pedir-roteiro');

  function atualizarLink() {
    var escolhidos = [];
    interesses.forEach(function (b) {
      if (b.getAttribute('aria-pressed') === 'true') escolhidos.push(b.textContent.trim());
    });
    var tamanho = null;
    tamanhos.forEach(function (b) {
      if (b.getAttribute('aria-pressed') === 'true') tamanho = b.textContent.trim();
    });
    var msg = 'Olá! Quero um roteiro sob medida em São Paulo.'
      + (escolhidos.length ? ' Interesses: ' + escolhidos.join(', ') + '.' : '')
      + (tamanho ? ' Grupo: ' + tamanho + ' pessoas.' : '');
    cta.href = WHATSAPP + '?text=' + encodeURIComponent(msg);
  }

  interesses.forEach(function (b) {
    b.addEventListener('click', function () {
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      atualizarLink();
    });
  });

  tamanhos.forEach(function (b) {
    b.addEventListener('click', function () {
      var ligar = b.getAttribute('aria-pressed') !== 'true';
      tamanhos.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', String(ligar));
      atualizarLink();
    });
  });

  atualizarLink();
})();
