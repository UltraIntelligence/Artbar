export function plainText(input: string): string {
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function metaDescription(input: string, maxLength = 155): string {
  const text = plainText(input);
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength - 3);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${lastSpace > 80 ? clipped.slice(0, lastSpace) : clipped}...`;
}
