import { Instructor, Location, Testimonial, MediaItem } from './types';
import { GI, type InstructorId } from './data/generated-image-paths';

type InstructorRow = Omit<Instructor, 'profileImage' | 'artworkImage'> & { id: InstructorId };

function attachInstructorPhotos(row: InstructorRow): Instructor {
  const photos = GI.instructors[row.id];
  return { ...row, profileImage: photos.profile, artworkImage: photos.artwork };
}

// Helper for the new placeholder format (non-generated fallbacks only)
const getPh = (w: number, h: number) => `https://www.toolandtea.com/placeholder.svg?height=${h}&width=${w}`;

/** Default hero background image (served from /public/media). */
const HERO_HOME_FALLBACK = '/media/gemini-hero-background.jpeg';

/** Replace @PLACEHOLDER_ID with your LINE official account ID when ready. */
export const LINE_ADD_FRIEND_URL = 'https://line.me/R/ti/p/@PLACEHOLDER_ID';

/** Official LINE app mark (squircle); sits on #06C755 so colors align. Served from /public/media. */
export const LINE_BRAND_ICON_SRC = '/media/LINE_Brand_icon.png';

/** Tokyo studio inbox (footer mail, Paint Your Pet sketch “email for class”). */
export const ARTBAR_TOKYO_EMAIL = 'tokyo@artbar.co.jp';

/** Full promo / lifestyle video on YouTube — home concept block “play” opens this in a new tab. */
export const CONCEPT_BLOCK_YOUTUBE_URL = 'https://www.youtube.com/watch?v=wLjhqJ8v_Bs';

export const SITE_IMAGES = {
  hero: {
    home: HERO_HOME_FALLBACK,
    teamBuilding: GI.heroTeamBuilding,
    video: "/media/artbar-home-video-desktop.mp4",
    videoMobile: "/media/artbar-home-video-mobile-3.mp4"
  },
  concept: {
    main: GI.conceptMain,
    detail: GI.conceptDetail
  },
  features: {
    drink: GI.featureFreeFlowDrinks,
    guide: GI.featureAllInclusive,
    bilingual: GI.featureBilingual
  },
  privateParties: {
    wine: GI.featureFreeFlowDrinks,
    materials: GI.featureAllInclusive,
    instruction: GI.featureBilingual,
  },
  cta: GI.ctaBanner,
};

/** Order matches `site.teamBuilding.activities.items` (EN/JP same sequence). */
export const TEAM_BUILDING_ACTIVITY_IMAGES = [
  GI.teamBuildingActivities.paintSip,
  GI.teamBuildingActivities.collaborativeMural,
  GI.teamBuildingActivities.actionPainting,
];

export const POPULAR_THEMES = [
  { title: "Japan Inspired", desc: "Sakura, Mount Fuji & traditional motifs", image: GI.themes.japanInspired },
  { title: "Paint Pouring", desc: "Fluid art & mesmerizing cells", image: GI.themes.paintPouring },
  { title: "Paint Your Pet", desc: "Immortalize your furry friend", image: GI.themes.paintYourPet },
  { title: "Alcohol Ink", desc: "Ethereal & dreamy abstract art", image: GI.themes.alcoholInk },
  { title: "Van Gogh", desc: "Starry nights & sunflower fields", image: GI.themes.vanGogh },
  { title: "Monet", desc: "Impressionist gardens & water lilies", image: GI.themes.monet },
  { title: "Picasso", desc: "Cubist portraits & bold expressions", image: GI.themes.picasso },
  { title: "Renoir", desc: "Soft light & romantic scenes", image: GI.themes.renoir },
  { title: "Matisse", desc: "Vibrant colors & expressive forms", image: GI.themes.matisse },
  { title: "Kids!", desc: "Fun & simple designs for young artists", image: GI.themes.kids },
  { title: "Texture Painting", slug: "texture-art", desc: "Sculptural & dimensional art", image: GI.themes.texturePainting },
  { title: "Paint Your Idol", desc: "Celebrate your favorite icon", image: GI.themes.paintYourIdol },
];

/** Bios only; image URLs come from `INSTRUCTOR_IDS` + `GI.instructors` (see `data/generated-image-paths.ts`). */
const INSTRUCTOR_ROWS: InstructorRow[] = [
  {
    id: "cathy",
    name: "Cathy Thompson",
    roleEn: "CEO Artbar Tokyo",
    roleJp: "Artbar Tokyo CEO",
    descEn: "Cathy is Artbar Tokyo's CEO - the driving force behind Artbar! She strives to make it a fun and relaxing space for people to express their creative self and spark their love for art. Although most of her work is behind the scenes, she is often in the studio and looks forward to meeting you at any of our sessions.",
    descJp: "Artbar Tokyoの創設者兼CEO。Artbarが単なる絵画教室ではなく、誰もがクリエイティビティを解放できる「大人のサードプレイス」であり続けるよう情熱を注いでいます。スタジオ運営の指揮を執りながら、ゲストの皆様とアートを通じた時間を共有することを楽しみにしています。",
    languages: "English, Japanese"
  },
  {
    id: "naomi",
    name: "Naomi",
    roleEn: "Marketing Director",
    roleJp: "マーケティング・ディレクター",
    descEn: "Naomi is both an instructor and Artbar's marketing director. She shapes the image of Artbar and finds or creates new trends to keep Artbar exciting! She is very friendly and will make your session lots of fun. Come try some of her new abstract sessions such as paint pour or alcohol inks, or learn detailed techniques with classic paintings together.",
    descJp: "インストラクターとマーケティングディレクターを兼務し、常にArtbarの新しいトレンドを発信しています。ポーリングアートやアルコールインクなどのモダンなスタイルから、古典的な名画のテクニックまで幅広く精通。親しみやすい人柄で、リラックスしたセッションを提供します。",
    languages: "English, Japanese"
  },
  {
    id: "luci",
    name: "Luci",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Luci brings a soft, dreamy style to his paintings that will make you feel like you're transported to a fantasyland of colorful sunsets and milky ways! He loves to encourage people to find their own style during his sessions, Luci's calming guidance will make you feel relaxed and creative. Come paint along with him sometime and unleash your creativity.",
    descJp: "ファンタジーの世界へ迷い込んだような、柔らかく色彩豊かなスタイルが特徴のアーティスト。ゲスト一人ひとりが独自のスタイルを見つけられるよう、穏やかな雰囲気の中で丁寧にガイドします。日常を忘れ、クリエイティビティを解放する時間をお楽しみください。",
    languages: "English, Japanese, Chinese"
  },
  {
    id: "momo",
    name: "Momo",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Momo is an awesome instructor and specializes in her original dot technique art style and abstract art! She is also very bright and knows a lot about different paint mediums, she offers extremely good advice about color theory! Come join her class sometime and get to learn about her unique style.",
    descJp: "国内外で活躍する現役アーティスト。独自のドットテクニックや抽象画を専門とし、色彩理論や画材に関する深い知識を持っています。プロフェッショナルな視点からのアドバイスで、あなたの作品作りをサポートします。",
    languages: "English, Japanese"
  },
  {
    id: "nanako",
    name: "Nanako",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Nanako's specialty is Japanese painting and acrylic painting. She is very helpful if you have questions about your painting process. She will happily give you great advice so you can feel confident in your masterpiece!",
    descJp: "日本画とアクリル画を中心に制作活動を行っています。「その瞬間の感情」を大切に、自由に表現することを重視したセッションです。繊細な色使いを得意とし、皆様が思いのままに個性を発揮できるよう技術面でもサポートします。",
    languages: "Japanese, English"
  },
  {
    id: "kiyoe",
    name: "Kiyoe",
    roleEn: "Pottery Specialist",
    roleJp: "陶芸スペシャリスト",
    descEn: "Kiyoe is a pottery specialist and makes her amazing art and designs from scratch such as plates, cups, pots, and many other works of art! Kiyoe has the sweetest and kindest soul - she teaches both kids and adults sessions so you'll never feel worried, always at ease.",
    descJp: "陶芸を専門とし、器やポットなど温かみのある作品を制作しています。とても穏やかな人柄で、大人のセッションからキッズセッションまで幅広く担当。土に触れて心を落ち着けたい方、リラックスしたい方におすすめです。",
    languages: "English, Japanese"
  },
  {
    id: "michi",
    name: "Michi Kim",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Michi creates lots of fun paintings for many of Artbar's kids sessions! Her bright and energetic atmosphere will be sure to make your kids smile while they create masterpieces to decorate the house with. Leave it to Michi Sensei to guide your kids in a fun way during their art class!",
    descJp: "Artbarのキッズセッションを中心に、多くの作品を生み出しています。明るくエネルギッシュなMichi先生は、子供たちの自由な発想と笑顔を引き出すのが得意です。お子様の初めてのアート体験は、ぜひMichiにお任せください。",
    languages: "English, Japanese, Korean"
  },
  {
    id: "mineko",
    name: "Mineko",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "A graduate of Bunka Fashion College, Mineko has worked for many years in apparel fashion and the accessories industry, and has published a recipe book for bead accessories she designed herself. Her accessories feature cheerful, colorful tones that also come through in her paintings. Mineko loves animals and fantasy worlds, and creates illustrations that feel like scenes from a storybook. In kids classes she supports everyone so you can enjoy painting together.",
    descJp: "文化服装学院卒。長年アパレルファッション業界、アクセサリーパーツ業界を経て自らデザインしたビーズアクセサリーのレシピ本も発売しています。アクセサリーは元気が出るようなカラフルな色が特徴で、それは絵にも表れています。Minekoは動物とファンタジーの世界感が大好きで、物語に登場するようなイラストを描きます。キッズクラスでは皆で楽しく描けるようサポートいたします！",
    languages: "Japanese, English"
  },
  {
    id: "sakura",
    name: "Sakura",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Graduate of University of Tsukuba, Art & Design Department, majoring in Japanese-style painting; Tokyo University of the Arts, Master of Art studies (Art Education, current). Sakura specializes in Japanese painting but is also a multi-style artist who creates 3D works using acrylic paints. Her experience living in Germany and riding horses at university encourage her to paint horses and other animals in a colorful, energetic way. She is looking for you to join her fantasy world and enjoy art!",
    descJp: "筑波大学芸術専門学群日本画領域卒業、東京藝術大学院美術研究科修士課程在籍中。Sakuraは日本画を専門としていますが、アクリル絵の具を使った立体表現も行うマルチスタイルアーティストです。ドイツに住んでいた経験や大学で馬術をしていたことから馬をはじめとした動物を表現するのが得意で、カラフルでエネルギッシュな色使いをします。アートを楽しみながらメルヘンの世界に飛び込んでくれる仲間をお待ちしています！",
    languages: "English, Japanese, German"
  },
  {
    id: "daria",
    name: "Daria",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Daria is an Italian artist who studied painting in Florence. She is an illustrator with a oneiric style and likes to experiment with different materials and techniques. She believes art is a powerful tool to self-reflect and be yourself, but also to connect with others. During her classes she will passionately encourage you to express your creativity without limits, feeling free from all inhibitions and worries!",
    descJp: "Leon Battista Alberti（フィレンツェ）、International School of Illustration Štěpán Zavřel（サルメーデ）、Ca' Foscari University（ヴェネツィア）などで学んだイタリア人アーティスト。オネアリスティックなスタイルのイラストレーターで、さまざまな素材や技法を試すのが好き。アートは自分を見つめ直し、自分らしくいるための強力なツールであると同時に、他者とつながるためのツールでもあると信じている。彼女のクラスでは、すべての抑制や心配から解放され、制限なく創造性を表現できるよう、情熱的に励まします！",
    languages: "English, Japanese, Italian"
  },
  {
    id: "diamanteyuko",
    name: "Diamante Yuko",
    roleEn: "Candle artist",
    roleJp: "キャンドルアーティスト",
    descEn: "Yuko is a candle artist and will gently teach you how to make your own aroma and art candles during our Craft Morning workshops!",
    descJp: "クラフトモーニングのワークショップでは、キャンドルアーティストであるユウコさんが、アロマキャンドルやアートキャンドルの作り方を優しく教えてくれます！",
    languages: "Japanese, English"
  },
  {
    id: "rie",
    name: "Rie",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Rie specializes in alcohol ink art and resin art. She also organizes workshops that give people a chance of self-reflection through art. Rie's bright personality and passion for supporting students to express themselves through art will guide you to create your own masterpiece!",
    descJp: "Rieはアルコールインクアートとレジンアートを専門とする先生です。彼女は普段、アートと心理学を組み合わせて、アートを通じた自己対話や自分発見のワークショップも開催しています！Artbarでは、持ち前の明るさと丁寧なフォローで、楽しみながらみなさんが表現したいアートを一緒に叶えてくれます！是非、彼女のセッションに参加してオリジナルアートを作りましょう！",
    languages: "English, Japanese"
  },
  {
    id: "ken",
    name: "Ken Tanaka",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Ken specializes in his signature pen drawings that are so detailed and whimsical. Ken is knowledgeable not only about art but about many very interesting subjects, which makes it so much fun to chat together! Come feel inspired with Ken, you will learn about art and much more.",
    descJp: "Kenの得意とするペンを使ったドローイングを教えてくれます。アートだけではなくあらゆる事に精通しているのでお話をしているだけでもとっても楽しい先生です。Kenのセッションに参加して新しいアートの技法を学びましょう！",
    languages: "English, Japanese"
  },
  {
    id: "naoko",
    name: "Naoko",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Naoko hopes you can enjoy expressing yourself freely through your work. She also hopes that after experiencing making art, you will feel interested in visiting museums and exploring art further.",
    descJp: "武蔵野美術大学短期大学部卒業。Naoko先生は生徒の皆さんに作品を通して自由に表現する事を楽しんでいただける時間にしたいと考えています。アートを体験する事をきっかけに美術館に行くことや、芸術に興味を持ってもらえたら嬉しいです。",
    languages: "Japanese, English"
  },
  {
    id: "helen",
    name: "Helen",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Helen is a very calm and caring instructor who will gently guide you through the session so you can have a relaxing time.",
    descJp: "Helenはとても穏やかで思いやりのあるインストラクターで、皆様がリラックスした時間を過ごせるよう、優しく指導してくれます。",
    languages: "English, Japanese, Thai"
  },
  {
    id: "yuka",
    name: "Yuka",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Yuka is a very kind teacher and will guide the class gently - the students can feel relaxed and free to express themselves through their art. Yuka specializes in children's book illustrations and her colorful artwork is absolutely lovely!",
    descJp: "日本児童教育専門学校 絵本童話科 卒業。Yukaはとても親切な先生で、クラスを優しく指導してくれます。生徒さんはリラックスして、自由にアートを通して自分を表現することができます。Yukaは児童書のイラストを専門としており、彼女のカラフルなアートワークはとても素敵です。",
    languages: "English, Japanese"
  },
  {
    id: "jenna",
    name: "Jenna",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Jenna specializes in crafting colorful and relaxing pieces inspired by the beauty of nature. Her goal is to make everyone feel calm, happy, and inspired during their time in class. Whether you're seeking a peaceful escape or simply looking to explore your creativity, Jenna's classes provide the perfect opportunity to unwind and reconnect with nature through art. Come join us and experience the joy of painting with Jenna!",
    descJp: "University of Hamburg、学習院女子大学。ジェナは、自然の美しさにインスパイアされた、カラフルでリラックスできる作品を作るのが専門。彼女のゴールは、クラスで過ごしている間、誰もが穏やかで幸せな気持ちになり、インスピレーションを得られるようにすること。穏やかなひとときを過ごしたい方にも、自分の創造性を探求したい方にも、ジェナのクラスは、アートを通してくつろぎ、自然とのつながりを取り戻す絶好の機会を提供します。ジェナと一緒に絵を描く楽しさを体験してみませんか？",
    languages: "English, Japanese, German"
  },
  {
    id: "akiko",
    name: "Akiko",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Graduate of Musashino Art University, Department of Japanese Painting. Akiko is good at creating colorful and exciting pieces. She has been involved in various illustrations. Akiko also loves copying and understands the importance of learning from copying. Whether you've never had much experience with art or just love art, join Akiko in her class and have fun creating art with someone who is always calm and natural.",
    descJp: "武蔵野美術大学 日本画学科卒業。Akikoはカラフルでワクワクする作品を作るのが得意です。今まで様々なイラストを担ってきました。Akikoはまた模写をする事が大好きで、模写から学ぶ事の大切さも心得ています。いつも穏やかで自然体のAkikoと一緒に、アートに今まであまり触れてこなかった人も、アートが大好きという方もAkikoのクラスで一緒に楽しく作品作りを体験してみませんか？",
    languages: "English, Japanese"
  },
  {
    id: "minako",
    name: "Minako",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "MA in Illustration at Kingston University, London; BA in Visual Communication Design at Musashino Art University. Minako has worked as a package designer, graphic designer, illustrator, and jewelry maker. She is now a printmaker and art educator, active in Japan, the UK, Slovenia, and Italy. Join her unique art style classes and enjoy expressing yourself. Especially for kids, Minako's classes are full of fun and creativity, as she loves working with children!",
    descJp: "キングストン大学院修士課程イラストレーション科卒業、武蔵野美術大学視覚伝達デザイン学科卒業。ミナコは、パッケージデザイナー、グラフィックデザイナー、イラストレーター、ジュエリーメーカーとして活躍した後、現在は日本、イギリス、スロベニア、イタリアで版画家兼アートエデュケーターとして活動しています。彼女のユニークなアートスタイルのクラスに参加し、自己表現を楽しんでください。特に子供が大好きなミナコのキッズクラスは、楽しさ満載です！",
    languages: "English, Japanese"
  },
  {
    id: "akko",
    name: "Akko",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Education: Media and Communication at London School of Economics and Political Science (LSE), 2021; Woodworking Traditional Arts Super College of Kyoto, 2025. Akko creates work with acrylic paints, often featuring animals and original patterns in the background to express her inner self. She loves the freedom that painting offers and does her best to make the class fun and relaxing.",
    descJp: "2021年 LSE メディア・コミュニケーション、2025年 京都伝統木工芸スーパー専門学校。アクリル絵の具を使って作品を制作しています。モチーフには動物を取り入れることが多く、背景にはオリジナルの模様を描くことで、自分自身を表現しています。絵を描くことの自由さがとても好きで、クラスでは楽しく、リラックスできる雰囲気づくりを心がけています。",
    languages: "English, Japanese"
  },
  {
    id: "glicinapeony",
    name: "Glicina Peony",
    roleEn: "Craft partner",
    roleJp: "クラフトパートナー",
    descEn: "Glicina Peony is a craft partner that specializes in dried flower arrangements and wreaths.",
    descJp: "グリシーナ・ピオニーは、ドライフラワーのアレンジメントやリースを専門に扱うクラフトパートナーです。",
    languages: "Japanese, English"
  }
];

export const INSTRUCTORS: Instructor[] = INSTRUCTOR_ROWS.map(attachInstructorPhotos);

/** Short area names for footer / capacity grids (`row[lang]`). Distinct from full `LOCATIONS` entries. */
export const LOCATION_SHORT_LABELS = [
  { en: 'Daikanyama', jp: '代官山' },
  { en: 'Cat Street Harajuku', jp: '原宿キャットストリート' },
  { en: 'Ginza', jp: '銀座' },
  { en: 'Yokohama Motomachi', jp: '横浜元町' },
  { en: 'Osaka', jp: '大阪' },
  { en: 'Okinawa', jp: '沖縄' },
] as const;

export const OFFSITE_LABEL = { en: 'Offsite', jp: '出張' } as const;

/** Team building logistics column — studio rows + offsite. */
export const TEAM_BUILDING_LOGISTICS_ROWS: {
  name: { en: string; jp: string };
  cap: { en: string; jp: string };
}[] = [
  { name: { en: 'Artbar Ginza', jp: 'Artbar 銀座' }, cap: { en: 'Max 30', jp: '最大30名' } },
  {
    name: { en: 'Artbar Cat Street Harajuku', jp: 'Artbar キャットストリート原宿' },
    cap: { en: 'Max 20', jp: '最大20名' },
  },
  { name: { en: 'Artbar Yokohama', jp: 'Artbar 横浜' }, cap: { en: 'Max 40', jp: '最大40名' } },
  {
    name: { en: 'Your Office / Offsite', jp: '貴社オフィス／出張' },
    cap: { en: '15 - 100+ Guests', jp: '15〜100名以上' },
  },
];

/** Private parties capacity grid — matches marketing short names + offsite. */
export const PRIVATE_PARTY_CAPACITY_ROWS: {
  name: { en: string; jp: string };
  cap: string;
  desc: { en: string; jp: string };
  highlight?: boolean;
}[] = [
  {
    name: { en: 'Daikanyama', jp: '代官山' },
    cap: '12',
    desc: { en: 'Cozy & Intimate', jp: 'あたたかみのある空間' },
  },
  {
    name: { en: 'Harajuku', jp: '原宿' },
    cap: '20',
    desc: { en: 'Cat Street View', jp: 'キャットストリート沿い' },
  },
  {
    name: { en: 'Ginza', jp: '銀座' },
    cap: '30',
    desc: { en: 'Elegant Studio', jp: 'エレガントなスタジオ' },
  },
  {
    name: { en: 'Yokohama', jp: '横浜' },
    cap: '40',
    desc: { en: 'Spacious & Bright', jp: '広く明るい空間' },
  },
  {
    name: { en: 'Offsite', jp: '出張' },
    cap: '100+',
    desc: { en: 'We come to you', jp: 'ご指定の会場へ' },
    highlight: true,
  },
];

export const LOCATIONS: Location[] = [
  {
    id: "daikanyama",
    nameEn: "Artbar Daikanyama",
    nameJp: "Artbar 代官山",
    addressEn: "7-2 Daikanyamachō, Shibuya, Tōkyō 150-0034. Belleview Daikanyama Bld 1fl.",
    addressJp: "〒150-0034 東京都渋谷区代官山町 7-2 ベルビュー代官山 1階",
    accessEn: "5-minute walk from Daikanyama Station | 8-minute walk from Ebisu Station",
    accessJp: "代官山駅 徒歩5分 | 恵比寿駅 徒歩8分",
    image: GI.locations.daikanyama
  },
  {
    id: "harajuku",
    nameEn: "Artbar Cat Street Harajuku",
    nameJp: "Artbar キャットストリート原宿",
    addressEn: "5-30-2 Jingumae, Shibuya-ku, Tokyo – 201 Takara Building 150-0001. 201 Takara Building.",
    addressJp: "〒150-0001 東京都渋谷区神宮前5-30-2 Takaraビル 201",
    accessEn: "7-minute walk from Shibuya Station",
    accessJp: "渋谷駅 徒歩7分 | 明治神宮前駅 徒歩5分",
    image: GI.locations.harajuku
  },
  {
    id: "ginza",
    nameEn: "Artbar Ginza",
    nameJp: "Artbar 銀座",
    addressEn: "Ginza, Chuo-ku, 3-3-12 3rd Floor Ginza Building.",
    addressJp: "〒104-0061 東京都中央区銀座3-3-12 銀座ビル3階",
    accessEn: "1-minute walk from Ginza Station Exit C8 of Metro Marunouchi, Hibiya and Ginza Line.\n4-minute walk from Ginza-itchome Station Exit 4 of Metro Yurakucho Line.\n5-minute walk from Yurakucho Station Exit D8 of Metro Yurakucho Line.",
    accessJp: "銀座駅 C8出口 徒歩1分\n銀座一丁目駅 4番出口 徒歩4分\n有楽町駅 D8出口 徒歩5分",
    image: GI.locations.ginza
  },
  {
    id: "yokohama",
    nameEn: "Artbar Yokohama Motomachi",
    nameJp: "Artbar 横浜元町",
    addressEn: "231-0861 Kanagawa-ken, Yokohama-shi, Naka-ku Motomachi 1-27-2 Enscent Yokohama Motomachi Bld 2nd floor.",
    addressJp: "〒231-0861 神奈川県横浜市中区元町1-27-2 エンセント横濱元町ビル 2F",
    accessEn: "Motomachi-Chukagai station – 3 min walk\nIshikawacho station – 10 min walk",
    accessJp: "みなとみらい線 元町・中華街駅 徒歩3分\nJR石川町駅 徒歩10分",
    image: GI.locations.yokohama
  },
  {
    id: "osaka_namba",
    nameEn: "Artbar Osaka Namba SkyO",
    nameJp: "Artbar 大阪 なんばスカイオ",
    addressEn: "Namba SkyO 17F, 5-1-60 Namba, Chuo-ku, Osaka-shi, Osaka 542-0076",
    addressJp: "〒542-0076 大阪府大阪市中央区難波5-1-60 なんばスカイオ 17F",
    accessEn: "Please change to the low-floor elevator on the 10th floor common area and go up to the 17th floor. The studio is at the end of the corridor on your left.",
    accessJp: "10階で低層階用エレベーターに乗り換え、17階へお上がりください。スタジオは廊下突き当たり左手です。",
    image: GI.locations.osaka_namba
  },
  {
    id: "osaka_caso",
    nameEn: "Artbar Osaka CASO",
    nameJp: "Artbar 大阪 CASO",
    addressEn: "Seaside Studio CASO, 2-7-23 Kaigan-dori, Minato-ku, Osaka-shi, Osaka 552-0022",
    addressJp: "〒552-0022 大阪府大阪市港区海岸通2-7-23 シーサイドスタジオCASO",
    accessEn: "Seaside Studio CASO",
    accessJp: "シーサイドスタジオCASO内",
    image: GI.locations.osaka_caso
  },
  {
    id: "osaka_umeda",
    nameEn: "Artbar Osaka Umeda",
    nameJp: "Artbar 大阪梅田",
    addressEn: "Grand Green Osaka Shops & Restaurants North Bldg 2F, 6-38 Ofukacho, Kita-ku, Osaka-shi",
    addressJp: "大阪府大阪市北区大深町6-38 グラングリーン大阪 ショップ＆レストラン 北館 2F",
    accessEn: "Inside Tully's Coffee / Yurindo",
    accessJp: "タリーズコーヒー / 有隣堂 併設",
    image: GI.locations.osaka_umeda
  },
  {
    id: "osaka_hirakata",
    nameEn: "Artbar Lab Hirakata",
    nameJp: "Artbar Lab 枚方",
    addressEn: "Hirakata Mall 2F, 1-9-1, Hirakata-shi, Osaka 573-0032",
    addressJp: "〒573-0032 大阪府枚方市1-9-1 枚方モール 2F",
    accessEn: "Inside TULLY'S COFFEE",
    accessJp: "タリーズコーヒー併設",
    image: GI.locations.osaka_hirakata
  },
  {
    id: "okinawa",
    nameEn: "Artbar Okinawa (Franchise)",
    nameJp: "Artbar 沖縄 (フランチャイズ)",
    addressEn: "137-3 Yamazato, Chinen, Nanjo City, Okinawa 901-1515. MSY Building 3F",
    addressJp: "〒901-1515 沖縄県南城市知念字山里137-3 MSYビル3F",
    accessEn: "Tel: 050-1808-2882",
    accessJp: "Tel: 050-1808-2882",
    image: GI.locations.okinawa
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Very fun and relaxing! It completely took my mind off my extremely busy days in Tokyo. Ami, our instructor, was easy to follow, and when I needed help she was right there for me. So much better than the usual Thursday night options!",
    author: "Ryan Stephen Alldridge",
    userImage: GI.testimonials.ryan
  },
  {
    text: "ワインを飲みながらリラックスして、ほろ酔いでキャンバスに描くってこんなに気持ちいんだぁという発見が新鮮でした。何回でも参加したいです。",
    author: "Ritsuko Milliner",
    userImage: GI.testimonials.ritsuko
  },
  {
    text: "At this friendly art studio, the wine is just liquid motivation to let your creative juice flow. You don’t need to be an artist to get stuck in!",
    author: "TimeOut Tokyo",
    role: "Media"
  }
];

export const TEAM_BUILDING_TESTIMONIALS: Testimonial[] = [
  {
    text: "楽しく進めることができました。 スタッフのみなさまが明るく、 的確にガイドしてくださり、絵が苦手と言っていたメンバーもとても楽しんでいました。 業務上はやりとりの少ない同僚ともセッションを通して交流でき、チームの一体感が増したように思います。またチームで力を合わせることで新しいアイデアが生まれたり、より大きな成果に繋がることを実感できた有意義な時間となりました。",
    author: "Amazon Web Services"
  },
  {
    text: "Cathy and her team hosted a wonderful Women’s Wine & Paint night for us at our offices. The event was fantastic for team-building and most of my colleagues who attended (myself included) now proudly have their paintings displayed on their office wall. I highly recommend Cathy and her team if you’re looking for a fun, interesting and collaborative company event.",
    author: "Morrison & Foerster"
  },
  {
    text: "It was really nice to take time out of normal office work/routine. When we painted our own paintings it was really therapeutic and relaxing -it gave me a new energy and motivation to continue with my work for the rest of the week. Doing some activities like this is every once in a while is great for work motivation!",
    author: "Sports Travel & Hospitality Japan"
  },
  {
    text: "The staff was super welcoming and helpful. I felt that everyone was able to bring out their inner artist.",
    author: "Amazon Web Services"
  },
  {
    text: "It was great to learn more about my colleagues in a relaxed environment – don’t have those opportunities in the office.",
    author: "Sports Travel & Hospitality Japan"
  },
  {
    text: "A team work on Art was a very new exercise for me. Very interesting and insightful. Enjoyable with our colleagues and yet appreciate the quality time and even learn a lot about each other through drawings and conversations.",
    author: "Sports Travel & Hospitality Japan"
  },
  {
    text: "We had a blast! The activity itself was very fun and the team had a great time working together, producing a lot of creative ideas. Highly recommended!",
    author: "Go! Go! Nihon"
  }
];

export const MEDIA_LIST: MediaItem[] = [
  { 
    outlet: "Hot Pepper Beauty", 
    date: "2022.09", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2022-09-hot-pepper-beauty/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2022-09-hot-pepper-beauty/main.png"
  },
  { 
    outlet: "SPRiNG Magazine", 
    date: "2022.06", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2022-06-spring-magazine/logo.jpg",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2022-06-spring-magazine/main.png"
  },
  { 
    outlet: "ぶらり途中下車の旅", 
    date: "2022.05", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2022-05-%E3%81%B5%E3%82%99%E3%82%89%E3%82%8A%E9%80%94%E4%B8%AD%E4%B8%8B%E8%BB%8A%E3%81%AE%E6%97%85/logo.jpg",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2022-05-%E3%81%B5%E3%82%99%E3%82%89%E3%82%8A%E9%80%94%E4%B8%AD%E4%B8%8B%E8%BB%8A%E3%81%AE%E6%97%85/logo.jpg"
  },
  { 
    outlet: "J-Wave Radio", 
    date: "2022.01", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2022-01-j-wave-radio/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2022-01-j-wave-radio/main.jpg"
  },
  { 
    outlet: "Fuji TV", 
    date: "2021.06", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2021-06-fuji-tv/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2021-06-fuji-tv/bg.jpg"
  },
  { 
    outlet: "Vogue Japan", 
    date: "2020.11", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2020-11-vogue-japan/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2020-11-vogue-japan/main.jpg"
  },
  { 
    outlet: "Ginger", 
    date: "2020.11", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2020-11-ginger/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2020-11-ginger/main.jpg"
  },
  { 
    outlet: "Tokyo MX", 
    date: "2020.08", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2020-08-tokyo-mx/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2020-08-tokyo-mx/main.png"
  },
  { 
    outlet: "Aera Magazine", 
    date: "2020.02", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2020-02-aera-magazine/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2020-02-aera-magazine/main.png"
  },
  { 
    outlet: "Timeout Tokyo", 
    date: "2019.10", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-10-timeout-tokyo/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-10-timeout-tokyo/main.png"
  },
  { 
    outlet: "The Japan Times", 
    date: "2019.10", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-10-the-japan-times/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-10-the-japan-times/main.jpg"
  },
  { 
    outlet: "BuzzFeed Japan", 
    date: "2019.09", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-09-buzzfeed-japan/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-09-buzzfeed-japan/main.png"
  },
  { 
    outlet: "Tokyo Calendar", 
    date: "2019.08", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-08-tokyo-calendar/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-08-tokyo-calendar/main.png"
  },
  { 
    outlet: "Harumari Tokyo", 
    date: "2019.08", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-08-harumari-tokyo/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-08-harumari-tokyo/main.png"
  },
  { 
    outlet: "2nd Magazine", 
    date: "2019.05", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-05-2nd-magazine/logo.jpg",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2019-05-2nd-magazine/main.jpg"
  },
  { 
    outlet: "Hanako Magazine", 
    date: "2018.07", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2018-07-hanako-magazine/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2018-07-hanako-magazine/main.jpg"
  },
  { 
    outlet: "Tokyo Weekender", 
    date: "2016.03", 
    logo: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2016-03-tokyo-weekender/logo.png",
    image: "https://artbar.co.jp/wp-content/themes/artbar/assets/pr-images/2016-03-tokyo-weekender/2016-main.jpg"
  },
];

export const FAQS = [
  {
    question: "When is the schedule for new sessions going to be published on the website?",
    answer: "The next month's schedule will be published from the middle to the end of the month prior. Please check the website regularly and we recommend you check in advance to book your desired sessions."
  },
  {
    question: "Is there a waiting list for cancellations of sold out sessions?",
    answer: "Artbar does not have a waiting list system. If a session that was once sold out no longer has the “Sold Out” alert on the event, a cancellation has occurred and the session has availability. Please check the number of tickets left near event details booking button."
  },
  {
    question: "Can you squeeze in an extra person for a sold out session?",
    answer: "If the session you are booking will be held in Cat Street Harajuku, Ginza, or Yokohama, we may be able to add a slot for you. Please contact us via this online contact form and we can check availability. Due to the size of the studio cannot add slots for sessions held in Daikanyama and Ueno."
  },
  {
    question: "Can I bring my child to an adult session?",
    answer: "We do not allow children to attend the adult sessions as there is free-flow alcohol being served and it is a social setting for adults. Kids can join our weekend art sessions or arrange a private art party with us. Please check our new ageless studio designed for kids and families called Artbar Lab, located in Ueno's Marui Bld. !"
  },
  {
    question: "Can a child under 5 years old join the kids session?",
    answer: "It's no problem for children who are most turning 5 to join the kids session. Children 4 years old and younger will not be able to join the kids sessions. Please check our new ageless studio designed for kids and families called Artbar Lab, located in Ueno's Marui Bld. !"
  },
  {
    question: "Paint Points QR Code: I received the notification on my phone to retrieve my coupon code. How do I get my coupon code?",
    answer: "Congratulations! Please take a screenshot of the coupon eligibility notification you received on your smart phone and send it to our email tokyo@artbar.co.jp. We will confirm your attendance and send you a coupon code which you can use during checkout when you book your next session. Please note the coupon code can only be used towards our standard painting sessions (5,000 yen for adult sessions, 3,500 yen for kids session) and not towards craft sessions, special collaboration events, paint pour sessions, large canvas sessions or any other sessions that have a price other than our standard session."
  },
  {
    question: "I forgot to scan my points but am eligible for the coupon.",
    answer: "Unfortunately we are not responsible for when the QR code is not scanned during your time at the studio. We are not able to track each person's record and do not have the ability to reset / subtract / add points on your phone for when you scan the next time. Thank you for your understanding and please don’t forget to scan next time!"
  },
  {
    question: "Can I sit in and watch without participating during a session? Can I sit in and watch during my kid's session?",
    answer: "For adult sessions, only participants with purchased tickets can attend the session. For kids sessions, the sessions are for kids only, there are many nearby cafes and restaurants near our where studio you can relax!"
  },
  {
    question: "How can I cancel my session?",
    answer: "For most classes, you may cancel up to 24 hours prior to the scheduled session start time. Cancellations after that time will not be accepted. You can cancel yourself using the contact form below. Please choose between a refund (500 yen refund fee will be charged) or transfer to another session. Please note that there are a few non-refundable classes due to the preparations of materials. They are indicated in the event description. Gift certificates are also non-refundable and not exchangeable for cash."
  }
];