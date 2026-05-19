export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
};

export const storeLinks = {
  appStore: 'https://apps.apple.com/app/id6746650150',
  googlePlay:
    'https://play.google.com/store/apps/details?id=net.nexus_inc.calendar',
} as const;

export const socialLinks = {
  x: 'https://x.com/aircal_app',
  instagram: 'https://www.instagram.com/aircal.app/',
  tiktok: 'https://www.tiktok.com/@aircal_calender_app',
} as const;

export function externalUrls(locale: Locale) {
  return {
    help: `https://g-session.github.io/aircal-help/${locale}/`,
    privacy: `https://g-session.github.io/aircal-privacy/privacy/${locale}/`,
    terms: `https://g-session.github.io/aircal-privacy/terms/${locale}/`,
    contact: 'mailto:contact@nexus-inc.net',
  };
}

type Dict = {
  meta: { title: string; description: string };
  nav: { langSwitch: string };
  hero: {
    tagline: string;
    description: string;
    storeAriaApp: string;
    storeAriaGoogle: string;
  };
  store: { appStore: string; googlePlay: string };
  features: Array<{ number: string; title: string; body: string; alt: string }>;
  finalCta: { title: string };
  footer: {
    supportHeading: string;
    aboutHeading: string;
    help: string;
    contact: string;
    terms: string;
    privacy: string;
    copyright: string;
  };
};

const ja: Dict = {
  meta: {
    title: 'aircal — 開かず・迷わず・美しく',
    description:
      '予定を"見る"体験にこだわったカレンダーアプリ。Google カレンダーと自動同期し、仕事もプライベートもひとつの画面で。',
  },
  nav: { langSwitch: '言語' },
  hero: {
    tagline: '開かず・迷わず・美しく。',
    description:
      '予定を"見る"体験にこだわった、\nGoogle カレンダー連携のカレンダーアプリ。',
    storeAriaApp: 'App Store でダウンロード',
    storeAriaGoogle: 'Google Play で手に入れよう',
  },
  store: {
    appStore: 'App Store でダウンロード',
    googlePlay: 'Google Play で手に入れよう',
  },
  features: [
    {
      number: '01',
      title: '静かな美しさ',
      body: 'ひと目でわかる月表示。情報の密度と余白のバランスを追求しました。指先のスワイプで月を行き来し、予定確認から追加までが一連の流れで完結します。',
      alt: '月表示の画面',
    },
    {
      number: '02',
      title: 'Google カレンダーと深く連動',
      body: 'リアルタイムの双方向同期で、ビジネスもプライベートも境界なく整理。複数アカウントの切り替えにも対応し、デバイスを変えても同じ表示を維持します。',
      alt: 'Google カレンダー連携の画面',
    },
    {
      number: '03',
      title: '家族や友達と予定を共有',
      body: 'お互いの予定を1画面に。Google カレンダーの共有機能をそのまま活かして、家族カレンダーや共同編集が自然に行えます。',
      alt: '予定共有の画面',
    },
    {
      number: '04',
      title: '自分らしい表示に',
      body: '全 47 種類のカラーテーマ、ダークモード、祝日表示、曜日や週の開始日の切替。シンプルなまま、自分仕様にカスタムできます。',
      alt: 'カラーテーマ一覧',
    },
    {
      number: '05',
      title: 'ホーム画面から覗く',
      body: 'アプリを開かずに、次の予定をチラッと確認。日・週・月単位のウィジェットで、開かない UX を追求しました。',
      alt: 'ホーム画面ウィジェット',
    },
  ],
  finalCta: { title: 'さあ、はじめよう。' },
  footer: {
    supportHeading: 'サポート',
    aboutHeading: 'About',
    help: 'ヘルプ',
    contact: 'お問い合わせ',
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    copyright: '© 2026 aircal',
  },
};

const en: Dict = {
  meta: {
    title: 'aircal — Open less. See more.',
    description:
      'A calendar app crafted for the act of looking. Syncs with Google Calendar to keep work and life in one quiet view.',
  },
  nav: { langSwitch: 'Language' },
  hero: {
    tagline: 'Open less. See more.',
    description:
      'A calendar app crafted for the act of looking,\nbuilt around Google Calendar.',
    storeAriaApp: 'Download on the App Store',
    storeAriaGoogle: 'Get it on Google Play',
  },
  store: {
    appStore: 'Download on the App Store',
    googlePlay: 'Get it on Google Play',
  },
  features: [
    {
      number: '01',
      title: 'Quiet beauty',
      body: 'A month view you can read at a glance. Density and white space, carefully balanced. Swipe between months, glance at the day, add an event — all in one fluid motion.',
      alt: 'Month view screen',
    },
    {
      number: '02',
      title: 'Built around Google Calendar',
      body: 'Real-time, two-way sync keeps work and life in one place. Switch between multiple accounts, and see the same view on every device.',
      alt: 'Google Calendar integration screen',
    },
    {
      number: '03',
      title: 'Share with family and friends',
      body: "See each other's schedules in a single view. Built on Google Calendar's sharing, so family calendars and collaborative editing just work.",
      alt: 'Sharing screen',
    },
    {
      number: '04',
      title: 'Make it yours',
      body: '47 color themes, dark mode, holiday toggles, first-day-of-week — quietly customizable without losing its simplicity.',
      alt: 'Color themes',
    },
    {
      number: '05',
      title: 'A glance, from your Home Screen',
      body: "See what's next without opening the app. Day, week, and month widgets — designed for the no-open UX.",
      alt: 'Home Screen widget',
    },
  ],
  finalCta: { title: 'Start using aircal.' },
  footer: {
    supportHeading: 'Support',
    aboutHeading: 'About',
    help: 'Help',
    contact: 'Contact',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    copyright: '© 2026 aircal',
  },
};

export const dictionaries: Record<Locale, Dict> = { ja, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export function pathFor(locale: Locale, path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const localePart = locale === 'ja' ? '' : `/${locale}`;
  const rest = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `${base}${localePart}${rest}` || '/';
}
