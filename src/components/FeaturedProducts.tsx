import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const {
    openProductPage,
    setQuickViewProduct,
    addToCart,
    themeSettings
  } = useStore();

  const [selectedFamily, setSelectedFamily] = useState<string>('All');

  const families = [
    'All',
    'Woody Amber',
    'Oriental Woody',
    'Floral Musk',
    'Smoky Leather',
    'Fresh Woody'
  ];

  const filteredProducts = selectedFamily === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.family === selectedFamily);

  const radiusClasses = {
    small: 'rounded-lg',
    medium: 'rounded-xl',
    large: 'rounded-2xl'
  }[themeSettings.cardRadius] || 'rounded-2xl';

  return (
    <section id="featured-products-section" className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#164d68]/40 pb-8">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e6be62] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Parfumerie Catalog</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe5] font-normal tracking-tight">
              Discover the House Collection
            </h2>
            <p className="text-sm sm:text-base text-[#a9bbc5] font-light leading-relaxed">
              Formulated in Grasse and aged in small glass demijohns. Each composition explores rare natural absolutes and atmospheric accords.
            </p>
          </div>

          {/* Scent Family Filters */}
          <div className="flex flex-wrap gap-2">
            {families.map(family => (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 ${
                  selectedFamily === family
                    ? 'bg-[#e6be62] text-[#06131c] font-semibold shadow-md'
                    : 'bg-[#092335] text-[#a9bbc5] hover:text-[#f4efe5] hover:bg-[#0d3047] border border-[#164d68]/60'
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className={`group relative bg-[#092335]/70 hover:bg-[#0d3047]/90 border border-[#164d68]/50 hover:border-[#e6be62]/50 transition-all duration-400 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] ${radiusClasses}`}
            >
              {/* Card Image Area */}
              <div 
                className="relative aspect-[3/4] overflow-hidden bg-[#06131c] cursor-pointer"
                onClick={() => openProductPage(product)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Badge if available */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#06131c]/80 backdrop-blur-md border border-[#e6be62]/40 text-[10px] font-semibold uppercase tracking-wider text-[#e6be62]">
                    {product.badge}
                  </div>
                )}

                {/* Compare price indicator */}
                {product.compareAtPrice && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#e6be62] text-[#06131c] text-[10px] font-bold uppercase tracking-wider">
                    Privilege
                  </div>
                )}

                {/* Floating Quick Action Buttons on Hover */}
                <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {themeSettings.showQuickView && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-[#06131c]/85 hover:bg-[#06131c] backdrop-blur-md text-[#f4efe5] hover:text-[#e6be62] border border-[#164d68] text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 transition-colors"
                      title="Quick View Scent Profile"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="p-2.5 rounded-lg bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] shadow-md transition-colors"
                    title="Add to Shopping Bag"
                    aria-label={`Add ${product.title} to bag`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Details Area */}
              <div className="p-5 flex flex-col flex-1 justify-between text-left space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#e6be62] font-semibold">
                      {product.family}
                    </span>
                    {themeSettings.showRatings && (
                      <div className="flex items-center gap-1 text-[#e6be62] text-xs">
                        <Star className="w-3 h-3 fill-[#e6be62]" />
                        <span className="text-[#f4efe5] font-medium">{product.rating}</span>
                      </div>
                    )}
                  </div>

                  <h3 
                    onClick={() => openProductPage(product)}
                    className="font-serif text-xl text-[#f4efe5] font-medium tracking-wide group-hover:text-[#e6be62] transition-colors cursor-pointer"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-[#a9bbc5] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Olfactory Notes */}
                <div className="pt-2 border-t border-[#164d68]/40">
                  <span className="text-[10px] uppercase tracking-wider text-[#a9bbc5]/80 block mb-1">
                    Key Notes:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {product.topNotes.slice(0, 2).concat(product.heartNotes.slice(0, 1)).map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#06131c]/50 text-[#e8edf0] border border-[#164d68]/30"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Add CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-lg text-[#e6be62] font-semibold">
                      ${product.price}
                    </span>
                    {product.compareAtPrice && (
                      <span className="ml-2 text-xs text-[#a9bbc5] line-through">
                        ${product.compareAtPrice}
                      </span>
                    )}
                    <span className="block text-[10px] text-[#a9bbc5]">
                      100ml Extrait
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-3 py-1.5 rounded-full bg-[#0d3047] hover:bg-[#e6be62] text-[#e6be62] hover:text-[#06131c] border border-[#e6be62]/40 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                  >
                    Add to Bag
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
