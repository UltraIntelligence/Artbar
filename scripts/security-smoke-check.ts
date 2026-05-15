import { readFileSync } from 'fs';
import { join } from 'path';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const sketchRoute = readFileSync(join(process.cwd(), 'app/api/generate-sketch/route.ts'), 'utf8');
const nextConfig = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
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

console.log('Security smoke check passed.');
