import type { Locale } from './index';

export type LpImage =
  | '01-month'
  | '02-google'
  | '03-share'
  | '04-themes'
  | '05-widget'
  | 'cover-left'
  | 'cover-right';

const japaneseImages: Record<LpImage, string> = {
  '01-month': '/images/screenshots/01-month.png',
  '02-google': '/images/screenshots/02-google.png',
  '03-share': '/images/screenshots/03-share.png',
  '04-themes': '/images/screenshots/04-themes.png',
  '05-widget': '/images/screenshots/05-widget.png',
  'cover-left': '/images/cover-left.png',
  'cover-right': '/images/cover-right.png',
};

export function imagePath(locale: Locale, image: LpImage, base: string): string {
  const normalizedBase = base.replace(/\/$/, '');
  if (locale === 'ja') {
    return `${normalizedBase}${japaneseImages[image]}`;
  }

  // The localized ASO set reuses the month-view screenshot for the final strip card.
  const localizedImage = image === 'cover-right' ? '01-month' : image;
  return `${normalizedBase}/images/aso/${locale}/${localizedImage}.webp`;
}

export function imageDimensions(locale: Locale) {
  return locale === 'ja'
    ? { width: 1284, height: 2778 }
    : { width: 768, height: 1662 };
}
