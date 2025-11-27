import React from 'react';
import { useSite } from '../context/SiteContext';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Globe, Award } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const { data } = useSite();
  const { home } = data.content;

  const features = [
    { icon: <BookOpen className="h-8 w-8 text-primary" />, title: "World-Class Curriculum", desc: "Offering Cambridge and IB curriculums tailored for global success." },
    { icon: <Users className="h-8 w-8 text-primary" />, title: "Expert Faculty", desc: "Dedicated educators from over 20 different countries inspiring young minds." },
    { icon: <Globe className="h-8 w-8 text-primary" />, title: "Global Perspective", desc: "A diverse community represented by students from 45+ nationalities." },
    { icon: <Award className="h-8 w-8 text-primary" />, title: "Holistic Development", desc: "Focusing on academic excellence, arts, sports, and leadership." },
  ];

  return (
    <>
      <SEO />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={home.heroImage} 
            alt="School Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">{home.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light opacity-90">{home.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/contact">
               <Button size="lg" className="w-full sm:w-auto">Apply Now</Button>
             </Link>
             <Link to="/about">
               <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10 hover:text-white">Learn More</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-serif">{home.welcomeTitle}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {home.welcomeText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 bg-white dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {home.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80 uppercase tracking-wide text-sm font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://picsum.photos/id/453/800/600" 
                alt="Students learning" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 dark:text-white font-serif">{home.programsTitle}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                {home.programsText}
              </p>
              <ul className="space-y-3 mb-8">
                {['Early Childhood Education (Ages 3-5)', 'Primary Years Programme (Ages 5-11)', 'Middle Years Programme (Ages 11-16)', 'Diploma Programme (Ages 16-18)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button className="flex items-center gap-2">
                  View Full Curriculum <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold dark:text-white font-serif">Latest News</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Updates from our community</p>
            </div>
            <Link to="/blog" className="text-primary font-medium hover:text-secondary hidden sm:block">View All News &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.posts.slice(0, 3).map((post) => (
              <Link to={`/blog`} key={post.id} className="group block">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">{post.category}</div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-auto">{post.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
           <div className="mt-8 text-center sm:hidden">
            <Link to="/blog" className="text-primary font-medium hover:text-secondary">View All News &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
};
