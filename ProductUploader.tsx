
import React, { useState } from 'react';
import { generateProductDetailsFromImage } from '../../services/geminiService.ts';
import { savePortfolioItem } from '../../services/contentService.ts';
import { uploadImage } from '../../services/cloudStorageService.ts';
import { PortfolioItem } from '../../types.ts';
import { UploadCloud, Zap, Save, CheckCircle, AlertTriangle } from 'react-feather';

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      base64: await base64EncodedDataPromise,
      mimeType: file.type
    };
};

const ProductUploader: React.FC = () => {
    const [image, setImage] = useState<{file: File, previewUrl: string} | null>(null);
    const [details, setDetails] = useState<Partial<PortfolioItem>>({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setDetails({});
            setError(null);
            setSuccessMessage(null);
            setImage({ file, previewUrl: URL.createObjectURL(file) });
        }
    };
    
    const handleAnalyze = async () => {
        if (!image) {
            setError('Please upload an image first.');
            return;
        }
        setIsAnalyzing(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const { base64, mimeType } = await fileToGenerativePart(image.file);
            const result = await generateProductDetailsFromImage(base64, mimeType);
            setDetails({
                title: result.title,
                category: result.category as PortfolioItem['category'],
                description: result.description,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSave = async () => {
        if (!image || !details.title || !details.category) {
            setError('Title and Category are required before saving.');
            return;
        }

        setIsSaving(true);
        setError(null);
        try {
            const permanentImageUrl = await uploadImage(image.file);
    
            const newPortfolioItem: PortfolioItem = {
                id: new Date().toISOString(),
                title: details.title,
                category: details.category,
                description: details.description || '',
                imageUrl: permanentImageUrl,
                hoverImageUrl: permanentImageUrl,
            };
            
            savePortfolioItem(newPortfolioItem);
            setSuccessMessage('Product saved successfully! It is now live in its category view.');
            
            setImage(null);
            setDetails({});
            setTimeout(() => setSuccessMessage(null), 5000);

        } catch (uploadError) {
            setError('Failed to process the image for saving. Please try again.');
            console.error(uploadError);
        } finally {
            setIsSaving(false);
        }
    };

    const categories: PortfolioItem['category'][] = ['Team Uniforms', 'Sublimation', 'Gym & Training', 'Martial Arts', 'Other'];

    return (
        <div className="animate-fade-in">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Product Uploader</h2>
            <p className="text-gray-400 mb-6">Upload a real product image. Our AI will analyze it to suggest a title, category, and description to add to your portfolio.</p>

            {error && (
                <div className="my-4 bg-red-800/50 border border-red-700 text-red-200 p-4 rounded-md flex items-center">
                    <AlertTriangle className="mr-3" /> {error}
                </div>
            )}
            {successMessage && (
                <div className="my-4 bg-green-800/50 border border-green-700 text-green-200 p-4 rounded-md flex items-center">
                    <CheckCircle className="mr-3" /> {successMessage}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label htmlFor="product-upload" className="w-full flex flex-col items-center justify-center h-64 px-4 py-6 bg-zinc-700 text-gray-300 rounded-lg tracking-wide cursor-pointer hover:bg-zinc-600 hover:text-white transition-colors border-2 border-dashed border-zinc-600 hover:border-brand-red">
                        {image ? (
                            <img src={image.previewUrl} alt="Product preview" className="h-full w-full object-contain" />
                        ) : (
                            <>
                                <UploadCloud className="w-10 h-10" />
                                <span className="mt-2 text-base leading-normal">Select an image</span>
                                <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</span>
                            </>
                        )}
                    </label>
                    <input id="product-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />

                    <button onClick={handleAnalyze} disabled={!image || isAnalyzing || isSaving} className="w-full px-6 py-3 font-semibold bg-brand-red text-white rounded-md flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 transform disabled:bg-gray-500 disabled:cursor-not-allowed">
                        {isAnalyzing ? <LoadingSpinner /> : <Zap size={18} className="mr-2" />}
                        {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold text-lg text-gray-200 mb-2">Product Title</label>
                        <input type="text" value={details.title || ''} onChange={e => setDetails({...details, title: e.target.value})} placeholder="AI will generate a title..." className="w-full bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red placeholder-gray-500"/>
                    </div>
                     <div>
                        <label className="block font-semibold text-lg text-gray-200 mb-2">Category</label>
                         <select value={details.category || ''} onChange={e => setDetails({...details, category: e.target.value as PortfolioItem['category']})} className="w-full bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red">
                            <option value="" disabled>Select a category...</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold text-lg text-gray-200 mb-2">Description</label>
                        <textarea value={details.description || ''} onChange={e => setDetails({...details, description: e.target.value})} rows={4} placeholder="AI will generate a description..." className="w-full bg-zinc-700 p-3 rounded-md text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-red placeholder-gray-500"/>
                    </div>
                    <div className="pt-2">
                        <button onClick={handleSave} disabled={!image || !details.title || !details.category || isSaving || isAnalyzing} className="w-full px-8 py-3 font-bold bg-green-600 text-white rounded-md flex items-center justify-center transition-all hover:bg-green-700 hover:scale-105 transform disabled:bg-gray-500 disabled:cursor-not-allowed">
                            {isSaving ? <LoadingSpinner /> : <Save size={18} className="mr-2" />}
                            {isSaving ? 'Saving...' : 'Save to Portfolio'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductUploader;