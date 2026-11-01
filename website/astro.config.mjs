// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: replace with the real domain once it is registered.
  site: 'https://www.example.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // The root page only redirects to /en/ or /ar/, so keep it out of the sitemap.
      filter: (page) => new URL(page).pathname !== '/',
      i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } },
    }),
  ],
});
