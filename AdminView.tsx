
import React, { useState } from 'react';
import { Edit, Image, Grid, Package } from 'react-feather';
import BlogPostCreator from '../admin/BlogPostCreator.tsx';
import ImageGenerator from '../admin/ImageGenerator.tsx';
import MediaLibrary from '../admin/MediaLibrary.tsx';
import ProductUploader from '../admin/ProductUploader.tsx';

type AdminTab = 'blog' | 'image' | 'library' | 'products';

const AdminView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('blog');

    const TabButton: React.FC<{ tabId: AdminTab; title: string; icon: React.ReactNode }> = ({ tabId, title, icon }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex-1 p-4 font-bold text-lg flex items-center justify-center transition-colors duration-300 ${
                activeTab === tabId
                    ? 'bg-brand-red text-white'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
        >
            {icon}
            <span className="ml-3 hidden sm:inline">{title}</span>
        </button>
    );

    return (
        <div className="bg-zinc-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-12 reveal">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase">Admin Control Panel</h1>
                    <p className="mt-2 text-lg text-gray-400">AI-Powered Content Management System</p>
                </div>

                <div className="max-w-6xl mx-auto bg-brand-dark rounded-xl shadow-2xl overflow-hidden reveal" style={{transitionDelay: '200ms'}}>
                    {/* Tabs */}
                    <div className="flex">
                        <TabButton tabId="blog" title="Blog Creator" icon={<Edit />} />
                        <TabButton tabId="image" title="Image Gen" icon={<Image />} />
                        <TabButton tabId="library" title="Media Library" icon={<Grid />} />
                        <TabButton tabId="products" title="Products" icon={<Package />} />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-10">
                        {activeTab === 'blog' && <BlogPostCreator />}
                        {activeTab === 'image' && <ImageGenerator />}
                        {activeTab === 'library' && <MediaLibrary />}
                        {activeTab === 'products' && <ProductUploader />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminView;