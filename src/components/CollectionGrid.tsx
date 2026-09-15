import React from 'react';
import { useStore } from '../context/StoreContext';
import { COLLECTIONS } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

export const CollectionGrid: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <section id="collection-grid-section" className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#e6be62] font-medium block">
            Olfactory Universes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe5] font-normal tracking-tight">
            Curated Scent Collections
          </h2>
          <p className="text-sm sm:text-base text-[#a9bbc5] font-light">
            Each collection explores an atmospheric theme, orchestrating raw resins, night florals, and smoky heartwoods into an unforgettable signature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map(collection => (
            <div
              key={collection.id}
              onClick={() => setActivePage('shop')}
              className="group relative h-[380px] rounded-2xl overflow-hidden cursor-pointer border border-[#164d68]/60 shadow-lg hover:border-[#e6be62]/60 transition-all duration-300 flex flex-col justify-end p-6"
            >
              {/* Background Image with Zoom */}
              <img
                src={collection.image}
                alt={collection.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Multi-tier dark gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06131c] via-[#06131c]/70 to-transparent" />
              <div className="absolute inset-0 bg-[#092335]/30 group-hover:bg-transparent transition-colors duration-300" />

              {/* Card Content */}
              <div className="relative z-10 space-y-2 text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#e6be62] font-semibold block">
                  {collection.mood}
                </span>
                
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#f4efe5] group-hover:text-[#e6be62] transition-colors">
                    {collection.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-[#0d3047]/80 group-hover:bg-[#e6be62] text-[#e6be62] group-hover:text-[#06131c] flex items-center justify-center transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-[#a9bbc5] line-clamp-2 leading-relaxed">
                  {collection.description}
                </p>

                <div className="pt-2 text-[11px] text-[#f4efe5]/80 font-medium">
                  {collection.productCount} Formulations
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
