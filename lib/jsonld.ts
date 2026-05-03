import 'server-only';

/**
 * JSON.stringify with `</` escaped to `<\/` to prevent the JSON payload
 * from terminating the surrounding `<script>` tag if any field ever
 * contains the string `</script>`.
 */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/<\/(?=script)/gi, '<\\/');
}

export const SITE_URL = 'https://artbar.co.jp';
