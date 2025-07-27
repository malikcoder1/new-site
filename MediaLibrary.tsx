
import React, { useState, useEffect } from 'react';
import { getImages } from '../../services/contentService.ts';
import { ManagedImage } from '../../types.ts';
import { Camera, Copy, Check } from 'react-feather';

const MediaLibrary: React.FC = () => {
    const [images, setImages] = useState<ManagedImage[]>([]);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

    useEffect(() => {
        setImages(getImages());
    }, []);

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    if (images.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                <Camera className="mx-auto h-16 w-16 text-gray-600"/>
                <h3 className="mt-4 text-xl font-semibold text-white">Your Media Library is Empty</h3>
                <p className="mt-1">Use the "Image Generator" tab to create and save your first image.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="font-heading text-3xl font-bold text-white mb-6">Media Library</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image) => (
                    <div key={image.id} className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg group">
                        <div className="aspect-square w-full">
                           <img src={image.url} alt={image.prompt} className="w-full h-full object-cover"/>
                        </div>
                        <div className="p-4">
                            <p className="text-xs text-gray-400 mb-2">{new Date(image.createdAt).toLocaleString()}</p>
                            <p className="text-sm text-gray-300 h-10 overflow-hidden" title={image.prompt}>
                               "{image.prompt}"
                            </p>
                            <button
                                onClick={() => handleCopy(image.url)}
                                className="mt-3 w-full px-4 py-2 text-sm font-semibold bg-zinc-700 text-white rounded-md flex items-center justify-center transition-colors hover:bg-brand-red"
                            >
                                {copiedUrl === image.url ? <Check size={16} className="mr-2 text-green-400"/> : <Copy size={16} className="mr-2"/>}
                                {copiedUrl === image.url ? 'Copied!' : 'Copy URL'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaLibrary;