import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, openProductPage } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('100ml');
  const [qty, setQty] = useState<number>(1);

  if (!quickViewProduct) return null;

  const currentSizeObj = quickViewProduct.sizes.find(s => s.size === selectedSize) || quickViewProduct.sizes[0];
  const currentPrice = currentSizeObj ? currentSizeObj.price : quickViewProduct.price;

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, qty);
    setQuickViewProduct(null);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 bg-[#06131c]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-[#092335] border border-[#164d68] rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#06131c]/80 hover:bg-[#06131c] text-[#a9bbc5] hover:text-[#f4efe5] border border-[#164d68] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left: Product Image */}
          <div className="md:col-span-6 bg-[#06131c] relative flex items-center justify-center p-8 overflow-hidden">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[440px] object-cover rounded-xl shadow-2xl"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#06131c]/90 border border-[#e6be62]/50 text-[#e6be62] text-xs font-semibold uppercase tracking-wider">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Right: Product Details & Purchase Controls */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">
                  {quickViewProduct.family}
                </span>
                <div className="flex items-center gap-1 text-[#e6be62] text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#e6be62]" />
                  <span className="text-[#f4efe5] font-medium">{quickViewProduct.rating}</span>
                  <span className="text-[#a9bbc5]">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              <h2 id="quickview-title" className="font-serif text-3xl text-[#f4efe5] font-normal">
                {quickViewProduct.title}
              </h2>
              
              <div className="text-sm text-[#e6be62] font-serif">
                {quickViewProduct.subtitle}
              </div>

              <div className="font-serif text-2xl text-[#f4efe5] font-semibold">
                ${currentPrice}
              </div>

              <p className="text-xs sm:text-sm text-[#a9bbc5] leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Olfactory Pyramid */}
              <div className="pt-2 border-t border-[#164d68]/40 space-y-2">
                <h4 className="text-[11px] uppercase tracking-wider text-[#e6be62] font-semibold">
                  Olfactory Pyramid
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex gap-2">
                    <span className="text-[#a9bbc5] min-w-[50px]">Top:</span>
                    <span className="text-[#e8edf0]">{quickViewProduct.topNotes.join(', ')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#a9bbc5] min-w-[50px]">Heart:</span>
                    <span className="text-[#e8edf0]">{quickViewProduct.heartNotes.join(', ')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#a9bbc5] min-w-[50px]">Base:</span>
                    <span className="text-[#e8edf0]">{quickViewProduct.baseNotes.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Volume Selection */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#a9bbc5] block mb-2 font-medium">
                  Flacon Volume
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {quickViewProduct.sizes.map(s => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                        selectedSize === s.size
                          ? 'bg-[#e6be62] text-[#06131c] shadow'
                          : 'bg-[#06131c] text-[#a9bbc5] hover:text-[#f4efe5] border border-[#164d68]'
                      }`}
                    >
                      {s.size} • ${s.price}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#164d68]/50 space-y-3">
              <div className="flex items-center gap-3">
                {/* Qty Selector */}
                <div className="flex items-center border border-[#164d68] rounded-xl bg-[#06131c] px-3 py-2">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="text-[#a9bbc5] hover:text-[#f4efe5] px-2 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium text-[#f4efe5] px-3 min-w-[24px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="text-[#a9bbc5] hover:text-[#f4efe5] px-2 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${(currentPrice * qty)}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  openProductPage(quickViewProduct);
                }}
                className="w-full py-2 text-xs text-[#e6be62] hover:text-white flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Full Fragrance Story & Atelier Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
