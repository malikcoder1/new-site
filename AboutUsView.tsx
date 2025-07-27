
import React from 'react';
import { Target, Zap, Users, Shield } from 'react-feather';
import { View } from '../../types.ts';

interface AboutUsViewProps {
    navigateTo: (view: View) => void;
}

const AboutUsView: React.FC<AboutUsViewProps> = ({ navigateTo }) => {
    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-zinc-900 h-96 flex items-center justify-center text-white text-center reveal">
                <img 
                    src="https://picsum.photos/seed/factory/1920/1080" 
                    alt="ANSONSPORTS Factory" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 p-6">
                    <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-wider">The Heart of the Game</h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300">
                        Discover the story, passion, and craftsmanship woven into every ANSONSPORTS garment.
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="py-16 sm:py-24 bg-white text-brand-dark">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="reveal">
                            <h2 className="font-heading text-4xl font-bold uppercase">From Sialkot, With Passion</h2>
                            <p className="mt-4 text-gray-700 leading-relaxed">
                                Founded in the heart of Pakistan's renowned sports manufacturing hub, Sialkot, ANSONSPORTS began with a simple mission: to provide athletes of all levels with apparel that doesn't just look professional, but performs at the highest level. We saw a gap between mass-produced, generic sportswear and the high-priced gear of major brands.
                            </p>
                            <p className="mt-4 text-gray-700 leading-relaxed">
                                Our founder, a second-generation artisan, combined decades of family expertise in textile and garment production with a modern vision for technology and customer service. Today, ANSONSPORTS stands as a testament to that vision—a blend of traditional craftsmanship and cutting-edge innovation, serving teams and brands worldwide.
                            </p>
                        </div>
                        <div className="reveal" style={{transitionDelay: '200ms'}}>
                            <img 
                                src="https://picsum.photos/seed/stitching/800/600" 
                                alt="Detailed stitching work"
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Values Section */}
            <div className="py-16 sm:py-24 bg-zinc-800">
                <div className="container mx-auto px-6">
                    <h2 className="text-center font-heading text-4xl font-bold uppercase reveal">Our Core Values</h2>
                    <p className="mt-2 text-center text-lg text-gray-400 max-w-3xl mx-auto reveal" style={{transitionDelay: '150ms'}}>
                        The principles that guide every cut, stitch, and decision.
                    </p>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: <Target className="h-12 w-12 text-brand-red mx-auto"/>, title: 'Uncompromising Quality', desc: 'We source the finest materials and employ meticulous quality control to ensure every garment is built to last.' },
                            { icon: <Zap className="h-12 w-12 text-brand-red mx-auto"/>, title: 'Constant Innovation', desc: 'From sublimation techniques to performance fabrics, we relentlessly pursue the next advancement in sportswear.' },
                            { icon: <Users className="h-12 w-12 text-brand-red mx-auto"/>, title: 'True Partnership', desc: 'We work with you, not just for you. Your success is our success, and we build relationships to match.' },
                            { icon: <Shield className="h-12 w-12 text-brand-red mx-auto"/>, title: 'Absolute Integrity', desc: 'Honest pricing, transparent processes, and a commitment to delivering on our promises, every single time.' },
                        ].map((value, index) => (
                            <div key={value.title} className="bg-zinc-900 p-8 rounded-lg reveal" style={{ transitionDelay: `${index * 100 + 300}ms` }}>
                                {value.icon}
                                <h3 className="mt-4 font-heading text-2xl font-bold">{value.title}</h3>
                                <p className="mt-2 text-gray-400">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
             <div className="bg-brand-red text-white">
                <div className="container mx-auto px-6 py-16 text-center reveal">
                    <h2 className="font-heading text-4xl font-bold">Ready to Build Your Legacy?</h2>
                    <p className="mt-2 max-w-2xl mx-auto">
                        Let's partner to create custom sportswear that embodies your team's spirit and ambition.
                    </p>
                    <button
                        onClick={() => navigateTo({ name: 'contact' })}
                        className="mt-6 px-8 py-3 font-semibold bg-white text-brand-red rounded-md transition-all duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 transform"
                    >
                        Start Your Project
                    </button>
                </div>
            </div>
        </>
    );
};

export default AboutUsView;