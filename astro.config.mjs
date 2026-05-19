import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://g-session.github.io',
  base: '/aircal-lp',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  build: {
    assets: 'assets',
  },
});
