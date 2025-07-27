
import React, { useState } from 'react';
import { generateImage } from '../../services/geminiService.ts';
import { saveImage } from '../../services/contentService.ts';
import { Zap, Save, Download, CheckCircle } from 'react-feather';

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) {
            setError('Please enter a prompt to generate an image.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        setGeneratedImageUrl(null);
        try {
            const result = await generateImage(prompt);
            setGeneratedImageUrl(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSave = () => {
        if (!generatedImageUrl) return;

        saveImage({
            prompt,
            url: generatedImageUrl
        });
        setSuccessMessage('Image saved to Media Library!');
        setTimeout(() => setSuccessMessage(null), 5000);
    };

    return (
        <div>
            <h2 className="font-heading text-3xl font-bold text-white mb-4">AI Image Generator</h2>
            <p className="text-gray-400 mb-6">Describe the image you want to create for your marketing, blog, or product mockups. Powered by Imagen 3.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Dynamic photo of a basketball player dunking'"
                    className="flex-grow bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red placeholder-gray-500"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-6 py-3 font-semibold bg-brand-red text-white rounded-md flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 transform disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? <LoadingSpinner /> : <Zap size={18} className="mr-2" />}
                    {isLoading ? 'Generating...' : 'Generate Image'}
                </button>
            </div>
            
            {error && <div className="my-4 bg-red-800/50 border border-red-700 text-red-200 p-4 rounded-md">{error}</div>}
            {successMessage && (
                <div className="my-4 bg-green-800/50 border border-green-700 text-green-200 p-4 rounded-md flex items-center">
                    <CheckCircle className="mr-3" /> {successMessage}
                </div>
            )}


            <div className="mt-8 w-full aspect-video bg-zinc-800 rounded-lg flex items-center justify-center">
                {isLoading && (
                     <div className="flex flex-col items-center text-gray-400">
                        <LoadingSpinner />
                        <span>Generating your image...</span>
                     </div>
                )}
                {generatedImageUrl && (
                    <div className="w-full h-full animate-fade-in group relative">
                        <img src={generatedImageUrl} alt={prompt} className="w-full h-full object-contain rounded-lg" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                           <a 
                             href={generatedImageUrl} 
                             download={`apex-ai-image-${prompt.slice(0,20).replace(/\s/g, '_')}.jpeg`}
                             className="px-6 py-3 font-bold bg-white text-brand-dark rounded-md flex items-center transition-all hover:scale-105"
                            >
                                <Download size={18} className="mr-2" /> Download
                            </a>
                             <button
                                onClick={handleSave}
                                className="px-6 py-3 font-bold bg-green-600 text-white rounded-md flex items-center transition-all hover:bg-green-700 hover:scale-105"
                            >
                                <Save size={18} className="mr-2" /> Save to Library
                            </button>
                        </div>
                    </div>
                )}
                {!isLoading && !generatedImageUrl && (
                    <div className="text-gray-500">Your generated image will appear here</div>
                )}
            </div>
        </div>
    );
};

export default ImageGenerator;