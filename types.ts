
export interface Testimonial {
  text: string;
  author: string;
  role?: string;
  userImage?: string;
  /** Optional display line (e.g. month/year) for carousels */
  date?: string;
}

export interface Instructor {
  id: string;
  name: string;
  roleEn: string;
  roleJp: string;
  descEn: string;
  descJp: string;
  languages: string;
  profileImage: string;
  artworkImage: string;
}

export interface Location {
  id: string;
  nameEn: string;
  nameJp: string;
  addressEn: string;
  addressJp: string;
  accessEn: string;
  accessJp: string;
  image: string;
}

export interface MediaItem {
  outlet: string;
  date: string;
  image?: string;
  logo?: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  image: string;
  titleEn: string;
  titleJp: string;
  excerptEn: string;
  excerptJp: string;
  contentEn: string; // HTML or Markdown
  contentJp: string; // HTML or Markdown
  authorEn: string;
  authorJp: string;
  date: string;
  tags: string[];
  published: boolean;
}

export interface ThemeConfig {
  fonts: {
    heading: string;
    body: string;
  };
  typography: {
    heroTitle: string;    // H1 on Home
    pageTitle: string;    // H1 on other pages
    sectionTitle: string; // H2
    cardTitle: string;    // H3
    body: string;         // Standard p
    bodyLarge: string;    // Lead text
    bodySmall: string;    // Captions/Badges
  };
}

export interface SiteContent {
  nav: {
    schedule: string;
    instructors: string;
    teamBuilding: string;
    privateParties: string;
    locations: string;
    press: string;
    contact: string;
    book: string;
    blog: string; 
    paintYourPet: string; // New
  };
  home: {
    hero: {
      badge: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
      ctaSchedule: string;
      ctaPrivate: string;
      ctaLineChat: string;
      ctaFindPainting: string;
      ratingScore: string;
      ratingSource: string;
      guestsNumber: string;
      guestsSuffix: string;
    };
    concept: {
      est: string;
      title: string;
      p1: string;
      ratingLabel: string;
      guestsCount: string;
      guestsLabel: string;
    };
    howItWorks: {
      title: string;
      subtitle: string;
      steps: {
        title: string;
        desc: string;
      }[];
    };
    themes: {
      title: string;
      subtitle: string;
      cta: string;
      items: { title: string; desc: string; image: string; slug?: string }[];
    };
    features: {
      title: string;
      subtitle: string;
      items: { title: string; desc: string; image: string }[];
    };
    testimonials: {
      title: string;
      /** Three spotlight cards (e.g. above media coverage) */
      featured: Testimonial[];
      /** Full testimonial carousel */
      carousel: Testimonial[];
    };
    cta: {
      badge: string;
      title: string;
      subtitle: string;
      btnBook: string;
      btnContact: string;
    };
  };
  footer: {
    tagline: string;
    locations: string;
    explore: string;
    support: string;
    rights: string;
    privacy: string;
    terms: string;
    commercial: string;
    company: string;
  };
  instructorsPage: {
    title: string;
    subtitle: string;
  };
  teamBuilding: {
    hero: {
      badge: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
      cta: string;
    };
    socialProof: {
      title: string;
    };
    valueProp: {
      badge: string;
      title: string;
      p1: string;
      p2: string;
      benefits: { title: string; desc: string }[];
    };
    activities: {
      title: string;
      subtitle: string;
      items: { title: string; desc: string; link: string }[];
    };
    specialty: {
      badge: string;
      title: string;
      desc: string;
      cta: string;
    };
    testimonials: {
      title: string;
    };
    logistics: {
      included: {
        title: string;
        desc: string;
        items: string[];
      };
      catering: {
        title: string;
        desc: string;
        items: string[];
        cta: string;
      };
      locations: {
        title: string;
        desc: string;
        note: string;
      };
    };
    pricing: {
      badge: string;
      title: string;
      desc: string;
      packageTitle: string;
      packageSubtitle: string;
      price: string;
      priceNote: string;
      feeLabel: string;
      feePrice: string;
      offsiteLabel: string;
      offsitePrice: string;
      cta: string;
    };
  };
  privateParties: {
    hero: {
      badge: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
    };
    occasions: { title: string; image: string }[];
    pricing: {
      adult: {
        title: string;
        subtitle: string;
        price: string;
        items: { title: string; desc: string }[];
        cta: string;
      };
      kids: {
        title: string;
        subtitle: string;
        price: string;
        items: { title: string; desc: string }[];
        cta: string;
      };
      common: {
        venueFeeLabel: string;
        venueFeePrice: string;
        minGuestsLabel: string;
        minGuests: string;
      };
    };
    capacity: {
      title: string;
    };
    timeline: {
      title: string;
      steps: { time: string; title: string; desc: string }[];
    };
    catering: {
      title: string;
      desc: string;
      items: string[];
      cta: string;
    };
  };
  locationsPage: {
    operating: {
      title: string;
      name: string;
      address: string;
      ceo: string;
      btnFranchise: string;
      btnHiring: string;
    };
  };
  pressPage: {
    badge: string;
    title: string;
    subtitle: string;
    popupsTitle: string;
    popups: { title: string; date: string; loc: string }[];
  };
  contactPage: {
    badge: string;
    title: string;
    notice1: string;
    notice2: string;
    faqTitle: string;
    formTitle: string;
  };
  blogPage: {
    title: string;
    subtitle: string;
    readMore: string;
    back: string;
  };
  paintYourPet: {
    title: string;
    subtitle: string;
    desc: string;
    steps: {
        title: string;
        desc: string;
    }[];
    pricing: {
        price: string;
        priceNote: string;
        includes: string[];
    };
    aiTool: {
        title: string;
        desc: string;
        btnUpload: string;
        btnGenerate: string;
    };
  }
}

export interface ContentData {
  en: SiteContent;
  jp: SiteContent;
  images: Record<string, any>;
  instructors: Instructor[];
  locations: Location[];
  media: MediaItem[];
  teamBuildingTestimonials: Testimonial[];
  faqs: FaqItem[];
  theme: ThemeConfig;
  blog: BlogPost[];
}
