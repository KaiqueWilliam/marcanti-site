# Site Marcanti — PT / EN / ES

Recriação do site marcanti.ind.br, com o conteúdo completo em **Português, English e Español**, cada idioma em sua própria URL (`/pt/`, `/en/`, `/es/`). Site estático (HTML/CSS/JS), sem necessidade de Node.js ou WordPress no servidor — pronto para subir na HostGator como está.

## O que subir para a HostGator

Via FTP ou Gerenciador de Arquivos do cPanel, envie **o conteúdo de** `public_html/` com estas pastas/arquivos (tudo que está na raiz deste projeto, **exceto** a pasta `build/`, `backup-imagens/`, `backup-imagens.zip` e este `README.md`):

```
index.html          → página que detecta/escolhe o idioma
contato.php         → recebe o formulário de contato e envia e-mail
assets/             → CSS, JS e todas as imagens
pt/                 → site completo em português
en/                 → site completo em inglês
es/                 → site completo em espanhol
```

A pasta `build/` é o **código-fonte** usado para gerar `pt/`, `en/`, `es/` — não precisa ir para o servidor, mas não a delete: é ela que permite regenerar o site quando o conteúdo mudar (veja abaixo).

`backup-imagens/` e `backup-imagens.zip` são o backup de imagens do site antigo que você enviou — usei para buscar imagens em melhor qualidade e os logos de clientes (veja mais abaixo). Não precisa (nem deve) subir isso para o servidor: são 175MB de arquivos de referência, não fazem parte do site.

Depois de subir, teste `contato.php`: a HostGator já vem com `mail()` do PHP habilitado por padrão, então o formulário deve funcionar sem configuração extra. Se os e-mails não chegarem, confira a pasta de spam ou peça ao suporte da HostGator para confirmar que a função `mail()` está ativa para o domínio.

## Como editar o conteúdo depois

Há dois jeitos, dependendo do tamanho da mudança:

### 1. Edição rápida (sem instalar nada)
Os arquivos em `pt/…/index.html`, `en/…/index.html`, `es/…/index.html` são HTML puro. Dá para abrir e editar diretamente (ex.: corrigir um texto, trocar uma imagem). **Atenção:** como cada idioma é um arquivo separado, uma mudança de conteúdo precisa ser repetida nos 3 arquivos (pt, en, es) para manter a tradução consistente.

### 2. Edição "de verdade" (recomendado para mudanças maiores)
Todo o conteúdo do site (textos em PT/EN/ES, imagens usadas, links do menu, dados de contato) fica organizado em `build/data/` e `build/pages/`, sem repetição — cada arquivo já tem as 3 traduções lado a lado. Depois de editar, um único comando regenera as 81 páginas:

```bash
cd /caminho/do/projeto
node build/build.js
```

Requer apenas Node.js instalado na máquina de quem for editar (não no servidor — o servidor só recebe o HTML já pronto).

Principais arquivos-fonte:
- `build/data/site.js` — telefone, WhatsApp, e-mail, endereço, horário, links de redes sociais, link do catálogo (Google Drive), menu de navegação e textos fixos (botões, rodapé) nos 3 idiomas.
- `build/templates.js` — layout/HTML do cabeçalho, rodapé, e os "blocos" reutilizáveis (seções com imagem+texto, grade de cards, tabela de cores, etc.). Mexer aqui muda o layout de **todas** as páginas.
- `build/pages/main.js` — Home, Quem Somos, Tecnologia, Contato, Sustentabilidade, Catálogo, Política de Privacidade.
- `build/pages/espacadores.js` — hub de Espaçadores, Linha Postes, Linha Construção e os 6 produtos.
- `build/pages/kit-vedacao.js` — hub de Kit Vedação e os 4 produtos.
- `build/pages/blog.js` — índice do blog e os 5 posts.

## Testar localmente antes de subir

```bash
cd /caminho/do/projeto
node build/build.js          # gera/atualiza pt/, en/, es/
python3 -m http.server 8899  # ou: npx serve
# abrir http://localhost:8899/
```

## Decisões tomadas nesta recriação (vale saber)

- **Estrutura de URL:** os slugs (`/quem-somos/`, `/kit-vedacao/…`) são iguais nos 3 idiomas — só muda o prefixo `/pt/`, `/en/`, `/es/`. Isso simplifica o troca-idioma e evita links quebrados; o SEO multilíngue fica garantido pelas tags `hreflang` já incluídas em cada página.
- **Formulário de contato:** os mesmos 4 campos do site antigo (Nome, Email, Telefone, Mensagem), agora enviados via `contato.php` (antes usava um plugin do WordPress).
- **Removido de propósito, não por engano:**
  - O crédito "Privilege Digital" no rodapé (agência que fez o site *antigo* — não faria sentido manter, já que este código é novo).
  - O selo "SiteLock" (indicava uma assinatura de segurança que não existe neste novo site).
  - A página de Política de Privacidade tem um texto genérico (LGPD, dados do formulário de contato) — o site antigo linkava para essa página, mas ela não estava acessível para cópia.
- **Logos de clientes na home** ("Empresas que utilizam nossos produtos"): recuperados do backup de imagens que você enviou (`backup-imagens/`) — o carrossel do site antigo só carregava via JavaScript, então não dava pra capturar direto do site ao vivo. Encontrei 4 logos reais lá dentro (Direcional, DVG Precon, LA.com, Civil) e são esses que aparecem agora em `assets/img/client-*.png`. Se houver mais clientes para incluir, é só adicionar o arquivo em `assets/img/` e incluir o nome no array de `build/pages/main.js` (procure por `client-direcional.png`).
- **Fotos de cores e modelos do Kit Vedação:** também vieram do backup de imagens — são fotos reais das peças do kit (capa, chapéu, anel de vedação) em cada cor e para cada modelo de telha, em vez de simples bolinhas coloridas.
- **Imagens em geral:** onde o backup tinha uma versão de qualidade melhor do que a que eu havia baixado do site ao vivo (o Elementor comprime as imagens para exibição), troquei pela versão original, mantendo os nomes de arquivo mais legíveis (sem os hashes tipo `-q9qplxza...`).
- **Catálogo de produtos:** o botão "Baixar Catálogo" aponta para o mesmo link do Google Drive que o site antigo usava.
- **Imagens e logo:** reaproveitados do site antigo (é a mesma empresa). O logo em `assets/img/logo-marcanti.png` foi trocado pela versão com fundo transparente (a versão usada no site antigo tinha fundo branco sólido, o que ficava ruim no rodapé escuro).

## Estrutura de pastas

```
index.html
contato.php
assets/
  css/style.css
  js/main.js
  img/*
pt/  en/  es/          ← gerados por build/build.js (81 páginas: 27 × 3 idiomas)
build/                  ← código-fonte (não precisa subir ao servidor)
  build.js
  templates.js
  data/site.js
  pages/*.js
```
