import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { ActivePage } from '../types';
import { PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    openProductPage
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Collections', page: 'collections' },
    { label: 'Atelier', page: 'about' },
    { label: 'Journal', page: 'journal' },
    { label: 'Concierge', page: 'contact' },
  ];

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const filteredSearchResults = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.topNotes.concat(p.heartNotes, p.baseNotes).some(n => n.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <>
      <header
        id="main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 py-3 px-4 sm:px-6 lg:px-8 ${
          isScrolled
            ? 'bg-[#06131c]/90 backdrop-blur-md shadow-2xl border-b border-[#164d68]/40 py-2.5'
            : 'bg-[#06131c]/60 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNav('home')}
            className="flex flex-col items-start text-left group"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#f4efe5] font-light uppercase transition-colors group-hover:text-[#e6be62]">
              Aurelia Noir
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#e6be62] font-medium -mt-0.5">
              Haute Parfumerie • Paris
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-${link.page}`}
                  onClick={() => handleNav(link.page)}
                  className={`text-sm tracking-[0.14em] uppercase transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#e6be62] font-medium'
                      : 'text-[#e8edf0] hover:text-[#e6be62]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#e6be62] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full text-[#e8edf0] hover:text-[#e6be62] hover:bg-[#0d3047]/60 transition-colors"
              aria-label="Search Fragrances"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#092335] hover:bg-[#0d3047] border border-[#164d68] transition-all duration-200 text-[#e8edf0] group"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#e6be62] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#f4efe5] min-w-[14px] text-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e8edf0] hover:text-[#e6be62] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#164d68]/40 bg-[#06131c]/95 backdrop-blur-lg px-4 py-6 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`text-left text-base tracking-[0.15em] uppercase py-2 border-b border-[#0d3047] flex items-center justify-between ${
                    activePage === link.page
                      ? 'text-[#e6be62] font-semibold'
                      : 'text-[#e8edf0]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Overlay */}
      {isSearchOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
          className="fixed inset-0 z-50 bg-[#06131c]/90 backdrop-blur-md flex flex-col items-center pt-24 px-4 sm:px-6 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-2xl bg-[#092335] border border-[#164d68] rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#164d68]/50">
              <h3 id="search-modal-title" className="font-serif text-xl text-[#f4efe5] tracking-wide">
                Search Haute Fragrances
              </h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-[#a9bbc5] hover:text-[#f4efe5] transition-colors p-1"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#e6be62]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, scent family (e.g., Woody, Amber), or note (e.g., Oud, Rose, Iris)..."
                autoFocus
                className="w-full pl-12 pr-4 py-3.5 bg-[#06131c] border border-[#164d68] rounded-xl text-[#e8edf0] placeholder-[#a9bbc5]/60 focus:outline-none focus:border-[#e6be62] transition-colors text-sm"
              />
            </div>

            {/* Results Preview */}
            <div className="mt-4 max-h-80 overflow-y-auto divide-y divide-[#164d68]/40">
              {searchQuery.trim() && filteredSearchResults.length === 0 && (
                <p className="text-center py-8 text-[#a9bbc5] text-sm">
                  No rare essences found matching "{searchQuery}".
                </p>
              )}

              {filteredSearchResults.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    openProductPage(product);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-4 py-3 px-2 hover:bg-[#0d3047]/50 rounded-lg cursor-pointer transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 object-cover rounded bg-[#06131c]"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-[#f4efe5] text-base font-semibold">
                      {product.title}
                    </h4>
                    <p className="text-xs text-[#e6be62] font-medium">{product.family}</p>
                    <p className="text-xs text-[#a9bbc5] line-clamp-1">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-[#e6be62] font-semibold">${product.price}</span>
                    <span className="block text-[10px] text-[#a9bbc5]">{product.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
