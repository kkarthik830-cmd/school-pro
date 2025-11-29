import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, SiteContextType, SiteConfig, ThemeConfig, PageContent, BlogPost } from '../types';

const defaultData: SiteData = {
  config: {
    name: "Best School",
    tagline: "Shaping Global Minds for a Brighter Future",
    logoText: "Best",
    email: "admissions@bestschool.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Academic Avenue, Knowledge City, Global 90210",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d33267b29780!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1611816557671!5m2!1sen!2sus",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
      whatsapp: "https://wa.me/15551234567",
    },
    seo: {
      metaTitle: "Best School - Excellence in Education",
      metaDescription: "Providing top-tier international education for the leaders of tomorrow.",
    },
  },
  theme: {
    mode: 'light',
    fontFamily: 'sans',
    primaryColor: '#1e40af', // blue-800
    secondaryColor: '#f59e0b', // amber-500
  },
  content: {
    home: {
      heroTitle: "Best School",
      heroSubtitle: "Shaping Global Minds for a Brighter Future",
      heroImage: "https://picsum.photos/id/433/1920/1080",
      welcomeTitle: "Welcome to Excellence",
      welcomeText: "At Best School, we believe in nurturing the whole child. Our curriculum is designed to challenge students academically while fostering their social and emotional growth. We prepare students not just for university, but for life.",
      programsTitle: "Our Programs",
      programsText: "From Early Years to High School, we offer a continuum of education that meets international standards.",
      stats: [
        { label: "Students", value: "1200+" },
        { label: "Nationalities", value: "45" },
        { label: "Teachers", value: "150" },
        { label: "Universities", value: "100%" },
      ],
    },
    about: {
      mission: "To inspire and empower students to become lifelong learners and responsible global citizens.",
      vision: "To be a leading international school recognized for academic excellence and holistic development.",
      philosophy: "We believe every child is unique and capable of extraordinary things. Our learner-centered approach ensures personalized attention.",
      principalMessage: "Welcome to our vibrant community. We are dedicated to providing a safe, nurturing, and stimulating environment.",
      principalImage: "https://picsum.photos/id/64/800/800",
    },
    contact: {
      formTitle: "Get in Touch",
      formSuccessMessage: "Thank you for your inquiry. Our admissions team will contact you shortly.",
    },
  },
  posts: [
    {
      id: "1",
      title: "Science Fair Success",
      excerpt: "Our students showcased incredible innovation at this year's Annual Science Fair.",
      content: "The annual science fair was a resounding success...",
      author: "Dr. Smith",
      date: "2023-10-15",
      imageUrl: "https://picsum.photos/id/20/800/600",
      category: "Events"
    },
    {
      id: "2",
      title: "Admissions Open for 2024",
      excerpt: "We are now accepting applications for the upcoming academic year.",
      content: "Join our diverse community...",
      author: "Admissions Team",
      date: "2023-11-01",
      imageUrl: "https://picsum.photos/id/24/800/600",
      category: "News"
    },
    {
      id: "3",
      title: "Sports Day Highlights",
      excerpt: "A day filled with energy, teamwork, and school spirit.",
      content: "Red house took the trophy this year...",
      author: "Coach Carter",
      date: "2023-09-20",
      imageUrl: "https://picsum.photos/id/73/800/600",
      category: "Sports"
    }
  ],
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider = ({ children }: { children?: React.ReactNode }) => {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('siteData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(data));
    
    // Apply Theme Variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', data.theme.primaryColor);
    root.style.setProperty('--color-secondary', data.theme.secondaryColor);
    
    if (data.theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

  }, [data]);

  const updateConfig = (config: Partial<SiteConfig>) => {
    setData(prev => ({ ...prev, config: { ...prev.config, ...config } }));
  };

  const updateTheme = (theme: Partial<ThemeConfig>) => {
    setData(prev => ({ ...prev, theme: { ...prev.theme, ...theme } }));
  };

  const updateContent = (section: keyof PageContent, content: any) => {
    setData(prev => ({ ...prev, content: { ...prev.content, [section]: { ...prev.content[section], ...content } } }));
  };

  const addPost = (post: BlogPost) => {
    setData(prev => ({ ...prev, posts: [post, ...prev.posts] }));
  };

  const updatePost = (post: BlogPost) => {
    setData(prev => ({ ...prev, posts: prev.posts.map(p => p.id === post.id ? post : p) }));
  };

  const deletePost = (id: string) => {
    setData(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }));
  };

  const resetToDefaults = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
        setData(defaultData);
    }
  };

  return (
    <SiteContext.Provider value={{ data, updateConfig, updateTheme, updateContent, addPost, updatePost, deletePost, resetToDefaults }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within a SiteProvider");
  return context;
};