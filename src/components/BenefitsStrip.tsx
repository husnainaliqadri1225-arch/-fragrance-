import React from 'react';
import { PackageOpen, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export const BenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: PackageOpen,
      title: 'Complimentary Delivery',
      description: 'Climate-controlled courier shipment worldwide with insured tracking.'
    },
    {
      icon: Sparkles,
      title: 'High-Concentration Extraits',
      description: 'Distilled at 22% to 34% perfume concentration for exceptional sillage.'
    },
    {
      icon: Feather,
      title: 'Artisanal Gift Presentation',
      description: 'Presented in hand-crafted midnight boxes sealed with gold wax crest.'
    },
    {
      icon: ShieldCheck,
      title: 'Curated Discovery Vials',
      description: 'Two complimentary 2ml extrait samples included with every flacon.'
    }
  ];

  return (
    <section id="benefits-strip" className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto rounded-2xl bg-[#092335]/60 border border-[#164d68]/40 p-6 sm:p-8 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#164d68]/30">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx} 
                className={`flex items-start gap-4 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
              >
                <div className="p-2.5 rounded-xl bg-[#0d3047] border border-[#e6be62]/30 text-[#e6be62] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-[#f4efe5] text-base font-medium tracking-wide">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#a9bbc5] mt-1 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
