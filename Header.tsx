
import React from 'react';
import { View } from '../../types.ts';
import { Target, Shield } from 'react-feather';

interface HeaderProps {
  currentView: View;
  navigateTo: (view: View) => void;
}

const NavLink: React.FC<{
  viewName: 'home' | 'about' | 'mockup' | 'resources';
  currentView: View;
  navigateTo: (view: View) => void;
  children: React.ReactNode;
  isEmphasized?: boolean;
}> = ({ viewName, currentView, navigateTo, children, isEmphasized = false }) => {
  const isActive = currentView.name === viewName;
  const activeClasses = isEmphasized ? 'text-white' : 'text-brand-red';
  const inactiveClasses = isEmphasized ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white';
  
  return (
    <button
      onClick={() => navigateTo({ name: viewName })}
      className={`px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {children}
    </button>
  );
};

const logoUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2MAAAGFCAYAAAC37s0jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAEcCSURBVHja7N2/bxzHmf/x5/fK/wz8ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4ZfgZ+GX4Gfhl+Bn4.jpg";

const Header: React.FC<HeaderProps> = ({ currentView, navigateTo }) => {
  return (
    <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigateTo({ name: 'home' })}
        >
          <img src={logoUrl} alt="ANSONSPORTS Logo" className="h-10" />
          <span className="font-heading text-2xl font-bold text-white tracking-widest">
            ANSONSPORTS
          </span>
        </div>
        <nav className="hidden md:flex items-center">
          <NavLink viewName="home" currentView={currentView} navigateTo={navigateTo}>Home</NavLink>
          <NavLink viewName="about" currentView={currentView} navigateTo={navigateTo}>About Us</NavLink>
          <NavLink viewName="mockup" currentView={currentView} navigateTo={navigateTo}>AI Mockup Generator</NavLink>
          <NavLink viewName="resources" currentView={currentView} navigateTo={navigateTo}>Resources</NavLink>
          <button
            onClick={() => navigateTo({ name: 'contact' })}
            className="ml-4 px-5 py-2.5 font-semibold text-sm bg-brand-red text-white rounded-md transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 hover:shadow-lg hover:shadow-brand-red/30 transform"
          >
            Get a Quote
          </button>
        </nav>
        <div className="md:hidden">
            <button
                onClick={() => navigateTo({ name: 'contact' })}
                className="px-4 py-2 font-semibold text-sm bg-brand-red text-white rounded-md"
            >
                Quote
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;