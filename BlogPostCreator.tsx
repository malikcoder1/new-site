
import React, { useState } from 'react';
import { generateBlogPost } from '../../services/geminiService.ts';
import { savePost } from '../../services/contentService.ts';
import { Zap, Save, CheckCircle } from 'react-feather';
import { BlogPost } from '../../types.ts';

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const BlogPostCreator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [generatedPost, setGeneratedPost] = useState<{ title: string; content: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!topic) {
            setError('Please enter a topic to generate a blog post.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        setGeneratedPost(null);
        try {
            const result = await generateBlogPost(topic);
            setGeneratedPost(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSave = () => {
        if (!generatedPost) return;
        
        const newPost: BlogPost = {
            id: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            ...generatedPost
        };

        savePost(newPost);
        setSuccessMessage('Post saved successfully! It is now live on the Resources page.');
        
        // Clear form for next post
        setGeneratedPost(null);
        setTopic('');
        
        setTimeout(() => setSuccessMessage(null), 5000);
    };

    return (
        <div>
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Blog Post Creator</h2>
            <p className="text-gray-400 mb-6">Enter a topic, and our AI will draft a complete blog post for you. You can edit the result before saving.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'Benefits of custom sublimation'"
                    className="flex-grow bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red placeholder-gray-500"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-6 py-3 font-semibold bg-brand-red text-white rounded-md flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 transform disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? <LoadingSpinner /> : <Zap size={18} className="mr-2" />}
                    {isLoading ? 'Generating...' : 'Generate Post'}
                </button>
            </div>
            
            {error && <div className="my-4 bg-red-800/50 border border-red-700 text-red-200 p-4 rounded-md">{error}</div>}
            {successMessage && (
                <div className="my-4 bg-green-800/50 border border-green-700 text-green-200 p-4 rounded-md flex items-center">
                    <CheckCircle className="mr-3" /> {successMessage}
                </div>
            )}

            {generatedPost && (
                <div className="mt-8 space-y-6 animate-fade-in">
                    <div>
                        <label className="block font-semibold text-lg text-gray-200 mb-2">Title</label>
                        <input
                            type="text"
                            value={generatedPost.title}
                            onChange={(e) => setGeneratedPost({ ...generatedPost, title: e.target.value })}
                            className="w-full bg-zinc-700 p-3 rounded-md text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-red"
                        />
                    </div>
                     <div>
                        <label className="block font-semibold text-lg text-gray-200 mb-2">Content (Markdown Supported)</label>
                        <textarea
                            value={generatedPost.content}
                            onChange={(e) => setGeneratedPost({ ...generatedPost, content: e.target.value })}
                            className="w-full h-96 bg-zinc-700 p-3 rounded-md text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-red"
                        />
                    </div>
                    <div className="text-right">
                         <button
                            onClick={handleSave}
                            className="px-8 py-3 font-bold bg-green-600 text-white rounded-md flex items-center transition-all hover:bg-green-700 hover:scale-105 transform ml-auto"
                        >
                            <Save size={18} className="mr-2" />
                            Save Post
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPostCreator;