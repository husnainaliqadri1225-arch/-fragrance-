export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  family: 'Woody Amber' | 'Oriental Woody' | 'Floral Musk' | 'Exotic Floral' | 'Fresh Woody' | 'Smoky Leather' | 'Warm Amber' | 'Aromatic Fresh';
  description: string;
  story: string;
  image: string;
  secondaryImage?: string;
  badge?: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  concentration: string;
  sizes: { size: string; price: number }[];
  inStock: boolean;
  intensity: number; // 1 to 5
  longevity: string;
  sillage: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
  price: number;
}

export interface CollectionItem {
  id: string;
  title: string;
  handle: string;
  subtitle: string;
  description: string;
  image: string;
  productCount: number;
  mood: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  handle: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  fragrance: string;
  rating: number;
  date: string;
}

export type ActivePage = 'home' | 'shop' | 'collections' | 'product' | 'about' | 'journal' | 'contact' | 'cart';

export interface ThemeCustomizerSettings {
  showAnnouncement: boolean;
  announcementText: string;
  announcementBg: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtext: string;
  primaryButtonText: string;
  accentGoldColor: string;
  cardRadius: 'small' | 'medium' | 'large';
  showQuickView: boolean;
  showRatings: boolean;
  stickyHeader: boolean;
  containerWidth: 'standard' | 'wide';
}
