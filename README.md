# Lavra — landing de fábrica de software (Astro)

Site estático em **Astro**, focado em SEO e performance. Reúne, numa página só, as
sections aprovadas da marca, com separação clara entre **HTML** (componentes `.astro`),
**CSS** (`global.css` + estilos com escopo por componente) e **JS** (`src/scripts/*.js`).

> ⚠️ **Lavra** é nome fictício. Confirme marca e domínio antes de publicar.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:4321
npm run build    # gera o site estático em dist/
npm run preview  # serve o build de produção
```

## Estrutura

```
src/
  layouts/Layout.astro       # <head>, SEO, Open Graph, JSON-LD, fontes
  styles/global.css          # tokens das 4 paletas + primitivos compartilhados
  components/                # uma section por arquivo (HTML + CSS com escopo)
    Header · Hero · Impacto · Problema · Servicos · Processo
    Cases · Depoimentos · Formulario · Sobre · CtaFinal · Footer
  scripts/                   # comportamento, um arquivo por responsabilidade
    theme.js     # seletor de paleta (persiste em localStorage)
    hero.js      # palavra rotativa do hero
    counters.js  # contagem dos números ao rolar
    cases.js     # comparador antes/depois (arraste / teclado)
    form.js      # qualificador: split no desktop, passos no mobile, envio por e-mail
  pages/index.astro          # monta a página
public/                      # favicon.svg, og-lavra.svg, robots.txt
```

## Sections (padrões escolhidos)

| Section      | Padrão                                                            |
|--------------|------------------------------------------------------------------|
| Hero         | tipografia gigante + palavra rotativa (fixa na 2ª linha)         |
| Impacto      | grade com divisórias (P02)                                       |
| Problema     | PAS espelhado — problema x solução (V3)                          |
| Serviços     | destaque + secundários, sistema web no bloco grande (P07)       |
| Global       | mini-section com globo 3D (cobe): sistemas escaláveis no mundo   |
| Processo     | zigue-zague, cartão flutuante (V02)                             |
| Cases        | magazine: case-herói + grade + faixa de impacto + antes/depois  |
| Depoimentos  | três cartões (P02)                                              |
| Formulário   | split com resumo ao vivo (desktop) / passos gamificados (mobile)|
| Sobre        | terminal suavizado                                              |
| CTA final    | cartão com próximos passos → WhatsApp (P09)                      |
| Rodapé       | minimalista, wordmark gigante (V2)                              |

Paletas: **Ocre** (padrão) + Floresta, Musgo e Vinho no seletor.
Fontes: **Hanken Grotesk** (sans, estilo AnthropicSans) + **Newsreader**
(serifada editorial, estilo AnthropicSerif) + JetBrains Mono (terminal).

Os blocos surgem com **reveal ao rolar** (`src/scripts/reveal.js` + estilos
escopados em `.js` no `global.css`); sem JS, nada fica escondido. O globo usa a
lib **cobe** (WebGL) — fica nítido em GPU real; em render por software aparece
mais escuro, mas o brilho e os marcadores continuam visíveis.

## Antes de publicar — trocar placeholders

- `astro.config.mjs` → `SITE` (domínio real; alimenta canonical + sitemap)
- `public/robots.txt` → URL do sitemap
- `src/scripts/form.js` → `CONTACT_EMAIL` (destino do formulário)
- `src/components/CtaFinal.astro` → `WHATSAPP_NUMBER` (formato internacional, sem `+`)
- `src/components/Sobre.astro` e `Footer.astro` → campos `[entre colchetes]`
- `public/og-lavra.svg` → gere um **PNG 1200×630** equivalente para melhor compat. social

## SEO & segurança

- `<title>`, meta description, canonical, Open Graph, Twitter Card e JSON-LD
  (`ProfessionalService`) por página; `sitemap-index.xml` automático; `robots.txt`.
- HTML semântico, `lang="pt-BR"`, skip-link, foco visível, `prefers-reduced-motion`.
- Astro 6 (corrige as advisories de XSS de versões anteriores). Links externos com
  `rel="noopener"`. O envio do form usa `mailto:` com conteúdo escapado via
  `encodeURIComponent` — sem `innerHTML` com dado do usuário.
- Restam 2 avisos `low` do `esbuild` que afetam **apenas o servidor de dev** em rede;
  não impactam o build estático de produção.
