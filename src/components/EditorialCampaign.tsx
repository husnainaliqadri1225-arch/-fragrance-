import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';

export const EditorialCampaign: React.FC = () => {
  const { openProductPage, addToCart } = useStore();

  const flagshipProduct = PRODUCTS[0]; // Nuit Céleste

  return (
    <section id="editorial-campaign-section" className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden border border-[#164d68]/80 shadow-2xl bg-[#06131c]">
        
        {/* Background Image with Deep Gradient */}
        <div className="relative h-[550px] sm:h-[600px] w-full overflow-hidden">
          <img
            src="/theme-assets/editorial-campaign.jpg"
            alt="Nuit Céleste Campaign Advertisement"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06131c] via-[#06131c]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06131c] via-transparent to-black/30" />

          {/* Editorial Content Placement */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 sm:p-14 lg:p-20 max-w-2xl text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06131c]/70 border border-[#e6be62]/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#e6be62]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#e6be62] font-semibold">
                Haute Parfumerie Campaign
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f4efe5] font-normal tracking-tight leading-[1.08]">
              The Solstice <span className="italic text-[#e6be62]">Extraction</span>
            </h2>

            <p className="text-base sm:text-lg text-[#e8edf0]/90 font-light leading-relaxed">
              Distilled only once each calendar cycle during the winter solstice. A narcotic marriage of aged Cambodian agarwood smoke, crisp high-altitude bergamot, and floating ambergris.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => addToCart(flagshipProduct)}
                className="px-8 py-4 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_24px_rgba(230,190,98,0.3)] hover:-translate-y-0.5 flex items-center gap-2.5"
              >
                <ShoppingBag className="w-4 h-4 text-[#06131c]" />
                <span>Acquire Allocation • $285</span>
              </button>

              <button
                onClick={() => openProductPage(flagshipProduct)}
                className="px-7 py-4 rounded-full bg-[#06131c]/70 hover:bg-[#092335] text-[#f4efe5] hover:text-[#e6be62] border border-[#164d68] hover:border-[#e6be62] text-xs font-medium uppercase tracking-[0.16em] transition-all backdrop-blur-sm flex items-center gap-2"
              >
                <span>Discover Olfactory Notes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Editorial citation */}
            <div className="pt-4 text-xs text-[#a9bbc5] italic font-serif">
              "An otherworldly elixir that lingers on the memory long after the room empties." — Le Journal des Parfums
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
