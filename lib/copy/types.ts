import type { ContentData, FaqItem, SiteContent, Testimonial } from '@/types';
import type { ThemeJpStrings } from '@/data/theme-details-jp-strings';

export type CopyLocale = 'en' | 'jp';

export interface LocalizedInstructorCopy {
  id: string;
  role: string;
  desc: string;
}

export interface LocalizedLocationCopy {
  id: string;
  name: string;
  address: string;
  access: string;
}

export interface LocalizedBlogCopy {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
}

export interface LocalizedThemeLogisticsRowCopy {
  name: string;
  cap: string;
}

export interface LocalizedPrivatePartyCapacityRowCopy {
  name: string;
  desc: string;
}

export interface JapaneseUiCopy {
  navbar: {
    switchToJapanese: string;
    switchToEnglish: string;
    compactJapanese: string;
    compactEnglish: string;
  };
  footer: {
    faq: string;
    careers: string;
    emailLabel: string;
    instagramLabel: string;
    facebookLabel: string;
    logoAlt: string;
  };
  home: {
    meetRegularsHeading: string;
    bookTeamBuildingCta: string;
    bilingualLine1: string;
    bilingualLine2: string;
    mediaCoverageLabel: string;
    asSeenInHeading: string;
    heroLoading: string;
    storiesLabel: string;
    heroImageAlt: string;
    conceptImageAlt: string;
    ctaImageAlt: string;
    conceptVideoCta: string;
    previousTestimonial: string;
    nextTestimonial: string;
  };
  contact: {
    subjectOptions: { value: string; label: string }[];
    subjectLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sent: string;
    failed: string;
  };
  press: {
    scrollLeft: string;
    scrollRight: string;
  };
  locations: {
    intro: string;
    directions: string;
    aiLoaded: string;
    aiSummary: string;
    aiError: string;
    mapsInsightsTitle: string;
    sourcePrefix: string;
    locationAddressLabel: string;
    transitAccessLabel: string;
  };
  privateParties: {
    maxGuestsLabel: string;
    priceSuffix: string;
    heroImageAlt: string;
  };
  teamBuilding: {
    heroImageAlt: string;
    specialtyChips: string[];
    previousTestimonial: string;
    nextTestimonial: string;
  };
  blogList: {
    comingSoon: string;
  };
  blogPost: {
    articleNotFoundTitle: string;
    articleNotFoundCta: string;
    shareLabel: string;
    facebookShareLabel: string;
    xShareLabel: string;
    linkedinShareLabel: string;
    moreFromJournal: string;
    readStory: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  themeDetail: {
    atmosphereImageAlt: string;
    viewSchedule: string;
    inspiration: string;
    examplePaintings: string;
    exampleBlurb: string;
    theExperience: string;
    guestFavorite: string;
    bilingualSessions: string;
    expertGuidance: string;
    community: string;
    whatToExpect: string;
    whatToExpectSub: string;
    bilingualArtClass: string;
    perfectForGifting: string;
    viewUpcoming: string;
    discoverMore: string;
    discoverSub: string;
    allCategories: string;
  };
  paintYourPet: {
    headerBadge: string;
    originalPhoto: string;
    canvasSketch: string;
    professionalSketchNote: string;
    howItWorks: string;
    priceLabel: string;
    sketchTitle: string;
    sketchIntro: string;
    uploadCta: string;
    uploadFormats: string;
    uploadAriaLabel: string;
    originalPetAlt: string;
    aiSketchAlt: string;
    sketching: string;
    generateLineArt: string;
    sketchPlaceholder: string;
    saveSketch: string;
    likeThisVersionTitle: string;
    likeThisVersionBody: string;
    classUseTitle: string;
    classUseBody: string;
    studentNameLabel: string;
    studentNamePlaceholder: string;
    studentEmailLabel: string;
    studentEmailPlaceholder: string;
    petNameLabel: string;
    petNamePlaceholder: string;
    classDateLabel: string;
    locationLabel: string;
    locationPlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    optionalLabel: string;
    referenceLabel: string;
    copyReference: string;
    referenceHelp: string;
    preparingPackage: string;
    useForClass: string;
    prepareEmailPackage: string;
    saveClassDetails: string;
    packageFooter: string;
    clearAndStartOver: string;
    defaultStudentName: string;
    defaultPetName: string;
    dateTbd: string;
    notProvided: string;
    none: string;
    classSummaryTitle: string;
    classSummaryReference: string;
    classSummaryStudentName: string;
    classSummaryStudentEmail: string;
    classSummaryPetName: string;
    classSummaryClassDate: string;
    classSummaryLocation: string;
    classSummaryNotes: string;
    classSummarySketchFile: string;
    classSummaryDestinationInbox: string;
    emailGreeting: string;
    emailIntro: string;
    emailAttached: string;
    emailThanks: string;
    packageReady: string;
    invalidNeedSketch: string;
    invalidStudentName: string;
    invalidStudentEmail: string;
    invalidStudentEmailFormat: string;
    invalidPetName: string;
    invalidClassDate: string;
    uploadInvalidType: string;
    uploadTooLarge: string;
    uploadReadError: string;
    uploadDifferentImage: string;
    uploadDecodeError: string;
    uploadInvalidImage: string;
    browserPrepareError: string;
    photoReady: string;
    photoConverted: string;
    sketchCreateError: string;
    sketchIncomplete: string;
    sketchTimeout: string;
    genericError: string;
    preparingMessage: string;
    referenceCopiedPrefix: string;
    referencePrefix: string;
    classDetailsSaved: string;
  };
}

export interface LocalizedCopyPayload {
  site: SiteContent;
  instructors: LocalizedInstructorCopy[];
  locations: LocalizedLocationCopy[];
  faqs: FaqItem[];
  teamBuildingTestimonials: Testimonial[];
  blog: LocalizedBlogCopy[];
  themePages: Record<string, ThemeJpStrings>;
  locationShortLabels: string[];
  teamBuildingLogisticsRows: LocalizedThemeLogisticsRowCopy[];
  privatePartyCapacityRows: LocalizedPrivatePartyCapacityRowCopy[];
  ui: JapaneseUiCopy;
}

export type JapaneseCopyPayload = LocalizedCopyPayload;

export interface ResolvedJapaneseCopy {
  faqs: FaqItem[];
  teamBuildingTestimonials: Testimonial[];
  themePages: Record<string, ThemeJpStrings>;
  locationShortLabels: ReadonlyArray<{ en: string; jp: string }>;
  teamBuildingLogisticsRows: Array<{
    name: { en: string; jp: string };
    cap: { en: string; jp: string };
  }>;
  privatePartyCapacityRows: Array<{
    name: { en: string; jp: string };
    cap: string;
    desc: { en: string; jp: string };
    highlight?: boolean;
  }>;
  ui: JapaneseUiCopy;
}

export interface ResolvedCopyBundle {
  content: ContentData;
  jpCopy: ResolvedJapaneseCopy;
}

export interface CopyRecord {
  locale: CopyLocale;
  draft_payload: LocalizedCopyPayload;
  published_payload: LocalizedCopyPayload;
  previous_published_payload: LocalizedCopyPayload | null;
  created_at?: string;
  updated_at?: string;
  published_at?: string | null;
}

export interface LocaleCopyEditorState {
  draft: LocalizedCopyPayload;
  published: LocalizedCopyPayload;
  previousPublished: LocalizedCopyPayload | null;
}

export interface CopyEditorState {
  locales: Record<CopyLocale, LocaleCopyEditorState>;
  isConfigured: boolean;
}
