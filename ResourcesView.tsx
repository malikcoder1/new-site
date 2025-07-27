
import React, { useState, useCallback, useEffect } from 'react';
import { generateBlogPostIdea } from '../../services/geminiService.ts';
import { getPosts } from '../../services/contentService.ts';
import { BookOpen, Zap, ThumbsUp } from 'react-feather';
import { BlogPost } from '../../types.ts';

const ResourcesView: React.FC = () => {
    const [idea, setIdea] = useState<{ title: string; summary: string } | null>(null);
    const [isLoadingIdea, setIsLoadingIdea] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        // Load posts from our content service (localStorage)
        const savedPosts = getPosts();
        setPosts(savedPosts);
    }, []);

    const handleGenerateIdea = useCallback(async () => {
        setIsLoadingIdea(true);
        setError(null);
        setIdea(null);
        try {
            const result = await generateBlogPostIdea();
            setIdea(result);
        } catch (err) {
            console.error(err);
            setError('Failed to generate an idea. Please check your API key and try again.');
        } finally {
            setIsLoadingIdea(false);
        }
    }, []);

    const getSummary = (markdown: string): string => {
        // Remove markdown headings, links, etc., and get the first 150 characters.
        const plainText = markdown
            .replace(/#{1,6}\s/g, '') // Remove headings
            .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
            .replace(/[\*\_]/g, ''); // Remove bold/italics
        return plainText.slice(0, 150) + '...';
    };

    return (
        <div className="bg-white text-brand-dark py-16 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center reveal">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase">Resources & Insights</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                        Leverage our expertise with in-depth guides, case studies, and tools to help you create the perfect custom sportswear.
                    </p>
                </div>
                
                {/* Gemini Idea Generator */}
                <div className="mt-16 max-w-4xl mx-auto bg-zinc-800 text-white rounded-lg shadow-2xl p-8 reveal" style={{transitionDelay: '200ms'}}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="font-heading text-3xl font-bold flex items-center"><Zap className="mr-3 text-brand-red"/>Content Idea Generator</h2>
                            <p className="text-gray-300 mt-1">Stuck for blog ideas? Let our AI suggest a topic for you.</p>
                        </div>
                        <button 
                            onClick={handleGenerateIdea}
                            disabled={isLoadingIdea}
                            className="mt-4 md:mt-0 px-6 py-3 font-semibold bg-brand-red text-white rounded-md flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 transform disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            {isLoadingIdea ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Zap size={18} className="mr-2"/> Generate Idea
                                </>
                            )}
                        </button>
                    </div>

                    {error && <div className="mt-4 bg-red-800/50 border border-red-700 text-red-200 p-4 rounded-md">{error}</div>}
                    
                    {idea && (
                        <div className="mt-6 border-t border-zinc-700 pt-6 animate-fade-in">
                            <h3 className="font-heading text-2xl text-brand-red">{idea.title}</h3>
                            <p className="mt-2 text-gray-300">{idea.summary}</p>
                        </div>
                    )}
                </div>

                {/* Dynamic Blog Posts */}
                <div className="mt-16 reveal" style={{transitionDelay: '300ms'}}>
                    <h2 className="text-center font-heading text-3xl font-bold uppercase mb-10">From Our Blog</h2>
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <div key={post.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col reveal" style={{transitionDelay: `${index * 100 + 400}ms`}}>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <h3 className="font-heading text-2xl mt-2 mb-2 text-brand-dark flex-grow">{post.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{getSummary(post.content)}</p>
                                    <a href="#" className="mt-auto inline-block font-bold text-brand-red hover:underline" onClick={(e) => e.preventDefault()}>Read More &rarr;</a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 bg-gray-50 p-10 rounded-lg">
                            <BookOpen className="mx-auto h-12 w-12 text-gray-400"/>
                            <h3 className="mt-4 text-xl font-semibold">No Posts Yet</h3>
                            <p className="mt-1">Head over to the Admin Panel to generate your first blog post!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResourcesView;