import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const { data } = useSite();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <SEO title="Contact Us" />
      <div className="bg-gray-100 dark:bg-gray-800 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-serif">Contact Us</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">We'd love to hear from you</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Get In Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Whether you are looking for admissions information or general queries, our team is ready to assist you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Visit Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">{data.config.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">{data.config.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">{data.config.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Office Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">Mon - Fri: 8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">{data.content.contact.formTitle}</h2>
            
            {submitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {data.content.contact.formSuccessMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input type="email" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <select className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none">
                    <option>General Inquiry</option>
                    <option>Admissions</option>
                    <option>Careers</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea rows={4} required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-96">
            <iframe 
                src={data.config.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy"
                title="School Location"
            ></iframe>
        </div>
      </div>
    </>
  );
};
