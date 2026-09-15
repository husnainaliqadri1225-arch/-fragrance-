import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, Download, Check, Copy, Sliders, Code2, BookOpen, 
  FolderTree, Sparkles, ShieldCheck, ArrowRight, RefreshCw 
} from 'lucide-react';

const CODE_SNIPPETS: Record<string, { filename: string; language: string; code: string }> = {
  themeLiquid: {
    filename: 'layout/theme.liquid',
    language: 'liquid',
    code: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#06131c">
    <link rel="canonical" href="{{ canonical_url }}">

    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}

    <title>{{ page_title }} &ndash; {{ shop.name }}</title>
    {{ content_for_header }}

    <style>
      :root {
        --color-navy-deep: {{ settings.color_bg | default: '#06131c' }};
        --color-gold: {{ settings.color_gold | default: '#e6be62' }};
        --font-heading: 'Cormorant Garamond', Georgia, serif;
        --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
      }
    </style>
    {{ 'theme.css' | asset_url | stylesheet_tag }}
  </head>
  <body class="bg-[#06131c] text-[#e8edf0] antialiased">
    {% sections 'header-group' %}
    <main id="MainContent" class="content-for-layout" role="main">
      {{ content_for_layout }}
    </main>
    {% sections 'footer-group' %}
    {% render 'cart-drawer' %}
    {% render 'quick-view-modal' %}
    <script src="{{ 'theme.js' | asset_url }}" defer="defer"></script>
  </body>
</html>`
  },
  heroLiquid: {
    filename: 'sections/hero.liquid',
    language: 'liquid',
    code: `<section id="shopify-section-hero" class="relative w-full px-4 sm:px-8 pt-4 pb-12">
  <div class="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#092335] via-[#0d3047] to-[#06131c] border border-[#164d68]/60 p-10 lg:p-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
      <div class="lg:col-span-7 text-left space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06131c]/60 border border-[#e6be62]/40">
          <span class="text-[#e6be62]">✦</span>
          <span class="text-[11px] uppercase tracking-[0.25em] text-[#f4efe5]">{{ section.settings.eyebrow }}</span>
        </div>
        <h1 class="font-serif text-5xl lg:text-6xl text-[#f4efe5] font-normal leading-[1.08]">
          {{ section.settings.heading }}
        </h1>
        <p class="text-base text-[#a9bbc5] max-w-xl font-light">{{ section.settings.subheading }}</p>
        <div class="pt-2 flex gap-4">
          <a href="{{ section.settings.primary_button_link }}" class="px-8 py-4 rounded-full bg-[#e6be62] text-[#06131c] font-semibold text-xs uppercase tracking-[0.16em]">
            {{ section.settings.primary_button_text }}
          </a>
        </div>
      </div>
      <div class="lg:col-span-5">
        {{ section.settings.image | image_url: width: 800 | image_tag: class: 'w-full h-auto rounded-2xl border border-[#164d68]' }}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero Campaign",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow Text", "default": "Maison Aurelia Noir" },
    { "type": "text", "id": "heading", "label": "Editorial Heading", "default": "THE ALCHEMY OF CELESTIAL SCENT" },
    { "type": "textarea", "id": "subheading", "label": "Subheading", "default": "Bespoke extraits hand-distilled in Grasse." },
    { "type": "text", "id": "primary_button_text", "label": "Primary Button Label", "default": "Explore the Collection" },
    { "type": "url", "id": "primary_button_link", "label": "Primary Button Link" },
    { "type": "image_picker", "id": "image", "label": "Campaign Image" }
  ],
  "presets": [{ "name": "Hero Campaign" }]
}
{% endschema %}`
  },
  featuredProductsLiquid: {
    filename: 'sections/featured-products.liquid',
    language: 'liquid',
    code: `<section id="shopify-section-featured-products" class="w-full px-4 sm:px-8 py-16">
  <div class="max-w-7xl mx-auto space-y-12">
    <div class="flex justify-between items-end border-b border-[#164d68]/40 pb-8 text-left">
      <div>
        <span class="text-xs uppercase tracking-[0.25em] text-[#e6be62] block">{{ section.settings.eyebrow }}</span>
        <h2 class="font-serif text-4xl text-[#f4efe5] font-normal">{{ section.settings.heading }}</h2>
      </div>
      <a href="{{ section.settings.collection.url | default: '/collections/all' }}" class="text-xs uppercase text-[#e6be62]">View All &rarr;</a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {%- for product in section.settings.collection.products limit: section.settings.products_to_show -%}
        {% render 'product-card', product: product %}
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Featured Fragrances",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Haute Parfumerie Catalog" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Discover the House Collection" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "products_to_show", "label": "Products to Show", "min": 2, "max": 12, "default": 4 }
  ],
  "presets": [{ "name": "Featured Fragrances" }]
}
{% endschema %}`
  },
  indexJson: {
    filename: 'templates/index.json',
    language: 'json',
    code: `{
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
        "primary_button_text": "Explore the Collection",
        "primary_button_link": "/collections/all"
      }
    },
    "benefits": { "type": "benefits", "settings": {} },
    "featured_products": {
      "type": "featured-products",
      "settings": { "heading": "Discover the House Collection", "products_to_show": 4 }
    },
    "brand_story": { "type": "brand-story", "settings": {} },
    "editorial_campaign": { "type": "editorial-campaign", "settings": {} },
    "newsletter": { "type": "newsletter", "settings": {} }
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
}`
  },
  settingsSchema: {
    filename: 'config/settings_schema.json',
    language: 'json',
    code: `[
  {
    "name": "theme_info",
    "theme_name": "Aurelia Noir Luxury Fragrance",
    "theme_version": "1.0.0",
    "theme_author": "Aurelia Noir Haute Parfumerie"
  },
  {
    "name": "Colors & Aesthetics",
    "settings": [
      { "type": "color", "id": "color_bg", "label": "Deep Navy Background", "default": "#06131c" },
      { "type": "color", "id": "color_surface", "label": "Surface Midnight Blue", "default": "#092335" },
      { "type": "color", "id": "color_gold", "label": "Champagne Gold Accent", "default": "#e6be62" },
      { "type": "color", "id": "color_text", "label": "Text Primary (Soft White)", "default": "#e8edf0" }
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
      { "type": "checkbox", "id": "show_quick_view", "label": "Enable Quick View", "default": true },
      { "type": "checkbox", "id": "show_ratings", "label": "Display Star Ratings", "default": true }
    ]
  }
]`
  }
};

export const ShopifyThemeModal: React.FC = () => {
  const {
    isThemeModalOpen,
    setIsThemeModalOpen,
    themeSettings,
    updateThemeSetting,
    resetThemeSettings,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'download' | 'editor' | 'code'>('download');
  const [selectedSnippetKey, setSelectedSnippetKey] = useState<string>('themeLiquid');
  const [copied, setCopied] = useState(false);

  if (!isThemeModalOpen) return null;

  const handleCopyCode = () => {
    const code = CODE_SNIPPETS[selectedSnippetKey]?.code || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast('Liquid code copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="shopify-theme-modal-title"
      className="fixed inset-0 z-50 bg-[#06131c]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-[#092335] border border-[#164d68] rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#164d68]/60 flex items-center justify-between bg-[#06131c]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0d3047] border border-[#e6be62]/40 text-[#e6be62]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h2 id="shopify-theme-modal-title" className="font-serif text-xl sm:text-2xl text-[#f4efe5] font-medium">
                Shopify Online Store 2.0 Theme Hub
              </h2>
              <p className="text-xs text-[#a9bbc5]">
                Aurelia Noir &bull; Complete Production-Ready Theme Package & Architecture
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsThemeModalOpen(false)}
            className="p-2 text-[#a9bbc5] hover:text-white rounded-lg hover:bg-[#0d3047] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#164d68]/60 bg-[#06131c]/30 px-6">
          <button
            onClick={() => setActiveTab('download')}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'download'
                ? 'border-[#e6be62] text-[#e6be62]'
                : 'border-transparent text-[#a9bbc5] hover:text-[#f4efe5]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download & Upload Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'editor'
                ? 'border-[#e6be62] text-[#e6be62]'
                : 'border-transparent text-[#a9bbc5] hover:text-[#f4efe5]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Live Theme Editor Simulation</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'code'
                ? 'border-[#e6be62] text-[#e6be62]'
                : 'border-transparent text-[#a9bbc5] hover:text-[#f4efe5]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Liquid & Schema Inspector</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-left">
          
          {/* TAB 1: Download & Upload Guide */}
          {activeTab === 'download' && (
            <div className="space-y-8 max-w-4xl">
              
              {/* Primary Download Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0d3047] via-[#092335] to-[#06131c] border border-[#e6be62]/50 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-lg">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06131c]/60 text-[11px] uppercase tracking-wider text-[#e6be62] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Certified Shopify Online Store 2.0 Package</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe5]">
                    aurelia-noir-shopify-theme.zip
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a9bbc5] leading-relaxed">
                    Complete, uncompressed ready-to-upload ZIP file containing all Liquid templates, schemas, snippets, stylesheets, and campaign assets.
                  </p>
                </div>

                <a
                  href="/aurelia-noir-shopify-theme.zip"
                  download="aurelia-noir-shopify-theme.zip"
                  onClick={() => showToast('Downloading Aurelia Noir Shopify Theme ZIP...')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-bold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_24px_rgba(230,190,98,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-3 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Theme (.ZIP)</span>
                </a>
              </div>

              {/* Step-by-step Installation Instructions */}
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-[#f4efe5] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#e6be62]" />
                  <span>How to Install in Shopify Admin (4 Quick Steps)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#06131c] border border-[#164d68]/60 space-y-2">
                    <span className="text-xs font-bold text-[#e6be62]">STEP 01</span>
                    <h5 className="font-serif text-base text-[#f4efe5]">Download the Theme ZIP</h5>
                    <p className="text-xs text-[#a9bbc5] leading-relaxed">
                      Click the gold button above to save <code className="text-[#e6be62]">aurelia-noir-shopify-theme.zip</code> onto your computer.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#06131c] border border-[#164d68]/60 space-y-2">
                    <span className="text-xs font-bold text-[#e6be62]">STEP 02</span>
                    <h5 className="font-serif text-base text-[#f4efe5]">Navigate to Themes</h5>
                    <p className="text-xs text-[#a9bbc5] leading-relaxed">
                      In your Shopify Admin dashboard, open <strong>Online Store</strong> &rarr; <strong>Themes</strong>.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#06131c] border border-[#164d68]/60 space-y-2">
                    <span className="text-xs font-bold text-[#e6be62]">STEP 03</span>
                    <h5 className="font-serif text-base text-[#f4efe5]">Upload ZIP File</h5>
                    <p className="text-xs text-[#a9bbc5] leading-relaxed">
                      Under <em>Theme Library</em>, click <strong>Add Theme</strong> &rarr; <strong>Upload zip file</strong>, and select the downloaded archive.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#06131c] border border-[#164d68]/60 space-y-2">
                    <span className="text-xs font-bold text-[#e6be62]">STEP 04</span>
                    <h5 className="font-serif text-base text-[#f4efe5]">Customize & Publish</h5>
                    <p className="text-xs text-[#a9bbc5] leading-relaxed">
                      Click <strong>Customize</strong> to edit colors, text, and products in Shopify Theme Editor, then click <strong>Publish</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Theme File Tree Overview */}
              <div className="p-6 rounded-2xl bg-[#06131c] border border-[#164d68]/50 space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#e6be62] font-semibold">
                  <FolderTree className="w-4 h-4" />
                  <span>Full Included Architecture in ZIP Archive</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#a9bbc5]">
                  <div>
                    <span className="text-[#f4efe5] block font-bold">/layout</span>
                    <span>• theme.liquid</span>
                  </div>
                  <div>
                    <span className="text-[#f4efe5] block font-bold">/sections</span>
                    <span>• hero.liquid</span>
                    <span className="block">• featured-products.liquid</span>
                    <span className="block">• brand-story.liquid</span>
                    <span className="block">• announcement-bar.liquid</span>
                    <span className="block">• header.liquid</span>
                    <span className="block">• footer.liquid</span>
                  </div>
                  <div>
                    <span className="text-[#f4efe5] block font-bold">/templates</span>
                    <span>• index.json</span>
                    <span className="block">• product.json</span>
                    <span className="block">• collection.json</span>
                    <span className="block">• cart.json</span>
                    <span className="block">• page.about.json</span>
                  </div>
                  <div>
                    <span className="text-[#f4efe5] block font-bold">/config & /assets</span>
                    <span>• settings_schema.json</span>
                    <span className="block">• settings_data.json</span>
                    <span className="block">• theme.css & theme.js</span>
                    <span className="block">• All Campaign JPEGs</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Live Theme Editor Simulation */}
          {activeTab === 'editor' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between border-b border-[#164d68]/40 pb-4">
                <div>
                  <h4 className="font-serif text-xl text-[#f4efe5]">Shopify Theme Customizer Simulator</h4>
                  <p className="text-xs text-[#a9bbc5]">Changes here update the live preview instantly without page reload.</p>
                </div>
                <button
                  onClick={resetThemeSettings}
                  className="px-3 py-1.5 rounded-lg bg-[#06131c] hover:bg-[#0d3047] text-xs text-[#e6be62] border border-[#164d68] flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <div className="space-y-6 divide-y divide-[#164d68]/40">
                
                {/* Announcement Bar Settings */}
                <div className="pt-4 space-y-3">
                  <h5 className="text-xs uppercase tracking-wider text-[#e6be62] font-semibold">Announcement Bar Settings</h5>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="sim-show-announcement"
                      checked={themeSettings.showAnnouncement}
                      onChange={e => updateThemeSetting('showAnnouncement', e.target.checked)}
                      className="w-4 h-4 accent-[#e6be62]"
                    />
                    <label htmlFor="sim-show-announcement" className="text-sm text-[#f4efe5] cursor-pointer">
                      Enable Announcement Bar Above Header
                    </label>
                  </div>
                  {themeSettings.showAnnouncement && (
                    <div>
                      <label className="text-xs text-[#a9bbc5] block mb-1">Announcement Message</label>
                      <input
                        type="text"
                        value={themeSettings.announcementText}
                        onChange={e => updateThemeSetting('announcementText', e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#06131c] border border-[#164d68] rounded-xl text-xs text-[#e8edf0]"
                      />
                    </div>
                  )}
                </div>

                {/* Hero Section Settings */}
                <div className="pt-4 space-y-4">
                  <h5 className="text-xs uppercase tracking-wider text-[#e6be62] font-semibold">Hero Campaign Settings</h5>
                  <div>
                    <label className="text-xs text-[#a9bbc5] block mb-1">Hero Main Editorial Headline</label>
                    <input
                      type="text"
                      value={themeSettings.heroHeadline}
                      onChange={e => updateThemeSetting('heroHeadline', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#06131c] border border-[#164d68] rounded-xl text-xs text-[#e8edf0]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#a9bbc5] block mb-1">Hero Highlighted Word/Phrase (Gold Italic)</label>
                    <input
                      type="text"
                      value={themeSettings.heroHighlight}
                      onChange={e => updateThemeSetting('heroHighlight', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#06131c] border border-[#164d68] rounded-xl text-xs text-[#e8edf0]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#a9bbc5] block mb-1">Hero Supporting Subtext</label>
                    <textarea
                      rows={2}
                      value={themeSettings.heroSubtext}
                      onChange={e => updateThemeSetting('heroSubtext', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#06131c] border border-[#164d68] rounded-xl text-xs text-[#e8edf0]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#a9bbc5] block mb-1">Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={themeSettings.primaryButtonText}
                      onChange={e => updateThemeSetting('primaryButtonText', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#06131c] border border-[#164d68] rounded-xl text-xs text-[#e8edf0]"
                    />
                  </div>
                </div>

                {/* Product Card Settings */}
                <div className="pt-4 space-y-4">
                  <h5 className="text-xs uppercase tracking-wider text-[#e6be62] font-semibold">Product Card Options</h5>
                  <div>
                    <label className="text-xs text-[#a9bbc5] block mb-1">Corner Radius Style</label>
                    <div className="flex gap-3">
                      {(['small', 'medium', 'large'] as const).map(radius => (
                        <button
                          key={radius}
                          onClick={() => updateThemeSetting('cardRadius', radius)}
                          className={`py-2 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                            themeSettings.cardRadius === radius
                              ? 'bg-[#e6be62] text-[#06131c]'
                              : 'bg-[#06131c] text-[#a9bbc5] border border-[#164d68]'
                          }`}
                        >
                          {radius}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="sim-show-quickview"
                        checked={themeSettings.showQuickView}
                        onChange={e => updateThemeSetting('showQuickView', e.target.checked)}
                        className="w-4 h-4 accent-[#e6be62]"
                      />
                      <label htmlFor="sim-show-quickview" className="text-xs text-[#f4efe5] cursor-pointer">
                        Enable Quick View Action
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="sim-show-ratings"
                        checked={themeSettings.showRatings}
                        onChange={e => updateThemeSetting('showRatings', e.target.checked)}
                        className="w-4 h-4 accent-[#e6be62]"
                      />
                      <label htmlFor="sim-show-ratings" className="text-xs text-[#f4efe5] cursor-pointer">
                        Show Star Ratings
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Liquid & Schema Inspector */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#164d68]/40 pb-4">
                {/* File picker pills */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CODE_SNIPPETS).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedSnippetKey(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                        selectedSnippetKey === key
                          ? 'bg-[#e6be62] text-[#06131c] font-bold'
                          : 'bg-[#06131c] text-[#a9bbc5] hover:text-white border border-[#164d68]'
                      }`}
                    >
                      {item.filename}
                    </button>
                  ))}
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-1.5 rounded-lg bg-[#0d3047] hover:bg-[#164d68] text-xs text-[#e6be62] border border-[#e6be62]/40 flex items-center gap-2 transition-colors font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Code display */}
              <div className="rounded-2xl overflow-hidden bg-[#040d13] border border-[#164d68] p-4 text-xs font-mono text-[#a9bbc5] max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre text-left leading-relaxed text-[#f4efe5]/90">
                  {CODE_SNIPPETS[selectedSnippetKey]?.code}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#164d68]/60 bg-[#06131c]/60 flex items-center justify-between text-xs text-[#a9bbc5]">
          <span>Theme Version 1.0.0 &bull; Shopify Online Store 2.0 Compliant</span>
          <a
            href="/aurelia-noir-shopify-theme.zip"
            download="aurelia-noir-shopify-theme.zip"
            className="text-[#e6be62] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Direct ZIP Download</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
