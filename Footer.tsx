
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Shield } from 'react-feather';
import { View } from '../../types.ts';

interface FooterProps {
  navigateTo: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-zinc-900 text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl text-white mb-4">ANSONSPORTS</h3>
            <p className="text-sm">
              Your trusted partner in premium, custom sports apparel manufacturing. From local clubs to professional leagues, we equip every athlete for victory.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-brand-red"/> Sialkot, Punjab, Pakistan</li>
              <li className="flex items-center"><Phone className="w-4 h-4 mr-3 text-brand-red"/> +92 123 4567890</li>
              <li className="flex items-center"><Mail className="w-4 h-4 mr-3 text-brand-red"/> sales@ansonssports.com</li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-red transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-red transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-red transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm">
          <p className="mb-4">&copy; {new Date().getFullYear()} ANSONSPORTS Manufacturing. All Rights Reserved.</p>
          <button
            onClick={() => navigateTo({ name: 'admin' })}
            className="inline-flex items-center text-gray-500 hover:text-brand-red transition-colors duration-300"
          >
            <Shield size={14} className="mr-2"/>
            Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;