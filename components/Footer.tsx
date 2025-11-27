import React from 'react';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

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
    <path d="M9 10a2 2 0 0 0 2 2l2 2a2 2 0 0 0 2 2l2 2" />
  </svg>
);

export const Footer: React.FC = () => {
  const { data } = useSite();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* About */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{data.config.name}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {data.config.tagline}
            </p>
            <div className="flex space-x-4">
              {data.config.socials.facebook && (
                <a href={data.config.socials.facebook} className="text-gray-400 hover:text-secondary" title="Facebook"><Facebook size={20} /></a>
              )}
              {data.config.socials.instagram && (
                <a href={data.config.socials.instagram} className="text-gray-400 hover:text-secondary" title="Instagram"><Instagram size={20} /></a>
              )}
              {data.config.socials.youtube && (
                <a href={data.config.socials.youtube} className="text-gray-400 hover:text-secondary" title="YouTube"><Youtube size={20} /></a>
              )}
              {data.config.socials.linkedin && (
                <a href={data.config.socials.linkedin} className="text-gray-400 hover:text-secondary" title="LinkedIn"><Linkedin size={20} /></a>
              )}
              {data.config.socials.whatsapp && (
                <a href={data.config.socials.whatsapp} className="text-gray-400 hover:text-secondary" title="WhatsApp"><WhatsappIcon size={20} /></a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/gallery" className="hover:text-white">Campus Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-white">News & Events</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-white text-xs mt-2 block opacity-50">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Academics</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Early Years</a></li>
              <li><a href="#" className="hover:text-white">Primary School</a></li>
              <li><a href="#" className="hover:text-white">Secondary School</a></li>
              <li><a href="#" className="hover:text-white">IB Diploma</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="flex-shrink-0 mt-1" size={16} />
                <span>{data.config.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} />
                <span>{data.config.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} />
                <span>{data.config.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {data.config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};