import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Button } from '../../components/Button';
import { BlogPost } from '../../types';
import { Settings, Layout, FileText, Type, Palette, Plus, Trash2, Edit } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { data, updateConfig, updateTheme, updateContent, addPost, deletePost, resetToDefaults } = useSite();
  const [activeTab, setActiveTab] = useState<'general' | 'theme' | 'pages' | 'blog'>('general');

  // Blog State
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({ title: '', category: 'News', excerpt: '', content: '' });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.excerpt) {
      const post: BlogPost = {
        id: Date.now().toString(),
        title: newPost.title,
        excerpt: newPost.excerpt,
        content: newPost.content || '',
        author: 'Admin',
        date: new Date().toISOString().split('T')[0],
        imageUrl: newPost.imageUrl || 'https://picsum.photos/800/600',
        category: newPost.category || 'News'
      };
      addPost(post);
      setIsEditingPost(false);
      setNewPost({ title: '', category: 'News', excerpt: '', content: '' });
    }
  };

  const tabs = [
    { id: 'general', label: 'General & SEO', icon: <Settings size={18} /> },
    { id: 'theme', label: 'Theme & Style', icon: <Palette size={18} /> },
    { id: 'pages', label: 'Page Content', icon: <Layout size={18} /> },
    { id: 'blog', label: 'Blog Manager', icon: <FileText size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 hidden md:block">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
          <p className="text-xs text-gray-500">World Class CMS</p>
        </div>
        <nav className="p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <div className="pt-8 mt-8 border-t dark:border-gray-700">
            <Button variant="danger" size="sm" onClick={resetToDefaults} className="w-full">
               Reset Website
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-4xl mx-auto">
          
          <div className="md:hidden mb-6 flex space-x-2 overflow-x-auto pb-2">
             {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
                    activeTab === tab.id ? 'bg-primary text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
             ))}
          </div>

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-bold dark:text-white mb-6">General Settings</h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="text-lg font-semibold dark:text-white border-b pb-2">Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">School Name</label>
                    <input type="text" className="input" value={data.config.name} onChange={(e) => updateConfig({ name: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Logo Text</label>
                    <input type="text" className="input" value={data.config.logoText} onChange={(e) => updateConfig({ logoText: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">Tagline</label>
                    <input type="text" className="input" value={data.config.tagline} onChange={(e) => updateConfig({ tagline: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="text-lg font-semibold dark:text-white border-b pb-2">Contact Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Email</label>
                    <input type="text" className="input" value={data.config.email} onChange={(e) => updateConfig({ email: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input type="text" className="input" value={data.config.phone} onChange={(e) => updateConfig({ phone: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">Address</label>
                    <input type="text" className="input" value={data.config.address} onChange={(e) => updateConfig({ address: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="text-lg font-semibold dark:text-white border-b pb-2">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Facebook URL</label>
                        <input type="text" className="input" value={data.config.socials.facebook} onChange={(e) => updateConfig({ socials: { ...data.config.socials, facebook: e.target.value } })} />
                    </div>
                    <div>
                        <label className="label">Instagram URL</label>
                        <input type="text" className="input" value={data.config.socials.instagram} onChange={(e) => updateConfig({ socials: { ...data.config.socials, instagram: e.target.value } })} />
                    </div>
                     <div>
                        <label className="label">LinkedIn URL</label>
                        <input type="text" className="input" value={data.config.socials.linkedin} onChange={(e) => updateConfig({ socials: { ...data.config.socials, linkedin: e.target.value } })} />
                    </div>
                    <div>
                        <label className="label">WhatsApp URL (e.g., https://wa.me/...)</label>
                        <input type="text" className="input" value={data.config.socials.whatsapp} onChange={(e) => updateConfig({ socials: { ...data.config.socials, whatsapp: e.target.value } })} />
                    </div>
                     <div>
                        <label className="label">YouTube URL</label>
                        <input type="text" className="input" value={data.config.socials.youtube} onChange={(e) => updateConfig({ socials: { ...data.config.socials, youtube: e.target.value } })} />
                    </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="text-lg font-semibold dark:text-white border-b pb-2">SEO</h3>
                <div>
                    <label className="label">Meta Title</label>
                    <input type="text" className="input" value={data.config.seo.metaTitle} onChange={(e) => updateConfig({ seo: { ...data.config.seo, metaTitle: e.target.value } })} />
                </div>
                <div>
                    <label className="label">Meta Description</label>
                    <textarea className="input" rows={3} value={data.config.seo.metaDescription} onChange={(e) => updateConfig({ seo: { ...data.config.seo, metaDescription: e.target.value } })} />
                </div>
              </div>
            </div>
          )}

          {/* Theme Settings */}
          {activeTab === 'theme' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-bold dark:text-white mb-6">Theme Customization</h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-6">
                
                <div>
                  <h3 className="label mb-2">Color Palette</h3>
                  <div className="flex gap-4 mb-4">
                    {[
                      { p: '#1e40af', s: '#f59e0b', label: 'Classic Blue' },
                      { p: '#047857', s: '#fcd34d', label: 'Nature Green' },
                      { p: '#be123c', s: '#1f2937', label: 'Bold Red' },
                      { p: '#7e22ce', s: '#22d3ee', label: 'Royal Purple' },
                    ].map((theme, i) => (
                      <button 
                        key={i}
                        onClick={() => updateTheme({ primaryColor: theme.p, secondaryColor: theme.s })}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                        style={{ background: `linear-gradient(135deg, ${theme.p} 50%, ${theme.s} 50%)` }}
                        title={theme.label}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="label">Primary Hex</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={data.theme.primaryColor} onChange={(e) => updateTheme({ primaryColor: e.target.value })} className="h-10 w-10 cursor-pointer"/>
                            <input type="text" value={data.theme.primaryColor} onChange={(e) => updateTheme({ primaryColor: e.target.value })} className="input"/>
                        </div>
                     </div>
                     <div>
                        <label className="label">Secondary Hex</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={data.theme.secondaryColor} onChange={(e) => updateTheme({ secondaryColor: e.target.value })} className="h-10 w-10 cursor-pointer"/>
                            <input type="text" value={data.theme.secondaryColor} onChange={(e) => updateTheme({ secondaryColor: e.target.value })} className="input"/>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="border-t pt-6 dark:border-gray-700">
                  <h3 className="label mb-3">Typography</h3>
                  <div className="flex gap-4">
                    <button 
                       onClick={() => {
                           document.body.style.fontFamily = "'Inter', sans-serif";
                           updateTheme({ fontFamily: 'sans' });
                       }}
                       className={`px-4 py-2 border rounded-md ${data.theme.fontFamily === 'sans' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700'}`}
                    >
                      Sans-Serif (Inter)
                    </button>
                    <button 
                       onClick={() => {
                           document.body.style.fontFamily = "'Merriweather', serif";
                           updateTheme({ fontFamily: 'serif' });
                       }}
                       className={`px-4 py-2 border rounded-md font-serif ${data.theme.fontFamily === 'serif' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700'}`}
                    >
                      Serif (Merriweather)
                    </button>
                  </div>
                </div>

                <div className="border-t pt-6 dark:border-gray-700">
                  <h3 className="label mb-3">Appearance</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700 dark:text-gray-300">Light Mode</span>
                    <button 
                      onClick={() => updateTheme({ mode: data.theme.mode === 'light' ? 'dark' : 'light' })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.theme.mode === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.theme.mode === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Page Content */}
          {activeTab === 'pages' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-bold dark:text-white mb-6">Page Content</h2>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="text-lg font-semibold dark:text-white border-b pb-2">Home Page</h3>
                <div>
                    <label className="label">Hero Title</label>
                    <input type="text" className="input" value={data.content.home.heroTitle} onChange={(e) => updateContent('home', { heroTitle: e.target.value })} />
                </div>
                <div>
                    <label className="label">Hero Subtitle</label>
                    <input type="text" className="input" value={data.content.home.heroSubtitle} onChange={(e) => updateContent('home', { heroSubtitle: e.target.value })} />
                </div>
                <div>
                    <label className="label">Welcome Text</label>
                    <textarea className="input" rows={3} value={data.content.home.welcomeText} onChange={(e) => updateContent('home', { welcomeText: e.target.value })} />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="text-lg font-semibold dark:text-white border-b pb-2">About Page</h3>
                <div>
                    <label className="label">Mission Statement</label>
                    <textarea className="input" rows={2} value={data.content.about.mission} onChange={(e) => updateContent('about', { mission: e.target.value })} />
                </div>
                 <div>
                    <label className="label">Principal Message</label>
                    <textarea className="input" rows={3} value={data.content.about.principalMessage} onChange={(e) => updateContent('about', { principalMessage: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* Blog Manager */}
          {activeTab === 'blog' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white">Blog Manager</h2>
                <Button onClick={() => setIsEditingPost(true)} className="flex items-center gap-2"><Plus size={16} /> New Post</Button>
              </div>

              {isEditingPost && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border-l-4 border-primary">
                   <h3 className="text-lg font-bold mb-4 dark:text-white">Create/Edit Post</h3>
                   <form onSubmit={handlePostSubmit} className="space-y-4">
                      <div>
                          <label className="label">Title</label>
                          <input type="text" className="input" required value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Category</label>
                            <input type="text" className="input" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})} />
                        </div>
                        <div>
                            <label className="label">Image URL</label>
                            <input type="text" className="input" placeholder="https://..." value={newPost.imageUrl} onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})} />
                        </div>
                      </div>
                      <div>
                          <label className="label">Excerpt</label>
                          <textarea className="input" rows={2} required value={newPost.excerpt} onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})} />
                      </div>
                      <div>
                          <label className="label">Content</label>
                          <textarea className="input" rows={5} value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})} />
                      </div>
                      <div className="flex gap-4">
                        <Button type="submit">Save Post</Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditingPost(false)}>Cancel</Button>
                      </div>
                   </form>
                </div>
              )}

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {data.posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {post.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button onClick={() => deletePost(post.id)} className="text-red-600 hover:text-red-900 flex items-center gap-1">
                            <Trash2 size={16} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
      
      <style>{`
        .label {
            @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
        }
        .input {
            @apply block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm px-3 py-2 border;
        }
      `}</style>
    </div>
  );
};