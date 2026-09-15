import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const Hero: React.FC = () => {
  const { themeSettings, setActivePage, openProductPage } = useStore();

  const handleExplore = () => {
    setActivePage('shop');
  };

  const handleDiscoverSignature = () => {
    // Open flagship Nuit Céleste
    openProductPage(PRODUCTS[0]);
  };

  // Splitting headline for highlighted styling if specified
  const headline = themeSettings.heroHeadline;
  const highlight = themeSettings.heroHighlight;

  return (
    <section id="hero-section" className="relative w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {/* Outer Curved Container */}
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#092335] via-[#0d3047] to-[#06131c] border border-[#164d68]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        
        {/* Atmospheric ambient lighting & radial glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#216681]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#e6be62]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Subtle geometric curved decorative lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 600 C 300 400, 700 700, 1300 200" stroke="#e6be62" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="850" cy="300" r="280" stroke="#216681" strokeWidth="1" />
            <circle cx="850" cy="300" r="320" stroke="#164d68" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14 p-6 sm:p-10 lg:p-14">
          
          {/* Left Editorial Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06131c]/60 border border-[#e6be62]/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#e6be62]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#f4efe5] font-medium">
                Maison Aurelia Noir • Collection Nocturne
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f4efe5] font-normal leading-[1.08] tracking-tight">
              {headline.includes(highlight) ? (
                <>
                  {headline.split(highlight)[0]}
                  <span className="italic text-[#e6be62] font-serif font-light drop-shadow-[0_2px_12px_rgba(230,190,98,0.25)]">
                    {highlight}
                  </span>
                  {headline.split(highlight)[1]}
                </>
              ) : (
                headline
              )}
            </h1>

            {/* Subtitle & Story note */}
            <p className="text-base sm:text-lg text-[#a9bbc5] max-w-xl leading-relaxed font-light">
              {themeSettings.heroSubtext}
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-primary-cta"
                onClick={handleExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-sm uppercase tracking-[0.14em] transition-all duration-300 shadow-[0_4px_24px_rgba(230,190,98,0.3)] hover:shadow-[0_6px_32px_rgba(230,190,98,0.45)] hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                <span>{themeSettings.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 text-[#06131c] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={handleDiscoverSignature}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent hover:bg-[#164d68]/30 text-[#f4efe5] hover:text-[#e6be62] font-medium text-sm uppercase tracking-[0.14em] border border-[#f4efe5]/30 hover:border-[#e6be62] transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <Compass className="w-4 h-4 text-[#e6be62]" />
                <span>Find Your Signature Scent</span>
              </button>
            </div>

            {/* Trust micro-badges */}
            <div className="pt-4 border-t border-[#164d68]/40 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#a9bbc5]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e6be62]" />
                <span>32% Pure Parfum Extrait</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e6be62]" />
                <span>Harvested in Grasse</span>
              </div>
              <div className="flex items-center gap-2 hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e6be62]" />
                <span>Complimentary Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Cinematic Perfume Campaign Showcase - Larger Flacon Showcase */}
          <div className="lg:col-span-6 relative flex justify-center items-center w-full">
            
            {/* Ambient halo background for bottle */}
            <div className="absolute inset-0 bg-radial from-[#216681]/45 via-transparent to-transparent rounded-full blur-3xl transform scale-125" />

            <div className="relative group w-full max-w-xl rounded-3xl overflow-hidden border border-[#164d68]/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#06131c]">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] min-h-[440px] sm:min-h-[540px] lg:min-h-[600px] w-full overflow-hidden">
                <img
                  src="/theme-assets/hero-campaign.jpg"
                  alt="Aurelia Noir Flagship Campaign Bottle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Glassmorphic floating caption card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-[#06131c]/85 backdrop-blur-md border border-[#e6be62]/30 text-left flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#e6be62] font-semibold block">
                    Flagship Extrait
                  </span>
                  <h3 className="font-serif text-[#f4efe5] text-xl font-medium">
                    Nuit Céleste
                  </h3>
                  <p className="text-xs text-[#a9bbc5]">
                    Smoked Oud • Bergamot • Ambergris
                  </p>
                </div>
                <button
                  onClick={handleDiscoverSignature}
                  className="px-4 py-2 rounded-xl bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] text-xs font-semibold tracking-wider uppercase transition-colors shadow-md"
                >
                  View Scent
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
