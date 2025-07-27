
import { BlogPost, ManagedImage, PortfolioItem } from '../types.ts';

const POSTS_KEY = 'ansons_blog_posts';
const IMAGES_KEY = 'ansons_media_library';
const PORTFOLIO_KEY = 'ansons_portfolio_items';

const initialPortfolioItems: PortfolioItem[] = [
    { id: '1', category: 'Team Uniforms', title: 'Dragons RFC Soccer Kit', imageUrl: 'https://picsum.photos/seed/soccer1/500/700', hoverImageUrl: 'https://picsum.photos/seed/soccer2/500/700'},
    { id: '2', category: 'Sublimation', title: 'Vortex Cycling Jersey', imageUrl: 'https://picsum.photos/seed/cycling1/500/700', hoverImageUrl: 'https://picsum.photos/seed/cycling2/500/700'},
    { id: '3', category: 'Martial Arts', title: 'Kobra Kai Karate Gi', imageUrl: 'https://picsum.photos/seed/karate1/500/700', hoverImageUrl: 'https://picsum.photos/seed/karate2/500/700'},
    { id: '4', category: 'Gym & Training', title: 'Iron Gym Compression Set', imageUrl: 'https://picsum.photos/seed/gym1/500/700', hoverImageUrl: 'https://picsum.photos/seed/gym2/500/700'},
    { id: '5', category: 'Team Uniforms', title: 'Eagles Basketball Uniform', imageUrl: 'https://picsum.photos/seed/bball1/500/700', hoverImageUrl: 'https://picsum.photos/seed/bball2/500/700'},
    { id: '6', category: 'Sublimation', title: 'Cheer Elite All-Over Print', imageUrl: 'https://picsum.photos/seed/cheer1/500/700', hoverImageUrl: 'https://picsum.photos/seed/cheer2/500/700'},
];


// == BLOG POSTS ==

export const getPosts = (): BlogPost[] => {
    try {
        const postsJson = localStorage.getItem(POSTS_KEY);
        if (!postsJson) return [];
        const posts = JSON.parse(postsJson) as BlogPost[];
        // Sort by most recent first
        return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
        console.error("Failed to parse blog posts from localStorage", error);
        return [];
    }
};

export const savePost = (post: BlogPost): void => {
    const posts = getPosts();
    const updatedPosts = [post, ...posts];
    localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
};


// == IMAGES ==

export const getImages = (): ManagedImage[] => {
    try {
        const imagesJson = localStorage.getItem(IMAGES_KEY);
        if (!imagesJson) return [];
        const images = JSON.parse(imagesJson) as ManagedImage[];
        return images.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
        console.error("Failed to parse images from localStorage", error);
        return [];
    }
};

export const saveImage = (image: { prompt: string; url: string }): void => {
    const images = getImages();
    const newImage: ManagedImage = {
        id: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        ...image
    };
    const updatedImages = [newImage, ...images];
    localStorage.setItem(IMAGES_KEY, JSON.stringify(updatedImages));
};


// == PORTFOLIO ITEMS ==

export const getPortfolioItems = (): PortfolioItem[] => {
    try {
        const itemsJson = localStorage.getItem(PORTFOLIO_KEY);
        if (!itemsJson) {
            // Seed with initial data if nothing is in local storage
            localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(initialPortfolioItems));
            return initialPortfolioItems;
        }
        const items = JSON.parse(itemsJson) as PortfolioItem[];
        return items.sort((a, b) => (b.id > a.id ? 1 : -1)); // Simple sort, can be by date if added
    } catch (error) {
        console.error("Failed to parse portfolio items from localStorage", error);
        return [];
    }
};

export const savePortfolioItem = (item: PortfolioItem): void => {
    const items = getPortfolioItems();
    const updatedItems = [item, ...items];
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updatedItems));
};