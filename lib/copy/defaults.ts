import {
  LOCATION_SHORT_LABELS,
  LOCATIONS,
  PRIVATE_PARTY_CAPACITY_ROWS,
  TEAM_BUILDING_LOGISTICS_ROWS,
} from '@/constants';
import { defaultContent } from '@/data/content';
import { THEME_JP } from '@/data/theme-details-jp-strings';
import type { JapaneseCopyPayload } from '@/lib/copy/types';

export const COPY_TABLE = 'site_copy_locales';
export const COPY_LOCALE = 'jp';
export const COPY_ADMIN_PATH = '/copy-admin';
export const COPY_ADMIN_COOKIE = 'artbar_copy_admin';
export const COPY_ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

export const DEFAULT_JAPANESE_UI_COPY = {
  navbar: {
    switchToJapanese: '日本語',
  },
  home: {
    meetRegularsHeading: 'ご利用企業様',
    bookTeamBuildingCta: 'チームビルディングを予約',
    bilingualLine1: 'プロのバイリンガル',
    bilingualLine2: 'インストラクター',
    mediaCoverageLabel: 'メディア掲載',
    asSeenInHeading: 'メディア掲載実績',
    heroLoading: 'ヒーローを読み込み中',
    storiesLabel: 'ストーリー',
  },
  contact: {
    subjectOptions: [
      { value: '', label: '件名を選択…' },
      { value: 'general', label: '一般的なお問い合わせ' },
      { value: 'booking', label: '予約について' },
      { value: 'private', label: '貸切・パーティー' },
      { value: 'instructor', label: 'インストラクターについて' },
      { value: 'cancellation', label: 'キャンセル' },
      { value: 'other', label: 'その他' },
    ],
    subjectLabel: '件名（必須）',
    nameLabel: 'お名前（必須）',
    emailLabel: 'メールアドレス（必須）',
    phoneLabel: '電話番号（必須）',
    messageLabel: '内容',
    messagePlaceholder: 'お問い合わせ内容をご記入ください',
    send: '送信する',
    sent: '送信しました。追ってご連絡いたします。',
    failed: '送信に失敗しました。恐れ入りますが、再度お試しいただくかメールでご連絡ください。',
  },
  locations: {
    intro: 'お近くのスタジオを探す。各ロケーションでユニークな雰囲気とクリエイティブな体験をお楽しみください。',
    directions: 'ルート案内',
    aiLoaded: 'AI情報表示中',
    aiSummary: 'AI サマリー',
    aiError: '現在AIサマリーを読み込めません。',
    mapsInsightsTitle: 'Maps Insights',
    sourcePrefix: '出典',
    locationAddressLabel: 'Location Address',
    transitAccessLabel: 'Transit Access',
  },
  privateParties: {
    maxGuestsLabel: '最大収容',
  },
  blogPost: {
    articleNotFoundTitle: '記事が見つかりません',
    articleNotFoundCta: 'ジャーナルへ戻る',
    shareLabel: 'この記事をシェア',
    moreFromJournal: 'ジャーナルのほかの記事',
    readStory: '記事を読む',
  },
  notFound: {
    title: 'ページが見つかりません',
    body: 'お探しのページは削除されたか、名前が変更されたか、一時的に利用できない可能性があります。',
    cta: 'ホームへ戻る',
  },
  themeDetail: {
    viewSchedule: 'スケジュールを見る',
    inspiration: 'インスピレーション',
    examplePaintings: '作品例',
    exampleBlurb: '{{name}}のペイント＆シップクラスの一例です',
    theExperience: '体験について',
    guestFavorite: 'ゲスト人気',
    bilingualSessions: 'バイリンガル・ソーシャル枠',
    expertGuidance: '丁寧なステップ指導',
    community: 'コミュニティ',
    whatToExpect: '体験に含まれるもの',
    whatToExpectSub: '東京で作品を完成させるために必要なものはすべて込み。追加料金や隠れた費用はありません。',
    bilingualArtClass: 'バイリンガル・アートクラス',
    perfectForGifting: 'ギフトにも最適',
    viewUpcoming: '開催予定を見る',
    discoverMore: 'ほかのスタイルを見る',
    discoverSub: 'フルイドアートから印象派の庭まで、次の創作体験をArtbar Tokyoで。',
    allCategories: 'すべてのテーマ',
  },
  paintYourPet: {
    headerBadge: 'Artbar Original Program',
    originalPhoto: '元のペットの写真',
    canvasSketch: 'キャンバス上のペット下書き',
    professionalSketchNote: '※アーティストが事前にキャンバスにこのような下書きを用意してお待ちしています！',
    howItWorks: 'Artbarの楽しみ方',
    priceLabel: 'Price',
  },
} satisfies JapaneseCopyPayload['ui'];

export const DEFAULT_JAPANESE_COPY_PAYLOAD: JapaneseCopyPayload = {
  site: structuredClone(defaultContent.jp),
  instructors: defaultContent.instructors.map((item) => ({
    id: item.id,
    roleJp: item.roleJp,
    descJp: item.descJp,
  })),
  locations: defaultContent.locations.map((item) => ({
    id: item.id,
    nameJp: item.nameJp,
    addressJp: item.addressJp,
    accessJp: item.accessJp,
  })),
  faqs: structuredClone(defaultContent.faqs),
  teamBuildingTestimonials: structuredClone(defaultContent.teamBuildingTestimonials),
  blog: defaultContent.blog.map((item) => ({
    id: item.id,
    slug: item.slug,
    titleJp: item.titleJp,
    excerptJp: item.excerptJp,
    contentJp: item.contentJp,
    authorJp: item.authorJp,
  })),
  themePages: structuredClone(THEME_JP),
  locationShortLabels: LOCATION_SHORT_LABELS.map((item) => item.jp),
  teamBuildingLogisticsRows: TEAM_BUILDING_LOGISTICS_ROWS.map((item) => ({
    name: item.name.jp,
    cap: item.cap.jp,
  })),
  privatePartyCapacityRows: PRIVATE_PARTY_CAPACITY_ROWS.map((item) => ({
    name: item.name.jp,
    desc: item.desc.jp,
  })),
  ui: structuredClone(DEFAULT_JAPANESE_UI_COPY),
};

export const COPY_ADMIN_SECTIONS = [
  {
    id: 'shared',
    title: 'Shared Site Copy',
    paths: [
      { path: ['site', 'nav'], title: 'Navigation' },
      { path: ['site', 'footer'], title: 'Footer' },
      { path: ['ui', 'navbar'], title: 'Language Switch' },
      { path: ['locationShortLabels'], title: 'Footer Location Short Names' },
    ],
  },
  {
    id: 'home',
    title: 'Home',
    paths: [
      { path: ['site', 'home'], title: 'Home Page Copy' },
      { path: ['ui', 'home'], title: 'Home UI Labels' },
    ],
  },
  {
    id: 'instructors',
    title: 'Instructors',
    paths: [
      { path: ['site', 'instructorsPage'], title: 'Page Header' },
      { path: ['instructors'], title: 'Instructor Bios' },
    ],
  },
  {
    id: 'team-building',
    title: 'Team Building',
    paths: [
      { path: ['site', 'teamBuilding'], title: 'Page Copy' },
      { path: ['teamBuildingTestimonials'], title: 'Team Testimonials' },
      { path: ['teamBuildingLogisticsRows'], title: 'Logistics Capacity Cards' },
    ],
  },
  {
    id: 'private-parties',
    title: 'Private Parties',
    paths: [
      { path: ['site', 'privateParties'], title: 'Page Copy' },
      { path: ['privatePartyCapacityRows'], title: 'Capacity Cards' },
      { path: ['ui', 'privateParties'], title: 'Private Party UI Labels' },
    ],
  },
  {
    id: 'locations',
    title: 'Locations',
    paths: [
      { path: ['site', 'locationsPage'], title: 'Operating Company Block' },
      { path: ['locations'], title: 'Studio Details' },
      { path: ['ui', 'locations'], title: 'Locations UI Labels' },
    ],
  },
  {
    id: 'press',
    title: 'Press',
    paths: [{ path: ['site', 'pressPage'], title: 'Press Page Copy' }],
  },
  {
    id: 'contact',
    title: 'Contact',
    paths: [
      { path: ['site', 'contactPage'], title: 'Contact Page Copy' },
      { path: ['faqs'], title: 'FAQ Entries' },
      { path: ['ui', 'contact'], title: 'Contact Form Labels' },
    ],
  },
  {
    id: 'blog-list',
    title: 'Blog List',
    paths: [{ path: ['site', 'blogPage'], title: 'Blog List Copy' }],
  },
  {
    id: 'blog-posts',
    title: 'Blog Posts',
    paths: [
      { path: ['blog'], title: 'Individual Blog Posts' },
      { path: ['ui', 'blogPost'], title: 'Blog Post UI Labels' },
    ],
  },
  {
    id: 'paint-your-pet',
    title: 'Paint Your Pet',
    paths: [
      { path: ['site', 'paintYourPet'], title: 'Page Copy' },
      { path: ['ui', 'paintYourPet'], title: 'Paint Your Pet UI Labels' },
    ],
  },
  {
    id: 'theme-pages',
    title: 'Theme Detail Pages',
    paths: [
      { path: ['themePages'], title: 'Theme Page Copy' },
      { path: ['ui', 'themeDetail'], title: 'Theme Page UI Labels' },
    ],
  },
  {
    id: 'not-found',
    title: 'Not Found / Misc',
    paths: [{ path: ['ui', 'notFound'], title: '404 Page Copy' }],
  },
] as const;

export function deepMergeTemplate<T>(template: T, override: unknown): T {
  if (override === undefined || override === null) {
    return structuredClone(template);
  }

  if (typeof template === 'string') {
    return (typeof override === 'string' ? override : template) as T;
  }

  if (Array.isArray(template)) {
    if (!Array.isArray(override)) {
      return structuredClone(template);
    }
    const fallbackItem = template[0];
    return override.map((item, index) => {
      if (fallbackItem === undefined) {
        return structuredClone(item);
      }
      return deepMergeTemplate(template[index] ?? fallbackItem, item);
    }) as T;
  }

  if (typeof template === 'object' && template !== null) {
    if (typeof override !== 'object' || override === null) {
      return structuredClone(template);
    }
    const output: Record<string, unknown> = {};
    for (const key of Object.keys(template as Record<string, unknown>)) {
      output[key] = deepMergeTemplate(
        (template as Record<string, unknown>)[key],
        (override as Record<string, unknown>)[key],
      );
    }
    return output as T;
  }

  return structuredClone(template);
}
