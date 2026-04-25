import type { ContentData, FaqItem, SiteContent, Testimonial } from '@/types';
import type { ThemeJpStrings } from '@/data/theme-details-jp-strings';

export interface JapaneseInstructorCopy {
  id: string;
  roleJp: string;
  descJp: string;
}

export interface JapaneseLocationCopy {
  id: string;
  nameJp: string;
  addressJp: string;
  accessJp: string;
}

export interface JapaneseBlogCopy {
  id: string;
  slug: string;
  titleJp: string;
  excerptJp: string;
  contentJp: string;
  authorJp: string;
}

export interface JapaneseThemeLogisticsRowCopy {
  name: string;
  cap: string;
}

export interface JapanesePrivatePartyCapacityRowCopy {
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

export interface JapaneseCopyPayload {
  site: SiteContent;
  instructors: JapaneseInstructorCopy[];
  locations: JapaneseLocationCopy[];
  faqs: FaqItem[];
  teamBuildingTestimonials: Testimonial[];
  blog: JapaneseBlogCopy[];
  themePages: Record<string, ThemeJpStrings>;
  locationShortLabels: string[];
  teamBuildingLogisticsRows: JapaneseThemeLogisticsRowCopy[];
  privatePartyCapacityRows: JapanesePrivatePartyCapacityRowCopy[];
  ui: JapaneseUiCopy;
}

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
  locale: string;
  draft_payload: JapaneseCopyPayload;
  published_payload: JapaneseCopyPayload;
  previous_published_payload: JapaneseCopyPayload | null;
  created_at?: string;
  updated_at?: string;
  published_at?: string | null;
}

export interface CopyEditorState {
  draft: JapaneseCopyPayload;
  published: JapaneseCopyPayload;
  previousPublished: JapaneseCopyPayload | null;
  isConfigured: boolean;
}
