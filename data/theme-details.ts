import type { LucideIcon } from 'lucide-react';
import {
  MapPin, Sparkles, Paintbrush, Wind, Wine, Heart,
  CheckCircle, GlassWater, Coffee,
  Palette, Sun, Moon, Star, Users, Camera, Gift,
  Layers, Lightbulb, Droplets, Zap, Wand2,
  Cloud, Flower, User, Smile, Hammer, Mic2, Trophy, Music, Truck,
} from 'lucide-react';
import { THEME_JP } from './theme-details-jp-strings';

export interface ThemeContent {
  title: string;
  heroBadge: string;
  heroSub: string;
  introTitle: string;
  introDesc: string;
  quickFeatures: { icon: LucideIcon; title: string; desc: string }[];
  examples: { title: string; image: string }[];
  expectTitle: string;
  expectDesc: string;
  perfectTitle: string;
  perfectFor: string[];
  whatYouGet: { icon: LucideIcon; text: string; sub: string }[];
  ctaTitle: string;
  ctaSub: string;
  seoTitle: string;
  seoDesc: string;
}

export const getPh = (w: number, h: number, text: string) =>
  `https://www.toolandtea.com/placeholder.svg?height=${h}&width=${w}&text=${encodeURIComponent(text)}`;

export const THEME_CONFIG: Record<string, ThemeContent> = {
  'japan-inspired': {
    title: "Japan-Inspired Painting Classes with Wine",
    heroBadge: "Artbar Tokyo Themes",
    heroSub: "Experience the quiet poetry of Japanese landscapes through the best paint and sip Tokyo has to offer.",
    introTitle: "What is Japan-Inspired Art?",
    introDesc: "Japan-inspired art captures mood before detail — quiet winter skies, glowing lanterns drifting at dusk, and the soft warmth of Fuji in autumn. These scenes feel poetic and grounded, connecting you to nature, tradition, and the gentle poetry of everyday Japan.",
    quickFeatures: [
      { icon: MapPin, title: "Iconic Landscapes", desc: "Paint Mount Fuji, cherry blossoms, and seasonal scenes." },
      { icon: Paintbrush, title: "Traditional Techniques", desc: "Learn rhythmic brushwork and layered gradients." },
      { icon: Wind, title: "Mood & Atmosphere", desc: "Capture the quiet poetry of Japanese aesthetics." }
    ],
    examples: [
      { title: "Hokusai Great Wave Pop Art", image: getPh(800, 800, "Hokusai Wave") },
      { title: "Fuji in Autumn", image: getPh(800, 800, "Fuji Autumn") },
      { title: "Lanterns in the Sky", image: getPh(800, 800, "Lanterns") },
      { title: "Cherry Blossom Path", image: getPh(800, 800, "Sakura Path") }
    ],
    expectTitle: "A Premier Tokyo Creative Experience",
    expectDesc: "Expect a warm, beginner-friendly studio atmosphere where creativity meets social connection. Our Japan-inspired sessions are the gold standard of 'sip and paint' in Tokyo. We guide you through iconic pieces like Hokusai's Great Wave or Fuji in Autumn, teaching you to build layered gradients and rhythmic brushwork while you enjoy premium wine. This bilingual art class is designed for relaxation, ensuring every guest leaves with a masterpiece and a smile.",
    perfectTitle: "Who it's Perfect For",
    perfectFor: [
      "Visitors wanting a creative and authentic Tokyo memory", 
      "Locals who love Japanese scenery and traditional aesthetics", 
      "Couples seeking a calm, artistic date night in the heart of the city", 
      "Art enthusiasts looking for a bilingual social painting event"
    ],
    whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: GlassWater, text: "Assorted Teas & Coffee", sub: "Tea, coffee, and soft drinks to fuel your focus" },
      { icon: CheckCircle, text: "Step-by-Step Guide", sub: "Many classes are bilingual; please check the instructor's listed language" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Explore Japan-Inspired Sessions",
    ctaSub: "Browse our upcoming bilingual art classes and reserve your spot today.",
    seoTitle: "Japan-Inspired Painting Classes Tokyo | Artbar Tokyo",
    seoDesc: "Paint Mt. Fuji, Sakura, and Hokusai waves at Artbar Tokyo. Join our bilingual paint and sip experience in Shibuya and Ginza."
  },
  'van-gogh': {
    title: "Van Gogh Paint and Sip Classes",
    heroBadge: "Modern Classics",
    heroSub: "Step into the vibrant, swirling world of Post-Impressionist masterpieces with wine in hand.",
    introTitle: "Why Paint Van Gogh?",
    introDesc: "Vincent Van Gogh's expressive brushwork is the ultimate entry point for beginner artists. We focus on bold color, thick textures, and the emotional energy that makes every painting feel deeply personal and alive.",
    quickFeatures: [
      { icon: Moon, title: "Expressive Motion", desc: "Master the iconic energy of the Starry Night sky." },
      { icon: Palette, title: "Bold Texture", desc: "Learn 'impasto' techniques to add dimension to your art." },
      { icon: Sun, title: "Vivid Palette", desc: "Explore high-contrast colors and emotional intensity." }
    ],
    examples: [
      { title: "Starry Night over Tokyo", image: getPh(800, 800, "Starry Night") },
      { title: "Sunflowers", image: getPh(800, 800, "Sunflowers") },
      { title: "Cafe Terrace at Night", image: getPh(800, 800, "Cafe Terrace") },
      { title: "Bedroom in Arles", image: getPh(800, 800, "Arles Bedroom") }
    ],
    expectTitle: "The Ultimate Sip and Paint Session",
    expectDesc: "Step into our lounge-style studio for an unforgettable Tokyo art class. We simplify the complex layers of 'Starry Night' into achievable steps, making it perfect for those with zero experience. As you paint and sip on bottomless wine, you'll feel the stress of the city melt away.",
    perfectTitle: "Ideal for Creative Minds",
    perfectFor: [
      "Art fans looking for a hand-on historical experience", 
      "Groups of friends wanting a high-energy social event", 
      "Travelers seeking an English-friendly activity in Tokyo",
      "Anyone wanting to learn bold acrylic painting techniques"
    ],
    whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Palette, text: "Professional Art Materials", sub: "High-grade canvases, acrylics, and aprons provided" },
      { icon: Coffee, text: "Japanese Snacks & Tea", sub: "Delicious light bites to keep your creativity flowing" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Paint Like Van Gogh",
    ctaSub: "Check our bilingual calendar for upcoming Starry Night and Sunflower sessions.",
    seoTitle: "Van Gogh Painting Class Tokyo | Artbar Paint and Sip",
    seoDesc: "Create your own Starry Night in Tokyo. Professional bilingual art classes with wine, snacks, and all-inclusive materials."
  },
  'paint-pouring': {
    title: "Paint Pouring Classes with Wine",
    heroBadge: "Fluid Art Series",
    heroSub: "Dive into the mesmerizing world of fluid dynamics and vibrant cells in our signature paint pouring art classes.",
    introTitle: "What is Paint Pouring Art?",
    introDesc: "Paint pouring, or fluid art, is a mesmerizing technique where acrylic paints are thinned and poured onto a canvas to create unique, marble-like patterns.",
    quickFeatures: [
      { icon: Droplets, title: "Fluid Dynamics", desc: "Master the art of paint density and mixing for perfect cells." },
      { icon: Zap, title: "Instant Results", desc: "Create stunning, professional-looking abstract art in one session." },
      { icon: Wand2, title: "Pure Expression", desc: "Unleash your creativity without the need for traditional drawing skills." }
    ],
    examples: [
      { title: "Ocean Wave Fluid Art", image: getPh(800, 800, "Ocean Pour") },
      { title: "Galaxy Nebula Swirl", image: getPh(800, 800, "Galaxy Pour") },
      { title: "Metallic Marble Melt", image: getPh(800, 800, "Marble Pour") },
      { title: "Neon Energy Abstract", image: getPh(800, 800, "Neon Pour") }
    ],
    expectTitle: "A Mesmerizing Tokyo Fluid Art Experience",
    expectDesc: "Step into our high-energy studio for Tokyo's premier paint pouring experience. You'll learn several techniques guided by our bilingual experts while sipping on bottomless premium wine.",
    perfectTitle: "Perfect for Every Creator",
    perfectFor: [
      "Beginners looking for an easy, high-impact art style", 
      "Groups seeking a fun, interactive social activity in Tokyo", 
      "Abstract art lovers wanting to experiment with fluid mediums", 
      "Anyone looking for a therapeutic and satisfying creative release"
    ],
    whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Palette, text: "Professional Fluid Mediums", sub: "High-quality acrylics and pouring mediums provided" },
      { icon: CheckCircle, text: "Step-by-Step Technique Coaching", sub: "Many classes are bilingual; please check the instructor's listed language" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Unleash Your Inner Fluid Artist",
    ctaSub: "Browse our upcoming paint pouring sessions and reserve your spot today.",
    seoTitle: "Paint Pouring Classes Tokyo | Fluid Art Paint and Sip Artbar",
    seoDesc: "Discover the magic of paint pouring in Tokyo. Join our bilingual fluid art sessions with wine, snacks, and expert instruction."
  },
  'alcohol-ink': {
    title: "Alcohol Ink Art Classes with Wine",
    heroBadge: "Ethereal Series",
    heroSub: "Create dreamy, ethereal abstract art using vibrant inks and airflow in our specialized Tokyo studio.",
    introTitle: "What is Alcohol Ink Art?",
    introDesc: "Alcohol ink art is a delicate process of layering translucent colors and metallic highlights, moved by air and spirit to create organic, flowy compositions that resemble marble or clouds.",
    quickFeatures: [
      { icon: Wind, title: "Airflow Technique", desc: "Learn to move ink with blowers and air to create soft edges." },
      { icon: Sparkles, title: "Metallic Accents", desc: "Add gold and silver leaf for a luxurious, elevated finish." },
      { icon: Cloud, title: "Ethereal Moods", desc: "Craft dreamy landscapes and abstract color washes." }
    ],
    examples: [
      { title: "Ocean Depths", image: getPh(800, 800, "Ocean Ink") },
      { title: "Sunset Clouds", image: getPh(800, 800, "Sunset Ink") },
      { title: "Marble Elegance", image: getPh(800, 800, "Marble Ink") },
      { title: "Gilded Blossom", image: getPh(800, 800, "Gilded Ink") }
    ],
    expectTitle: "A Sophisticated Creative Escape",
    expectDesc: "Our Alcohol Ink sessions are among the most popular for those seeking a modern, interior-design-ready result. We provide specialized non-porous paper and high-pigment inks. With wine in hand, you'll learn to control the uncontrollable flow of color.",
    perfectTitle: "For the Modern Aesthetic",
    perfectFor: [
      "People looking for home-decor style art",
      "Creative souls who enjoy delicate, detailed processes",
      "Couples looking for a unique, relaxing date night",
      "Anyone wanting to try a non-traditional painting medium"
    ],
     whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Wine, tea, and juice for most classes" },
      { icon: Droplets, text: "Vibrant Copic & Piñata Inks", sub: "The highest quality professional inks provided" },
      { icon: CheckCircle, text: "Expert Airflow Instruction", sub: "Master the use of blowers and blending tools" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Flow with Alcohol Ink",
    ctaSub: "Book your ethereal art experience in Shibuya or Ginza today.",
    seoTitle: "Alcohol Ink Art Tokyo | Paint and Sip Classes | Artbar",
    seoDesc: "Create ethereal abstract art at Artbar Tokyo. Professional alcohol ink workshops with wine and all materials. Ideal for home decor lovers."
  },
  'monet': {
    title: "Claude Monet Paint and Sip Sessions",
    heroBadge: "Impressionist Series",
    heroSub: "Paint the soft light and blooming gardens of Giverny in our atmospheric Tokyo painting studio.",
    introTitle: "Why Paint Monet?",
    introDesc: "Claude Monet's style is all about the 'impression' of a moment—light hitting water, the colors of a garden in the morning mist. It's a forgiving, beautiful style perfect for beginners.",
    quickFeatures: [
      { icon: Droplets, title: "Water Lilies", desc: "Master the iconic reflections and soft blues of the Lily Pond." },
      { icon: Flower, title: "Garden Palettes", desc: "Explore vibrant floral colors and dappled light techniques." },
      { icon: Wind, title: "Soft Edges", desc: "Learn to blend without boundaries for a dreamy finish." }
    ],
    examples: [
      { title: "Water Lilies in Blue", image: getPh(800, 800, "Water Lilies") },
      { title: "Woman with Parasol", image: getPh(800, 800, "Parasol") },
      { title: "Japanese Bridge", image: getPh(800, 800, "Bridge") },
      { title: "Poppy Field", image: getPh(800, 800, "Poppy Field") }
    ],
    expectTitle: "The Poetry of Impressionism",
    expectDesc: "Join us for a relaxing afternoon or evening painting Monet's most beloved scenes. Our bilingual instructors teach you to layer colors to create depth and atmosphere, all while you enjoy bottomless wine and light snacks.",
    perfectTitle: "For Lovers of Light",
    perfectFor: ["Beginner painters", "Garden and nature enthusiasts", "Couples", "Art history buffs"],
    whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Palette, text: "Impressionist Palette Setup", sub: "Colors curated to match Monet's iconic style" },
      { icon: CheckCircle, text: "Gentle Step-by-Step Guidance", sub: "Many classes are bilingual; please check the instructor's listed language" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Capture the Impression",
    ctaSub: "Reserve your spot for our next Monet garden session.",
    seoTitle: "Monet Painting Classes Tokyo | Impressionist Paint and Sip",
    seoDesc: "Paint like Monet in Tokyo. Join our bilingual water lily workshops with free-flow wine and snacks. Perfect for beginners."
  },
  'picasso': {
    title: "Picasso Style Paint and Sip Classes",
    heroBadge: "Modern Masters",
    heroSub: "Unleash your cubist side and paint bold, expressive portraits in our high-energy Tokyo studio.",
    introTitle: "Why Paint Picasso?",
    introDesc: "Picasso taught us to see the world from many angles at once. His style is about breaking rules, using bold shapes, and expressing raw emotion through color.",
    quickFeatures: [
      { icon: Layers, title: "Cubist Vision", desc: "Learn to deconstruct faces and objects into geometric shapes." },
      { icon: Palette, title: "Bold Expression", desc: "Use high-contrast colors to convey powerful moods." },
      { icon: Wand2, title: "Breaking Rules", desc: "Forget traditional perspective and find your own style." }
    ],
    examples: [
      { title: "Cubist Self Portrait", image: getPh(800, 800, "Cubist Face") },
      { title: "Abstract Guitarist", image: getPh(800, 800, "Guitarist") },
      { title: "The Blue Period Study", image: getPh(800, 800, "Blue Period") },
      { title: "Modern Muse", image: getPh(800, 800, "Modern Muse") }
    ],
    expectTitle: "A Bold Creative Workout",
    expectDesc: "Expect a session full of energy and experimentation. We guide you through the process of 'abstracting' your subject, encouraging you to be brave with your brushwork while you enjoy unlimited wine.",
    perfectTitle: "For the Bold & Brave",
    perfectFor: ["People who find realism boring", "Fans of modern art", "High-energy social groups", "Experienced doodlers"],
     whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Paintbrush, text: "Professional Grade Acrylics", sub: "Vibrant pigments for that high-contrast look" },
      { icon: CheckCircle, text: "Step-by-Step Creative Coaching", sub: "Many classes are bilingual; please check the instructor's listed language" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Be a Modern Master",
    ctaSub: "Browse our Picasso-inspired sessions and book now.",
    seoTitle: "Picasso Abstract Art Class Tokyo | Paint and Sip Artbar",
    seoDesc: "Create cubist art at Artbar Tokyo. Our Picasso sessions are bold, fun, and bilingual. Wine and all materials included."
  },
  'renoir': {
    title: "Renoir Painting Classes with Wine",
    heroBadge: "Romantic Series",
    heroSub: "Paint the soft, glowing beauty of people and light in the style of Pierre-Auguste Renoir.",
    introTitle: "What is the Renoir Style?",
    introDesc: "Renoir celebrated beauty, feminine elegance, and the soft play of sunlight. His paintings are warm, full of life, and use soft, feathery brushstrokes.",
    quickFeatures: [
      { icon: Sun, title: "Glow & Warmth", desc: "Learn to create that signature 'inner light' in your subjects." },
      { icon: User, title: "Romantic Figures", desc: "Paint figures and portraits with soft, graceful lines." },
      { icon: Palette, title: "Soft Textures", desc: "Master the look of delicate fabrics and skin tones." }
    ],
    examples: [
      { title: "Girl with a Watering Can", image: getPh(800, 800, "Renoir Girl") },
      { title: "Two Girls at Piano", image: getPh(800, 800, "Piano Study") },
      { title: "Boating Party Mood", image: getPh(800, 800, "Boating Party") },
      { title: "Summer Flowers", image: getPh(800, 800, "Renoir Flowers") }
    ],
    expectTitle: "A Session of Pure Beauty",
    expectDesc: "Our Renoir sessions are calm and rewarding. You'll learn how to use soft blending techniques to create a glowing effect on your canvas, paired with a selection of premium wines for a romantic evening.",
    perfectTitle: "Perfect for Dreamers",
    perfectFor: ["Fans of classical beauty", "Couples", "Anyone seeking a relaxing art session", "Portrait lovers"],
    whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Palette, text: "Curated Pastel Palettes", sub: "Soft tones chosen for romantic compositions" },
      { icon: CheckCircle, text: "Step-by-Step Blending Coaching", sub: "Many classes are bilingual; please check the instructor's listed language" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Paint Romance",
    ctaSub: "Book your soft-light Renoir session in Tokyo today.",
    seoTitle: "Renoir Painting Class Tokyo | Romantic Paint and Sip Artbar",
    seoDesc: "Paint with soft light and romantic colors at Artbar Tokyo. Renoir-style classes with wine and snacks in a bilingual environment."
  },
  'matisse': {
    title: "Matisse Inspired Art Classes with Wine",
    heroBadge: "Fauvist Series",
    heroSub: "Celebrate 'The Joy of Life' with bold, flat colors and expressive cut-out styles in the heart of Tokyo.",
    introTitle: "Why Paint Matisse?",
    introDesc: "Henri Matisse was the master of color and simplicity. Whether painting vibrant interiors or his famous 'cut-outs', his work is about balance, purity, and serenity.",
    quickFeatures: [
      { icon: Zap, title: "Color Vibrancy", desc: "Learn to use colors that 'pop' and vibrate against each other." },
      { icon: Layers, title: "Simplification", desc: "Discover how to simplify complex scenes into beautiful shapes." },
      { icon: Paintbrush, title: "Expressive Lines", desc: "Master the art of minimal, flowing brushstrokes." }
    ],
    examples: [
      { title: "Blue Nude Cut-out", image: getPh(800, 800, "Blue Nude") },
      { title: "Goldfish Bowl", image: getPh(800, 800, "Matisse Goldfish") },
      { title: "The Dance Study", image: getPh(800, 800, "The Dance") },
      { title: "Red Room Abstract", image: getPh(800, 800, "Red Room") }
    ],
    expectTitle: "A Joyful Creative Escape",
    expectDesc: "Matisse sessions are fun, liberating, and very beginner-friendly. We focus on the emotional power of color and the grace of simple shapes. With bottomless wine, it's a celebration of pure creativity.",
    perfectTitle: "For Lovers of Color",
    perfectFor: ["Minimalist design fans", "Beginners", "Those needing a mood boost", "Modernists"],
    whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Palette, text: "High-Pigment Colors", sub: "Professional paints that stay bright and bold" },
      { icon: CheckCircle, text: "Step-by-Step Composition Tips", sub: "Many classes are bilingual; please check the instructor's listed language" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Find Your Joy",
    ctaSub: "Check our bilingual schedule for upcoming Matisse workshops.",
    seoTitle: "Matisse Modern Art Class Tokyo | Paint and Sip Artbar",
    seoDesc: "Discover the joy of color at Artbar Tokyo. Matisse-style workshops featuring bold colors and simple shapes. Bilingual and wine-inclusive."
  },
  'kids': {
    title: "Creative Painting Classes for Kids",
    heroBadge: "Junior Artists",
    heroSub: "Inspire your little ones with fun, imaginative painting sessions in a safe and supportive Tokyo studio.",
    introTitle: "Artbar for Kids",
    introDesc: "Our kids' sessions are designed to spark curiosity and confidence. We focus on fun themes—from space and dinosaurs to cute animals—while teaching basic art skills in an easy-to-follow way.",
    quickFeatures: [
      { icon: Smile, title: "Fun Themes", desc: "Animals, space, and magic for imaginative minds." },
      { icon: Palette, title: "Color Theory", desc: "Introduction to mixing and exploring the rainbow." },
      { icon: Heart, title: "Confidence Boost", desc: "A positive environment where every child is an artist." }
    ],
    examples: [
      { title: "Space Adventure", image: getPh(800, 800, "Space Kid") },
      { title: "Rainbow Cat", image: getPh(800, 800, "Rainbow Cat") },
      { title: "Jungle Friends", image: getPh(800, 800, "Jungle") },
      { title: "Magical Castle", image: getPh(800, 800, "Castle") }
    ],
    expectTitle: "A Supervised Creative Playdate",
    expectDesc: "Expect 90 minutes to 2 hours of pure fun. Our instructors are patient and used to teaching kids of all skill levels. Parents can relax nearby while kids create their own canvas masterpieces.",
    perfectTitle: "For Young Explorers",
    perfectFor: ["Kids aged 5-12", "School holidays", "Weekend activities", "Birthday treats"],
    whatYouGet: [
      { icon: GlassWater, text: "Juice, Tea & Water", sub: "Healthy refreshments for young creators" },
      { icon: Coffee, text: "Snacks for Energy", sub: "Light, kid-friendly treats included" },
      { icon: CheckCircle, text: "Step-by-Step Guidance", sub: "Easy instructions in English and Japanese" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Start Their Art Journey",
    ctaSub: "View our weekend kids' sessions and book today.",
    seoTitle: "Kids Art Classes Tokyo | Children's Painting Workshops Artbar",
    seoDesc: "Fun and bilingual art classes for kids in Tokyo. Weekend sessions with snacks, juice, and all materials. Safe and supportive environment."
  },
  'texture-art': {
    title: "Texture Painting Classes with Wine",
    heroBadge: "3D Series",
    heroSub: "Experience the tactile joy of sculptural art using modeling paste and knives in our Tokyo studio.",
    introTitle: "What is Texture Art?",
    introDesc: "Texture art is about adding a third dimension to your canvas. Using palette knives, sponges, and modeling paste, you'll create peaks, valleys, and patterns that catch the light.",
    quickFeatures: [
      { icon: Hammer, title: "Sculptural Peaks", desc: "Learn to build height and dimension with paste." },
      { icon: Layers, title: "Textural Contrast", desc: "Explore the difference between rough and smooth surfaces." },
      { icon: Palette, title: "Monochromatic Depth", desc: "Create stunning minimalist art using shadow and light." }
    ],
    examples: [
      { title: "Ocean Swells", image: getPh(800, 800, "Ocean Texture") },
      { title: "Minimalist Bloom", image: getPh(800, 800, "Textured Flower") },
      { title: "Mountain Ridges", image: getPh(800, 800, "Mountain Texture") },
      { title: "Abstract Rhythm", image: getPh(800, 800, "Abstract 3D") }
    ],
    expectTitle: "A Tactile Artistic Experience",
    expectDesc: "Texture painting is deeply satisfying. You'll move beyond the brush and use a variety of tools to 'sculpt' your painting. It's a meditative, physical process paired perfectly with a glass of wine.",
    perfectTitle: "For the Hands-on Artist",
    perfectFor: ["Minimalist interior fans", "People who love tactile processes", "Beginners", "Abstract lovers"],
    whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Droplets, text: "Modeling Paste & Gels", sub: "Professional grade structural mediums" },
      { icon: CheckCircle, text: "Palette Knife Instruction", sub: "Master the tools of textural art" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Feel the Art",
    ctaSub: "Book your texture session in Shibuya or Ginza today.",
    seoTitle: "Texture Art Classes Tokyo | 3D Paint and Sip Artbar",
    seoDesc: "Create sculptural 3D art at Artbar Tokyo. Use modeling paste and palette knives in our bilingual wine sessions. Perfect for abstract art lovers."
  },
  'paint-your-pet': {
    title: "Paint Your Pet Classes with Wine",
    heroBadge: "Special Edition",
    heroSub: "Immortalize your furry friend on canvas with our professional sketch-assisted painting classes in Tokyo.",
    introTitle: "Our Most Popular Session",
    introDesc: "Paint Your Pet is a unique experience where our artists hand-sketch your pet's photo onto a canvas before you arrive, making it easy for you to focus on the colors and personality.",
    quickFeatures: [
      { icon: Camera, title: "Photo Transfer", desc: "Send us a photo and we'll prepare the professional outline." },
      { icon: Heart, title: "Personalized Gift", desc: "Create a heartfelt memory of your beloved pet." },
      { icon: Palette, title: "Custom Palettes", desc: "Get help mixing the perfect fur and eye colors." }
    ],
    examples: [
      { title: "Happy Golden Retriever", image: getPh(800, 800, "Golden Portrait") },
      { title: "Majestic Calico Cat", image: getPh(800, 800, "Calico Portrait") },
      { title: "Frenchie in Color", image: getPh(800, 800, "Frenchie Art") },
      { title: "Double Pet Portrait", image: getPh(800, 800, "Two Pets") }
    ],
    expectTitle: "A Heartwarming Artistic Journey",
    expectDesc: "Expect a session filled with smiles and 'awws'. Since the sketch is already done, there's no stress about proportions. You can simply enjoy your wine and bring your pet to life on canvas.",
    perfectTitle: "For Pet Lovers",
    perfectFor: ["Pet owners", "Gifting", "Memorials", "Animal enthusiasts"],
     whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Paintbrush, text: "Hand-Sketched Canvas", sub: "A custom professional outline of your pet" },
      { icon: CheckCircle, text: "One-on-One Guidance", sub: "Detailed help with fur and features" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "Paint Your Best Friend",
    ctaSub: "Check our calendar for the next limited Paint Your Pet session.",
    seoTitle: "Paint Your Pet Tokyo | Custom Pet Portraits Class | Artbar",
    seoDesc: "Paint a portrait of your pet at Artbar Tokyo. We sketch it for you! Professional bilingual instruction with wine and snacks included."
  },
  'paint-your-idol': {
    title: "Paint Your Idol Classes with Wine",
    heroBadge: "Fandom & Icons",
    heroSub: "Celebrate your favorite icon, musician, or character on canvas in Tokyo's most energetic art class.",
    introTitle: "What is Paint Your Idol?",
    introDesc: "A high-energy session dedicated to pop culture. Whether it's a legendary musician, a movie star, or your favorite anime character, we help you translate their essence onto canvas with bold colors and style.",
    quickFeatures: [
      { icon: Mic2, title: "Iconic Portraits", desc: "Focus on capturing the distinct features of your chosen idol." },
      { icon: Music, title: "Playlist Vibes", desc: "We match the studio music to the theme for ultimate inspiration." },
      { icon: Trophy, title: "Fan Masterpieces", desc: "Create a unique piece of fan-art that you'll be proud to display." }
    ],
    examples: [
      { title: "80s Rock Legend", image: getPh(800, 800, "Rock Icon") },
      { title: "Modern Pop Star", image: getPh(800, 800, "Pop Star Art") },
      { title: "Anime Hero Portrait", image: getPh(800, 800, "Anime Hero") },
      { title: "Classical Movie Star", image: getPh(800, 800, "Vintage Movie Star") }
    ],
    expectTitle: "A High-Energy Celebration of Icons",
    expectDesc: "Bring your fandom to the studio! Our instructors help you navigate portrait painting with stylized techniques, making it achievable for beginners. The atmosphere is social and vibrant, fueled by great music and bottomless wine.",
    perfectTitle: "For the Super-Fans",
    perfectFor: [
      "Music and movie enthusiasts looking for a creative outlet",
      "Groups of friends sharing a specific fandom",
      "People wanting to learn stylized portrait techniques",
      "Anyone who wants to paint someone they admire"
    ],
    whatYouGet: [
      { icon: Wine, text: "Free-flow Wine & Soft Drinks", sub: "Unlimited red and white wine, plus Italian soda for most classes" },
      { icon: Palette, text: "Vibrant Acrylic Palettes", sub: "Colors chosen to match the energy of pop icons" },
      { icon: CheckCircle, text: "Portrait Style Guidance", sub: "Learn to capture likeness with modern techniques" },
      { icon: Truck, text: "Take Home & Delivery", sub: "Take most paintings home the same day, some with extended drying times require COD delivery within Japan" }
    ],
    ctaTitle: "immortalize Your Idol",
    ctaSub: "View our upcoming pop-culture and icon sessions.",
    seoTitle: "Paint Your Idol Classes Tokyo | Icon & Fan Art Artbar",
    seoDesc: "Paint your favorite icon at Artbar Tokyo. Music, wine, and bilingual portrait coaching in our high-energy Shibuya and Ginza studios."
  },
};

/** Legacy or marketing URLs that should load the same theme as another slug. */
export const THEME_SLUG_ALIASES: Record<string, string> = {
  'texture-painting': 'texture-art',
};

export function resolveThemeContentSlug(urlSlug: string): string {
  return THEME_SLUG_ALIASES[urlSlug] || urlSlug;
}

export function getThemeContent(resolvedSlug: string, lang: 'en' | 'jp'): ThemeContent {
  const base = THEME_CONFIG[resolvedSlug] || THEME_CONFIG['japan-inspired'];
  if (lang === 'en') return base;
  const jp = THEME_JP[resolvedSlug];
  if (!jp) return base;
  return {
    ...base,
    title: jp.title,
    heroBadge: jp.heroBadge,
    heroSub: jp.heroSub,
    introTitle: jp.introTitle,
    introDesc: jp.introDesc,
    quickFeatures: base.quickFeatures.map((f, i) => ({
      ...f,
      title: jp.quickFeatures[i]?.title ?? f.title,
      desc: jp.quickFeatures[i]?.desc ?? f.desc,
    })),
    examples: base.examples.map((ex, i) => ({
      ...ex,
      title: jp.examples[i]?.title ?? ex.title,
    })),
    expectTitle: jp.expectTitle,
    expectDesc: jp.expectDesc,
    perfectTitle: jp.perfectTitle,
    perfectFor: jp.perfectFor,
    whatYouGet: base.whatYouGet.map((w, i) => ({
      ...w,
      text: jp.whatYouGet[i]?.text ?? w.text,
      sub: jp.whatYouGet[i]?.sub ?? w.sub,
    })),
    ctaTitle: jp.ctaTitle,
    ctaSub: jp.ctaSub,
    seoTitle: jp.seoTitle,
    seoDesc: jp.seoDesc,
  };
}
