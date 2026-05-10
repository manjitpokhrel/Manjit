import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../context/FirebaseContext';
import { ArrowUpRight, Rss, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { blogs as staticBlogs } from '../lib/data';

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('order', 'asc'), limit(3));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBlogs(data);
        } else {
          setBlogs(staticBlogs.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs(staticBlogs.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return null;

  return (
    <section id="blogs" className="py-0!">
      <span className="section-label flex items-center gap-2">
        <Rss size={12} className="text-brand-accent/50" />
        Blog posts
      </span>
      <div className="flex flex-col gap-6">
        {blogs.length > 0 ? (
          <>
            {blogs.map((blog, index) => (
              <motion.a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01, borderLeftColor: 'var(--color-brand-accent)' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex flex-col gap-2 p-4 ink-border hover:bg-brand-text/[0.02] transition-all"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-heading font-medium leading-tight group-hover:text-brand-accent transition-colors">
                    {blog.title}
                  </h3>
                  <ArrowUpRight size={14} className="text-brand-accent opacity-0 group-hover:opacity-100 transition-all ml-4 shrink-0" />
                </div>
                
                <p className="text-sm font-body text-brand-text/70 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-brand-muted">
                  {blog.date}
                </div>
              </motion.a>
            ))}

            <Link 
              to="/blogs" 
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent hover:translate-x-2 transition-transform duration-300 mt-2"
            >
              View all writings <ArrowRight size={14} />
            </Link>
          </>
        ) : (
          <div className="p-8 ink-border border-dashed border-brand-text/10 flex flex-col items-center justify-center text-center">
            <Rss size={24} className="text-brand-muted mb-3 opacity-20" />
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-muted">
              Writings will be available soon
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
