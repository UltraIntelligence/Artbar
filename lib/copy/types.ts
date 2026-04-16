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
  };
  contact: {
    subjectOptions: { value: string; label: string }[];
    subjectLabel: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sent: string;
    failed: string;
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
  };
  blogPost: {
    articleNotFoundTitle: string;
    articleNotFoundCta: string;
    shareLabel: string;
    moreFromJournal: string;
    readStory: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  themeDetail: {
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
