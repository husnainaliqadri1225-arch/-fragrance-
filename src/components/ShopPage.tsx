import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Star, Eye, ShoppingBag, SlidersHorizontal, ArrowLeft } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { openProductPage, setQuickViewProduct, addToCart, setActivePage } = useStore();

  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(350);

  const families = [
    'All',
    'Woody Amber',
    'Oriental Woody',
    'Floral Musk',
    'Smoky Leather',
    'Fresh Woody',
    'Warm Amber',
    'Aromatic Fresh'
  ];

  // Filtering
  let filtered = PRODUCTS.filter(p => {
    const matchesFamily = selectedFamily === 'All' || p.family === selectedFamily;
    const matchesPrice = p.price <= maxPrice;
    return matchesFamily && matchesPrice;
  });

  // Sorting
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div id="shop-page" className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Intro */}
        <div className="text-left space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-[#a9bbc5]">
            <button onClick={() => setActivePage('home')} className="hover:text-[#e6be62] transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-[#f4efe5]">Catalog of Extraits</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#f4efe5] font-normal tracking-tight">
            The Complete House Collection
          </h1>

          <p className="text-sm sm:text-base text-[#a9bbc5] font-light leading-relaxed">
            Distilled from rare botanical absolutes, sustainably harvested wild resins, and aged heartwoods. Every flacon is hand-sealed with the Maison’s signature gold crest.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="p-5 rounded-2xl bg-[#092335]/70 border border-[#164d68]/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Scent Family Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#a9bbc5] mr-1 hidden sm:inline">
              Family:
            </span>
            {families.map(fam => (
              <button
                key={fam}
                onClick={() => setSelectedFamily(fam)}
                className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
                  selectedFamily === fam
                    ? 'bg-[#e6be62] text-[#06131c] font-semibold shadow'
                    : 'bg-[#06131c] text-[#a9bbc5] hover:text-[#f4efe5] border border-[#164d68]'
                }`}
              >
                {fam}
              </button>
            ))}
          </div>

          {/* Right Sort & Price range */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 text-xs text-[#a9bbc5]">
              <span>Max Price:</span>
              <span className="text-[#e6be62] font-semibold">${maxPrice}</span>
              <input
                type="range"
                min="240"
                max="350"
                step="5"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#e6be62]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#a9bbc5]">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#06131c] text-[#f4efe5] border border-[#164d68] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#e6be62]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Patron Rating</option>
              </select>
            </div>
          </div>

        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-[#a9bbc5] border-b border-[#164d68]/40 pb-3">
          <span>Showing {filtered.length} extraordinary extraits</span>
          <span>Complimentary sample vials included with all acquisitions</span>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map(product => (
            <div
              key={product.id}
              className="group relative bg-[#092335]/70 hover:bg-[#0d3047] border border-[#164d68]/50 hover:border-[#e6be62]/50 transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg"
            >
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

                {product.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#06131c]/80 backdrop-blur-md border border-[#e6be62]/40 text-[10px] font-semibold uppercase tracking-wider text-[#e6be62]">
                    {product.badge}
                  </div>
                )}

                <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#06131c]/85 text-[#f4efe5] hover:text-[#e6be62] border border-[#164d68] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="p-2 rounded-lg bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] shadow-md transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between text-left space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] uppercase tracking-wider text-[#e6be62] font-semibold">
                      {product.family}
                    </span>
                    <div className="flex items-center gap-1 text-[#e6be62]">
                      <Star className="w-3 h-3 fill-[#e6be62]" />
                      <span className="text-[#f4efe5] font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => openProductPage(product)}
                    className="font-serif text-xl text-[#f4efe5] font-medium mt-1 cursor-pointer hover:text-[#e6be62] transition-colors"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-[#a9bbc5] line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#164d68]/40 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-lg text-[#e6be62] font-semibold">
                      ${product.price}
                    </span>
                    <span className="block text-[10px] text-[#a9bbc5]">
                      100ml Extrait
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-3.5 py-1.5 rounded-full bg-[#0d3047] hover:bg-[#e6be62] text-[#e6be62] hover:text-[#06131c] border border-[#e6be62]/40 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Add to Bag
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
