
import React, { useState } from 'react';
import { User, ShoppingBag, FileText, Send, Check, ArrowLeft } from 'react-feather';
import { View } from '../../types.ts';

interface ContactViewProps {
  navigateTo: (view: View) => void;
}

const ContactView: React.FC<ContactViewProps> = ({ navigateTo }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        sport: '',
        quantity: '',
        details: '',
        fileName: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNext = () => setStep(s => s + 1);
    const handlePrev = () => setStep(s => s - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData(prev => ({ ...prev, fileName: e.target.files![0].name }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
             <div className="bg-white text-brand-dark py-24 sm:py-32">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <div className="mx-auto w-24 h-24 flex items-center justify-center bg-brand-red rounded-full reveal">
                        <Check className="text-white w-16 h-16" />
                    </div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mt-8 reveal" style={{transitionDelay: '150ms'}}>Thank You!</h1>
                    <p className="mt-4 text-lg text-gray-700 reveal" style={{transitionDelay: '300ms'}}>
                        Your quote request has been received. Our team will review your requirements and get back to you with a detailed proposal and a free sample mockup within 24-48 hours.
                    </p>
                    <button
                        onClick={() => navigateTo({ name: 'home' })}
                        className="mt-8 px-8 py-3 font-semibold bg-brand-red text-white rounded-md transition-transform duration-200 hover:scale-105 reveal"
                        style={{transitionDelay: '450ms'}}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const StepIcon: React.FC<{ icon: React.ReactNode; currentStep: number; stepNumber: number; title: string }> = ({ icon, currentStep, stepNumber, title }) => (
        <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= stepNumber ? 'bg-brand-red border-brand-red text-white' : 'bg-zinc-700 border-zinc-600 text-gray-400'}`}>
                {icon}
            </div>
            <p className={`mt-2 text-xs font-bold ${currentStep >= stepNumber ? 'text-white' : 'text-gray-400'}`}>{title}</p>
        </div>
    );
    
    return (
        <div className="bg-zinc-800 py-16 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center reveal">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase">Get a Custom Quote</h1>
                        <p className="mt-2 text-lg text-gray-400">
                            Provide your project details and get a free, no-obligation quote and digital mockup from our team.
                        </p>
                    </div>

                    <div className="bg-brand-dark p-8 rounded-lg shadow-2xl mt-12 reveal" style={{transitionDelay: '200ms'}}>
                        {/* Stepper */}
                        <div className="flex justify-between items-start mb-8 relative">
                            <div className="absolute top-6 left-0 w-full h-0.5 bg-zinc-600"></div>
                            <div className="absolute top-6 left-0 w-full h-0.5 bg-brand-red transition-all duration-500" style={{width: `${((step - 1) / 2) * 100}%`}}></div>
                            <StepIcon icon={<User />} currentStep={step} stepNumber={1} title="Your Info" />
                            <StepIcon icon={<ShoppingBag />} currentStep={step} stepNumber={2} title="Order Details" />
                            <StepIcon icon={<FileText />} currentStep={step} stepNumber={3} title="Finalize" />
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} className="bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required/>
                                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} className="bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required/>
                                    <input type="tel" name="phone" placeholder="Phone Number (Optional)" onChange={handleChange} value={formData.phone} className="bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red" />
                                    <input type="text" name="company" placeholder="Club / Gym / Company Name" onChange={handleChange} value={formData.company} className="bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red" />
                                </div>
                            )}
                            {step === 2 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <select name="sport" onChange={handleChange} value={formData.sport} className="bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required>
                                        <option value="">Select Sport/Category...</option>
                                        <option>Team Uniforms (Soccer, Basketball, etc.)</option>
                                        <option>Sublimation Gear (Cycling, etc.)</option>
                                        <option>Gym & Training Wear</option>
                                        <option>Martial Arts (Gi, Shorts, Rashguards)</option>
                                        <option>Other</option>
                                    </select>
                                    <input type="number" name="quantity" placeholder="Estimated Quantity" min="10" onChange={handleChange} value={formData.quantity} className="bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required/>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <textarea name="details" rows={5} placeholder="Describe your project, including colors, styles, and any specific requirements..." onChange={handleChange} value={formData.details} className="w-full bg-zinc-700 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required></textarea>
                                     <label className="w-full flex items-center justify-center px-4 py-3 bg-zinc-700 text-gray-300 rounded-md tracking-wide cursor-pointer hover:bg-zinc-600 hover:text-white transition-colors">
                                        <svg className="w-6 h-6 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4 4-4-4h3V9h2v2z" />
                                        </svg>
                                        <span className="text-sm">{formData.fileName || 'Upload Your Logo (.ai, .eps, .pdf)'}</span>
                                        <input type='file' name="logo" className="hidden" onChange={handleFileChange} accept=".ai,.eps,.pdf,.png,.jpg,.svg" />
                                    </label>
                                </div>
                            )}

                            <div className="mt-8 flex justify-between items-center">
                                {step > 1 ? (
                                    <button type="button" onClick={handlePrev} className="px-6 py-2 font-semibold text-white rounded-md flex items-center transition-transform hover:scale-105">
                                        <ArrowLeft size={16} className="mr-2"/> Back
                                    </button>
                                ) : <div />}
                                {step < 3 ? (
                                    <button type="button" onClick={handleNext} className="px-6 py-2 font-semibold bg-brand-red text-white rounded-md transition-transform hover:scale-105">Next Step</button>
                                ) : (
                                    <button type="submit" className="px-8 py-3 font-bold bg-brand-red text-white rounded-md flex items-center transition-all hover:bg-red-700 hover:scale-105 transform">
                                        Submit Request <Send size={16} className="ml-3" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactView;