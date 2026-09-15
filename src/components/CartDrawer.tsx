import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Gift, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    setActivePage,
    showToast
  } = useStore();

  const [giftNote, setGiftNote] = useState(false);
  const [noteText, setNoteText] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    showToast('Redirecting to secure Shopify checkout with SSL encryption...');
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setActivePage('shop');
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Dark backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#06131c]/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#092335] border-l border-[#164d68] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#164d68]/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#e6be62]" />
              <h2 id="cart-drawer-title" className="font-serif text-xl text-[#f4efe5] font-medium tracking-wide">
                Your Shopping Bag
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#0d3047] text-[#e6be62] font-semibold">
                {cartCount}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#a9bbc5] hover:text-[#f4efe5] transition-colors rounded-lg hover:bg-[#0d3047]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Discovery Bar */}
          <div className="bg-[#0d3047]/60 px-6 py-2.5 border-b border-[#164d68]/40 flex items-center gap-2 text-xs text-[#f4efe5]">
            <Sparkles className="w-4 h-4 text-[#e6be62] shrink-0" />
            <span>Complimentary courier delivery & 2 private extrait vials unlocked.</span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#164d68]/40 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#164d68] mx-auto" />
                <h3 className="font-serif text-xl text-[#f4efe5]">Your bag is presently empty</h3>
                <p className="text-xs text-[#a9bbc5] max-w-xs mx-auto">
                  Explore our collection of nocturnal extraits to discover your signature aura.
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="mt-2 px-6 py-3 rounded-full bg-[#e6be62] text-[#06131c] text-xs font-semibold uppercase tracking-wider hover:bg-[#edd085] transition-colors"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className={`${idx !== 0 ? 'pt-4' : ''} flex gap-4 text-left`}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-18 h-22 object-cover rounded-lg bg-[#06131c] border border-[#164d68]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-[#f4efe5] font-medium">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-[#a9bbc5] hover:text-rose-400 transition-colors p-1"
                          aria-label={`Remove ${item.product.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-[#e6be62] font-medium block">
                        {item.product.subtitle}
                      </span>
                      <span className="text-[11px] text-[#a9bbc5] block">
                        Size: {item.selectedSize}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Qty Controls */}
                      <div className="flex items-center border border-[#164d68] rounded-md bg-[#06131c] px-2 py-0.5 text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="text-[#a9bbc5] hover:text-white px-1.5"
                        >
                          -
                        </button>
                        <span className="px-2 text-[#f4efe5]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="text-[#a9bbc5] hover:text-white px-1.5"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm text-[#e6be62] font-semibold">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#164d68]/60 bg-[#06131c]/50 space-y-4 text-left">
              
              {/* Gift Wrap Toggle */}
              <div className="text-xs">
                <button
                  onClick={() => setGiftNote(!giftNote)}
                  className="flex items-center gap-1.5 text-[#e6be62] hover:text-white transition-colors font-medium"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>{giftNote ? 'Remove Gift Note' : 'Add Complimentary Gift Message & Ribbon'}</span>
                </button>
                {giftNote && (
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="Inscribe your personal message for the hand-written wax card..."
                    className="w-full mt-2 p-2.5 bg-[#06131c] border border-[#164d68] rounded-lg text-xs text-[#e8edf0] placeholder-[#a9bbc5]/60 focus:outline-none focus:border-[#e6be62]"
                    rows={2}
                  />
                )}
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 border-t border-[#164d68]/40 pt-3">
                <div className="flex justify-between text-xs text-[#a9bbc5]">
                  <span>Subtotal</span>
                  <span className="font-serif text-sm text-[#f4efe5]">${cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-[#a9bbc5]">
                  <span>Global Insured Delivery</span>
                  <span className="text-[#e6be62] uppercase tracking-wider font-semibold text-[11px]">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif text-[#f4efe5] pt-1">
                  <span>Total</span>
                  <span className="text-[#e6be62] font-semibold">${cartSubtotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_20px_rgba(230,190,98,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#a9bbc5]/80">
                <ShieldCheck className="w-3 h-3 text-[#e6be62]" />
                <span>Shopify Certified 256-Bit SSL Checkout • Paris Dispatch</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
