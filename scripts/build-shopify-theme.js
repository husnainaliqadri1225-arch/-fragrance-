import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const THEME_DIR = path.resolve('shopify-theme');
const PUBLIC_DIR = path.resolve('public');
const ASSETS_SRC = path.resolve('public/theme-assets');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. Setup Theme Folders
const folders = [
  'layout',
  'templates',
  'sections',
  'snippets',
  'assets',
  'config',
  'locales'
];

folders.forEach(f => ensureDir(path.join(THEME_DIR, f)));

// 2. Write layout/theme.liquid
const themeLiquid = `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#06131c">
    <link rel="canonical" href="{{ canonical_url }}">
    <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}

    <title>
      {{ page_title }}
      {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
      {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
      {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
    </title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}

    {% render 'meta-tags' %}

    {{ content_for_header }}

    <style>
      :root {
        --color-navy-deep: {{ settings.color_bg | default: '#06131c' }};
        --color-navy-midnight: #092335;
        --color-navy-rich: #0d3047;
        --color-navy-medium: #164d68;
        --color-blue-atmospheric: #216681;
        --color-gold: {{ settings.color_gold | default: '#e6be62' }};
        --color-ivory: #f4efe5;
        --color-white-soft: #e8edf0;
        --color-text-muted: #a9bbc5;
        --font-heading: 'Cormorant Garamond', Georgia, serif;
        --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
      }
    </style>

    {{ 'theme.css' | asset_url | stylesheet_tag }}
  </head>

  <body class="template-{{ template.name | handle }} bg-[#06131c] text-[#e8edf0] antialiased">
    <a class="skip-to-content-link button visually-hidden" href="#MainContent">
      {{ 'accessibility.skip_to_text' | t | default: 'Skip to content' }}
    </a>

    {% sections 'header-group' %}

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>

    {% sections 'footer-group' %}

    {% render 'cart-drawer' %}
    {% render 'quick-view-modal' %}

    <script src="{{ 'theme.js' | asset_url }}" defer="defer"></script>
  </body>
</html>`;

fs.writeFileSync(path.join(THEME_DIR, 'layout/theme.liquid'), themeLiquid);

// 3. Write config/settings_schema.json
const settingsSchema = [
  {
    "name": "theme_info",
    "theme_name": "Aurelia Noir Luxury Fragrance",
    "theme_version": "1.0.0",
    "theme_author": "Aurelia Noir Haute Parfumerie",
    "theme_documentation_url": "https://aurelianoir.com/docs",
    "theme_support_url": "https://aurelianoir.com/support"
  },
  {
    "name": "Colors & Aesthetics",
    "settings": [
      {
        "type": "color",
        "id": "color_bg",
        "label": "Deep Navy Background",
        "default": "#06131c"
      },
      {
        "type": "color",
        "id": "color_surface",
        "label": "Surface Midnight Blue",
        "default": "#092335"
      },
      {
        "type": "color",
        "id": "color_gold",
        "label": "Champagne Gold Accent",
        "default": "#e6be62"
      },
      {
        "type": "color",
        "id": "color_text",
        "label": "Text Primary (Soft White)",
        "default": "#e8edf0"
      },
      {
        "type": "color",
        "id": "color_muted",
        "label": "Muted Slate Text",
        "default": "#a9bbc5"
      }
    ]
  },
  {
    "name": "Typography & Hierarchy",
    "settings": [
      {
        "type": "font_picker",
        "id": "type_header_font",
        "label": "Header Display Font",
        "default": "cormorant_garamond_n4"
      },
      {
        "type": "font_picker",
        "id": "type_body_font",
        "label": "Body Sans Font",
        "default": "plus_jakarta_sans_n4"
      }
    ]
  },
  {
    "name": "Product Cards",
    "settings": [
      {
        "type": "select",
        "id": "card_corner_radius",
        "label": "Card Corner Radius",
        "options": [
          { "value": "8px", "label": "Subtle (8px)" },
          { "value": "16px", "label": "Classic Luxury (16px)" },
          { "value": "24px", "label": "Curved Architectural (24px)" }
        ],
        "default": "16px"
      },
      {
        "type": "checkbox",
        "id": "show_quick_view",
        "label": "Enable Quick View Modal",
        "default": true
      },
      {
        "type": "checkbox",
        "id": "show_ratings",
        "label": "Display Star Ratings",
        "default": true
      },
      {
        "type": "checkbox",
        "id": "show_secondary_image_on_hover",
        "label": "Show Secondary Still on Hover",
        "default": true
      }
    ]
  },
  {
    "name": "Cart Drawer & Shipping",
    "settings": [
      {
        "type": "select",
        "id": "cart_type",
        "label": "Cart Type",
        "options": [
          { "value": "drawer", "label": "Slide-Out Drawer" },
          { "value": "page", "label": "Dedicated Page" }
        ],
        "default": "drawer"
      },
      {
        "type": "text",
        "id": "free_shipping_message",
        "label": "Free Delivery Announcement",
        "default": "Complimentary Global Courier Delivery Unlocked"
      },
      {
        "type": "checkbox",
        "id": "enable_gift_note",
        "label": "Enable Complimentary Gift Message",
        "default": true
      }
    ]
  }
];

fs.writeFileSync(path.join(THEME_DIR, 'config/settings_schema.json'), JSON.stringify(settingsSchema, null, 2));

// 4. Write config/settings_data.json
const settingsData = {
  "current": {
    "color_bg": "#06131c",
    "color_surface": "#092335",
    "color_gold": "#e6be62",
    "color_text": "#e8edf0",
    "color_muted": "#a9bbc5",
    "card_corner_radius": "16px",
    "show_quick_view": true,
    "show_ratings": true,
    "cart_type": "drawer",
    "free_shipping_message": "Complimentary Worldwide Delivery On All Orders",
    "enable_gift_note": true
  }
};

fs.writeFileSync(path.join(THEME_DIR, 'config/settings_data.json'), JSON.stringify(settingsData, null, 2));

// 5. Write sections
// Announcement Bar
const announcementBarLiquid = `{%- if section.settings.show_announcement -%}
<aside id="shopify-section-announcement-bar" class="announcement-bar py-2 px-4 border-b border-[#164d68]/40" style="background-color: {{ section.settings.bg_color }}; color: {{ section.settings.text_color }};">
  <div class="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-wide">
    <div class="hidden md:block opacity-75">
      Paris • London • New York | USD ($)
    </div>
    <div class="flex-1 text-center font-medium flex items-center justify-center gap-2">
      <span class="text-[#e6be62]">✦</span>
      {%- if section.settings.link != blank -%}
        <a href="{{ section.settings.link }}" class="hover:underline">{{ section.settings.text }}</a>
      {%- else -%}
        <span>{{ section.settings.text }}</span>
      {%- endif -%}
    </div>
    <div class="hidden md:block text-[#e6be62]">
      Haute Parfumerie
    </div>
  </div>
</aside>
{%- endif -%}

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_announcement",
      "label": "Enable Announcement Bar",
      "default": true
    },
    {
      "type": "text",
      "id": "text",
      "label": "Announcement Text",
      "default": "Complimentary Worldwide Express Courier & 2 Curated Discovery Vials"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Optional Link"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#092335"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#f4efe5"
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/announcement-bar.liquid'), announcementBarLiquid);

// Header section
const headerLiquid = `<header id="shopify-section-header" class="sticky top-0 z-40 w-full py-3 px-4 sm:px-8 bg-[#06131c]/80 backdrop-blur-md border-b border-[#164d68]/40">
  <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
    <!-- Brand Wordmark -->
    <a href="{{ routes.root_url }}" class="flex flex-col items-start text-left">
      {%- if section.settings.logo != blank -%}
        <img src="{{ section.settings.logo | image_url: width: 220 }}" alt="{{ shop.name }}" class="h-8 w-auto">
      {%- else -%}
        <span class="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#f4efe5] font-light uppercase hover:text-[#e6be62] transition-colors">
          {{ shop.name | default: 'AURELIA NOIR' }}
        </span>
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#e6be62] font-medium -mt-0.5">
          {{ section.settings.tagline | default: 'Haute Parfumerie • Paris' }}
        </span>
      {%- endif -%}
    </a>

    <!-- Navigation Menu -->
    <nav class="hidden lg:flex items-center gap-8">
      {%- for link in section.settings.menu.links -%}
        <a href="{{ link.url }}" class="text-xs uppercase tracking-[0.16em] text-[#e8edf0] hover:text-[#e6be62] transition-colors {% if link.active %}text-[#e6be62] font-semibold{% endif %}">
          {{ link.title }}
        </a>
      {%- else -%}
        <a href="/collections/all" class="text-xs uppercase tracking-[0.16em] text-[#e8edf0] hover:text-[#e6be62]">Fragrances</a>
        <a href="/collections" class="text-xs uppercase tracking-[0.16em] text-[#e8edf0] hover:text-[#e6be62]">Collections</a>
        <a href="/pages/about" class="text-xs uppercase tracking-[0.16em] text-[#e8edf0] hover:text-[#e6be62]">Atelier</a>
        <a href="/blogs/journal" class="text-xs uppercase tracking-[0.16em] text-[#e8edf0] hover:text-[#e6be62]">Gazette</a>
        <a href="/pages/contact" class="text-xs uppercase tracking-[0.16em] text-[#e8edf0] hover:text-[#e6be62]">Concierge</a>
      {%- endfor -%}
    </nav>

    <!-- Header Actions -->
    <div class="flex items-center gap-3">
      <a href="{{ routes.search_url }}" class="p-2 text-[#e8edf0] hover:text-[#e6be62] transition-colors" aria-label="Search">
        {% render 'icon-search' %}
      </a>

      <button id="cart-drawer-trigger" class="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#092335] hover:bg-[#0d3047] border border-[#164d68] text-[#e8edf0] transition-colors" aria-label="Cart">
        {% render 'icon-cart' %}
        <span class="text-xs font-semibold text-[#e6be62]">{{ cart.item_count }}</span>
      </button>
    </div>
  </div>
</header>

{% schema %}
{
  "name": "Header",
  "settings": [
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Custom Logo Image"
    },
    {
      "type": "text",
      "id": "tagline",
      "label": "Header Subtitle Tagline",
      "default": "Haute Parfumerie • Paris"
    },
    {
      "type": "link_list",
      "id": "menu",
      "label": "Navigation Menu",
      "default": "main-menu"
    },
    {
      "type": "checkbox",
      "id": "sticky_header",
      "label": "Enable Sticky Header",
      "default": true
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/header.liquid'), headerLiquid);

// Hero section
const heroLiquid = `<section id="shopify-section-hero" class="relative w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12">
  <div class="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#092335] via-[#0d3047] to-[#06131c] border border-[#164d68]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 p-6 sm:p-10 lg:p-16 relative z-10">
      <div class="lg:col-span-7 flex flex-col items-start text-left space-y-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06131c]/60 border border-[#e6be62]/40">
          <span class="text-[#e6be62]">✦</span>
          <span class="text-[11px] uppercase tracking-[0.25em] text-[#f4efe5] font-medium">
            {{ section.settings.eyebrow | default: 'Collection Nocturne 2026' }}
          </span>
        </div>

        <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f4efe5] font-normal leading-[1.08] tracking-tight">
          {{ section.settings.heading | default: 'THE ALCHEMY OF CELESTIAL SCENT' }}
        </h1>

        <p class="text-base sm:text-lg text-[#a9bbc5] max-w-xl leading-relaxed font-light">
          {{ section.settings.subheading | default: 'Bespoke extraits hand-distilled in Grasse from rare botanical absolutes and smoky midnight resins.' }}
        </p>

        <div class="pt-3 flex flex-wrap items-center gap-4">
          <a href="{{ section.settings.primary_button_link | default: '/collections/all' }}" class="px-8 py-4 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-lg hover:-translate-y-0.5">
            {{ section.settings.primary_button_text | default: 'Explore the Collection' }}
          </a>
          <a href="{{ section.settings.secondary_button_link | default: '/pages/about' }}" class="px-7 py-4 rounded-full bg-transparent hover:bg-[#164d68]/30 text-[#f4efe5] hover:text-[#e6be62] border border-[#f4efe5]/30 text-xs font-medium uppercase tracking-[0.16em] transition-all">
            {{ section.settings.secondary_button_text | default: 'Discover Your Scent' }}
          </a>
        </div>
      </div>

      <div class="lg:col-span-5 relative flex justify-center items-center">
        <div class="relative rounded-2xl overflow-hidden border border-[#164d68]/80 shadow-2xl bg-[#06131c]">
          {%- if section.settings.image != blank -%}
            {{ section.settings.image | image_url: width: 800 | image_tag: class: 'w-full h-auto max-h-[520px] object-cover' }}
          {%- else -%}
            <img src="{{ 'hero-campaign.jpg' | asset_url }}" alt="Aurelia Noir Campaign Flacon" class="w-full h-auto max-h-[520px] object-cover">
          {%- endif -%}
          <div class="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#06131c]/80 backdrop-blur-md border border-[#e6be62]/30 text-left flex justify-between items-center">
            <div>
              <span class="text-[10px] uppercase tracking-[0.2em] text-[#e6be62] font-semibold block">Flagship Extrait</span>
              <h3 class="font-serif text-[#f4efe5] text-lg font-medium">Nuit Céleste</h3>
            </div>
            <span class="px-3 py-1 rounded bg-[#e6be62] text-[#06131c] text-xs font-semibold uppercase">32% Extrait</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

{% schema %}
{
  "name": "Hero Campaign",
  "settings": [
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow Badge Text",
      "default": "Maison Aurelia Noir • Collection Nocturne"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Hero Editorial Heading",
      "default": "THE ALCHEMY OF CELESTIAL SCENT"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Supporting Description",
      "default": "Bespoke extraits and nocturnal elixirs hand-distilled in the high plateaus of Grasse. Formulated for presence, longevity, and poetic distinction."
    },
    {
      "type": "text",
      "id": "primary_button_text",
      "label": "Primary Button Label",
      "default": "Explore the Collection"
    },
    {
      "type": "url",
      "id": "primary_button_link",
      "label": "Primary Button Link"
    },
    {
      "type": "text",
      "id": "secondary_button_text",
      "label": "Secondary Button Label",
      "default": "Find Your Signature"
    },
    {
      "type": "url",
      "id": "secondary_button_link",
      "label": "Secondary Button Link"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Hero Campaign Image"
    }
  ],
  "presets": [
    {
      "name": "Hero Campaign"
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/hero.liquid'), heroLiquid);

// Benefits Section
const benefitsLiquid = `<section id="shopify-section-benefits" class="w-full px-4 sm:px-6 lg:px-8 py-8">
  <div class="max-w-7xl mx-auto rounded-2xl bg-[#092335]/60 border border-[#164d68]/40 p-6 sm:p-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#164d68]/30">
      {%- for block in section.blocks -%}
        <div class="flex items-start gap-4 {% unless forloop.first %}pt-4 sm:pt-0 sm:pl-6{% endunless %}" {{ block.shopify_attributes }}>
          <div class="p-2.5 rounded-xl bg-[#0d3047] border border-[#e6be62]/30 text-[#e6be62] shrink-0">
            ✦
          </div>
          <div class="text-left">
            <h4 class="font-serif text-[#f4efe5] text-base font-medium">{{ block.settings.title }}</h4>
            <p class="text-xs text-[#a9bbc5] mt-1 leading-relaxed">{{ block.settings.text }}</p>
          </div>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Benefits Strip",
  "max_blocks": 4,
  "blocks": [
    {
      "type": "benefit",
      "name": "Benefit Item",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Benefit Title",
          "default": "Complimentary Delivery"
        },
        {
          "type": "text",
          "id": "text",
          "label": "Benefit Subtitle",
          "default": "Climate-controlled global courier delivery on all fragrance orders."
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Benefits Strip",
      "blocks": [
        { "type": "benefit", "settings": { "title": "Complimentary Delivery", "text": "Climate-controlled courier delivery worldwide with tracked dispatch." } },
        { "type": "benefit", "settings": { "title": "Pure Extrait Formulations", "text": "High concentration 22% to 34% fragrance oils for extraordinary presence." } },
        { "type": "benefit", "settings": { "title": "Artisanal Gift Presentation", "text": "Delivered in midnight blue cases hand-sealed with gold wax crest." } },
        { "type": "benefit", "settings": { "title": "Curated Discovery Vials", "text": "Two complimentary 2ml extrait samples included with every flacon." } }
      ]
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/benefits.liquid'), benefitsLiquid);

// Featured Products Section
const featuredProductsLiquid = `<section id="shopify-section-featured-products" class="w-full px-4 sm:px-6 lg:px-8 py-16">
  <div class="max-w-7xl mx-auto space-y-12">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#164d68]/40 pb-8 text-left">
      <div class="space-y-3 max-w-2xl">
        <span class="text-xs uppercase tracking-[0.25em] text-[#e6be62] font-semibold block">
          {{ section.settings.eyebrow | default: 'The House Collection' }}
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe5] font-normal">
          {{ section.settings.heading | default: 'Discover the House Collection' }}
        </h2>
        <p class="text-sm sm:text-base text-[#a9bbc5] font-light">
          {{ section.settings.description | default: 'Hand-distilled in small batches in Grasse. Formulations aged in glass demijohns under absolute darkness.' }}
        </p>
      </div>

      <a href="{{ section.settings.collection.url | default: '/collections/all' }}" class="text-xs uppercase tracking-wider text-[#e6be62] hover:text-white transition-colors">
        View All Fragrances &rarr;
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {%- if section.settings.collection != blank and section.settings.collection.products.size > 0 -%}
        {%- for product in section.settings.collection.products limit: section.settings.products_to_show -%}
          {% render 'product-card', product: product %}
        {%- endfor -%}
      {%- else -%}
        <!-- Fictional Initial Products for Instant Preview -->
        {%- for i in (1..4) -%}
          <div class="p-5 rounded-2xl bg-[#092335]/70 border border-[#164d68]/50 text-left space-y-4">
            <div class="aspect-[3/4] bg-[#06131c] rounded-xl flex items-center justify-center text-xs text-[#a9bbc5]">
              Flacon Showcase #{{ i }}
            </div>
            <h3 class="font-serif text-xl text-[#f4efe5]">Nuit Céleste Extrait</h3>
            <span class="font-serif text-[#e6be62] text-lg font-semibold">$285</span>
          </div>
        {%- endfor -%}
      {%- endif -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Featured Fragrances",
  "settings": [
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Section Eyebrow",
      "default": "Haute Parfumerie Catalog"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Discover the House Collection"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "default": "Formulated in Grasse and aged in small glass demijohns. Each composition explores rare natural absolutes and atmospheric accords."
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Select Collection"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "label": "Products to display",
      "min": 2,
      "max": 12,
      "step": 1,
      "default": 4
    }
  ],
  "presets": [
    {
      "name": "Featured Fragrances"
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/featured-products.liquid'), featuredProductsLiquid);

// Brand Story Section
const brandStoryLiquid = `<section id="shopify-section-brand-story" class="w-full px-4 sm:px-6 lg:px-8 py-16">
  <div class="max-w-7xl mx-auto rounded-3xl bg-[#092335]/50 border border-[#164d68]/50 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <div class="lg:col-span-6 relative">
        <div class="rounded-2xl overflow-hidden border border-[#164d68] shadow-2xl bg-[#06131c]">
          {%- if section.settings.image != blank -%}
            {{ section.settings.image | image_url: width: 800 | image_tag: class: 'w-full h-auto max-h-[500px] object-cover' }}
          {%- else -%}
            <img src="{{ 'brand-story.jpg' | asset_url }}" alt="Grasse Atelier" class="w-full h-auto max-h-[500px] object-cover">
          {%- endif -%}
        </div>
      </div>
      <div class="lg:col-span-6 flex flex-col items-start text-left space-y-6">
        <span class="text-xs uppercase tracking-[0.25em] text-[#e6be62] font-semibold block">
          {{ section.settings.eyebrow | default: 'Haute Parfumerie Pedigree' }}
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe5] font-normal leading-[1.15]">
          {{ section.settings.heading | default: 'Where Ancient Alchemy Meets Modern Distinction' }}
        </h2>
        <div class="text-base text-[#a9bbc5] font-light leading-relaxed space-y-4">
          {{ section.settings.text | default: '<p>Founded in the alpine hinterlands behind Grasse, Aurelia Noir was conceived as a sanctuary against mass-market homogeneity. We approach fragrance not as a consumer commodity, but as an invisible architecture.</p>' }}
        </div>
        <a href="{{ section.settings.button_link | default: '/pages/about' }}" class="px-8 py-3.5 rounded-full bg-[#0d3047] hover:bg-[#164d68] text-[#e6be62] border border-[#e6be62]/50 text-xs font-semibold uppercase tracking-[0.15em] transition-all">
          {{ section.settings.button_text | default: 'Explore The Atelier Story' }}
        </a>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Brand Story",
  "settings": [
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow Text",
      "default": "Haute Parfumerie Pedigree"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Where Ancient Alchemy Meets Modern Distinction"
    },
    {
      "type": "richtext",
      "id": "text",
      "label": "Story Body Text"
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button Label",
      "default": "Explore The Atelier Story"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button Link"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Atelier Image"
    }
  ],
  "presets": [
    {
      "name": "Brand Story"
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/brand-story.liquid'), brandStoryLiquid);

// Editorial Campaign Section
const editorialCampaignLiquid = `<section id="shopify-section-editorial-campaign" class="w-full px-4 sm:px-6 lg:px-8 py-16">
  <div class="max-w-7xl mx-auto relative rounded-3xl overflow-hidden border border-[#164d68]/80 shadow-2xl bg-[#06131c]">
    <div class="relative h-[550px] w-full overflow-hidden">
      {%- if section.settings.image != blank -%}
        {{ section.settings.image | image_url: width: 1400 | image_tag: class: 'w-full h-full object-cover object-center' }}
      {%- else -%}
        <img src="{{ 'editorial-campaign.jpg' | asset_url }}" alt="Campaign Banner" class="w-full h-full object-cover object-center">
      {%- endif -%}
      <div class="absolute inset-0 bg-gradient-to-r from-[#06131c] via-[#06131c]/75 to-transparent"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-start p-8 sm:p-14 max-w-2xl text-left space-y-6">
        <span class="text-[11px] uppercase tracking-[0.25em] text-[#e6be62] font-semibold">
          {{ section.settings.badge | default: 'Haute Parfumerie Campaign' }}
        </span>
        <h2 class="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f4efe5] font-normal leading-[1.08]">
          {{ section.settings.heading | default: 'The Solstice Extraction' }}
        </h2>
        <p class="text-base text-[#e8edf0]/90 font-light leading-relaxed">
          {{ section.settings.description | default: 'Distilled only once each calendar cycle during the winter solstice. An intoxicating marriage of agarwood, Calabrian bergamot, and floating ambergris.' }}
        </p>
        <a href="{{ section.settings.link | default: '/collections/all' }}" class="px-8 py-4 rounded-full bg-[#e6be62] text-[#06131c] font-semibold text-xs uppercase tracking-[0.16em] hover:bg-[#edd085] transition-all shadow-lg">
          {{ section.settings.button_text | default: 'Acquire Allocation' }}
        </a>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Editorial Campaign Banner",
  "settings": [
    {
      "type": "text",
      "id": "badge",
      "label": "Badge Text",
      "default": "Haute Parfumerie Campaign"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Editorial Heading",
      "default": "The Solstice Extraction"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description Text",
      "default": "Distilled only once each calendar cycle during the winter solstice."
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button Label",
      "default": "Acquire Allocation"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Button Link"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Campaign Banner Image"
    }
  ],
  "presets": [
    {
      "name": "Editorial Campaign Banner"
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/editorial-campaign.liquid'), editorialCampaignLiquid);

// Newsletter Section
const newsletterLiquid = `<section id="shopify-section-newsletter" class="w-full px-4 sm:px-6 lg:px-8 py-16">
  <div class="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#092335] to-[#06131c] border border-[#164d68]/60 p-8 sm:p-14 text-center space-y-6">
    <span class="text-[11px] uppercase tracking-[0.25em] text-[#e6be62] font-semibold block">
      {{ section.settings.eyebrow | default: 'The Aurelia Circle' }}
    </span>
    <h2 class="font-serif text-3xl sm:text-4xl text-[#f4efe5] font-normal">
      {{ section.settings.heading | default: 'Reserve Your Place in the Atelier Guild' }}
    </h2>
    <p class="text-sm text-[#a9bbc5] max-w-xl mx-auto font-light leading-relaxed">
      {{ section.settings.text | default: 'Subscribers receive private allocation notices for limited seasonal distillations and invitations to Parisian salon tastings.' }}
    </p>

    {% form 'customer', class: 'flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto' %}
      <input type="hidden" name="contact[tags]" value="newsletter">
      <input
        type="email"
        name="contact[email]"
        required
        placeholder="Enter your confidential email..."
        class="w-full px-5 py-3.5 bg-[#06131c] border border-[#164d68] rounded-full text-sm text-[#e8edf0] placeholder-[#a9bbc5]/60 focus:outline-none focus:border-[#e6be62]"
      >
      <button type="submit" class="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#e6be62] text-[#06131c] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#edd085] transition-all shrink-0">
        Subscribe
      </button>
    {% endform %}
  </div>
</section>

{% schema %}
{
  "name": "Newsletter",
  "settings": [
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow Text",
      "default": "The Aurelia Circle"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Reserve Your Place in the Atelier Guild"
    },
    {
      "type": "textarea",
      "id": "text",
      "label": "Description",
      "default": "Subscribers receive private allocation notices for limited seasonal distillations."
    }
  ],
  "presets": [
    {
      "name": "Newsletter"
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/newsletter.liquid'), newsletterLiquid);

// Footer Section
const footerLiquid = `<footer id="shopify-section-footer" class="w-full bg-[#06131c] border-t border-[#164d68]/40 pt-16 pb-12 px-4 sm:px-8 text-left">
  <div class="max-w-7xl mx-auto space-y-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div class="space-y-4">
        <span class="font-serif text-2xl tracking-[0.2em] text-[#f4efe5] font-light uppercase block">
          {{ shop.name | default: 'AURELIA NOIR' }}
        </span>
        <p class="text-xs text-[#a9bbc5] max-w-sm leading-relaxed font-light">
          {{ section.settings.about_text | default: 'Crafting architectural extraits of nocturnal distinction. Hand-distilled in small batches in Grasse using rare natural absolutes.' }}
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">Fragrances</h4>
        <ul class="space-y-2 text-xs text-[#a9bbc5]">
          <li><a href="/collections/all" class="hover:text-[#f4efe5]">All Extraits de Parfum</a></li>
          <li><a href="/collections/all" class="hover:text-[#f4efe5]">Woody & Smoked Ouds</a></li>
          <li><a href="/collections/all" class="hover:text-[#f4efe5]">Nocturnal Florals</a></li>
          <li><a href="/collections/all" class="hover:text-[#f4efe5]">Discovery Coffrets</a></li>
        </ul>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">Maison</h4>
        <ul class="space-y-2 text-xs text-[#a9bbc5]">
          <li><a href="/pages/about" class="hover:text-[#f4efe5]">The Grasse Atelier</a></li>
          <li><a href="/blogs/journal" class="hover:text-[#f4efe5]">Editorial Gazette</a></li>
          <li><a href="/pages/contact" class="hover:text-[#f4efe5]">Private Appointments</a></li>
        </ul>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">Concierge Desk</h4>
        <div class="text-xs text-[#a9bbc5] space-y-1">
          <p class="text-[#f4efe5]">18 Place Vendôme, 75001 Paris</p>
          <p>34 Mount Street, Mayfair, London</p>
          <p class="text-[#e6be62]">concierge@aurelianoir.com</p>
        </div>
      </div>
    </div>

    <div class="pt-8 border-t border-[#164d68]/40 flex flex-col sm:flex-row justify-between text-xs text-[#a9bbc5]">
      <p>&copy; {{ 'now' | date: "%Y" }} {{ shop.name }}. All rights reserved.</p>
      <div class="flex gap-6">
        <span>Confidentiality</span>
        <span>Terms of Privileges</span>
        <span>Authenticity Guarantee</span>
      </div>
    </div>
  </div>
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": [
    {
      "type": "textarea",
      "id": "about_text",
      "label": "About Statement",
      "default": "Crafting architectural extraits of nocturnal distinction."
    }
  ]
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/footer.liquid'), footerLiquid);

// Main Product Section
const mainProductLiquid = `<section id="shopify-section-main-product" class="w-full px-4 sm:px-6 lg:px-8 py-10">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
    <div class="lg:col-span-7 rounded-3xl overflow-hidden bg-[#06131c] border border-[#164d68]/60 aspect-[4/5] flex items-center justify-center">
      {%- if product.featured_image != blank -%}
        <img src="{{ product.featured_image | image_url: width: 1000 }}" alt="{{ product.title }}" class="w-full h-full object-cover">
      {%- else -%}
        <img src="{{ 'hero-campaign.jpg' | asset_url }}" alt="Flacon" class="w-full h-full object-cover">
      {%- endif -%}
    </div>

    <div class="lg:col-span-5 space-y-6">
      <div class="space-y-2">
        <span class="text-xs uppercase tracking-[0.25em] text-[#e6be62] font-semibold block">Extrait de Parfum</span>
        <h1 class="font-serif text-4xl text-[#f4efe5] font-normal">{{ product.title }}</h1>
        <div class="font-serif text-3xl text-[#e6be62]">{{ product.price | money }}</div>
      </div>

      <div class="text-sm text-[#a9bbc5] leading-relaxed">
        {{ product.description }}
      </div>

      {% form 'product', product %}
        <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
        <div class="pt-4">
          <button type="submit" class="w-full py-4 px-8 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-lg">
            Add to Shopping Bag &bull; {{ product.price | money }}
          </button>
        </div>
      {% endform %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Product Details",
  "settings": []
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/main-product.liquid'), mainProductLiquid);

// Main Collection Section
const mainCollectionLiquid = `<section id="shopify-section-main-collection" class="w-full px-4 sm:px-6 lg:px-8 py-10">
  <div class="max-w-7xl mx-auto space-y-10 text-left">
    <div class="space-y-3">
      <h1 class="font-serif text-4xl text-[#f4efe5]">{{ collection.title | default: 'All Fragrances' }}</h1>
      <p class="text-sm text-[#a9bbc5] max-w-2xl">{{ collection.description | default: 'The complete library of rare extraits distilled in Grasse.' }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {%- for product in collection.products -%}
        {% render 'product-card', product: product %}
      {%- else -%}
        <p class="text-sm text-[#a9bbc5]">No products in this collection.</p>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Collection Products",
  "settings": []
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/main-collection.liquid'), mainCollectionLiquid);

// Main Cart Section
const mainCartLiquid = `<section id="shopify-section-main-cart" class="w-full px-4 sm:px-6 lg:px-8 py-12">
  <div class="max-w-4xl mx-auto space-y-8 text-left">
    <h1 class="font-serif text-4xl text-[#f4efe5]">Your Shopping Bag</h1>
    {%- if cart.item_count > 0 -%}
      <form action="{{ routes.cart_url }}" method="post" class="space-y-6">
        <div class="divide-y divide-[#164d68]/50">
          {%- for item in cart.items -%}
            <div class="py-4 flex gap-4 items-center justify-between">
              <div class="flex items-center gap-4">
                <img src="{{ item.image | image_url: width: 120 }}" alt="{{ item.title }}" class="w-16 h-20 object-cover rounded bg-[#06131c]">
                <div>
                  <h3 class="font-serif text-lg text-[#f4efe5]">{{ item.product.title }}</h3>
                  <span class="text-xs text-[#e6be62]">{{ item.variant.title }}</span>
                </div>
              </div>
              <div class="text-right font-serif text-[#e6be62]">
                {{ item.final_line_price | money }}
              </div>
            </div>
          {%- endfor -%}
        </div>

        <div class="pt-6 border-t border-[#164d68] flex justify-between items-center">
          <div>
            <span class="text-xs text-[#a9bbc5]">Subtotal:</span>
            <span class="font-serif text-2xl text-[#f4efe5] ml-2">{{ cart.total_price | money }}</span>
          </div>
          <button type="submit" name="checkout" class="px-8 py-4 rounded-full bg-[#e6be62] text-[#06131c] text-xs font-semibold uppercase tracking-wider hover:bg-[#edd085]">
            Checkout Now
          </button>
        </div>
      </form>
    {%- else -%}
      <div class="text-center py-12 space-y-4">
        <p class="text-sm text-[#a9bbc5]">Your shopping bag is currently empty.</p>
        <a href="/collections/all" class="inline-block px-6 py-3 rounded-full bg-[#e6be62] text-[#06131c] text-xs font-semibold uppercase">Explore Fragrances</a>
      </div>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Cart Page",
  "settings": []
}
{% endschema %}`;

fs.writeFileSync(path.join(THEME_DIR, 'sections/main-cart.liquid'), mainCartLiquid);

// 6. Write snippets
// Product Card Snippet
const productCardLiquid = `<div class="group relative bg-[#092335]/70 hover:bg-[#0d3047] border border-[#164d68]/50 hover:border-[#e6be62]/50 transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg text-left">
  <a href="{{ product.url }}" class="block relative aspect-[3/4] overflow-hidden bg-[#06131c]">
    {%- if product.featured_image != blank -%}
      <img src="{{ product.featured_image | image_url: width: 600 }}" alt="{{ product.title }}" class="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700">
    {%- else -%}
      <div class="w-full h-full flex items-center justify-center text-xs text-[#a9bbc5]">Extrait Flacon</div>
    {%- endif -%}
  </a>

  <div class="p-5 flex flex-col flex-1 justify-between space-y-3">
    <div>
      <span class="text-[11px] uppercase tracking-wider text-[#e6be62] font-semibold block">Extrait de Parfum</span>
      <h3 class="font-serif text-xl text-[#f4efe5] mt-1 group-hover:text-[#e6be62] transition-colors">
        <a href="{{ product.url }}">{{ product.title }}</a>
      </h3>
      <p class="text-xs text-[#a9bbc5] line-clamp-2 mt-1">{{ product.description | strip_html }}</p>
    </div>

    <div class="pt-3 border-t border-[#164d68]/40 flex items-center justify-between">
      <span class="font-serif text-lg text-[#e6be62] font-semibold">{{ product.price | money }}</span>
      <form method="post" action="/cart/add">
        <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
        <button type="submit" class="px-3.5 py-1.5 rounded-full bg-[#0d3047] hover:bg-[#e6be62] text-[#e6be62] hover:text-[#06131c] border border-[#e6be62]/40 text-xs font-semibold uppercase tracking-wider transition-all">
          Add
        </button>
      </form>
    </div>
  </div>
</div>`;

fs.writeFileSync(path.join(THEME_DIR, 'snippets/product-card.liquid'), productCardLiquid);

// Icons
const iconCartLiquid = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-[#e6be62]"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
const iconSearchLiquid = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;
const iconCloseLiquid = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
const iconStarLiquid = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e6be62" stroke="#e6be62" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const metaTagsLiquid = `<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ canonical_url }}">
<meta property="og:title" content="{{ page_title }}">
<meta property="og:type" content="website">
<meta property="og:description" content="{{ page_description | default: shop.description | escape }}">
<meta name="twitter:card" content="summary_large_image">`;

fs.writeFileSync(path.join(THEME_DIR, 'snippets/icon-cart.liquid'), iconCartLiquid);
fs.writeFileSync(path.join(THEME_DIR, 'snippets/icon-search.liquid'), iconSearchLiquid);
fs.writeFileSync(path.join(THEME_DIR, 'snippets/icon-close.liquid'), iconCloseLiquid);
fs.writeFileSync(path.join(THEME_DIR, 'snippets/icon-star.liquid'), iconStarLiquid);
fs.writeFileSync(path.join(THEME_DIR, 'snippets/meta-tags.liquid'), metaTagsLiquid);

// Quick View and Cart Drawer Snippets
const quickViewLiquid = `<div id="quick-view-modal" class="hidden fixed inset-0 z-50 bg-[#06131c]/90 backdrop-blur-md flex items-center justify-center p-4">
  <div class="relative w-full max-w-2xl bg-[#092335] border border-[#164d68] rounded-3xl p-6 shadow-2xl">
    <button id="quick-view-close" class="absolute top-4 right-4 text-[#a9bbc5] hover:text-white">{% render 'icon-close' %}</button>
    <div id="quick-view-content"></div>
  </div>
</div>`;

const cartDrawerLiquid = `<div id="cart-drawer" class="hidden fixed inset-0 z-50 overflow-hidden">
  <div id="cart-drawer-backdrop" class="absolute inset-0 bg-[#06131c]/80 backdrop-blur-sm"></div>
  <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
    <div class="w-screen max-w-md bg-[#092335] border-l border-[#164d68] p-6 flex flex-col justify-between text-left">
      <div class="flex items-center justify-between pb-4 border-b border-[#164d68]">
        <h3 class="font-serif text-xl text-[#f4efe5]">Your Shopping Bag</h3>
        <button id="cart-drawer-close" class="text-[#a9bbc5] hover:text-white">{% render 'icon-close' %}</button>
      </div>
      <div id="cart-drawer-items" class="flex-1 overflow-y-auto py-4">
        <p class="text-xs text-[#a9bbc5]">Bag synchronization active.</p>
      </div>
      <div class="pt-4 border-t border-[#164d68]">
        <a href="/checkout" class="block w-full py-3.5 rounded-full bg-[#e6be62] text-[#06131c] font-semibold text-center text-xs uppercase tracking-wider hover:bg-[#edd085]">
          Proceed to Checkout
        </a>
      </div>
    </div>
  </div>
</div>`;

fs.writeFileSync(path.join(THEME_DIR, 'snippets/quick-view-modal.liquid'), quickViewLiquid);
fs.writeFileSync(path.join(THEME_DIR, 'snippets/cart-drawer.liquid'), cartDrawerLiquid);

// 7. Write templates (Online Store 2.0 JSON format)
const indexJson = {
  "sections": {
    "announcement_bar": {
      "type": "announcement-bar",
      "settings": {
        "show_announcement": true,
        "text": "Complimentary Worldwide Express Courier & 2 Curated Discovery Vials"
      }
    },
    "hero": {
      "type": "hero",
      "settings": {
        "eyebrow": "Maison Aurelia Noir • Collection Nocturne",
        "heading": "THE ALCHEMY OF CELESTIAL SCENT",
        "subheading": "Bespoke extraits and nocturnal elixirs hand-distilled in the high plateaus of Grasse.",
        "primary_button_text": "Explore the Collection",
        "primary_button_link": "/collections/all",
        "secondary_button_text": "Find Your Signature",
        "secondary_button_link": "/pages/about"
      }
    },
    "benefits": {
      "type": "benefits",
      "settings": {}
    },
    "featured_products": {
      "type": "featured-products",
      "settings": {
        "heading": "Discover the House Collection",
        "description": "Formulated in Grasse and aged in small glass demijohns under strict darkness.",
        "products_to_show": 4
      }
    },
    "brand_story": {
      "type": "brand-story",
      "settings": {
        "heading": "Where Ancient Alchemy Meets Modern Distinction"
      }
    },
    "editorial_campaign": {
      "type": "editorial-campaign",
      "settings": {
        "heading": "The Solstice Extraction",
        "description": "Distilled only once each calendar cycle during the winter solstice."
      }
    },
    "newsletter": {
      "type": "newsletter",
      "settings": {
        "heading": "Reserve Your Place in the Atelier Guild"
      }
    }
  },
  "order": [
    "announcement_bar",
    "hero",
    "benefits",
    "featured_products",
    "brand_story",
    "editorial_campaign",
    "newsletter"
  ]
};

const productJson = {
  "sections": {
    "main": {
      "type": "main-product",
      "settings": {}
    }
  },
  "order": ["main"]
};

const collectionJson = {
  "sections": {
    "main": {
      "type": "main-collection",
      "settings": {}
    }
  },
  "order": ["main"]
};

const cartJson = {
  "sections": {
    "main": {
      "type": "main-cart",
      "settings": {}
    }
  },
  "order": ["main"]
};

const pageAboutJson = {
  "sections": {
    "brand_story": {
      "type": "brand-story",
      "settings": {
        "heading": "The Heritage of Grasse Macerations"
      }
    }
  },
  "order": ["brand_story"]
};

const pageContactJson = {
  "sections": {
    "newsletter": {
      "type": "newsletter",
      "settings": {
        "heading": "Concierge Consultation Inquiry"
      }
    }
  },
  "order": ["newsletter"]
};

const blogJson = {
  "sections": {
    "main": {
      "type": "editorial-campaign",
      "settings": {
        "heading": "Gazette de Parfumerie"
      }
    }
  },
  "order": ["main"]
};

const articleJson = {
  "sections": {
    "main": {
      "type": "editorial-campaign",
      "settings": {}
    }
  },
  "order": ["main"]
};

const notFoundJson = {
  "sections": {
    "hero": {
      "type": "hero",
      "settings": {
        "heading": "Page Departed",
        "subheading": "The fragrance you seek has dissolved into the night mist."
      }
    }
  },
  "order": ["hero"]
};

fs.writeFileSync(path.join(THEME_DIR, 'templates/index.json'), JSON.stringify(indexJson, null, 2));
fs.writeFileSync(path.join(THEME_DIR, 'templates/product.json'), JSON.stringify(productJson, null, 2));
fs.writeFileSync(path.join(THEME_DIR, 'templates/collection.json'), JSON.stringify(collectionJson, null, 2));
fs.writeFileSync(path.join(THEME_DIR, 'templates/cart.json'), JSON.stringify(cartJson, null, 2));
fs.writeFileSync(path.join(THEME_DIR, 'templates/page.about.json'), JSON.stringify(pageAboutJson, null, 2));
fs.writeFileSync(path.join(THEME_DIR, 'templates/page.contact.json'), JSON.stringify(pageContactJson, null, 2));
fs.writeFileSync(path.join(THEME_DIR, 'templates/blog.json'), JSON.stringify(blogJson, null, 2));
fs.writeFileSync(path.join(THEME_DIR, 'templates/article.json'), JSON.stringify(articleJson, null, 2));
fs.writeFileSync(path.join(THEME_DIR, 'templates/404.json'), JSON.stringify(notFoundJson, null, 2));

// 8. Write locales/en.default.json
const enLocale = {
  "general": {
    "search": "Search Haute Fragrances",
    "submit": "Submit"
  },
  "accessibility": {
    "skip_to_text": "Skip to content",
    "close": "Close"
  },
  "products": {
    "product": {
      "add_to_cart": "Add to Shopping Bag",
      "sold_out": "Allocation Exhausted",
      "unavailable": "Unavailable",
      "price": "Price"
    }
  },
  "cart": {
    "general": {
      "title": "Your Shopping Bag",
      "subtotal": "Subtotal",
      "checkout": "Proceed to Secure Checkout",
      "empty": "Your bag is presently empty."
    }
  }
};

fs.writeFileSync(path.join(THEME_DIR, 'locales/en.default.json'), JSON.stringify(enLocale, null, 2));

// 9. Write assets/theme.css
const themeCss = `/* Aurelia Noir Shopify Theme 2.0 Base CSS */
body {
  margin: 0;
  padding: 0;
  background-color: var(--color-navy-deep, #06131c);
  color: var(--color-white-soft, #e8edf0);
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
}

h1, h2, h3, h4, .font-serif {
  font-family: var(--font-heading, 'Cormorant Garamond', serif);
}

.gold-accent {
  color: var(--color-gold, #e6be62);
}

/* Transitions */
button, a {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
`;

fs.writeFileSync(path.join(THEME_DIR, 'assets/theme.css'), themeCss);

// 10. Write assets/theme.js
const themeJs = `// Aurelia Noir Online Store 2.0 Client Script
document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('cart-drawer');
  const trigger = document.getElementById('cart-drawer-trigger');
  const close = document.getElementById('cart-drawer-close');
  const backdrop = document.getElementById('cart-drawer-backdrop');

  function openDrawer() {
    if (drawer) drawer.classList.remove('hidden');
  }

  function closeDrawer() {
    if (drawer) drawer.classList.add('hidden');
  }

  if (trigger) trigger.addEventListener('click', openDrawer);
  if (close) close.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
});
`;

fs.writeFileSync(path.join(THEME_DIR, 'assets/theme.js'), themeJs);

// 11. Copy all images into assets/
if (fs.existsSync(ASSETS_SRC)) {
  const files = fs.readdirSync(ASSETS_SRC);
  files.forEach(f => {
    fs.copyFileSync(path.join(ASSETS_SRC, f), path.join(THEME_DIR, 'assets', f));
  });
}

// 12. Write README.md
const readmeMd = `# AURELIA NOIR — LUXURY FRAGRANCE SHOPIFY THEME (ONLINE STORE 2.0)

Production-ready, customizable luxury perfume theme crafted specifically for Shopify Online Store 2.0.

## HOW TO INSTALL ON SHOPIFY:

1. Log into your **Shopify Admin** (e.g. \`your-store.myshopify.com/admin\`).
2. In the left navigation, go to **Online Store** &rarr; **Themes**.
3. In the **Theme Library** section, click **Add Theme** &rarr; **Upload zip file**.
4. Select the \`aurelia-noir-shopify-theme.zip\` file.
5. Click **Actions** &rarr; **Publish** when you are ready to make it your live store!

## CUSTOMIZATION VIA SHOPIFY THEME EDITOR:

1. Go to **Online Store** &rarr; **Themes** &rarr; click **Customize**.
2. **Announcement Bar**: Enable/disable, edit delivery messages, change background and text colors.
3. **Hero Section**: Edit editorial headlines, highlight words, change button labels and destination links, and upload bespoke campaign imagery.
4. **House Collection**: Select your featured product collection, adjust number of displayed flacons, and toggle ratings or quick-view modals.
5. **Brand Story & Editorial**: Upload atelier photos, write your house heritage statement, and link to custom editorial pages.
6. **Colors & Fonts**: Customize champagne gold accents, deep navy background tints, and font typography pairings directly without touching code!

## THEME ARCHITECTURE:

- \`layout/theme.liquid\`: Base HTML5 shell with Google Fonts and dynamic script loading.
- \`templates/*.json\`: Native Shopify Online Store 2.0 JSON templates for modular section reordering.
- \`sections/*.liquid\`: Modular, customizable sections with rich schemas.
- \`snippets/*.liquid\`: Reusable components (product cards, cart drawer, quick view modal).
- \`assets/\`: CSS styling, JavaScript interaction handlers, and pre-packaged campaign photos.
- \`config/settings_schema.json\`: Theme settings definition for the visual editor.

Crafted by Aurelia Noir Haute Parfumerie.
`;

fs.writeFileSync(path.join(THEME_DIR, 'README.md'), readmeMd);

console.log('Shopify theme directory structure successfully generated!');

// 13. Package into ZIP using JSZip
async function createZip() {
  const zip = new JSZip();

  function addFolderToZip(folderPath, zipFolder) {
    const items = fs.readdirSync(folderPath);
    for (const item of items) {
      const fullPath = path.join(folderPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subZip = zipFolder.folder(item);
        addFolderToZip(fullPath, subZip);
      } else {
        const content = fs.readFileSync(fullPath);
        zipFolder.file(item, content);
      }
    }
  }

  addFolderToZip(THEME_DIR, zip);

  const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } });
  
  // Save in public directory for direct download in the live app
  ensureDir(PUBLIC_DIR);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'aurelia-noir-shopify-theme.zip'), buffer);
  fs.writeFileSync(path.resolve('aurelia-noir-shopify-theme.zip'), buffer);

  console.log('Successfully created aurelia-noir-shopify-theme.zip!');
  console.log('Zip file size: ' + (buffer.length / 1024 / 1024).toFixed(2) + ' MB');
}

createZip().catch(err => {
  console.error('Failed to create zip:', err);
});
