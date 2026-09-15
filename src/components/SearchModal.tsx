import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, JOURNAL_ARTICLES } from '../data/products';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductPage, setActivePage } = useStore();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.family.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.topNotes.some(n => n.toLowerCase().includes(q)) ||
      p.heartNotes.some(n => n.toLowerCase().includes(q)) ||
      p.baseNotes.some(n => n.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return JOURNAL_ARTICLES.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 bg-[#06131c]/90 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-[#092335] border border-[#164d68] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-5 border-b border-[#164d68]/60 flex items-center gap-3 bg-[#06131c]/60">
          <Search className="w-5 h-5 text-[#e6be62] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search extraits, notes (e.g., Oud, Rose, Ambergris), or journal..."
            className="w-full bg-transparent text-[#f4efe5] text-base placeholder-[#a9bbc5]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#a9bbc5] hover:text-[#f4efe5] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#a9bbc5] hover:text-white rounded-lg transition-colors ml-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-wider text-[#e6be62] font-semibold block">
                Popular Olfactory Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Nuit Céleste', 'Oud & Ambergris', 'Midnight Jasmine', 'Smoky Leather', 'Woody Amber', 'Extraction Method'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-[#06131c] hover:bg-[#0d3047] text-[#a9bbc5] hover:text-[#f4efe5] border border-[#164d68] text-xs transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Product Matches */}
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-[#e6be62] font-semibold block">
                  Fragrances ({filteredProducts.length})
                </span>

                {filteredProducts.length === 0 ? (
                  <p className="text-xs text-[#a9bbc5]">No extraits matching "{query}".</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredProducts.map(product => (
                      <div
                        key={product.id}
                        onClick={() => {
                          openProductPage(product);
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl bg-[#06131c] hover:bg-[#0d3047] border border-[#164d68]/60 hover:border-[#e6be62]/50 flex items-center gap-3 cursor-pointer transition-all"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          className="w-14 h-16 object-cover rounded-lg bg-[#092335]"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-[#e6be62] block">
                            {product.family}
                          </span>
                          <h4 className="font-serif text-base text-[#f4efe5] truncate">
                            {product.title}
                          </h4>
                          <span className="text-xs text-[#e6be62] font-semibold">
                            ${product.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Journal Matches */}
              {filteredArticles.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#164d68]/40">
                  <span className="text-[11px] uppercase tracking-wider text-[#e6be62] font-semibold block">
                    Gazette Articles ({filteredArticles.length})
                  </span>
                  <div className="space-y-2">
                    {filteredArticles.map(article => (
                      <div
                        key={article.id}
                        onClick={() => {
                          setActivePage('journal');
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl bg-[#06131c] hover:bg-[#0d3047] border border-[#164d68]/50 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="text-[10px] uppercase text-[#e6be62]">{article.category}</span>
                          <h5 className="font-serif text-sm text-[#f4efe5]">{article.title}</h5>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#a9bbc5]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#164d68]/50 bg-[#06131c]/80 text-center text-xs text-[#a9bbc5]">
          Press ESC to dismiss &bull; Type to filter all compositions
        </div>

      </div>
    </div>
  );
};
