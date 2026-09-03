# Auditoria de Site (Copy e SEO) — Progresso da Implementação

Documento de rastreamento. Base: `Marcanti_Auditoria_Site_Copy_SEO` (25/08/2026),
feita sobre o site WordPress/Elementor antigo. **Este repositório é a recriação
estática** que substitui aquele site — as correções entram nos fontes em
`build/data/site.js`, `build/templates.js` e `build/pages/*.js`, e o site é
regerado com `node build/build.js` (29 páginas × 3 idiomas = 87 arquivos).

Convenção de status: `[ ]` aberto · `[~]` em andamento · `[x]` concluído · `[--]` não se aplica a este repo

---

## 1. Inventário de páginas — **fotografia inicial** (Etapa 1, antes das correções)

> Mantido como linha de base para comparação. O estado atual de cada item está na seção 3.

| # | Página / slug | Title atual (pt) | H1 | Palavras | Pendências |
|---|---|---|---|---|---|
| 1 | Home `/` | Marcanti – Espaçadores de Concreto e Kits de Vedação `[52]` | OK "A base das estruturas sólidas…" | ~174 | Title diz "Espaçadores de Concreto"; H1 não diz o que a empresa vende |
| 2 | Quem Somos `/quem-somos/` | Quem Somos – Marcanti `[21]` | falta (h3) | ~254 | H1; missão/visão divergentes; "quatro máquinas"; excesso de "excelência" |
| 3 | Espaçadores hub `/espacadores/` | Espaçadores – Marcanti `[22]` | falta (h3) | ~38 | H1; hub sem texto; falta bloco "como escolher" |
| 4 | Linha Construção `/espacadores/linha-construcao/` | Linha Construção – Marcanti `[27]` | falta (h3) | ~55 | H1 |
| 5 | Linha Postes `/espacadores/linha-postes/` | Linha Postes – Marcanti `[23]` | falta (h3) | ~55 | H1; menu lista 3 produtos, hub mostra 4 cards |
| 6 | Cadeirinha LC `/espacadores/linha-construcao/cadeirinha-linha-construcao/` | Cadeirinha Linha Construção – Marcanti `[38]` | falta (h3) | ~131 | **Intro = texto do Multiapoio** (`genericIntro`); tabela = imagem `Title.png` |
| 7 | Circular Aberto LC `/espacadores/linha-construcao/circular-aberto-linha-construcao/` | Circular Aberto Linha Construção – Marcanti `[43]` | falta (h3) | ~150 | Tabela = imagem `Title-2.png` |
| 8 | Multiapoio LC `/espacadores/linha-construcao/espacadores-multiapoio-linha-construcao/` | Espaçadores Multiapoio Linha Construção – Marcanti `[50]` | falta (h3) | ~149 | Tabela = imagem `Title-3.png` |
| 9 | Cadeirinha LP `/espacadores/linha-postes/cadeirinha-linha-postes/` | Cadeirinha Linha Postes – Marcanti `[34]` | falta (h3) | ~131 | Mesmo texto multiapoio; tabela = imagem |
| 10 | Circular Fechado LP `/espacadores/linha-postes/circular-fechado-linha-postes/` | Circular Fechado Linha Postes – Marcanti `[40]` | falta (h3, 2×) | ~228 | 2 produtos numa página (simples + ferro duplo); 2 tabelas em imagem |
| 11 | Circular Aberto LP `/espacadores/linha-postes/circular-aberto-linha-postes/` | Circular Aberto Linha Postes – Marcanti `[39]` | falta (h3) | ~150 | Tabela = imagem |
| 12 | Cadeirinha Pesado `/espacadores/cadeirinha-pesada/` | Cadeirinha Pesado – Marcanti `[28]` | falta (h3) | ~129 | **Fora do menu** (`navTree`); breadcrumb pula a linha; tabela = imagem |
| 13 | Kit Vedação hub `/kit-vedacao/` | Kit Vedação – Marcanti `[22]` | falta (h3) | ~104 | H1; "materiais de alta qualidade e tecnologia avançada" |
| 13a | Kit Fixação Universal `/kit-vedacao/kit-vedacao-e-fixacao-universal/` | `[42]` | falta (h3) | ~141 | H1 |
| 13b | Kit Universal `/kit-vedacao/kit-de-vedacao-universal-para-diversos-tipos-de-telhas/` | `[65]` | falta (h3) | ~178 | H1 |
| 13c | Kit PVC `/kit-vedacao/kit-vedacao-para-telha-de-pvc/` | `[40]` | falta (h3) | ~387 | H1 |
| 13d | Kit PVC + Fixação `/kit-vedacao/kit-vedacao-e-fixacao-para-telha-de-pvc/` | `[50]` | falta (h3) | ~419 | H1 |
| 14 | Tecnologia `/tecnologia/` | Tecnologia – Marcanti `[21]` | OK "Consultoria em Desenvolvimento de Produtos" | ~270 | URL e rótulo do menu ainda "Tecnologia" ≠ conteúdo |
| 15 | Sustentabilidade `/sustentabilidade/` | Sustentabilidade – Marcanti `[27]` | falta (h3) | ~124 | H1; parágrafo ESG; "eco-friendly" na description; "100% reciclável" |
| 16 | Blog índice `/blog/` | Blog – Marcanti `[15]` | falta (h3) | ~73 | H1 |
| 17 | Catálogo `/catalogo-de-produtos/` | Catálogo de Produtos – Marcanti `[31]` | falta (h2) | ~22 | H1; página quase vazia |
| 18 | Contato `/contato/` | Contato – Marcanti `[18]` | falta (h2 como título) | ~84 | H1; form só 4 campos; sem LGPD; sem `/obrigado/` |
| — | Política de Privacidade `/politica-de-privacidade/` | `[34]` | OK | ~131 | Já existe e já linkada no rodapé |

**Posts de blog (5)** — todos existem, todos com H1 ausente (usam `h2`), textos 390–540 palavras, slugs OK:
`o-impacto-dos-espacadores-de-plasticos-na-sustentacao-das-construcoes` · `tudo-sobre-os-espacadores` ·
`vantagens-das-telhas-de-pvc-e-a-importancia-dos-kits-de-vedacao-e-fixacao` · `telha-de-pvc-e-seus-modelos` ·
`pare-agora-de-usar-as-cocadinhas`

---

## 2. Itens da auditoria já resolvidos neste repo

- [x] Meta description presente nas 28 páginas (audit: ausente em todas) — **conteúdo** ainda precisa da seção 5
- [x] Open Graph + Twitter Card — Etapa 3: `og:type/site_name/locale(+alternate)/title/description/url/image(+alt/width/height)` e `twitter:card/title/description/image` em 84/84 páginas
- [x] Bug latente: `&` sem escape em `<title>`/`description` das páginas EN ("Sealing & Fixing") — Etapa 3: helper `esc`/`escAttr`; `<head>` 100% válido nas 84
- [x] Canonical + hreflang pt/en/es em todas
- [x] Política de Privacidade — página existe + link no rodapé ("LGPD: …")
- [x] Slug `/udgssd/` já é slug descritivo
- [x] Link errado do card "Cadeirinha Pesado" — `href` corretos no repo
- [x] Seção de logos vazia na home — repo tem 4 logos (Direcional, Precon, LA.com, Civil)

---

## 3. Backlog por severidade

### Crítico
- [x] **H1 ausente em 22 das 28 páginas** — Etapa 2: `pageHero({tag:'h3'})` → `'h1'` em todas; contato/catálogo `<h2>`→`<h1>`; validado: 84/84 page-langs com exatamente 1 H1 e primeira heading = H1 (audit 3.2 / 7)
- [x] Title da Home → "Espaçadores Plásticos para Concreto | Marcanti" (Etapa 9) (audit 4.1 / 7)
- [x] **Tabelas de medida em imagem** → Etapa 4: 6 tabelas transcritas dos PNGs/jpegs do catálogo para `<table>` HTML nativa (`build/data/spec-tables.js` + `T.specTable`), nas 7 páginas de produto × 3 idiomas. Desenho técnico mantido ao lado como referência visual, agora com `alt` descritivo. Validado: tabelas balanceadas, `th scope=row/col` (audit 3.3 / 4.5)
- [x] **Texto do Multiapoio abrindo página errada** → Etapa 11: o problema era maior que a auditoria viu — o mesmo texto abria **5 páginas** (cadeirinha nas 2 linhas, circular fechado nas 2 variantes e cadeirinha pesado). Cada produto agora tem intro própria; `genericIntro` foi removido (audit 4.5)

### Alto
- [x] Open Graph ausente em todas as páginas — Etapa 3 (audit 3.1 / 7 / 8)
- [x] **Schema** → Etapa 10: `Organization`+`LocalBusiness` na home (endereço, telefone, horário, redes, fundação), `Product` nas 11 páginas de produto, `BreadcrumbList` nas 18 páginas com trilha. Validado: 90 blocos JSON-LD, todos parseando, `Product.url == canonical` e `Product.description == meta description`. `FAQPage` adicionado na Etapa 13 junto com o bloco de perguntas da cadeirinha. **Falta o CNPJ** (`taxID`) (audit 8)
- [x] **Form de contato sem qualificação** → Etapa 8: campos empresa, cidade/UF, segmento, produto de interesse e quantidade estimada (audit 3.7 / 4.10)
- [x] **Checkbox de consentimento LGPD** + link para a política → Etapa 8; `contato.php` rejeita (422) submissão sem consentimento
- [x] **Página `/obrigado/`** em URL própria → Etapa 8; `noindex, follow`, JS redireciona após envio. **Falta configurar a conversão no GA4/Google Ads apontando para `/obrigado/`** (audit 4.10 / 7 / 8)
- [x] Hierarquia de headings quebrada — Etapa 2: privacidade `h3`→`h2`; `cardGrid` card `h3`→`h2`; `.tile` `h4`→`h3`; "Posts Recentes" `h3`→`h2`; 2º produto da pág. Circular Fechado `h3`→`h2` (1 H1 só). Zero skips de nível em 84/84 (audit 3.2)
- [x] Cadeirinha Pesado fora do menu — Etapa 2: adicionado ao submenu Linha Construção (`build/data/site.js`) (audit 2 / 7)

### Médio
- [x] **Alt text genérico/vazio** → Etapa 5: `splitSection`/`galleryGrid` ganharam parâmetro `imgAlt`/`alt`; ~30 imagens de produto, kit, cliente e aplicação agora com `alt` descritivo nos 3 idiomas (cada imagem foi inspecionada visualmente para o texto bater com a foto). Ícones decorativos de Missão/Visão/Valores mantêm `alt=""` (correto). Validado: 0 `<img>` sem alt em 84/84 (audit 3.4)
- [x] **Imagens quebradas** (audit 3.4 "src vazio") → não se aplica: as 72 imagens referenciadas existem no repo (o problema era do site WordPress antigo)
- [ ] **Infográficos com texto PT embutido** (`Sustentabilidade-02-1024x1024.jpg`, `Kit-Vedacao-Para-Telha-de-PVC.jpg`) aparecem iguais em EN/ES. Gap de i18n — refazer as artes ou trocar por versão neutra numa etapa de imagens.
- [ ] **Página de contato: falta CNPJ e mapa incorporado** (audit 4.10). Endereço e horário já estão na página; CNPJ precisa ser fornecido e o mapa é decisão (iframe do Google adiciona requisição de terceiro).
- [ ] **CDP 25-30 — Peças/embalagem** está como "Sob consulta" (a imagem do catálogo mostra "x"). Trocar pelo número real quando disponível. Arquivo: `build/data/spec-tables.js`.
- [ ] Códigos das tabelas seguem as **imagens do catálogo** (CD / EC / ECF / EMA M / CDP), não os da auditoria 4.5 (que inventou "CDL" e bitola 12,5). Confirmar com a Marcanti que os códigos das imagens são os oficiais.
- [ ] **og:image genérico** — páginas de produto/institucionais usam a imagem do hero (`Quem-Somos.jpg`) ou o default (`Vigas-de-Aco…jpg`). Ideal: criar `og-*.jpg` 1200×630 por seção (Espaçadores / Kit Vedação / Home) e setar `image:` nos page defs. Blog já usa a imagem própria de cada post.
- [ ] **Cadeirinha Pesado ainda aparece como card no hub Linha Postes** — audit 4.3/4.4 coloca esse modelo só na Linha Construção. Decidir na etapa de taxonomia de produto se sai do hub Postes.
- [ ] **Contato: H1 agora existe mas o texto é "Bem-vindo(a) à nossa página de contato!"** — audit 4.10 quer "Solicite uma cotação". Trocar na etapa de copy.
- [ ] Hero H1 das páginas de produto/hub agora renderiza em tamanho `h1` (antes `1.5rem`) — consistente com Tecnologia/Privacidade que já eram assim. **Conferir visualmente** em `localhost:8899`; se ficar grande demais, é 1 linha de CSS (`.page-hero h1 { font-size: … }`).
- [ ] Alt text genérico/vazio em imagens de produto (audit 3.4 / 7)
- [x] `/tecnologia/` → **renomeada** para `/desenvolvimento-de-produtos/` — Etapa 7: slug, `title`, H1 (+"Plásticos"), eyebrow e rótulo do menu/rodapé nos 3 idiomas; 301 no `.htaccess` (com e sem barra, 3 idiomas + variante sem prefixo do site WordPress antigo); diretórios `*/tecnologia/` removidos para não duplicar conteúdo (audit 3.6 / 4.7)
- [x] Erro "produzilo" — no repo (`build/pages/main.js`) já está "produzi-lo" (audit 3.6)
- [x] Rodapé prometia "indústria automobilística" sem página → Etapa 6: `ui.aboutFooter` agora diz "construção civil e para a indústria" (genérico, condiz com a terceirização citada em Quem Somos) (audit 3.5)
- [x] **Seção 9 #2 — missão e visão** → Etapa 12: padronizadas pelo material institucional, como a auditoria recomenda. "Princípios e Valores" virou "Valores" com a lista do institucional (Segurança · Saúde e bem-estar · Ética e respeito · Resolutividade · Sustentabilidade).
- [x] **Seção 9 #4 — parque fabril** → Etapa 12: removido o "quatro máquinas de injeção", como a auditoria recomenda, para o texto não precisar de reescrita a cada compra de injetora.
- [ ] **PENDENTE (seção 9 #1) — "reciclável" vs "reciclada"**: a auditoria **não** recomenda nenhuma das duas; é pergunta de fato sobre a matéria-prima, não de estilo. "Reciclável" = o material pode ser reciclado depois. "Reciclada" = o que entra na injetora já é material recuperado — argumento mais forte, mas que precisa ser sustentado se um cliente pedir comprovação. O site segue em "reciclável" (o que ele já afirmava). Trocar é 1 palavra em `build/pages/main.js`.
- [x] Rodapé "Política de Privacidade" era texto puro → já é link no repo (`renderFooter`)
- [x] **Titles e meta descriptions (seção 5)** → Etapa 9: as 16 linhas da tabela aplicadas e estendidas às 29 páginas × 3 idiomas; separador `|`; nenhum termo vazio ("alta qualidade", "excelência", "eco-friendly"); cadeirinha e circular aberto ganharam title/description distintos por linha (eram idênticos = conteúdo duplicado); posts longos ganharam `seoTitle` curto separado do H1. Validado: 87/87 com title ≤60, description ≤155, todos únicos.
- [ ] Páginas de produto sem breadcrumb com schema (audit 7) — breadcrumb visual já existe
- [x] Home: H1, subtítulo, CTA e os três teasers (sustentabilidade, espaçadores, kit) → copy da seção 4.1 — Etapa 11

### Baixo
- [ ] Blog sem data/categoria/autor visível (audit 7)
- [ ] Sem link interno contextual blog ↔ páginas de produto (audit 7)
- [ ] Imagens pesadas (PNG 1024×1024) → WebP/AVIF (pipeline `optimize-images` já existe) (audit 8)

### Páginas novas
- [ ] `/injecao-plastica-terceirizada/` — Injeção plástica terceirizada (audit 4.8)
- [ ] `/obrigado/` — agradecimento pós-formulário (audit 4.10)
- [ ] Página regional "Espaçadores plásticos em Salvador e região" (audit 10)
- [ ] 4 posts de blog (NBR 6118, espaçadores por m², corrosão, telha PVC vazando) (audit 10)

---

## 4. Definições travadas (auditoria seção 9) — dependem do cliente

1. [ ] "Reciclável" vs "reciclada" — o repo usa "reciclável"
2. [x] Missão e visão — resolvido na Etapa 12: adotada a versão do material institucional
3. [ ] Certificação ISO 9001:2015 — concluída ou em processo?
4. [ ] Parque fabril — manter "quatro injetoras" ou formulação neutra?
5. [ ] Página de industrialização — volume mínimo, molde do cliente/próprio, materiais
6. [ ] Logos de clientes — existe autorização de uso de marca?
7. [ ] Política de Privacidade — texto atual do repo é suficiente / precisa revisão jurídica?

---

## 5. Log de etapas

| Data | Etapa | O que foi feito | Arquivos |
|---|---|---|---|
| 2026-09-03 | 1 | Inventário do repo reconciliado com a auditoria; criação deste documento | `AUDITORIA-PROGRESSO.md` |
| 2026-09-03 | 2 | H1 em todas as páginas (h3/h2→h1); hierarquia de headings sem skips; Cadeirinha Pesado no menu Linha Construção. Validado: 84/84 page-langs com 1 H1. | `build/data/site.js`, `build/templates.js`, `build/pages/main.js`, `build/pages/espacadores.js`, `build/pages/kit-vedacao.js`, `build/pages/blog.js`, `assets/css/style.css` |
| 2026-09-03 | 3 | Auditoria 3.1: descriptions já existiam → adicionadas tags Open Graph + Twitter Card nas 84 páginas (og:image = imagem do post no blog, hero/default nas demais, com guarda de tamanho mínimo 600px); helper de escape corrige `&` sem escape no `<head>` EN. Validado: 84/84 com og:* completo, og:url == canonical, `<head>` válido. | `build/templates.js`, `build/build.js`, `build/pages/blog.js` |
| 2026-09-03 | 4 | Auditoria 3.3: 6 tabelas de medida transcritas das imagens do catálogo para `<table>` HTML (`T.specTable`) nas 7 páginas de produto × 3 idiomas; desenho técnico mantido como diagrama com `alt`. Validado: 84/84 OK (1 H1, sem skips, tabelas balanceadas). | `build/data/spec-tables.js` (novo), `build/templates.js`, `build/pages/espacadores.js`, `assets/css/style.css` |
| 2026-09-03 | 5 | Auditoria 3.4: `imgAlt`/`alt` em `splitSection`/`galleryGrid`; ~30 imagens de produto/kit/cliente/aplicação com alt descritivo nos 3 idiomas (cada foto inspecionada). Nenhuma imagem quebrada no repo. Validado: 0 `<img>` sem alt em 84/84. | `build/templates.js`, `build/pages/espacadores.js`, `build/pages/kit-vedacao.js`, `build/pages/main.js` |
| 2026-09-03 | 6 | Auditoria 3.5 (parcial): rodapé não promete mais "indústria automobilística" (texto genérico). Missão/visão, "quatro máquinas" e "reciclável vs reciclada" ficam bloqueados nas decisões da seção 9 (#1, #2, #4). | `build/data/site.js` |
| 2026-09-03 | 13 | Auditoria 4.5 e 4.1: bloco de perguntas frequentes nas duas páginas de cadeirinha + `FAQPage` (helper `T.faqBlock`, com a checagem de que toda pergunta marcada está visível); bloco "por que comprar da Marcanti" na home, com os anos desde 2012 calculados para o texto não envelhecer. Validado: 87/87 íntegras, 96 blocos JSON-LD. | `build/templates.js`, `build/data/site.js`, `build/pages/espacadores.js`, `build/pages/main.js`, `assets/css/style.css` |
| 2026-09-03 | 12 | Seção 9 #2 e #4: missão e visão padronizadas pelo material institucional e "quatro máquinas de injeção" removido, ambos conforme a recomendação da auditoria. #1 (reciclável/reciclada) segue aberto por ser questão de fato, não editorial. Validado: 87/87 íntegras. | `build/pages/main.js` |
| 2026-09-03 | 11 | Auditoria 4.1–4.6, 4.9: intro própria para cada produto (o texto do multiapoio abria 5 páginas); bloco "como escolher o modelo" no hub; intro do hub e das duas linhas; copy da home (H1, subtítulo, CTA, 3 teasers), Quem Somos, Sustentabilidade, Desenvolvimento de Produtos e as 5 páginas de kit. Validado: 87/87 íntegras e **zero** termo vazio ("alta qualidade", "excelência", "solução perfeita", "eco-friendly") em qualquer página. | `build/pages/main.js`, `build/pages/espacadores.js`, `build/pages/kit-vedacao.js`, `build/data/spec-tables.js` |
| 2026-09-03 | 10 | Auditoria seção 8 (schema): `Organization`+`LocalBusiness`, `Product` e `BreadcrumbList` em JSON-LD, gerados a partir da mesma fonte do HTML visível (crumbs e meta), sem `offers` inventado. Validado: 90 blocos, JSON válido, campos obrigatórios presentes, URLs batendo com canonical. | `build/templates.js`, `build/build.js`, `build/pages/main.js`, `build/pages/espacadores.js`, `build/pages/kit-vedacao.js` |
| 2026-09-03 | 9 | Auditoria seção 5: titles e meta descriptions reescritos nas 29 páginas × 3 idiomas, dentro dos limites (60 / 155) e sem termos vazios; páginas gêmeas (cadeirinha e circular aberto nas 2 linhas) diferenciadas; `seoTitle` para posts de título longo. Validado: 87/87 dentro do limite, únicos, OG preenchido. | `build/pages/main.js`, `build/pages/espacadores.js`, `build/pages/kit-vedacao.js`, `build/pages/blog.js` |
| 2026-09-03 | 8 | Auditoria 3.7 / 4.10: formulário de cotação com campos de qualificação (empresa, cidade/UF, segmento, produto, quantidade) + consentimento LGPD; `contato.php` reescrito (whitelist de slugs, 422 sem consentimento, e-mail com labels em PT vindo de qualquer idioma); página `/obrigado/` com `noindex` e redirect por JS; copy da página de contato conforme 4.10 + endereço e horário. Validado: 87/87 páginas OK, `php -l` limpo, 6 cenários de POST testados. | `build/data/site.js`, `build/templates.js`, `build/build.js`, `build/pages/main.js`, `contato.php`, `assets/js/main.js`, `assets/css/style.css` |
| 2026-09-03 | 7 | Auditoria 3.6: `/tecnologia/` → `/desenvolvimento-de-produtos/` (slug, title, H1, eyebrow, menu e rodapé nos 3 idiomas) + 301 no `.htaccess`; diretórios antigos removidos. Validado: 84/84 OK, zero link para a URL antiga. | `build/data/site.js`, `build/templates.js`, `build/pages/main.js`, `.htaccess`, `README.md` |
