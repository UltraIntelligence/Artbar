import { readFileSync } from 'fs';
import { join } from 'path';
import robots from '../app/robots';
import sitemap from '../app/sitemap';
import { ENGLISH_BLOG_POSTS_NEED_TRANSLATION } from '../lib/blog-language';

const SITE_URL = 'https://artbar.co.jp';

type RedirectRule = {
  source: string;
  destination: string;
  permanent?: boolean;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function readVercelConfig(): { redirects?: RedirectRule[] } {
  const path = join(process.cwd(), 'vercel.json');
  return JSON.parse(readFileSync(path, 'utf8'));
}

function checkSitemap() {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);
  const uniqueUrls = new Set(urls);

  assert(entries.length >= 100, `Expected at least 100 sitemap entries, found ${entries.length}`);
  assert(uniqueUrls.size === urls.length, 'Sitemap contains duplicate URLs');

  for (const entry of entries) {
    const englishOptional = [...ENGLISH_BLOG_POSTS_NEED_TRANSLATION].some((slug) => entry.url === `${SITE_URL}/blog/${slug}`);
    assert(entry.url.startsWith(SITE_URL), `Sitemap URL is not on ${SITE_URL}: ${entry.url}`);
    const languages = entry.alternates?.languages;
    assert(languages?.ja, `Missing Japanese hreflang alternate for ${entry.url}`);
    assert(languages?.en || englishOptional, `Missing English hreflang alternate for ${entry.url}`);
    assert(languages?.['x-default'], `Missing x-default hreflang alternate for ${entry.url}`);
  }

  const requiredUrls = [
    '',
    '/en',
    '/locations',
    '/en/locations',
    '/locations/daikanyama',
    '/en/locations/daikanyama',
    '/paint-your-pet',
    '/en/paint-your-pet',
    '/team-building',
    '/en/team-building',
    '/private-parties',
    '/en/private-parties',
    '/blog',
    '/en/blog',
    '/guides',
    '/en/guides',
    '/guides/tokyo-rainy-day-date',
    '/en/guides/tokyo-rainy-day-date',
    '/guides/tokyo-art-experience',
    '/en/guides/tokyo-art-experience',
    '/guides/tokyo-art-workshop',
    '/en/guides/tokyo-art-workshop',
    '/guides/paint-and-sip-tokyo',
    '/en/guides/paint-and-sip-tokyo',
  ].map((path) => `${SITE_URL}${path || '/'}`);

  for (const url of requiredUrls) {
    assert(uniqueUrls.has(url), `Required sitemap URL missing: ${url}`);
  }

  for (const slug of ENGLISH_BLOG_POSTS_NEED_TRANSLATION) {
    assert(!uniqueUrls.has(`${SITE_URL}/en/blog/${slug}`), `Incomplete English blog post should not be in sitemap: ${slug}`);
    const jpEntry = entries.find((entry) => entry.url === `${SITE_URL}/blog/${slug}`);
    assert(jpEntry, `Japanese blog entry should remain in sitemap: ${slug}`);
    assert(!jpEntry.alternates?.languages?.en, `Japanese-only blog entry should not advertise an English hreflang: ${slug}`);
  }
}

function checkRobots() {
  const config = robots();
  const disallow = Array.isArray(config.rules) ? config.rules.flatMap((rule) => rule.disallow ?? []) : config.rules.disallow ?? [];

  assert(config.sitemap === `${SITE_URL}/sitemap.xml`, 'robots.txt sitemap must point at the Artbar sitemap');
  for (const path of ['/admin', '/copy-admin', '/api/']) {
    assert(disallow.includes(path), `robots.txt must disallow ${path}`);
  }
}

function checkRedirects() {
  const redirects = readVercelConfig().redirects ?? [];
  const ruleBySource = new Map(redirects.map((rule) => [rule.source, rule]));

  for (const rule of redirects) {
    assert(!rule.destination.includes('painta.co'), `Redirect points at Painta instead of Artbar: ${rule.source}`);
  }

  for (const source of [
    '/events',
    '/events/guest-teacher-class-chris-03142025',
    '/events/(.*)',
    '/event-schedule',
    '/event-schedule/(.*)',
    '/events-schedule',
    '/events-schedule/(.*)',
    '/art-in-bloom-クリス・パイレートが語るアートの旅路-a-creative-journey-i',
    '/event-location',
    '/event-location/artbar-yokohama-motomachi',
    '/event-location/new-art-bar-ginza',
    '/event-location/artbar-ginza',
    '/event-location/artbar-daikanyama',
    '/event-location/art-bar-daikanyama',
    '/event-location/artbar-cat-street-harajuku',
    '/event-location/(.*)',
    '/daikanyama',
    '/harajuku',
    '/ginza',
    '/yokohama',
    '/paint-and-sip-tokyo',
    '/tokyo-rainy-day-date',
    '/rainy-day-date-tokyo',
    '/tokyo-art-experience',
    '/tokyo-art-workshop',
    '/tokyo-workshop',
    '/art-wine-tokyo',
    '/tokyo-art-classes',
    '/private-paint-and-sip-tokyo',
    '/paint-your-pet-tokyo',
  ]) {
    assert(ruleBySource.get(source)?.permanent === true, `Legacy redirect should be permanent: ${source}`);
  }

  assert(ruleBySource.get('/event-location')?.destination === '/locations', '/event-location should consolidate to /locations');
  assert(ruleBySource.get('/events/guest-teacher-class-chris-03142025')?.destination === '/blog/chris-pyrate-interview', 'Chris Pyrate event URL should consolidate to the current blog article');
  assert(ruleBySource.get('/event-location/artbar-yokohama-motomachi')?.destination === '/locations/yokohama', 'Yokohama event-location URL should consolidate to the Yokohama location page');
  assert(ruleBySource.get('/event-location/new-art-bar-ginza')?.destination === '/locations/ginza', 'Ginza event-location URL should consolidate to the Ginza location page');
  assert(ruleBySource.get('/event-location/(.*)')?.destination === '/locations', '/event-location/* should consolidate to /locations');
  assert(ruleBySource.get('/daikanyama')?.destination === '/locations/daikanyama', '/daikanyama should consolidate to the Daikanyama location page');
  assert(ruleBySource.get('/paint-and-sip-tokyo')?.destination === '/guides/paint-and-sip-tokyo', '/paint-and-sip-tokyo should consolidate to the paint-and-sip guide');
  assert(ruleBySource.get('/tokyo-rainy-day-date')?.destination === '/guides/tokyo-rainy-day-date', '/tokyo-rainy-day-date should consolidate to the rainy day date guide');
  assert(ruleBySource.get('/tokyo-art-experience')?.destination === '/guides/tokyo-art-experience', '/tokyo-art-experience should consolidate to the art experience guide');
  assert(ruleBySource.get('/tokyo-art-workshop')?.destination === '/guides/tokyo-art-workshop', '/tokyo-art-workshop should consolidate to the art workshop guide');
}

function checkJsonLdHelpers() {
  const source = readFileSync(join(process.cwd(), 'lib/jsonld.ts'), 'utf8');

  for (const needle of [
    'ORGANIZATION_ID',
    'WEBSITE_ID',
    'buildOrganizationJsonLd',
    'buildWebsiteJsonLd',
    'buildWebPageJsonLd',
    'buildLocalBusinessJsonLd',
    'buildServiceJsonLd',
    'sameAs',
    'parentOrganization',
    'addressCountry',
  ]) {
    assert(source.includes(needle), `JSON-LD helper missing expected field/helper: ${needle}`);
  }
}

function main() {
  checkSitemap();
  checkRobots();
  checkRedirects();
  checkJsonLdHelpers();
  console.log('SEO smoke check passed.');
}

main();
