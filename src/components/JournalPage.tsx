import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/products';
import { JournalArticle } from '../types';
import { Sparkles, Clock, Calendar, ArrowLeft, BookOpen } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const JournalPage: React.FC = () => {
  const { setActivePage } = useStore();
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div id="journal-page" className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto space-y-12 text-left">
        
        {/* Header Intro */}
        {!selectedArticle && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#092335] border border-[#e6be62]/40 text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Gazette de Parfumerie</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl text-[#f4efe5] font-normal tracking-tight">
              The Olfactory Journal
            </h1>

            <p className="text-sm sm:text-base text-[#a9bbc5] font-light leading-relaxed max-w-2xl">
              Chronicles from our terroir explorations in Grasse, essays on rare distillations, and conversations with the artisans of modern luxury perfumery.
            </p>
          </div>
        )}

        {/* Reader View when article selected */}
        {selectedArticle ? (
          <article className="space-y-8 animate-in fade-in duration-300">
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#e6be62] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to All Gazette Articles</span>
            </button>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#e6be62] font-semibold">
                {selectedArticle.category}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe5] font-normal leading-[1.15]">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-[#a9bbc5]">
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#164d68] aspect-[16/9] max-h-[480px]">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none space-y-6 text-[#e8edf0] font-light text-base leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="text-[#e8edf0]/90">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-8 border-t border-[#164d68]/50 flex justify-between items-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-3 rounded-full bg-[#0d3047] text-[#e6be62] text-xs uppercase tracking-wider font-semibold hover:bg-[#164d68] transition-colors"
              >
                Back to Gazette
              </button>
              <button
                onClick={() => setActivePage('shop')}
                className="px-6 py-3 rounded-full bg-[#e6be62] text-[#06131c] text-xs uppercase tracking-wider font-semibold hover:bg-[#edd085] transition-colors"
              >
                Explore Scent Library
              </button>
            </div>
          </article>
        ) : (
          /* Article Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JOURNAL_ARTICLES.map(article => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group rounded-2xl bg-[#092335]/70 hover:bg-[#0d3047] border border-[#164d68]/50 hover:border-[#e6be62]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#06131c]">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#e6be62] font-semibold">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-xl text-[#f4efe5] group-hover:text-[#e6be62] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#a9bbc5] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#164d68]/40 flex items-center justify-between text-[11px] text-[#a9bbc5]">
                    <span>{article.date}</span>
                    <span className="text-[#e6be62] font-medium group-hover:underline">Read Article →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
