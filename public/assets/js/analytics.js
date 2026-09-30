// Soul SP — Google Analytics 4 com consentimento (LGPD).
// O GA só é carregado depois que o visitante clica em "Aceitar".
// Para ativar, troque o ID abaixo pelo ID de medição do GA4 (formato G-XXXXXXXXXX).
(function () {
  var GA_ID = 'G-XXXXXXXXXX';
  var CHAVE = 'soulsp-cookies';

  if (!/^G-[A-Z0-9]+$/.test(GA_ID) || GA_ID === 'G-XXXXXXXXXX') return;

  function lerEscolha() {
    try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
  }
  function salvarEscolha(valor) {
    try { localStorage.setItem(CHAVE, valor); } catch (e) {}
  }

  function carregarGA() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // Registra cliques nos links de WhatsApp e Instagram como eventos
  function rastrearCliques() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('a[href]');
      if (!link || !window.gtag) return;
      var href = link.getAttribute('href');
      if (href.indexOf('wa.me') !== -1) {
        window.gtag('event', 'clique_whatsapp', { local: link.textContent.trim().slice(0, 60) });
      } else if (href.indexOf('instagram.com') !== -1) {
        window.gtag('event', 'clique_instagram');
      }
    });
  }

  function mostrarAviso() {
    var aviso = document.createElement('div');
    aviso.className = 'cookies';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
      '<p>Usamos cookies do Google Analytics para entender como o site é usado. Você pode aceitar ou recusar.</p>' +
      '<div class="cookies-botoes"><button type="button" class="recusar">Recusar</button>' +
      '<button type="button" class="aceitar">Aceitar</button></div>';
    aviso.querySelector('.aceitar').addEventListener('click', function () {
      salvarEscolha('aceito'); aviso.remove(); carregarGA(); rastrearCliques();
    });
    aviso.querySelector('.recusar').addEventListener('click', function () {
      salvarEscolha('recusado'); aviso.remove();
    });
    document.body.appendChild(aviso);
  }

  var escolha = lerEscolha();
  if (escolha === 'aceito') {
    carregarGA(); rastrearCliques();
  } else if (escolha !== 'recusado') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mostrarAviso);
    else mostrarAviso();
  }
})();
