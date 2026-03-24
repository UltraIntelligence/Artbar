import { Instructor, Location, Testimonial, MediaItem } from './types';

// Helper for the new placeholder format
const getPh = (w: number, h: number) => `https://www.toolandtea.com/placeholder.svg?height=${h}&width=${w}`;

export const SITE_IMAGES = {
  hero: {
    home: getPh(1920, 1080),
    teamBuilding: getPh(1920, 1080),
    video: "/media/artbar-home-video-desktop.mp4",
    videoMobile: "/media/artbar-home-video-mobile-3.mp4"
  },
  concept: {
    main: getPh(1200, 800),
    detail: getPh(800, 800)
  },
  features: {
    drink: getPh(800, 600),
    guide: getPh(800, 600),
    bilingual: getPh(800, 600)
  },
  privateParties: {
    wine: getPh(800, 600),
    materials: getPh(800, 600),
    instruction: getPh(800, 600),
  }
};

export const POPULAR_THEMES = [
  { title: "Japan Inspired", desc: "Sakura, Mount Fuji & traditional motifs", image: getPh(800, 800) },
  { title: "Paint Pouring", desc: "Fluid art & mesmerizing cells", image: getPh(800, 800) },
  { title: "Paint Your Pet", desc: "Immortalize your furry friend", image: getPh(800, 800) },
  { title: "Alcohol Ink", desc: "Ethereal & dreamy abstract art", image: getPh(800, 800) },
  { title: "Van Gogh", desc: "Starry nights & sunflower fields", image: getPh(800, 800) },
  { title: "Monet", desc: "Impressionist gardens & water lilies", image: getPh(800, 800) },
  { title: "Picasso", desc: "Cubist portraits & bold expressions", image: getPh(800, 800) },
  { title: "Renoir", desc: "Soft light & romantic scenes", image: getPh(800, 800) },
  { title: "Matisse", desc: "Vibrant colors & expressive forms", image: getPh(800, 800) },
  { title: "Kids!", desc: "Fun & simple designs for young artists", image: getPh(800, 800) },
  { title: "Texture Painting", desc: "Sculptural & dimensional art", image: getPh(800, 800) },
  { title: "Paint Your Idol", desc: "Celebrate your favorite icon", image: getPh(800, 800) },
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: "cathy",
    name: "Cathy Thompson",
    roleEn: "CEO Artbar Tokyo",
    roleJp: "Artbar Tokyo CEO",
    descEn: "Cathy is Artbar Tokyo's CEO - the driving force behind Artbar! She strives to make it a fun and relaxing space for people to express their creative self and spark their love for art. Although most of her work is behind the scenes, she is often in the studio and looks forward to meeting you at any of our sessions.",
    descJp: "Artbar Tokyoの創設者兼CEO。Artbarが単なる絵画教室ではなく、誰もがクリエイティビティを解放できる「大人のサードプレイス」であり続けるよう情熱を注いでいます。スタジオ運営の指揮を執りながら、ゲストの皆様とアートを通じた時間を共有することを楽しみにしています。",
    languages: "English, Japanese",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  },
  {
    id: "naomi",
    name: "Naomi",
    roleEn: "Marketing Director",
    roleJp: "マーケティング・ディレクター",
    descEn: "Naomi is both an instructor and Artbar’s marketing director. She shapes the image of Artbar and finds or creates new trends to keep Artbar exciting! She is very friendly and will make your session lots of fun. Come try some of her new abstract sessions such as paint pour or alcohol inks, or learn detailed techniques with classic paintings together.",
    descJp: "インストラクターとマーケティングディレクターを兼務し、常にArtbarの新しいトレンドを発信しています。ポーリングアートやアルコールインクなどのモダンなスタイルから、古典的な名画のテクニックまで幅広く精通。親しみやすい人柄で、リラックスしたセッションを提供します。",
    languages: "English, Japanese",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  },
  {
    id: "luci",
    name: "Luci",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Luci brings a soft, dreamy style to his paintings that will make you feel like you’re transported to a fantasyland of colorful sunsets and milky ways! He loves to encourage people to find their own style during his sessions, Luci’s calming guidance will make you feel relaxed and creative. Come paint along with him sometime and unleash your creativity.",
    descJp: "ファンタジーの世界へ迷い込んだような、柔らかく色彩豊かなスタイルが特徴のアーティスト。ゲスト一人ひとりが独自のスタイルを見つけられるよう、穏やかな雰囲気の中で丁寧にガイドします。日常を忘れ、クリエイティビティを解放する時間をお楽しみください。",
    languages: "English, Japanese, Chinese",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  },
  {
    id: "momo",
    name: "Momo",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Momo is an awesome instructor and specializes in her original dot technique art style and abstract art! She is also very bright and knows a lot about different paint mediums, she offers extremely good advice about color theory! Come join her class sometime and get to learn about her unique style.",
    descJp: "国内外で活躍する現役アーティスト。独自のドットテクニックや抽象画を専門とし、色彩理論や画材に関する深い知識を持っています。プロフェッショナルな視点からのアドバイスで、あなたの作品作りをサポートします。",
    languages: "English, Japanese",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  },
  {
    id: "nanako",
    name: "Nanako",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Nanako's specialty is Japanese painting and acrylic painting. She is very helpful if you have questions about your painting process. She will happily give you great advice so you can feel confident in your masterpiece!",
    descJp: "日本画とアクリル画を中心に制作活動を行っています。「その瞬間の感情」を大切に、自由に表現することを重視したセッションです。繊細な色使いを得意とし、皆様が思いのままに個性を発揮できるよう技術面でもサポートします。",
    languages: "Japanese, English",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  },
  {
    id: "aika",
    name: "Aika",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Aika's style is very soft and colorful with inspiration taken from natural elements. She makes large tapestry paintings! Aika is very sweet, you will be sure to feel relaxed by her calming atmosphere.",
    descJp: "自然の要素からインスピレーションを得た、ソフトでカラフルな作風が特徴。普段は大型のタペストリー作品も制作しています。Aikaの穏やかで優しい雰囲気の中で、リラックスしたアートの時間をお過ごしください。",
    languages: "Japanese, English",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  },
  {
    id: "kiyoe",
    name: "Kiyoe",
    roleEn: "Pottery Specialist",
    roleJp: "陶芸スペシャリスト",
    descEn: "Kiyoe is a pottery specialist and makes her amazing art and designs from scratch such as plates, cups, pots, and many other works of art! Kiyoe has the sweetest and kindest soul - she teaches both kids and adults sessions so you’ll never feel worried, always at ease.",
    descJp: "陶芸を専門とし、器やポットなど温かみのある作品を制作しています。とても穏やかな人柄で、大人のセッションからキッズセッションまで幅広く担当。土に触れて心を落ち着けたい方、リラックスしたい方におすすめです。",
    languages: "English, Japanese",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  },
  {
    id: "michi",
    name: "Michi Kim",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Michi creates lots of fun paintings for many of Artbar’s kids sessions! Her bright and energetic atmosphere will be sure to make your kids smile while they create masterpieces to decorated the house with. Leave it to Michi Sensei to guide your kids in a fun way during their art class!",
    descJp: "Artbarのキッズセッションを中心に、多くの作品を生み出しています。明るくエネルギッシュなMichi先生は、子供たちの自由な発想と笑顔を引き出すのが得意です。お子様の初めてのアート体験は、ぜひMichiにお任せください。",
    languages: "English, Japanese, Korean",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  },
  {
    id: "ken",
    name: "Ken Tanaka",
    roleEn: "Instructor",
    roleJp: "インストラクター",
    descEn: "Ken specializes in his signature pen drawings that are so detailed and whimsical. Ken is knowledgeable not only art but about many very interesting subjects, which makes it so much fun to chat together! Come feel inspired with Ken, you will learn about art and much more.",
    descJp: "緻密で遊び心のあるペン画を得意とするKen。アートだけでなく幅広い分野に精通しており、会話も弾む楽しいセッションが魅力です。新しい技法を学びながら、インスピレーション溢れる時間を共有しましょう。",
    languages: "English, Japanese",
    profileImage: getPh(400, 400),
    artworkImage: getPh(800, 600)
  }
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
    image: getPh(1200, 800)
  },
  {
    id: "harajuku",
    nameEn: "Artbar Cat Street Harajuku",
    nameJp: "Artbar キャットストリート原宿",
    addressEn: "5-30-2 Jingumae, Shibuya-ku, Tokyo – 201 Takara Building 150-0001. 201 Takara Building.",
    addressJp: "〒150-0001 東京都渋谷区神宮前5-30-2 Takaraビル 201",
    accessEn: "7-minute walk from Shibuya Station",
    accessJp: "渋谷駅 徒歩7分 | 明治神宮前駅 徒歩5分",
    image: getPh(1200, 800)
  },
  {
    id: "ginza",
    nameEn: "Artbar Ginza",
    nameJp: "Artbar 銀座",
    addressEn: "Ginza, Chuo-ku, 3-3-12 3rd Floor Ginza Building.",
    addressJp: "〒104-0061 東京都中央区銀座3-3-12 銀座ビル3階",
    accessEn: "1-minute walk from Ginza Station Exit C8 of Metro Marunouchi, Hibiya and Ginza Line.\n4-minute walk from Ginza-itchome Station Exit 4 of Metro Yurakucho Line.\n5-minute walk from Yurakucho Station Exit D8 of Metro Yurakucho Line.",
    accessJp: "銀座駅 C8出口 徒歩1分\n銀座一丁目駅 4番出口 徒歩4分\n有楽町駅 D8出口 徒歩5分",
    image: getPh(1200, 800)
  },
  {
    id: "yokohama",
    nameEn: "Artbar Yokohama Motomachi",
    nameJp: "Artbar 横浜元町",
    addressEn: "231-0861 Kanagawa-ken, Yokohama-shi, Naka-ku Motomachi 1-27-2 Enscent Yokohama Motomachi Bld 2nd floor.",
    addressJp: "〒231-0861 神奈川県横浜市中区元町1-27-2 エンセント横濱元町ビル 2F",
    accessEn: "Motomachi-Chukagai station – 3 min walk\nIshikawacho station – 10 min walk",
    accessJp: "みなとみらい線 元町・中華街駅 徒歩3分\nJR石川町駅 徒歩10分",
    image: getPh(1200, 800)
  },
  {
    id: "osaka_namba",
    nameEn: "Artbar Osaka Namba SkyO",
    nameJp: "Artbar 大阪 なんばスカイオ",
    addressEn: "Namba SkyO 17F, 5-1-60 Namba, Chuo-ku, Osaka-shi, Osaka 542-0076",
    addressJp: "〒542-0076 大阪府大阪市中央区難波5-1-60 なんばスカイオ 17F",
    accessEn: "Please change to the low-floor elevator on the 10th floor common area and go up to the 17th floor. The studio is at the end of the corridor on your left.",
    accessJp: "10階で低層階用エレベーターに乗り換え、17階へお上がりください。スタジオは廊下突き当たり左手です。",
    image: getPh(1200, 800)
  },
  {
    id: "osaka_caso",
    nameEn: "Artbar Osaka CASO",
    nameJp: "Artbar 大阪 CASO",
    addressEn: "Seaside Studio CASO, 2-7-23 Kaigan-dori, Minato-ku, Osaka-shi, Osaka 552-0022",
    addressJp: "〒552-0022 大阪府大阪市港区海岸通2-7-23 シーサイドスタジオCASO",
    accessEn: "Seaside Studio CASO",
    accessJp: "シーサイドスタジオCASO内",
    image: getPh(1200, 800)
  },
  {
    id: "osaka_umeda",
    nameEn: "Artbar Osaka Umeda",
    nameJp: "Artbar 大阪梅田",
    addressEn: "Grand Green Osaka Shops & Restaurants North Bldg 2F, 6-38 Ofukacho, Kita-ku, Osaka-shi",
    addressJp: "大阪府大阪市北区大深町6-38 グラングリーン大阪 ショップ＆レストラン 北館 2F",
    accessEn: "Inside Tully's Coffee / Yurindo",
    accessJp: "タリーズコーヒー / 有隣堂 併設",
    image: getPh(1200, 800)
  },
  {
    id: "osaka_hirakata",
    nameEn: "Artbar Lab Hirakata",
    nameJp: "Artbar Lab 枚方",
    addressEn: "Hirakata Mall 2F, 1-9-1, Hirakata-shi, Osaka 573-0032",
    addressJp: "〒573-0032 大阪府枚方市1-9-1 枚方モール 2F",
    accessEn: "Inside TULLY'S COFFEE",
    accessJp: "タリーズコーヒー併設",
    image: getPh(1200, 800)
  },
  {
    id: "okinawa",
    nameEn: "Artbar Okinawa (Franchise)",
    nameJp: "Artbar 沖縄 (フランチャイズ)",
    addressEn: "137-3 Yamazato, Chinen, Nanjo City, Okinawa 901-1515. MSY Building 3F",
    addressJp: "〒901-1515 沖縄県南城市知念字山里137-3 MSYビル3F",
    accessEn: "Tel: 050-1808-2882",
    accessJp: "Tel: 050-1808-2882",
    image: getPh(1200, 800)
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Very fun and relaxing! It completely took my mind off my extremely busy days in Tokyo. Ami, our instructor, was easy to follow, and when I needed help she was right there for me. So much better than the usual Thursday night options!",
    author: "Ryan Stephen Alldridge",
    userImage: getPh(200, 200)
  },
  {
    text: "ワインを飲みながらリラックスして、ほろ酔いでキャンバスに描くってこんなに気持ちいんだぁという発見が新鮮でした。何回でも参加したいです。",
    author: "Ritsuko Milliner",
    userImage: getPh(200, 200)
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