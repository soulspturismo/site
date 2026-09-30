# Site Soul SP

Landing page da Soul SP (@soulsp.tour), turismo receptivo em São Paulo. Site estático em HTML, CSS e JavaScript puro, sem etapa de build.

## Estrutura
- `public/` — o site publicado. É só esta pasta que vai para a Locaweb.
  - `index.html` — todo o conteúdo (textos, roteiros, links).
  - `assets/css/site.css` — estilos e cores (tokens no topo do arquivo).
  - `assets/js/site.js` — filtro de roteiros e montagem da mensagem "sob medida" para o WhatsApp.
  - `assets/fotos/` — fotos otimizadas (`.jpg` + `.webp`).
  - `assets/logo/` — símbolo e logos (SVG e PNG).
  - `.htaccess` — força HTTPS e domínio sem `www`.
- `design/` — handoff original do Claude Design (especificação em `design/README.md`, protótipo e fotos em tamanho original). Não é publicado.

## Ver localmente
Abra `public/index.html` no navegador, ou rode `python3 -m http.server -d public 8000` e acesse http://localhost:8000.

## Publicação na Locaweb
Cada push na branch `main` publica a pasta `public/` na hospedagem Locaweb por FTP (`.github/workflows/deploy-locaweb.yml`, usando a action oficial `locaweb/ftp-deploy`). Também dá para rodar manualmente em **Actions → Deploy Locaweb → Run workflow**.

Configuração única, em **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Valor |
|---|---|
| `HOST` | host de FTP da hospedagem (ex.: `ftp.seudominio.com.br`) |
| `USER` | usuário de FTP |
| `PASS` | senha de FTP |

Esses dados ficam no painel da Locaweb, em **Hospedagem → FTP**. Se a hospedagem for Windows, troque `remoteDir` para `web` no workflow.

### Domínio
Se o domínio estiver registrado e com DNS na própria Locaweb, ele já aponta para a hospedagem ao ser vinculado ao plano. Se o DNS estiver em outro lugar, crie no provedor do domínio os registros indicados pela Locaweb no painel da hospedagem (registro `A` para o domínio e `CNAME` do `www`).

## Editar conteúdo
- Textos e roteiros: `public/index.html` (cada roteiro é um `<article class="card">`; `data-cat` define o filtro: `centro`, `gastro` ou `bairros`).
- Trocar foto: gere `.jpg` e `.webp` com o mesmo nome em `public/assets/fotos/`.
- Número do WhatsApp: buscar e substituir `5511953403761`.
