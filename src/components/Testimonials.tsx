import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials-section" className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#e6be62] font-semibold block">
            Patron Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe5] font-normal tracking-tight">
            Words from Private Collectors
          </h2>
          <p className="text-sm sm:text-base text-[#a9bbc5] font-light">
            Read perspectives from fragrance connoisseurs across Paris, London, and New York who wear Aurelia Noir as their daily signature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map(testimonial => (
            <div
              key={testimonial.id}
              className="p-6 rounded-2xl bg-[#092335]/60 hover:bg-[#0d3047]/80 border border-[#164d68]/50 hover:border-[#e6be62]/40 transition-all duration-300 flex flex-col justify-between text-left space-y-5 shadow-lg"
            >
              <div className="space-y-4">
                {/* Gold Stars */}
                <div className="flex items-center gap-1 text-[#e6be62]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#e6be62]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#e8edf0] leading-relaxed font-light italic">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#164d68]/40 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-[#f4efe5] text-sm font-semibold tracking-wide">
                    {testimonial.author}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#e6be62] font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Patron</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#a9bbc5]">
                  <span>{testimonial.location}</span>
                </div>

                <div className="text-[11px] text-[#e6be62] font-serif pt-1">
                  {testimonial.fragrance}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
