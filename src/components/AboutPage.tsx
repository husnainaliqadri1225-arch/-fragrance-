import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Award, Compass, Feather, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div id="about-page" className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto space-y-16 text-left">
        
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#092335] border border-[#e6be62]/40 text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison Pedigree & History</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f4efe5] font-normal tracking-tight leading-[1.1]">
            The Architecture of Invisible Presence
          </h1>

          <p className="text-base sm:text-lg text-[#a9bbc5] font-light leading-relaxed max-w-3xl">
            Established on the sun-drenched terraced plateaus above Grasse, Maison Aurelia Noir was founded on a singular conviction: that true luxury fragrance must transcend decorative scent and become an intimate, living presence.
          </p>
        </div>

        {/* Large Editorial Atelier Visual */}
        <div className="rounded-3xl overflow-hidden border border-[#164d68] shadow-2xl bg-[#06131c]">
          <img
            src="/theme-assets/brand-story.jpg"
            alt="The Grasse Atelier Maceration Room"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[550px] object-cover"
          />
          <div className="p-6 bg-[#092335]/90 border-t border-[#164d68]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg text-[#f4efe5]">The Grasse Atelier Maceration Room</h4>
              <p className="text-xs text-[#a9bbc5]">Where hand-distilled absolutes mature in sealed glass demijohns under strict darkness.</p>
            </div>
            <span className="text-xs text-[#e6be62] font-semibold uppercase tracking-wider">
              18-Month Maturation Cycle
            </span>
          </div>
        </div>

        {/* Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className="p-6 rounded-2xl bg-[#092335]/60 border border-[#164d68]/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d3047] text-[#e6be62] flex items-center justify-center border border-[#e6be62]/30">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#f4efe5]">Uncompromised Concentration</h3>
            <p className="text-xs text-[#a9bbc5] leading-relaxed">
              Every creation is formulated between 22% and 34% pure perfume concentration. We never dilute our extraits with commercial drying agents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#092335]/60 border border-[#164d68]/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d3047] text-[#e6be62] flex items-center justify-center border border-[#e6be62]/30">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#f4efe5]">Single-Terroir Botanical Integrity</h3>
            <p className="text-xs text-[#a9bbc5] leading-relaxed">
              From our Mysore sandalwood to nocturnal jasmine hand-plucked before dawn, every botanical ingredient is traceable to its native microclimate.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#092335]/60 border border-[#164d68]/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d3047] text-[#e6be62] flex items-center justify-center border border-[#e6be62]/30">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#f4efe5]">Bespoke Glass Flacons</h3>
            <p className="text-xs text-[#a9bbc5] leading-relaxed">
              Our flacons are molded from thick, optical-grade crystal glass and finished with solid brushed champagne gold caps crafted by French goldsmiths.
            </p>
          </div>
        </div>

        {/* Narrative & Quote */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#092335]/40 border border-[#164d68]/40 space-y-6">
          <blockquote className="font-serif text-xl sm:text-2xl text-[#f4efe5] italic leading-relaxed border-l-2 border-[#e6be62] pl-6">
            "We do not build fragrances for passing fashion seasons. We compose timeless atmospheric memories that anchor themselves to the soul of the wearer."
          </blockquote>
          <div className="pl-6 text-xs text-[#e6be62] tracking-wider uppercase font-semibold">
            — Antoine de Valéry, Master Perfumer & Founder
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="pt-6 text-center">
          <button
            onClick={() => setActivePage('shop')}
            className="px-8 py-4 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.16em] transition-all inline-flex items-center gap-2 shadow-lg"
          >
            <span>Experience the House Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
