import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ActivePage, ThemeCustomizerSettings } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  openProductPage: (product: Product) => void;
  
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;

  themeSettings: ThemeCustomizerSettings;
  updateThemeSetting: <K extends keyof ThemeCustomizerSettings>(key: K, value: ThemeCustomizerSettings[K]) => void;
  resetThemeSettings: () => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_THEME_SETTINGS: ThemeCustomizerSettings = {
  showAnnouncement: true,
  announcementText: 'Complimentary Worldwide Shipping & Two Bespoke Samples with Every Order',
  announcementBg: '#092335',
  heroHeadline: 'THE ALCHEMY OF CELESTIAL SCENT',
  heroHighlight: 'CELESTIAL SCENT',
  heroSubtext: 'Bespoke extraits and nocturnal elixirs hand-distilled in the high plateaus of Grasse. Formulated for presence, longevity, and poetic distinction.',
  primaryButtonText: 'Explore the Collection',
  accentGoldColor: '#e6be62',
  cardRadius: 'large',
  showQuickView: true,
  showRatings: true,
  stickyHeader: true,
  containerWidth: 'standard'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  
  // Initial cart with signature sample
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: '100ml',
      quantity: 1,
      price: PRODUCTS[0].price
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [themeSettings, setThemeSettings] = useState<ThemeCustomizerSettings>(DEFAULT_THEME_SETTINGS);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const openProductPage = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size?: string, qty: number = 1) => {
    const chosenSize = size || product.sizes[1]?.size || product.sizes[0].size;
    const priceObj = product.sizes.find(s => s.size === chosenSize);
    const itemPrice = priceObj ? priceObj.price : product.price;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === chosenSize);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      }
      return [...prev, { product, selectedSize: chosenSize, quantity: qty, price: itemPrice }];
    });

    showToast(`Added ${product.title} (${chosenSize}) to your cart.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateThemeSetting = <K extends keyof ThemeCustomizerSettings>(key: K, value: ThemeCustomizerSettings[K]) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetThemeSettings = () => setThemeSettings(DEFAULT_THEME_SETTINGS);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        openProductPage,
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isThemeModalOpen,
        setIsThemeModalOpen,
        themeSettings,
        updateThemeSetting,
        resetThemeSettings,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
