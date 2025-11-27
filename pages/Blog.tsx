import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEO } from '../components/SEO';
import { Calendar, User } from 'lucide-react';

export const Blog: React.FC = () => {
  const { data } = useSite();

  return (
    <>
      <SEO title="Blog & News" />
      <div className="bg-gray-100 dark:bg-gray-800 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-serif">News & Events</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Stay up to date with the latest happenings</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {data.posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts found.</p>
            ) : (
                data.posts.map((post) => (
                <article key={post.id} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="h-64 sm:h-80 overflow-hidden">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs uppercase tracking-wide font-semibold text-gray-600 dark:text-gray-300">{post.category}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white hover:text-primary transition-colors cursor-pointer">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {post.excerpt}
                    </p>
                    {/* In a real app, this would link to a detail page. For now, it just shows the content idea */}
                    <button className="text-primary font-medium hover:text-secondary uppercase text-sm tracking-wider">Read Full Story</button>
                    </div>
                </article>
                ))
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Categories</h3>
              <ul className="space-y-2">
                {['Academics', 'Sports', 'Arts', 'Community', 'Events', 'Admissions'].map((cat, i) => (
                  <li key={i}>
                    <button className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm w-full text-left flex justify-between">
                        <span>{cat}</span>
                        <span className="text-gray-400 text-xs">({Math.floor(Math.random() * 10)})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-primary p-6 rounded-lg text-white">
              <h3 className="text-lg font-bold mb-2">Subscribe</h3>
              <p className="text-sm opacity-90 mb-4">Get the latest news directly to your inbox.</p>
              <input type="email" placeholder="Your email address" className="w-full px-3 py-2 rounded text-gray-900 text-sm mb-2 focus:outline-none" />
              <button className="w-full bg-secondary hover:bg-opacity-90 text-white font-medium py-2 rounded text-sm transition-colors">
                Sign Up
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
