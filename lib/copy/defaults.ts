import {
  FAQS_JP,
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
    switchToEnglish: 'English',
    compactJapanese: 'JP',
    compactEnglish: 'EN',
  },
  footer: {
    faq: 'FAQ',
    careers: '採用情報',
    emailLabel: 'Artbar Tokyoへメール',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    logoAlt: 'Artbar Tokyo',
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
    heroImageAlt: 'Artbarのメインビジュアル',
    conceptImageAlt: 'Artbarの体験イメージ',
    ctaImageAlt: 'Artbarスタジオ',
    conceptVideoCta: 'YouTubeでフル動画を見る',
    previousTestimonial: '前のレビュー',
    nextTestimonial: '次のレビュー',
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
    namePlaceholder: '例：Artbar 太郎',
    emailLabel: 'メールアドレス（必須）',
    emailPlaceholder: '例：hello@example.com',
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
  press: {
    scrollLeft: '左へスクロール',
    scrollRight: '右へスクロール',
  },
  privateParties: {
    maxGuestsLabel: '最大収容',
    priceSuffix: '/ 名（税込）',
    heroImageAlt: 'Artbar Tokyoの貸切パーティー',
  },
  teamBuilding: {
    heroImageAlt: 'Artbar Tokyoのチームビルディングアートセッション',
    specialtyChips: ['キャンドル作り', 'レジンアート', 'アルコールインク'],
    previousTestimonial: '前のレビュー',
    nextTestimonial: '次のレビュー',
  },
  blogList: {
    comingSoon: '近日公開',
  },
  blogPost: {
    articleNotFoundTitle: '記事が見つかりません',
    articleNotFoundCta: 'ジャーナルへ戻る',
    shareLabel: 'この記事をシェア',
    facebookShareLabel: 'Facebookでシェア',
    xShareLabel: 'Xでシェア',
    linkedinShareLabel: 'LinkedInでシェア',
    moreFromJournal: 'ジャーナルのほかの記事',
    readStory: '記事を読む',
  },
  notFound: {
    title: 'ページが見つかりません',
    body: 'お探しのページは削除されたか、名前が変更されたか、一時的に利用できない可能性があります。',
    cta: 'ホームへ戻る',
  },
  themeDetail: {
    atmosphereImageAlt: 'Artbarの雰囲気',
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
    headerBadge: 'Artbarオリジナルプログラム',
    originalPhoto: '元のペットの写真',
    canvasSketch: 'キャンバス上のペット下書き',
    professionalSketchNote: '※アーティストが事前にキャンバスにこのような下書きを用意してお待ちしています！',
    howItWorks: 'Artbarの楽しみ方',
    priceLabel: '料金',
    sketchTitle: 'マジックスケッチプレビュー',
    sketchIntro: 'ペットの写真をアップロードして、キャンバス用のシンプルな下絵イメージをご確認いただけます。',
    uploadCta: '写真をアップロード',
    uploadFormats: 'JPG, PNG, HEIC, AVIF',
    uploadAriaLabel: 'ペットの写真をアップロード',
    originalPetAlt: '元のペット写真',
    aiSketchAlt: 'AI下絵',
    sketching: '下絵を作成中...',
    generateLineArt: '線画を生成',
    sketchPlaceholder: '下絵がここに表示されます',
    saveSketch: '下絵を保存',
    likeThisVersionTitle: 'この下絵で進めますか？',
    likeThisVersionBody: 'クラス情報と一緒にArtbarへ送信すると、スタッフが生徒様とクラス日を確認しやすくなります。',
    classUseTitle: 'この下絵をPaint Your Petクラスで使う',
    classUseBody: '下のクラス情報を入力してメインボタンを押してください。下絵とクラス情報をまとめ、Artbarへ送るメールを開きます。',
    studentNameLabel: '生徒名',
    studentNamePlaceholder: '例：田中アレックス',
    studentEmailLabel: '生徒メールアドレス',
    studentEmailPlaceholder: '例：alex@example.com',
    petNameLabel: 'ペット名',
    petNamePlaceholder: '例：ルナ',
    classDateLabel: 'クラス日',
    locationLabel: 'スタジオまたは場所',
    locationPlaceholder: '例：銀座',
    notesLabel: 'Artbarへのメモ',
    notesPlaceholder: '例：予約名が異なる、ペットが2匹、特記事項など',
    optionalLabel: '任意',
    referenceLabel: '検索用リファレンス',
    copyReference: 'コピー',
    referenceHelp: 'このリファレンスはファイル名、メール件名、引き継ぎメモに使われ、スタッフが生徒様をすぐ確認できるようにします。',
    preparingPackage: 'パッケージを準備中...',
    useForClass: 'この下絵をクラスで使う',
    prepareEmailPackage: 'メール用パッケージを準備',
    saveClassDetails: 'クラス情報を保存',
    packageFooter: 'このパッケージはお客様ご自身のメールから送れるように準備されます。下絵とクラス情報を保存し、{email}宛ての作成済みメールを開きます。',
    clearAndStartOver: 'クリアして最初からやり直す',
    defaultStudentName: 'ゲスト',
    defaultPetName: 'ペット',
    dateTbd: '日付未定',
    notProvided: '未入力',
    none: 'なし',
    classSummaryTitle: 'Paint Your Petクラス引き継ぎ',
    classSummaryReference: 'リファレンス',
    classSummaryStudentName: '生徒名',
    classSummaryStudentEmail: '生徒メールアドレス',
    classSummaryPetName: 'ペット名',
    classSummaryClassDate: 'クラス日',
    classSummaryLocation: 'スタジオ/場所',
    classSummaryNotes: 'メモ',
    classSummarySketchFile: '下絵ファイル',
    classSummaryDestinationInbox: '送信先メール',
    emailGreeting: 'Artbarチームへ',
    emailIntro: 'Paint Your Petクラスでこの下絵を使用したいです。',
    emailAttached: '下絵ファイルを添付しました。',
    emailThanks: 'よろしくお願いいたします。',
    packageReady: '下絵パッケージの準備ができました。下絵とクラス情報ファイルを保存し、Artbar Tokyo宛ての送信用メールを開きました。',
    invalidNeedSketch: '先に下絵を生成してください。',
    invalidStudentName: '生徒名を入力してください。',
    invalidStudentEmail: '生徒メールアドレスを入力してください。',
    invalidStudentEmailFormat: '有効な生徒メールアドレスを入力してください。',
    invalidPetName: 'ペット名を入力してください。',
    invalidClassDate: 'クラス日を入力してください。',
    uploadInvalidType: 'JPGまたはPNGなどの写真ファイルをアップロードしてください。',
    uploadTooLarge: '写真が大きすぎます。15MB未満の写真を選んでください。',
    uploadReadError: '写真を読み込めませんでした。JPGまたはPNG画像でお試しください。',
    uploadDifferentImage: '写真を読み込めませんでした。別の画像でお試しください。',
    uploadDecodeError: 'この写真形式は正常に読み込めません。JPGまたはPNG版でお試しください。',
    uploadInvalidImage: 'この写真は無効のようです。別の画像でお試しください。',
    browserPrepareError: 'ブラウザで画像を準備できませんでした。もう一度お試しください。',
    photoReady: '写真の準備ができました。',
    photoConverted: '下絵生成がスムーズになるよう写真を変換しました。',
    sketchCreateError: '現在、下絵を作成できませんでした。',
    sketchIncomplete: '下絵が不完全な状態で返されました。もう一度お試しください。',
    sketchTimeout: '下絵の作成に時間がかかりすぎました。よりシンプルまたは小さい写真でお試しください。',
    genericError: '問題が発生しました。もう一度お試しください。',
    preparingMessage: '下絵パッケージを準備中...',
    referenceCopiedPrefix: 'リファレンスをコピーしました',
    referencePrefix: 'リファレンス',
    classDetailsSaved: 'バックアップ用にクラス情報をテキストファイルとして保存しました。',
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
  faqs: structuredClone(FAQS_JP),
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
      { path: ['ui', 'footer'], title: 'Footer Small Labels' },
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
      { path: ['ui', 'teamBuilding'], title: 'Team Building UI Labels' },
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
    paths: [
      { path: ['site', 'pressPage'], title: 'Press Page Copy' },
      { path: ['ui', 'press'], title: 'Press UI Labels' },
    ],
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
    paths: [
      { path: ['site', 'blogPage'], title: 'Blog List Copy' },
      { path: ['ui', 'blogList'], title: 'Blog List UI Labels' },
    ],
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
