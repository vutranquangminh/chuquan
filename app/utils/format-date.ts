import dayjs from '~/lib/dayjs';

/**
 * Utils convention: kebab-case filenames, camelCase functions.
 * Pure, framework-agnostic helpers live here.
 */
export function formatDate(
  value: string | number | Date,
  format = 'YYYY-MM-DD',
) {
  return dayjs(value).format(format);
}
