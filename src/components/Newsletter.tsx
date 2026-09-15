import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Welcome to the Aurelia Circle. A welcome privilege has been sent to your inbox.');
  };

  return (
    <section id="newsletter-section" className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#092335] to-[#06131c] border border-[#164d68]/60 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        
        {/* Subtle ambient light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e6be62]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06131c]/60 border border-[#e6be62]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#e6be62]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#e6be62] font-semibold">
              The Aurelia Circle
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe5] font-normal tracking-tight">
            Reserve Your Place in the Atelier Guild
          </h2>

          <p className="text-sm sm:text-base text-[#a9bbc5] font-light leading-relaxed">
            Subscribers receive private allocation notices for limited seasonal distillations, invitations to Parisian salon tastings, and a complimentary discovery vial with their inaugural acquisition.
          </p>

          {subscribed ? (
            <div className="p-6 rounded-2xl bg-[#0d3047]/60 border border-[#e6be62]/40 flex items-center justify-center gap-3 text-[#f4efe5] animate-in fade-in duration-300">
              <CheckCircle2 className="w-6 h-6 text-[#e6be62]" />
              <div className="text-left">
                <h4 className="font-serif text-lg font-medium text-[#e6be62]">You Have Been Enrolled</h4>
                <p className="text-xs text-[#a9bbc5]">Check your inbox for your private concierge code.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
              <div className="relative w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a9bbc5]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your confidential email..."
                  className="w-full pl-11 pr-4 py-3.5 bg-[#06131c] border border-[#164d68] rounded-full text-sm text-[#e8edf0] placeholder-[#a9bbc5]/60 focus:outline-none focus:border-[#e6be62] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.14em] transition-all shrink-0 flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#06131c]" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#a9bbc5]/70">
            We honor your privacy. Unsubscribe at any moment. Never shared with third parties.
          </p>

        </div>

      </div>
    </section>
  );
};
