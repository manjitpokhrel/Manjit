import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../context/FirebaseContext';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

import { blogs as staticBlogs } from '../lib/data';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBlogs(data);
        } else {
          setBlogs(staticBlogs);
        }
      } catch (error) {
        console.error('Error fetching blogs page:', error);
        setBlogs(staticBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-[1200px] mx-auto px-6 py-12"
    >
      <Nav />
      
      <div className="mt-12 mb-20">
        <header className="mb-12">
          <Link to="/" className="flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors font-mono text-[10px] uppercase tracking-widest mb-8">
            <ArrowLeft size={14} /> Back to home
          </Link>
          <h1 className="text-5xl font-heading lowercase mb-4">Writings & Thoughts</h1>
          <p className="text-lg text-brand-text/70 max-w-2xl font-body leading-relaxed">
            A collection of notes on AI security, alignment research, and technical experiments.
          </p>
        </header>

        {loading ? (
          <div className="py-20 text-center font-mono text-xs uppercase tracking-widest text-brand-muted">
            Fetching writings...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {blogs.map((blog, index) => (
              <motion.a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group flex flex-col gap-4 p-6 ink-border hover:border-brand-accent transition-all bg-brand-text/[0.01]"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-heading font-medium leading-tight group-hover:text-brand-accent transition-colors">
                    {blog.title}
                  </h3>
                  <ArrowUpRight size={18} className="text-brand-accent opacity-0 group-hover:opacity-100 transition-all ml-4 shrink-0" />
                </div>
                
                <p className="text-base font-body text-brand-text/80 leading-relaxed flex-grow">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted">
                    {blog.date}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Read Post
                  </span>
                </div>
              </motion.a>
            ))}
            {blogs.length === 0 && (
              <div className="md:col-span-2 py-20 text-center border border-dashed border-brand-text/10 bg-brand-text/[0.01] flex flex-col items-center justify-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-muted">Blog posts will be available soon</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </motion.div>
  );
}
