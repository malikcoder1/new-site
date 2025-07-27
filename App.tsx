
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import HomeView from './components/views/HomeView.tsx';
import MockupGeneratorView from './components/views/MockupGeneratorView.tsx';
import ContactView from './components/views/ContactView.tsx';
import ResourcesView from './components/views/ResourcesView.tsx';
import AboutUsView from './components/views/AboutUsView.tsx';
import AdminView from './components/views/AdminView.tsx';
import CategoryView from './components/views/CategoryView.tsx';
import { View } from './types.ts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>({ name: 'home' });

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1
    });

    // Use a timeout to ensure elements are in the DOM after view change
    const timeoutId = setTimeout(() => {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
    }, 100);


    return () => {
        clearTimeout(timeoutId);
        // We don't need to unobserve here as they are unobserved upon intersection.
        // If we didn't unobserve, we would do it here.
    };
  }, [currentView]);

  const renderView = () => {
    switch (currentView.name) {
      case 'about':
        return <AboutUsView navigateTo={navigateTo} />;
      case 'mockup':
        return <MockupGeneratorView />;
      case 'contact':
        return <ContactView navigateTo={navigateTo} />;
      case 'resources':
        return <ResourcesView />;
      case 'admin':
        return <AdminView />;
      case 'category':
        return <CategoryView category={currentView.category} navigateTo={navigateTo} />;
      case 'home':
      default:
        return <HomeView navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} navigateTo={navigateTo} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;