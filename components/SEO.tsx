import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const { data } = useSite();
  
  const siteTitle = title ? `${title} | ${data.config.name}` : data.config.seo.metaTitle;
  const siteDesc = description || data.config.seo.metaDescription;

  useEffect(() => {
    document.title = siteTitle;
    
    // Helper to update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', siteDesc);
    updateMeta('og:title', siteTitle);
    updateMeta('og:description', siteDesc);
    
  }, [siteTitle, siteDesc]);

  return null;
};
