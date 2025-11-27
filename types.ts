export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  logoText: string;
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl: string;
  socials: SocialLinks;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface ThemeConfig {
  mode: 'light' | 'dark';
  fontFamily: 'sans' | 'serif' | 'display';
  primaryColor: string;
  secondaryColor: string;
}

export interface PageContent {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    welcomeTitle: string;
    welcomeText: string;
    programsTitle: string;
    programsText: string;
    stats: { label: string; value: string }[];
  };
  about: {
    mission: string;
    vision: string;
    philosophy: string;
    principalMessage: string;
    principalImage: string;
  };
  contact: {
    formTitle: string;
    formSuccessMessage: string;
  };
}

export interface SiteData {
  config: SiteConfig;
  theme: ThemeConfig;
  content: PageContent;
  posts: BlogPost[];
}

export interface SiteContextType {
  data: SiteData;
  updateConfig: (config: Partial<SiteConfig>) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateContent: (section: keyof PageContent, content: any) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  resetToDefaults: () => void;
}