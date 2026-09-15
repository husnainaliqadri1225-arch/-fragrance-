import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Star, ShoppingBag, ShieldCheck, Sparkles, ChevronDown, ChevronUp, ArrowLeft, Package, Clock, Eye, Wind } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, addToCart, openProductPage, setActivePage } = useStore();
  const product = selectedProduct || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<string>('100ml');
  const [qty, setQty] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'story' | 'notes' | 'shipping'>('story');

  const currentSizeObj = product.sizes.find(s => s.size === selectedSize) || product.sizes[0];
  const price = currentSizeObj ? currentSizeObj.price : product.price;

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, qty);
  };

  return (
    <div id="product-detail-page" className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Breadcrumbs / Back button */}
        <div className="flex items-center gap-2 text-xs text-[#a9bbc5] text-left">
          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-1.5 hover:text-[#e6be62] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>The Collection</span>
          </button>
          <span>/</span>
          <span className="text-[#e6be62]">{product.family}</span>
          <span>/</span>
          <span className="text-[#f4efe5]">{product.title}</span>
        </div>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Product Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-[#06131c] border border-[#164d68]/60 shadow-2xl aspect-[4/5] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-[#06131c]/80 backdrop-blur-md border border-[#e6be62]/50 text-xs uppercase tracking-wider text-[#e6be62] font-semibold">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Secondary atmospheric gallery thumbnails */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden bg-[#06131c] border border-[#164d68]/40 aspect-[4/3]">
                <img
                  src={product.secondaryImage || '/theme-assets/editorial-campaign.jpg'}
                  alt="Atmospheric fragrance campaign"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#06131c]/20" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider text-[#f4efe5] bg-[#06131c]/80 px-2 py-1 rounded">
                  Atmospheric Still
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#06131c] border border-[#164d68]/40 aspect-[4/3]">
                <img
                  src="/theme-assets/brand-story.jpg"
                  alt="Atelier extraction"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#06131c]/20" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider text-[#f4efe5] bg-[#06131c]/80 px-2 py-1 rounded">
                  Grasse Distillation
                </span>
              </div>
            </div>
          </div>

          {/* Right: Purchasing & Olfactory Formulation Details */}
          <div className="lg:col-span-5 flex flex-col text-left space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-[#e6be62] font-semibold">
                  {product.family}
                </span>
                <div className="flex items-center gap-1.5 text-[#e6be62] text-xs">
                  <Star className="w-4 h-4 fill-[#e6be62]" />
                  <span className="text-[#f4efe5] font-semibold">{product.rating}</span>
                  <span className="text-[#a9bbc5]">({product.reviewCount} patron reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe5] font-normal tracking-tight">
                {product.title}
              </h1>

              <p className="text-sm text-[#e6be62] font-serif">
                {product.subtitle} — {product.concentration}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl text-[#f4efe5] font-medium">
                ${price}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#a9bbc5] line-through">
                  ${product.compareAtPrice}
                </span>
              )}
              <span className="text-xs text-[#a9bbc5]">
                (Tax included • Complimentary Global Delivery)
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#a9bbc5] font-light leading-relaxed">
              {product.story}
            </p>

            {/* Sillage & Intensity Specs */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#092335]/60 border border-[#164d68]/50 text-xs">
              <div className="flex items-center gap-2 text-[#a9bbc5]">
                <Clock className="w-4 h-4 text-[#e6be62]" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#e6be62]">Longevity</span>
                  <span className="text-[#f4efe5] font-medium">{product.longevity}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#a9bbc5]">
                <Wind className="w-4 h-4 text-[#e6be62]" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#e6be62]">Sillage</span>
                  <span className="text-[#f4efe5] font-medium">{product.sillage}</span>
                </div>
              </div>
            </div>

            {/* Olfactory Notes Breakdown */}
            <div className="p-5 rounded-2xl bg-[#06131c] border border-[#164d68] space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Olfactory Architecture</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="pb-2 border-b border-[#164d68]/40">
                  <span className="text-[10px] uppercase tracking-wider text-[#a9bbc5] block">Top Notes (First 30 Mins):</span>
                  <p className="text-[#f4efe5] font-medium mt-0.5">{product.topNotes.join(' • ')}</p>
                </div>

                <div className="pb-2 border-b border-[#164d68]/40">
                  <span className="text-[10px] uppercase tracking-wider text-[#a9bbc5] block">Heart Notes (Hours 1 - 5):</span>
                  <p className="text-[#f4efe5] font-medium mt-0.5">{product.heartNotes.join(' • ')}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a9bbc5] block">Base Notes (Hours 6 - 16+):</span>
                  <p className="text-[#f4efe5] font-medium mt-0.5">{product.baseNotes.join(' • ')}</p>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="uppercase tracking-wider text-[#a9bbc5] font-medium">Select Flacon Volume:</span>
                <span className="text-[#e6be62]">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map(s => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all text-center ${
                      selectedSize === s.size
                        ? 'bg-[#e6be62] text-[#06131c] shadow-lg'
                        : 'bg-[#092335] text-[#a9bbc5] hover:text-[#f4efe5] border border-[#164d68]'
                    }`}
                  >
                    <span className="block">{s.size}</span>
                    <span className="text-[11px] opacity-80">${s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center border border-[#164d68] rounded-full bg-[#06131c] px-4 py-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-[#a9bbc5] hover:text-[#f4efe5] text-base font-bold px-1"
                >
                  -
                </button>
                <span className="text-sm font-semibold text-[#f4efe5] px-4 min-w-[28px] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="text-[#a9bbc5] hover:text-[#f4efe5] text-base font-bold px-1"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-8 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_24px_rgba(230,190,98,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag • ${(price * qty)}</span>
              </button>
            </div>

            {/* Atelier Perks list */}
            <div className="pt-4 border-t border-[#164d68]/40 space-y-2 text-xs text-[#a9bbc5]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#e6be62]" />
                <span>Certificate of Authenticity hand-numbered by the master formulator.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#e6be62]" />
                <span>Includes two matching 2ml extrait samples for skin testing prior to opening.</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Fragrances Section */}
        <div className="pt-12 border-t border-[#164d68]/40 space-y-8 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe5]">
              Complementary Compositions
            </h3>
            <button
              onClick={() => setActivePage('shop')}
              className="text-xs uppercase tracking-wider text-[#e6be62] hover:text-white transition-colors"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => openProductPage(rel)}
                className="group p-4 rounded-2xl bg-[#092335]/60 hover:bg-[#0d3047] border border-[#164d68]/50 hover:border-[#e6be62]/50 transition-all duration-300 cursor-pointer flex gap-4 items-center"
              >
                <img
                  src={rel.image}
                  alt={rel.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover rounded-xl bg-[#06131c]"
                />
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#e6be62] font-semibold">
                    {rel.family}
                  </span>
                  <h4 className="font-serif text-lg text-[#f4efe5] group-hover:text-[#e6be62] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#a9bbc5] line-clamp-1">{rel.description}</p>
                  <span className="font-serif text-sm text-[#e6be62] font-semibold block pt-1">
                    ${rel.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
