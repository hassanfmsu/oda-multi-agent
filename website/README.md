# Tx | Technology eXcellence: company website

Bilingual (English and Arabic) website for Tx, built with [Astro](https://astro.build).
Pages are plain text files you can edit yourself. The build produces a static
site (HTML, CSS and a little JavaScript) that can be hosted almost anywhere.

- English pages: `/en/...`
- Arabic pages: `/ar/...` (right-to-left layout)
- The home address `/` sends visitors to Arabic if their browser prefers Arabic, otherwise to English.

## Run it on your computer

You need Node.js 22.23.4 or newer (Node 24 LTS recommended; see `.nvmrc`).

```bash
cd website
npm install
npm run dev        # opens a live preview at http://localhost:4321
npm run build      # builds the final site into dist/
npm run preview    # serves the built site from dist/
```

## Where to edit things

| What | File |
|---|---|
| Email, phone, WhatsApp, CR and VAT numbers, address, working hours | `src/site.config.ts` |
| Your domain name | `astro.config.mjs` (`site`) and `public/robots.txt` |
| Text on the home, about, contact and privacy pages, menus and footer | `src/i18n/en.ts` (English) and `src/i18n/ar.ts` (Arabic) |
| Service pages | `src/content/services/en/*.md` and `src/content/services/ar/*.md` |
| Colours and fonts | top of `src/styles/global.css` |
| Logo and browser icon | `src/components/Brand.astro` and `public/favicon.svg` |

Empty values in `src/site.config.ts` are hidden on the site, so you can fill
them in as they become available. The WhatsApp button appears as soon as you
add a number.

### Add or change a service

Each service is one Markdown file per language, with the **same file name** in
`en/` and `ar/`. The file name becomes the web address, for example
`oracle-integration.md` becomes `/en/services/oracle-integration/`.

```markdown
---
title: Oracle Integration
summary: One sentence shown on cards and in search results.
pillar: oracle          # ai or oracle
icon: integration       # sparkle, agent, shield, erp, integration, paas, cloud, chat
order: 5                # position in lists
highlights:
  - Short bullet shown in the "What's included" box
---

## A heading

Normal text, lists and **bold** work as usual in Markdown.
```

A new service automatically appears on the home page, the services page, the
footer and the contact form's "Area of interest" list.

## Before launch

- [ ] Register the domain and put it in `astro.config.mjs` and `public/robots.txt`.
- [ ] Put the real contact details in `src/site.config.ts`.
- [ ] Have a native Arabic speaker review all Arabic text.
- [ ] Check that every claim matches what Tx really offers (for example ZATCA e-invoicing on the Fusion ERP page, and the region points on the home page).
- [ ] Have the privacy policy (`src/i18n/*.ts`, `privacy` section) reviewed against the PDPL, and update it if you add analytics, cookies or a form service.
- [ ] Replace the placeholder logo with a designed one.
- [ ] Only add Oracle partner badges once Tx is an Oracle PartnerNetwork member, following Oracle's brand rules.

## Publish it

Any static host works. Cloudflare Pages or Netlify are free for a site like
this and redeploy automatically every time you push to GitHub. Settings:

| Setting | Value |
|---|---|
| Root directory | `website` (only while the site lives inside this repository) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `NODE_VERSION` = `24` |

## Contact form

There is no server yet, so **Send message** opens the visitor's email app with
the enquiry filled in. That works without any setup, but some visitors have no
email app configured. When you are ready, point the form at a form service, or
later at your own Oracle Integration flow that saves leads in a CRM. The form is
in `src/components/ContactForm.astro`.

## Later phases

1. **Credibility:** case studies, an insights/blog section, a careers page, partner badges.
2. **Showcase:** an "Ask Tx" assistant on the site built with Oracle Digital Assistant
   and OCI Generative AI, contact form leads sent through Oracle Integration into a CRM,
   and hosting on OCI.
