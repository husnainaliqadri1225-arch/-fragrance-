import { Product, CollectionItem, JournalArticle, Testimonial } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    handle: 'nuit-celeste',
    title: 'Nuit Céleste',
    subtitle: 'Extrait de Parfum',
    price: 285,
    compareAtPrice: 320,
    rating: 4.9,
    reviewCount: 148,
    family: 'Woody Amber',
    badge: 'Signature House Scent',
    description: 'An ode to midnight stillness and astral alchemy. Smoked oud entwines with nocturnal bergamot and velvety Bourbon vanilla, leaving a celestial trail of rare ambergris.',
    story: 'Conceived during a moonlit solstice in the high plateaus of Grasse, Nuit Céleste captures the exact moment dusk yields to the deep obsidian sky. The formulation balances ancient agarwood smoke with cold-pressed Calabrian citrus.',
    image: '/theme-assets/product-nuit-celeste.jpg',
    secondaryImage: '/theme-assets/hero-campaign.jpg',
    topNotes: ['Midnight Calabrian Bergamot', 'Pink Pepper', 'Elemi Resin'],
    heartNotes: ['Smoked Cambodian Oud', 'Black Violet', 'Atlas Cedar'],
    baseNotes: ['Grey Ambergris', 'Bourbon Vanilla Bean', 'Dark Musk'],
    concentration: 'Extrait de Parfum (32% oil concentration)',
    sizes: [
      { size: '50ml', price: 215 },
      { size: '100ml', price: 285 },
      { size: '200ml Flacon', price: 460 }
    ],
    inStock: true,
    intensity: 5,
    longevity: '14+ Hours',
    sillage: 'Sublime & Expansive'
  },
  {
    id: 'prod_2',
    handle: 'santal-alchimie',
    title: 'Santal Alchimie',
    subtitle: 'Eau de Parfum Intense',
    price: 260,
    rating: 4.8,
    reviewCount: 112,
    family: 'Oriental Woody',
    badge: 'Best Seller',
    description: 'Creamy Mysore sandalwood enveloped in green cardamom, powdery Florentine iris, and whispering papyrus.',
    story: 'Distilled using an 18th-century copper alembic, Santal Alchimie extracts the heartwood of aged East Indian Santalum Album, yielding a tactile, cashmere-like warmth that melds effortlessly with personal skin chemistry.',
    image: '/theme-assets/product-santal-alchimie.jpg',
    topNotes: ['Guatemalan Cardamom', 'Crisp Violet Leaf', 'Carrot Seed'],
    heartNotes: ['Florentine Orris Butter', 'Papyrus Reed', 'Amyris'],
    baseNotes: ['Sustainable Mysore Sandalwood', 'Amber Resin', 'Cashmeran'],
    concentration: 'Eau de Parfum Intense (26% concentration)',
    sizes: [
      { size: '50ml', price: 195 },
      { size: '100ml', price: 260 },
      { size: '200ml Flacon', price: 420 }
    ],
    inStock: true,
    intensity: 4,
    longevity: '12+ Hours',
    sillage: 'Intimate to Moderate'
  },
  {
    id: 'prod_3',
    handle: 'rose-dombre',
    title: "Rose d'Ombre",
    subtitle: 'Extrait de Parfum',
    price: 275,
    rating: 5.0,
    reviewCount: 96,
    family: 'Floral Musk',
    badge: 'Limited Harvest',
    description: 'A dark, brooding damascena rose steeped in saffron strands, black pepper, and aged patchouli soaked in cognac.',
    story: 'Harvested strictly at 4 AM before dawn evaporates the delicate nectar glands, twenty thousand rose petals yield a single dram of this hypnotic, thorn-laden elixir.',
    image: '/theme-assets/product-rose-dombre.jpg',
    topNotes: ['Persian Saffron', 'Cracked Malabar Pepper', 'Mandarin Essence'],
    heartNotes: ['Centifolia Rose Absolute', 'Bulgarian Damask Rose', 'Geranium Leaf'],
    baseNotes: ['Aged Indonesian Patchouli', 'Cognac Cask Oak', 'Velvet Musk'],
    concentration: 'Extrait de Parfum (30% concentration)',
    sizes: [
      { size: '50ml', price: 205 },
      { size: '100ml', price: 275 },
      { size: '200ml Flacon', price: 440 }
    ],
    inStock: true,
    intensity: 4,
    longevity: '13+ Hours',
    sillage: 'Magnetic & Enveloping'
  },
  {
    id: 'prod_4',
    handle: 'cuir-fume',
    title: 'Cuir Fumé',
    subtitle: 'Extrait de Parfum',
    price: 295,
    compareAtPrice: 330,
    rating: 4.9,
    reviewCount: 84,
    family: 'Smoky Leather',
    badge: 'Private Reserve',
    description: 'Raw supple Tuscan leather tempered with silver frankincense smoke, birch tar, and rich heather honey.',
    story: 'Inspired by secret library archives and vintage saddles oiled with birch distillate, Cuir Fumé is architectural, unapologetic, and fiercely aristocratic.',
    image: '/theme-assets/product-cuir-fume.jpg',
    topNotes: ['Silver Thyme', 'Smoked Bergamot', 'Raspberry Cordial'],
    heartNotes: ['Saffron', 'Royal Omani Frankincense', 'Night Jasmine'],
    baseNotes: ['Tuscan Black Leather', 'Birch Tar', 'Raw Golden Honey', 'Cedar'],
    concentration: 'Extrait de Parfum (34% concentration)',
    sizes: [
      { size: '50ml', price: 220 },
      { size: '100ml', price: 295 },
      { size: '200ml Flacon', price: 480 }
    ],
    inStock: true,
    intensity: 5,
    longevity: '16+ Hours',
    sillage: 'Monumental'
  },
  {
    id: 'prod_5',
    handle: 'fleur-nocturne',
    title: 'Fleur Nocturne',
    subtitle: 'Eau de Parfum',
    price: 240,
    rating: 4.7,
    reviewCount: 68,
    family: 'Exotic Floral',
    description: 'Bioluminescent night-blooming tuberose, nocturnal jasmine, golden Siamese benzoin, and a haze of white incense.',
    story: 'A tribute to tropical hothouses at midnight when nocturnal flowers unfold their most intoxicating, nectarous emissions beneath dew-kissed glass cupolas.',
    image: '/theme-assets/product-fleur-nocturne.jpg',
    topNotes: ['Neroli Bigarade', 'Cassis Bud', 'Green Almond'],
    heartNotes: ['Moonlight Tuberose', 'Ylang-Ylang Comoros', 'Jasmine Sambac'],
    baseNotes: ['Siamese Benzoin Resin', 'Siam Wood', 'Creamy Vanilla Pod'],
    concentration: 'Eau de Parfum (24% concentration)',
    sizes: [
      { size: '50ml', price: 180 },
      { size: '100ml', price: 240 },
      { size: '200ml Flacon', price: 390 }
    ],
    inStock: true,
    intensity: 4,
    longevity: '11+ Hours',
    sillage: 'Opulent & Alluring'
  },
  {
    id: 'prod_6',
    handle: 'vetiver-imperial',
    title: 'Vétiver Impérial',
    subtitle: 'Eau de Parfum Fraîche',
    price: 250,
    rating: 4.9,
    reviewCount: 104,
    family: 'Fresh Woody',
    badge: 'Connoisseur Pick',
    description: 'Smoky Haitian vetiver root washed with crisp maritime sea-salt spray, green cypress needles, and pink peppercorn.',
    story: 'Sourced from cooperative roots in Les Cayes, this distilled root profile reveals an earthy, almost mineral freshness reminiscent of coastal cliffs drenched in Atlantic rain.',
    image: '/theme-assets/product-vetiver-imperial.jpg',
    topNotes: ['Grapefruit Zest', 'Atlantic Sea Salt', 'Crushed Pink Peppercorn'],
    heartNotes: ['Mediterranean Cypress', 'Nutmeg', 'Clary Sage'],
    baseNotes: ['Smoky Haitian Vetiver', 'Cedarwood Flakes', 'Clean Amber'],
    concentration: 'Eau de Parfum (22% concentration)',
    sizes: [
      { size: '50ml', price: 185 },
      { size: '100ml', price: 250 },
      { size: '200ml Flacon', price: 400 }
    ],
    inStock: true,
    intensity: 3,
    longevity: '10+ Hours',
    sillage: 'Crisp & Refined'
  },
  {
    id: 'prod_7',
    handle: 'ambre-solaire',
    title: 'Ambre Solaire',
    subtitle: 'Extrait de Parfum',
    price: 245,
    rating: 4.8,
    reviewCount: 57,
    family: 'Warm Amber',
    description: 'Liquid amber heated by solar citrus, toasted Venezuelan tonka beans, and silky musk crystals.',
    story: 'Capturing the golden rays trapped within millennia-old fossil resin. Ambre Solaire radiates radiant warmth and comforting skin-level radiance from dusk until sunrise.',
    image: '/theme-assets/product-ambre-solaire.jpg',
    topNotes: ['Sunlit Blood Orange', 'Golden Saffron', 'Bitter Almond'],
    heartNotes: ['Labdanum Resin', 'Helichrysum', 'Osmanthus Blossom'],
    baseNotes: ['Venezuelan Tonka', 'Solar Amber Crystals', 'White Benzoin'],
    concentration: 'Extrait de Parfum (28% concentration)',
    sizes: [
      { size: '50ml', price: 185 },
      { size: '100ml', price: 245 },
      { size: '200ml Flacon', price: 395 }
    ],
    inStock: true,
    intensity: 4,
    longevity: '12+ Hours',
    sillage: 'Warm & Radiative'
  },
  {
    id: 'prod_8',
    handle: 'cypres-ethere',
    title: 'Cyprès Éthéré',
    subtitle: 'Eau de Parfum',
    price: 265,
    rating: 4.7,
    reviewCount: 42,
    family: 'Aromatic Fresh',
    badge: 'New Release',
    description: 'High-altitude blue cypress needles kissed by cool mountain fog, juniper berries, and crushed resinous elemi.',
    story: 'An olfactory journey through quiet alpine sanctuaries where ancient conifer canopies filter the crisp glacial air. Meditative, clean, and deeply restorative.',
    image: '/theme-assets/product-cypres-ethere.jpg',
    topNotes: ['Wild Juniper Berry', 'Italian Bergamot', 'Elemi Resin'],
    heartNotes: ['Blue Cypress Needles', 'Mountain Fir Balsam', 'Galbanum'],
    baseNotes: ['Cashmere Wood', 'Dry Oakmoss', 'Crystalline White Musk'],
    concentration: 'Eau de Parfum (25% concentration)',
    sizes: [
      { size: '50ml', price: 195 },
      { size: '100ml', price: 265 },
      { size: '200ml Flacon', price: 430 }
    ],
    inStock: true,
    intensity: 3,
    longevity: '10+ Hours',
    sillage: 'Breezy & Clean'
  }
];

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'col_1',
    title: 'Les Nocturnes',
    handle: 'les-nocturnes',
    subtitle: 'Midnight & Astral Extraits',
    description: 'Deep, enveloping fragrances composed for the quietest hours. Featuring smoky ouds, rare ambergris, and velvet florals.',
    image: '/theme-assets/product-nuit-celeste.jpg',
    productCount: 4,
    mood: 'Mysterious, Magnetic, Deep'
  },
  {
    id: 'col_2',
    title: 'Bois Sacrés',
    handle: 'bois-sacres',
    subtitle: 'Sacred Woods & Resins',
    description: 'Distillations of aged sandalwood, smoky Haitian vetiver roots, and ancient atlas cedar, grounded in spiritual meditation.',
    image: '/theme-assets/product-santal-alchimie.jpg',
    productCount: 3,
    mood: 'Architectural, Warm, Grounded'
  },
  {
    id: 'col_3',
    title: 'Fleurs Sombres',
    handle: 'fleurs-sombres',
    subtitle: 'Shadow Florals & Petals',
    description: 'Thorned damascena roses, narcotic midnight tuberoses, and moonlit jasmine wrapped in dark resins and cognac.',
    image: '/theme-assets/product-rose-dombre.jpg',
    productCount: 3,
    mood: 'Sensual, Dramatic, Seductive'
  },
  {
    id: 'col_4',
    title: 'Coffrets Privés',
    handle: 'coffrets-prives',
    subtitle: 'Bespoke Discovery Sets',
    description: 'Exquisite discovery flacons presented in hand-bound midnight blue leather cases with champagne gold foil.',
    image: '/theme-assets/editorial-campaign.jpg',
    productCount: 5,
    mood: 'Prestigious, Curated, Gifting'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art_1',
    title: 'The Lost Art of Ambergris: Ocean Mysteries in Haute Parfumerie',
    handle: 'the-lost-art-of-ambergris',
    category: 'Artisanal Sourcing',
    excerpt: 'How ethically gathered floating sea amber transforms over decades of ocean currents to become the ultimate fixative in luxury perfumery.',
    date: 'October 14, 2026',
    readTime: '6 min read',
    author: 'Jean-Marc Vance, Master Formulator',
    image: '/theme-assets/editorial-campaign.jpg',
    content: [
      'In an era dominated by synthetic aromachemicals, few raw materials carry the poetic mystique of true grey ambergris. Formed in the abyssal depths and cured by decades of salt, sunlight, and maritime tides, it arrives on Atlantic shores as a fragrant fossil.',
      'At Aurelia Noir, our master perfumers refuse industrial compromises. Each batch of Nuit Céleste relies on tincture techniques preserved since the Belle Époque, where aged ambergris is macerated for eighteen months in high-proof grain spirits.',
      'The result is an olfactory luminescence that cannot be replicated in a beaker: a skin-warmed radiance that transforms with every heartbeat.'
    ]
  },
  {
    id: 'art_2',
    title: 'Nocturnal Harvest: Gathering Centifolia Rose at Four AM',
    handle: 'nocturnal-harvest-rose',
    category: 'Grasse Terroir',
    excerpt: 'Why our perfumers insist on hand-plucking blossoms under lantern light before the Provencal sunrise burns away fragile top notes.',
    date: 'September 28, 2026',
    readTime: '5 min read',
    author: 'Hélène Delacroix, Head of Terroir',
    image: '/theme-assets/brand-story.jpg',
    content: [
      'The morning mist sits low over the clay-limestone terraces of Grasse. By 3:45 AM, our team of pickers moves through rows of Rosa x centifolia, wearing linen gloves and carrying traditional wicker baskets.',
      'Scientific chromatography reveals that floral volatiles peak immediately before dawn. Once direct sunlight strikes the petals, volatile monoterpenes evaporate into the atmosphere.',
      'By harvesting in absolute shadow, we capture the unbruised, peppery freshness of the living rose—an intensity that forms the dark heart of Rose d’Ombre.'
    ]
  },
  {
    id: 'art_3',
    title: 'The Science of Sillage: Formulating Without Compromise',
    handle: 'the-science-of-sillage',
    category: 'Formulation Art',
    excerpt: 'Exploring the intricate equilibrium between heavy molecular resins and airy aldehydes that creates an unforgettable scent trail.',
    date: 'August 19, 2026',
    readTime: '4 min read',
    author: 'Dr. Édouard Laurent, Chief Chemist',
    image: '/theme-assets/hero-campaign.jpg',
    content: [
      'Sillage is often misunderstood as raw loudness. True luxury sillage, however, is not a wall of scent; it is an atmospheric wake, whispering across a room seconds after a presence departs.',
      'By employing multi-fractional distillation on our Indonesian patchouli and Cambodian oud, we strip away muddy tannins while accentuating crystal-clear cedar and balsams.',
      'This architectural stratification ensures that our Extraits remain breathtakingly distinct from first spray to twelfth hour.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    quote: 'Nuit Céleste is nothing short of a masterpiece. The smoked oud doesn’t assault the senses; it unfurls like silk over warm amber and bourbon vanilla. I have never received so many inquiries from strangers in Paris.',
    author: 'Camille de Montmartre',
    location: 'Paris, France',
    fragrance: 'Nuit Céleste — Extrait de Parfum',
    rating: 5,
    date: 'Verified Patron'
  },
  {
    id: 'test_2',
    quote: 'As someone who has collected rare niche perfumes for two decades, Aurelia Noir represents the gold standard of modern French perfumery. Santal Alchimie is the purest, most buttery sandalwood I have encountered since the 1990s.',
    author: 'Lord Julian Sterling',
    location: 'London, UK',
    fragrance: 'Santal Alchimie — Eau de Parfum Intense',
    rating: 5,
    date: 'Verified Patron'
  },
  {
    id: 'test_3',
    quote: 'The unboxing experience alone is worthy of an haute couture house. The heavy glass flacon with its champagne gold stopper feels like a museum sculpture. Rose d’Ombre is seductive, mysterious, and unforgettable.',
    author: 'Elena Rostova',
    location: 'Vienna, Austria',
    fragrance: "Rose d'Ombre — Extrait de Parfum",
    rating: 5,
    date: 'Verified Patron'
  },
  {
    id: 'test_4',
    quote: 'Cuir Fumé has become my definitive signature scent. The pairing of birch tar smoke with frankincense and honey is intoxicating. It lasts well past sixteen hours on my coat lapel.',
    author: 'Arthur Kensington',
    location: 'New York, USA',
    fragrance: 'Cuir Fumé — Extrait de Parfum',
    rating: 5,
    date: 'Verified Patron'
  }
];
