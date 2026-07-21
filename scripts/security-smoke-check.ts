import { readFileSync } from 'fs';
import { join } from 'path';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const sketchRoute = readFileSync(join(process.cwd(), 'app/api/generate-sketch/route.ts'), 'utf8');
const nextConfig = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
const homeView = readFileSync(join(process.cwd(), 'views/Home.tsx'), 'utf8');
const contentLengthIndex = sketchRoute.indexOf("req.headers.get('content-length')");
const boundedBodyReadIndex = sketchRoute.indexOf('await readBoundedJsonBody(req)');

assert(sketchRoute.includes('MAX_IMAGE_BASE64_LENGTH'), 'Sketch route must use a named base64 image size limit.');
assert(sketchRoute.includes('MAX_JSON_BODY_LENGTH'), 'Sketch route must use a named JSON body size limit.');
assert(contentLengthIndex !== -1, 'Sketch route must read the content-length header before parsing JSON.');
assert(!sketchRoute.includes('await req.json()'), 'Sketch route must not use plain await req.json().');
assert(boundedBodyReadIndex !== -1, 'Sketch route must read JSON through a bounded body helper.');
assert(contentLengthIndex < boundedBodyReadIndex, 'Sketch route must check content-length before reading the request body.');
assert(
  sketchRoute.includes('Number.isFinite(parsedContentLength)'),
  'Sketch route must ignore malformed content-length values safely.'
);
assert(sketchRoute.includes('req.body?.getReader()'), 'Sketch route must read the request stream directly.');
assert(sketchRoute.includes('await reader.read()'), 'Sketch route must read streamed chunks before parsing JSON.');
assert(sketchRoute.includes('totalBytes += value.byteLength'), 'Sketch route must count streamed request bytes.');
assert(
  sketchRoute.includes('totalBytes > MAX_JSON_BODY_LENGTH'),
  'Sketch route must reject streamed bodies over the JSON size limit.'
);
assert(sketchRoute.includes('BodyTooLargeError'), 'Sketch route must return a 413 path for oversized streamed bodies.');
assert(sketchRoute.includes('InvalidJsonBodyError'), 'Sketch route must return a 400 path for malformed JSON.');

for (const disallowedHost of ['picsum.photos', 'i.pravatar.cc']) {
  assert(
    !nextConfig.includes(`hostname: '${disallowedHost}'`) && !nextConfig.includes(`hostname: "${disallowedHost}"`),
    `next/image remotePatterns should not allow unused placeholder host: ${disallowedHost}`
  );
}

// Exact whitespace-delimited token match so a malformed entry such as
// `https://analytics.google.com.evil` cannot satisfy a required-host check.
const hasCspHost = (source: string, host: string) =>
  source.replaceAll('`', '').split(/\s+/).includes(host);

const scriptSource = nextConfig.match(/`script-src[^`]+`/)?.[0];
const connectSource = nextConfig.match(/`connect-src[^`]+`/)?.[0];
const frameSource = nextConfig.match(/`frame-src[^`]+`/)?.[0];
// Assert parsing succeeded before host checks so a future refactor of
// next.config.ts fails with "could not be parsed" rather than a misleading
// "host missing" message. `assert` also narrows these to `string`.
assert(scriptSource, 'CSP script-src directive could not be parsed from next.config.ts.');
assert(connectSource, 'CSP connect-src directive could not be parsed from next.config.ts.');
assert(frameSource, 'CSP frame-src directive could not be parsed from next.config.ts.');
assert(
  hasCspHost(scriptSource, 'https://booking.artbar.co.jp'),
  'CSP script-src must allow the current booking embed helper.'
);
assert(
  hasCspHost(frameSource, 'https://booking.artbar.co.jp'),
  'CSP frame-src must allow the current booking iframes.'
);
for (const analyticsHost of ['https://analytics.google.com', 'https://ad.doubleclick.net']) {
  assert(
    hasCspHost(connectSource, analyticsHost),
    `CSP connect-src must allow the configured Google tag endpoint: ${analyticsHost}`
  );
}
assert(
  homeView.includes('h-[800px]') && homeView.includes('sm:h-[520px]'),
  'The mobile today/tomorrow booking fallback must fit both session rows.'
);

console.log('Security smoke check passed.');
