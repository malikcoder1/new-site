

export type PortfolioCategory = 'Team Uniforms' | 'Sublimation' | 'Gym & Training' | 'Martial Arts' | 'Other';

export type View =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'mockup' }
  | { name: 'contact' }
  | { name: 'resources' }
  | { name: 'admin' }
  | { name: 'category', category: PortfolioCategory };

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  imageUrl: string;
  hoverImageUrl: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  summary?: string; // Optional summary for card views
}

export interface ManagedImage {
  id: string;
  prompt: string;
  url: string;
  createdAt: string;
}