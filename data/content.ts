import { ContentData } from '../types';
import {
  INSTRUCTORS,
  LOCATIONS,
  MEDIA_LIST,
  FAQS,
  TEAM_BUILDING_TESTIMONIALS,
  POPULAR_THEMES,
  POPULAR_THEMES_JP,
  SITE_IMAGES,
} from '../constants';
import { GI } from './generated-image-paths';
import {
  HOME_TESTIMONIALS_CAROUSEL_EN,
  HOME_TESTIMONIALS_CAROUSEL_JP,
  HOME_TESTIMONIALS_FEATURED_EN,
  HOME_TESTIMONIALS_FEATURED_JP,
} from './home-testimonials';

export const defaultContent: ContentData = {
  theme: {
    fonts: {
      heading: "Josefin Sans",
      body: "Hiragino Kaku Gothic ProN"
    },
    typography: {
      // Mobile-first scale; cap xl so two headline rows fit in viewport with proof + CTAs (no clip/overlap)
      heroTitle:
        'text-[clamp(1.9rem,5.65vw+0.68rem,2.7rem)] sm:text-[3.75rem] md:text-[4.25rem] lg:text-[5rem] xl:text-[5.75rem] 2xl:text-[6.25rem] tracking-tight',
      pageTitle: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
      sectionTitle: "text-3xl sm:text-4xl md:text-5xl",
      cardTitle: "text-2xl md:text-3xl",
      body: "text-base",
      bodyLarge: "text-base md:text-xl",
      bodySmall: "text-sm"
    }
  },
  images: {
    logoDark: "/brand/artbar-logo-dark.png",
    logoLight: "/brand/artbar-logo-light.png",
    hero: {
      home: SITE_IMAGES.hero.home,
      homeMobile: SITE_IMAGES.hero.homeMobile,
      teamBuilding: SITE_IMAGES.hero.teamBuilding,
      video: SITE_IMAGES.hero.video,
      videoMobile: SITE_IMAGES.hero.videoMobile,
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
      id: "278848",
      slug: "maneki-neko-luck",
      published: true,
      image: "/media/blog/maneki-neko-luck/00-momo-maneki-cat.jpg",
      date: "2025.10.23",
      tags: ["Art & Culture", "Gifts", "Japanese Culture"],
      titleEn: `Paws Up for Luck! Meet the Maneki Neko`,
      titleJp: `幸運に手を挙げよう！招き猫について`,
      authorEn: `Daria`,
      authorJp: `Daria`,
      excerptEn: `You’ve probably seen it before: a small cat with one paw raised, slowly beckoning from behind the window of a shop.`,
      excerptJp: `きっと皆さんも一度は目にしたことがあるでしょう——片手を挙げてこちらを招く、あの小さな猫の置物。`,
      contentEn: `<p>きっと皆さんも一度は目にしたことがあるでしょう——片手を挙げてこちらを招く、あの小さな猫の置物。そう、「招き猫」です。古くから縁起物として親しまれてきたこの招き猫ですが、その背後には、意外と知られていない歴史や、さまざまな伝説、そして日本の民芸との深いつながりがあるのをご存知でしょうか？この微笑む猫は、どのようにして私たちの暮らしに根付き、そして何を「招いて」いるのでしょうか。</p><p>You’ve probably seen it before: a small cat with one paw raised, slowly beckoning from behind the window of a shop. It’s called <strong>maneki neko</strong> (招き猫, literally “the beckoning cat”) and, while it may seem like just a cute figurine, it holds a surprising amount of history, symbolism, and charm. But where did this ever-smiling cat come from, and what is it really beckoning?</p><p><img src="/media/blog/maneki-neko-luck/01-1718867667_276_Maneki-Neko-Interesting-History-Of-The-Japanese-Lucky-Cat.png" alt="Detail from Utagawa Hiroshige‘s ukiyo-e style woodblock print from the series, “Flourishing Business in Balladtown,” showing a vendor selling maneki-neko statues to a woman" loading="lazy" /></p><p><em>歌川広重の浮世絵木版画シリーズ「繁盛する団子町」（1852年）からの詳細。 Detail from Utagawa Hiroshige‘s ukiyo-e style woodblock print from the series, “Flourishing Business in Balladtown,” 1852. (Photo: Wikimedia Commons, Public domain)</em></p><h2><br /><strong>起源と伝説<br /></strong><strong>Origins &amp; Legends</strong><strong></strong></h2><p>招き猫の誕生には、いくつかの興味深い説があります。<br />
よく知られているのが、江戸時代の豪徳寺にまつわる話。ある日、武士が寺の前を通りかかると、一匹の猫が手招きをしていました。不思議に思って近づくと、背後に雷が落ち、命拾いをしたのだとか。それを機に、その武士は豪徳寺の支援者となったと伝えられています。<br />
また、浅草の商人が、野良猫を保護したところ、その猫が客を呼び込むようになり、商売繁盛に繋がったという話も。さらに、貧しい女性が飼っていた猫を手放した夜、夢にその猫が現れ「自分の姿を土人形にして売りなさい」と告げられたという伝説もあります。言われた通りにしたところ、たちまち人形が評判となり、彼女は困窮から抜け出したと言われています。<br />
明治時代になると、職人たちが本格的に招き猫を作り始め、民芸品としての地位も確立されていきました。</p><p>There isn’t just one origin story behind the maneki neko, there are many. One popular legend tells of a samurai who, while passing Gotoku-ji Temple near Edo, noticed a cat raising its paw. As he stepped toward it, lightning struck the spot where he’d been standing. Grateful for the warning, he became a patron of the temple. Another story speaks of a merchant who took in a stray cat; in return, the cat beckoned customers into his shop, bringing prosperity.<br />
The custom of keeping maneki neko figurines grew popular in 19th-century Asakusa. One tale tells of a poor woman who, after giving up her cat, dreamed it asked her to make its image in clay. She sold the figures outside a shrine, and soon found herself lifted from poverty.<br />
Artisans began mass-producing them in the late 19th and early 20th centuries, especially after the Meiji Restoration.</p><p><img src="/media/blog/maneki-neko-luck/02-Screenshot-2025-10-23-alle-15.07.56-1536x902.png" alt="craftsman carefully painting the eyes of a Maneki Neko figurine" loading="lazy" /></p><p><em>招き猫の人形の目を丁寧に描く職人。Craftsman carefully painting the eyes of a Maneki Neko figurine.</em></p><h2><strong>縁起物からアートの手仕事へ</strong><strong><br /></strong><strong>Craft and fortune: From Lucky Charm to Work of Art</strong></h2><p>招き猫は、単なる縁起物にとどまらず、日本の民芸（民間工芸）のひとつとして、地域の職人による手作業で丁寧に作られてきました。陶器に絵付けされたその一体一体が、小さな芸術作品とも言える存在です。<br />
時代が進むにつれ、招き猫は浮世絵や現代のポップアート、ファッション、デザインにも登場し、その姿も意味も進化し続けています。<br />
江戸の庶民信仰から生まれたこの猫は、今では日本のアートとクラフト文化の象徴的存在として、国内外で愛されています。</p><p>Beyond their symbolism, maneki neko are part of Japan’s folk art tradition (<em>mingei</em>), often handcrafted by local artisans using traditional techniques in ceramics and painting. Each figure is not only a charm, but also a miniature work of art.<br />
Over time, the maneki neko has evolved from traditional ceramic figures to a beloved icon seen in everything from ukiyo-e prints to contemporary pop art, streetwear, and graphic design.<br />
From its humble beginnings in Edo-era folktales, the maneki neko has become not just a good-luck charm, but an enduring figure in Japanese folk art. Traditionally made in ceramic and hand-painted with care, these cats are crafted with the same attention to detail found in other mingei (folk crafts) of Japan.<br />
Their presence has also made its way into classic ukiyo-e prints and modern illustration, evolving in both style and meaning across centuries of Japanese art.</p><p><img src="/media/blog/maneki-neko-luck/03-asian-3944293_1280-1.jpg" alt="Maneki Neko figurines in diverse colors, sizes, and designs, showcasing the variety of the traditional Japanese lucky cat statues. Photo by Emanuel Golabiewski from Pixabay." loading="lazy" /></p><p><em>さまざまな色やサイズ、デザインの招き猫の置物が伝統的な日本の幸運の猫の多様性を示しています。 Maneki Neko figurines in diverse colors, sizes, and designs, showcasing the variety of the traditional Japanese lucky cat statues. Photo by Emanuel Golabiewski from Pixabay.</em></p><h2><strong>招いているのは…何？</strong><strong><br /></strong><strong>What Is the Maneki Neko Beckoning?<br /></strong></h2><p>招き猫の「手を挙げたポーズ」、実はあいさつではありません。</p><p>「いらっしゃいませ」と、運や人を呼び込むしぐさなのです。</p><p>・左手を挙げている猫：お客さんや人との縁を呼び込む</p><p>・右手を挙げている猫：金運や健康を招く</p><p>また、赤い前掛けを着け、首には鈴のついた首輪、手には「千万両（せんまんりょう）」と書かれた小判を持っていることが多く、それぞれに意味があります。</p><p>色によっても願い事はさまざま：</p><p>白　　全体的な運気上昇</p><p>黒　　魔除け・厄除け</p><p>赤　　病気除け</p><p>金　　金運・繁栄</p><p>緑　　学業成就</p><p>青　　安全と成長</p><p>紫　　夢の実現</p><p>ピンク　恋愛運</p><p>The raised paw isn’t a greeting: it’s a gesture of <strong>invitation</strong>! A left paw raised is said to bring <strong>customers and connections</strong>; a right paw draws in <strong>wealth and good health</strong>.<br /><br />
Many maneki neko also wear a red bib, a bell collar, and clutch a gold coin known as a <em>koban</em>, often inscribed with 千万両 (<em>senman ryō</em>), symbolizing immense wealth. Even the color of the cat matters:</p><ul><li><strong>White</strong>: general good luck</li><li><strong>Black</strong>: protection from evil spirits</li><li><strong>Red</strong>: warding off illness</li><li><strong>Gold</strong>: wealth and prosperity</li><li><strong>Green</strong>: academic success</li><li><strong>Blue</strong>: safety and personal growth</li><li><strong>Purple</strong>: making dreams come true</li><li><strong>Pink</strong>: love and romance</li></ul><p><img src="/media/blog/maneki-neko-luck/04-cats-maneki-3-1-e1761200611504.jpg" alt="Three unique Maneki Neko figurines, each customized with different colors and patterns." loading="lazy" /></p><p><em>色や柄がそれぞれ違う、個性豊かな三体の招き猫。Three unique Maneki Neko figurines, each customized with different colors and patterns.</em></p><h2><strong>幸運は自分で作るもの</strong><strong><br /></strong><strong>Make Your Own Luck</strong></h2><p>「幸運は引き寄せられる」とよく言われます。<br />
ならば、その“招き”を、自分だけの招き猫の彩りで表現してみませんか？<br />
Artbar Tokyo では、白い素焼きの招き猫をキャンバスに、色やモチーフ、込めたい願いを選んでペイントする体験ができます！形は決まっているからこそ、色彩やデザインで自分らしさを映し出し、世界に一つだけの招き猫を完成させる楽しみがあります。<br />
幸運は待つものではニャーく、自らつかみ取るもの。<br />
さあ、「運を手作りする」体験をはじめてみませんか？</p><p><br />
In Japan, they say that <strong>fortune comes to those who are ready to receive it</strong> and sometimes, that means creating a little luck with your own two hands.</p><p>At <strong>Artbar Tokyo</strong>, you can design and decorate your very own maneki neko, choosing its color, style, and the kind of fortune you’d like to invite into your life. Whether you’re seeking abundance, protection, or just a cute companion with meaning, your lucky cat will be as unique as you are.</p><p>Because sometimes, the best luck is the kind you craft yourself！</p><p><img src="/media/blog/maneki-neko-luck/05-aneki-1.jpg" alt="" loading="lazy" /></p>`,
      contentJp: `<p>きっと皆さんも一度は目にしたことがあるでしょう——片手を挙げてこちらを招く、あの小さな猫の置物。そう、「招き猫」です。古くから縁起物として親しまれてきたこの招き猫ですが、その背後には、意外と知られていない歴史や、さまざまな伝説、そして日本の民芸との深いつながりがあるのをご存知でしょうか？この微笑む猫は、どのようにして私たちの暮らしに根付き、そして何を「招いて」いるのでしょうか。</p><p>You’ve probably seen it before: a small cat with one paw raised, slowly beckoning from behind the window of a shop. It’s called <strong>maneki neko</strong> (招き猫, literally “the beckoning cat”) and, while it may seem like just a cute figurine, it holds a surprising amount of history, symbolism, and charm. But where did this ever-smiling cat come from, and what is it really beckoning?</p><p><img src="/media/blog/maneki-neko-luck/01-1718867667_276_Maneki-Neko-Interesting-History-Of-The-Japanese-Lucky-Cat.png" alt="Detail from Utagawa Hiroshige‘s ukiyo-e style woodblock print from the series, “Flourishing Business in Balladtown,” showing a vendor selling maneki-neko statues to a woman" loading="lazy" /></p><p><em>歌川広重の浮世絵木版画シリーズ「繁盛する団子町」（1852年）からの詳細。 Detail from Utagawa Hiroshige‘s ukiyo-e style woodblock print from the series, “Flourishing Business in Balladtown,” 1852. (Photo: Wikimedia Commons, Public domain)</em></p><h2><br /><strong>起源と伝説<br /></strong><strong>Origins &amp; Legends</strong><strong></strong></h2><p>招き猫の誕生には、いくつかの興味深い説があります。<br />
よく知られているのが、江戸時代の豪徳寺にまつわる話。ある日、武士が寺の前を通りかかると、一匹の猫が手招きをしていました。不思議に思って近づくと、背後に雷が落ち、命拾いをしたのだとか。それを機に、その武士は豪徳寺の支援者となったと伝えられています。<br />
また、浅草の商人が、野良猫を保護したところ、その猫が客を呼び込むようになり、商売繁盛に繋がったという話も。さらに、貧しい女性が飼っていた猫を手放した夜、夢にその猫が現れ「自分の姿を土人形にして売りなさい」と告げられたという伝説もあります。言われた通りにしたところ、たちまち人形が評判となり、彼女は困窮から抜け出したと言われています。<br />
明治時代になると、職人たちが本格的に招き猫を作り始め、民芸品としての地位も確立されていきました。</p><p>There isn’t just one origin story behind the maneki neko, there are many. One popular legend tells of a samurai who, while passing Gotoku-ji Temple near Edo, noticed a cat raising its paw. As he stepped toward it, lightning struck the spot where he’d been standing. Grateful for the warning, he became a patron of the temple. Another story speaks of a merchant who took in a stray cat; in return, the cat beckoned customers into his shop, bringing prosperity.<br />
The custom of keeping maneki neko figurines grew popular in 19th-century Asakusa. One tale tells of a poor woman who, after giving up her cat, dreamed it asked her to make its image in clay. She sold the figures outside a shrine, and soon found herself lifted from poverty.<br />
Artisans began mass-producing them in the late 19th and early 20th centuries, especially after the Meiji Restoration.</p><p><img src="/media/blog/maneki-neko-luck/02-Screenshot-2025-10-23-alle-15.07.56-1536x902.png" alt="craftsman carefully painting the eyes of a Maneki Neko figurine" loading="lazy" /></p><p><em>招き猫の人形の目を丁寧に描く職人。Craftsman carefully painting the eyes of a Maneki Neko figurine.</em></p><h2><strong>縁起物からアートの手仕事へ</strong><strong><br /></strong><strong>Craft and fortune: From Lucky Charm to Work of Art</strong></h2><p>招き猫は、単なる縁起物にとどまらず、日本の民芸（民間工芸）のひとつとして、地域の職人による手作業で丁寧に作られてきました。陶器に絵付けされたその一体一体が、小さな芸術作品とも言える存在です。<br />
時代が進むにつれ、招き猫は浮世絵や現代のポップアート、ファッション、デザインにも登場し、その姿も意味も進化し続けています。<br />
江戸の庶民信仰から生まれたこの猫は、今では日本のアートとクラフト文化の象徴的存在として、国内外で愛されています。</p><p>Beyond their symbolism, maneki neko are part of Japan’s folk art tradition (<em>mingei</em>), often handcrafted by local artisans using traditional techniques in ceramics and painting. Each figure is not only a charm, but also a miniature work of art.<br />
Over time, the maneki neko has evolved from traditional ceramic figures to a beloved icon seen in everything from ukiyo-e prints to contemporary pop art, streetwear, and graphic design.<br />
From its humble beginnings in Edo-era folktales, the maneki neko has become not just a good-luck charm, but an enduring figure in Japanese folk art. Traditionally made in ceramic and hand-painted with care, these cats are crafted with the same attention to detail found in other mingei (folk crafts) of Japan.<br />
Their presence has also made its way into classic ukiyo-e prints and modern illustration, evolving in both style and meaning across centuries of Japanese art.</p><p><img src="/media/blog/maneki-neko-luck/03-asian-3944293_1280-1.jpg" alt="Maneki Neko figurines in diverse colors, sizes, and designs, showcasing the variety of the traditional Japanese lucky cat statues. Photo by Emanuel Golabiewski from Pixabay." loading="lazy" /></p><p><em>さまざまな色やサイズ、デザインの招き猫の置物が伝統的な日本の幸運の猫の多様性を示しています。 Maneki Neko figurines in diverse colors, sizes, and designs, showcasing the variety of the traditional Japanese lucky cat statues. Photo by Emanuel Golabiewski from Pixabay.</em></p><h2><strong>招いているのは…何？</strong><strong><br /></strong><strong>What Is the Maneki Neko Beckoning?<br /></strong></h2><p>招き猫の「手を挙げたポーズ」、実はあいさつではありません。</p><p>「いらっしゃいませ」と、運や人を呼び込むしぐさなのです。</p><p>・左手を挙げている猫：お客さんや人との縁を呼び込む</p><p>・右手を挙げている猫：金運や健康を招く</p><p>また、赤い前掛けを着け、首には鈴のついた首輪、手には「千万両（せんまんりょう）」と書かれた小判を持っていることが多く、それぞれに意味があります。</p><p>色によっても願い事はさまざま：</p><p>白　　全体的な運気上昇</p><p>黒　　魔除け・厄除け</p><p>赤　　病気除け</p><p>金　　金運・繁栄</p><p>緑　　学業成就</p><p>青　　安全と成長</p><p>紫　　夢の実現</p><p>ピンク　恋愛運</p><p>The raised paw isn’t a greeting: it’s a gesture of <strong>invitation</strong>! A left paw raised is said to bring <strong>customers and connections</strong>; a right paw draws in <strong>wealth and good health</strong>.<br /><br />
Many maneki neko also wear a red bib, a bell collar, and clutch a gold coin known as a <em>koban</em>, often inscribed with 千万両 (<em>senman ryō</em>), symbolizing immense wealth. Even the color of the cat matters:</p><ul><li><strong>White</strong>: general good luck</li><li><strong>Black</strong>: protection from evil spirits</li><li><strong>Red</strong>: warding off illness</li><li><strong>Gold</strong>: wealth and prosperity</li><li><strong>Green</strong>: academic success</li><li><strong>Blue</strong>: safety and personal growth</li><li><strong>Purple</strong>: making dreams come true</li><li><strong>Pink</strong>: love and romance</li></ul><p><img src="/media/blog/maneki-neko-luck/04-cats-maneki-3-1-e1761200611504.jpg" alt="Three unique Maneki Neko figurines, each customized with different colors and patterns." loading="lazy" /></p><p><em>色や柄がそれぞれ違う、個性豊かな三体の招き猫。Three unique Maneki Neko figurines, each customized with different colors and patterns.</em></p><h2><strong>幸運は自分で作るもの</strong><strong><br /></strong><strong>Make Your Own Luck</strong></h2><p>「幸運は引き寄せられる」とよく言われます。<br />
ならば、その“招き”を、自分だけの招き猫の彩りで表現してみませんか？<br />
Artbar Tokyo では、白い素焼きの招き猫をキャンバスに、色やモチーフ、込めたい願いを選んでペイントする体験ができます！形は決まっているからこそ、色彩やデザインで自分らしさを映し出し、世界に一つだけの招き猫を完成させる楽しみがあります。<br />
幸運は待つものではニャーく、自らつかみ取るもの。<br />
さあ、「運を手作りする」体験をはじめてみませんか？</p><p><br />
In Japan, they say that <strong>fortune comes to those who are ready to receive it</strong> and sometimes, that means creating a little luck with your own two hands.</p><p>At <strong>Artbar Tokyo</strong>, you can design and decorate your very own maneki neko, choosing its color, style, and the kind of fortune you’d like to invite into your life. Whether you’re seeking abundance, protection, or just a cute companion with meaning, your lucky cat will be as unique as you are.</p><p>Because sometimes, the best luck is the kind you craft yourself！</p><p><img src="/media/blog/maneki-neko-luck/05-aneki-1.jpg" alt="" loading="lazy" /></p>`
    },
    {
      id: "270497",
      slug: "shibuya-scramble-events-2025",
      published: true,
      image: "/media/blog/shibuya-scramble-events-2025/00-shibuya_event.jpg",
      date: "2025.07.05",
      tags: ["Artbar Tokyo", "Events", "Best Of List"],
      titleEn: `Summer Special Event at Shibuya Scramble Square`,
      titleJp: `渋谷スクランブルスクエアで夏のスペシャルイベント開催！`,
      authorEn: `momo chida`,
      authorJp: `momo chida`,
      excerptEn: `We’re hosting special summer events at Shibuya Scramble Square, directly connected to Shibuya Station!`,
      excerptJp: `毎日暑いですね！ちょっと疲れて来ちゃったあなたに、スペシャルイベントのお知らせです！ 「渋谷スカイ」で有名な渋谷スクランブルスクエアで夏のスペシャルイベントを開催します。`,
      contentEn: `<p>毎日暑いですね！ちょっと疲れて来ちゃったあなたに、スペシャルイベントのお知らせです！</p><p>「渋谷スカイ」で有名な渋谷スクランブルスクエアで夏のスペシャルイベントを開催します。</p><p><img src="/media/blog/shibuya-scramble-events-2025/00-shibuya_event.jpg" alt="" loading="lazy" /></p><p>会場は大きなガラス張りのスペースになっていて、渋谷の街が一望できるとっても景色の良い場所です！素晴らしい景色を見ながら、渋谷をテーマにしたアートを楽しみましょう！</p><p><img src="/media/blog/shibuya-scramble-events-2025/01-shibuya_night2-1365x2048.jpg" alt="" loading="lazy" /></p><p>会場ではSUMMER SCRAMBLE PARTYという夏イベントを開催中！夏らしくデコレーションされた会場は写真映え間違いなしです！</p><p>※会場の様子はイメージです。実際のデザインと異なる可能性がございます。</p><p><img src="/media/blog/shibuya-scramble-events-2025/02-shibuya_event1-1536x1012.png" alt="" loading="lazy" /><img src="/media/blog/shibuya-scramble-events-2025/03-shibuya_event2.png" alt="" loading="lazy" /></p><h2>Artbarのセッションスケジュール・ご予約は以下からどうぞ！</h2><p><strong>ハチ公スタイルのペット</strong></p><p><img src="/media/blog/shibuya-scramble-events-2025/04-hachiko_nanako.jpg" alt="" loading="lazy" /></p><p>7/19(土)13:00-15:00 <a href="https://artbar.co.jp/events/shibuya_scramble_0719/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya_scramble_0719/?swcfpc=1</a></p><p>8/2(土)13:00-15:00 <a href="https://artbar.co.jp/events/shibuya-scramble-08022025/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-08022025/?swcfpc=1</a></p><p><strong>渋谷の夕景</strong></p><p><img src="/media/blog/shibuya-scramble-events-2025/05-luci_shibuya_sky-1553x2048.jpg" alt="" loading="lazy" /></p><p>7/19(土)17:00-19:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square071902/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square071902/?swcfpc=1</a></p><p>8/2(土)17:00-19:00 <a href="https://artbar.co.jp/events/shibuya-scramble-08022025_2/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-08022025_2/?swcfpc=1</a></p><p><strong>ポップアート富士山</strong></p><p><img src="/media/blog/shibuya-scramble-events-2025/06-naomi_pop_fuji.jpg" alt="" loading="lazy" /></p><p>7/26(土) 13:00-15:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square07262025_1/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square07262025_1/?swcfpc=1</a></p><p>8/9(土) 13:00-15:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square08092025_1/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square08092025_1/?swcfpc=1</a></p><p><strong>渋谷スターリーナイト</strong></p><p><img src="/media/blog/shibuya-scramble-events-2025/07-luci_shibuya_starrynight-1513x2048.jpg" alt="" loading="lazy" /></p><p>7/26(土) 17:00-19:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square07262025_2/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square07262025_2/?swcfpc=1</a></p><p>8/9(土) 17:00-19:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square08092026_2/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square08092026_2/?swcfpc=1</a></p><p>We’re hosting special summer events at Shibuya Scramble Square, directly connected to Shibuya Station!</p><p>Come enjoy Shibuya-themed art in a beautiful event space with stunning panoramic views of the city.</p><p>We’ll be serving exclusive drinks special for these events plus a DJ will be spinning some tunes.</p><p>Event Dates: Saturday, July 19/July 26 / August 2 / August 9</p>`,
      contentJp: `<p>毎日暑いですね！ちょっと疲れて来ちゃったあなたに、スペシャルイベントのお知らせです！</p><p>「渋谷スカイ」で有名な渋谷スクランブルスクエアで夏のスペシャルイベントを開催します。</p><p><img src="/media/blog/shibuya-scramble-events-2025/00-shibuya_event.jpg" alt="" loading="lazy" /></p><p>会場は大きなガラス張りのスペースになっていて、渋谷の街が一望できるとっても景色の良い場所です！素晴らしい景色を見ながら、渋谷をテーマにしたアートを楽しみましょう！</p><p><img src="/media/blog/shibuya-scramble-events-2025/01-shibuya_night2-1365x2048.jpg" alt="" loading="lazy" /></p><p>会場ではSUMMER SCRAMBLE PARTYという夏イベントを開催中！夏らしくデコレーションされた会場は写真映え間違いなしです！</p><p>※会場の様子はイメージです。実際のデザインと異なる可能性がございます。</p><p><img src="/media/blog/shibuya-scramble-events-2025/02-shibuya_event1-1536x1012.png" alt="" loading="lazy" /><img src="/media/blog/shibuya-scramble-events-2025/03-shibuya_event2.png" alt="" loading="lazy" /></p><h2>Artbarのセッションスケジュール・ご予約は以下からどうぞ！</h2><p><strong>ハチ公スタイルのペット</strong></p><p><img src="/media/blog/shibuya-scramble-events-2025/04-hachiko_nanako.jpg" alt="" loading="lazy" /></p><p>7/19(土)13:00-15:00 <a href="https://artbar.co.jp/events/shibuya_scramble_0719/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya_scramble_0719/?swcfpc=1</a></p><p>8/2(土)13:00-15:00 <a href="https://artbar.co.jp/events/shibuya-scramble-08022025/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-08022025/?swcfpc=1</a></p><p><strong>渋谷の夕景</strong></p><p><img src="/media/blog/shibuya-scramble-events-2025/05-luci_shibuya_sky-1553x2048.jpg" alt="" loading="lazy" /></p><p>7/19(土)17:00-19:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square071902/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square071902/?swcfpc=1</a></p><p>8/2(土)17:00-19:00 <a href="https://artbar.co.jp/events/shibuya-scramble-08022025_2/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-08022025_2/?swcfpc=1</a></p><p><strong>ポップアート富士山</strong></p><p><img src="/media/blog/shibuya-scramble-events-2025/06-naomi_pop_fuji.jpg" alt="" loading="lazy" /></p><p>7/26(土) 13:00-15:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square07262025_1/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square07262025_1/?swcfpc=1</a></p><p>8/9(土) 13:00-15:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square08092025_1/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square08092025_1/?swcfpc=1</a></p><p><strong>渋谷スターリーナイト</strong></p><p><img src="/media/blog/shibuya-scramble-events-2025/07-luci_shibuya_starrynight-1513x2048.jpg" alt="" loading="lazy" /></p><p>7/26(土) 17:00-19:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square07262025_2/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square07262025_2/?swcfpc=1</a></p><p>8/9(土) 17:00-19:00 <a href="https://artbar.co.jp/events/shibuya-scramble-square08092026_2/?swcfpc=1" target="_blank" rel="noopener noreferrer">https://artbar.co.jp/events/shibuya-scramble-square08092026_2/?swcfpc=1</a></p><p>We’re hosting special summer events at Shibuya Scramble Square, directly connected to Shibuya Station!</p><p>Come enjoy Shibuya-themed art in a beautiful event space with stunning panoramic views of the city.</p><p>We’ll be serving exclusive drinks special for these events plus a DJ will be spinning some tunes.</p><p>Event Dates: Saturday, July 19/July 26 / August 2 / August 9</p>`
    },
    {
      id: "265634",
      slug: "chris-pyrate-interview",
      published: true,
      image: "/media/blog/chris-pyrate-interview/00-Screenshot-2025-05-15-alle-16.49.04.png",
      date: "2025.05.19",
      tags: ["Interview", "Creators", "Art & Culture"],
      titleEn: `Art in Bloom: Interview with Chris Pyrate`,
      titleJp: `Art in bloom: クリス・パイレートが語るアートの旅路`,
      authorEn: `Daria`,
      authorJp: `Daria`,
      excerptEn: `Artbar Tokyoでは、multi-disciplinary artistクリス・パイレート（Chris Pyrate）をゲストインストラクチャーとしてお迎えしました。彼の作品に共通するのは、見る人を惹きつける独創的なパターンと、世界各地を旅する中で培われた感性。アメリカ・ワシントンD.C.から東京へ——その土地ごとに異なる文化や色彩に触れながら、彼は独自のスタイルを築い...`,
      excerptJp: `では、multi-disciplinary artistクリス・パイレート（Chris Pyrate）をゲストインストラクチャーとしてお迎えしました。`,
      contentEn: `<p>Artbar Tokyoでは、multi-disciplinary artistクリス・パイレート（Chris Pyrate）をゲストインストラクチャーとしてお迎えしました。彼の作品に共通するのは、見る人を惹きつける独創的なパターンと、世界各地を旅する中で培われた感性。アメリカ・ワシントンD.C.から東京へ——その土地ごとに異なる文化や色彩に触れながら、彼は独自のスタイルを築いてきました。今回のインタビューでは、彼の創作の原点や日本とのつながり、そしてArtbar Tokyoでの貴重な体験について深く掘り下げていきます</p><p><strong>自己紹介と、アーティストとしての歩みについて教えてください。</strong></p><p>壁画アーティストとして活動しつつ、デザインやストーリーテリングも手がけています。出身はアメリカ・ワシントンD.C.で、その後はニューヨーク、マイアミ、カリフォルニア、ロサンゼルスなど、いろいろな街で暮らしてきました。最近は東京にも長く滞在しています。</p><p>僕の作品は、そうした土地ごとの出会いや出来事がそのまま色濃く反映されているんです。それぞれの街が持つ「空気感」や「色彩」、日常の風景が、ひとつひとつインスピレーションになって、今の作風ができあがってきたと思います。</p><h3><strong>創作スタイルはどのように進化してきたのでしょうか？影響を受けたものがあれば教えてください。</strong></h3><p>最初の大きな影響は、桜でした。ですが、旅を重ねる中でいろんなものがインスピレーション源になっていきました。例えばマイアミでは、強烈な日差しの影響で、建物のペイントがすぐに色褪せてしまう。その環境から、パステルカラーに興味を持つようになったんです。<br />
その後、コスタリカでは植物の緻密な美しさに惹かれて、「自然とテクノロジーの融合」のような植物の描き方を模索するようになりました。</p><p>柔らかい色合いと、しっかりとした輪郭線。そのバランス感覚が、今の自分のスタイルを形作っていると思います。</p><p><strong>桜のモチーフは、あなたの代表的なモチーフのひとつですね。個人的なつながりがあると伺いました。</strong></p><p>そうなんです。僕が育ったワシントンD.C.では、もともと日本から贈られた桜の木がたくさん植えられていて、春になると町中がピンクに染まるんですよ。</p><p>子どもの頃は、正直、花粉症がひどくて「またこの季節か〜！」なんて思ってたくらい（笑）。でも大人になるにつれて、その美しさにどんどん惹かれていって。高校時代に日本の筆ペンを使い始めたのがきっかけで、「あれ、この花って日本の桜なんだ！」と知って。そこから一気に日本文化に興味が湧いてきました。</p><p>桜の花って、はかなさや再生の象徴でもありますよね。そういった意味も含めて、自分の作品に取り入れるようになったんです。</p><h3><strong>日本文化への関心はどこから始まったのでしょうか？アートへの影響についても教えてください。</strong></h3><p>最初は完全にポップカルチャーからですね。90年代に『ドラゴンボールZ』がアメリカで流行りはじめて、僕も夢中になりました。当時、いとこがアニメやゲームに詳しくて、まだアメリカで一般的じゃなかった頃からいろいろ教えてくれて。そこから自然と、日本の文化やファッション、アートにも興味が広がっていきました。</p><p>その流れで、桜のモチーフを取り入れた作品が注目されて、NBAの「ワシントン・ウィザーズ」とのコラボが実現しました。そのユニフォームデザインが日本にも紹介されたことで、「あ、自分の作品って日本とちゃんとつながってるんだ」って実感したんです。初めて東京に来たときも、「やっと来られたな」という気持ちと同時に、不思議とすごく自然に馴染めた感覚がありました。</p><h3><strong>今回、Artbar Tokyoでのワークショップに参加いただきましたが、教えることに関しては初めての経験でしたか？</strong></h3><p>実は、以前D.C.のユース団体で一度だけ教えたことがあって、そのときもすごく良い経験でした。僕がアートを通して伝えたいのは、「あなたの好きなことには、それだけで表現する価値がある」ということ。猫が好きでも、車が好きでも、それをアートに落とし込むことで、ちゃんと自分らしい作品になるんです。</p><p>Artbar Tokyoでは、「自分の好きなものからパターンを作る」というテーマで教えました。僕の真似をするんじゃなくて、自分だけの表現を見つけてほしかった。<br />
アートって、ただ「見るもの」じゃなくて、自分の中にある思いを「伝えるためのツール」だと思っています。</p><p><img src="/media/blog/chris-pyrate-interview/03-Screenshot-2025-05-15-alle-16.48.16-1536x1004.png" alt="Chris Pyrate with all partecipants" loading="lazy" /></p><h3><strong>最後に</strong></h3><p>今回のワークショップは、Artbar Tokyoにとっても特別な時間でした。クリスさんのクラスは、創造力と楽しさにあふれていて、まさに私たちが目指す「アートのある時間」を体現してくれました。</p><p>今後も彼のアートがどのように進化し、世界中の人々にインスピレーションを与えていくのか、とても楽しみです。ご参加いただいた皆さま、ありがとうございました！<br />
これからも魅力的なクラスやイベントを開催していきますので、どうぞお楽しみに。</p><p><strong>Art in bloom: A Creative Journey / Interview with Chris Pyrate</strong></p><p>At Artbar Tokyo, we had the pleasure of hosting the multi-disciplinary artist Chris Pyrate as a guest art instructor. Known for his stunning patterns and captivating designs, Chris’s journey as an artist has taken him all around the world, from Washington D.C. to Tokyo. With a style influenced by the places he’s lived and the cultures he’s encountered, Chris’s work tells a story of personal growth, exploration, and creativity. We sat down with him to dive deeper into his artistic evolution, his connection to Japanese culture, and his recent experience at Artbar Tokyo.</p><p><img src="/media/blog/chris-pyrate-interview/04-Screenshot-2025-04-28-alle-16.22.46-1-e1747296454848.png" alt="" loading="lazy" /></p><p><em>Can you tell us a little about yourself and your journey as an artist?</em></p><p>I’m Chris Pyrate, a muralist, designer, and storyteller. I grew up in D.C., and I’ve lived in a lot of places like New York, Miami, California, and Los Angeles. Now, I’m spending more time in Tokyo. My art has always been influenced by these places. It’s a collection of moments and inspiration I’ve gathered from my travels. Every place I’ve lived and worked has had a different influence on my art, and I think that’s reflected in the diversity of my style.</p><p><em>How has your art evolved over time, and what other influences have shaped your work?</em></p><p>My work has evolved through a mix of different influences. The cherry blossom was my first big influence, but as I traveled, I started incorporating other elements. When I moved to Miami, I noticed how the pastel colors there were influenced by the sun – paint fades quickly due to the intensity of the sunlight. That led me to explore pastel tones in my work. Later, when I spent time in Costa Rica, I was inspired by the intricate details of the plants. I started drawing plants with such detail that they looked like a cross between nature and technology. I wanted to find a balance between soft colors and bold lines, which has become a hallmark of my current style.</p><p><em>You mentioned the cherry blossoms, which you often incorporate into your work. Can you tell us about the personal connection you have to this motif and how it influences your art?</em></p><p>I grew up in D.C., where the cherry blossoms were gifted by the Japanese government in the early 1900s. As a kid, I didn’t appreciate the trees much, especially during allergy season when the pollen would be so thick it was like snow! But over time, I began to appreciate their beauty. I didn’t realize it was a Japanese tree until later, when I started using Japanese brush pens in high school. That’s when I learned about the Sakura flower, and it really connected with me. Eventually, I incorporated it into my artwork, especially after working on murals and seeing the flower’s symbolic significance.</p><p><em><img src="/media/blog/chris-pyrate-interview/05-chris1.jpg" alt="" loading="lazy" /></em></p><p><em>Not only is the Sakura one of your signature motifs, but it is also a well-known symbol of Japanese culture. Speaking about it, what led to your interest in Japan, and how did this connection influence your art?</em></p><p>It all started with pop culture, specifically anime like <em>Dragon Ball Z</em>. In the 90s, anime was just starting to make its way to the U.S. I was really into it, and my cousin was a big influence, always showing me things before they hit mainstream. It sparked an interest in Japanese culture for me, and over time, I saw how anime and fashion intersected. This connection continued through the art scene: when my cherry blossom motif gained popularity, I was invited to collaborate on designs for the Washington Wizards’ jersey. The NBA even took my work to Japan, and that was when I realized how much my art was connected to Japan. Eventually, I came here, and it felt like everything just fell into place.</p><p><em>Among the various creative projects you have ongoing in Japan, you collaborated with Artbar Tokyo as a guest art instructor. Was this your first time teaching? What do you want to convey to your students as an art-instructor?</em></p><p>I’ve taught once before, in D.C., for a youth organization. It was a rewarding experience. As an instructor, my goal is to show people that their interests and memories have artistic value. I want them to understand that their passions (whether it’s cats, cars, or something else) can be transformed into meaningful artwork. For Artbar Tokyo, my goal was teaching how to create patterns based on things they love. It’s not about copying my work, it’s about creating something unique that represents them. Art, for me, is about communication. It’s not just for your eyes; it’s a way to express what’s inside and share it with others.</p><p><img src="/media/blog/chris-pyrate-interview/06-Screenshot-2025-05-15-alle-16.49.39-1.png" alt="" loading="lazy" /></p><p>Chris Pyrate’s special event at Artbar Tokyo was a huge success, and we’re grateful to have had the opportunity to host such an inspiring artist. His class was a wonderful blend of creativity and fun, perfectly capturing the spirit of what we strive to create here at Artbar Tokyo. We wish Chris Pyrate the best for his artistic journey around the world, and we’re looking forward to seeing how his work continues to evolve and inspire. Thanks to everyone who participated in this special event and continues to choose us. Stay tuned for more exciting classes and special events!</p>`,
      contentJp: `<p>Artbar Tokyoでは、multi-disciplinary artistクリス・パイレート（Chris Pyrate）をゲストインストラクチャーとしてお迎えしました。彼の作品に共通するのは、見る人を惹きつける独創的なパターンと、世界各地を旅する中で培われた感性。アメリカ・ワシントンD.C.から東京へ——その土地ごとに異なる文化や色彩に触れながら、彼は独自のスタイルを築いてきました。今回のインタビューでは、彼の創作の原点や日本とのつながり、そしてArtbar Tokyoでの貴重な体験について深く掘り下げていきます</p><p><strong>自己紹介と、アーティストとしての歩みについて教えてください。</strong></p><p>壁画アーティストとして活動しつつ、デザインやストーリーテリングも手がけています。出身はアメリカ・ワシントンD.C.で、その後はニューヨーク、マイアミ、カリフォルニア、ロサンゼルスなど、いろいろな街で暮らしてきました。最近は東京にも長く滞在しています。</p><p>僕の作品は、そうした土地ごとの出会いや出来事がそのまま色濃く反映されているんです。それぞれの街が持つ「空気感」や「色彩」、日常の風景が、ひとつひとつインスピレーションになって、今の作風ができあがってきたと思います。</p><h3><strong>創作スタイルはどのように進化してきたのでしょうか？影響を受けたものがあれば教えてください。</strong></h3><p>最初の大きな影響は、桜でした。ですが、旅を重ねる中でいろんなものがインスピレーション源になっていきました。例えばマイアミでは、強烈な日差しの影響で、建物のペイントがすぐに色褪せてしまう。その環境から、パステルカラーに興味を持つようになったんです。<br />
その後、コスタリカでは植物の緻密な美しさに惹かれて、「自然とテクノロジーの融合」のような植物の描き方を模索するようになりました。</p><p>柔らかい色合いと、しっかりとした輪郭線。そのバランス感覚が、今の自分のスタイルを形作っていると思います。</p><p><strong>桜のモチーフは、あなたの代表的なモチーフのひとつですね。個人的なつながりがあると伺いました。</strong></p><p>そうなんです。僕が育ったワシントンD.C.では、もともと日本から贈られた桜の木がたくさん植えられていて、春になると町中がピンクに染まるんですよ。</p><p>子どもの頃は、正直、花粉症がひどくて「またこの季節か〜！」なんて思ってたくらい（笑）。でも大人になるにつれて、その美しさにどんどん惹かれていって。高校時代に日本の筆ペンを使い始めたのがきっかけで、「あれ、この花って日本の桜なんだ！」と知って。そこから一気に日本文化に興味が湧いてきました。</p><p>桜の花って、はかなさや再生の象徴でもありますよね。そういった意味も含めて、自分の作品に取り入れるようになったんです。</p><h3><strong>日本文化への関心はどこから始まったのでしょうか？アートへの影響についても教えてください。</strong></h3><p>最初は完全にポップカルチャーからですね。90年代に『ドラゴンボールZ』がアメリカで流行りはじめて、僕も夢中になりました。当時、いとこがアニメやゲームに詳しくて、まだアメリカで一般的じゃなかった頃からいろいろ教えてくれて。そこから自然と、日本の文化やファッション、アートにも興味が広がっていきました。</p><p>その流れで、桜のモチーフを取り入れた作品が注目されて、NBAの「ワシントン・ウィザーズ」とのコラボが実現しました。そのユニフォームデザインが日本にも紹介されたことで、「あ、自分の作品って日本とちゃんとつながってるんだ」って実感したんです。初めて東京に来たときも、「やっと来られたな」という気持ちと同時に、不思議とすごく自然に馴染めた感覚がありました。</p><h3><strong>今回、Artbar Tokyoでのワークショップに参加いただきましたが、教えることに関しては初めての経験でしたか？</strong></h3><p>実は、以前D.C.のユース団体で一度だけ教えたことがあって、そのときもすごく良い経験でした。僕がアートを通して伝えたいのは、「あなたの好きなことには、それだけで表現する価値がある」ということ。猫が好きでも、車が好きでも、それをアートに落とし込むことで、ちゃんと自分らしい作品になるんです。</p><p>Artbar Tokyoでは、「自分の好きなものからパターンを作る」というテーマで教えました。僕の真似をするんじゃなくて、自分だけの表現を見つけてほしかった。<br />
アートって、ただ「見るもの」じゃなくて、自分の中にある思いを「伝えるためのツール」だと思っています。</p><p><img src="/media/blog/chris-pyrate-interview/03-Screenshot-2025-05-15-alle-16.48.16-1536x1004.png" alt="Chris Pyrate with all partecipants" loading="lazy" /></p><h3><strong>最後に</strong></h3><p>今回のワークショップは、Artbar Tokyoにとっても特別な時間でした。クリスさんのクラスは、創造力と楽しさにあふれていて、まさに私たちが目指す「アートのある時間」を体現してくれました。</p><p>今後も彼のアートがどのように進化し、世界中の人々にインスピレーションを与えていくのか、とても楽しみです。ご参加いただいた皆さま、ありがとうございました！<br />
これからも魅力的なクラスやイベントを開催していきますので、どうぞお楽しみに。</p><p><strong>Art in bloom: A Creative Journey / Interview with Chris Pyrate</strong></p><p>At Artbar Tokyo, we had the pleasure of hosting the multi-disciplinary artist Chris Pyrate as a guest art instructor. Known for his stunning patterns and captivating designs, Chris’s journey as an artist has taken him all around the world, from Washington D.C. to Tokyo. With a style influenced by the places he’s lived and the cultures he’s encountered, Chris’s work tells a story of personal growth, exploration, and creativity. We sat down with him to dive deeper into his artistic evolution, his connection to Japanese culture, and his recent experience at Artbar Tokyo.</p><p><img src="/media/blog/chris-pyrate-interview/04-Screenshot-2025-04-28-alle-16.22.46-1-e1747296454848.png" alt="" loading="lazy" /></p><p><em>Can you tell us a little about yourself and your journey as an artist?</em></p><p>I’m Chris Pyrate, a muralist, designer, and storyteller. I grew up in D.C., and I’ve lived in a lot of places like New York, Miami, California, and Los Angeles. Now, I’m spending more time in Tokyo. My art has always been influenced by these places. It’s a collection of moments and inspiration I’ve gathered from my travels. Every place I’ve lived and worked has had a different influence on my art, and I think that’s reflected in the diversity of my style.</p><p><em>How has your art evolved over time, and what other influences have shaped your work?</em></p><p>My work has evolved through a mix of different influences. The cherry blossom was my first big influence, but as I traveled, I started incorporating other elements. When I moved to Miami, I noticed how the pastel colors there were influenced by the sun – paint fades quickly due to the intensity of the sunlight. That led me to explore pastel tones in my work. Later, when I spent time in Costa Rica, I was inspired by the intricate details of the plants. I started drawing plants with such detail that they looked like a cross between nature and technology. I wanted to find a balance between soft colors and bold lines, which has become a hallmark of my current style.</p><p><em>You mentioned the cherry blossoms, which you often incorporate into your work. Can you tell us about the personal connection you have to this motif and how it influences your art?</em></p><p>I grew up in D.C., where the cherry blossoms were gifted by the Japanese government in the early 1900s. As a kid, I didn’t appreciate the trees much, especially during allergy season when the pollen would be so thick it was like snow! But over time, I began to appreciate their beauty. I didn’t realize it was a Japanese tree until later, when I started using Japanese brush pens in high school. That’s when I learned about the Sakura flower, and it really connected with me. Eventually, I incorporated it into my artwork, especially after working on murals and seeing the flower’s symbolic significance.</p><p><em><img src="/media/blog/chris-pyrate-interview/05-chris1.jpg" alt="" loading="lazy" /></em></p><p><em>Not only is the Sakura one of your signature motifs, but it is also a well-known symbol of Japanese culture. Speaking about it, what led to your interest in Japan, and how did this connection influence your art?</em></p><p>It all started with pop culture, specifically anime like <em>Dragon Ball Z</em>. In the 90s, anime was just starting to make its way to the U.S. I was really into it, and my cousin was a big influence, always showing me things before they hit mainstream. It sparked an interest in Japanese culture for me, and over time, I saw how anime and fashion intersected. This connection continued through the art scene: when my cherry blossom motif gained popularity, I was invited to collaborate on designs for the Washington Wizards’ jersey. The NBA even took my work to Japan, and that was when I realized how much my art was connected to Japan. Eventually, I came here, and it felt like everything just fell into place.</p><p><em>Among the various creative projects you have ongoing in Japan, you collaborated with Artbar Tokyo as a guest art instructor. Was this your first time teaching? What do you want to convey to your students as an art-instructor?</em></p><p>I’ve taught once before, in D.C., for a youth organization. It was a rewarding experience. As an instructor, my goal is to show people that their interests and memories have artistic value. I want them to understand that their passions (whether it’s cats, cars, or something else) can be transformed into meaningful artwork. For Artbar Tokyo, my goal was teaching how to create patterns based on things they love. It’s not about copying my work, it’s about creating something unique that represents them. Art, for me, is about communication. It’s not just for your eyes; it’s a way to express what’s inside and share it with others.</p><p><img src="/media/blog/chris-pyrate-interview/06-Screenshot-2025-05-15-alle-16.49.39-1.png" alt="" loading="lazy" /></p><p>Chris Pyrate’s special event at Artbar Tokyo was a huge success, and we’re grateful to have had the opportunity to host such an inspiring artist. His class was a wonderful blend of creativity and fun, perfectly capturing the spirit of what we strive to create here at Artbar Tokyo. We wish Chris Pyrate the best for his artistic journey around the world, and we’re looking forward to seeing how his work continues to evolve and inspire. Thanks to everyone who participated in this special event and continues to choose us. Stay tuned for more exciting classes and special events!</p>`
    },
    {
      id: "260265",
      slug: "team-building-power",
      published: true,
      image: "/media/blog/team-building-power/00-Screenshot-2025-03-11-alle-21.16.39-1536x1033.png",
      date: "2025.03.14",
      tags: ["Team Building", "Business", "Corporate Events"],
      titleEn: `The Power of Team Building`,
      titleJp: `チームビルディングの力`,
      authorEn: `Daria`,
      authorJp: `Daria`,
      excerptEn: `The power of Team Building One of the most popular services offered by Artbar Tokyo since 2017, trusted by both Japanese and foreign firms, is Team Building.`,
      excerptJp: `年からArtbar Tokyoが提供しているサービスの中で人気なものとして、「チームビルディング」があります。`,
      contentEn: `<p>[English follows]</p><p><br />
2017年からArtbar Tokyoが提供しているサービスの中で人気なものとして、「チームビルディング」があります。日本企業だけでなく、外国企業にも信頼され、小規模なスタートアップ企業から大企業まで、業種を問わず多くの企業がこの創造的な活動がチームのパフォーマンスや結束力に大きな影響を与えることを認識しています。この記事では、チームビルディングの人気が高まっている理由と、それらの活動がもたらす具体的なメリットについて探っていきます。</p><p>チームビルディングは、参加者を通常の業務のルーチンから解放するグループ活動です。Artbar Tokyoのチームビルディングでは、カジュアルな環境でリラックスしながらチームでアクティビティをこなしていきます。共同作業を通じて、チームワークについて新たな視点を得ることになるのです。これらの活動が効果的に実行されれば、パフォーマンスや生産性に長期的でポジティブな効果を生み、結束力があり活気のある企業文化を作り上げることに繋がります。</p><p>定期的にチームビルディング活動を行うことで、企業全体の「ウェルビーイング」を大きく向上させることができます。ウェルビーイングとは、従業員の個人的・職業的な健康を促進し、仕事が従業員の人生の充実した一部となるように企業が取る行動を指す言葉です。計画的かつ継続的な取り組みを行うことで、企業は従業員のウェルビーイングを育むことができ、より良い結果とより積極的なチームを生み出すのです。</p><p><strong><img src="/media/blog/team-building-power/01-Screenshot-2025-03-14-alle-16.52.28.png" alt="" loading="lazy" />　なぜ企業はチームビルディングを選ぶべきなのでしょうか？</strong> 普段とは異なる環境で刺激的な活動をすることは、人々がリラックスし、モチベーションを高めるための安全な空間を作り出します。チームビルディングは、典型的な仕事のプレッシャーを感じることなく学べる経験を提供することで、グローバルな幸福を達成することを目的とした総合的な戦略である。 これは、まず個人レベル、次にチーム、そして最終的には会社の業績へと、いくつかのメリットをもたらします。</p><p><strong>ソフトスキルの向上</strong>：一例としてアクティブリスニング、コミュニケーション、チームワーク、問題解決などがあげられます。リラックスしたストレスの少ない環境でこれらのスキルを実践することで、仕事上の困難なタスクに役立つ新たな戦略を見つけることができます。</p><p><strong>結束と協力</strong>：形式的な障壁を取り除くことで、従業員同士の距離が縮まり、お互いのことをより良く知ることができます。これにより、インタラクションや情報交換が活発になり、共同プロジェクトの成功を確実にします。魅力的なチームビルディングのアクティビティは、個人の競争を減らし、共通の目標に向かって協力することを促進します。</p><p><strong>ストレスの軽減</strong>： 長期間のストレスや不安は、個人の幸福と仕事のパフォーマンスの両方に悪影響を及ぼします。従業員にとって、リラックスした環境下で業務外の活動を行うことは日常業務からの休憩の提供になり、不安のレベルを下げ、精神的なリフレッシュになります。</p><p><strong>気分、モチベーション、人間関係の向上</strong>： 大きな目標を達成した後にそれを一緒に祝えるチームは個人の精神に余裕を持たせます。同様に、同僚とともにチャレンジを乗り越えることは、自信やモチベーションを高め、お互いの信頼も深めます。これにより、チームワークへの熱意が再燃し、従業員の職場環境に対する満足度が高まり、日々の業務に対するモチベーションも向上します。</p><p><img src="/media/blog/team-building-power/02-Screenshot-2025-03-11-alle-21.39.36.png" alt="" loading="lazy" />　では、<strong>なぜアートを活用したチームビルディングを選ぶべきなのでしょうか？</strong> クリエイティブなチームビルディングの具体的なメリットは何でしょうか？</p><p>アートを使ったチームビルディングは、クリエイティブな思考を刺激する点において他の活動とは一線を画しています。今日の職場において、クリエイティブな思考は非常に価値のあるスキルです。近年、多くの環境で技術的・合理的なアプローチが優先される傾向にあり、ソーシャルワークの創造的な可能性が低下しています。現代においては、批判的で変革的、かつ行動志向の方法を使用する必要性が高まっています。これらの方法は、チームの社会的結束力、ソフトスキル、そして批判的・変革的な思考を高めることができます。さらに、アクリル絵具のような手を使う道具や手作業のタスクは、没入感のある活動を提供し、ストレスや不安を大幅に軽減します。これらの活動は楽しさを提供するだけでなく、日常の仕事からの休息を与え、自己表現やリラクゼーションを促進します。</p><p>Artbar Tokyoでは、ドリンクやスナックが食べ放題・飲み放題で提供され、ケータリングサービスの手配や飲み物の持ち込みも可能です。一緒に食べて飲むことで、ストレスをさらに軽減し、楽しくリラックスした環境での社会的絆が深まります。Artbar Tokyoでのチームビルディングをオススメする理由は以下の通りです。</p><p><strong>カスタマイズ</strong>：私たちは各企業がチームビルディングを開催する目的に合わせて常に進化を続けています。お客様のニーズを聴き、会社や価値観、製品に合った体験を提供することに全力を尽くしています。</p><p><strong>柔軟なアプローチ</strong>：企業ごとに異なるニーズを理解しており、チームのタイムライン、使用可能なスペース、目標に基づいたアクティビティを計画します。私たちの提供するサービスは柔軟性があり、どのイベントもチームの独自の要件に合わせて調整します。</p><p><strong>ターゲットを絞ったゲームやアクティビティ</strong>：コミュニケーションの改善、創造性の刺激、協力や強いチームの絆を育むために設計された活動をご用意しています。どのアクティビティも有益で楽しく、参加者全員が貴重な学びを得られるようになっています。</p><p>アートを活用したチームビルディングの価値について詳しくご理解いただけたでしょうか？ もし、チームのために特別な体験を作りたいと思われたら、お気軽にご連絡ください。お客様のニーズや目標に合わせたアクティビティを一緒にデザインするお手伝いをさせていただきます。どんな違いが生まれるか、ぜひ体験してみてください。</p><p><img src="/media/blog/team-building-power/03-Screenshot-2025-03-11-alle-21.40.25.png" alt="" loading="lazy" /></p><p><strong>The power of Team Building</strong></p><p>One of the most popular services offered by Artbar Tokyo since 2017, trusted by both Japanese and foreign firms, is Team Building. From small startups to large corporations, companies across industries are increasingly recognizing the significant impact these creative activities can have on team performance and cohesion. In this article, we’ll explore the reasons why Team Building is becoming increasingly popular, and the concrete benefits this kind of activity brings.</p><p>Team building involves group activities that take participants outside the usual work routine. Through engaging workshops and activities, teams are invited to collaborate in a relaxed and informal setting, offering a fresh perspective on teamwork. These activities do more than break up the workday: when designed and executed effectively, team building creates lasting, positive effects on performance and productivity, contributing to a cohesive and vibrant company culture.</p><p>When practiced regularly, team building activities can significantly enhance a company’s overall “well-being”, a term which refers to the actions a company takes to promote the personal and professional health of its employees, ensuring that work becomes a fulfilling part of their lives. By committing to structured, ongoing efforts, companies can nurture the well-being of their workforce, leading to better results and a more engaged team.</p><p><img src="/media/blog/team-building-power/04-Screenshot-2025-03-14-alle-16.50.54-1536x1015.png" alt="" loading="lazy" />　So, why should a company choose team building? The change of environment and stimulating activities create a safe space where people can feel relaxed and motivated. It’s a holistic strategy aimed at achieving global well-being by providing an experience that allows people to learn without the pressure of a typical work obligation. This leads to several benefits, first on the individual level, then on the team, and ultimately, on company performance:</p><p><strong>Development of Soft Skills</strong>: Active listening, communication, teamwork, and problem-solving are just some examples. Practicing these skills in a relaxed, non-stressful environment helps participants discover new strategies that can significantly help during challenging tasks at work.</p><p><strong>Cohesion and collaboration</strong>: Removing formal barriers brings people closer together, allowing employees to get to know each other better, which reduces tension and fosters collaboration. This will encourage interaction and exchange, and ultimately ensure the success of collaborative projects. Engaging and fun team building activities help reduce individual competition in favor of a shared goal.</p><p><strong>Reducing stress</strong>: Long-term stress and anxiety can negatively impact both an individual’s well-being and their work performance. Informal activities in a relaxed setting provide a break from the pressures of everyday tasks, lowering anxiety levels and allowing employees to recharge mentally.</p><p><strong>Improved mood, motivation and relationships</strong>: A team that celebrates victory together after achieving a significant goal is psychologically encouraged. Similarly, overcoming a challenge with colleagues helps to enhance self-confidence, motivation and fosters trust. This reignites enthusiasm for teamwork, making employees more satisfied with their work environment and more motivated to engage in their daily responsibilities.</p><p><img src="/media/blog/team-building-power/05-Screenshot-2025-03-11-alle-21.40.05.png" alt="" loading="lazy" /></p><p>That said, why should you choose an artistic team building for your company? What are the specific benefits of creative team buildings?</p><p>When it comes to team building, artistic activities stand out for their unique ability to stimulate creative thinking, a highly valuable skill in today’s workplace. In recent years, many environments have favored a strictly technical-rational approach, leading to a decrease in the creative potential of social work. In modern times, there is an increasing need to use critical, transformative, and action-focused methods that can improve team social cohesion, soft skills, and critical-transformative thinking. Furthermore, manual tasks and tactile media, like acrylic paints, offer immersive activities that significantly reduce anxiety and stress levels. These activities are not only enjoyable but provide a break from the daily grind, allowing for greater personal expression and relaxation.</p><p>At Artbar, we also offer all you can drink beverages and all you can eat snacks, while allowing you to arrange your own catering services and bring drinks: eating and drinking together helps further to lower stress and enhance social bonding in a fun and relaxed setting. Beyond the enjoyable atmosphere, here’s what makes our artistic team building experience unique:</p><p><strong>Customization</strong>: Over the years, we have continually adapted to meet our clients’ goals. We listen to your needs and craft a tailored experience based on your specific aims, fully committing to creating an experience that aligns with your company, values, and product.</p><p><strong>Flexible approach</strong>: We understand that each company is different, so we plan activities based on your team’s timeline, available space, and objectives. Our offerings are designed to be adaptable, ensuring that every event meets your team’s unique requirements.</p><p><strong>Targeted games and activities</strong>: We’ve designed activities that are aimed at achieving specific objectives, whether it’s improving communication, stimulating creativity, or fostering collaboration and strong team bonds. Every activity is both useful and fun, ensuring that everyone walks away with valuable takeaways.</p><p><br />
Now that you’ve explored the value of artistic team building in detail, if you’re interested in creating a tailored experience for your team, feel free to contact us. We’d be happy to help you design an activity that aligns with your specific needs and goals. Ready to see the difference it will make?</p><p><img src="/media/blog/team-building-power/06-Screenshot-2025-03-11-alle-21.50.55-1536x1006.png" alt="" loading="lazy" /></p>`,
      contentJp: `<p>[English follows]</p><p><br />
2017年からArtbar Tokyoが提供しているサービスの中で人気なものとして、「チームビルディング」があります。日本企業だけでなく、外国企業にも信頼され、小規模なスタートアップ企業から大企業まで、業種を問わず多くの企業がこの創造的な活動がチームのパフォーマンスや結束力に大きな影響を与えることを認識しています。この記事では、チームビルディングの人気が高まっている理由と、それらの活動がもたらす具体的なメリットについて探っていきます。</p><p>チームビルディングは、参加者を通常の業務のルーチンから解放するグループ活動です。Artbar Tokyoのチームビルディングでは、カジュアルな環境でリラックスしながらチームでアクティビティをこなしていきます。共同作業を通じて、チームワークについて新たな視点を得ることになるのです。これらの活動が効果的に実行されれば、パフォーマンスや生産性に長期的でポジティブな効果を生み、結束力があり活気のある企業文化を作り上げることに繋がります。</p><p>定期的にチームビルディング活動を行うことで、企業全体の「ウェルビーイング」を大きく向上させることができます。ウェルビーイングとは、従業員の個人的・職業的な健康を促進し、仕事が従業員の人生の充実した一部となるように企業が取る行動を指す言葉です。計画的かつ継続的な取り組みを行うことで、企業は従業員のウェルビーイングを育むことができ、より良い結果とより積極的なチームを生み出すのです。</p><p><strong><img src="/media/blog/team-building-power/01-Screenshot-2025-03-14-alle-16.52.28.png" alt="" loading="lazy" />　なぜ企業はチームビルディングを選ぶべきなのでしょうか？</strong> 普段とは異なる環境で刺激的な活動をすることは、人々がリラックスし、モチベーションを高めるための安全な空間を作り出します。チームビルディングは、典型的な仕事のプレッシャーを感じることなく学べる経験を提供することで、グローバルな幸福を達成することを目的とした総合的な戦略である。 これは、まず個人レベル、次にチーム、そして最終的には会社の業績へと、いくつかのメリットをもたらします。</p><p><strong>ソフトスキルの向上</strong>：一例としてアクティブリスニング、コミュニケーション、チームワーク、問題解決などがあげられます。リラックスしたストレスの少ない環境でこれらのスキルを実践することで、仕事上の困難なタスクに役立つ新たな戦略を見つけることができます。</p><p><strong>結束と協力</strong>：形式的な障壁を取り除くことで、従業員同士の距離が縮まり、お互いのことをより良く知ることができます。これにより、インタラクションや情報交換が活発になり、共同プロジェクトの成功を確実にします。魅力的なチームビルディングのアクティビティは、個人の競争を減らし、共通の目標に向かって協力することを促進します。</p><p><strong>ストレスの軽減</strong>： 長期間のストレスや不安は、個人の幸福と仕事のパフォーマンスの両方に悪影響を及ぼします。従業員にとって、リラックスした環境下で業務外の活動を行うことは日常業務からの休憩の提供になり、不安のレベルを下げ、精神的なリフレッシュになります。</p><p><strong>気分、モチベーション、人間関係の向上</strong>： 大きな目標を達成した後にそれを一緒に祝えるチームは個人の精神に余裕を持たせます。同様に、同僚とともにチャレンジを乗り越えることは、自信やモチベーションを高め、お互いの信頼も深めます。これにより、チームワークへの熱意が再燃し、従業員の職場環境に対する満足度が高まり、日々の業務に対するモチベーションも向上します。</p><p><img src="/media/blog/team-building-power/02-Screenshot-2025-03-11-alle-21.39.36.png" alt="" loading="lazy" />　では、<strong>なぜアートを活用したチームビルディングを選ぶべきなのでしょうか？</strong> クリエイティブなチームビルディングの具体的なメリットは何でしょうか？</p><p>アートを使ったチームビルディングは、クリエイティブな思考を刺激する点において他の活動とは一線を画しています。今日の職場において、クリエイティブな思考は非常に価値のあるスキルです。近年、多くの環境で技術的・合理的なアプローチが優先される傾向にあり、ソーシャルワークの創造的な可能性が低下しています。現代においては、批判的で変革的、かつ行動志向の方法を使用する必要性が高まっています。これらの方法は、チームの社会的結束力、ソフトスキル、そして批判的・変革的な思考を高めることができます。さらに、アクリル絵具のような手を使う道具や手作業のタスクは、没入感のある活動を提供し、ストレスや不安を大幅に軽減します。これらの活動は楽しさを提供するだけでなく、日常の仕事からの休息を与え、自己表現やリラクゼーションを促進します。</p><p>Artbar Tokyoでは、ドリンクやスナックが食べ放題・飲み放題で提供され、ケータリングサービスの手配や飲み物の持ち込みも可能です。一緒に食べて飲むことで、ストレスをさらに軽減し、楽しくリラックスした環境での社会的絆が深まります。Artbar Tokyoでのチームビルディングをオススメする理由は以下の通りです。</p><p><strong>カスタマイズ</strong>：私たちは各企業がチームビルディングを開催する目的に合わせて常に進化を続けています。お客様のニーズを聴き、会社や価値観、製品に合った体験を提供することに全力を尽くしています。</p><p><strong>柔軟なアプローチ</strong>：企業ごとに異なるニーズを理解しており、チームのタイムライン、使用可能なスペース、目標に基づいたアクティビティを計画します。私たちの提供するサービスは柔軟性があり、どのイベントもチームの独自の要件に合わせて調整します。</p><p><strong>ターゲットを絞ったゲームやアクティビティ</strong>：コミュニケーションの改善、創造性の刺激、協力や強いチームの絆を育むために設計された活動をご用意しています。どのアクティビティも有益で楽しく、参加者全員が貴重な学びを得られるようになっています。</p><p>アートを活用したチームビルディングの価値について詳しくご理解いただけたでしょうか？ もし、チームのために特別な体験を作りたいと思われたら、お気軽にご連絡ください。お客様のニーズや目標に合わせたアクティビティを一緒にデザインするお手伝いをさせていただきます。どんな違いが生まれるか、ぜひ体験してみてください。</p><p><img src="/media/blog/team-building-power/03-Screenshot-2025-03-11-alle-21.40.25.png" alt="" loading="lazy" /></p><p><strong>The power of Team Building</strong></p><p>One of the most popular services offered by Artbar Tokyo since 2017, trusted by both Japanese and foreign firms, is Team Building. From small startups to large corporations, companies across industries are increasingly recognizing the significant impact these creative activities can have on team performance and cohesion. In this article, we’ll explore the reasons why Team Building is becoming increasingly popular, and the concrete benefits this kind of activity brings.</p><p>Team building involves group activities that take participants outside the usual work routine. Through engaging workshops and activities, teams are invited to collaborate in a relaxed and informal setting, offering a fresh perspective on teamwork. These activities do more than break up the workday: when designed and executed effectively, team building creates lasting, positive effects on performance and productivity, contributing to a cohesive and vibrant company culture.</p><p>When practiced regularly, team building activities can significantly enhance a company’s overall “well-being”, a term which refers to the actions a company takes to promote the personal and professional health of its employees, ensuring that work becomes a fulfilling part of their lives. By committing to structured, ongoing efforts, companies can nurture the well-being of their workforce, leading to better results and a more engaged team.</p><p><img src="/media/blog/team-building-power/04-Screenshot-2025-03-14-alle-16.50.54-1536x1015.png" alt="" loading="lazy" />　So, why should a company choose team building? The change of environment and stimulating activities create a safe space where people can feel relaxed and motivated. It’s a holistic strategy aimed at achieving global well-being by providing an experience that allows people to learn without the pressure of a typical work obligation. This leads to several benefits, first on the individual level, then on the team, and ultimately, on company performance:</p><p><strong>Development of Soft Skills</strong>: Active listening, communication, teamwork, and problem-solving are just some examples. Practicing these skills in a relaxed, non-stressful environment helps participants discover new strategies that can significantly help during challenging tasks at work.</p><p><strong>Cohesion and collaboration</strong>: Removing formal barriers brings people closer together, allowing employees to get to know each other better, which reduces tension and fosters collaboration. This will encourage interaction and exchange, and ultimately ensure the success of collaborative projects. Engaging and fun team building activities help reduce individual competition in favor of a shared goal.</p><p><strong>Reducing stress</strong>: Long-term stress and anxiety can negatively impact both an individual’s well-being and their work performance. Informal activities in a relaxed setting provide a break from the pressures of everyday tasks, lowering anxiety levels and allowing employees to recharge mentally.</p><p><strong>Improved mood, motivation and relationships</strong>: A team that celebrates victory together after achieving a significant goal is psychologically encouraged. Similarly, overcoming a challenge with colleagues helps to enhance self-confidence, motivation and fosters trust. This reignites enthusiasm for teamwork, making employees more satisfied with their work environment and more motivated to engage in their daily responsibilities.</p><p><img src="/media/blog/team-building-power/05-Screenshot-2025-03-11-alle-21.40.05.png" alt="" loading="lazy" /></p><p>That said, why should you choose an artistic team building for your company? What are the specific benefits of creative team buildings?</p><p>When it comes to team building, artistic activities stand out for their unique ability to stimulate creative thinking, a highly valuable skill in today’s workplace. In recent years, many environments have favored a strictly technical-rational approach, leading to a decrease in the creative potential of social work. In modern times, there is an increasing need to use critical, transformative, and action-focused methods that can improve team social cohesion, soft skills, and critical-transformative thinking. Furthermore, manual tasks and tactile media, like acrylic paints, offer immersive activities that significantly reduce anxiety and stress levels. These activities are not only enjoyable but provide a break from the daily grind, allowing for greater personal expression and relaxation.</p><p>At Artbar, we also offer all you can drink beverages and all you can eat snacks, while allowing you to arrange your own catering services and bring drinks: eating and drinking together helps further to lower stress and enhance social bonding in a fun and relaxed setting. Beyond the enjoyable atmosphere, here’s what makes our artistic team building experience unique:</p><p><strong>Customization</strong>: Over the years, we have continually adapted to meet our clients’ goals. We listen to your needs and craft a tailored experience based on your specific aims, fully committing to creating an experience that aligns with your company, values, and product.</p><p><strong>Flexible approach</strong>: We understand that each company is different, so we plan activities based on your team’s timeline, available space, and objectives. Our offerings are designed to be adaptable, ensuring that every event meets your team’s unique requirements.</p><p><strong>Targeted games and activities</strong>: We’ve designed activities that are aimed at achieving specific objectives, whether it’s improving communication, stimulating creativity, or fostering collaboration and strong team bonds. Every activity is both useful and fun, ensuring that everyone walks away with valuable takeaways.</p><p><br />
Now that you’ve explored the value of artistic team building in detail, if you’re interested in creating a tailored experience for your team, feel free to contact us. We’d be happy to help you design an activity that aligns with your specific needs and goals. Ready to see the difference it will make?</p><p><img src="/media/blog/team-building-power/06-Screenshot-2025-03-11-alle-21.50.55-1536x1006.png" alt="" loading="lazy" /></p>`
    },
    {
      id: "250953",
      slug: "geijutsu-no-aki",
      published: true,
      image: "/media/blog/geijutsu-no-aki/00-Luci-Autumn-shrine-illumination-1-scaled-e1732529371789-1487x1536.jpg",
      date: "2024.11.29",
      tags: ["Art & Culture", "Travel", "Quotes"],
      titleEn: `Geijutsu no Aki: Autumn as the Art Season in Japan`,
      titleJp: `「芸術の秋」日本のアートシーズン`,
      authorEn: `Daria`,
      authorJp: `Daria`,
      excerptEn: `All four seasons hold a special significance in Japanese culture, but it is autumn that particularly stirs romantic and melancholic emotions in Princess Nukata’s poetry.`,
      excerptJp: `君待つと 吾が恋ひをれば 我が屋戸の すだれ動かし 秋の風吹く As I wait for you in anticipation the blinds of my window flutter but it’s only the autumn breeze 日本の文化において、四季はすべてに特別な意味があります。`,
      contentEn: `<p>君待つと<br />
吾が恋ひをれば<br />
我が屋戸の<br />
すだれ動かし<br />
秋の風吹く<br /><br /><em>As I wait for you<br />
in anticipation<br />
the blinds<br />
of my window flutter<br />
but it’s only the autumn breeze</em></p><p>日本の文化において、四季はすべてに特別な意味があります。秋は特に、額田王の詩のようなロマンティックでメランコリックな感情を呼び起こす季節です。日本の秋は、確かに切ない魅力に満ちており、空気に漂う金木犀の甘い香りや、落ち葉の鮮やかな色彩が織りなす美しい光景などは、見る者をいつも感動させてくれます。</p><p>All four seasons hold a special significance in Japanese culture, but it is autumn that particularly stirs romantic and melancholic emotions in Princess Nukata’s poetry. Japanese autumn is indeed imbued with a wistful charm, characterized by the sweet scent of osmanthus in the air and the vibrant colors of falling leaves, creating a breathtaking spectacle that never fails to inspire.</p><p><img src="/media/blog/geijutsu-no-aki/01-Screenshot-2024-10-28-alle-22.09.32-1-1536x771.png" alt="&quot;Shinshu Sarashina, Moon Over Rice Fields&quot;, Utagawa Hiroshige, 1857, Woodblock print, The Metropolitan Museum of Art (New York)A woodblock print by Utagawa Hiroshige from 1857, part of his Three Views of Shinshu Sarashina. The scene depicts a serene moonlit landscape over rice fields, capturing the tranquil beauty of rural Japan during the harvest season." loading="lazy" /></p><p><em>“Shinshu Sarashina, Moon Over Rice Fields”, Utagawa Hiroshige, 1857, Woodblock print, The Metropolitan Museum of Art (New York)</em></p><p>毎年、多くの人々が紅葉狩りに出かけ、素晴らしい風景を観覧し、秋の季節に自然が見せる美しい色合いを楽しみます。紅葉狩りは、秋の葉の美しさと芸術的な感性が融合した日本の伝統的な文化で、古代から現代に至るまで人々を魅了し続けています。この伝統は、759年頃に成立した最古の日本の詩集である『万葉集』に見ることができるように、古くから歴史に根ざしています。紅葉狩りは、奈良時代や平安時代に起源があり、宮廷で最も優雅な遊びのひとつと見なされていました。貴族たちは、秋の紅葉を楽しみながら詩を詠み、宴を開くために山へ出かけました。</p><p>Every year, hundreds of people embark on autumn foliage hunts, eager to capture amazing landscapes and admire the stunning hues that nature presents during this season. Momijigari (maple leaf hunting) is a Japanese tradition that intertwines the beauty of autumn leaves with an artistic sensibility, captivating people from ancient times to the present. This phenomenon is rooted in history, as evidenced by the Manyōshū (Collection of Ten Thousand Leaves), the oldest existing anthology of Japanese poetry dating back to around 759 AD. It seems that Momijigari originated during the Nara and Heian periods, where it was regarded as one of the most elegant pastimes at court. Nobles would travel to the mountains specifically to compose poetry and feast while admiring the autumn foliage.</p><p><img src="/media/blog/geijutsu-no-aki/02-Kunisada_momijikarinozu.jpg" alt="&quot;Maple-leaf Viewing&quot; (Momijigari no zu), Utagawa Kunisada, 1850s, Woodblock print, Private Collection. A woodblock print by Utagawa Kunisada from the 1850s depicting the traditional Japanese pastime of viewing autumn maple leaves (momijigari). The scene captures people enjoying the vibrant red and yellow foliage during the autumn season." loading="lazy" /></p><p><em>“Maple-leaf Viewing” (Momijigari no zu), Utagawa Kunisada, 1850s, Woodblock print, Private Collection</em></p><p>何世紀にもわたり、日本における秋と芸術の結びつきは深まってきました。江戸時代には、広重、国貞、北斎などの浮世絵師たちが秋や紅葉狩りを題材にした作品を多く残しました。それ以来、「芸術の秋」や「美術の秋」という表現が登場し、秋が芸術を楽しむ最良の季節であることが示されるようになりました。これらの言葉は1918年に雑誌『新潮』で初めて使われ、現在でも広く使われています。<br /></p><p>Over the centuries, the connection between the arts and the fall season in Japan has deepened significantly. During the Edo period, many Ukiyo-e masters, from Hiroshige to Kunisada and Hokusai, chose autumn and Momijigari as subjects for their works. Since then, common expressions such as ‘geijutsu no aki’ and ‘bijutsu no aki’ (autumn for the arts) have emerged to indicate that autumn is the best season to enjoy art. These terms were first used in 1918 by the magazine Shincho (New Tide) and remain in common use today.</p><p><img src="/media/blog/geijutsu-no-aki/03-Tawaraya_Sori_-_-_Autumn_Maple_Trees_-_TL42147.39_-_Harvard_Art_Museums-1-1536x555.jpg" alt="An 18th-century hanging scroll by Tawaraya Sōri depicting autumn maple trees. The artwork captures the vibrant colors of the fall season, with vivid red and orange leaves set against a serene, minimalist landscape typical of Japanese ink painting." loading="lazy" /></p><p><em>“Autumn Maple Trees”, Tawaraya Sōri, 18th century, Hanging scroll, Harvard Art Museums (Cambridge)</em></p><p>秋はまた、世界中のアーティストにインスピレーションを与えてきました。紅葉狩りのような日本特有の文化が秋の本質を捉えている一方で、秋を象徴するものは多くの文化で見られます。秋はぶどう、栗、きのこ、かぼちゃなどを連想させ、静物画のモチーフとしても最適です。ルネサンス時代には、これらの秋のモチーフを用いて、深い明暗と精緻な写実的な絵が描かれました。代表的な作品には、ジュゼッペ・アルチンボルドのユニークな『秋』や、カラヴァッジオの力強い『バッカス』があります。</p><p>Autumn has also inspired artists across the world. While uniquely Japanese elements like Momijigari capture the essence of this season, many symbols are found across cultures. Autumn brings to mind grapes, chestnuts, mushrooms, and pumpkins, making it the quintessential season for still life. During the Renaissance, numerous works highlighted these autumnal themes with deep chiaroscuro and detailed realism. Notable examples include Giuseppe Arcimboldo’s whimsical ‘Autumn’ and Caravaggio’s intense ‘Bacchus’.</p><p><img src="/media/blog/geijutsu-no-aki/04-Giuseppe_Arcimboldo_-_Autumn_1573.jpg" alt="&quot;Autumn&quot;, Giuseppe Arcimboldo, 1573, Oil on canvas, Kunsthistorisches Museum (Vienna)A portrait made from various autumnal elements like fruits, vegetables, and leaves, created by Giuseppe Arcimboldo in 1573. The painting merges nature with human form in a surreal and symbolic composition." loading="lazy" /></p><p><em>“Autumn”, Giuseppe Arcimboldo, 1573, Oil on canvas, Kunsthistorisches Museum (Vienna)</em></p><p><img src="/media/blog/geijutsu-no-aki/05-Bacco-Michelangelo-Merisi-Caravaggio.jpeg" alt="&quot;Bacchus&quot;, Michelangelo Buonarroti, 1496-1497, Marble, Galleria Borghese (Rome)A marble sculpture of Bacchus, the Roman god of wine, created by Michelangelo around 1496-1497. The statue portrays Bacchus in a playful, inebriated pose, demonstrating Michelangelo’s skill in capturing human anatomy and emotion." loading="lazy" /></p><p><em>“Bacchus”, Michelangelo Buonarroti, 1496-1497, Marble, Galleria Borghese (Rome)</em></p><p>秋の魅力的な点は、鮮やかな色彩とメランコリックな雰囲気の対比です。カンディンスキーの『秋の川』のような作品は、明るい色彩と力強い筆致で活気に満ちた気分を表現しています。一方、エゴン・シーレの『秋の太陽』のような作品は、寒い冬に備えるメランコリックで疲れた秋を賛美しています。</p><p>An intriguing aspect of autumn lies in its contrast of vibrant colors and melancholic atmosphere. Some works, like Kandinsky’s ‘Autumn River’, embody lively moods with bright colors and bold brushstrokes. Conversely, pieces like Egon Schiele’s ‘Autumn sun‘ pay homage to a deeply melancholic and weary autumn, preparing for the cold of winter.</p><p><img src="/media/blog/geijutsu-no-aki/06-Egon-schiele-autumn-sun.jpg" alt="&quot;Autumn Sun and Trees&quot;, Egon Schiele, 1914, Oil on canvas, Private CollectionAn expressive depiction of autumn by Egon Schiele, featuring vivid colors and dynamic lines. The painting conveys the fleeting transition of the season, capturing both warmth and impending chill." loading="lazy" /></p><p><em>“Autumn Sun and Trees”, Egon Schiele, 1914, Oil on canvas, Private Collection</em></p><p><img src="/media/blog/geijutsu-no-aki/07-Screenshot-2024-11-24-alle-18.20.54-1536x965.png" alt="&quot;Autumn River&quot;, Wassily Kandinsky, 1911, Oil on canvas, The State Tretyakov Gallery (Moscow)An abstract painting by Wassily Kandinsky, Autumn River uses vibrant colors and swirling forms to evoke the flowing movement of a river during autumn, reflecting Kandinsky&#x27;s exploration of color and emotional expression." loading="lazy" /></p><p><em>“Autumn River”, Wassily Kandinsky, 1911, Oil on canvas, The State Tretyakov Gallery (Moscow)</em></p><p>もしこの記事があなたの詩的な感覚を刺激し、あなたの秋を芸術で表現したい気持ちになったなら、ぜひArtbar Tokyoで、紅葉の美しさをキャンバスに描きに来てください！ 金箔を施した魅惑的な葉から、鮮やかな秋の風景まで、お好みのデザインを選んで、この美しい季節を一緒に迎えましょう。お待ちしています！</p><p>If this article has sparked your poetic spirit and you feel inspired to celebrate autumn through your artistic flair, join us at Artbar Tokyo to capture the beauty of maple leaves directly onto your canvas! Pick your favorite design, from enchanting leaves with golden foil to vibrant autumn landscapes, and join us in welcoming this beautiful season. We look forward to seeing you!</p><p><img src="/media/blog/geijutsu-no-aki/08-IMG_0882-1-scaled-e1732530604995-1345x1536.jpg" alt="" loading="lazy" /></p><p><img src="/media/blog/geijutsu-no-aki/09-Luci-autumn-impression.jpg" alt="" loading="lazy" /></p>`,
      contentJp: `<p>君待つと<br />
吾が恋ひをれば<br />
我が屋戸の<br />
すだれ動かし<br />
秋の風吹く<br /><br /><em>As I wait for you<br />
in anticipation<br />
the blinds<br />
of my window flutter<br />
but it’s only the autumn breeze</em></p><p>日本の文化において、四季はすべてに特別な意味があります。秋は特に、額田王の詩のようなロマンティックでメランコリックな感情を呼び起こす季節です。日本の秋は、確かに切ない魅力に満ちており、空気に漂う金木犀の甘い香りや、落ち葉の鮮やかな色彩が織りなす美しい光景などは、見る者をいつも感動させてくれます。</p><p>All four seasons hold a special significance in Japanese culture, but it is autumn that particularly stirs romantic and melancholic emotions in Princess Nukata’s poetry. Japanese autumn is indeed imbued with a wistful charm, characterized by the sweet scent of osmanthus in the air and the vibrant colors of falling leaves, creating a breathtaking spectacle that never fails to inspire.</p><p><img src="/media/blog/geijutsu-no-aki/01-Screenshot-2024-10-28-alle-22.09.32-1-1536x771.png" alt="&quot;Shinshu Sarashina, Moon Over Rice Fields&quot;, Utagawa Hiroshige, 1857, Woodblock print, The Metropolitan Museum of Art (New York)A woodblock print by Utagawa Hiroshige from 1857, part of his Three Views of Shinshu Sarashina. The scene depicts a serene moonlit landscape over rice fields, capturing the tranquil beauty of rural Japan during the harvest season." loading="lazy" /></p><p><em>“Shinshu Sarashina, Moon Over Rice Fields”, Utagawa Hiroshige, 1857, Woodblock print, The Metropolitan Museum of Art (New York)</em></p><p>毎年、多くの人々が紅葉狩りに出かけ、素晴らしい風景を観覧し、秋の季節に自然が見せる美しい色合いを楽しみます。紅葉狩りは、秋の葉の美しさと芸術的な感性が融合した日本の伝統的な文化で、古代から現代に至るまで人々を魅了し続けています。この伝統は、759年頃に成立した最古の日本の詩集である『万葉集』に見ることができるように、古くから歴史に根ざしています。紅葉狩りは、奈良時代や平安時代に起源があり、宮廷で最も優雅な遊びのひとつと見なされていました。貴族たちは、秋の紅葉を楽しみながら詩を詠み、宴を開くために山へ出かけました。</p><p>Every year, hundreds of people embark on autumn foliage hunts, eager to capture amazing landscapes and admire the stunning hues that nature presents during this season. Momijigari (maple leaf hunting) is a Japanese tradition that intertwines the beauty of autumn leaves with an artistic sensibility, captivating people from ancient times to the present. This phenomenon is rooted in history, as evidenced by the Manyōshū (Collection of Ten Thousand Leaves), the oldest existing anthology of Japanese poetry dating back to around 759 AD. It seems that Momijigari originated during the Nara and Heian periods, where it was regarded as one of the most elegant pastimes at court. Nobles would travel to the mountains specifically to compose poetry and feast while admiring the autumn foliage.</p><p><img src="/media/blog/geijutsu-no-aki/02-Kunisada_momijikarinozu.jpg" alt="&quot;Maple-leaf Viewing&quot; (Momijigari no zu), Utagawa Kunisada, 1850s, Woodblock print, Private Collection. A woodblock print by Utagawa Kunisada from the 1850s depicting the traditional Japanese pastime of viewing autumn maple leaves (momijigari). The scene captures people enjoying the vibrant red and yellow foliage during the autumn season." loading="lazy" /></p><p><em>“Maple-leaf Viewing” (Momijigari no zu), Utagawa Kunisada, 1850s, Woodblock print, Private Collection</em></p><p>何世紀にもわたり、日本における秋と芸術の結びつきは深まってきました。江戸時代には、広重、国貞、北斎などの浮世絵師たちが秋や紅葉狩りを題材にした作品を多く残しました。それ以来、「芸術の秋」や「美術の秋」という表現が登場し、秋が芸術を楽しむ最良の季節であることが示されるようになりました。これらの言葉は1918年に雑誌『新潮』で初めて使われ、現在でも広く使われています。<br /></p><p>Over the centuries, the connection between the arts and the fall season in Japan has deepened significantly. During the Edo period, many Ukiyo-e masters, from Hiroshige to Kunisada and Hokusai, chose autumn and Momijigari as subjects for their works. Since then, common expressions such as ‘geijutsu no aki’ and ‘bijutsu no aki’ (autumn for the arts) have emerged to indicate that autumn is the best season to enjoy art. These terms were first used in 1918 by the magazine Shincho (New Tide) and remain in common use today.</p><p><img src="/media/blog/geijutsu-no-aki/03-Tawaraya_Sori_-_-_Autumn_Maple_Trees_-_TL42147.39_-_Harvard_Art_Museums-1-1536x555.jpg" alt="An 18th-century hanging scroll by Tawaraya Sōri depicting autumn maple trees. The artwork captures the vibrant colors of the fall season, with vivid red and orange leaves set against a serene, minimalist landscape typical of Japanese ink painting." loading="lazy" /></p><p><em>“Autumn Maple Trees”, Tawaraya Sōri, 18th century, Hanging scroll, Harvard Art Museums (Cambridge)</em></p><p>秋はまた、世界中のアーティストにインスピレーションを与えてきました。紅葉狩りのような日本特有の文化が秋の本質を捉えている一方で、秋を象徴するものは多くの文化で見られます。秋はぶどう、栗、きのこ、かぼちゃなどを連想させ、静物画のモチーフとしても最適です。ルネサンス時代には、これらの秋のモチーフを用いて、深い明暗と精緻な写実的な絵が描かれました。代表的な作品には、ジュゼッペ・アルチンボルドのユニークな『秋』や、カラヴァッジオの力強い『バッカス』があります。</p><p>Autumn has also inspired artists across the world. While uniquely Japanese elements like Momijigari capture the essence of this season, many symbols are found across cultures. Autumn brings to mind grapes, chestnuts, mushrooms, and pumpkins, making it the quintessential season for still life. During the Renaissance, numerous works highlighted these autumnal themes with deep chiaroscuro and detailed realism. Notable examples include Giuseppe Arcimboldo’s whimsical ‘Autumn’ and Caravaggio’s intense ‘Bacchus’.</p><p><img src="/media/blog/geijutsu-no-aki/04-Giuseppe_Arcimboldo_-_Autumn_1573.jpg" alt="&quot;Autumn&quot;, Giuseppe Arcimboldo, 1573, Oil on canvas, Kunsthistorisches Museum (Vienna)A portrait made from various autumnal elements like fruits, vegetables, and leaves, created by Giuseppe Arcimboldo in 1573. The painting merges nature with human form in a surreal and symbolic composition." loading="lazy" /></p><p><em>“Autumn”, Giuseppe Arcimboldo, 1573, Oil on canvas, Kunsthistorisches Museum (Vienna)</em></p><p><img src="/media/blog/geijutsu-no-aki/05-Bacco-Michelangelo-Merisi-Caravaggio.jpeg" alt="&quot;Bacchus&quot;, Michelangelo Buonarroti, 1496-1497, Marble, Galleria Borghese (Rome)A marble sculpture of Bacchus, the Roman god of wine, created by Michelangelo around 1496-1497. The statue portrays Bacchus in a playful, inebriated pose, demonstrating Michelangelo’s skill in capturing human anatomy and emotion." loading="lazy" /></p><p><em>“Bacchus”, Michelangelo Buonarroti, 1496-1497, Marble, Galleria Borghese (Rome)</em></p><p>秋の魅力的な点は、鮮やかな色彩とメランコリックな雰囲気の対比です。カンディンスキーの『秋の川』のような作品は、明るい色彩と力強い筆致で活気に満ちた気分を表現しています。一方、エゴン・シーレの『秋の太陽』のような作品は、寒い冬に備えるメランコリックで疲れた秋を賛美しています。</p><p>An intriguing aspect of autumn lies in its contrast of vibrant colors and melancholic atmosphere. Some works, like Kandinsky’s ‘Autumn River’, embody lively moods with bright colors and bold brushstrokes. Conversely, pieces like Egon Schiele’s ‘Autumn sun‘ pay homage to a deeply melancholic and weary autumn, preparing for the cold of winter.</p><p><img src="/media/blog/geijutsu-no-aki/06-Egon-schiele-autumn-sun.jpg" alt="&quot;Autumn Sun and Trees&quot;, Egon Schiele, 1914, Oil on canvas, Private CollectionAn expressive depiction of autumn by Egon Schiele, featuring vivid colors and dynamic lines. The painting conveys the fleeting transition of the season, capturing both warmth and impending chill." loading="lazy" /></p><p><em>“Autumn Sun and Trees”, Egon Schiele, 1914, Oil on canvas, Private Collection</em></p><p><img src="/media/blog/geijutsu-no-aki/07-Screenshot-2024-11-24-alle-18.20.54-1536x965.png" alt="&quot;Autumn River&quot;, Wassily Kandinsky, 1911, Oil on canvas, The State Tretyakov Gallery (Moscow)An abstract painting by Wassily Kandinsky, Autumn River uses vibrant colors and swirling forms to evoke the flowing movement of a river during autumn, reflecting Kandinsky&#x27;s exploration of color and emotional expression." loading="lazy" /></p><p><em>“Autumn River”, Wassily Kandinsky, 1911, Oil on canvas, The State Tretyakov Gallery (Moscow)</em></p><p>もしこの記事があなたの詩的な感覚を刺激し、あなたの秋を芸術で表現したい気持ちになったなら、ぜひArtbar Tokyoで、紅葉の美しさをキャンバスに描きに来てください！ 金箔を施した魅惑的な葉から、鮮やかな秋の風景まで、お好みのデザインを選んで、この美しい季節を一緒に迎えましょう。お待ちしています！</p><p>If this article has sparked your poetic spirit and you feel inspired to celebrate autumn through your artistic flair, join us at Artbar Tokyo to capture the beauty of maple leaves directly onto your canvas! Pick your favorite design, from enchanting leaves with golden foil to vibrant autumn landscapes, and join us in welcoming this beautiful season. We look forward to seeing you!</p><p><img src="/media/blog/geijutsu-no-aki/08-IMG_0882-1-scaled-e1732530604995-1345x1536.jpg" alt="" loading="lazy" /></p><p><img src="/media/blog/geijutsu-no-aki/09-Luci-autumn-impression.jpg" alt="" loading="lazy" /></p>`
    },
    {
      id: "246399",
      slug: "halloween-history-art-celebrations",
      published: true,
      image: "/media/blog/halloween-history-art-celebrations/00-Wolgemut_1493_-Danse-macabre.jpeg",
      date: "2024.10.01",
      tags: ["Halloween", "Holiday Season", "Art & Culture"],
      titleEn: `Halloween: History, Art, and Celebrations`,
      titleJp: `ハロウィンの季節が到来！その歴史やアートについてのお話`,
      authorEn: `Daria`,
      authorJp: `Daria`,
      excerptEn: `Halloween is a well-known and popular holiday worldwide, but have you ever wondered about its origins and how it has been represented in art across different cultures and historical periods?`,
      excerptJp: `ハロウィンは世界中でよく知られた人気のあるお祭りですが、その起源や歴史、アートの中でどんな表現をされてきたか、考えたことはありますか？`,
      contentEn: `<p><em>Cover image: Danse Macabre, Michael Wolgemut, 1493, woodcut, dimensions vary, from the Nuremberg Chronicle</em></p><p>ハロウィンは世界中でよく知られた人気のあるお祭りですが、その起源や歴史、アートの中でどんな表現をされてきたか、考えたことはありますか？<br />
Halloween is a well-known and popular holiday worldwide, but have you ever wondered about its origins and how it has been represented in art across different cultures and historical periods?</p><p>ハロウィンの起源は非常に古く、宗教的な基盤を持っており、サウィン祭（Samhain）というケルトの祝祭に遡ります。この祭りは収穫を迎え、先祖を敬うことに捧げられています。9世紀頃、キリスト教がアイルランドやスコットランドに広がると、この異教の祭りはキリスト教の祝いに再構成されました。この影響により、「オールハロウズイブ（All Hallows’ Eve）」という名前に変更され、最終的には現代の「ハロウィン」へと変化し、キリスト教徒のために教会のすべての聖人を祝うお祭りとなりました。<br />
ハロウィンは18世紀後半にアイルランド系移民を通じてアメリカに到着し、20世紀後半になってようやく日本に輸入されました。それ以来、主流のポップなイベントとなり、ほとんどの宗教的意味合いは失われましたが、恐ろしい雰囲気は残っています。</p><p>The roots of Halloween are quite ancient and have a religious basis, dating back to the festival of Samhain, a Celtic celebration dedicated to welcoming the harvest and honouring ancestors. Around the Ninth century, as Christianity spread in Ireland and Scotland, this pagan festivity was reframed as a Christian celebration. This influence led to the name changing to “All Hallows’ Eve”, which eventually morphed into “Halloween” in modern times, becoming an occasion to celebrate all the saints of the church for Christians.<br />
Halloween arrived in America through the Irish later during the Eighteenth century, and it was not until the second half of the Twentieth century that it was then imported to Japan. Since then, this holiday has become a pop and mainstream event which has lost most of its religious connotation, but not its spooky atmosphere!</p><p><img src="/media/blog/halloween-history-art-celebrations/01-Francisco_de_Goya_y_Lucientes_-_Witches-_Sabbath_-The_Great_He-Goat-.jpg" alt="Large mural painting depicting a dark gathering of witches around a goat figure, representing themes of superstition and the supernatural, by Francisco de Goya." loading="lazy" /></p><p><em>Witches’ Sabbath, Francisco de Goya, 1821–1823, oil on plaster wall (transferred to canvas), dimensions: 140.5 × 435.7 cm (56 × 172 in), Museo del Prado, Madrid.</em></p><p>日本におけるハロウィンの人気は2000年代に、東京ディズニーランドやユニバーサル・スタジオ・ジャパンなどの著名なテーマパークを通じて爆発的に広まりました。それ以来、お祭りは拡大し、色とりどりの野外パーティーが開催され、さまざまなコスチュームが大都市の通りを練り歩いています。しかし、2023年以降、渋谷や新宿などの東京の特定の地域では安全上の理由から街頭イベントが制限されています。クリエイティブにハロウィンを祝いたい方、友達と安全で楽しい環境で乾杯したい方は、ぜひArtbar Tokyoにお越しください!</p><p>The popularity of Halloween in Japan exploded in the 2000s through renowned theme parks, such as Tokyo Disney and Universal Studios Japan. Since then, celebrations have expanded, featuring colorful outdoor parties where costumes of all kinds parade through the streets of major cities. However, since 2023 there have been restrictions in certain areas of Tokyo, such as Shibuya and Shinjuku, which have reduced street events for safety reasons. If you want to celebrate Halloween creatively and raise a toast with your friends in a safe and fun environment, join us at Artbar Tokyo!</p><p><strong></strong><strong><img src="/media/blog/halloween-history-art-celebrations/02-0-1.jpeg" alt="" loading="lazy" /></strong></p><p>現代のハロウィンは比較的新しい祝いですが、死、精神性、そして来世を象徴する概念ははるかに古いものです。何世紀にもわたり、さまざまな繰り返されるテーマや芸術形式がこれらのトピックを探求してきました。たとえば、中世のヨーロッパでは、「死の勝利」や「死の舞踏」などの不気味な表現が制作され、命ある世界と死者の世界との出会いを描くことを意図していました。そこで、死は常に優位に立っていました。これらの作品は、ラテン語で「死ななければならないことを忘れるな」という意味のメメント・モリ（Memento Mori）として機能し、私たち全員が死に直面する運命にあることを思い起こさせるものでした。この概念は、日本文学に由来する「もののあわれ」という有名な日本の考え方を思い起こさせます。これは儚さと無常を示し、すべての人が死ぬ運命にあり、すべてのものには終わりがあることを思い出させます。</p><p>While modern Halloween is a relatively recent celebration, the concepts of death, spirituality and the afterlife it embodies are much more ancient. Throughout the centuries, various recurring themes and artistic forms have explored these topics. For instance, during the Middle Ages in Europe, macabre representations such as “The Triumph of Death” and “The Dance of Death,” were produced, intended to depict the encounter between the world of the living and the dead, where death always prevailed. These artworks served as a<em> Memento Mori</em> (from Latin, meaning “remember you must die”), a reminder that we are all destined to face death no matter what. This concept might recall the famous Japanese notion of <em>Mono No Aware</em>, an expression originated from Japanese literature that denotes transience and impermanence, reminding us that everyone is fated to die and all things come to an end.</p><p><img src="/media/blog/halloween-history-art-celebrations/03-image-3.jpg" alt="An 18th-century painting depicting the Dance Macabre, showcasing skeletal figures dancing with the living, symbolizing the universality of death and the fleeting nature of life." loading="lazy" /></p><p><em>A detail from an 18th-century oil painting depiction of the Dance of Death, 72 x 55 cm, Wellcome collection, London</em></p><p>多くの現代アーティストもまた、より暗く不安を引き起こすテーマに取り組んでいます。注目すべき例として、ヘンリック・フュッスリが挙げられます。彼は夢のようなロマンチックな雰囲気の中で、悪夢のようなシーンや暴力的なイメージを描きました。もう一人の象徴的なアーティストはフランシスコ・ゴヤで、彼の鋭くグロテスクなスタイルは、数多くの魔女狩りや残酷な行為を描写しました。</p><p>Many modern artists have also delved into darker and more unsettling themes. A remarkable example is Heinrich Füssli, who illustrated nightmarish scenes and violent imagery with a oneiric and romantic atmosphere. Another emblematic artist is Francisco Goya, whose incisive and grotesque style portrayed numerous acts of witchcraft and cruelty.</p><p><img src="/media/blog/halloween-history-art-celebrations/04-Henry_Fuseli_-1741-1825-_The_Nightmare-_1781.jpg" alt="Henry Fuseli (1741–1825) The Nightmare 1781 Oil on canvas. Oil painting depicting a woman in a deep sleep, with a menacing incubus perched on her chest and a ghostly horse looming in the background, illustrating themes of fear and the subconscious." loading="lazy" /></p><p><em>The Nightmare, Heinrich Füssli (or Henry Fuseli), 1781, oil on canvas, dimensions: 101.6 cm × 127.6 cm, Detroit Institute of Arts</em></p><p><img src="/media/blog/halloween-history-art-celebrations/05-Francisco_de_Goya_y_Lucientes_-_Witches_Sabbath_-_Google_Art_Project.jpg" alt="Oil painting depicting a gathering of witches around a large goat figure, symbolizing dark themes of superstition and fear of the supernatural, by Francisco de Goya." loading="lazy" /></p><p><em>Witches’ Sabbath (The Great He-Goat), Francisco de Goya, 1789, oil on canvas, dimensions: 121 cm × 280 cm, Prado Museum, Madrid.</em></p><p>興味深いことに、非常に人気のあるアーティストの中にも、より不気味な作品があまり知られていないものがあります。たとえば、著名なポスト印象派のアーティストであるフィンセント・ファン・ゴッホは、初期のキャリアで「燃えるタバコをくわえた骸骨」を描きました。同様に、メキシコのアーティストフリーダ・カーロも死をテーマにし、象徴やより明示的な表現を用いました。メキシコのポップカルチャーにおいて、死は根本的な要素であり、有名な死者の日（Día de los Muertos）に見られます。このメキシコの祝日は、亡くなった人を敬うための色とりどりの祭りが特徴で、ハロウィン特有の陰鬱で不気味な雰囲気とは対照的に、楽しく活気に満ちた雰囲気を持っています。死者の日には、人々が頭蓋骨にインスパイアされた顔をペイントし、亡くなった人の魂に食べ物や色とりどりの花を捧げます。私たちアートバーでは、喜びをもって祝うことが大好きなので、死者の日をテーマにしたクラスも開催します！</p><p>Interestingly, there are also extremely popular artists whose more macabre works are not particularly well known. For instance, the renowned post-impressionist artist Vincent Van Gogh painted “Skull of a Skeleton with Burning Cigarette” in his early career. Similarly, the Mexican artist Frida Kahlo addressed the theme of death, employing both symbolism and more explicit representations. In Mexican popular culture, death is a fundamental element, as we see in the famous Día de los Muertos (Day of the Dead). This Mexican holiday is characterized by vibrant festivities to honor the deceased, which carries a joyful and lively atmosphere that contrasts with the gloomy and spooky vibe typical of Halloween. During Día de los Muertos, people paint their faces inspired by skulls and offer food and colorful flowers to the souls of the departed. Here at Artbar Tokyo, where we love to celebrate with joy, we will also celebrate Día de los Muertos with a themed class!</p><p><img src="/media/blog/halloween-history-art-celebrations/06-1280px-Vincent_van_Gogh_-_Head_of_a_skeleton_with_a_burning_cigarette_-_Google_Art_Project.jpg" alt="Vincent Van Gogh: Head of a skeleton burning cigarette. A skeleton, turned 45 degrees to the right and rendered only from shoulders and above. The skull clenches a lit cigarette between its teeth. The painting is rendered in somber tones of ivory, brown, and black, in thick yet detailed brushstrokes that reveal the texture of the canvas in places." loading="lazy" /></p><p><em>Skeleton with Burning Cigarette, Vincent van Gogh, 1886, oil on canvas, dimensions: 60.3 cm × 50.2 cm, private collection. From 4 October 2024 until 26 January 2025 this painting is on view in the exhibition “Gothic Modern: From Darkness to Light” at the Atheneum Art Museum, Helsinki, Finland.</em></p><p><img src="/media/blog/halloween-history-art-celebrations/07-Screen-Shot-2020-10-09-at-1.00.02-PM.jpg" alt="Dia de los muertos class at Artbar Tokyo, with people showing colorfull skulls they painted" loading="lazy" /></p><p>日本の芸術の歴史においても、死、霊、そして来世を想起させる恐ろしいシンボルが豊富に存在します。この伝統は、幽霊（ゆうれい）や妖怪（ようかい）の図像学に特に顕著であり、浮世絵（うきよえ）に頻繁に描かれています。「歌川国芳の骸骨に立ち向かう光国」や「北斎の皿屋敷」などのアイコニックな傑作は、死をテーマにした恐ろしいシンボルが民間伝承の一部であり、日本の美術史で表現されている素晴らしい例です。</p><p>Even in the history of Japanese art, there is an abundance of frightening symbols that evoke themes of death, spirits, and the afterlife. This tradition is particularly evident in the iconography of <em>yūrei</em> (ghosts) and <em>yōkai</em> (supernatural creatures), which are frequently depicted in<em> Ukiyo-e</em> (woodblock prints). Iconic masterpieces such as “Mitsukuni Defying the Skeleton” by Utagawa Kuniyoshi and “Sarayashiki” by Hokusai are great examples of how deadly and scary symbols are part of folklore and are represented in Japanese art history.</p><p><img src="/media/blog/halloween-history-art-celebrations/08-Takiyasha_the_Witch_and_the_Skeleton_Spectre.jpg" alt="Mitsukuni Defying the Skeleton Ghost, Kuniyoshi. Woodblock print depicting Mitsukuni confronting a skeletal ghost, showcasing Kuniyoshi&#x27;s dynamic style and themes of bravery and the supernatural in Japanese folklore." loading="lazy" /></p><p><em>Mitsukuni Defying the Skeleton Ghost, Utagawa Kuniyoshi, 1850, woodblock print, dimensions: 36.5 cm × 25.2 cm, private collection.</em></p><p><img src="/media/blog/halloween-history-art-celebrations/09-Hokusai_Sarayashiki.jpg" alt="Sarayashiki (The House of Broken Plates) by Hokusai. Woodblock print illustrating the eerie scene of Sarayashiki, featuring a ghostly figure and broken plates, reflecting themes of hauntings and the supernatural in Japanese folklore by Hokusai.&quot;" loading="lazy" /></p><p><em>Sarayashiki (The House of Broken Plates), Katsushika Hokusai, 1835, woodblock print, dimensions: 25.7 cm × 37.8 cm, private collection.</em></p><p>このハロウィンシーズンに関連する陰鬱で魅力的なアート作品を描く意外な多様なアーティストを見てきましたが、私たちが実際に会うのを楽しみにしている現代のアーティストもいます。そう、あなたのことを話しているのです！神秘的な風景を描きたいのか、死者の日のスタイルで明るいポートレートを描きたいのか、Artbar Tokyoで一緒にスプーキーなシーズンを祝うのを楽しみにしています！</p><p>We’ve seen several unexpected and diverse artists portraying gloomy and fascinating art pieces related to this Halloween season, but there are contemporary artists we can’t wait to meet in person: Yes, we’re talking about you! No matter whether you want to paint a mysterious landscape or a cheerful portrait in the style of Día de los Muertos, we look forward to seeing you at Artbar Tokyo to celebrate the spooky season together!</p>`,
      contentJp: `<p><em>Cover image: Danse Macabre, Michael Wolgemut, 1493, woodcut, dimensions vary, from the Nuremberg Chronicle</em></p><p>ハロウィンは世界中でよく知られた人気のあるお祭りですが、その起源や歴史、アートの中でどんな表現をされてきたか、考えたことはありますか？<br />
Halloween is a well-known and popular holiday worldwide, but have you ever wondered about its origins and how it has been represented in art across different cultures and historical periods?</p><p>ハロウィンの起源は非常に古く、宗教的な基盤を持っており、サウィン祭（Samhain）というケルトの祝祭に遡ります。この祭りは収穫を迎え、先祖を敬うことに捧げられています。9世紀頃、キリスト教がアイルランドやスコットランドに広がると、この異教の祭りはキリスト教の祝いに再構成されました。この影響により、「オールハロウズイブ（All Hallows’ Eve）」という名前に変更され、最終的には現代の「ハロウィン」へと変化し、キリスト教徒のために教会のすべての聖人を祝うお祭りとなりました。<br />
ハロウィンは18世紀後半にアイルランド系移民を通じてアメリカに到着し、20世紀後半になってようやく日本に輸入されました。それ以来、主流のポップなイベントとなり、ほとんどの宗教的意味合いは失われましたが、恐ろしい雰囲気は残っています。</p><p>The roots of Halloween are quite ancient and have a religious basis, dating back to the festival of Samhain, a Celtic celebration dedicated to welcoming the harvest and honouring ancestors. Around the Ninth century, as Christianity spread in Ireland and Scotland, this pagan festivity was reframed as a Christian celebration. This influence led to the name changing to “All Hallows’ Eve”, which eventually morphed into “Halloween” in modern times, becoming an occasion to celebrate all the saints of the church for Christians.<br />
Halloween arrived in America through the Irish later during the Eighteenth century, and it was not until the second half of the Twentieth century that it was then imported to Japan. Since then, this holiday has become a pop and mainstream event which has lost most of its religious connotation, but not its spooky atmosphere!</p><p><img src="/media/blog/halloween-history-art-celebrations/01-Francisco_de_Goya_y_Lucientes_-_Witches-_Sabbath_-The_Great_He-Goat-.jpg" alt="Large mural painting depicting a dark gathering of witches around a goat figure, representing themes of superstition and the supernatural, by Francisco de Goya." loading="lazy" /></p><p><em>Witches’ Sabbath, Francisco de Goya, 1821–1823, oil on plaster wall (transferred to canvas), dimensions: 140.5 × 435.7 cm (56 × 172 in), Museo del Prado, Madrid.</em></p><p>日本におけるハロウィンの人気は2000年代に、東京ディズニーランドやユニバーサル・スタジオ・ジャパンなどの著名なテーマパークを通じて爆発的に広まりました。それ以来、お祭りは拡大し、色とりどりの野外パーティーが開催され、さまざまなコスチュームが大都市の通りを練り歩いています。しかし、2023年以降、渋谷や新宿などの東京の特定の地域では安全上の理由から街頭イベントが制限されています。クリエイティブにハロウィンを祝いたい方、友達と安全で楽しい環境で乾杯したい方は、ぜひArtbar Tokyoにお越しください!</p><p>The popularity of Halloween in Japan exploded in the 2000s through renowned theme parks, such as Tokyo Disney and Universal Studios Japan. Since then, celebrations have expanded, featuring colorful outdoor parties where costumes of all kinds parade through the streets of major cities. However, since 2023 there have been restrictions in certain areas of Tokyo, such as Shibuya and Shinjuku, which have reduced street events for safety reasons. If you want to celebrate Halloween creatively and raise a toast with your friends in a safe and fun environment, join us at Artbar Tokyo!</p><p><strong></strong><strong><img src="/media/blog/halloween-history-art-celebrations/02-0-1.jpeg" alt="" loading="lazy" /></strong></p><p>現代のハロウィンは比較的新しい祝いですが、死、精神性、そして来世を象徴する概念ははるかに古いものです。何世紀にもわたり、さまざまな繰り返されるテーマや芸術形式がこれらのトピックを探求してきました。たとえば、中世のヨーロッパでは、「死の勝利」や「死の舞踏」などの不気味な表現が制作され、命ある世界と死者の世界との出会いを描くことを意図していました。そこで、死は常に優位に立っていました。これらの作品は、ラテン語で「死ななければならないことを忘れるな」という意味のメメント・モリ（Memento Mori）として機能し、私たち全員が死に直面する運命にあることを思い起こさせるものでした。この概念は、日本文学に由来する「もののあわれ」という有名な日本の考え方を思い起こさせます。これは儚さと無常を示し、すべての人が死ぬ運命にあり、すべてのものには終わりがあることを思い出させます。</p><p>While modern Halloween is a relatively recent celebration, the concepts of death, spirituality and the afterlife it embodies are much more ancient. Throughout the centuries, various recurring themes and artistic forms have explored these topics. For instance, during the Middle Ages in Europe, macabre representations such as “The Triumph of Death” and “The Dance of Death,” were produced, intended to depict the encounter between the world of the living and the dead, where death always prevailed. These artworks served as a<em> Memento Mori</em> (from Latin, meaning “remember you must die”), a reminder that we are all destined to face death no matter what. This concept might recall the famous Japanese notion of <em>Mono No Aware</em>, an expression originated from Japanese literature that denotes transience and impermanence, reminding us that everyone is fated to die and all things come to an end.</p><p><img src="/media/blog/halloween-history-art-celebrations/03-image-3.jpg" alt="An 18th-century painting depicting the Dance Macabre, showcasing skeletal figures dancing with the living, symbolizing the universality of death and the fleeting nature of life." loading="lazy" /></p><p><em>A detail from an 18th-century oil painting depiction of the Dance of Death, 72 x 55 cm, Wellcome collection, London</em></p><p>多くの現代アーティストもまた、より暗く不安を引き起こすテーマに取り組んでいます。注目すべき例として、ヘンリック・フュッスリが挙げられます。彼は夢のようなロマンチックな雰囲気の中で、悪夢のようなシーンや暴力的なイメージを描きました。もう一人の象徴的なアーティストはフランシスコ・ゴヤで、彼の鋭くグロテスクなスタイルは、数多くの魔女狩りや残酷な行為を描写しました。</p><p>Many modern artists have also delved into darker and more unsettling themes. A remarkable example is Heinrich Füssli, who illustrated nightmarish scenes and violent imagery with a oneiric and romantic atmosphere. Another emblematic artist is Francisco Goya, whose incisive and grotesque style portrayed numerous acts of witchcraft and cruelty.</p><p><img src="/media/blog/halloween-history-art-celebrations/04-Henry_Fuseli_-1741-1825-_The_Nightmare-_1781.jpg" alt="Henry Fuseli (1741–1825) The Nightmare 1781 Oil on canvas. Oil painting depicting a woman in a deep sleep, with a menacing incubus perched on her chest and a ghostly horse looming in the background, illustrating themes of fear and the subconscious." loading="lazy" /></p><p><em>The Nightmare, Heinrich Füssli (or Henry Fuseli), 1781, oil on canvas, dimensions: 101.6 cm × 127.6 cm, Detroit Institute of Arts</em></p><p><img src="/media/blog/halloween-history-art-celebrations/05-Francisco_de_Goya_y_Lucientes_-_Witches_Sabbath_-_Google_Art_Project.jpg" alt="Oil painting depicting a gathering of witches around a large goat figure, symbolizing dark themes of superstition and fear of the supernatural, by Francisco de Goya." loading="lazy" /></p><p><em>Witches’ Sabbath (The Great He-Goat), Francisco de Goya, 1789, oil on canvas, dimensions: 121 cm × 280 cm, Prado Museum, Madrid.</em></p><p>興味深いことに、非常に人気のあるアーティストの中にも、より不気味な作品があまり知られていないものがあります。たとえば、著名なポスト印象派のアーティストであるフィンセント・ファン・ゴッホは、初期のキャリアで「燃えるタバコをくわえた骸骨」を描きました。同様に、メキシコのアーティストフリーダ・カーロも死をテーマにし、象徴やより明示的な表現を用いました。メキシコのポップカルチャーにおいて、死は根本的な要素であり、有名な死者の日（Día de los Muertos）に見られます。このメキシコの祝日は、亡くなった人を敬うための色とりどりの祭りが特徴で、ハロウィン特有の陰鬱で不気味な雰囲気とは対照的に、楽しく活気に満ちた雰囲気を持っています。死者の日には、人々が頭蓋骨にインスパイアされた顔をペイントし、亡くなった人の魂に食べ物や色とりどりの花を捧げます。私たちアートバーでは、喜びをもって祝うことが大好きなので、死者の日をテーマにしたクラスも開催します！</p><p>Interestingly, there are also extremely popular artists whose more macabre works are not particularly well known. For instance, the renowned post-impressionist artist Vincent Van Gogh painted “Skull of a Skeleton with Burning Cigarette” in his early career. Similarly, the Mexican artist Frida Kahlo addressed the theme of death, employing both symbolism and more explicit representations. In Mexican popular culture, death is a fundamental element, as we see in the famous Día de los Muertos (Day of the Dead). This Mexican holiday is characterized by vibrant festivities to honor the deceased, which carries a joyful and lively atmosphere that contrasts with the gloomy and spooky vibe typical of Halloween. During Día de los Muertos, people paint their faces inspired by skulls and offer food and colorful flowers to the souls of the departed. Here at Artbar Tokyo, where we love to celebrate with joy, we will also celebrate Día de los Muertos with a themed class!</p><p><img src="/media/blog/halloween-history-art-celebrations/06-1280px-Vincent_van_Gogh_-_Head_of_a_skeleton_with_a_burning_cigarette_-_Google_Art_Project.jpg" alt="Vincent Van Gogh: Head of a skeleton burning cigarette. A skeleton, turned 45 degrees to the right and rendered only from shoulders and above. The skull clenches a lit cigarette between its teeth. The painting is rendered in somber tones of ivory, brown, and black, in thick yet detailed brushstrokes that reveal the texture of the canvas in places." loading="lazy" /></p><p><em>Skeleton with Burning Cigarette, Vincent van Gogh, 1886, oil on canvas, dimensions: 60.3 cm × 50.2 cm, private collection. From 4 October 2024 until 26 January 2025 this painting is on view in the exhibition “Gothic Modern: From Darkness to Light” at the Atheneum Art Museum, Helsinki, Finland.</em></p><p><img src="/media/blog/halloween-history-art-celebrations/07-Screen-Shot-2020-10-09-at-1.00.02-PM.jpg" alt="Dia de los muertos class at Artbar Tokyo, with people showing colorfull skulls they painted" loading="lazy" /></p><p>日本の芸術の歴史においても、死、霊、そして来世を想起させる恐ろしいシンボルが豊富に存在します。この伝統は、幽霊（ゆうれい）や妖怪（ようかい）の図像学に特に顕著であり、浮世絵（うきよえ）に頻繁に描かれています。「歌川国芳の骸骨に立ち向かう光国」や「北斎の皿屋敷」などのアイコニックな傑作は、死をテーマにした恐ろしいシンボルが民間伝承の一部であり、日本の美術史で表現されている素晴らしい例です。</p><p>Even in the history of Japanese art, there is an abundance of frightening symbols that evoke themes of death, spirits, and the afterlife. This tradition is particularly evident in the iconography of <em>yūrei</em> (ghosts) and <em>yōkai</em> (supernatural creatures), which are frequently depicted in<em> Ukiyo-e</em> (woodblock prints). Iconic masterpieces such as “Mitsukuni Defying the Skeleton” by Utagawa Kuniyoshi and “Sarayashiki” by Hokusai are great examples of how deadly and scary symbols are part of folklore and are represented in Japanese art history.</p><p><img src="/media/blog/halloween-history-art-celebrations/08-Takiyasha_the_Witch_and_the_Skeleton_Spectre.jpg" alt="Mitsukuni Defying the Skeleton Ghost, Kuniyoshi. Woodblock print depicting Mitsukuni confronting a skeletal ghost, showcasing Kuniyoshi&#x27;s dynamic style and themes of bravery and the supernatural in Japanese folklore." loading="lazy" /></p><p><em>Mitsukuni Defying the Skeleton Ghost, Utagawa Kuniyoshi, 1850, woodblock print, dimensions: 36.5 cm × 25.2 cm, private collection.</em></p><p><img src="/media/blog/halloween-history-art-celebrations/09-Hokusai_Sarayashiki.jpg" alt="Sarayashiki (The House of Broken Plates) by Hokusai. Woodblock print illustrating the eerie scene of Sarayashiki, featuring a ghostly figure and broken plates, reflecting themes of hauntings and the supernatural in Japanese folklore by Hokusai.&quot;" loading="lazy" /></p><p><em>Sarayashiki (The House of Broken Plates), Katsushika Hokusai, 1835, woodblock print, dimensions: 25.7 cm × 37.8 cm, private collection.</em></p><p>このハロウィンシーズンに関連する陰鬱で魅力的なアート作品を描く意外な多様なアーティストを見てきましたが、私たちが実際に会うのを楽しみにしている現代のアーティストもいます。そう、あなたのことを話しているのです！神秘的な風景を描きたいのか、死者の日のスタイルで明るいポートレートを描きたいのか、Artbar Tokyoで一緒にスプーキーなシーズンを祝うのを楽しみにしています！</p><p>We’ve seen several unexpected and diverse artists portraying gloomy and fascinating art pieces related to this Halloween season, but there are contemporary artists we can’t wait to meet in person: Yes, we’re talking about you! No matter whether you want to paint a mysterious landscape or a cheerful portrait in the style of Día de los Muertos, we look forward to seeing you at Artbar Tokyo to celebrate the spooky season together!</p>`
    },
    {
      id: "245389",
      slug: "harpers-bazaar-art-2024",
      published: true,
      image: "/media/blog/harpers-bazaar-art-2024/00-hapars_bazzar-1219x1536.jpg",
      date: "2024.09.20",
      tags: ["Artbar Tokyo", "Events", "Art & Culture"],
      titleEn: `Harper's BAZAAR art Collaboration Event`,
      titleJp: `Harper’s BAZAAR artとのコラボレーションイベントを開催！`,
      authorEn: `momo chida`,
      authorJp: `momo chida`,
      excerptEn: `働く女性をエンパワーするインターナショナルファッション誌『Harper’s BAZAAR』のアートに特化した特別版、『Harper’s BAZAAR art』第2号発刊を記念して、Artbar Tokyoとのコラボレーションイベントを開催します！ 『Harper’s BAZAAR art』第2号のテーマは「Life in Art」。 思い思いのスタイルで描いた抽象画にステンシル...`,
      excerptJp: `働く女性をエンパワーするインターナショナルファッション誌『Harper’s BAZAAR』のアートに特化した特別版、『Harper’s BAZAAR art』第2号発刊を記念して、Artbar Tokyoとのコラボレーションイベントを開催します！`,
      contentEn: `<p>働く女性をエンパワーするインターナショナルファッション誌『Harper’s BAZAAR』のアートに特化した特別版、『Harper’s BAZAAR art』第2号発刊を記念して、Artbar Tokyoとのコラボレーションイベントを開催します！</p><p><img src="/media/blog/harpers-bazaar-art-2024/00-hapars_bazzar-1219x1536.jpg" alt="" loading="lazy" /></p><p>『Harper’s BAZAAR art』第2号のテーマは「Life in Art」。</p><p>思い思いのスタイルで描いた抽象画にステンシルを使用して「Life in Art」のレタリングを加えます。</p><p>フォントのスタイルはいくつかの種類をご用意していますので、お好きなデザインのものをお選び頂けます。</p><p><img src="/media/blog/harpers-bazaar-art-2024/01-ginza2-1536x1152.jpg" alt="" loading="lazy" /><img src="/media/blog/harpers-bazaar-art-2024/02-ginza1-1536x1152.jpg" alt="" loading="lazy" /></p><p>今年5月にオープンした銀座のスタジオ「Artbar Ginza」でワインとアートの楽しいひと時をご一緒しませんか？</p><p>※こちらのイベントはHarper’s BAZAAR購読者限定の抽選イベントです。</p><p>日時：2024年11月23日（土）18:00～20:00</p><p>会場：Artbar Ginza（東京都中央区銀座3‐3‐12銀座ビル3階）</p><p>抽選応募は以下リンクからどうぞ！</p><p><a href="https://mk.hearst.co.jp/form/pub/hearst2/hbarthearst" target="_blank" rel="noopener noreferrer">https://mk.hearst.co.jp/form/pub/hearst2/hbarthearst</a></p>`,
      contentJp: `<p>働く女性をエンパワーするインターナショナルファッション誌『Harper’s BAZAAR』のアートに特化した特別版、『Harper’s BAZAAR art』第2号発刊を記念して、Artbar Tokyoとのコラボレーションイベントを開催します！</p><p><img src="/media/blog/harpers-bazaar-art-2024/00-hapars_bazzar-1219x1536.jpg" alt="" loading="lazy" /></p><p>『Harper’s BAZAAR art』第2号のテーマは「Life in Art」。</p><p>思い思いのスタイルで描いた抽象画にステンシルを使用して「Life in Art」のレタリングを加えます。</p><p>フォントのスタイルはいくつかの種類をご用意していますので、お好きなデザインのものをお選び頂けます。</p><p><img src="/media/blog/harpers-bazaar-art-2024/01-ginza2-1536x1152.jpg" alt="" loading="lazy" /><img src="/media/blog/harpers-bazaar-art-2024/02-ginza1-1536x1152.jpg" alt="" loading="lazy" /></p><p>今年5月にオープンした銀座のスタジオ「Artbar Ginza」でワインとアートの楽しいひと時をご一緒しませんか？</p><p>※こちらのイベントはHarper’s BAZAAR購読者限定の抽選イベントです。</p><p>日時：2024年11月23日（土）18:00～20:00</p><p>会場：Artbar Ginza（東京都中央区銀座3‐3‐12銀座ビル3階）</p><p>抽選応募は以下リンクからどうぞ！</p><p><a href="https://mk.hearst.co.jp/form/pub/hearst2/hbarthearst" target="_blank" rel="noopener noreferrer">https://mk.hearst.co.jp/form/pub/hearst2/hbarthearst</a></p>`
    },
    {
      id: "207522",
      slug: "holiday-christmas-gifts-tokyo",
      published: true,
      image: "/media/blog/holiday-christmas-gifts-tokyo/00-IMG_7780.jpeg",
      date: "2023.12.11",
      tags: ["Gifts", "Holiday Season", "Art & Culture"],
      titleEn: `Holiday / Christmas Gift Giving in Tokyo`,
      titleJp: `ユニークなホリデーギフト：手作りプレゼントのアート`,
      authorEn: `Naomi Terada`,
      authorJp: `Naomi Terada`,
      excerptEn: `The holiday season is fast approaching, and it’s that time of year when we ponder over the perfect gifts for our loved ones.`,
      excerptJp: `年末のホリデーシーズンが近づいており、大切な人々への贈り物について考える季節がやってきました。`,
      contentEn: `<p>年末のホリデーシーズンが近づいており、大切な人々への贈り物について考える季節がやってきました。シーズンにあった贈り物をお店で購入するのは伝統的で簡単ですが、今年はユニークな要素を加えてみるのはいかがでしょうか？</p><p>The holiday season is fast approaching, and it’s that time of year when we ponder over the perfect gifts for our loved ones. While it’s easy to rely on traditional store-bought presents, this year, why not consider adding a touch of uniqueness to your gift-giving tradition?</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/00-IMG_7780.jpeg" alt="" loading="lazy" /></p><p>手作りの贈り物は特別な魅力をもたらすはずです。なぜクリエイティブな贈り物がホリデーシーズンをより輝かせるのか、ご紹介します：</p><p>個性の現れ：手作りの贈り物はあなたの創造性と思いやりの表現です。時間と労力をかけて独自のものを作成したことを示します。</p><p>カスタマイズ：手作りの贈り物は受取人の好みや希望に完璧に合わせることができます。この個人的なアプローチは贈り物をさらに意味深いものにします。</p><p>クリエイティビティの解放：手作りの贈り物は、受け取る側を感動させるだけでなく、制作過程自体が楽しさに溢れ、あなたの創造性を活かす機会です。それは充実した経験になります。</p><p>アートバー東京では、多くのゲストが大切な人々に手作りの贈り物を制作する瞬間を目撃してきました。特に、ユニークで一味違う贈り物を作成するために、絵画がよく選ばれています。</p><p>以下はいくつかのお気に入りの例です！</p><p>ウェディングポートレート：心のこもったゲストの一人が、「アイドルを描く」セッション中に友達のウェディングドレス姿の肖像画を描きました。その素晴らしい贈り物は友達の結婚式に贈られました。</p><p>別のゲストは、フリースタイルアートセッション中に友達の結婚式のためのウェディングポートレートを描きました。</p><p>Handmade gifts can bring a special charm to the holiday season, and here are some tips on why you should a creative gift giving approach might make your loved ones holiday season even more bright:</p><p>A Personal Touch: Handmade gifts are an expression of your creativity and thoughtfulness. They show that you’ve put time and effort into creating something unique.</p><p>Customization: Handmade gifts can be customized to suit the recipient’s tastes and preferences perfectly. This personalization can make the gift even more meaningful.</p><p>Creativity Unleashed: A handmade gift not only makes the recipient feel moved and touched,  the process itself is lots of fun and allows you to tap into your creativity. It can be a therapeutic and rewarding experience.</p><p>At Artbar Tokyo, we’ve witnessed countless heartwarming moments where guests have chosen to craft handmade gifts for their loved ones. Painting, in particular, has been a popular choice for creating unique, one-of-a-kind presents.</p><p>Here are some of our favorite examples!</p><p>Wedding Portrait: One thoughtful guest painted a portrait of their friend in a wedding dress during the “Paint Your Idol” session. The surprise came during their friend’s wedding ceremony, where the bride received this extraordinary gift.</p><p>Another guest came during our freestyle art session and painted a wedding portrait for her friends upcoming celebration as well.</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/00-IMG_7780.jpeg" alt="" loading="lazy" /><img src="/media/blog/holiday-christmas-gifts-tokyo/01-IMG_7779.jpeg" alt="" loading="lazy" /></p><p>お母さんへの贈り物：兄妹の一組がアートバーを訪れ、母親のために母の日に肖像画を描きました。お母さんはお子さんたちからの二つのポートレートを受け取り、喜びの涙を流したことでしょう！</p><p>A Gift For Mom: A pair of siblings visited Artbar to paint a portrait of their mom for Mother’s Day, we are sure mom cried tears of joy to be receiving double portraits from her children!</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/02-IMG_7783.jpeg" alt="" loading="lazy" />お父さんへ：2人の友達が一緒になって、特別な父の日のサプライズとして父親の肖像画を描きました。お父さんはきっと涙を流したことでしょう！</p><p>For Dad: Two friends came together to paint portraits of their fathers as a special Father’s Day surprise, we are sure Dad stoically dropped a tear or two!</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/03-IMG_7782.jpeg" alt="" loading="lazy" />愛犬のポートレート：友人がこっそりと愛犬のポートレートを描き、愛するペットを永遠の思い出に変えました。</p><p>Beloved Pet Portraits:  A friend secretly painted a cherished dog, turning a beloved pet into a forever keepsake.</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/04-IMG_7799.jpeg" alt="" loading="lazy" /><img src="/media/blog/holiday-christmas-gifts-tokyo/05-IMG_6610-1536x2048.jpeg" alt="" loading="lazy" /></p><p>おばあちゃんへの贈り物:あるゲストはアートバーを訪れ、おばあちゃんの肖像画を描きました。そしてもう一人のおばあちゃんも自分の肖像画を依頼しました！とても心暖まりますね。</p><p>Don’t Forget About Grandma! One guest visited us to paint her grandmother, a heartfelt gesture that was so cherished that her other grandmother requested her own portrait! That is one busy granddaughter.</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/06-IMG_7784.jpeg" alt="" loading="lazy" /><img src="/media/blog/holiday-christmas-gifts-tokyo/07-IMG_7785.jpeg" alt="" loading="lazy" /></p><p>These two friends painted their partners in Picasso-style as a surprise gift! We can’t wait to hear about what their reaction was when they received their own personal Picasso portraits!</p><p>これらの2人の友達は、サプライズギフトとして、パートナーをピカソ風に描きました！彼らがピカソ風の肖像画を受け取った際の反応を聞くのが楽しみです！</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/08-A984D155-0974-4F1C-9AE1-62B7CBDE69DC.jpeg" alt="" loading="lazy" /><img src="/media/blog/holiday-christmas-gifts-tokyo/09-DB775FF4-753B-430C-9CF1-9DF5499EBF7A.jpeg" alt="" loading="lazy" />ホリデーギフトにアートを取り入れることは、思い出深く心暖まる体験になることでしょう。ここでは長い間大切にされる特別なものを創ることができるのです。だからこそ、このホリデーシーズンには、伝統的でないクリエイティブなアプローチを試してみてはいかがでしょうか？アートバー東京で私たちと一緒に楽しいひとときを過ごし、あなたの芸術的な才能で大切な人々に喜びをもたらしましょう。アートの贈り物を贈ることは、あなたの心の一部を贈ることと同じです！</p><p>Incorporating art into your holiday gifting can be a memorable and heartwarming experience. It’s an opportunity to create something truly special that will be treasured for years to come. So, why not try an unconventional and creative approach to gift-giving this holiday season? Join us at Artbar Tokyo, and let your artistic talents bring joy to your loved ones. Give the gift of art, and you’ll be giving a piece of your heart!</p>`,
      contentJp: `<p>年末のホリデーシーズンが近づいており、大切な人々への贈り物について考える季節がやってきました。シーズンにあった贈り物をお店で購入するのは伝統的で簡単ですが、今年はユニークな要素を加えてみるのはいかがでしょうか？</p><p>The holiday season is fast approaching, and it’s that time of year when we ponder over the perfect gifts for our loved ones. While it’s easy to rely on traditional store-bought presents, this year, why not consider adding a touch of uniqueness to your gift-giving tradition?</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/00-IMG_7780.jpeg" alt="" loading="lazy" /></p><p>手作りの贈り物は特別な魅力をもたらすはずです。なぜクリエイティブな贈り物がホリデーシーズンをより輝かせるのか、ご紹介します：</p><p>個性の現れ：手作りの贈り物はあなたの創造性と思いやりの表現です。時間と労力をかけて独自のものを作成したことを示します。</p><p>カスタマイズ：手作りの贈り物は受取人の好みや希望に完璧に合わせることができます。この個人的なアプローチは贈り物をさらに意味深いものにします。</p><p>クリエイティビティの解放：手作りの贈り物は、受け取る側を感動させるだけでなく、制作過程自体が楽しさに溢れ、あなたの創造性を活かす機会です。それは充実した経験になります。</p><p>アートバー東京では、多くのゲストが大切な人々に手作りの贈り物を制作する瞬間を目撃してきました。特に、ユニークで一味違う贈り物を作成するために、絵画がよく選ばれています。</p><p>以下はいくつかのお気に入りの例です！</p><p>ウェディングポートレート：心のこもったゲストの一人が、「アイドルを描く」セッション中に友達のウェディングドレス姿の肖像画を描きました。その素晴らしい贈り物は友達の結婚式に贈られました。</p><p>別のゲストは、フリースタイルアートセッション中に友達の結婚式のためのウェディングポートレートを描きました。</p><p>Handmade gifts can bring a special charm to the holiday season, and here are some tips on why you should a creative gift giving approach might make your loved ones holiday season even more bright:</p><p>A Personal Touch: Handmade gifts are an expression of your creativity and thoughtfulness. They show that you’ve put time and effort into creating something unique.</p><p>Customization: Handmade gifts can be customized to suit the recipient’s tastes and preferences perfectly. This personalization can make the gift even more meaningful.</p><p>Creativity Unleashed: A handmade gift not only makes the recipient feel moved and touched,  the process itself is lots of fun and allows you to tap into your creativity. It can be a therapeutic and rewarding experience.</p><p>At Artbar Tokyo, we’ve witnessed countless heartwarming moments where guests have chosen to craft handmade gifts for their loved ones. Painting, in particular, has been a popular choice for creating unique, one-of-a-kind presents.</p><p>Here are some of our favorite examples!</p><p>Wedding Portrait: One thoughtful guest painted a portrait of their friend in a wedding dress during the “Paint Your Idol” session. The surprise came during their friend’s wedding ceremony, where the bride received this extraordinary gift.</p><p>Another guest came during our freestyle art session and painted a wedding portrait for her friends upcoming celebration as well.</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/00-IMG_7780.jpeg" alt="" loading="lazy" /><img src="/media/blog/holiday-christmas-gifts-tokyo/01-IMG_7779.jpeg" alt="" loading="lazy" /></p><p>お母さんへの贈り物：兄妹の一組がアートバーを訪れ、母親のために母の日に肖像画を描きました。お母さんはお子さんたちからの二つのポートレートを受け取り、喜びの涙を流したことでしょう！</p><p>A Gift For Mom: A pair of siblings visited Artbar to paint a portrait of their mom for Mother’s Day, we are sure mom cried tears of joy to be receiving double portraits from her children!</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/02-IMG_7783.jpeg" alt="" loading="lazy" />お父さんへ：2人の友達が一緒になって、特別な父の日のサプライズとして父親の肖像画を描きました。お父さんはきっと涙を流したことでしょう！</p><p>For Dad: Two friends came together to paint portraits of their fathers as a special Father’s Day surprise, we are sure Dad stoically dropped a tear or two!</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/03-IMG_7782.jpeg" alt="" loading="lazy" />愛犬のポートレート：友人がこっそりと愛犬のポートレートを描き、愛するペットを永遠の思い出に変えました。</p><p>Beloved Pet Portraits:  A friend secretly painted a cherished dog, turning a beloved pet into a forever keepsake.</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/04-IMG_7799.jpeg" alt="" loading="lazy" /><img src="/media/blog/holiday-christmas-gifts-tokyo/05-IMG_6610-1536x2048.jpeg" alt="" loading="lazy" /></p><p>おばあちゃんへの贈り物:あるゲストはアートバーを訪れ、おばあちゃんの肖像画を描きました。そしてもう一人のおばあちゃんも自分の肖像画を依頼しました！とても心暖まりますね。</p><p>Don’t Forget About Grandma! One guest visited us to paint her grandmother, a heartfelt gesture that was so cherished that her other grandmother requested her own portrait! That is one busy granddaughter.</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/06-IMG_7784.jpeg" alt="" loading="lazy" /><img src="/media/blog/holiday-christmas-gifts-tokyo/07-IMG_7785.jpeg" alt="" loading="lazy" /></p><p>These two friends painted their partners in Picasso-style as a surprise gift! We can’t wait to hear about what their reaction was when they received their own personal Picasso portraits!</p><p>これらの2人の友達は、サプライズギフトとして、パートナーをピカソ風に描きました！彼らがピカソ風の肖像画を受け取った際の反応を聞くのが楽しみです！</p><p><img src="/media/blog/holiday-christmas-gifts-tokyo/08-A984D155-0974-4F1C-9AE1-62B7CBDE69DC.jpeg" alt="" loading="lazy" /><img src="/media/blog/holiday-christmas-gifts-tokyo/09-DB775FF4-753B-430C-9CF1-9DF5499EBF7A.jpeg" alt="" loading="lazy" />ホリデーギフトにアートを取り入れることは、思い出深く心暖まる体験になることでしょう。ここでは長い間大切にされる特別なものを創ることができるのです。だからこそ、このホリデーシーズンには、伝統的でないクリエイティブなアプローチを試してみてはいかがでしょうか？アートバー東京で私たちと一緒に楽しいひとときを過ごし、あなたの芸術的な才能で大切な人々に喜びをもたらしましょう。アートの贈り物を贈ることは、あなたの心の一部を贈ることと同じです！</p><p>Incorporating art into your holiday gifting can be a memorable and heartwarming experience. It’s an opportunity to create something truly special that will be treasured for years to come. So, why not try an unconventional and creative approach to gift-giving this holiday season? Join us at Artbar Tokyo, and let your artistic talents bring joy to your loved ones. Give the gift of art, and you’ll be giving a piece of your heart!</p>`
    },
    {
      id: "207579",
      slug: "van-gogh-museum-amsterdam",
      published: true,
      image: "/media/blog/van-gogh-museum-amsterdam/00-775AEA76-136A-47AB-93F2-6B99BA129F34.jpeg",
      date: "2023.10.24",
      tags: ["Art Museums", "Van Gogh", "Travel"],
      titleEn: `From Tokyo to Amsterdam: Van Gogh Museum`,
      titleJp: `東京からアムステルダムのヴァン・ゴッホ美術館へ`,
      authorEn: `Naomi Terada`,
      authorJp: `Naomi Terada`,
      excerptEn: `At Artbar, we love celebrating the creative journeys of our guests.`,
      excerptJp: `アートバーは、お客様の創造的な作品をいつも楽しみにしています。そして今回は大切な常連のお客様である駿河台大学の体操パフォーマンスチームの素晴らしいストーリーを共有したいと思います。`,
      contentEn: `<p>アートバーは、お客様の創造的な作品をいつも楽しみにしています。そして今回は大切な常連のお客様である駿河台大学の体操パフォーマンスチームの素晴らしいストーリーを共有したいと思います。</p><p>今年の夏、活気あるこのチームは、アムステルダムへ向かい、国際体操サミットでパフォーマンスを行うという素晴らしい計画がありました。文化と芸術に満ちたアムステルダムは、彼らにとって体操の腕前を披露するだけでなく、地元の文化にも浸るユニークな機会なのでした。その中でも特別な文化体験の一つが、名高いヴァン・ゴッホ美術館への訪問でした。</p><p>At Artbar, we love celebrating the creative journeys of our guests. We want to share a story about our cherished regular visitors – a gymnastics performance team from Surugadai University.</p><p>This summer, this spirited team had an exciting plan to head to Amsterdam to perform at a global gymnastics summit. Amsterdam, a city steeped in culture and art, offered them a unique opportunity to not only showcase their gymnastic prowess but also immerse themselves in the local culture. One of their cultural highlights was a visit to the renowned Van Gogh Museum.</p><p><img src="/media/blog/van-gogh-museum-amsterdam/01-449DBA81-AA93-423C-891C-FD4B38F1CAB1.jpeg" alt="" loading="lazy" /><img src="/media/blog/van-gogh-museum-amsterdam/02-2CF10F4B-25E5-42EC-858C-99F5FB702086.jpeg" alt="" loading="lazy" />彼らはオランダへ出発する前に、私たちのスタジオを訪れ、ヴァン・ゴッホのさまざまな花を描く体験をしました。それは、ヴァン・ゴッホ美術館で本物の巨匠の作品を間近で見る前に、名高い芸術家である彼のを特徴的な鮮やかな色彩と表現力豊かな筆づかいを体験する機会でした。</p><p>Before they embarked on their journey to the Netherlands, the gymnastics team decided to visit to our studio to experience painting various flowers of Van Gogh. It was a chance to experience the vibrant colors and expressive brushwork that characterized the iconic artist’s work before seeing the master artist’s works up close at the official Van Gogh Museum.</p><p><img src="/media/blog/van-gogh-museum-amsterdam/00-775AEA76-136A-47AB-93F2-6B99BA129F34.jpeg" alt="" loading="lazy" />ヴァン・ゴッホの愛好家として、そしてヴァン・ゴッホにインスパイアされた絵画を多く教えてきた私たちにとって、駿河台大学チームが帰国して、ヴァン・ゴッホ美術館のお土産をいただいた時は非常に嬉しく驚きました！</p><p>As enthusiasts of Van Gogh’s art and having taught many Van Gogh-inspired paintings at Artbar, we were thrilled when the Surugadai University team returned from their Amsterdam trip with a heartwarming surprise – Van Gogh souvenirs from the Van Gogh Museum!</p><p><img src="/media/blog/van-gogh-museum-amsterdam/03-IMG_7805.jpeg" alt="" loading="lazy" />偶然なことに、普段はアムステルダムのヴァン・ゴッホ美術館で展示されている有名な「黄色い背景に対するアイリス入りの花瓶」の絵画が「ヴァン・ゴッホと静物：伝統から革新へ」の一環として、東京で特別出展されます。2023年10月17日から、一定の期間、尚美美術館で展示されるのです。</p><p>Coincidentally, the famous “Vase with Irises Against a Yellow Background” painting by Van Gogh, usually on display at the Van Gogh Museum in Amsterdam, will make a special appearance in Tokyo for the “Van Gogh and Still Life: From Tradition to Innovation” exhibition. It will be showcased for a limited time at the Sompo Museum of Art, starting from October 17th, 2023.</p><p><img src="/media/blog/van-gogh-museum-amsterdam/04-IMG_5151.jpeg" alt="" loading="lazy" /></p><p>以下は、今後の展覧会の詳細です：<br />
ヴァン・ゴッホと静物：伝統から革新へ<br />
期間：2023年10月17日 – 2024年1月21日<br />
場所：尚美美術館、東京<br />
説明：この特別展では、ヴァン・ゴッホの象徴的な「黄色い背景に対するアイリス入りの花瓶」だけでなく、ひまわりなど、芸術史を通じてジャンルの進化を示すさまざまな静物の傑作が展示されます。訪問者はこれらの芸術作品を間近で鑑賞し、ヴァン・ゴッホの芸術的な才能を深く理解する貴重な機会になるでしょう。</p><p>私たちは、駿河台大学の体操チームの芸術的な旅に一部関われたことを大変誇りに思い、彼らのストーリーを共有できて嬉しいです。これは、芸術が国境や文化を超えて人々を魅了し、結びつけ持続する、力の証です。私たちは、体操チームが努力で成功し続け、今後も芸術的冒険とスポーツ活動について聞けることを楽しみにしています。</p><p>Here are the details for the upcoming exhibition:</p><p>Van Gogh and Still Life: From Tradition to Innovation</p><p>Duration: October 17th, 2023 – January 21st, 2024<br />
Location: Sompo Museum of Art, Tokyo<br />
Description: This special exhibition will feature not only Van Gogh’s iconic “Vase with Irises Against a Yellow Background” but also an array of still life masterpieces such as Sunflowers and more that provide insight into the genre’s evolution throughout art history. Visitors will have the unique opportunity to appreciate these artworks up close and gain a deeper understanding of Van Gogh’s artistic genius.</p><p>We’re incredibly proud to have been a part of the Surugadai University Gymnastics Team’s artistic journey and delighted to share their story. It’s a testament to the power of art to inspire, connect, and create lasting memories across borders and cultures. We wish the team continued success in their gymnastics endeavors and look forward to hearing about their future artistic and athletic adventures.</p><p><img src="/media/blog/van-gogh-museum-amsterdam/05-5D18E047-4370-4E9C-8849-8C33C570605D.jpeg" alt="" loading="lazy" /><img src="/media/blog/van-gogh-museum-amsterdam/06-4AA6832A-7627-4BF6-86DE-AA2BBF47B432.jpeg" alt="" loading="lazy" /></p>`,
      contentJp: `<p>アートバーは、お客様の創造的な作品をいつも楽しみにしています。そして今回は大切な常連のお客様である駿河台大学の体操パフォーマンスチームの素晴らしいストーリーを共有したいと思います。</p><p>今年の夏、活気あるこのチームは、アムステルダムへ向かい、国際体操サミットでパフォーマンスを行うという素晴らしい計画がありました。文化と芸術に満ちたアムステルダムは、彼らにとって体操の腕前を披露するだけでなく、地元の文化にも浸るユニークな機会なのでした。その中でも特別な文化体験の一つが、名高いヴァン・ゴッホ美術館への訪問でした。</p><p>At Artbar, we love celebrating the creative journeys of our guests. We want to share a story about our cherished regular visitors – a gymnastics performance team from Surugadai University.</p><p>This summer, this spirited team had an exciting plan to head to Amsterdam to perform at a global gymnastics summit. Amsterdam, a city steeped in culture and art, offered them a unique opportunity to not only showcase their gymnastic prowess but also immerse themselves in the local culture. One of their cultural highlights was a visit to the renowned Van Gogh Museum.</p><p><img src="/media/blog/van-gogh-museum-amsterdam/01-449DBA81-AA93-423C-891C-FD4B38F1CAB1.jpeg" alt="" loading="lazy" /><img src="/media/blog/van-gogh-museum-amsterdam/02-2CF10F4B-25E5-42EC-858C-99F5FB702086.jpeg" alt="" loading="lazy" />彼らはオランダへ出発する前に、私たちのスタジオを訪れ、ヴァン・ゴッホのさまざまな花を描く体験をしました。それは、ヴァン・ゴッホ美術館で本物の巨匠の作品を間近で見る前に、名高い芸術家である彼のを特徴的な鮮やかな色彩と表現力豊かな筆づかいを体験する機会でした。</p><p>Before they embarked on their journey to the Netherlands, the gymnastics team decided to visit to our studio to experience painting various flowers of Van Gogh. It was a chance to experience the vibrant colors and expressive brushwork that characterized the iconic artist’s work before seeing the master artist’s works up close at the official Van Gogh Museum.</p><p><img src="/media/blog/van-gogh-museum-amsterdam/00-775AEA76-136A-47AB-93F2-6B99BA129F34.jpeg" alt="" loading="lazy" />ヴァン・ゴッホの愛好家として、そしてヴァン・ゴッホにインスパイアされた絵画を多く教えてきた私たちにとって、駿河台大学チームが帰国して、ヴァン・ゴッホ美術館のお土産をいただいた時は非常に嬉しく驚きました！</p><p>As enthusiasts of Van Gogh’s art and having taught many Van Gogh-inspired paintings at Artbar, we were thrilled when the Surugadai University team returned from their Amsterdam trip with a heartwarming surprise – Van Gogh souvenirs from the Van Gogh Museum!</p><p><img src="/media/blog/van-gogh-museum-amsterdam/03-IMG_7805.jpeg" alt="" loading="lazy" />偶然なことに、普段はアムステルダムのヴァン・ゴッホ美術館で展示されている有名な「黄色い背景に対するアイリス入りの花瓶」の絵画が「ヴァン・ゴッホと静物：伝統から革新へ」の一環として、東京で特別出展されます。2023年10月17日から、一定の期間、尚美美術館で展示されるのです。</p><p>Coincidentally, the famous “Vase with Irises Against a Yellow Background” painting by Van Gogh, usually on display at the Van Gogh Museum in Amsterdam, will make a special appearance in Tokyo for the “Van Gogh and Still Life: From Tradition to Innovation” exhibition. It will be showcased for a limited time at the Sompo Museum of Art, starting from October 17th, 2023.</p><p><img src="/media/blog/van-gogh-museum-amsterdam/04-IMG_5151.jpeg" alt="" loading="lazy" /></p><p>以下は、今後の展覧会の詳細です：<br />
ヴァン・ゴッホと静物：伝統から革新へ<br />
期間：2023年10月17日 – 2024年1月21日<br />
場所：尚美美術館、東京<br />
説明：この特別展では、ヴァン・ゴッホの象徴的な「黄色い背景に対するアイリス入りの花瓶」だけでなく、ひまわりなど、芸術史を通じてジャンルの進化を示すさまざまな静物の傑作が展示されます。訪問者はこれらの芸術作品を間近で鑑賞し、ヴァン・ゴッホの芸術的な才能を深く理解する貴重な機会になるでしょう。</p><p>私たちは、駿河台大学の体操チームの芸術的な旅に一部関われたことを大変誇りに思い、彼らのストーリーを共有できて嬉しいです。これは、芸術が国境や文化を超えて人々を魅了し、結びつけ持続する、力の証です。私たちは、体操チームが努力で成功し続け、今後も芸術的冒険とスポーツ活動について聞けることを楽しみにしています。</p><p>Here are the details for the upcoming exhibition:</p><p>Van Gogh and Still Life: From Tradition to Innovation</p><p>Duration: October 17th, 2023 – January 21st, 2024<br />
Location: Sompo Museum of Art, Tokyo<br />
Description: This special exhibition will feature not only Van Gogh’s iconic “Vase with Irises Against a Yellow Background” but also an array of still life masterpieces such as Sunflowers and more that provide insight into the genre’s evolution throughout art history. Visitors will have the unique opportunity to appreciate these artworks up close and gain a deeper understanding of Van Gogh’s artistic genius.</p><p>We’re incredibly proud to have been a part of the Surugadai University Gymnastics Team’s artistic journey and delighted to share their story. It’s a testament to the power of art to inspire, connect, and create lasting memories across borders and cultures. We wish the team continued success in their gymnastics endeavors and look forward to hearing about their future artistic and athletic adventures.</p><p><img src="/media/blog/van-gogh-museum-amsterdam/05-5D18E047-4370-4E9C-8849-8C33C570605D.jpeg" alt="" loading="lazy" /><img src="/media/blog/van-gogh-museum-amsterdam/06-4AA6832A-7627-4BF6-86DE-AA2BBF47B432.jpeg" alt="" loading="lazy" /></p>`
    },
    {
      id: "207474",
      slug: "monet-ueno-royal-museum",
      published: true,
      image: "/media/blog/monet-ueno-royal-museum/00-IMG_5124.jpeg",
      date: "2023.10.02",
      tags: ["Monet", "Art & Culture", "Travel"],
      titleEn: `Monet at Ueno Royal Museum`,
      titleJp: `モネ月間：上野ロイヤル美術館「モネ：連作の情景」を称えて`,
      authorEn: `Naomi Terada`,
      authorJp: `Naomi Terada`,
      excerptEn: `To honor the 10/20 start date of the upcoming exhibition “Monet: Scenes From a Series of Paintings” we are deeming October MONET MONTH.`,
      excerptJp: `月20日から始まるモネ展 「連作の情景」を記念して、アートバーでは10月を「モネ月間」とします。`,
      contentEn: `<p>10月20日から始まるモネ展　「連作の情景」を記念して、アートバーでは10月を「モネ月間」とします。</p><p>今月は通常よりも多くのモネに関連したセッションを開催予定です。モネの有名で愛される作品を中心に据えたセッションが多数あり、あなた自身のオリジナルの、モネインスパイアアートを制作することができます！</p><p>To honor the 10/20 start date of the upcoming exhibition “Monet: Scenes From a Series of Paintings” we are deeming October MONET MONTH.</p><p>We will be hosting more Monet sessions than usual this month, featuring sessions centered around many of Monet’s famous and beloved paintings, so you can try your hand at making your own original Monet-inspired artwork!</p><p><img src="/media/blog/monet-ueno-royal-museum/00-IMG_5124.jpeg" alt="" loading="lazy" /></p><p>展覧会に関する情報：</p><p>タイトル：モネ：連作の情景</p><p>日程：2023年10月20日 – 2024年1月28日</p><p>場所：上野ロイヤル美術館</p><p>1874年の印象派展覧会から始まり、今年150周年を祝うため、この展覧会は世界中の30以上のコレクションから厳選されたモネの代表作を60点以上一堂に集められています。<br />
来場者は展覧会を通じて、”連作の情景”へと導いたプロセスをたどることで、モネの芸術の壮大な世界を楽しむことができます。”連作の情景”は彼の革新的な表現方法の1つで、展覧会は全てがモネの作品です。</p><p>Information about the upcoming exhibition:</p><p>Title: Monet: Scenes From a Series of Paintings</p><p>Dates: October 20th, 2023 – January 28th, 2024</p><p>Location: Ueno Royal Museum</p><p>To commemorate the 150th anniversary of the first Impressionist exhibition in 1874, the exhibition will bring together more than 60 of Monet’s representative works carefully selected from more than 30 collections around the world.</p><p>Visitors will be able to enjoy the magnificent world of Monet’s art by following the process that led to the “series of paintings,” one of his innovative methods of expression, all of which are Monet’s works, through the exhibition.</p><p><img src="/media/blog/monet-ueno-royal-museum/01-IMG_5125.jpeg" alt="" loading="lazy" /></p><p>クロード・モネが最も影響力のある世界的な芸術家の一人であることから、この展覧会に対する期待は非常に高まっています。クロード・モネの熱心なファンの皆様へ、モネに関する知られざる面白い事実をお楽しみいただくために、この記事を是非ご覧ください!</p><p>As Claude Monet stands among the most influential and globally acclaimed artists of all time, the anticipation surrounding this exhibition is truly palpable. For devoted admirers of Claude Monet, delve deeper into this article for intriguing facts that may pleasantly surprise you!</p><p><img src="/media/blog/monet-ueno-royal-museum/02-IMG_7793.jpeg" alt="" loading="lazy" /></p><p>モネの豆知識</p><p>彼は同じ題材を繰り返し描いており、代表的な例として睡蓮や干し草の山シリーズが挙げられます。</p><p>モネは、同じ風景でも時間帯や季節、天候によって光がどのように変化するかを探求するため、しばしば連作の絵画を制作しました。</p><p>Monet Frequently repainted the same subjects, popular examples being the water lilies and haystacks series.</p><p>He often created series of paintings exploring the way light changed the same landscape at different times of day, in different seasons, and in different weather conditions.</p><p><img src="/media/blog/monet-ueno-royal-museum/03-IMG_5130.jpeg" alt="" loading="lazy" /></p><p><em><img src="/media/blog/monet-ueno-royal-museum/04-IMG_7792.jpeg" alt="" loading="lazy" /></em></p><p>モネが無意識のうちに印象派という名前をつけたことをご存知でしょうか？</p><p>1872年、モネは「印象、日の出」を描き、仲間の画家たちと共ににパリで展示しました。</p><p>「印象派」という名前はある美術評論家による造語で、この絵が印象派運動の名称のきっかけになったと言われています。</p><p>Did you know that Monet unintentionally named the Impressionism movement?</p><p>In 1872, Monet painted “Impression, Sunrise”and exhibited it along other fellow artists in Paris.</p><p>Coined by an art critic, the painting is credited with inspiring the name of the Impressionist movement.</p><p><em><img src="/media/blog/monet-ueno-royal-museum/05-IMG_7791.jpeg" alt="" loading="lazy" /></em></p><p>モネが視力を失ったことを知っていますか？晩年のモネは白内障で視力が低下していきました。視覚障害に苦しみながらも、彼は絵を描き続けました。</p><p>Did you know that Monet lost his eyesight? Monet was severely affected by cataracts which clouded his vision. Although he suffered visual disturbances, he continued to paint.</p><p><em><img src="/media/blog/monet-ueno-royal-museum/06-IMG_7794.jpeg" alt="" loading="lazy" /></em></p><p>モネは浮世絵を愛し、多くの版画を収集しました。彼の「睡蓮」シリーズは、日本美術から多大な影響を受けていると言われています。</p><p>日本橋のような庭園の風景は、日本の様式が大きく影響されています。</p><p>Monet adored Ukiyo-e and collected many prints. It is believed that his Waterlilies series is highly inspired by Japanese art.</p><p>His garden landscape, such as the Japanese bridge, is directly influenced by Japanese styles.</p><p><em><img src="/media/blog/monet-ueno-royal-museum/07-monet_Japanese_bridge-1536x2048.jpeg" alt="" loading="lazy" /></em></p><p>美術館に足を運びとモネの世界観に没入した後、Artbarへのご参加をお勧めします。モネの印象派テクニックの本質をそれぞれが探求し、取り入れることが出来ます。そして私たちもあなたのモネ体験を完璧にサポート致します！</p><p>Following your museum visit and immersing yourself in the artistry of Monet’s style, we invite you to join us at Artbar to personally explore and embrace the essence of Monet’s impressionist technique to make your Monet experience complete!</p><p><em><img src="/media/blog/monet-ueno-royal-museum/08-IMG_8809-1-1536x1395.jpeg" alt="" loading="lazy" /><img src="/media/blog/monet-ueno-royal-museum/09-IMG_2755.jpeg" alt="" loading="lazy" />Source Citing:</em></p><p><em>Monet: Scenes From a Series of Paintings Flyer: https://www.ueno-mori.org/</em></p><p><em>”Haystacks” by Claude Monet Photo: https://mymodernmet.com/monet-haystacks/</em></p>`,
      contentJp: `<p>10月20日から始まるモネ展　「連作の情景」を記念して、アートバーでは10月を「モネ月間」とします。</p><p>今月は通常よりも多くのモネに関連したセッションを開催予定です。モネの有名で愛される作品を中心に据えたセッションが多数あり、あなた自身のオリジナルの、モネインスパイアアートを制作することができます！</p><p>To honor the 10/20 start date of the upcoming exhibition “Monet: Scenes From a Series of Paintings” we are deeming October MONET MONTH.</p><p>We will be hosting more Monet sessions than usual this month, featuring sessions centered around many of Monet’s famous and beloved paintings, so you can try your hand at making your own original Monet-inspired artwork!</p><p><img src="/media/blog/monet-ueno-royal-museum/00-IMG_5124.jpeg" alt="" loading="lazy" /></p><p>展覧会に関する情報：</p><p>タイトル：モネ：連作の情景</p><p>日程：2023年10月20日 – 2024年1月28日</p><p>場所：上野ロイヤル美術館</p><p>1874年の印象派展覧会から始まり、今年150周年を祝うため、この展覧会は世界中の30以上のコレクションから厳選されたモネの代表作を60点以上一堂に集められています。<br />
来場者は展覧会を通じて、”連作の情景”へと導いたプロセスをたどることで、モネの芸術の壮大な世界を楽しむことができます。”連作の情景”は彼の革新的な表現方法の1つで、展覧会は全てがモネの作品です。</p><p>Information about the upcoming exhibition:</p><p>Title: Monet: Scenes From a Series of Paintings</p><p>Dates: October 20th, 2023 – January 28th, 2024</p><p>Location: Ueno Royal Museum</p><p>To commemorate the 150th anniversary of the first Impressionist exhibition in 1874, the exhibition will bring together more than 60 of Monet’s representative works carefully selected from more than 30 collections around the world.</p><p>Visitors will be able to enjoy the magnificent world of Monet’s art by following the process that led to the “series of paintings,” one of his innovative methods of expression, all of which are Monet’s works, through the exhibition.</p><p><img src="/media/blog/monet-ueno-royal-museum/01-IMG_5125.jpeg" alt="" loading="lazy" /></p><p>クロード・モネが最も影響力のある世界的な芸術家の一人であることから、この展覧会に対する期待は非常に高まっています。クロード・モネの熱心なファンの皆様へ、モネに関する知られざる面白い事実をお楽しみいただくために、この記事を是非ご覧ください!</p><p>As Claude Monet stands among the most influential and globally acclaimed artists of all time, the anticipation surrounding this exhibition is truly palpable. For devoted admirers of Claude Monet, delve deeper into this article for intriguing facts that may pleasantly surprise you!</p><p><img src="/media/blog/monet-ueno-royal-museum/02-IMG_7793.jpeg" alt="" loading="lazy" /></p><p>モネの豆知識</p><p>彼は同じ題材を繰り返し描いており、代表的な例として睡蓮や干し草の山シリーズが挙げられます。</p><p>モネは、同じ風景でも時間帯や季節、天候によって光がどのように変化するかを探求するため、しばしば連作の絵画を制作しました。</p><p>Monet Frequently repainted the same subjects, popular examples being the water lilies and haystacks series.</p><p>He often created series of paintings exploring the way light changed the same landscape at different times of day, in different seasons, and in different weather conditions.</p><p><img src="/media/blog/monet-ueno-royal-museum/03-IMG_5130.jpeg" alt="" loading="lazy" /></p><p><em><img src="/media/blog/monet-ueno-royal-museum/04-IMG_7792.jpeg" alt="" loading="lazy" /></em></p><p>モネが無意識のうちに印象派という名前をつけたことをご存知でしょうか？</p><p>1872年、モネは「印象、日の出」を描き、仲間の画家たちと共ににパリで展示しました。</p><p>「印象派」という名前はある美術評論家による造語で、この絵が印象派運動の名称のきっかけになったと言われています。</p><p>Did you know that Monet unintentionally named the Impressionism movement?</p><p>In 1872, Monet painted “Impression, Sunrise”and exhibited it along other fellow artists in Paris.</p><p>Coined by an art critic, the painting is credited with inspiring the name of the Impressionist movement.</p><p><em><img src="/media/blog/monet-ueno-royal-museum/05-IMG_7791.jpeg" alt="" loading="lazy" /></em></p><p>モネが視力を失ったことを知っていますか？晩年のモネは白内障で視力が低下していきました。視覚障害に苦しみながらも、彼は絵を描き続けました。</p><p>Did you know that Monet lost his eyesight? Monet was severely affected by cataracts which clouded his vision. Although he suffered visual disturbances, he continued to paint.</p><p><em><img src="/media/blog/monet-ueno-royal-museum/06-IMG_7794.jpeg" alt="" loading="lazy" /></em></p><p>モネは浮世絵を愛し、多くの版画を収集しました。彼の「睡蓮」シリーズは、日本美術から多大な影響を受けていると言われています。</p><p>日本橋のような庭園の風景は、日本の様式が大きく影響されています。</p><p>Monet adored Ukiyo-e and collected many prints. It is believed that his Waterlilies series is highly inspired by Japanese art.</p><p>His garden landscape, such as the Japanese bridge, is directly influenced by Japanese styles.</p><p><em><img src="/media/blog/monet-ueno-royal-museum/07-monet_Japanese_bridge-1536x2048.jpeg" alt="" loading="lazy" /></em></p><p>美術館に足を運びとモネの世界観に没入した後、Artbarへのご参加をお勧めします。モネの印象派テクニックの本質をそれぞれが探求し、取り入れることが出来ます。そして私たちもあなたのモネ体験を完璧にサポート致します！</p><p>Following your museum visit and immersing yourself in the artistry of Monet’s style, we invite you to join us at Artbar to personally explore and embrace the essence of Monet’s impressionist technique to make your Monet experience complete!</p><p><em><img src="/media/blog/monet-ueno-royal-museum/08-IMG_8809-1-1536x1395.jpeg" alt="" loading="lazy" /><img src="/media/blog/monet-ueno-royal-museum/09-IMG_2755.jpeg" alt="" loading="lazy" />Source Citing:</em></p><p><em>Monet: Scenes From a Series of Paintings Flyer: https://www.ueno-mori.org/</em></p><p><em>”Haystacks” by Claude Monet Photo: https://mymodernmet.com/monet-haystacks/</em></p>`
    },
    {
      id: "207296",
      slug: "pouring-art-fluid-art-tokyo",
      published: true,
      image: "/media/blog/pouring-art-fluid-art-tokyo/00-IMG_7757.jpeg",
      date: "2023.10.01",
      tags: ["Pouring Art", "Artbar Tokyo", "Art & Culture"],
      titleEn: `Pouring Art / Fluid Art in Tokyo`,
      titleJp: `アートバー東京：日本におけるポーリングアート、たらし込みアートの先駆者`,
      authorEn: `Naomi Terada`,
      authorJp: `Naomi Terada`,
      excerptEn: `The paint pouring phenomenon, also known as acrylic pouring art or fluid art, gained popularity in the contemporary art world in the early 2010s.`,
      excerptJp: `たらし込みアート、またはアクリルポーリングアートやフルイドアートという名で知られているアートは、2010年代初頭に現代美術界で人気を博しました。`,
      contentEn: `<p>たらし込みアート、またはアクリルポーリングアートやフルイドアートという名で知られているアートは、2010年代初頭に現代美術界で人気を博しました。</p><p>The paint pouring phenomenon, also known as acrylic pouring art or fluid art, gained popularity in the contemporary art world in the early 2010s.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/00-IMG_7757.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/01-IMG_7770.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/02-IMG_7773.jpeg" alt="" loading="lazy" /></p><p>発祥を特定するのは難しいですが、アーティストが様々な技法を試し、ポーリングアート、フルイドアートの作品やそのプロセスをソーシャルメディアで共有、それが徐々に広く認知されるようになったのです。<br />
特にアートスタジオであるArtbar Tokyoはこの魅力的なテクニックを広め、日本のアート界隈賑わせる重要な役割を果たしました。</p><p>ArtbarTokyoについては、2016年に代官山にオープンし、ペイント＆ワインのセッションを行っています。たらし込みアート等のアート体験を提供する日本初のスタジオです。次に掲載している写真はオープン当初、2016年の様子です。</p><p>It is difficult to pinpoint a single place of origin as it emerged as a result of artists around the world experimenting with different techniques, sharing their fluid art creations and processes on social media which eventually became more widely recognized.</p><p>One studio in particular played a pivotal role in bringing this mesmerizing technique to Japanese art enthusiasts – Artbar Tokyo.</p><p>Artbar Tokyo, originally opened in 2016 in Daikanyama and became the first studio in Japan to offer paint and wine sessions, acrylic paint pouring classes, etc. It is considered the very first Paint &amp; Sip studio in Japan! Check out this throwback pic from 2016.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/03-IMG_7765.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/04-IMG_4088-1536x1536.jpeg" alt="" loading="lazy" /></p><p>たらし込みアートの素晴らしいところは、アート経験のない初心者でもプロセスを最後まで楽しめるところです。絵の具の流れがどうなるかは予測不可能なので、どの作品も唯一無二の仕上がりになります。子供に戻ったような気分で楽しむことができます。</p><p>The great thing about paint pouring is that even if you are a beginner or do not have any art experience, the process of making the artwork is so much fun and does not require technical skills. The final result is completely unique, no one artwork is the same! It is so much messy fun that you feel like a kid again.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/05-IMG_7760.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/06-IMG_7761.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/07-IMG_7762.jpeg" alt="" loading="lazy" /></p><p>たらし込みアートの作り方<br />
ステップ1：絵の具の色作り<br />
ステップ2：メディウムを混ぜ、絵の具をなめらかにする<br />
ステップ3：キャンバスに絵の具をたらしていき、模様を楽しみます。パターンは無限大！</p><p>How to make a paint pour artwork:</p><p>Step 1: Mix paint colors</p><p>Step 2: Mix with a pouring medium and create a smooth consistency</p><p>Step 3: Pour the colors on the canvas and enjoy creating your own original pattern and artwork!</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/08-IMG_7774.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/09-IMG_7775.jpeg" alt="" loading="lazy" /></p><p>たらし込みアートはどんな色を混ぜても素晴らしい作品に仕上がります。できあがった作品を部屋に飾るだけで、その部屋は一気にカラフルでスタイリッシュなアート空間へと変わるでしょう。</p><p>The final results of the artwork look amazing and just by simply decorating a room with your new art, the atmosphere of the space quickly changes into a more colorful, stylish, and artful room.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/10-IMG_7769.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/11-IMG_7768.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/12-IMG_7777.jpeg" alt="" loading="lazy" /></p><p>たらし込みセッションに参加したお客様の中には、作品に更にアレンジを加える方もいます。アレンジの方法は様々であり、どれもユニークで素晴らしいものばかりです。例えば、壁掛け時計、ビートルズのシルエットを上からペイント、結婚披露宴のアートワークとして…などがありました。</p><p>It is so interesting to see the unique ways some people transform their art to multimedia works  and even functional objects. Check out this wall clock, Beatles paint pour, and paint pour used as a centerpiece of a wedding reception.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/13-IMG_7763.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/14-IMG_7764.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/15-IMG_7778.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/16-IMG_7776.jpeg" alt="" loading="lazy" /></p><p>たらし込みアート豆知識</p><p>5年前、日本で初めて「たらし込みアート」 セッションを開催し始めた私たちArtbar Tokyo…<br />
このセッションを日本語でうまく表現できないかと考えた結果、名付けたのが“たらし込み”という名前でした。</p><p>日本語としておかしいと言われることも多いのですが、今でも変わらずこのユニークな名前を使い続けています。</p><p>最近たらし込みアートはとても人気です。アートを身近に感じる機会として、沢山の方に知っていただけているなと実感します。</p><p>アクリルペイントのポーリングアートが進化し、創造力を刺激し続ける中、このアートのムーブメントが私たちを次にどこへ連れて行ってくれるのか、想像するだけでわくわくします。経験豊富なアーティストも、これからアクリルアートの世界を探検する初心者の方も、ひとつだけ確かに言えることは、最終的なアートの仕上がりと同じくらい、そのプロセスも魅力的であるということです。</p><p>自分だけのオリジナルたらし込みアートを制作したい方は是非、www.artbar.co.jp をご覧ください。</p><p>Paint Pour Fun Fact:</p><p>When we first tried our paint pouring session, we brainstormed what to title the session in Japanese so it would be easy to understand and created the name, Tarashikomi Art, which means “To dribble or spill” in Japanese.</p><p>The name made some people laugh because of it’s uniqueness but we went with it and it’s very well known now!</p><p>As acrylic paint pouring continues to evolve and inspire creativity, it’s exciting to imagine where this pouring art movement will take us next. Whether you’re an experienced artist or a beginner looking to explore the world of acrylic paint pouring, one thing is certain – the process is just as captivating as the final result of the art itself.</p><p>For reservations on how to make your own original paint pouring art, check the www.artbar.co.jp</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/17-IMG_7758.jpeg" alt="" loading="lazy" /></p>`,
      contentJp: `<p>たらし込みアート、またはアクリルポーリングアートやフルイドアートという名で知られているアートは、2010年代初頭に現代美術界で人気を博しました。</p><p>The paint pouring phenomenon, also known as acrylic pouring art or fluid art, gained popularity in the contemporary art world in the early 2010s.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/00-IMG_7757.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/01-IMG_7770.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/02-IMG_7773.jpeg" alt="" loading="lazy" /></p><p>発祥を特定するのは難しいですが、アーティストが様々な技法を試し、ポーリングアート、フルイドアートの作品やそのプロセスをソーシャルメディアで共有、それが徐々に広く認知されるようになったのです。<br />
特にアートスタジオであるArtbar Tokyoはこの魅力的なテクニックを広め、日本のアート界隈賑わせる重要な役割を果たしました。</p><p>ArtbarTokyoについては、2016年に代官山にオープンし、ペイント＆ワインのセッションを行っています。たらし込みアート等のアート体験を提供する日本初のスタジオです。次に掲載している写真はオープン当初、2016年の様子です。</p><p>It is difficult to pinpoint a single place of origin as it emerged as a result of artists around the world experimenting with different techniques, sharing their fluid art creations and processes on social media which eventually became more widely recognized.</p><p>One studio in particular played a pivotal role in bringing this mesmerizing technique to Japanese art enthusiasts – Artbar Tokyo.</p><p>Artbar Tokyo, originally opened in 2016 in Daikanyama and became the first studio in Japan to offer paint and wine sessions, acrylic paint pouring classes, etc. It is considered the very first Paint &amp; Sip studio in Japan! Check out this throwback pic from 2016.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/03-IMG_7765.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/04-IMG_4088-1536x1536.jpeg" alt="" loading="lazy" /></p><p>たらし込みアートの素晴らしいところは、アート経験のない初心者でもプロセスを最後まで楽しめるところです。絵の具の流れがどうなるかは予測不可能なので、どの作品も唯一無二の仕上がりになります。子供に戻ったような気分で楽しむことができます。</p><p>The great thing about paint pouring is that even if you are a beginner or do not have any art experience, the process of making the artwork is so much fun and does not require technical skills. The final result is completely unique, no one artwork is the same! It is so much messy fun that you feel like a kid again.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/05-IMG_7760.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/06-IMG_7761.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/07-IMG_7762.jpeg" alt="" loading="lazy" /></p><p>たらし込みアートの作り方<br />
ステップ1：絵の具の色作り<br />
ステップ2：メディウムを混ぜ、絵の具をなめらかにする<br />
ステップ3：キャンバスに絵の具をたらしていき、模様を楽しみます。パターンは無限大！</p><p>How to make a paint pour artwork:</p><p>Step 1: Mix paint colors</p><p>Step 2: Mix with a pouring medium and create a smooth consistency</p><p>Step 3: Pour the colors on the canvas and enjoy creating your own original pattern and artwork!</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/08-IMG_7774.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/09-IMG_7775.jpeg" alt="" loading="lazy" /></p><p>たらし込みアートはどんな色を混ぜても素晴らしい作品に仕上がります。できあがった作品を部屋に飾るだけで、その部屋は一気にカラフルでスタイリッシュなアート空間へと変わるでしょう。</p><p>The final results of the artwork look amazing and just by simply decorating a room with your new art, the atmosphere of the space quickly changes into a more colorful, stylish, and artful room.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/10-IMG_7769.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/11-IMG_7768.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/12-IMG_7777.jpeg" alt="" loading="lazy" /></p><p>たらし込みセッションに参加したお客様の中には、作品に更にアレンジを加える方もいます。アレンジの方法は様々であり、どれもユニークで素晴らしいものばかりです。例えば、壁掛け時計、ビートルズのシルエットを上からペイント、結婚披露宴のアートワークとして…などがありました。</p><p>It is so interesting to see the unique ways some people transform their art to multimedia works  and even functional objects. Check out this wall clock, Beatles paint pour, and paint pour used as a centerpiece of a wedding reception.</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/13-IMG_7763.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/14-IMG_7764.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/15-IMG_7778.jpeg" alt="" loading="lazy" /><img src="/media/blog/pouring-art-fluid-art-tokyo/16-IMG_7776.jpeg" alt="" loading="lazy" /></p><p>たらし込みアート豆知識</p><p>5年前、日本で初めて「たらし込みアート」 セッションを開催し始めた私たちArtbar Tokyo…<br />
このセッションを日本語でうまく表現できないかと考えた結果、名付けたのが“たらし込み”という名前でした。</p><p>日本語としておかしいと言われることも多いのですが、今でも変わらずこのユニークな名前を使い続けています。</p><p>最近たらし込みアートはとても人気です。アートを身近に感じる機会として、沢山の方に知っていただけているなと実感します。</p><p>アクリルペイントのポーリングアートが進化し、創造力を刺激し続ける中、このアートのムーブメントが私たちを次にどこへ連れて行ってくれるのか、想像するだけでわくわくします。経験豊富なアーティストも、これからアクリルアートの世界を探検する初心者の方も、ひとつだけ確かに言えることは、最終的なアートの仕上がりと同じくらい、そのプロセスも魅力的であるということです。</p><p>自分だけのオリジナルたらし込みアートを制作したい方は是非、www.artbar.co.jp をご覧ください。</p><p>Paint Pour Fun Fact:</p><p>When we first tried our paint pouring session, we brainstormed what to title the session in Japanese so it would be easy to understand and created the name, Tarashikomi Art, which means “To dribble or spill” in Japanese.</p><p>The name made some people laugh because of it’s uniqueness but we went with it and it’s very well known now!</p><p>As acrylic paint pouring continues to evolve and inspire creativity, it’s exciting to imagine where this pouring art movement will take us next. Whether you’re an experienced artist or a beginner looking to explore the world of acrylic paint pouring, one thing is certain – the process is just as captivating as the final result of the art itself.</p><p>For reservations on how to make your own original paint pouring art, check the www.artbar.co.jp</p><p><img src="/media/blog/pouring-art-fluid-art-tokyo/17-IMG_7758.jpeg" alt="" loading="lazy" /></p>`
    },
    {
      id: "200787",
      slug: "texture-art-mediums",
      published: true,
      image: "/media/blog/texture-art-mediums/00-Screen-Shot-2023-08-03-at-11.12.52-AM.png",
      date: "2023.08.03",
      tags: ["How To", "Texture Art", "Art & Culture"],
      titleEn: `Texture Art: Choosing the Perfect Medium for a Masterpiece`,
      titleJp: `アートにおけるテクスチャー・メディウムの探求`,
      authorEn: `Cathy Thompson`,
      authorJp: `Cathy Thompson`,
      excerptEn: `テクスチャーはアート作品に生命を吹き込み、見る人を引き込みます。奥行きや立体感、手触りを加えることで、二次元のキャンバスを多感覚的な体験に変えることができます。適切なテクスチャー・メディウムを選ぶことは、イメージ通りの作品を制作する上でとても重要です。このブログでは、アートで使用される様々なテクスチャー・メディウムを紹介し、あなたの理想とする作品に近づけるためのヒントを提供しま...`,
      excerptJp: `テクスチャーはアート作品に生命を吹き込み、見る人を引き込みます。奥行きや立体感、手触りを加えることで、二次元のキャンバスを多感覚的な体験に変えることができます。`,
      contentEn: `<p><img src="/media/blog/texture-art-mediums/01-texture1-1536x2048.jpg" alt="" loading="lazy" /></p><p>テクスチャーはアート作品に生命を吹き込み、見る人を引き込みます。奥行きや立体感、手触りを加えることで、二次元のキャンバスを多感覚的な体験に変えることができます。適切なテクスチャー・メディウムを選ぶことは、イメージ通りの作品を制作する上でとても重要です。このブログでは、アートで使用される様々なテクスチャー・メディウムを紹介し、あなたの理想とする作品に近づけるためのヒントを提供します。</p><h3>テクスチャー・メディウムとは？</h3><p>作品にさまざまな質感を与えるために使用する素材のことです。これらのメディウムをキャンバスの表面に塗り、様々な方法で操作することで、質感や奥行き、視覚的な面白さを生み出すことができます。以下は、アートでよく使われるテクスチャー・メディウムです：</p><p>1. アクリル・モデリング・ペースト： アクリル・モデリング・ペーストは、アクリル絵の具と混ぜてテクスチャーを加えることができる、多目的なメディウムです。滑らかなものから粗いものまで様々な種類があり、表面を作り上げたり、複雑なディテールを作るのに使うことができます。アクリル絵の具を使う場合、速乾性を求める場合に最適です。</p><p><img src="/media/blog/texture-art-mediums/02-Screen-Shot-2023-08-03-at-11.58.30-AM.png" alt="" loading="lazy" />2.ジェッソ：ジェッソは絵画の下地処理に使われる下塗り剤ですが、テクスチャーのメディウムとしても使えます。何層にも重ねたり、他の物と混ぜて塗ったりすることで、ざらざらした粒状の表面を作り出し、絵の具の質感を高めることができます。</p><p>3. 油絵のメディウム：油絵具を使う場合には、絵具と混ぜてテクスチャーを作ることができる様々な油絵専用のメディウムがあります。スタンドオイル、リンシードオイル、インパストジェルは、様々なテクスチャーを表現するために使用できる油絵具のメディウムの一例です。</p><p>4. テクスチャー・ジェルとペースト： 画材店では、テクスチャージェルやペーストを幅広く取り揃えています。これらは作品にテクスチャーを加えるために特別にデザインされたもので、アクリル絵具や油絵具に使用できます。粗いテクスチャー、粒状のテクスチャー、滑らかなテクスチャーを試すことができます。</p><p>5. ホームセンター テクスチャーペースト スパックルは、特に大規模な作品を作る場合に試してみると楽しいものです。軽くてすぐに乾きますが、ムラがあるとひび割れすることがあります。多くのブランドがありますが、軽くてすぐに乾くものを選びましょう。ジョイント・コンパウンドも似たようなもので、テクスチャー・アートにも使えますが、一般的に乾きが遅く、重みがあります。</p><p>6.自家製テクスチャーペースト<br />
好きなテクスチャのものを独自に混ぜて作ることもできます。あなたのアートワークにとって最良の結果を得ることができるかを確認してみましょう。自家製テクスチャーペーストはお金を節約できますが、キャンバスにひびが入ったり、うまくくっつかないものもあるので、本番の作品に使う前に試してみてください。コーンスターチと糊を混ぜたものが一般的です。</p><ul><li>コーンスターチ 1/2カップ</li><li>白のり 大さじ1</li><li>アクリル絵の具大さじ1（色付け用</li><li>濃すぎる場合は水を数滴加え、密閉容器に入れておく。</li></ul><p>7. コラージュ材料： ティッシュペーパー、布、砂、あるいは葉っぱや小枝のような自然の要素など、コラージュ素材を取り入れることで、作品にユニークな質感を加えることができます。コラージュはミクストメディア的なアプローチが可能で、さまざまなテクスチャーを組み合わせることで、複雑で魅力的な作品を作ることができます。</p><p><img src="/media/blog/texture-art-mediums/03-collage-close-naomi.jpg" alt="" loading="lazy" /><img src="/media/blog/texture-art-mediums/04-collage-close-naomi-2.jpg" alt="" loading="lazy" /><img src="/media/blog/texture-art-mediums/05-Collage-art-2-naomi.jpg" alt="" loading="lazy" /></p><h3>適切なテクスチャーのメディウムを選ぶ</h3><p><img src="/media/blog/texture-art-mediums/06-Screen-Shot-2023-06-13-at-9.53.20-PM.png" alt="" loading="lazy" /><img src="/media/blog/texture-art-mediums/07-17693190061721.jpg" alt="" loading="lazy" /></p><p>一般的なテクスチャー・メディウムをいくつか学んだところで、次は作品に適したメディウムの選び方を考えましょう：</p><p>1. どんな作品にしたいのかを明確にする： 作品の最終的な仕上がりをイメージすることから始めましょう。どのような感情を呼び起こしたいですか？メッセージを伝えるために必要な視覚的・触覚的要素は何か？あなたのビジョンを理解することは、あなたの目的に最も合致するテクスチャー・メディウムのタイプを決定するのに役立ちます。</p><p>2. 実験と探求： 小さな画面やスケッチブックで、さまざまなテクスチャー・メディウムを試してみて下さい。それぞれのメディウムがどのように作用するか、乾燥時間、他の素材とどのように相互作用するかを知ることができます。様々なメディウムを試すことは、あなたのレパートリーを広げ、新たな創造の可能性を与えてくれるでしょう。</p><p>3. 好みのアートスタイルを考える<br />
好みの画風や技法を考慮しましょう。メディウムによっては、特定のスタイルに適したものがあります。例えば、大胆なテクスチャーを使った抽象的な作品を作るのが好きなら、アクリルモデリングペーストやテクスチャージェルが理想的かもしれません。一方、より伝統的なアプローチを好むのであれば、油絵のメディウムを使う方が適しているかもしれません。</p><p>4. 作品のスケールについて考えましょう： テクスチャ・メディウムを選ぶ際には、作品のスケールが重要です。大きな作品に適したメディウムもあれば、小さくて細かい作品に最適なメディウムもあります。テクスチャーがキャンバスの大きさや全体の構図をどのように引き立てるかを考えましょう。</p><p>テクスチャー・メディウムは、アートワークを創造性の新たな高みへと昇華させる強力なツールです。正しいテクスチャ・メディウムを選ぶことは、あなたのビジョンを実現し、独自のスタイルを表現するために不可欠です。さまざまなテクスチャ・メディウムの特性と可能性を理解し、恐れずに試してみることで、可能性を広げ、魅惑的なアートワークを創り出すことができます。さあ、あなたのイマジネーションを爆発させてください！</p>`,
      contentJp: `<p><img src="/media/blog/texture-art-mediums/01-texture1-1536x2048.jpg" alt="" loading="lazy" /></p><p>テクスチャーはアート作品に生命を吹き込み、見る人を引き込みます。奥行きや立体感、手触りを加えることで、二次元のキャンバスを多感覚的な体験に変えることができます。適切なテクスチャー・メディウムを選ぶことは、イメージ通りの作品を制作する上でとても重要です。このブログでは、アートで使用される様々なテクスチャー・メディウムを紹介し、あなたの理想とする作品に近づけるためのヒントを提供します。</p><h3>テクスチャー・メディウムとは？</h3><p>作品にさまざまな質感を与えるために使用する素材のことです。これらのメディウムをキャンバスの表面に塗り、様々な方法で操作することで、質感や奥行き、視覚的な面白さを生み出すことができます。以下は、アートでよく使われるテクスチャー・メディウムです：</p><p>1. アクリル・モデリング・ペースト： アクリル・モデリング・ペーストは、アクリル絵の具と混ぜてテクスチャーを加えることができる、多目的なメディウムです。滑らかなものから粗いものまで様々な種類があり、表面を作り上げたり、複雑なディテールを作るのに使うことができます。アクリル絵の具を使う場合、速乾性を求める場合に最適です。</p><p><img src="/media/blog/texture-art-mediums/02-Screen-Shot-2023-08-03-at-11.58.30-AM.png" alt="" loading="lazy" />2.ジェッソ：ジェッソは絵画の下地処理に使われる下塗り剤ですが、テクスチャーのメディウムとしても使えます。何層にも重ねたり、他の物と混ぜて塗ったりすることで、ざらざらした粒状の表面を作り出し、絵の具の質感を高めることができます。</p><p>3. 油絵のメディウム：油絵具を使う場合には、絵具と混ぜてテクスチャーを作ることができる様々な油絵専用のメディウムがあります。スタンドオイル、リンシードオイル、インパストジェルは、様々なテクスチャーを表現するために使用できる油絵具のメディウムの一例です。</p><p>4. テクスチャー・ジェルとペースト： 画材店では、テクスチャージェルやペーストを幅広く取り揃えています。これらは作品にテクスチャーを加えるために特別にデザインされたもので、アクリル絵具や油絵具に使用できます。粗いテクスチャー、粒状のテクスチャー、滑らかなテクスチャーを試すことができます。</p><p>5. ホームセンター テクスチャーペースト スパックルは、特に大規模な作品を作る場合に試してみると楽しいものです。軽くてすぐに乾きますが、ムラがあるとひび割れすることがあります。多くのブランドがありますが、軽くてすぐに乾くものを選びましょう。ジョイント・コンパウンドも似たようなもので、テクスチャー・アートにも使えますが、一般的に乾きが遅く、重みがあります。</p><p>6.自家製テクスチャーペースト<br />
好きなテクスチャのものを独自に混ぜて作ることもできます。あなたのアートワークにとって最良の結果を得ることができるかを確認してみましょう。自家製テクスチャーペーストはお金を節約できますが、キャンバスにひびが入ったり、うまくくっつかないものもあるので、本番の作品に使う前に試してみてください。コーンスターチと糊を混ぜたものが一般的です。</p><ul><li>コーンスターチ 1/2カップ</li><li>白のり 大さじ1</li><li>アクリル絵の具大さじ1（色付け用</li><li>濃すぎる場合は水を数滴加え、密閉容器に入れておく。</li></ul><p>7. コラージュ材料： ティッシュペーパー、布、砂、あるいは葉っぱや小枝のような自然の要素など、コラージュ素材を取り入れることで、作品にユニークな質感を加えることができます。コラージュはミクストメディア的なアプローチが可能で、さまざまなテクスチャーを組み合わせることで、複雑で魅力的な作品を作ることができます。</p><p><img src="/media/blog/texture-art-mediums/03-collage-close-naomi.jpg" alt="" loading="lazy" /><img src="/media/blog/texture-art-mediums/04-collage-close-naomi-2.jpg" alt="" loading="lazy" /><img src="/media/blog/texture-art-mediums/05-Collage-art-2-naomi.jpg" alt="" loading="lazy" /></p><h3>適切なテクスチャーのメディウムを選ぶ</h3><p><img src="/media/blog/texture-art-mediums/06-Screen-Shot-2023-06-13-at-9.53.20-PM.png" alt="" loading="lazy" /><img src="/media/blog/texture-art-mediums/07-17693190061721.jpg" alt="" loading="lazy" /></p><p>一般的なテクスチャー・メディウムをいくつか学んだところで、次は作品に適したメディウムの選び方を考えましょう：</p><p>1. どんな作品にしたいのかを明確にする： 作品の最終的な仕上がりをイメージすることから始めましょう。どのような感情を呼び起こしたいですか？メッセージを伝えるために必要な視覚的・触覚的要素は何か？あなたのビジョンを理解することは、あなたの目的に最も合致するテクスチャー・メディウムのタイプを決定するのに役立ちます。</p><p>2. 実験と探求： 小さな画面やスケッチブックで、さまざまなテクスチャー・メディウムを試してみて下さい。それぞれのメディウムがどのように作用するか、乾燥時間、他の素材とどのように相互作用するかを知ることができます。様々なメディウムを試すことは、あなたのレパートリーを広げ、新たな創造の可能性を与えてくれるでしょう。</p><p>3. 好みのアートスタイルを考える<br />
好みの画風や技法を考慮しましょう。メディウムによっては、特定のスタイルに適したものがあります。例えば、大胆なテクスチャーを使った抽象的な作品を作るのが好きなら、アクリルモデリングペーストやテクスチャージェルが理想的かもしれません。一方、より伝統的なアプローチを好むのであれば、油絵のメディウムを使う方が適しているかもしれません。</p><p>4. 作品のスケールについて考えましょう： テクスチャ・メディウムを選ぶ際には、作品のスケールが重要です。大きな作品に適したメディウムもあれば、小さくて細かい作品に最適なメディウムもあります。テクスチャーがキャンバスの大きさや全体の構図をどのように引き立てるかを考えましょう。</p><p>テクスチャー・メディウムは、アートワークを創造性の新たな高みへと昇華させる強力なツールです。正しいテクスチャ・メディウムを選ぶことは、あなたのビジョンを実現し、独自のスタイルを表現するために不可欠です。さまざまなテクスチャ・メディウムの特性と可能性を理解し、恐れずに試してみることで、可能性を広げ、魅惑的なアートワークを創り出すことができます。さあ、あなたのイマジネーションを爆発させてください！</p>`
    },
    {
      id: "198274",
      slug: "yokohama-day-trip",
      published: true,
      image: "/media/blog/yokohama-day-trip/00-yoko-blog-cover-e1689337390950.jpg",
      date: "2023.07.23",
      tags: ["Travel", "Best Of List", "Yokohama"],
      titleEn: `Day Trip Plan in Yokohama`,
      titleJp: `横浜散策：楽しく感性を刺激する1日`,
      authorEn: `Cathy Thompson`,
      authorJp: `Cathy Thompson`,
      excerptEn: `The Cosmo Clock 21 Ferris wheel in Minato Mirai is an iconic landmark of Yokohama, offering views of the wide cityscape and port of Yokohama, and on clear days, even Mt.`,
      excerptJp: `はじめに 日本で2番目に大きな都市である横浜は、地元の人々にとっても観光客にとっても様々なアクティビティを楽しむことが出来る、活気ある街です。`,
      contentEn: `<p>はじめに 日本で2番目に大きな都市である横浜は、地元の人々にとっても観光客にとっても様々なアクティビティを楽しむことが出来る、活気ある街です。渋谷から電車でわずか30分で訪れることができ、グルメ、芸術、港など魅力的なスポットが万歳で、リラックスした雰囲気も魅力的です。</p><p>中でも特におすすめなスポットをいくつかご紹介します！</p><h3><strong>1. 遠くまで見渡せる！特大の観覧車：</strong></h3><h3><strong>1.Sweeping Views from the Giant Ferris Wheel:</strong></h3><p><img src="/media/blog/yokohama-day-trip/01-ferris-wheel-yoko-e1689337099711-849x1024.jpg" alt="" loading="lazy" /></p><p>横浜探索の幕開けには、上空からの息をのむような眺めを！みなとみらいにある観覧車「コスモクロック21」は、横浜の象徴的なランドマークで、横浜の広い街並みや横浜港、晴れた日には富士山まで見渡す事ができます。<br />
夜には、ライトアップされた夜景が水面に映り、幻想的な雰囲気！</p><p>The Cosmo Clock 21 Ferris wheel in Minato Mirai is an iconic landmark of Yokohama, offering views of the wide cityscape and port of Yokohama, and on clear days, even Mt. Fuji!<br />
At night, the illuminated night view is reflected on the water, creating a moody and romantic atmosphere!</p><h3><strong>2. カップヌードルミュージアム：</strong></h3><p>カップヌードルを愛する人々のために作られた、楽しくて興味深い場所！！商品がどのように開発されたのか、そしてなぜ開発されたのかを学び、長年にわたる驚くべきバラエティーを見ることができます。自分好みのオリジナルの味を作る事もできますよ！</p><h3><strong>3. 赤レンガ倉庫 &amp;</strong><strong>マリン・アンド・ウォーク:</strong></h3><p>1905年に建てられたこの歴史的な貿易ビルは、ショッピングエリアに生まれ変わり、職人技が光る工芸品から流行のファッションまで、ユニークなお店を万歳です！</p><p>赤レンガ倉庫のすぐ隣にあり、海辺のリゾートでくつろいでいるような気分になれます。</p><p>おしゃれなフォトスポットもたくさんあります！</p><h3><strong>4. クラフトビールで乾杯！：</strong></h3><p>ビール愛好家にとって、横浜は天国です！港近くにあるHammer Headは、爽やかなビールと美味しい料理が楽しめる人気スポット。様々な種類の地ビールや輸入クラフトビールを缶ビールで楽しむなら、隣にあるセブンイレブンで豊富なバラエティーを見る事ができます！</p><h3><strong>5. 中華街で舌鼓:</strong></h3><p>To kickstart your Yokohama exploration, begin with breathtaking views from above! The “Cosmo Clock 21” Ferris wheel in Minato Mirai is an iconic Yokohama landmark, offering panoramic vistas of the cityscape, Yokohama Port, and on clear days, even Mt. Fuji! At night, the illuminated cityscape is reflected on the water, creating a dreamy and romantic atmosphere.</p><h3>2. Cup Noodle Museum:</h3><p>A fun and intriguing place designed for Cup Noodle enthusiasts! Learn how the product was developed, why it was created, and explore an astonishing variety that has evolved over the years. You can even create your own original flavor!</p><h3>3. Red Brick Warehouse &amp; Marine &amp; Walk:</h3><p>This historic trading building, constructed in 1905, has been transformed into a shopping area featuring unique shops, from exquisite craftsmanship to trendy fashion. Located right next to the Red Brick Warehouse, it offers a seaside resort-like atmosphere with plenty of stylish photo spots!</p><h3>4. Cheers with Craft Beer!:</h3><p>For beer enthusiasts, Yokohama is a paradise! Hammer Head, located near the harbor, is a popular spot to enjoy refreshing beers and delicious food. If you prefer to savor various kinds of local and imported craft beers in cans, you can explore a rich variety at the adjacent Seven-Eleven!</p><h3>5. Savor Chinese Delights in Chinatown:</h3><p><img src="/media/blog/yokohama-day-trip/02-friends-yoko-blog-china.jpg" alt="" loading="lazy" /></p><p>横浜を訪れたら、日本最大の活気あふれる中華街はマスト！香ばしい香りとカラフルな装飾でいっぱいの賑やかな通りを歩きながら、中華街独特の雰囲気に浸る事ができます。食欲をそそる餃子や香ばしい麺類、エキゾチックな珍味など、美味しい中華料理を堪能しよう。定番の肉まんや北京ダックもお勧め！</p><h3><strong>7. Artbarでクリエイティブなひとときを：</strong></h3><p>When visiting Yokohama, a must-visit is Japan’s largest and most vibrant Chinatown! You can immerse yourself in the unique atmosphere of Chinatown while strolling through lively streets filled with fragrant aromas and colorful decorations. Enjoy delicious Chinese cuisine, including mouthwatering dumplings, savory noodles, and exotic delicacies. Classic dishes like meat buns and Peking duck are also highly recommended!</p><h3>7. Get Creative at Artbar Yokohama:</h3><p>一日の締めくくりには、アートとワインを組み合わせたユニークなクリエイティブ・スペース、Artbar Yokohama Motomachiへ。</p><p>ペイント＆ワインイベントに参加すれば、才能豊かな、あなたの内なる芸術性が溢れ出し、</p><p>傑作を生み出すことができるはず！<br />
ワインを堪能しながら、インストラクターの指導のもと、ペインティングを楽しんで下さい。Artbarでの体験は、お友達との絆を深め、この楽しいひと時を作品と共にお土産として持ち帰ることができます！</p><h3>最後に…</h3><p>横浜は、様々な文化が途切れることなく融合した魅力的な街です。観覧車に乗ったり、ショッピングを楽しんだり、美味しい中華料理を味わったり、Artbarで創造力を発揮したり…誰もが楽しめるものがたくさんあります！</p><p>皆様もぜひ横浜での感性を刺激する1日を楽しんでみては…？</p><p>To wrap up your day, head to Artbar Yokohama Motomachi, a unique creative space that combines art and wine. Join a Paint &amp; Wine event, where your inner artist can flourish, and you can create your own original masterpiece! Enjoy wine while painting under the guidance of the instructor. Your experience at Artbar will deepen bonds with friends, and you can take this fun moment home as a souvenir along with your artwork!</p><p>Finally…<br />
Yokohama is a captivating city where various cultures seamlessly merge. Whether riding a ferris wheel, indulging in shopping, savoring delicious Chinese cuisine, unleashing your creativity at Artbar, there’s something for everyone to enjoy!</p><p><img src="/media/blog/yokohama-day-trip/05-freiends-marine-walk-blog-1536x885.jpg" alt="" loading="lazy" /></p>`,
      contentJp: `<p>はじめに 日本で2番目に大きな都市である横浜は、地元の人々にとっても観光客にとっても様々なアクティビティを楽しむことが出来る、活気ある街です。渋谷から電車でわずか30分で訪れることができ、グルメ、芸術、港など魅力的なスポットが万歳で、リラックスした雰囲気も魅力的です。</p><p>中でも特におすすめなスポットをいくつかご紹介します！</p><h3><strong>1. 遠くまで見渡せる！特大の観覧車：</strong></h3><h3><strong>1.Sweeping Views from the Giant Ferris Wheel:</strong></h3><p><img src="/media/blog/yokohama-day-trip/01-ferris-wheel-yoko-e1689337099711-849x1024.jpg" alt="" loading="lazy" /></p><p>横浜探索の幕開けには、上空からの息をのむような眺めを！みなとみらいにある観覧車「コスモクロック21」は、横浜の象徴的なランドマークで、横浜の広い街並みや横浜港、晴れた日には富士山まで見渡す事ができます。<br />
夜には、ライトアップされた夜景が水面に映り、幻想的な雰囲気！</p><p>The Cosmo Clock 21 Ferris wheel in Minato Mirai is an iconic landmark of Yokohama, offering views of the wide cityscape and port of Yokohama, and on clear days, even Mt. Fuji!<br />
At night, the illuminated night view is reflected on the water, creating a moody and romantic atmosphere!</p><h3><strong>2. カップヌードルミュージアム：</strong></h3><p>カップヌードルを愛する人々のために作られた、楽しくて興味深い場所！！商品がどのように開発されたのか、そしてなぜ開発されたのかを学び、長年にわたる驚くべきバラエティーを見ることができます。自分好みのオリジナルの味を作る事もできますよ！</p><h3><strong>3. 赤レンガ倉庫 &amp;</strong><strong>マリン・アンド・ウォーク:</strong></h3><p>1905年に建てられたこの歴史的な貿易ビルは、ショッピングエリアに生まれ変わり、職人技が光る工芸品から流行のファッションまで、ユニークなお店を万歳です！</p><p>赤レンガ倉庫のすぐ隣にあり、海辺のリゾートでくつろいでいるような気分になれます。</p><p>おしゃれなフォトスポットもたくさんあります！</p><h3><strong>4. クラフトビールで乾杯！：</strong></h3><p>ビール愛好家にとって、横浜は天国です！港近くにあるHammer Headは、爽やかなビールと美味しい料理が楽しめる人気スポット。様々な種類の地ビールや輸入クラフトビールを缶ビールで楽しむなら、隣にあるセブンイレブンで豊富なバラエティーを見る事ができます！</p><h3><strong>5. 中華街で舌鼓:</strong></h3><p>To kickstart your Yokohama exploration, begin with breathtaking views from above! The “Cosmo Clock 21” Ferris wheel in Minato Mirai is an iconic Yokohama landmark, offering panoramic vistas of the cityscape, Yokohama Port, and on clear days, even Mt. Fuji! At night, the illuminated cityscape is reflected on the water, creating a dreamy and romantic atmosphere.</p><h3>2. Cup Noodle Museum:</h3><p>A fun and intriguing place designed for Cup Noodle enthusiasts! Learn how the product was developed, why it was created, and explore an astonishing variety that has evolved over the years. You can even create your own original flavor!</p><h3>3. Red Brick Warehouse &amp; Marine &amp; Walk:</h3><p>This historic trading building, constructed in 1905, has been transformed into a shopping area featuring unique shops, from exquisite craftsmanship to trendy fashion. Located right next to the Red Brick Warehouse, it offers a seaside resort-like atmosphere with plenty of stylish photo spots!</p><h3>4. Cheers with Craft Beer!:</h3><p>For beer enthusiasts, Yokohama is a paradise! Hammer Head, located near the harbor, is a popular spot to enjoy refreshing beers and delicious food. If you prefer to savor various kinds of local and imported craft beers in cans, you can explore a rich variety at the adjacent Seven-Eleven!</p><h3>5. Savor Chinese Delights in Chinatown:</h3><p><img src="/media/blog/yokohama-day-trip/02-friends-yoko-blog-china.jpg" alt="" loading="lazy" /></p><p>横浜を訪れたら、日本最大の活気あふれる中華街はマスト！香ばしい香りとカラフルな装飾でいっぱいの賑やかな通りを歩きながら、中華街独特の雰囲気に浸る事ができます。食欲をそそる餃子や香ばしい麺類、エキゾチックな珍味など、美味しい中華料理を堪能しよう。定番の肉まんや北京ダックもお勧め！</p><h3><strong>7. Artbarでクリエイティブなひとときを：</strong></h3><p>When visiting Yokohama, a must-visit is Japan’s largest and most vibrant Chinatown! You can immerse yourself in the unique atmosphere of Chinatown while strolling through lively streets filled with fragrant aromas and colorful decorations. Enjoy delicious Chinese cuisine, including mouthwatering dumplings, savory noodles, and exotic delicacies. Classic dishes like meat buns and Peking duck are also highly recommended!</p><h3>7. Get Creative at Artbar Yokohama:</h3><p>一日の締めくくりには、アートとワインを組み合わせたユニークなクリエイティブ・スペース、Artbar Yokohama Motomachiへ。</p><p>ペイント＆ワインイベントに参加すれば、才能豊かな、あなたの内なる芸術性が溢れ出し、</p><p>傑作を生み出すことができるはず！<br />
ワインを堪能しながら、インストラクターの指導のもと、ペインティングを楽しんで下さい。Artbarでの体験は、お友達との絆を深め、この楽しいひと時を作品と共にお土産として持ち帰ることができます！</p><h3>最後に…</h3><p>横浜は、様々な文化が途切れることなく融合した魅力的な街です。観覧車に乗ったり、ショッピングを楽しんだり、美味しい中華料理を味わったり、Artbarで創造力を発揮したり…誰もが楽しめるものがたくさんあります！</p><p>皆様もぜひ横浜での感性を刺激する1日を楽しんでみては…？</p><p>To wrap up your day, head to Artbar Yokohama Motomachi, a unique creative space that combines art and wine. Join a Paint &amp; Wine event, where your inner artist can flourish, and you can create your own original masterpiece! Enjoy wine while painting under the guidance of the instructor. Your experience at Artbar will deepen bonds with friends, and you can take this fun moment home as a souvenir along with your artwork!</p><p>Finally…<br />
Yokohama is a captivating city where various cultures seamlessly merge. Whether riding a ferris wheel, indulging in shopping, savoring delicious Chinese cuisine, unleashing your creativity at Artbar, there’s something for everyone to enjoy!</p><p><img src="/media/blog/yokohama-day-trip/05-freiends-marine-walk-blog-1536x885.jpg" alt="" loading="lazy" /></p>`
    },
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
      gifts: "Gifts",
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
        ratingSource: "Average rating",
        guestsNumber: "101,000",
        guestsSuffix: "guests across Tokyo — and counting"
      },
      concept: {
        est: "Artbar Tokyo – Est. 2016",
        title: "Paint, drink, and laugh with friends.\nNo art skills required.",
        p1: "Pick a painting, pour a glass, and follow along at your own pace. No experience needed — just show up and see what happens.",
        ratingLabel: "Average Rating",
        guestsCount: "101,000",
        guestsLabel: "101,000+ guests across Tokyo — and counting"
      },
      howItWorks: {
        title: "How Artbar works",
        subtitle: "No art skills? No problem. We make it easy to go from blank canvas to masterpiece.",
        steps: [
          { title: "Book", desc: "Choose a session from our calendar that sparks your interest. We update our schedule monthly." },
          { title: "Sip", desc: "Enjoy bottomless wine, tea, or coffee while you settle in. Arrive 15 minutes early to grab a drink." },
          { title: "Create", desc: "Follow our artist's step-by-step guidance. No experience is needed to get great results." },
          { title: "Enjoy", desc: "Most paintings can be taken home the same day. Some require drying time and will be shipped to you COD. See event details." }
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
          { title: "Bilingual Instruction Available", desc: "Many sessions are instructed in English and Japanese. Please check individual class information.", image: GI.featureBilingual }
        ]
      },
      testimonials: {
        title: "What our guests say",
        featured: HOME_TESTIMONIALS_FEATURED_EN,
        carousel: HOME_TESTIMONIALS_CAROUSEL_EN,
      },
      cta: {
        badge: "Ready to Create?",
        title: "Your next favourite session starts here.",
        subtitle: "Pick a date, pick a painting, show up. We handle the rest.",
        btnBook: "View Schedule",
        btnContact: "Contact Us"
      }
    },
    footer: {
      tagline: "Japan's first paint & sip studio — est. 2016.",
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
      subtitle: "Our talented team of artists is here to guide you every step of the way."
    },
    teamBuilding: {
      hero: {
        badge: "9+ years providing creative team building experiences throughout Japan",
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
          { title: "Personal Masterpiece", desc: "Our classic session. Everyone creates their own finished artwork with step-by-step guidance.", link: "Most Popular" },
          { title: "Puzzle Masterpiece", desc: "Work together on separate canvases that combine to form one giant image.", link: "Best for Unity" },
          { title: "Custom Workshop", desc: "A tailored creative session designed around your team's goals, pace, and event style.", link: "Tailored for Teams" }
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
          items: ["2 Hours of Studio Time", "All Art Materials & Aprons", "Bilingual Instruction Available on Request", "Free-Flow Wine, Tea, Coffee", "Light Snacks (Crackers/Nuts)", "Cleanup Service"]
        },
        catering: {
          title: "Catering Options",
          desc: "Need more food? We can point you in the right direction for catering options, or you are welcome to bring your own food!",
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
        title: "Inclusive Packages",
        desc: "No hidden fees. Per-person pricing includes drinks, light snacks, materials, and instruction. Keep it simple, or add extras when your team needs something special.",
        packageBadge: "In Studio",
        packageTitle: "Standard Team Building",
        packageSubtitle: "2 Hour Session",
        price: "¥7,700",
        priceNote: "per person (tax inc)",
        feeLabel: "Venue Fee",
        feePrice: "¥5,500",
        offsiteLabel: "Custom Options",
        offsitePrice: "Contact us for more options.",
        cta: "Request Availability"
      }
    },
    privateParties: {
      hero: {
        badge: "Private Events",
        title: "Celebrate in",
        titleHighlight: "Style",
        subtitle: "Celebrations, birthdays, or just a night out with friends. Make it memorable with Artbar."
      },
      occasions: [
        { title: "Adult Parties", image: GI.privateOccasions.birthday },
        { title: "Girls Nite Out", image: GI.privateOccasions.bachelorette },
        { title: "Kids Parties", image: GI.privateOccasions.kidsParty },
        { title: "Family Gatherings", image: GI.privateOccasions.anniversary }
      ],
      pricing: {
        adult: {
          title: "Adult Party",
          subtitle: "2 Hour Paint & Sip",
          price: "¥6,600",
          items: [
            { title: "Private Studio Use", desc: "Exclusive use of the space for your group" },
            { title: "All Materials", desc: "Canvas, paints, brushes, aprons" },
            { title: "Free-Flow Drinks", desc: "Red/White wine, tea, coffee, juice and light snacks" },
            { title: "Instruction", desc: "Step-by-step guidance" }
          ],
          cta: "Book Adult Party"
        },
        kids: {
          title: "Kids Party",
          subtitle: "2 Hour Creative Fun",
          price: "¥4,620",
          items: [
            { title: "Private Studio Use", desc: "Safe and fun environment" },
            { title: "Art Materials", desc: "Kid-friendly paints and supplies" },
            { title: "Drinks & Snacks", desc: "Juice, tea, water and light snacks" },
            { title: "Instruction", desc: "Patient guidance for all skill levels" }
          ],
          cta: "Book Kids Party"
        },
        common: {
          venueFeeLabel: "Private Event Fee",
          venueFeePrice: "¥5,500",
          minGuestsLabel: "Minimum Guests",
          minGuests: "10"
        }
      },
      capacity: {
        title: "Studio Capacities"
      },
      timeline: {
        title: "Sample Timeline",
        note: "Guests can arrive up to 5 minutes before the start time.",
        steps: [
          { time: "0:00", title: "Arrival & Drinks", desc: "Guests arrive, grab an apron and a glass of wine." },
          { time: "0:15", title: "Painting Begins", desc: "Instructor starts the step-by-step guidance." },
          { time: "1:00", title: "Break & Socialize", desc: "Refill drinks and take photos." },
          { time: "1:40", title: "Finishing Touches", desc: "Add final details and sign your masterpiece." },
          { time: "1:45", title: "Cake and Photos", desc: "Sing, blow out candles and have some cake." }
        ]
      },
      catering: {
        title: "Food, Cake & Decorations",
        desc: "Celebrate with us! We will make the event special and relaxing for you and your guests.",
        items: [
          "Bring your own cake, food, or additional alcohol",
          "Decorate for the occasion 15 minutes before the event",
          "We will take care of cleanup and garbage"
        ],
        notes: [
          "Please bring your own plates and utensils.",
          "A ¥1,000 garbage fee applies if food is catered."
        ],
        cta: "Cake and catering contacts near our studios"
      },
      specialtyInquiry: {
        title: "Looking for something different?",
        items: [
          "Mixed Adult & Child Family Events",
          "Crafts",
          "Private Pouring",
          "Large Canvas",
          "Specialty Events"
        ],
        note: "Contact us for custom pricing",
        cta: "Inquire"
      }
    },
    locationsPage: {
      operating: {
        title: "Operating Company",
        name: "Paint Garage LLC",
        address: "7-2 Daikanyamacho, Shibuya-ku, Tokyo",
        ceo: "CEO: Cathy Thompson",
        inquiryText: "For franchise or hiring inquiries, contact us at",
        inquiryEmail: "tokyo@artbar.co.jp",
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
            price: "¥6,600",
            priceNote: "tax included",
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
      gifts: "ギフト券",
      book: "予約する",
      blog: "ジャーナル",
      paintYourPet: "ペットを描こう"
    },
    home: {
      hero: {
        badge: "「10周年記念」",
        title: "東京で一番愛されている",
        titleHighlight: "ペイント＆シップスタジオ",
        subtitle:
          "初心者歓迎。東京各地で開催中。<wbr>やってみると、意外と簡単。<wbr>楽しさは、想像以上。",
        ctaSchedule: "セッションを予約する",
        ctaPrivate: "プライベートイベント",
        ctaLineChat: "LINEで相談する",
        ctaFindPainting: "描きたい絵を探す",
        ratingScore: "4.8",
        ratingSource: "平均評価",
        guestsNumber: "101,000",
        guestsSuffix: "「{{count}}名が体験済み。まだまだ増えています。」"
      },
      concept: {
        est: "Artbar Tokyo – Est. 2016",
        title: "友達と描いて、飲んで、笑おう。\nアートの経験は一切不要。",
        p1: "好きな絵を選んで、グラスを傾けて、自分のペースで描くだけ。\n経験不要。あとは来てみれば、わかります。",
        ratingLabel: "平均評価",
        guestsCount: "101,000",
        guestsLabel: "{{count}}名が体験済み。まだまだ増えています。"
      },
      howItWorks: {
        title: "Artbarの楽しみ方",
        subtitle: "アートの経験は一切不要. 真っ白なキャンバスが、あなただけのアートに変わるまでのプロセスをお楽しみください。",
        steps: [
          { title: "予約", desc: "カレンダーから、心惹かれるテーマのセッションをお選びください。" },
          { title: "乾杯", desc: "スタジオではフリーフローのワインやコーヒーをご用意。エプロンをつけて、リラックスしたひとときを。" },
          { title: "制作", desc: "インストラクターが丁寧にガイドします。初心者の方でも、驚くような作品に仕上がります。" },
          { title: "完成", desc: "作品は10〜15日以内にご自宅へ配送。届いたらすぐ飾れます。" }
        ]
      },
      themes: {
        title: "人気のテーマ",
        subtitle: "古典的な名画の模写から、モダンなテクスチャーアートまで。多彩なプログラムをご用意しています。",
        cta: "スケジュールを見る",
        items: POPULAR_THEMES_JP
      },
      features: {
        title: "Artbarの体験",
        subtitle: "日常を忘れて没頭できる、充実のサービス。",
        items: [
          { title: "オールインクルーシブ", desc: "画材、エプロン、お持ち帰り袋など、必要なものは全てご用意。手ぶらでお越しください。", image: GI.featureAllInclusive },
          { title: "フリーフロードリンク", desc: "セッション中は、ワイン、紅茶、コーヒー、軽食をフリーフロー（飲み放題）でお楽しみいただけます。", image: GI.featureFreeFlowDrinks },
          { title: "バイリンガル対応あり", desc: "多くのクラスで英語・日本語のバイリンガル指導をご提供しています。各クラスの講師情報をご確認ください。", image: GI.featureBilingual }
        ]
      },
      testimonials: {
        title: "参加者の声",
        featured: HOME_TESTIMONIALS_FEATURED_JP,
        carousel: HOME_TESTIMONIALS_CAROUSEL_JP,
      },
      cta: {
        badge: "さあ、始めましょう",
        title: "次の特別な時間、ここから始めよう。",
        subtitle: "日程を選んで、絵を選んで、あとは来るだけ。準備はすべてこちらで。",
        btnBook: "スケジュールを見る",
        btnContact: "お問い合わせ"
      }
    },
    footer: {
      tagline: "日本初のペイント＆シップスタジオ — 2016年創業",
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
      subtitle: "才能豊かなアーティストたちが、あなたの創作をサポートします。"
    },
    teamBuilding: {
      hero: {
        badge: "日本全国で9年以上、創造的なチームビルディング体験を提供",
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
          { title: "カスタム・ワークショップ", desc: "チームの目的や雰囲気に合わせて内容を組み立てる、オーダーメイド型のクリエイティブ体験です。", link: "企業向けに最適化" }
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
          items: ["2時間のスタジオ貸切・セッション", "全ての画材・エプロン", "バイリンガル指導（ご希望に応じて）", "フリーフロードリンク（ワイン/お茶/珈琲）", "軽食（クラッカー/ナッツ）", "準備・清掃サービス"]
        },
        catering: {
          title: "ケータリング・オプション",
          desc: "追加のお食事が必要な場合は、ご希望に合わせたケータリングをご案内することも、お持ち込みいただくことも可能です。",
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
        title: "パッケージ料金",
        desc: "ドリンク、軽食、画材、講師による進行を含む、お一人様ごとの明瞭な料金です。シンプルな開催から特別なアレンジまで、目的に合わせてご提案します。",
        packageBadge: "スタジオ開催",
        packageTitle: "スタンダード・プラン",
        packageSubtitle: "2時間セッション",
        price: "¥7,700",
        priceNote: "1名様あたり (税込)",
        feeLabel: "会場費",
        feePrice: "¥5,500",
        offsiteLabel: "カスタムオプション",
        offsitePrice: "詳しくはお問い合わせください。",
        cta: "空き状況・見積もりを依頼"
      }
    },
    privateParties: {
      hero: {
        badge: "プライベートイベント",
        title: "特別な日を、",
        titleHighlight: "アートと共に彩る",
        subtitle: "お祝い、誕生日、友人との特別な夜に。\nArtbarでしか味わえない、洗練されたパーティーを。"
      },
      occasions: [
        { title: "大人向けパーティー", image: GI.privateOccasions.birthday },
        { title: "女子会", image: GI.privateOccasions.bachelorette },
        { title: "キッズ・パーティー", image: GI.privateOccasions.kidsParty },
        { title: "ファミリーイベント", image: GI.privateOccasions.anniversary }
      ],
      pricing: {
        adult: {
          title: "大人向け貸切プラン",
          subtitle: "2時間 ペイント＆シップ",
          price: "¥6,600",
          items: [
            { title: "スタジオ完全貸切", desc: "プライベートな空間で気兼ねなく" },
            { title: "全ての画材一式", desc: "キャンバス、絵具、エプロン等" },
            { title: "フリーフロードリンク", desc: "赤白ワイン、ソフトドリンク、軽食付き" },
            { title: "専属インストラクター", desc: "ステップごとに丁寧にサポート" }
          ],
          cta: "予約・お問い合わせ"
        },
        kids: {
          title: "キッズ・バースデー",
          subtitle: "2時間 クリエイティブ・ファン",
          price: "¥4,620",
          items: [
            { title: "スタジオ完全貸切", desc: "お子様も安心の安全な環境" },
            { title: "キッズ用画材", desc: "衣服についても落ちやすい絵具を使用" },
            { title: "ソフトドリンク", desc: "ジュースやお茶、軽食付き" },
            { title: "専属インストラクター", desc: "お子様の感性を優しく引き出します" }
          ],
          cta: "予約・お問い合わせ"
        },
        common: {
          venueFeeLabel: "プライベートイベント費",
          venueFeePrice: "¥5,500",
          minGuestsLabel: "最低保証人数",
          minGuests: "10名〜"
        }
      },
      capacity: {
        title: "各スタジオの定員"
      },
      timeline: {
        title: "当日の流れ（例）",
        note: "開始時間の5分前からご入店いただけます。",
        steps: [
          { time: "0:00", title: "ドアオープン＆乾杯", desc: "ゲストをお迎えし、エプロンを選んでワインで乾杯。" },
          { time: "0:15", title: "セッション開始", desc: "インストラクターのデモンストレーションと共にペイント開始。" },
          { time: "1:00", title: "ブレイクタイム", desc: "おしゃべりを楽しんだり、写真撮影をしたり。ドリンクのおかわりも。" },
          { time: "1:40", title: "仕上げ・サイン", desc: "作品に最後の仕上げをし、サインを入れて完成です。" },
          { time: "1:45", title: "ケーキと写真撮影", desc: "歌って、キャンドルを吹き消して、ケーキをお楽しみください。" }
        ]
      },
      catering: {
        title: "フード・ケーキ・装飾",
        desc: "大切なイベントを、ゲストの皆さまがリラックスして楽しめる特別な時間にします。",
        items: [
          "ケーキ、フード、追加のアルコールをお持ち込みいただけます",
          "イベント開始15分前から装飾できます",
          "片付けとゴミの対応はお任せください"
        ],
        notes: [
          "お皿とカトラリーはご持参ください。",
          "ケータリングをご利用の場合、ゴミ処理費として1,000円を頂戴します。"
        ],
        cta: "スタジオ近隣のケーキ・ケータリング情報"
      },
      specialtyInquiry: {
        title: "別の内容をご希望ですか？",
        items: [
          "大人と子どもの合同ファミリーイベント",
          "クラフト",
          "プライベートポーリング",
          "大きなキャンバス",
          "特別イベント"
        ],
        note: "カスタム料金についてお問い合わせください",
        cta: "問い合わせる"
      }
    },
    locationsPage: {
      operating: {
        title: "運営会社",
        name: "Paint Garage 合同会社",
        address: "東京都渋谷区代官山町7-2",
        ceo: "代表: キャシー・トンプソン",
        inquiryText: "フランチャイズ・採用に関するお問い合わせは、こちらまでご連絡ください。",
        inquiryEmail: "tokyo@artbar.co.jp",
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
            price: "¥6,600",
            priceNote: "税込",
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
