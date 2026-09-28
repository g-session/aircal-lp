import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const localeConfig = JSON.parse(
  await readFile(join(root, 'src/i18n/locales.json'), 'utf8'),
);
const translations = JSON.parse(
  await readFile(join(root, 'src/i18n/translations.json'), 'utf8'),
);
const astroConfig = await readFile(join(root, 'astro.config.mjs'), 'utf8');
const site = astroConfig.match(/site:\s*'([^']+)'/)?.[1];
const baseValue = astroConfig.match(/base:\s*'([^']+)'/)?.[1];

assert.ok(site, 'astro.config.mjs must define site');
assert.ok(baseValue, 'astro.config.mjs must define base');
const base = baseValue.replace(/\/$/, '');
const localeCodes = localeConfig.map(({ code }) => code);
const localeSet = new Set(localeCodes);
assert.equal(localeCodes.length, 25, 'expected 25 configured locales');
assert.equal(localeSet.size, localeCodes.length, 'locale codes must be unique');
assert.equal(localeCodes[0], 'ja', 'Japanese must remain the default locale');
assert.ok(localeSet.has('en'), 'English route must remain /en/');
for (const locale of localeCodes) {
  assert.doesNotThrow(() => Intl.getCanonicalLocales(locale), `${locale} must be a valid hreflang`);
}

const translatedLocales = localeCodes.filter(
  (locale) => locale !== 'ja' && locale !== 'en' && !locale.startsWith('en-'),
);
assert.equal(translatedLocales.length, 20, 'expected 20 translated non-English locales');
assert.deepEqual(
  Object.keys(translations).sort(),
  [...translatedLocales].sort(),
  'translations.json must contain exactly the 20 non-English dictionaries',
);

const requiredStrings = [
  ['meta', 'title'],
  ['meta', 'description'],
  ['nav', 'langSwitch'],
  ['hero', 'tagline'],
  ['hero', 'description'],
  ['hero', 'storeAriaApp'],
  ['hero', 'storeAriaGoogle'],
  ['store', 'appStore'],
  ['store', 'googlePlay'],
  ['finalCta', 'title'],
  ['footer', 'supportHeading'],
  ['footer', 'aboutHeading'],
  ['footer', 'help'],
  ['footer', 'contact'],
  ['footer', 'terms'],
  ['footer', 'privacy'],
  ['footer', 'copyright'],
  ['contact', 'heading'],
  ['contact', 'subheading'],
  ['contact', 'tocTitle'],
];

for (const locale of translatedLocales) {
  const dict = translations[locale];
  assert.ok(dict && typeof dict === 'object', `${locale} dictionary must be an object`);
  for (const [section, key] of requiredStrings) {
    assert.equal(typeof dict[section]?.[key], 'string', `${locale}.${section}.${key} must be text`);
    assert.ok(dict[section][key].trim(), `${locale}.${section}.${key} must not be empty`);
  }
  assert.ok(Array.isArray(dict.features), `${locale}.features must be an array`);
  assert.equal(dict.features.length, 5, `${locale} must define all five feature sections`);
  for (const [index, feature] of dict.features.entries()) {
    for (const key of ['number', 'title', 'body', 'alt']) {
      assert.equal(typeof feature[key], 'string', `${locale}.features[${index}].${key} must be text`);
      assert.ok(feature[key].trim(), `${locale}.features[${index}].${key} must not be empty`);
    }
  }
  assert.ok(Array.isArray(dict.contact?.sections), `${locale}.contact.sections must be an array`);
  assert.ok(dict.contact.sections.length > 0, `${locale} must define contact sections`);
}

function expectedPagePath(locale, contact) {
  const localePath = locale === 'ja' ? '' : `/${locale}`;
  return `${base}${localePath}${contact ? '/contact' : ''}/`;
}

function outputFile(locale, contact) {
  return join(
    dist,
    locale === 'ja' ? '' : locale,
    contact ? 'contact' : '',
    'index.html',
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function verifyImages(html, page) {
  const imageSources = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)].map(
    ([, src]) => src,
  );
  for (const src of imageSources) {
    const pathname = new URL(src, site).pathname;
    assert.ok(pathname.startsWith(`${base}/`), `${page} image must use the configured base: ${src}`);
    const relativePath = pathname.slice(base.length + 1);
    const imageFile = resolve(dist, relativePath);
    assert.ok(imageFile.startsWith(`${resolve(dist)}${sep}`), `${src} must resolve inside dist`);
    await stat(imageFile);
  }
}

for (const locale of localeCodes) {
  for (const contact of [false, true]) {
    const file = outputFile(locale, contact);
    const html = await readFile(file, 'utf8');
    const page = `${locale}${contact ? '/contact' : '/'}`;
    const pagePath = expectedPagePath(locale, contact);
    const canonical = new URL(pagePath, site).href;

    assert.ok(html.includes(`<html lang="${locale}">`), `${page} must set its document language`);
    const canonicalHref = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.equal(canonicalHref?.[1], canonical, `${page} must have the matching canonical URL`);

    const options = [...html.matchAll(/<option\b[^>]*\bvalue="([^"]+)"[^>]*>/g)];
    assert.equal(options.length, localeCodes.length, `${page} language menu must include every locale`);
    const selected = [...html.matchAll(/<option\b[^>]*\bvalue="([^"]+)"[^>]*\bselected(?:="[^"]*")?[^>]*>/g)];
    assert.deepEqual(selected.map(([, value]) => value), [locale], `${page} must select its current locale`);

    for (const targetLocale of localeCodes) {
      const target = expectedPagePath(targetLocale, contact);
      const option = new RegExp(
        `<option\\b(?=[^>]*\\bvalue="${escapeRegExp(targetLocale)}")(?=[^>]*\\bdata-target="${escapeRegExp(target)}")[^>]*>`,
      );
      assert.match(html, option, `${page} switch option for ${targetLocale} must preserve the page`);
    }

    const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\s*>/g)];
    assert.equal(alternates.length, localeCodes.length + 1, `${page} must have 25 alternates and x-default`);
    const alternateMap = new Map(alternates.map(([, language, href]) => [language, href]));
    for (const targetLocale of localeCodes) {
      assert.equal(
        alternateMap.get(targetLocale),
        new URL(expectedPagePath(targetLocale, contact), site).href,
        `${page} alternate for ${targetLocale} must point to its matching route`,
      );
    }
    assert.equal(alternateMap.get('x-default'), new URL(expectedPagePath('ja', contact), site).href);

    if (!contact) {
      assert.equal((html.match(/<section class="feature"[^>]*>/g) ?? []).length, 5, `${page} must show five feature sections`);
      assert.ok(html.includes('<img class="app-icon"'), `${page} must include the app icon`);
      assert.ok(html.includes('alt="aircal"'), `${page} app icon alt text must use the brand name`);
      assert.ok(!html.includes('GET IT ON'), `${page} must not show an English-only Google Play fallback`);
      if (locale.startsWith('en-')) {
        assert.ok(html.includes('colour themes'), `${page} must use regional English spelling`);
      }
      if (locale === 'en-AU' || locale === 'en-GB') {
        assert.ok(html.includes('customisable'), `${page} must use regional English spelling`);
      }
      if (locale === 'en-CA') {
        assert.ok(html.includes('customizable'), `${page} must use Canadian English spelling`);
      }
    } else {
      const supportLocale = localeConfig.find(({ code }) => code === locale)?.supportLocale;
      assert.ok(
        html.includes(`https://g-session.github.io/aircal-help/${supportLocale}/`),
        `${page} contact help link must use the available support locale`,
      );
    }

    await verifyImages(html, page);
  }
}

for (const campaignFile of ['v2/index.html', 'worldcup2026/index.html']) {
  const html = await readFile(join(dist, campaignFile), 'utf8');
  assert.ok(!html.includes('rel="alternate"'), `${campaignFile} must not advertise translated campaign pages`);
}

console.log(`Verified ${localeCodes.length} locales, LP/contact routes, dictionaries, alternates, and image references.`);
