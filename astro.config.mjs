import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

const localeConfig = JSON.parse(
  readFileSync(new URL('./src/i18n/locales.json', import.meta.url), 'utf8'),
);

export default defineConfig({
  site: 'https://g-session.github.io',
  base: '/aircal-lp',
  i18n: {
    defaultLocale: 'ja',
    locales: localeConfig.map(({ code }) => code),
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  build: {
    assets: 'assets',
  },
});
