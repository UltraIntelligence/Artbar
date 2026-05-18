import {
  FAQS_JP,
  LOCATION_SHORT_LABELS,
  PRIVATE_PARTY_CAPACITY_ROWS,
  TEAM_BUILDING_LOGISTICS_ROWS,
} from '@/constants';
import { defaultContent } from '@/data/content';
import { THEME_CONFIG } from '@/data/theme-details';
import { THEME_JP } from '@/data/theme-details-jp-strings';
import type { ThemeJpStrings } from '@/data/theme-details-jp-strings';
import type { CopyLocale, JapaneseCopyPayload, LocalizedCopyPayload } from '@/lib/copy/types';

export { COPY_LOCALES } from '@/lib/copy/types';

export const COPY_TABLE = 'site_copy_locales';
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
    bilingualLine1: 'バイリンガル指導をご用意',
    bilingualLine2: '（多くのクラスで対応）',
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
    bilingualSessions: 'ソーシャル・ペインティング枠',
    bilingualSessionsBySlug: {
      'japan-inspired': '日本の思い出を作品に',
      kids: 'バイリンガル・ソーシャルセッション',
      'paint-your-pet': 'ペット好き同士で楽しむ特別なアート',
    },
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

export const DEFAULT_ENGLISH_UI_COPY = {
  navbar: {
    switchToJapanese: 'Japanese',
    switchToEnglish: 'English',
    compactJapanese: 'JP',
    compactEnglish: 'EN',
  },
  footer: {
    faq: 'FAQ',
    careers: 'Careers',
    emailLabel: 'Email Artbar Tokyo',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    logoAlt: 'Artbar Tokyo',
  },
  home: {
    meetRegularsHeading: 'Meet Our Regulars',
    bookTeamBuildingCta: 'Book Team Building',
    bilingualLine1: 'Professional Bilingual',
    bilingualLine2: 'Instruction Available',
    mediaCoverageLabel: 'Media Coverage',
    asSeenInHeading: 'As Seen In',
    heroLoading: 'Loading hero',
    storiesLabel: 'Stories',
    heroImageAlt: 'Artbar Experience',
    conceptImageAlt: 'Artbar Lifestyle',
    ctaImageAlt: 'Artbar Studio',
    conceptVideoCta: 'Watch the full video on YouTube',
    previousTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
  },
  contact: {
    subjectOptions: [
      { value: '', label: 'Select a subject...' },
      { value: 'general', label: 'General Inquiry' },
      { value: 'booking', label: 'Booking' },
      { value: 'private', label: 'Private Party' },
      { value: 'instructor', label: 'Instructor Inquiry' },
      { value: 'cancellation', label: 'Cancellation' },
      { value: 'other', label: 'Other' },
    ],
    subjectLabel: 'Subject (required)',
    nameLabel: 'Name (required)',
    namePlaceholder: 'Artbar Taro',
    emailLabel: 'Email (required)',
    emailPlaceholder: 'hello@example.com',
    phoneLabel: 'Phone (required)',
    messageLabel: 'Message',
    messagePlaceholder: 'How can we help you?',
    send: 'Send Message',
    sent: 'Message sent! We will get back to you soon.',
    failed: 'Failed to send. Please try again or email us directly.',
  },
  locations: {
    intro: 'Find your nearest studio. Each location offers a unique atmosphere for your creative journey.',
    directions: 'Open in Maps',
    aiLoaded: 'AI information loaded',
    aiSummary: 'AI Summary',
    aiError: 'AI summary is unavailable right now.',
    mapsInsightsTitle: 'Maps Insights',
    sourcePrefix: 'Source',
    locationAddressLabel: 'Location Address',
    transitAccessLabel: 'Transit Access',
  },
  press: {
    scrollLeft: 'Scroll left',
    scrollRight: 'Scroll right',
  },
  privateParties: {
    maxGuestsLabel: 'Max Guests',
    priceSuffix: '/ person (tax inc)',
    heroImageAlt: 'Private party at Artbar Tokyo',
  },
  teamBuilding: {
    heroImageAlt: 'Team building art session at Artbar Tokyo',
    specialtyChips: ['Candle Making', 'Resin Art', 'Alcohol Ink'],
    previousTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
  },
  blogList: {
    comingSoon: 'Coming Soon...',
  },
  blogPost: {
    articleNotFoundTitle: 'Article not found',
    articleNotFoundCta: 'Back to Journal',
    shareLabel: 'Share this story',
    facebookShareLabel: 'Share on Facebook',
    xShareLabel: 'Share on X',
    linkedinShareLabel: 'Share on LinkedIn',
    moreFromJournal: 'More from the Journal',
    readStory: 'Read Story',
  },
  notFound: {
    title: 'Page Not Found',
    body: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    cta: 'Back to Home',
  },
  themeDetail: {
    atmosphereImageAlt: 'Artbar Atmosphere',
    viewSchedule: 'View Schedule',
    inspiration: 'Inspiration',
    examplePaintings: 'Example Paintings',
    exampleBlurb: 'A glimpse into our {{name}} paint and sip art classes',
    theExperience: 'THE EXPERIENCE',
    guestFavorite: 'Guest Favorite',
    bilingualSessions: 'Social Painting Sessions',
    bilingualSessionsBySlug: {
      'japan-inspired': 'Create your own memories of Japan',
      kids: 'Bilingual Social Sessions',
      'paint-your-pet': 'Meaningful art with fellow pet lovers!',
    },
    expertGuidance: 'Expert Step-by-Step Guidance',
    community: 'Community',
    whatToExpect: 'What to expect',
    whatToExpectSub: 'Everything you need to complete your artwork in Tokyo is included. No hidden fees.',
    bilingualArtClass: 'Bilingual art class',
    perfectForGifting: 'Perfect for gifting',
    viewUpcoming: 'View Upcoming Schedule',
    discoverMore: 'Discover More Styles',
    discoverSub: 'From fluid art to impressionist gardens, find your next creative escape at Artbar Tokyo.',
    allCategories: 'All Theme Categories',
  },
  paintYourPet: {
    headerBadge: 'Artbar Original Program',
    originalPhoto: 'Original Photo',
    canvasSketch: 'Canvas Sketch',
    professionalSketchNote: '*Our artists prepare a professional sketch like this on your canvas before you arrive!',
    howItWorks: 'How Artbar works',
    priceLabel: 'Price',
    sketchTitle: 'Magic Sketch Preview',
    sketchIntro: 'Upload a photo of your pet to see how our AI envisions a simple canvas sketch.',
    uploadCta: 'Click to Upload Photo',
    uploadFormats: 'JPG, PNG, HEIC, AVIF',
    uploadAriaLabel: 'Upload pet photo',
    originalPetAlt: 'Original Pet',
    aiSketchAlt: 'AI Sketch',
    sketching: 'Sketching...',
    generateLineArt: 'Generate Line Art',
    sketchPlaceholder: 'Sketch will appear here',
    saveSketch: 'Save sketch',
    likeThisVersionTitle: 'Like this version?',
    likeThisVersionBody: 'Send it to Artbar with your class details so the team can match it to the right student and class day.',
    classUseTitle: 'Use this sketch for your Paint Your Pet class',
    classUseBody:
      'Fill in the class details below, then press the main button. We will package the sketch with a clear reference, save the files, and open an email to Artbar so it is easy for you to send.',
    studentNameLabel: 'Student name',
    studentNamePlaceholder: 'e.g. Alex Tanaka',
    studentEmailLabel: 'Student email',
    studentEmailPlaceholder: 'e.g. alex@example.com',
    petNameLabel: 'Pet name',
    petNamePlaceholder: 'e.g. Luna',
    classDateLabel: 'Class date',
    locationLabel: 'Studio or location',
    locationPlaceholder: 'e.g. Ginza',
    notesLabel: 'Notes for Artbar',
    notesPlaceholder: 'e.g. Booking under a different name, two pets, special note',
    optionalLabel: 'optional',
    referenceLabel: 'Searchable reference',
    copyReference: 'Copy',
    referenceHelp:
      'This same reference is used in the file name, the email subject, and the handoff notes so the team can find the right student fast.',
    preparingPackage: 'Preparing your package...',
    useForClass: 'Yes, use this for my class',
    prepareEmailPackage: 'Prepare email package',
    saveClassDetails: 'Save class details',
    packageFooter:
      'This package is prepared for you to send from your own email. We save the sketch, save the class details, and open a ready-made email to {email}.',
    clearAndStartOver: 'Clear and start over',
    defaultStudentName: 'Guest',
    defaultPetName: 'Pet',
    dateTbd: 'DATE-TBD',
    notProvided: 'Not provided',
    none: 'None',
    classSummaryTitle: 'Paint Your Pet class handoff',
    classSummaryReference: 'Reference',
    classSummaryStudentName: 'Student name',
    classSummaryStudentEmail: 'Student email',
    classSummaryPetName: 'Pet name',
    classSummaryClassDate: 'Class date',
    classSummaryLocation: 'Studio/location',
    classSummaryNotes: 'Notes',
    classSummarySketchFile: 'Sketch file',
    classSummaryDestinationInbox: 'Destination inbox',
    emailGreeting: 'Hi Artbar team,',
    emailIntro: "I'd like to use this sketch for my Paint Your Pet class.",
    emailAttached: 'I have attached the sketch file.',
    emailThanks: 'Thank you!',
    packageReady:
      'Your sketch package is ready. We saved the sketch, saved the class details file, and opened a ready-to-send email to Artbar Tokyo.',
    invalidNeedSketch: 'Please generate a sketch first.',
    invalidStudentName: 'Please add the student name.',
    invalidStudentEmail: 'Please add the student email.',
    invalidStudentEmailFormat: 'Please add a valid student email.',
    invalidPetName: 'Please add the pet name.',
    invalidClassDate: 'Please add the class date.',
    uploadInvalidType: 'Please upload a photo file such as JPG or PNG.',
    uploadTooLarge: 'That photo is too large. Please choose one under 15MB.',
    uploadReadError: 'We could not read that photo. Please try a JPG or PNG image.',
    uploadDifferentImage: 'We could not read that photo. Please try a different image.',
    uploadDecodeError: 'This photo format is not decoding cleanly here. Please try a JPG or PNG version.',
    uploadInvalidImage: 'That photo looks invalid. Please try a different image.',
    browserPrepareError: 'Your browser could not prepare this image. Please try again.',
    photoReady: 'Photo ready.',
    photoConverted: 'Photo converted for smoother sketch generation.',
    sketchCreateError: 'We could not create the sketch right now.',
    sketchIncomplete: 'The sketch came back incomplete. Please try again.',
    sketchTimeout: 'The sketch took too long. Please try again with a simpler or smaller photo.',
    genericError: 'Something went wrong. Please try again.',
    preparingMessage: 'Preparing your sketch package...',
    referenceCopiedPrefix: 'Reference copied',
    referencePrefix: 'Reference',
    classDetailsSaved: 'Class details saved as a text file for backup.',
  },
} satisfies JapaneseCopyPayload['ui'];

function buildThemeCopyFromConfig(): Record<string, ThemeJpStrings> {
  return Object.entries(THEME_CONFIG).reduce<Record<string, ThemeJpStrings>>((acc, [slug, theme]) => {
    const copy: ThemeJpStrings = {
      title: theme.title,
      heroBadge: theme.heroBadge,
      heroSub: theme.heroSub,
      introTitle: theme.introTitle,
      introDesc: theme.introDesc,
      quickFeatures: theme.quickFeatures.map((item) => ({
        title: item.title,
        desc: item.desc,
      })),
      examples: theme.examples.map((item) => ({
        title: item.title,
      })),
      expectTitle: theme.expectTitle,
      expectDesc: theme.expectDesc,
      perfectTitle: theme.perfectTitle,
      perfectFor: [...theme.perfectFor],
      whatYouGet: theme.whatYouGet.map((item) => ({
        text: item.text,
        sub: item.sub,
      })),
      ctaTitle: theme.ctaTitle,
      ctaSub: theme.ctaSub,
      seoTitle: theme.seoTitle,
      seoDesc: theme.seoDesc,
    };

    if (theme.exampleBlurb !== undefined) {
      copy.exampleBlurb = theme.exampleBlurb;
    }

    acc[slug] = copy;
    return acc;
  }, {});
}

const buildEnglishCopyPayload = (): JapaneseCopyPayload => ({
  site: structuredClone(defaultContent.en),
  instructors: defaultContent.instructors.map((item) => ({
    id: item.id,
    role: item.roleEn,
    desc: item.descEn,
  })),
  locations: defaultContent.locations.map((item) => ({
    id: item.id,
    name: item.nameEn,
    address: item.addressEn,
    access: item.accessEn,
  })),
  faqs: structuredClone(defaultContent.faqs),
  teamBuildingTestimonials: structuredClone(defaultContent.teamBuildingTestimonials),
  blog: defaultContent.blog.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.titleEn,
    excerpt: item.excerptEn,
    content: item.contentEn,
    author: item.authorEn,
  })),
  themePages: buildThemeCopyFromConfig(),
  locationShortLabels: LOCATION_SHORT_LABELS.map((item) => item.en),
  teamBuildingLogisticsRows: TEAM_BUILDING_LOGISTICS_ROWS.map((item) => ({
    name: item.name.en,
    cap: item.cap.en,
  })),
  privatePartyCapacityRows: PRIVATE_PARTY_CAPACITY_ROWS.map((item) => ({
    name: item.name.en,
    desc: item.desc.en,
  })),
  ui: structuredClone(DEFAULT_ENGLISH_UI_COPY),
});

const buildJapaneseCopyPayload = (): JapaneseCopyPayload => ({
  site: structuredClone(defaultContent.jp),
  instructors: defaultContent.instructors.map((item) => ({
    id: item.id,
    role: item.roleJp,
    desc: item.descJp,
  })),
  locations: defaultContent.locations.map((item) => ({
    id: item.id,
    name: item.nameJp,
    address: item.addressJp,
    access: item.accessJp,
  })),
  faqs: structuredClone(FAQS_JP),
  teamBuildingTestimonials: structuredClone(defaultContent.teamBuildingTestimonials),
  blog: defaultContent.blog.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.titleJp,
    excerpt: item.excerptJp,
    content: item.contentJp,
    author: item.authorJp,
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
});

export const DEFAULT_COPY_PAYLOADS = {
  en: buildEnglishCopyPayload(),
  jp: buildJapaneseCopyPayload(),
} satisfies Record<CopyLocale, LocalizedCopyPayload>;

export const DEFAULT_JAPANESE_COPY_PAYLOAD = DEFAULT_COPY_PAYLOADS.jp;

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

export const COPY_ADMIN_FIELD_LABELS: Record<string, string> = {
  'site.nav.book': 'Main booking button',
  'site.nav.schedule': 'Schedule link',
  'site.nav.instructors': 'Instructors link',
  'site.nav.teamBuilding': 'Team Building link',
  'site.nav.privateParties': 'Private Parties link',
  'site.nav.locations': 'Locations link',
  'site.nav.contact': 'Contact link',
  'site.nav.blog': 'Journal link',
  'site.footer.tagline': 'Footer tagline',
  'site.home.hero.badge': 'Home hero badge',
  'site.home.hero.title': 'Home hero headline',
  'site.home.hero.titleHighlight': 'Home hero highlighted headline',
  'site.home.hero.subtitle': 'Home hero supporting line',
  'site.home.hero.ctaSchedule': 'Hero button: Schedule',
  'site.home.hero.ctaLineChat': 'Hero button: Line chat',
  'site.home.hero.ctaFindPainting': 'Hero button: Find painting',
  'site.home.concept.title': 'Home concept headline',
  'site.home.concept.p1': 'Home concept paragraph',
  'site.home.themes.title': 'Popular Themes headline',
  'site.home.themes.subtitle': 'Popular Themes intro',
  'site.home.cta.title': 'Bottom CTA headline',
  'site.home.cta.subtitle': 'Bottom CTA text',
  'site.teamBuilding.hero.title': 'Team Building hero headline',
  'site.privateParties.hero.title': 'Private Parties hero headline',
  'site.contactPage.title': 'Contact page headline',
  'site.blogPage.title': 'Journal page headline',
};

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
