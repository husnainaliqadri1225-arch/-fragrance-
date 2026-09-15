import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Sparkles, CheckCircle2, Clock, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Private Scent Consultation',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your inquiry has been submitted to the Maison Concierge.');
  };

  return (
    <div id="contact-page" className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-12 text-left">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#092335] border border-[#e6be62]/40 text-xs uppercase tracking-[0.2em] text-[#e6be62] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison Concierge Services</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#f4efe5] font-normal tracking-tight">
            Private Consultation & Inquiries
          </h1>

          <p className="text-sm sm:text-base text-[#a9bbc5] font-light leading-relaxed">
            Whether arranging a private tasting at our Parisian salon, inquiring about bespoke bridal formulations, or tracking a precious consignment, our concierge team attends to every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#092335]/70 border border-[#164d68]/60 shadow-xl space-y-6">
            <h3 className="font-serif text-2xl text-[#f4efe5]">Dispatch an Inquiry</h3>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#0d3047]/80 border border-[#e6be62]/50 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#e6be62] mx-auto" />
                <h4 className="font-serif text-2xl text-[#f4efe5]">Inquiry Received</h4>
                <p className="text-sm text-[#a9bbc5] max-w-md mx-auto">
                  A personal concierge has been assigned to your message and will reply within four business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#06131c] text-[#e6be62] text-xs font-semibold uppercase tracking-wider hover:bg-[#0d3047] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#a9bbc5] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lady Vivienne Montgomery"
                      className="w-full px-4 py-3 bg-[#06131c] border border-[#164d68] rounded-xl text-sm text-[#e8edf0] focus:outline-none focus:border-[#e6be62]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#a9bbc5] block mb-1">
                      Confidential Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. vivienne@domain.com"
                      className="w-full px-4 py-3 bg-[#06131c] border border-[#164d68] rounded-xl text-sm text-[#e8edf0] focus:outline-none focus:border-[#e6be62]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a9bbc5] block mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#06131c] border border-[#164d68] rounded-xl text-sm text-[#e8edf0] focus:outline-none focus:border-[#e6be62]"
                  >
                    <option value="Private Scent Consultation">Private Scent Consultation (Paris or London)</option>
                    <option value="Custom Bespoke Extrait Commission">Custom Bespoke Extrait Commission</option>
                    <option value="Private Event & Bridal Gifting">Private Event & Bridal Gifting</option>
                    <option value="Order & Delivery Tracking">Order & Delivery Tracking</option>
                    <option value="Press & Haute Parfumerie Curation">Press & Haute Parfumerie Curation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a9bbc5] block mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your desired olfactory profile, appointment preferences, or specific inquiries..."
                    className="w-full px-4 py-3 bg-[#06131c] border border-[#164d68] rounded-xl text-sm text-[#e8edf0] focus:outline-none focus:border-[#e6be62]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#e6be62] hover:bg-[#edd085] text-[#06131c] font-semibold text-xs uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Flagship Salons */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Paris Salon */}
            <div className="p-6 rounded-2xl bg-[#092335]/60 border border-[#164d68]/50 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#e6be62] font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Paris Flagship Salon</span>
              </div>
              <h4 className="font-serif text-xl text-[#f4efe5]">18 Place Vendôme</h4>
              <p className="text-xs text-[#a9bbc5] leading-relaxed">
                75001 Paris, France
              </p>
              <div className="flex items-center gap-2 text-xs text-[#a9bbc5] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#e6be62]" />
                <span>Monday – Saturday: 10:30 – 19:30 CET</span>
              </div>
            </div>

            {/* London Salon */}
            <div className="p-6 rounded-2xl bg-[#092335]/60 border border-[#164d68]/50 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#e6be62] font-semibold">
                <MapPin className="w-4 h-4" />
                <span>London Mayfair Salon</span>
              </div>
              <h4 className="font-serif text-xl text-[#f4efe5]">34 Mount Street</h4>
              <p className="text-xs text-[#a9bbc5] leading-relaxed">
                Mayfair, London W1K 2RB, United Kingdom
              </p>
              <div className="flex items-center gap-2 text-xs text-[#a9bbc5] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#e6be62]" />
                <span>Monday – Saturday: 10:00 – 19:00 GMT</span>
              </div>
            </div>

            {/* Direct Lines */}
            <div className="p-6 rounded-2xl bg-[#06131c] border border-[#164d68]/40 space-y-2 text-xs text-[#a9bbc5]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#e6be62]" />
                <span>concierge@aurelianoir.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e6be62]" />
                <span>+33 (0)1 42 68 90 20 (Paris Concierge Desk)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
