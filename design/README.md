# Handoff: Site Soul SP — turismo receptivo em São Paulo

## Overview
Landing page de página única da Soul SP (@soulsp.tour), agência de turismo receptivo em São Paulo. Objetivo: apresentar os roteiros, captar pedidos de roteiro sob medida e levar o visitante ao WhatsApp para reservar. Não há checkout: toda conversão é um link `wa.me`.

## About the Design Files
Os arquivos deste pacote são **referências de design feitas em HTML**: protótipos que mostram aparência e comportamento pretendidos, não código de produção para copiar. A tarefa é **recriar este design no ambiente do projeto-alvo** (React, Next.js, Astro etc.) usando os padrões e bibliotecas dele. Se ainda não houver projeto, a recomendação é **Astro ou Next.js (export estático) + CSS Modules ou Tailwind**, já que o site é majoritariamente estático com duas pequenas ilhas interativas (filtro de roteiros e formulário sob medida).

`Soul SP Site.dc.html` abre direto no navegador (precisa do `support.js` ao lado). Os estilos estão inline; os dados e a lógica estão no `<script data-dc-script>` no fim do arquivo.

## Fidelity
**High-fidelity.** Cores, tipografia, espaçamentos, textos e interações são finais. Recriar com fidelidade de pixel.

Conteúdo **provisório** que o cliente ainda precisa confirmar:
- Faixa de diferenciais (Cadastur, grupos de até 15, três idiomas).
- Citação atribuída a Carol Pontes na seção "Quem conduz".
- Textos da seção "Como funciona".
- Dias/horários de alguns roteiros.

## Layout global
- Container: `max-width: 1240px; margin: 0 auto; padding: 0 24px`.
- Seções: `padding: 96px 24px` (contato: `88px`; faixa de diferenciais: `28px`).
- Fundo da página `#F1EDE6`; texto base `#1A1613`.
- Tudo em flex/grid com `gap` e `flex-wrap`; colunas usam `flex: 1 1 380–420px; min-width: 0` e empilham abaixo de ~860px. Não há breakpoints explícitos: é tudo fluido (`clamp()` nos títulos, `auto-fill/auto-fit` nas grades).
- `html { scroll-behavior: smooth }`; a navegação é por âncoras.

## Screens / Seções (ordem da página)

### 1. Header (sticky)
- `position: sticky; top: 0; z-index: 10`; fundo `#F1EDE6`; borda inferior `1px solid #DCD6CB`; padding interno `16px 24px`.
- Esquerda: símbolo (SVG 36×36, ver Assets) + wordmark "SOUL **SP**" — Archivo 900, 22px, letter-spacing −0.035em, `white-space: nowrap`; "SP" em `#C8102E`. Link para `#inicio`.
- Direita: nav, gap 28px, Archivo 600 15px `#1A1613`: Roteiros (`#roteiros`), Sob medida (`#sob-medida`), Como funciona (`#como-funciona`), Contato (`#contato`).
- CTA "Reservar": fundo `#C8102E`, texto `#FFF`, 700, padding `11px 18px`, radius 4px; hover `#A50D26`. Link WhatsApp.

### 2. Hero (`#inicio`) — duas variantes; padrão = foto inteira
**Foto inteira (padrão):** `min-height: 640px`, conteúdo alinhado embaixo. Foto `hero-anhangabau.jpeg` em `object-fit: cover` com overlay `linear-gradient(to top, rgba(26,22,19,.94) 0%, rgba(26,22,19,.55) 45%, rgba(26,22,19,.15) 100%)`. Conteúdo com padding `120px 24px 72px`, gap 26px, texto `#F6F3EE`.
- Eyebrow: "TURISMO RECEPTIVO · SÃO PAULO" — 13px 600, letter-spacing .28em, `#E4DED5`.
- H1: "São Paulo conduzida por quem vive aqui" — 900, `clamp(44px, 7vw, 96px)`, line-height .92, letter-spacing −0.045em, max-width 13ch, `text-wrap: balance`.
- Parágrafo: "Walking tours pelo centro e pelos bairros, gastronomia paulistana, bate-volta para o interior e roteiros sob medida para o seu grupo." — 19px, lh 1.55, max 46ch, `#E4DED5`.
- Botões (gap 12px): primário "Ver roteiros" (`#C8102E`, padding `16px 26px`, 16px 700, radius 4, hover `#A50D26`) → `#roteiros`; secundário "Falar no WhatsApp" (borda 1.5px `rgba(246,243,238,.7)`, texto `#F6F3EE`, padding `15px 24px`; hover fundo `#F6F3EE` texto `#1A1613`).

**Dividido (alternativa):** duas colunas (texto | foto 4:5, max-height 640, radius 6px). Eyebrow `#8A8377`, H1 `clamp(44px, 6vw, 84px)` com "aqui" em `#C8102E`, parágrafo `#3D3830`, botão secundário com borda `#1A1613` (hover fundo `#1A1613`, texto `#F6F3EE`). Implementar só se o cliente escolher.

### 3. Faixa de diferenciais
Fundo `#F6F3EE`, borda inferior `#DCD6CB`, padding 28px, gap `20px 48px`. Três itens: ponto 8×8 `#C8102E` + texto 15px 600: "Guias com cadastro Cadastur", "Grupos de até 15 pessoas", "Roteiros em português, inglês e espanhol".

### 4. Roteiros (`#roteiros`)
- Cabeçalho: eyebrow "ROTEIROS" (13px 600, .24em, `#8A8377`) + H2 "Escolha por onde começar" (900, `clamp(34px, 4.4vw, 56px)`, lh .98, −0.04em). À direita, filtros em pílula.
- Filtros: "Todos", "Centro histórico", "Gastronomia", "Bairros e bate-volta". Pílula 14px 700, padding `10px 16px`, radius 999px, borda 1.5px. Inativo: transparente, texto `#1A1613`, borda `#C9C3B6`. Ativo: fundo e borda `#1A1613`, texto `#F6F3EE`.
- Grade: `repeat(auto-fill, minmax(280px, 1fr))`, gap 20px.
- Card: fundo `#FFF`, borda `1px solid #E2DDD3`, radius 6px; hover borda `#1A1613`.
  - Mídia 4:3. Com foto: `object-fit: cover`. Sem foto: painel na cor da categoria com símbolo 34px e nome do lugar (30px 900, −0.04em) alinhado embaixo, padding 22px.
  - Tag de categoria no canto sup. esquerdo (top/left 14px): 11px 700, .16em, padding `6px 10px`, radius 3px, cores da categoria.
  - Corpo padding 22px, gap 12px: título 22px 800 (−0.02em, lh 1.15); descrição 15px lh 1.55 `#4A443D`; rodapé com borda-topo `#EDE8DF`, 13px 600 `#6B655C` (meta à esquerda, "Reservar →" `#C8102E` 700 à direita, link WhatsApp).

Categorias:
| id | rótulo | fundo | texto |
|---|---|---|---|
| centro | CENTRO HISTÓRICO | `#2E5C8A` | `#FFFFFF` |
| gastro | GASTRONOMIA | `#D9A441` | `#1A1613` |
| bairros | BAIRROS E BATE-VOLTA | `#0F6B52` | `#FFFFFF` |

Roteiros (dados reais, vindos do Instagram do cliente):
1. **Walking tour Centro Histórico** — centro — "Caminhada pelas ruas que já foram o coração da economia do Brasil, com as histórias que quase ninguém conta." — "Sábado · 10h" — foto `centro-historico-grupo.jpeg`
2. **São Paulo em notas de café** — centro — "Como o café transformou São Paulo em metrópole. Lugares históricos, curiosidades e café especial no roteiro." — "Centro histórico · com a guia Carol" — foto `altino-arantes.jpeg`
3. **Mercadão e o sanduíche de mortadela** — gastro — "Cores, sabores e histórias do Mercado Municipal, com parada obrigatória no sanduíche mais paulistano que existe." — "Mercado Municipal" — foto `mercadao-mortadela.png`
4. **Walking tour Bom Retiro** — bairros — "O bairro das imigrações, das confecções e da culinária coreana e judaica, percorrido a pé." — "Sábado · 10h" — sem foto (painel "Bom Retiro")
5. **Day use Rota do Vinho** — bairros — "Um dia em São Roque entre vinícolas, adegas e a estrada que dá nome ao roteiro." — "Domingo · bate-volta" — sem foto (painel "São Roque")

Recomenda-se mover os roteiros para um CMS/arquivo de conteúdo (JSON/Markdown) para o cliente atualizar sem código.

### 5. Roteiros sob medida (`#sob-medida`)
Fundo `#1A1613`, texto `#F6F3EE`. Duas colunas, gap 56px.
- Esquerda: eyebrow "ROTEIROS SOB MEDIDA" (`#9A9186`); H2 "A cidade no seu ritmo"; parágrafo 17px lh 1.6 `#C9C1B6` max 48ch: "Para família, amigos, escolas, empresas e agências. Você conta o que quer ver, a gente desenha o percurso, cuida do transporte e escala o guia no idioma do grupo." Lista com divisórias `#383129` (padding 16px 0, 16px): "Transfer aeroporto e hotel" / GRU · CGH; "Grupos e eventos corporativos" / sob medida; "Agências e operadoras parceiras" / B2B (valor em `#9A9186`).
- Direita: cartão `#F1EDE6`, radius 6px, padding 32px, gap 24px, texto `#1A1613`.
  - "Monte o seu roteiro" (22px 800) + "Marque o que interessa e mande para a gente pelo WhatsApp." (14px `#6B655C`).
  - Rótulo "INTERESSES" (12px 700 .18em `#8A8377`) + pílulas multi-seleção (radius 999px, 14px 600, padding `9px 14px`): Centro histórico, Arte de rua, Museus, Arquitetura, Gastronomia, Mercados e feiras, Futebol, Vida noturna.
  - Rótulo "TAMANHO DO GRUPO" + botões de seleção única (radius 4px, mesmo tamanho): 1 a 4, 5 a 15, 16 a 40, Mais de 40. Clicar no selecionado desmarca.
  - Estados das pílulas iguais aos filtros da seção 4.
  - CTA "Pedir roteiro sob medida" (largura total, `#C8102E`, padding `16px 22px`, 16px 700, hover `#A50D26`).

### 6. Como funciona (`#como-funciona`)
Eyebrow "COMO FUNCIONA" + H2 "Três passos até a saída". Grade `repeat(auto-fit, minmax(240px, 1fr))` gap 20px. Cada passo: borda-topo 3px, padding-top 22px, gap 10px; número 15px 800; título 22px 800; texto 15px lh 1.6 `#4A443D`.
1. borda/número `#C8102E` — "Escolha o roteiro" — "Veja datas e vagas e reserve pelo WhatsApp. A confirmação chega com o voucher."
2. `#1A1613` — "Encontre o guia" — "Na véspera você recebe o ponto de encontro com mapa e o nome de quem vai conduzir."
3. borda `#8A8377`, número `#6B655C` — "Siga o percurso" — "Roteiro a pé, no ritmo do grupo, com paradas para foto, café e perguntas."

### 7. Quem conduz
Fundo `#F6F3EE`, bordas topo/base `#DCD6CB`. Foto 3:2 (`centro-historico-grupo.jpeg`, radius 6px) | texto. Eyebrow "QUEM CONDUZ"; citação `clamp(24px, 2.6vw, 32px)` 700 lh 1.3: "“O centro de São Paulo muda de rua para rua. Meu trabalho é mostrar essa passagem sem pressa.”"; "Carol Pontes" 17px 800; "Guia de turismo · Soul SP" 14px `#6B655C`.

### 8. Contato (`#contato`)
Fundo `#C8102E`, texto `#FFF`, padding 88px. H2 "Vamos marcar o encontro?" (`clamp(36px, 5vw, 64px)`, 900, lh .95); parágrafo 18px: "Respondemos no WhatsApp em horário comercial. Para grupos e agências, envie data, número de pessoas e idioma." Botões: "WhatsApp" (fundo `#FFF`, texto `#C8102E`, 800; hover fundo `#1A1613` texto `#FFF`) e "@soulsp.tour" (borda 1.5px `#FFF`; hover fundo `#FFF` texto `#C8102E`) → https://instagram.com/soulsp.tour.

### 9. Rodapé
Fundo `#1A1613`, texto `#9A9186` 14px, padding 40px. Símbolo 28px versão clara (gota `#F6F3EE`, chevrons `#1A1613`) + "SOUL SP" 18px 900 `#F6F3EE` com "SP" em `#FF3B30`. Centro: "Turismo receptivo em São Paulo · (11) 95340-3761" (número linkado). Direita: "@soulsp.tour".

## Interactions & Behavior
- **Links WhatsApp:** `https://wa.me/5511953403761`. Usados em Reservar (header), Falar no WhatsApp (hero), Reservar → (cards), WhatsApp (contato), telefone (rodapé). Abrir em nova aba é recomendado.
- **Filtro de roteiros:** estado `filter ∈ {todos, centro, gastro, bairros}`, padrão `todos`. Filtra por `id` de categoria. Sem animação.
- **Sob medida:** estado `picked: string[]` (toggle) e `size: string | null` (toggle, seleção única). O href do CTA é gerado:
  ```
  msg = "Olá! Quero um roteiro sob medida em São Paulo."
      + (picked.length ? " Interesses: " + picked.join(", ") + "." : "")
      + (size ? " Grupo: " + size + " pessoas." : "")
  href = "https://wa.me/5511953403761?text=" + encodeURIComponent(msg)
  ```
- **Hover:** botões escurecem (`#C8102E → #A50D26`); cards trocam a borda para `#1A1613`; links globais `#C8102E → #8F0B20` sublinhado.
- Botões interativos precisam de `:focus-visible` (sugestão: `outline: 2px solid #C8102E; outline-offset: 2px`), e as pílulas devem ter `aria-pressed`.
- Sem estados de carregamento/erro (site estático).

## State Management
Apenas estado local de UI: `filter`, `picked`, `size`. Nenhuma busca de dados. Os roteiros podem vir de conteúdo estático no build.

## Design Tokens
**Cores**
- Carmim (primária) `#C8102E` · hover `#A50D26` · link hover `#8F0B20`
- Vermelho em fundo escuro (SP do wordmark) `#FF3B30`
- Grafite (texto/fundos escuros) `#1A1613` · divisórias no escuro `#383129`
- Papel (fundo da página) `#F1EDE6` · papel claro `#F6F3EE` · branco `#FFFFFF`
- Neutros: `#3D3830`, `#4A443D` (corpo), `#6B655C` (secundário), `#8A8377` (eyebrow), `#9A9186` (eyebrow no escuro), `#C9C1B6` (corpo no escuro), `#E4DED5` (corpo sobre foto)
- Bordas: `#DCD6CB`, `#E2DDD3`, `#EDE8DF`, `#C9C3B6` (pílula inativa)
- Categorias: azul `#2E5C8A`, ocre `#D9A441`, verde `#0F6B52`

**Tipografia:** Archivo (Google Fonts), pesos 400–900. Uma família só.
- Display H1 900, lh .92, −0.045em · H2 900, lh .98, −0.04em · H3 22px 800 −0.02em
- Eyebrow 13px 600, caixa alta, .24–.28em · corpo 15–19px, lh 1.55–1.6 · UI 14–16px 600–700

**Raio:** 3px (tags) · 4px (botões) · 6px (cards, fotos) · 999px (pílulas).
**Espaçamento recorrente:** 8, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 40, 48, 56, 72, 88, 96, 120.
**Sombras:** nenhuma.

## Assets
- `assets/fotos/` — fotos enviadas pelo cliente: `hero-anhangabau.jpeg` (hero), `centro-historico-grupo.jpeg` (card 1 e "Quem conduz"), `altino-arantes.jpeg` (card 2), `mercadao-mortadela.png` (card 3). Otimizar para web (AVIF/WebP, `srcset`).
- `assets/logo/svg/` — símbolo em vetor (carmim, preto, branco, avatar, app).
- `assets/logo/png/` — logo principal (claro e fundo escuro), avatar e ícone de app (use para favicon/apple-touch-icon).
- Símbolo inline (viewBox 0 0 100 100):
  - gota: `M50 6 C31 6 16 21 16 40 C16 63 50 94 50 94 C50 94 84 63 84 40 C84 21 69 6 50 6 Z`
  - chevron 1: `M33 44 L50 27 L67 44 L58 44 L50 36 L42 44 Z`
  - chevron 2 (opacidade .45): `M33 60 L50 43 L67 60 L58 60 L50 52 L42 60 Z`
  - Versão clara: gota `#C8102E`, chevrons `#FFF`. Versão escura: gota `#F6F3EE`, chevrons `#1A1613`.
- O wordmark "SOUL SP" é texto em Archivo 900 e nunca pode quebrar linha (`white-space: nowrap`).

## SEO / extras sugeridos
`<html lang="pt-BR">`; title "Soul SP · Turismo receptivo em São Paulo"; meta description a partir do parágrafo do hero; Open Graph com a foto do hero; schema.org `TravelAgency` com telefone e Instagram.

## Files
- `Soul SP Site.dc.html` — protótipo completo (abrir no navegador, com `support.js` ao lado).
- `support.js` — runtime do protótipo; **não** faz parte da implementação.
- `assets/` — fotos e logos.
