import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Generate some consistent placeholder images
  const images = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    src: `https://picsum.photos/seed/school${i}/800/600`,
    alt: `Gallery Image ${i + 1}`
  }));

  return (
    <>
      <SEO title="Gallery" />
      <div className="bg-gray-100 dark:bg-gray-800 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-serif">Campus Life</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">A glimpse into our vibrant community</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-200 dark:bg-gray-700"
              onClick={() => setSelectedImage(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-w-full max-h-[90vh] rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
};
