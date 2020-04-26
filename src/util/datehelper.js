export function parseDate(dateStr, format) {
    const regex = format.toLocaleLowerCase()
      .replace(/\bd+\b/, '(?<day>\\d+)')
      .replace(/\bm+\b/, '(?<month>\\d+)')
      .replace(/\by+\b/, '(?<year>\\d+)')
    const parts = new RegExp(regex).exec(dateStr) || {};
    const { year, month, day } = parts.groups || {};
    return parts.length === 4 ? new Date(year, month-1, day) : undefined;
}