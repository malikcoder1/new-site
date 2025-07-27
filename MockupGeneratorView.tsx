
import React, { useState, useCallback } from 'react';
import { Type, UploadCloud, Zap, Download, AlertTriangle } from 'react-feather';
import { generateMockupFromIdea, generateMockupFromUpload } from '../../services/geminiService.ts';

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

type GeneratorMode = 'idea' | 'upload';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
};

const MockupGeneratorView: React.FC = () => {
    const [mode, setMode] = useState<GeneratorMode>('idea');
    
    // State for 'idea' mode
    const [ideaPrompt, setIdeaPrompt] = useState('');
    
    // State for 'upload' mode
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [instructions, setInstructions] = useState('');

    // Shared state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError(null);
            setGeneratedImageUrl(null);
        }
    };

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImageUrl(null);

        try {
            let resultUrl: string;
            if (mode === 'idea') {
                if (!ideaPrompt) throw new Error("Please describe your mockup idea.");
                resultUrl = await generateMockupFromIdea(ideaPrompt);
            } else { // mode === 'upload'
                if (!uploadedFile) throw new Error("Please upload an image file.");
                if (!instructions) throw new Error("Please provide instructions for the mockup.");
                
                const base64 = await fileToBase64(uploadedFile);
                resultUrl = await generateMockupFromUpload(base64, uploadedFile.type, instructions);
            }
            setGeneratedImageUrl(resultUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [mode, ideaPrompt, uploadedFile, instructions]);

    const TabButton: React.FC<{ tabId: GeneratorMode; title: string; icon: React.ReactNode }> = ({ tabId, title, icon }) => (
        <button
            onClick={() => {
                setMode(tabId);
                setError(null);
                setGeneratedImageUrl(null);
            }}
            className={`w-1/2 p-4 font-bold text-lg flex items-center justify-center transition-all duration-300 rounded-t-lg ${
                mode === tabId
                    ? 'bg-brand-dark text-white'
                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
            }`}
        >
            {icon}
            <span className="ml-3">{title}</span>
        </button>
    );

    const isGenerateDisabled = isLoading || (mode === 'idea' && !ideaPrompt) || (mode === 'upload' && (!uploadedFile || !instructions));

    return (
        <div className="bg-zinc-900 text-white py-16 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center reveal">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase">AI Mockup Generator</h1>
                    <p className="mt-2 text-lg text-gray-400 max-w-3xl mx-auto">
                        Bring your ideas to life. Describe your vision or upload a design to get a photorealistic apparel mockup in seconds.
                    </p>
                </div>

                <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="reveal" style={{transitionDelay: '200ms'}}>
                        <div className="flex">
                            <TabButton tabId="idea" title="From an Idea" icon={<Type />} />
                            <TabButton tabId="upload" title="From an Upload" icon={<UploadCloud />} />
                        </div>
                        <div className="bg-brand-dark p-8 rounded-b-lg">
                            {mode === 'idea' ? (
                                <div className="animate-fade-in">
                                    <h3 className="font-semibold text-xl mb-3">Describe Your Mockup</h3>
                                    <textarea
                                        value={ideaPrompt}
                                        onChange={(e) => setIdeaPrompt(e.target.value)}
                                        placeholder="e.g., A black sleeveless hoodie for weightlifting, with a red roaring lion graphic on the front and 'BEAST MODE' text below it."
                                        rows={8}
                                        className="w-full bg-zinc-700 p-3 rounded-md text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-red placeholder-gray-500"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    <div>
                                        <h3 className="font-semibold text-xl mb-3">1. Upload Your Logo or Design</h3>
                                        <label htmlFor="mockup-upload" className="w-full flex flex-col items-center justify-center h-40 px-4 py-6 bg-zinc-700 text-gray-300 rounded-lg tracking-wide cursor-pointer hover:bg-zinc-600 hover:text-white transition-colors border-2 border-dashed border-zinc-600 hover:border-brand-red">
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Design preview" className="h-full w-full object-contain" />
                                            ) : (
                                                <>
                                                    <UploadCloud className="w-8 h-8" />
                                                    <span className="mt-2 text-sm leading-normal">Select a file</span>
                                                    <span className="text-xs text-gray-400">PNG, JPG recommended</span>
                                                </>
                                            )}
                                        </label>
                                        <input id="mockup-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                                    </div>
                                     <div>
                                        <h3 className="font-semibold text-xl mb-3">2. Describe How to Use It</h3>
                                        <textarea
                                            value={instructions}
                                            onChange={(e) => setInstructions(e.target.value)}
                                            placeholder="e.g., Put this logo on the left chest of a royal blue polo shirt."
                                            rows={4}
                                            className="w-full bg-zinc-700 p-3 rounded-md text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-red placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                            )}
                             <button
                                onClick={handleGenerate}
                                disabled={isGenerateDisabled}
                                className="mt-6 w-full px-6 py-4 font-bold text-xl bg-brand-red text-white rounded-md flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 transform disabled:bg-gray-500 disabled:saturate-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <LoadingSpinner /> : <Zap size={22} className="mr-2" />}
                                {isLoading ? 'Generating Mockup...' : 'Generate Mockup'}
                            </button>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="bg-brand-dark p-6 rounded-lg flex flex-col items-center justify-center aspect-square reveal" style={{transitionDelay: '400ms'}}>
                        {isLoading && (
                            <div className="flex flex-col items-center text-gray-400 animate-fade-in">
                                <LoadingSpinner />
                                <span className="mt-2 font-semibold">AI is creating your design...</span>
                                <span className="text-sm text-gray-500">This can take up to 30 seconds.</span>
                            </div>
                        )}
                        {error && (
                            <div className="my-4 bg-red-800/50 border border-red-700 text-red-200 p-4 rounded-md flex flex-col items-center text-center animate-fade-in">
                                <AlertTriangle className="w-10 h-10 mb-2" /> 
                                <h4 className="font-bold mb-1">Generation Failed</h4>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {generatedImageUrl && (
                            <div className="w-full h-full animate-fade-in group relative">
                                <img src={generatedImageUrl} alt="Generated Mockup" className="w-full h-full object-contain rounded-lg" />
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <a 
                                    href={generatedImageUrl} 
                                    download={`ansons-mockup.jpeg`}
                                    className="px-6 py-3 font-bold bg-white text-brand-dark rounded-md flex items-center transition-all hover:scale-105"
                                    >
                                        <Download size={18} className="mr-2" /> Download
                                    </a>
                                </div>
                            </div>
                        )}
                        {!isLoading && !error && !generatedImageUrl && (
                            <div className="text-center text-gray-500">
                                <Zap className="w-16 h-16 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-300">Your Mockup Appears Here</h3>
                                <p className="mt-1">Provide your details and click "Generate".</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockupGeneratorView;