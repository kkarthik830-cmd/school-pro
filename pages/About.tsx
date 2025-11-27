import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEO } from '../components/SEO';
import { CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  const { data } = useSite();
  const { about } = data.content;

  return (
    <>
      <SEO title="About Us" />
      
      {/* Page Header */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-serif mb-4">About Our School</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Discover our rich history, our dedication to excellence, and our vision for the future.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Principal Message */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="w-full md:w-1/3">
             <div className="relative">
                <div className="absolute inset-0 bg-secondary translate-x-3 translate-y-3 rounded-lg"></div>
                <img 
                  src={about.principalImage} 
                  alt="Principal" 
                  className="relative rounded-lg w-full shadow-lg z-10"
                />
             </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-4 dark:text-white text-primary">A Message from the Principal</h2>
            <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-secondary pl-4">
              "{about.principalMessage}"
            </blockquote>
            <p className="text-gray-600 dark:text-gray-400">
              Our school has been a beacon of learning for over 50 years. We pride ourselves on cultivating an environment where curiosity is celebrated and diversity is embraced.
            </p>
            <div className="mt-4 font-bold text-gray-900 dark:text-white">
              Dr. Eleanor Rigby<br/>
              <span className="text-sm font-normal text-gray-500">Principal</span>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border-t-4 border-primary">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">{about.mission}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border-t-4 border-secondary">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">{about.vision}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border-t-4 border-primary">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Our Philosophy</h3>
            <p className="text-gray-600 dark:text-gray-300">{about.philosophy}</p>
          </div>
        </div>

        {/* Accreditations */}
        <div className="text-center mb-16">
           <h2 className="text-2xl font-bold mb-8 dark:text-white">Accreditations & Memberships</h2>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
              {/* Placeholders for logos */}
              <div className="text-2xl font-bold text-gray-400 flex items-center gap-2"><CheckCircle /> CIS</div>
              <div className="text-2xl font-bold text-gray-400 flex items-center gap-2"><CheckCircle /> WASC</div>
              <div className="text-2xl font-bold text-gray-400 flex items-center gap-2"><CheckCircle /> IB World School</div>
              <div className="text-2xl font-bold text-gray-400 flex items-center gap-2"><CheckCircle /> Cambridge</div>
           </div>
        </div>
      </div>
    </>
  );
};
