import { ContentData } from '../types';
import {
  INSTRUCTORS,
  LOCATIONS,
  MEDIA_LIST,
  FAQS,
  TEAM_BUILDING_TESTIMONIALS,
  POPULAR_THEMES,
  SITE_IMAGES,
} from '../constants';
import { GI } from './generated-image-paths';

export const defaultContent: ContentData = {
  theme: {
    fonts: {
      heading: "Josefin Sans",
      body: "Hiragino Kaku Gothic ProN"
    },
    typography: {
      // Mobile-first scale: avoid collision with fixed nav; sm+ steps match desktop impact
      heroTitle:
        'text-[clamp(1.9rem,5.65vw+0.68rem,2.7rem)] sm:text-[4.25rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[8.75rem] tracking-tight',
      pageTitle: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
      sectionTitle: "text-3xl sm:text-4xl md:text-5xl",
      cardTitle: "text-2xl md:text-3xl",
      body: "text-base",
      bodyLarge: "text-base md:text-xl",
      bodySmall: "text-sm"
    }
  },
  images: {
    logoDark: "https://artbar.co.jp/wp-content/uploads/ArtBar-Logo_new_200.png", 
    logoLight: "https://artbar.co.jp/wp-content/uploads/ArtBar-Logo_new_e.png", 
    hero: {
      home: SITE_IMAGES.hero.home,
      teamBuilding: SITE_IMAGES.hero.teamBuilding,
      video: SITE_IMAGES.hero.video,
      videoMobile: SITE_IMAGES.hero.videoMobile
    },
    concept: SITE_IMAGES.concept,
    features: SITE_IMAGES.features,
    cta: SITE_IMAGES.cta
  },
  // Use imported constants
  instructors: INSTRUCTORS,
  locations: LOCATIONS,
  media: MEDIA_LIST,
  faqs: FAQS,
  teamBuildingTestimonials: TEAM_BUILDING_TESTIMONIALS,
  
  // Blog Data
  blog: [
    {
      id: "13",
      slug: "yokohama-walk",
      published: true,
      image: GI.blog.yokohamaCover,
      date: "2024.03.20",
      tags: ["Travel", "Best Of List"],
      titleEn: "Project Spotlight: Yokohama Walk",
      titleJp: "横浜散歩：楽しくてインスピレーション溢れる一日",
      authorEn: "Cathy Thompson",
      authorJp: "キャシー・トンプソン",
      excerptEn: "Introduction Yokohama, the second largest city in Japan, is a city known to locals for its mix of history and modern creative culture.",
      excerptJp: "日本で2番目に大きな都市、横浜。歴史と現代のクリエイティブカルチャーが融合した街として地元の人々に愛されています。",
      contentEn: `<p>Introduction Yokohama, the second largest city in Japan, is a city known to locals for its mix of history and modern creative culture. Just a short train ride from Tokyo, it offers a completely different atmosphere with its open port, red brick warehouses, and Chinatown.</p><p>Join us as we explore the best spots for a creative day out, finishing, of course, with a relaxing session at our Yokohama Motomachi studio.</p><img src="${GI.blog.yokohamaInline}" alt="Yokohama Street" />`,
      contentJp: `<p>日本で2番目に大きな都市、横浜。歴史と現代のクリエイティブカルチャーが融合した街として地元の人々に愛されています。東京から電車ですぐの場所にありながら、開港の歴史、赤レンガ倉庫、中華街など、全く異なる雰囲気を持っています。</p><p>クリエイティブな一日を過ごすためのベストスポットを探索し、最後はもちろん、横浜元町スタジオでのリラックスしたセッションで締めくくりましょう。</p><img src="${GI.blog.yokohamaInline}" alt="横浜の街並み" />`
    }
  ],
  
  // Site Content
  en: {
    nav: {
      schedule: "Schedule",
      instructors: "Instructors",
      teamBuilding: "Team Building",
      privateParties: "Private Parties",
      locations: "Locations",
      press: "Press",
      contact: "Contact",
      book: "View Schedule",
      blog: "Journal",
      paintYourPet: "Paint Your Pet"
    },
    home: {
      hero: {
        badge: "CELEBRATING OUR 10TH ANNIVERSARY",
        title: "Tokyo's Most Loved",
        titleHighlight: "Paint & Sip Studios",
        subtitle:
          "Beginner friendly.\nCentrally located.\nUnforgettable.",
        ctaSchedule: "Book Your Session",
        ctaPrivate: "Private Events",
        ctaLineChat: "Chat With Us",
        ctaFindPainting: "Find Your Painting",
        ratingScore: "4.8",
        ratingSource: "rating",
        guestsNumber: "53,600",
        guestsSuffix: "guests"
      },
      concept: {
        est: "Artbar Tokyo – Est. 2016",
        title: "Relax, Sip, Create, Connect.",
        p1: "Artbar is more than an art class—it's a social experience. Step into our lounge-style studio, grab a glass of wine, and let the stress melt away.",
        ratingLabel: "Average Rating",
        guestsCount: "53,600",
        guestsLabel: "Happy guests across Tokyo studios"
      },
      howItWorks: {
        title: "How Artbar works",
        subtitle: "No art skills? No problem. We make it easy to go from blank canvas to masterpiece.",
        steps: [
          { title: "Book", desc: "Choose a session from our calendar that sparks your interest. We update our schedule monthly." },
          { title: "Sip", desc: "Enjoy bottomless wine, tea, or coffee while you settle in. Arrive 15 minutes early to grab a drink." },
          { title: "Create", desc: "Follow our artist's step-by-step guidance. No experience is needed to get great results." },
          { title: "Enjoy", desc: "Take your unique masterpiece home with you. It's ready to hang on your wall immediately." }
        ]
      },
      themes: {
        title: "Popular Themes",
        subtitle: "From classic masterpieces to modern techniques, we have something for everyone.",
        cta: "View Schedule",
        items: POPULAR_THEMES
      },
      features: {
        title: "The Artbar Experience",
        subtitle: "Everything you need for a perfect creative escape.",
        items: [
          { title: "All-Inclusive", desc: "We provide all art materials, aprons, and guidance. Just bring yourself.", image: GI.featureAllInclusive },
          { title: "Free-Flow Drinks", desc: "Enjoy wine, tea, coffee, and light snacks throughout your session.", image: GI.featureFreeFlowDrinks },
          { title: "Bilingual Instruction", desc: "All sessions are taught in English and Japanese by our friendly instructors.", image: GI.featureBilingual }
        ]
      },
      testimonials: {
        title: "Hear from our creative community",
        items: [
          { text: "Very fun and relaxing! It completely took my mind off my extremely busy days in Tokyo. Ami, our instructor, was easy to follow, and when I needed help she was right there for me.", author: "Ryan Stephen Alldridge" },
          { text: "At this friendly art studio, the wine is just liquid motivation to let your creative juice flow. You don’t need to be an artist to get stuck in!", author: "TimeOut Tokyo", role: "Media" },
          { text: "A wonderful experience! I went solo and made new friends. The atmosphere is so welcoming and the wine definitely helps with creativity!", author: "Sarah Jenkins" }
        ]
      },
      cta: {
        badge: "Ready to Create?",
        title: "Unleash your inner artist",
        subtitle: "Book a session today and experience the magic of paint and sip.",
        btnBook: "View Schedule",
        btnContact: "Contact Us"
      }
    },
    footer: {
      tagline: "Japan's First Paint & Sip Studio. Relax, Sip, Create, Connect.",
      locations: "Our Studios",
      explore: "Explore",
      support: "Support",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      commercial: "Specified Commercial Transactions",
      company: "Paint Garage LLC."
    },
    instructorsPage: {
      title: "Meet Our Instructors",
      subtitle: "Our talented team of bilingual artists is here to guide you every step of the way."
    },
    teamBuilding: {
      hero: {
        badge: "Corporate Events & Offsites",
        title: "Unleash Your Team's",
        titleHighlight: "Creative Potential",
        subtitle: "Forget standard icebreakers. We offer immersive art experiences that foster genuine connection, strategic thinking, and stress relief.",
        cta: "Get a Quote"
      },
      socialProof: {
        title: "Trusted by Industry Leaders"
      },
      valueProp: {
        badge: "Why Artbar?",
        title: "More Than Just\nPainting",
        p1: "Our team building events are designed to break down barriers and encourage collaboration in a relaxed, non-judgmental environment.",
        p2: "Whether you come to our studios or we come to you, we create a custom experience that aligns with your team's goals.",
        benefits: [
          { title: "Stress Relief", desc: "Art is a proven way to reduce cortisol and improve mental well-being." },
          { title: "Creative Thinking", desc: "Stepping out of the daily grind sparks new perspectives and ideas." },
          { title: "Genuine Connection", desc: "Shared creative experiences build stronger bonds than standard networking." },
          { title: "All-Inclusive", desc: "We handle everything: materials, drinks, instruction, and cleanup." }
        ]
      },
      activities: {
        title: "Curated Team Experiences",
        subtitle: "From collaborative murals to individual masterpieces, choose the format that fits your team.",
        items: [
          { title: "Paint & Sip", desc: "Our classic session. Everyone paints their own canvas with step-by-step guidance.", link: "Most Popular" },
          { title: "Collaborative Mural", desc: "Work together on separate canvases that combine to form one giant image.", link: "Best for Unity" },
          { title: "Action Painting", desc: "Get messy and loose with Jackson Pollock-style splatter art.", link: "Best for Energy" }
        ]
      },
      specialty: {
        badge: "Something Different",
        title: "Specialty Craft Workshops",
        desc: "Looking for something beyond canvas? We offer a variety of craft-based workshops perfect for teams who want to make something unique.",
        cta: "Inquire About Crafts"
      },
      testimonials: {
        title: "What Teams Are Saying"
      },
      logistics: {
        included: {
          title: "What's Included",
          desc: "We make planning easy with our all-inclusive packages.",
          items: ["2 Hours of Studio Time", "All Art Materials & Aprons", "Bilingual Instruction", "Free-Flow Wine, Tea, Coffee", "Light Snacks (Crackers/Nuts)", "Cleanup Service"]
        },
        catering: {
          title: "Catering Options",
          desc: "Need more food? We partner with Dean & DeLuca and other local caterers. You are welcome to bring your own food!",
          items: [],
          cta: ""
        },
        locations: {
          title: "Locations",
          desc: "Host at one of our 6 studios or we can come to your office.",
          note: "*Capacity limits vary by studio. Offsite events available for 15-100+ guests."
        }
      },
      pricing: {
        badge: "Simple Pricing",
        title: "All-Inclusive Packages",
        desc: "No hidden fees. Just per-person pricing that includes everything you need for a successful event.",
        packageTitle: "Standard Team Building",
        packageSubtitle: "2 Hour Session",
        price: "¥6,600",
        priceNote: "per person (tax inc)",
        feeLabel: "Venue Fee",
        feePrice: "¥16,500 (Waived for groups of 20+)",
        offsiteLabel: "Dispatch Fee",
        offsitePrice: "¥33,000 + Transport",
        cta: "Request Availability"
      }
    },
    privateParties: {
      hero: {
        badge: "Private Events",
        title: "Celebrate in",
        titleHighlight: "Style",
        subtitle: "Birthdays, bachelorette parties, or just a night out with friends. Make it memorable with Artbar."
      },
      occasions: [
        { title: "Birthday Parties", image: GI.privateOccasions.birthday },
        { title: "Bachelorette", image: GI.privateOccasions.bachelorette },
        { title: "Kids Parties", image: GI.privateOccasions.kidsParty },
        { title: "Anniversaries", image: GI.privateOccasions.anniversary }
      ],
      pricing: {
        adult: {
          title: "Adult Party",
          subtitle: "2 Hour Paint & Sip",
          price: "¥5,500",
          items: [
            { title: "Private Studio Use", desc: "Exclusive use of the space for your group" },
            { title: "All Materials", desc: "Canvas, paints, brushes, aprons" },
            { title: "Free-Flow Drinks", desc: "Red/White wine, tea, coffee, juice" },
            { title: "Instruction", desc: "Step-by-step guidance in English/Japanese" }
          ],
          cta: "Book Adult Party"
        },
        kids: {
          title: "Kids Party",
          subtitle: "2 Hour Creative Fun",
          price: "¥4,400",
          items: [
            { title: "Private Studio Use", desc: "Safe and fun environment" },
            { title: "Art Materials", desc: "Kid-friendly paints and supplies" },
            { title: "Drinks & Snacks", desc: "Juice, tea, water and light snacks" },
            { title: "Instruction", desc: "Patient guidance for all skill levels" }
          ],
          cta: "Book Kids Party"
        },
        common: {
          venueFeeLabel: "Venue Fee",
          venueFeePrice: "¥16,500",
          minGuestsLabel: "Minimum Guests",
          minGuests: "Adults: 10 / Kids: 15"
        }
      },
      capacity: {
        title: "Studio Capacities"
      },
      timeline: {
        title: "Sample Timeline",
        steps: [
          { time: "0:00", title: "Arrival & Drinks", desc: "Guests arrive, grab an apron and a glass of wine." },
          { time: "0:15", title: "Painting Begins", desc: "Instructor starts the step-by-step guidance." },
          { time: "1:00", title: "Break & Socialize", desc: "Refill drinks and take photos." },
          { time: "1:45", title: "Finishing Touches", desc: "Add final details and sign your masterpiece." }
        ]
      },
      catering: {
        title: "Food & Cake",
        desc: "You are welcome to bring your own food or birthday cake! We can also arrange catering.",
        items: ["BYO Food allowed (No strong odors please)", "BYO Cake allowed", "Catering menu available"],
        cta: "View Catering Menu"
      }
    },
    locationsPage: {
      operating: {
        title: "Operating Company",
        name: "Paint Garage LLC",
        address: "7-2 Daikanyamacho, Shibuya-ku, Tokyo",
        ceo: "CEO: Cathy Thompson",
        btnFranchise: "Franchise Inquiry",
        btnHiring: "We're Hiring"
      }
    },
    pressPage: {
      badge: "Media Coverage",
      title: "Press & Media",
      subtitle: "As Japan's first Paint & Sip studio, we have been featured in numerous media outlets.",
      popupsTitle: "Past Pop-up Events",
      popups: [
        { title: "Roppongi Hills Hills Cafe", date: "2019", loc: "Roppongi" },
        { title: "Isetan Shinjuku", date: "2018", loc: "Shinjuku" },
        { title: "Tokyu Plaza Ginza", date: "2017", loc: "Ginza" }
      ]
    },
    contactPage: {
      badge: "Contact",
      title: "Contact Us",
      notice1: "Please use the form below for cancellations. Note that cancellations within 24 hours of the event are non-refundable.",
      notice2: "We usually reply within 24 hours. If you do not receive a reply, please check your spam folder.",
      faqTitle: "Frequently Asked Questions",
      formTitle: "Send a Message"
    },
    blogPage: {
      title: "Artbar Journal",
      subtitle: "Stories about art, creativity, and lifestyle in Tokyo.",
      readMore: "Read Story",
      back: "Back to Journal"
    },
    paintYourPet: {
        title: "Paint Your Pet",
        subtitle: "Cherish your furry friend forever. No experience needed.",
        desc: "Join us for one of Artbar's most popular sessions! Our artists will sketch your pet on canvas before you arrive, making it easy to paint a portrait you'll cherish. Can't make it to the studio? Use our Magic Sketch tool below to create a printable guide for painting at home!",
        steps: [
            { title: "Book a Session", desc: "Choose a 'Paint Your Pet' session from our calendar." },
            { title: "Send Your Photo", desc: "Upload your pet's photo at least 48 hours before the event so our artists can prepare your sketch." },
            { title: "We Prepare", desc: "Our pro artists hand-sketch your pet onto the canvas for you." },
            { title: "Paint & Sip", desc: "Come in, grab a drink, and enjoy painting your furry friend!" }
        ],
        pricing: {
            price: "¥6,050",
            includes: ["Wine & Snacks", "Canvas & Paints", "Instruction"]
        },
        aiTool: {
            title: "Magic Sketch Preview",
            desc: "While our artists hand-sketch your pet for the class, use this tool to generate a coloring-book style outline you can print and paint at home!",
            btnUpload: "Upload Pet Photo",
            btnGenerate: "Magic Sketch"
        }
    }
  },
  
  // Site Content - Japanese
  jp: {
    nav: {
      schedule: "スケジュール",
      instructors: "インストラクター",
      teamBuilding: "チームビルディング",
      privateParties: "プライベートパーティー",
      locations: "スタジオアクセス",
      press: "メディア掲載",
      contact: "お問い合わせ",
      book: "予約する",
      blog: "ジャーナル",
      paintYourPet: "ペットを描こう"
    },
    home: {
      hero: {
        badge: "CELEBRATING OUR 10TH ANNIVERSARY",
        title: "東京で一番愛されている",
        titleHighlight: "ペイント＆シップスタジオ",
        subtitle:
          "初心者歓迎。\nアクセス便利。\n忘れられない体験。",
        ctaSchedule: "セッションを予約する",
        ctaPrivate: "プライベートイベント",
        ctaLineChat: "LINEで相談する",
        ctaFindPainting: "描きたい絵を探す",
        ratingScore: "4.8",
        ratingSource: "評価",
        guestsNumber: "53,600",
        guestsSuffix: "名のお客様"
      },
      concept: {
        est: "Artbar Tokyo – Est. 2016",
        title: "リラックス、ドリンク、クリエイト、コネクト。",
        p1: "Artbarは、単なる絵画教室ではありません。都会の喧騒から離れ、ワインやドリンクと共に感性を解き放つ「大人のための隠れ家」です。",
        ratingLabel: "平均評価",
        guestsCount: "53,600",
        guestsLabel: "累計53,600名以上のお客様に選ばれています"
      },
      howItWorks: {
        title: "Artbarの楽しみ方",
        subtitle: "アートの経験は一切不要. 真っ白なキャンバスが、あなただけのアートに変わるまでのプロセスをお楽しみください。",
        steps: [
          { title: "予約", desc: "カレンダーから、心惹かれるテーマのセッションをお選びください。" },
          { title: "乾杯", desc: "スタジオではフリーフローのワインやコーヒーをご用意。エプロンをつけて、リラックスしたひとときを。" },
          { title: "制作", desc: "インストラクターが丁寧にガイドします。初心者の方でも、驚くような作品に仕上がります。" },
          { title: "完成", desc: "描き上げた作品は、その日のうちにお持ち帰りいただけます。ご自宅のインテリアに彩りを。" }
        ]
      },
      themes: {
        title: "人気のテーマ",
        subtitle: "古典的な名画の模写から、モダンなテクスチャーアートまで。多彩なプログラムをご用意しています。",
        cta: "スケジュールを見る",
        items: POPULAR_THEMES
      },
      features: {
        title: "Artbarの体験",
        subtitle: "日常を忘れて没頭できる、充実のサービス。",
        items: [
          { title: "オールインクルーシブ", desc: "画材、エプロン、お持ち帰り袋など、必要なものは全てご用意。手ぶらでお越しください。", image: GI.featureAllInclusive },
          { title: "フリーフロードリンク", desc: "セッション中は、ワイン、紅茶、コーヒー、軽食をフリーフロー（飲み放題）でお楽しみいただけます。", image: GI.featureFreeFlowDrinks },
          { title: "バイリンガル対応", desc: "英語・日本語でインストラクターがサポート。グローバルな雰囲気も魅力です。", image: GI.featureBilingual }
        ]
      },
      testimonials: {
        title: "参加者の声",
        items: [
          { text: "とても楽しくてリラックスできました！東京での多忙な日々を完全に忘れることができました。インストラクターのAmiさんは分かりやすく、助けが必要なときはすぐに来てくれました。", author: "Ryan Stephen Alldridge" },
          { text: "このフレンドリーなアートスタジオでは、ワインは創造力を溢れさせるための液体のようなモチベーションです。アーティストである必要はありません！", author: "TimeOut Tokyo", role: "Media" },
          { text: "素晴らしい体験でした！一人で参加して新しい友達ができました。雰囲気はとても歓迎的で、ワインは間違いなく創造性を助けてくれます！", author: "Sarah Jenkins" }
        ]
      },
      cta: {
        badge: "さあ、始めましょう",
        title: "内なるアーティストを目覚めさせる",
        subtitle: "今すぐセッションを予約して、日常を彩るアート体験を。",
        btnBook: "スケジュールを見る",
        btnContact: "お問い合わせ"
      }
    },
    footer: {
      tagline: "日本初のPaint & Sipスタジオ。リラックス、ドリンク、クリエイト、コネクト。",
      locations: "スタジオ一覧",
      explore: "探す",
      support: "サポート",
      rights: "All rights reserved.",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      commercial: "特定商取引法に基づく表記",
      company: "Paint Garage 合同会社"
    },
    instructorsPage: {
      title: "インストラクター紹介",
      subtitle: "才能豊かなバイリンガルのアーティストたちが、あなたの創作をサポートします。"
    },
    teamBuilding: {
      hero: {
        badge: "企業イベント・オフサイト",
        title: "チームの結束を深める",
        titleHighlight: "クリエイティブな体験",
        subtitle: "ありきたりな研修とは違う、記憶に残る体験を。\nアート制作を通じた共同作業が、チームの絆を自然と深め、新たなイノベーションを生み出す土壌を作ります。",
        cta: "見積もりを依頼"
      },
      socialProof: {
        title: "導入実績・パートナー企業"
      },
      valueProp: {
        badge: "Artbarのチームビルディング",
        title: "アートがもたらす、\n組織へのポジティブな変化",
        p1: "私たちのプログラムは、リラックスした雰囲気の中で階層や部署の壁を取り払い、心理的安全性とコラボレーションを促進するように設計されています。",
        p2: "スタジオでの開催はもちろん、オフィスや外部会場への出張も可能。チームの課題や目的に合わせた最適なプランをご提案します。",
        benefits: [
          { title: "ストレス解消とウェルウェルビーイング", desc: "アートに没頭する時間は、デジタルデトックス効果とともにメンタルヘルスを向上させます。" },
          { title: "クリエイティブ思考の刺激", desc: "日常業務から離れ、右脳を使うことで、新しい視点や柔軟な発想を引き出します。" },
          { title: "真のコミュニケーション", desc: "作品を通じた対話は、普段の会議では生まれない深い相互理解と共感を生みます。" },
          { title: "完全お任せの運営", desc: "画材の準備から進行, 片付けまで全て私たちが担当. 幹事様の負担を最小限に抑えます。" }
        ]
      },
      activities: {
        title: "選べるプログラム",
        subtitle: "一体感を高める共同制作から、個性を発揮するワークショップまで。",
        items: [
          { title: "ペイント＆シップ", desc: "Artbarの定番スタイル。同じテーマを描きながら、それぞれの個性の違いを楽しみます。", link: "一番人気" },
          { title: "コラボレーション・ミューラル", desc: "全員で分割されたキャンバスを描き、最後に一つの巨大な壁画を完成させます。", link: "結束力向上" },
          { title: "アクション・ペインティング", desc: "絵具を豪快に飛び散らせるアート。エネルギーの発散と開放感をチームで共有。", link: "リフレッシュ" }
        ]
      },
      specialty: {
        badge: "その他のワークショップ",
        title: "クラフト・ワークショップ",
        desc: "絵画以外にも、レジンアートやキャンドル作りなど、ものづくりの楽しさを共有できる多彩なプログラムをご用意しています。",
        cta: "クラフトについて問い合わせる"
      },
      testimonials: {
        title: "参加企業様の声"
      },
      logistics: {
        included: {
          title: "パッケージに含まれるもの",
          desc: "イベントの成功に必要なものは、すべて基本プランに含まれています。",
          items: ["2時間のスタジオ貸切・セッション", "全ての画材・エプロン", "バイリンガル講師による指導", "フリーフロードリンク（ワイン/お茶/珈琲）", "軽食（クラッカー/ナッツ）", "準備・清掃サービス"]
        },
        catering: {
          title: "ケータリング・オプション",
          desc: "お食事を充実させたい場合は、DEAN & DELUCA等の提携ケータリング手配が可能です。また、お食事の持ち込みも自由です。",
          items: [],
          cta: ""
        },
        locations: {
          title: "開催場所",
          desc: "都内・横浜・大阪の各スタジオ、または貴社オフィスへ出張いたします。",
          note: "*スタジオごとの定員は異なります。出張イベントは100名規模まで対応可能です。"
        }
      },
      pricing: {
        badge: "料金プラン",
        title: "オールインクルーシブ価格",
        desc: "追加料金の心配がない、明瞭なパッケージ料金です。",
        packageTitle: "スタンダード・プラン",
        packageSubtitle: "2時間セッション",
        price: "¥6,600",
        priceNote: "1名様あたり (税込)",
        feeLabel: "会場費",
        feePrice: "¥16,500 (20名以上のグループは無料)",
        offsiteLabel: "出張費（オフサイト）",
        offsitePrice: "¥33,000 + 交通費実費",
        cta: "空き状況・見積もりを依頼"
      }
    },
    privateParties: {
      hero: {
        badge: "プライベートイベント",
        title: "特別な日を、",
        titleHighlight: "アートと共に彩る",
        subtitle: "誕生日、バチェロレッテ、あるいは友人との特別な集まりに。\nArtbarでしか味わえない、洗練されたパーティーを。"
      },
      occasions: [
        { title: "バースデー・パーティー", image: GI.privateOccasions.birthday },
        { title: "バチェロレッテ", image: GI.privateOccasions.bachelorette },
        { title: "キッズ・パーティー", image: GI.privateOccasions.kidsParty },
        { title: "記念日のお祝い", image: GI.privateOccasions.anniversary }
      ],
      pricing: {
        adult: {
          title: "大人向け貸切プラン",
          subtitle: "2時間 ペイント＆シップ",
          price: "¥5,500",
          items: [
            { title: "スタジオ完全貸切", desc: "プライベートな空間で気兼ねなく" },
            { title: "全ての画材一式", desc: "キャンバス、絵具、エプロン等" },
            { title: "フリーフロードリンク", desc: "赤白ワイン、ソフトドリンク飲み放題" },
            { title: "専属インストラクター", desc: "英語・日本語で丁寧にサポート" }
          ],
          cta: "予約・お問い合わせ"
        },
        kids: {
          title: "キッズ・バースデー",
          subtitle: "2時間 クリエイティブ・ファン",
          price: "¥4,400",
          items: [
            { title: "スタジオ完全貸切", desc: "お子様も安心の安全な環境" },
            { title: "キッズ用画材", desc: "衣服についても落ちやすい絵具を使用" },
            { title: "ソフトドリンク", desc: "ジュースやお茶、軽食付き" },
            { title: "専属インストラクター", desc: "お子様の感性を優しく引き出します" }
          ],
          cta: "予約・お問い合わせ"
        },
        common: {
          venueFeeLabel: "会場費",
          venueFeePrice: "¥16,500",
          minGuestsLabel: "最低保証人数",
          minGuests: "大人: 10名〜 / 子供: 15名〜"
        }
      },
      capacity: {
        title: "各スタジオの定員"
      },
      timeline: {
        title: "当日の流れ（例）",
        steps: [
          { time: "0:00", title: "ドアオープン＆乾杯", desc: "ゲストをお迎えし、エプロンを選んでワインで乾杯。" },
          { time: "0:15", title: "セッション開始", desc: "インストラクターのデモンストレーションと共にペイント開始。" },
          { time: "1:00", title: "ブレイクタイム", desc: "おしゃべりを楽しんだり、写真撮影をしたり。ドリンクのおかわりも。" },
          { time: "1:45", title: "仕上げ・サイン", desc: "作品に最後の仕上げをし、サインを入れて完成です。" }
        ]
      },
      catering: {
        title: "お食事・ケーキについて",
        desc: "お食事やバースデーケーキのお持ち込みは自由です（無料）。また、ご予算に応じたケータリングの手配も承ります。",
        items: ["フード持ち込み可 (匂いの強いものはご遠慮ください)", "ケーキ持ち込み可（ナイフ等はご用意します）", "ケータリング手配可能"],
        cta: "ケータリングメニューを見る"
      }
    },
    locationsPage: {
      operating: {
        title: "運営会社",
        name: "Paint Garage 合同会社",
        address: "東京都渋谷区代官山町7-2",
        ceo: "代表: キャシー・トンプソン",
        btnFranchise: "フランチャイズ加盟について",
        btnHiring: "採用情報"
      }
    },
    pressPage: {
      badge: "メディア掲載",
      title: "Media Coverage",
      subtitle: "日本初のPaint & Sipスタジオとして、ファッション誌やテレビなど多数のメディアにご紹介いただいています。",
      popupsTitle: "過去のポップアップイベント",
      popups: [
        { title: "六本木ヒルズ ヒルズカフェ", date: "2019", loc: "六本木" },
        { title: "伊勢丹新宿店", date: "2018", loc: "新宿" },
        { title: "東急プラザ銀座", date: "2017", loc: "銀座" }
      ]
    },
    contactPage: {
      badge: "お問い合わせ",
      title: "Contact Us",
      notice1: "キャンセルや変更は以下のフォームより承ります。開催24時間以内のキャンセルは返金対象外となりますのでご注意ください。",
      notice2: "通常24時間以内に担当者より返信いたします。",
      faqTitle: "よくある質問",
      formTitle: "メッセージを送る"
    },
    blogPage: {
      title: "Artbar Journal",
      subtitle: "アート、クリエイティビティ、そして東京のライフスタイルについて。",
      readMore: "記事を読む",
      back: "ジャーナルに戻る"
    },
    paintYourPet: {
        title: "大好きなペットを描こう!",
        subtitle: "Paint Your Pet - Artbar Tokyo Original Program",
        desc: "Artbarで最も人気のあるクラスの一つです！大好きなあなたのペットをペイントしましょう。先生が手伝ってくれるので、絵が苦手でも大丈夫です。ご自宅で挑戦したい方は、下の「マジック・スケッチ」ツールを使って下書きを作成できます！",
        steps: [
            { title: "予約する", desc: "カレンダーから「Paint Your Pet」セッションを予約します。" },
            { title: "写真を送る", desc: "開催の48時間前までにペットの写真を送ってください。アーティストが手作業で下書きを準備するために必要です。" },
            { title: "下書き準備", desc: "プロのアーティストが、あなたのキャンバスにペットの下書きを描いてお待ちしています。" },
            { title: "ペイント＆シップ", desc: "ワインを飲みながら、リラックスして色を塗っていきましょう。" }
        ],
        pricing: {
            price: "¥6,050",
            includes: ["ワイン・スナック", "キャンバス・画材", "丁寧な指導"]
        },
        aiTool: {
            title: "マジック・スケッチ",
            desc: "クラスではアーティストが手書きで下書きを用意しますが、このツールを使えばご自宅でプリントして使える「塗り絵用」の下書きをAIで作成できます！",
            btnUpload: "写真をアップロード",
            btnGenerate: "スケッチを作成"
        }
    }
  }
};