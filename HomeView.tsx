
import React, { useState, useEffect } from 'react';
import { View, PortfolioItem, PortfolioCategory } from '../../types.ts';
import { ArrowRight, CheckCircle, Droplet, Layers, Scissors } from 'react-feather';
import { getPortfolioItems } from '../../services/contentService.ts';

interface HomeViewProps {
  navigateTo: (view: View) => void;
}

const Hero: React.FC<HomeViewProps> = ({ navigateTo }) => (
  <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden text-white">
    <div className="absolute inset-0 flex w-[600%] h-full hero-slide">
        {['soccer', 'basketball', 'martial-arts', 'gymwear', 'cycling'].map((sport) => (
            <div key={sport} className="relative w-1/6 h-full">
                <img src={`https://picsum.photos/seed/${sport}bg/1920/1080`} alt={`${sport} background`} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
        ))}
        {/* Duplicate the first slide to create a seamless loop */}
        <div className="relative w-1/6 h-full">
            <img src={`https://picsum.photos/seed/soccerbg/1920/1080`} alt="soccer background" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
    </div>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
      <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider reveal">Equip Every Athlete</h1>
      <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300 reveal" style={{transitionDelay: '200ms'}}>
        From youth leagues to pro teams, we deliver high-performance, fully customized sportswear with unmatched quality and speed.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 reveal" style={{transitionDelay: '400ms'}}>
        <button 
            onClick={() => navigateTo({ name: 'contact' })}
            className="px-8 py-3 font-semibold text-lg bg-brand-red text-white rounded-md transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 transform hover:shadow-lg hover:shadow-brand-red/40"
        >
          Get a Quote
        </button>
        <button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 font-semibold text-lg bg-transparent border-2 border-white text-white rounded-md transition-all duration-300 ease-in-out hover:bg-white hover:text-brand-dark transform hover:scale-105"
        >
          View Portfolio
        </button>
      </div>
    </div>
  </div>
);

const ProductCategories: React.FC<{ navigateTo: (view: View) => void }> = ({ navigateTo }) => (
    <div className="py-16 sm:py-24 bg-white text-brand-dark">
        <div className="container mx-auto px-6 text-center">
            <h2 className="font-heading text-4xl font-bold uppercase reveal">Our Specializations</h2>
            <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto reveal" style={{transitionDelay: '150ms'}}>We manufacture performance gear for every discipline, built to your exact specifications.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[{title: 'Team Uniforms', img: 'https://picsum.photos/seed/team/600/400'}, {title: 'Sublimation', img: 'https://picsum.photos/seed/sublimation/600/400'}, {title: 'Gym & Training', img: 'https://picsum.photos/seed/gym/600/400'}, {title: 'Martial Arts', img: 'https://picsum.photos/seed/ma/600/400'}].map((cat, index) => (
                    <div key={cat.title} onClick={() => navigateTo({ name: 'category', category: cat.title as PortfolioCategory })} className="group relative overflow-hidden rounded-lg shadow-xl transform hover:-translate-y-2 transition-all duration-300 reveal cursor-pointer" style={{transitionDelay: `${index * 100 + 300}ms`}}>
                        <img src={cat.img} alt={cat.title} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 className="absolute bottom-6 left-6 font-heading text-2xl text-white font-bold">{cat.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


const ManufacturingProcess: React.FC = () => (
    <div className="py-16 sm:py-24 bg-zinc-800">
        <div className="container mx-auto px-6">
            <h2 className="text-center font-heading text-4xl font-bold uppercase reveal">Built for Performance, From Start to Finish</h2>
            <p className="mt-2 text-center text-lg text-gray-400 max-w-3xl mx-auto reveal" style={{transitionDelay: '150ms'}}>Our meticulous process ensures every piece of apparel meets the highest standards of durability and design.</p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {[
                    { icon: <Layers className="h-12 w-12 text-brand-red mx-auto"/>, title: 'Fabric Selection', desc: 'Moisture-wicking, stretch, and durable fabrics tailored to your sport.' },
                    { icon: <Droplet className="h-12 w-12 text-brand-red mx-auto"/>, title: 'Advanced Printing', desc: 'Vibrant, full-color sublimation and precision screen printing that never fades.' },
                    { icon: <Scissors className="h-12 w-12 text-brand-red mx-auto"/>, title: 'Precision Stitching', desc: 'Reinforced seams and expert construction for maximum durability in action.' },
                    { icon: <CheckCircle className="h-12 w-12 text-brand-red mx-auto"/>, title: 'Quality Assurance', desc: 'Rigorous inspection at every step guarantees a flawless final product.' },
                ].map((step, index) => (
                    <div key={step.title} className="bg-zinc-900 p-8 rounded-lg reveal" style={{ transitionDelay: `${index * 100 + 300}ms` }}>
                        {step.icon}
                        <h3 className="mt-4 font-heading text-2xl font-bold">{step.title}</h3>
                        <p className="mt-2 text-gray-400">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Portfolio: React.FC = () => {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        setPortfolioItems(getPortfolioItems());
    }, []);

    return (
        <div id="portfolio" className="py-16 sm:py-24 bg-white text-brand-dark">
            <div className="container mx-auto px-6">
                <h2 className="text-center font-heading text-4xl font-bold uppercase reveal">Our Work in Action</h2>
                <p className="mt-2 text-center text-lg text-gray-600 max-w-3xl mx-auto reveal" style={{transitionDelay: '150ms'}}>We've outfitted thousands of athletes. Here's a look at some of our favorite projects.</p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioItems.map((item, index) => (
                        <div key={item.id} className="group relative block overflow-hidden rounded-lg shadow-lg cursor-pointer reveal" style={{ transitionDelay: `${index * 100 + 300}ms` }}>
                            <img src={item.imageUrl} alt={item.title} className="w-full h-[450px] object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                            <img src={item.hoverImageUrl} alt={`${item.title} back view`} className="w-full h-[450px] object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 p-6 flex flex-col justify-end">
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-red bg-white/20 backdrop-blur-sm px-2 py-1 rounded self-start">{item.category}</span>
                                <h3 className="mt-2 font-heading text-2xl text-white font-bold">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HomeView: React.FC<HomeViewProps> = ({ navigateTo }) => {
    return (
        <>
            <Hero navigateTo={navigateTo}/>
            <ProductCategories navigateTo={navigateTo} />
            <ManufacturingProcess />
            <Portfolio />
        </>
    );
};

export default HomeView;