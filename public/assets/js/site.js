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
