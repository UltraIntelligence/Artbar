/** Year-end party planning season, evaluated in the studios' timezone. */
export function isYearEndPartySeason(date = new Date()): boolean {
  const month = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', month: 'numeric' }).format(date));
  return month >= 9 && month <= 12;
}
