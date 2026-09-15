import React from 'react';
import { useStore } from '../context/StoreContext';
import { ActivePage } from '../types';

export const Footer: React.FC = () => {
  const { setActivePage } = useStore();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-[#06131c] border-t border-[#164d68]/40 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl tracking-[0.2em] text-[#f4efe5] font-light uppercase">
                Aurelia Noir
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#e6be62] font-semibold -mt-0.5">
                Haute Parfumerie • Paris
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#a9bbc5] max-w-sm leading-relaxed font-light">
              Crafting architectural extraits of nocturnal distinction. Hand-distilled in small batches in Grasse using rare natural absolutes, cold-macerated resins, and ethically preserved botanical traditions.
            </p>
          </div>

          {/* Fragrances Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">
              The Fragrances
            </h4>
            <ul className="space-y-2 text-xs text-[#a9bbc5]">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#f4efe5] transition-colors">
                  All Extraits de Parfum
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#f4efe5] transition-colors">
                  Woody & Smoked Ouds
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#f4efe5] transition-colors">
                  Nocturnal Florals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#f4efe5] transition-colors">
                  Warm Solar Ambers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#f4efe5] transition-colors">
                  Discovery Coffrets
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier & Story */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">
              Maison
            </h4>
            <ul className="space-y-2 text-xs text-[#a9bbc5]">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#f4efe5] transition-colors">
                  The Grasse Atelier
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('journal')} className="hover:text-[#f4efe5] transition-colors">
                  Editorial Gazette & Journal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#f4efe5] transition-colors">
                  Cold-Maceration Craft
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#f4efe5] transition-colors">
                  Private Salon Appointments
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Boutiques */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#a9bbc5]">
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#f4efe5] transition-colors">
                  Private Consultation
                </button>
              </li>
              <li>
                <span className="block text-[#f4efe5]/80">Paris Flagship:</span>
                <span className="text-[11px]">18 Place Vendôme, 75001 Paris</span>
              </li>
              <li>
                <span className="block text-[#f4efe5]/80">London Salon:</span>
                <span className="text-[11px]">34 Mount Street, Mayfair, London</span>
              </li>
              <li>
                <span className="text-[11px]">concierge@aurelianoir.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#164d68]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a9bbc5]/80">
          <p>© {new Date().getFullYear()} Aurelia Noir Haute Parfumerie. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#f4efe5] cursor-pointer">Confidentiality</span>
            <span className="hover:text-[#f4efe5] cursor-pointer">Terms of Privileges</span>
            <span className="hover:text-[#f4efe5] cursor-pointer">Authenticity Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
