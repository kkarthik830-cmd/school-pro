import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Menu, X, Phone, Mail, GraduationCap, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from './Button';

// Custom WhatsApp Icon since it's not always available in standard sets
const WhatsappIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a0.5 .5 0 0 0 1 10V5" opacity="0" />
    <path d="M9 10a2 2 0 0 0 2 2l2 2a2 2 0 0 0 2 2l2 2" />
  </svg>
);

export const Navbar: React.FC = () => {
  const { data } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 text-xs md:text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center gap-2"><Phone size={14} /> {data.config.phone}</span>
            <span className="flex items-center gap-2"><Mail size={14} /> {data.config.email}</span>
          </div>
          <div className="flex space-x-4 items-center">
            {data.config.socials.facebook && (
              <a href={data.config.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" title="Facebook">
                <Facebook size={16} />
              </a>
            )}
            {data.config.socials.instagram && (
              <a href={data.config.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" title="Instagram">
                <Instagram size={16} />
              </a>
            )}
            {data.config.socials.linkedin && (
              <a href={data.config.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" title="LinkedIn">
                <Linkedin size={16} />
              </a>
            )}
            {data.config.socials.whatsapp && (
               <a href={data.config.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" title="WhatsApp">
                 <WhatsappIcon size={16} />
               </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="text-white h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white uppercase leading-none">
                  {data.config.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">
                  {data.config.logoText}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact">
               <Button size="sm">Admissions</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
             <div className="pt-4 px-3">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Admissions</Button>
                </Link>
             </div>
             
             {/* Mobile Socials */}
             <div className="flex gap-6 justify-center pt-6 pb-2 border-t dark:border-gray-800 mt-4">
                {data.config.socials.facebook && (
                  <a href={data.config.socials.facebook} className="text-gray-500 hover:text-primary"><Facebook size={24}/></a>
                )}
                {data.config.socials.instagram && (
                  <a href={data.config.socials.instagram} className="text-gray-500 hover:text-primary"><Instagram size={24}/></a>
                )}
                {data.config.socials.whatsapp && (
                  <a href={data.config.socials.whatsapp} className="text-gray-500 hover:text-primary"><WhatsappIcon size={24}/></a>
                )}
             </div>
          </div>
        </div>
      )}
    </header>
  );
};