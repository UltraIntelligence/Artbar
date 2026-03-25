/**
 * Gemini prompts for `/themes/[slug]` page imagery (hero, 4 examples, experience).
 * IDs match filenames: `/media/generated/{id}.jpg`. Wired in `scripts/theme-page-manifest-items.ts`.
 */
export const THEME_PAGE_IMAGE_PROMPT_ROWS: { id: string; prompt: string }[] = [
  {
    id: 'theme-japan-inspired-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Three Japanese women aged 20s at wooden tripod easels painting Mount Fuji and sakura motifs, black aprons, warm string fairy lights overhead, colorful canvases on white wall shelves behind, pink Hokusai mural on back wall. Two women focused on canvas, one glancing toward camera smiling. Rich warm tones, TimeOut Tokyo editorial quality.',
  },
  {
    id: 'theme-japan-inspired-example-1',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Hokusai's Great Wave — bold graphic wave form in deep navy and white with Mount Fuji in the background, rendered in a vivid pop-art color treatment with flat bright tones. Original student work compositionally similar to The Great Wave. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-japan-inspired-example-2',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting of Mount Fuji in autumn — rich red and gold maple foliage in the foreground, classic cone silhouette, moody overcast sky in soft grey and blue. Loose painterly brushwork, Japanese landscape mood. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-japan-inspired-example-3',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting of glowing paper lanterns floating into a deep indigo night sky, warm orange and gold light radiating from each lantern, loose expressive brushwork, festival atmosphere. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-japan-inspired-example-4',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting of a cherry blossom path — a tree-lined walkway in full bloom, soft pink petals falling, dappled spring light, loose impressionist brushwork, peaceful and romantic mood. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-japan-inspired-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Four guests at Artbar Tokyo seated at white marble studio tables with tripod easels — three Japanese women aged 20s and one Japanese man on a date. All painting Japan-inspired motifs, wine glasses and snack plates on table. Clean modern bright studio, large windows, black aprons. Two guests facing camera smiling, warm editorial tones.',
  },
  {
    id: 'theme-van-gogh-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Mixed group of five at wooden tripod easels — two Japanese women, one Japanese man, one Western woman with dark hair — all painting swirling night sky canvases. Black aprons, warm string fairy lights, colorful finished artworks on white shelves behind. Rich deep blue and gold tones reflected from canvases, Vogue Japan editorial quality.',
  },
  {
    id: 'theme-van-gogh-example-1',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Van Gogh's The Starry Night — swirling deep cobalt blue night sky with glowing moon over a Tokyo-style cityscape below, bold expressive brushstrokes, gold and blue palette. Original student work compositionally similar to The Starry Night. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-van-gogh-example-2',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Van Gogh's Sunflowers — bold yellow sunflower bouquet in a simple vase, thick expressive brushstrokes, warm ochre and gold palette. Original student work compositionally similar to Sunflowers. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-van-gogh-example-3',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Van Gogh's Café Terrace at Night — golden lit café exterior under a deep starry blue night sky, cobblestone street, warm amber glow, expressive brushwork. Original student work compositionally similar to Café Terrace at Night. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-van-gogh-example-4',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Van Gogh's Bedroom in Arles — simple bedroom interior with bed, chairs, and window, bold flat colors in blue and orange, strong outlines, naive perspective. Original student work compositionally similar to Bedroom in Arles. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-van-gogh-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Three Japanese women aged 20s seated at paint-splattered wooden tables with tripod easels, painting swirling blue and gold night sky canvases. Black aprons, warm string fairy lights overhead, wine glasses on table. One woman holds her glass toward camera smiling. Warm rich tones, Tokyo studio, Vogue Japan editorial quality.',
  },
  {
    id: 'theme-paint-pouring-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Six guests standing around a long paint-splattered table covered in plastic sheeting, pouring fluid acrylic paint from white cups onto canvases laid flat. Paint jars and cups covering the table, wine glasses nearby. Mixed group — three Japanese women, one Japanese man, one Western man with dark hair. Black aprons, bright studio lighting, large windows. Energetic and focused, editorial quality.',
  },
  {
    id: 'theme-paint-pouring-example-1',
    prompt:
      'Square 1:1 editorial photo. A finished fluid acrylic pour painting — ocean wave composition in deep teal, navy, and white, organic flowing cells suggesting crashing water and sea foam. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-pouring-example-2',
    prompt:
      'Square 1:1 editorial photo. A finished fluid acrylic pour painting — deep space galaxy nebula swirl in rich purple, midnight blue, and soft pink, glowing abstract cosmic texture with fine lacing detail. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-pouring-example-3',
    prompt:
      'Square 1:1 editorial photo. A finished fluid acrylic pour painting — metallic marble effect in silver, gold, and cream, elegant flowing veins and smooth blended cells, luxury material mood. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-pouring-example-4',
    prompt:
      'Square 1:1 editorial photo. A finished fluid acrylic pour painting — vivid neon energy abstract in electric magenta, lime green, and cobalt blue, bold high-contrast cells with dynamic flowing movement. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-pouring-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Group of five guests standing at a long table covered in plastic sheeting, actively pouring fluid paint from white cups onto flat canvases. Paint jars everywhere, wine glasses tucked to the side. Two Japanese women facing camera laughing, others focused on their pour. Black aprons splattered with paint, bright Tokyo studio, large windows. Energetic and fun, editorial quality.',
  },
  {
    id: 'theme-alcohol-ink-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Two Japanese women aged early 20s seated at a clean white studio table, carefully applying alcohol ink to paper, watching the ink bloom and spread. Small ink bottles, blending tools, and wine glasses on the table. Black aprons, soft warm studio lighting, focused and serene mood. Editorial quality, warm tones.',
  },
  {
    id: 'theme-alcohol-ink-example-1',
    prompt:
      'Square 1:1 editorial photo. A finished alcohol ink artwork on white paper — ocean depths composition in deep teal, navy, and aquamarine, organic flowing ink suggesting underwater light and movement, luminous and ethereal. Framed and hung on a bright white wall in a calm minimal room, soft natural daylight, shallow depth of field, artwork is the hero.',
  },
  {
    id: 'theme-alcohol-ink-example-2',
    prompt:
      'Square 1:1 editorial photo. A finished alcohol ink artwork on white paper — soft sunset clouds in warm peach, coral, and rose gold, ink blooms layered to suggest atmospheric sky, dreamy and delicate. Framed and hung on a bright white wall in a calm minimal room, soft natural daylight, shallow depth of field, artwork is the hero.',
  },
  {
    id: 'theme-alcohol-ink-example-3',
    prompt:
      'Square 1:1 editorial photo. A finished alcohol ink artwork on white paper — marble elegance in soft grey, white, and charcoal, fine flowing veins of ink across a clean surface, sophisticated and minimal. Framed and hung on a bright white wall in a calm minimal room, soft natural daylight, shallow depth of field, artwork is the hero.',
  },
  {
    id: 'theme-alcohol-ink-example-4',
    prompt:
      'Square 1:1 editorial photo. A finished alcohol ink artwork on white paper — gilded blossom composition with soft blush pink ink bloom forms and gold metallic accents, delicate organic texture, warm and luminous. Framed and hung on a bright white wall in a calm minimal room, soft natural daylight, shallow depth of field, artwork is the hero.',
  },
  {
    id: 'theme-alcohol-ink-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Three Japanese women aged 20s seated at a clean white marble studio table with small alcohol ink bottles, blending tools, and wine glasses. All leaning in close watching ink bloom on paper, expressions of wonder and delight. Black aprons, bright modern Tokyo studio, large windows. Warm editorial tones.',
  },
  {
    id: 'theme-monet-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Four guests at wooden tripod easels — two Japanese women, one Japanese man with a woman on a date — painting soft impressionist garden scenes. Black aprons, warm string fairy lights overhead, soft pastel tones reflected from canvases. Wine glasses and snack plates on paint-splattered table. One woman glancing toward camera smiling softly. Vogue Japan editorial quality.',
  },
  {
    id: 'theme-monet-example-1',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Monet's Water Lilies series — soft blue lily pond with floating pads and reflected sky, cool pastel blues and greens, loose impressionist brushwork. Original student work compositionally similar to Water Lilies in Blue. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-monet-example-2',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Monet's Woman with a Parasol — a soft impressionist female figure in a summer field holding a parasol, dappled light, loose airy brushwork, cream and sage green palette. Original student work compositionally similar to Woman with a Parasol. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-monet-example-3',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Monet's Japanese Footbridge — arched green bridge over a lily pond, weeping willow reflections, soft blue-green water, loose impressionist brushwork. Original student work compositionally similar to The Japanese Bridge. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-monet-example-4',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Monet's Poppy Field — rolling green field dotted with vivid red poppies, hazy summer sky, loose gestural impressionist brushwork, warm pastoral mood. Original student work compositionally similar to Poppy Field. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-monet-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Three Japanese women aged 20s at clean white marble studio tables with tripod easels, painting soft pastel impressionist canvases. Wine glasses and small snack plates on table. Modern bright Tokyo studio, large floor-to-ceiling windows. Two women facing camera holding wine glasses toward lens, smiling. Warm editorial tones, polished and social.',
  },
  {
    id: 'theme-picasso-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Mixed group of five at wooden tripod easels — two Japanese women, one Japanese man, one Western man with dark hair, one Western woman — painting bold geometric cubist canvases. Black aprons, bright Tokyo studio, large windows, colorful cubist artworks visible on shelves. One guest laughing at neighbour\'s canvas. Energetic and fun, editorial quality.',
  },
  {
    id: 'theme-picasso-example-1',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Picasso's analytic cubist period — fragmented self-portrait with geometric angular planes, muted earth tones of ochre, grey, and brown, multiple viewpoints in one face. Original student work in the style of Picasso's cubist self-portrait period. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-picasso-example-2',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Picasso's analytic cubist guitar still life — abstract guitarist figure with fragmented instrument, angular overlapping planes in ochre, brown, and dark green. Original student work compositionally similar to Picasso's guitar and figure studies. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-picasso-example-3',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Picasso's Blue Period — melancholic solitary figure in soft muted blues and blue-green tones, loose painterly treatment, quiet emotional mood. Original student work in the spirit of Picasso's Blue Period. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-picasso-example-4',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in Picasso's later expressive style — bold stylized female portrait with flattened features, vivid primary colors, strong black outlines, confident and graphic. Original student work in the spirit of Picasso's modern muse portraits. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-picasso-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Four guests at paint-splattered wooden tables with tripod easels — two Japanese women, one Japanese man, one Western man with dark brown hair — all painting bold colorful cubist canvases. Black aprons, bright Tokyo studio with large windows. Two guests turned toward camera grinning, one holding up paintbrush. Lively and fun editorial energy.',
  },
  {
    id: 'theme-renoir-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Three Japanese women aged 25–35 at wooden tripod easels painting soft romantic portrait canvases. Black aprons, warm string fairy lights overhead, wine glasses nearby, soft golden studio lighting. Canvases showing soft impressionist figures in warm tones. Relaxed and refined atmosphere, Vogue Japan editorial quality.',
  },
  {
    id: 'theme-renoir-example-1',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Renoir's Girl with a Watering Can — a soft impressionist portrait of a young girl in a flower garden, warm dappled light, loose brushwork in blush, green, and ivory. Original student work compositionally similar to Girl with a Watering Can. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-renoir-example-2',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Renoir's Young Girls at the Piano — two soft impressionist figures at an upright piano, warm interior light, loose brushwork in rose, cream, and soft brown. Original student work compositionally similar to Young Girls at the Piano. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-renoir-example-3',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Renoir's Luncheon of the Boating Party — loose impressionist outdoor gathering mood, figures in dappled riverside light, warm rose and ivory palette, relaxed social energy. Original student work in the mood of Luncheon of the Boating Party. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-renoir-example-4',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in Renoir's impressionist style — a loose bouquet of summer flowers in a glass vase, soft pink, yellow, and white blooms, dappled warm light, delicate brushwork. Original student work in Renoir's flower painting style. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-renoir-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Three Japanese women aged late 20s seated at white marble studio tables with tripod easels, painting soft pastel portrait canvases. Wine glasses raised in a casual toast toward camera, big warm smiles. Black aprons, bright modern Tokyo studio. Warm golden editorial tones, social and refined.',
  },
  {
    id: 'theme-matisse-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Four guests at wooden tripod easels — three Japanese women and one Western woman with dark hair — painting bright bold colorful canvases. Black aprons, warm Tokyo studio, large windows. Vivid flat-color artworks visible on shelves. Energetic and joyful atmosphere, guests smiling and comparing canvases. TimeOut Tokyo editorial quality.',
  },
  {
    id: 'theme-matisse-example-1',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Matisse's Blue Nude cut-out series — bold simplified female figure in flat cobalt blue, white negative space background, strong expressive silhouette. Original student work compositionally similar to Blue Nude. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-matisse-example-2',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Matisse's Goldfish — a glass bowl with bright orange goldfish on a patterned table, vivid flat colors, bold outlines, decorative interior mood. Original student work compositionally similar to Goldfish. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-matisse-example-3',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Matisse's The Dance — bold simplified dancing figures in a ring, flat terracotta and cobalt blue tones, energetic and joyful. Original student work compositionally similar to The Dance. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-matisse-example-4',
    prompt:
      "Square 1:1 editorial photo. A student's acrylic painting in the spirit of Matisse's Red Room — richly decorated interior in vivid red, flat patterned tablecloth and wall merging together, bold decorative objects, intense warm palette. Original student work compositionally similar to The Red Room. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.",
  },
  {
    id: 'theme-matisse-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Four guests at paint-splattered wooden tables with tripod easels — two Japanese women, one Japanese man, one Western woman with brown hair — painting bright vivid canvases. Black aprons, warm string fairy lights, colorful artworks on shelves. Two guests turned toward camera smiling, brushes raised. Energetic and warm, editorial quality.',
  },
  {
    id: 'theme-kids-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Three children aged 6–10 at small wooden easels painting bright colorful designs, big genuine smiles. One Japanese girl, one Japanese boy, one Western child with brown hair. Colorful aprons, bright clean studio lighting, Artbar Lab alcohol-free setting. Parent visible and blurred warmly in background. Cheerful family editorial quality.',
  },
  {
    id: 'theme-kids-example-1',
    prompt:
      'Square 1:1 close-up editorial. Finished children\'s acrylic canvas painting on small wooden easel. Bright rainbow over green hills with a smiling sun, thick simple confident brushwork, vivid colors, joyful and naive style. Clean bright studio background.',
  },
  {
    id: 'theme-kids-example-2',
    prompt:
      'Square 1:1 close-up editorial. Finished children\'s acrylic canvas painting on small wooden easel. Cute cartoon cat in orange and white, simple bold outlines, bright solid color background, charming beginner style. Clean bright studio background.',
  },
  {
    id: 'theme-kids-example-3',
    prompt:
      'Square 1:1 close-up editorial. Finished children\'s acrylic canvas painting on small wooden easel. Underwater scene with colorful fish and bubbles, bright blue background, simple shapes, thick paint, cheerful and expressive. Clean bright background.',
  },
  {
    id: 'theme-kids-example-4',
    prompt:
      'Square 1:1 close-up editorial. Finished children\'s acrylic canvas painting on small wooden easel. Bright bouquet of flowers in a vase, bold simple shapes, vivid mixed palette, confident thick brushwork, charming naive style. Clean bright background.',
  },
  {
    id: 'theme-kids-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Four children aged 5–10 seated at small easels painting bright colorful canvases, laughing and comparing work. Two Japanese girls, one Japanese boy, one Western child. Colorful aprons, bright clean Artbar Lab studio, no wine or alcohol visible. Japanese mother leaning in to look at her child\'s canvas, warm and genuine family moment. Bright editorial quality.',
  },
  {
    id: 'theme-texture-art-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Two Japanese women aged mid-20s at a paint-splattered wooden table applying thick impasto paint to canvas with palette knives, focused and engaged. Vivid colorful paint mounds on palette, wine glasses nearby. Black aprons, warm string fairy lights, Tokyo studio. One woman glancing toward camera with a paint-streaked smile. Rich tactile editorial quality.',
  },
  {
    id: 'theme-texture-art-example-1',
    prompt:
      'Square 1:1 editorial photo. A finished impasto texture painting — ocean swells in thick palette knife strokes of deep teal, navy, and white, heavy dimensional paint suggesting rolling wave forms, highly tactile surface. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-texture-art-example-2',
    prompt:
      'Square 1:1 editorial photo. A finished impasto texture painting — a single minimalist flower bloom in soft blush and cream, thick palette knife petals standing off a clean white canvas, elegant and restrained. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-texture-art-example-3',
    prompt:
      'Square 1:1 editorial photo. A finished impasto texture painting — layered mountain ridges in thick palette knife strokes of earthy grey, terracotta, and cream, ridge-like dimensional texture suggesting landscape depth. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-texture-art-example-4',
    prompt:
      'Square 1:1 editorial photo. A finished impasto texture painting — bold abstract rhythm in thick gestural palette knife marks, vivid cobalt blue and gold, highly dimensional surface with strong directional energy. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-texture-art-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Three guests at a paint-splattered wooden table using palette knives to apply thick colorful paint to canvases — two Japanese women, one Japanese man. Large mounds of vivid acrylic paint on palettes, wine glasses nearby. Black aprons, warm string fairy lights, Tokyo studio. One guest holding up palette knife toward camera, grinning. Rich warm tones, editorial quality.',
  },
  {
    id: 'theme-paint-your-pet-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Two Japanese women aged 20s at wooden tripod easels carefully painting pet portrait canvases — one canvas shows a Shiba Inu, one shows a cat — both smiling and comparing work. Black aprons, warm string fairy lights, Tokyo studio. One woman holding her canvas up toward camera proudly. Warm editorial tones, charming and social.',
  },
  {
    id: 'theme-paint-your-pet-example-1',
    prompt:
      'Square 1:1 editorial photo. A beginner-style acrylic pet portrait of a happy golden retriever, warm amber and cream tones, simple expressive brushwork, bold solid forest green background, charming naive keepsake style. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-your-pet-example-2',
    prompt:
      'Square 1:1 editorial photo. A beginner-style acrylic pet portrait of a majestic calico cat with distinctive orange, black, and white markings, simple confident outlines, bold solid cobalt blue background, warm and charming. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-your-pet-example-3',
    prompt:
      'Square 1:1 editorial photo. A beginner-style acrylic pet portrait of a French bulldog with expressive eyes and bat ears, simple graphic style, bold solid mustard yellow background, strong outlines, charming and confident. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-your-pet-example-4',
    prompt:
      'Square 1:1 editorial photo. A beginner-style acrylic painting featuring two pets side by side — a dog and a cat — painted as a double portrait, simple expressive brushwork, bold solid deep teal background, charming naive style. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-your-pet-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Three guests at wooden tripod easels carefully painting small pet portrait canvases — two Japanese women, one Japanese man on a date. Reference pet photos propped against easels. Black aprons, warm string fairy lights, Tokyo studio. One woman holding finished canvas next to her phone showing pet photo, laughing. Warm editorial tones, charming moment.',
  },
  {
    id: 'theme-paint-your-idol-hero',
    prompt:
      'Wide 16:9 cinematic editorial photo. Full-bleed hero. Four Japanese women aged 18–28 at wooden tripod easels painting bold pop-art inspired portrait canvases, laughing and reacting to each other\'s work. Black aprons, warm string fairy lights, colorful artworks on white shelves behind. Bright vivid canvas colors reflecting warm studio light. Fun and energetic atmosphere, Vogue Japan editorial quality.',
  },
  {
    id: 'theme-paint-your-idol-example-1',
    prompt:
      'Square 1:1 editorial photo. A bold acrylic portrait painting of an imagined 80s rock legend — wild hair, dramatic stage lighting, vivid electric colors, expressive graphic style, no real celebrity likeness. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-your-idol-example-2',
    prompt:
      'Square 1:1 editorial photo. A bold acrylic portrait painting of an imagined modern pop star — stylized graphic face, vivid flat color blocking in pink and gold, strong black outlines, contemporary pop-art energy, no real celebrity likeness. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-your-idol-example-3',
    prompt:
      'Square 1:1 editorial photo. A bold acrylic painting of an anime-style hero portrait — large expressive eyes, vivid flat colors in blue and white, bold graphic outlines, energetic and dynamic composition, original character design. Hung on a bright white wall in a minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-your-idol-example-4',
    prompt:
      'Square 1:1 editorial photo. A bold acrylic portrait painting in the mood of a classic golden-age movie star — soft dramatic lighting, elegant monochrome palette with warm sepia tones, painterly glamour, no real celebrity likeness. Hung on a bright white wall in a calm minimal living room, soft natural daylight, shallow depth of field, painting is the hero.',
  },
  {
    id: 'theme-paint-your-idol-experience',
    prompt:
      'Wide 16:9 editorial lifestyle photo. Four Japanese women aged 18–25 at wooden tripod easels painting bold colorful pop-art portrait canvases, energetic and laughing. Black aprons, warm string fairy lights, Tokyo studio. Two women turned toward camera holding brushes up and grinning. Vivid canvas colors, fun celebratory mood, Vogue Japan editorial quality.',
  },
];
