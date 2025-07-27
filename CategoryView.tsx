
import React, { useState, useEffect } from 'react';
import { View, PortfolioItem, PortfolioCategory } from '../../types.ts';
import { getPortfolioItems } from '../../services/contentService.ts';
import { ArrowLeft } from 'react-feather';

interface CategoryViewProps {
  category: PortfolioCategory;
  navigateTo: (view: View) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, navigateTo }) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const allItems = getPortfolioItems();
    setItems(allItems.filter(item => item.category === category));
  }, [category]);

  return (
    <div className="bg-white text-brand-dark py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center reveal">
          <button
            onClick={() => navigateTo({ name: 'home' })}
            className="text-gray-500 hover:text-brand-red font-semibold inline-flex items-center mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </button>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase">{category}</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our custom-made gear for {category}.
          </p>
        </div>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div key={item.id} className="group relative block overflow-hidden rounded-lg shadow-lg cursor-pointer reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                <img src={item.imageUrl} alt={item.title} className="w-full h-[450px] object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                <img src={item.hoverImageUrl} alt={`${item.title} back view`} className="w-full h-[450px] object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 p-6 flex flex-col justify-end">
                    <h3 className="mt-2 font-heading text-2xl text-white font-bold">{item.title}</h3>
                    {item.description && <p className="text-sm text-gray-200 mt-1 line-clamp-2">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 bg-gray-50 p-10 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold">No Products Found</h3>
            <p className="mt-1">There are no products in the "{category}" category yet. Please add one from the Admin Panel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;