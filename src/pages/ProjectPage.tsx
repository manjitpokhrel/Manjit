import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Github, Globe, ChevronUp } from 'lucide-react';
import { projects } from '../lib/data';
import Footer from '../components/Footer';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="text-center">
          <h1 className="text-4xl font-heading italic mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/')}
            className="font-mono text-sm uppercase tracking-widest text-brand-accent underline"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-brand-bg min-h-screen"
    >
      <nav className="fixed top-0 left-0 w-full z-50 nav-blur border-b border-brand-accent/5">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-40 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="tag mb-4 inline-block">
            {project.badge}
          </span>
          <h1 className="lowercase text-6xl md:text-8xl">
            {project.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-16 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="section-label">Description</span>
            <p className="text-xl font-body leading-relaxed text-brand-text/90 mb-12">
              {project.fullDescription}
            </p>

            <span className="section-label">Key Highlights</span>
            <ul className="space-y-4">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex gap-4 text-lg font-body text-brand-text italic">
                  <span className="text-brand-accent mt-1">—</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <span className="section-label">Stack</span>
              <div className="flex flex-col gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-brand-muted uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-brand-accent text-brand-bg rounded-full shadow-lg hover:bg-brand-accent/90 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
