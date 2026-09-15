import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Award, Compass, HeartHandshake } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <section id="brand-story-section" className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#092335]/50 border border-[#164d68]/50 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Visual Atelier Presentation */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#164d68] shadow-2xl bg-[#06131c]">
              <img
                src="/theme-assets/brand-story.jpg"
                alt="Aurelia Noir Perfumery Atelier in Grasse"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[500px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06131c]/80 via-transparent to-transparent" />
              
              {/* Overlay Stat Capsule */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#06131c]/85 backdrop-blur-md border border-[#e6be62]/30 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#e6be62] font-semibold block">
                    Heritage Extraction
                  </span>
                  <p className="font-serif text-[#f4efe5] text-sm">
                    Slow Cold-Maceration in French Glass Demijohns
                  </p>
                </div>
                <div className="text-right pl-3 border-l border-[#164d68]">
                  <span className="font-serif text-xl text-[#e6be62] font-bold">18</span>
                  <span className="block text-[9px] uppercase tracking-wider text-[#a9bbc5]">Months Matured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Storytelling */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e6be62] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Parfumerie Pedigree</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe5] font-normal tracking-tight leading-[1.15]">
              Where Ancient Alchemy Meets Modern Distinction
            </h2>

            <p className="text-base text-[#a9bbc5] font-light leading-relaxed">
              Founded in the alpine hinterlands behind Grasse, Aurelia Noir was conceived as a sanctuary against mass-market homogeneity. We approach fragrance not as a consumer commodity, but as an invisible architecture—a personal aura composed of raw botanical resins, nocturnal flower distillates, and smoked woods.
            </p>

            <p className="text-sm text-[#a9bbc5] font-light leading-relaxed">
              Every formulation is macerated in small batches and aged without synthetic chill-filtration. This guarantees that each drop of extrait retains its living lipids and complex molecular facets, delivering unparalleled longevity and sillage.
            </p>

            {/* Atelier Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 w-full">
              <div className="p-4 rounded-xl bg-[#06131c]/60 border border-[#164d68]/40 flex items-start gap-3">
                <Award className="w-5 h-5 text-[#e6be62] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-[#f4efe5] text-sm font-medium">Single-Origin Terroirs</h4>
                  <p className="text-xs text-[#a9bbc5] mt-0.5">Ethically harvested directly from family distilleries.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#06131c]/60 border border-[#164d68]/40 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#e6be62] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-[#f4efe5] text-sm font-medium">Zero Synthetic Fillers</h4>
                  <p className="text-xs text-[#a9bbc5] mt-0.5">Pure organic grain spirit base, uncompromised.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('about')}
              className="mt-2 px-8 py-3.5 rounded-full bg-[#0d3047] hover:bg-[#164d68] text-[#e6be62] border border-[#e6be62]/50 hover:border-[#e6be62] text-xs font-semibold uppercase tracking-[0.15em] transition-all flex items-center gap-2 group"
            >
              <span>Explore The Atelier Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
