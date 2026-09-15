import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BenefitsStrip } from './components/BenefitsStrip';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CollectionGrid } from './components/CollectionGrid';
import { BrandStory } from './components/BrandStory';
import { EditorialCampaign } from './components/EditorialCampaign';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AboutPage } from './components/AboutPage';
import { JournalPage } from './components/JournalPage';
import { ContactPage } from './components/ContactPage';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePage, toastMessage } = useStore();

  // Scroll to top whenever activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[#06131c] text-[#e8edf0] flex flex-col selection:bg-[#e6be62] selection:text-[#06131c]">
      
      {/* Sticky Top Announcements & Header */}
      <AnnouncementBar />
      <Header />

      {/* Main Content Router */}
      <main className="flex-1 flex flex-col">
        {activePage === 'home' && (
          <>
            <Hero />
            <BenefitsStrip />
            <FeaturedProducts />
            <CollectionGrid />
            <BrandStory />
            <EditorialCampaign />
            <Testimonials />
            <Newsletter />
          </>
        )}

        {activePage === 'shop' && (
          <>
            <ShopPage />
            <Newsletter />
          </>
        )}

        {activePage === 'product' && (
          <>
            <ProductDetailPage />
            <Newsletter />
          </>
        )}

        {activePage === 'about' && (
          <>
            <AboutPage />
            <Newsletter />
          </>
        )}

        {activePage === 'journal' && (
          <>
            <JournalPage />
            <Newsletter />
          </>
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals and Slide-Over Panels */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />

      {/* Feedback Toast Notification */}
      {toastMessage && (
        <aside 
          aria-live="polite"
          aria-atomic="true"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#092335] text-[#f4efe5] border border-[#e6be62]/60 shadow-2xl text-xs font-medium backdrop-blur-lg">
            <CheckCircle2 className="w-4 h-4 text-[#e6be62]" />
            <span>{toastMessage}</span>
          </div>
        </aside>
      )}

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
