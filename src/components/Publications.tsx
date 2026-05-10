import React from 'react';
import { motion } from 'motion/react';
import { publications } from '../lib/data';
import { ArrowUpRight, Github, ExternalLink, Link2 } from 'lucide-react';

export default function Publications() {
  return (
    <section id="publications" className="py-0!">
      <span className="section-label">Publications & Disclosures</span>
      <div className="flex flex-col gap-6">
        {publications.map((pub, index) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group flex flex-col gap-2 p-4 ink-border hover:bg-brand-text/[0.02] transition-colors"
          >
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-lg font-heading font-medium leading-tight group-hover:text-brand-accent transition-colors">
                {pub.title}
              </h3>
              {pub.url && (
                <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} />
                </a>
              )}
            </div>
            
            <p className="text-[10px] font-mono uppercase tracking-widest text-brand-muted">
              {pub.meta}
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              {pub.doi && (
                <a 
                  href={pub.doi} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-brand-accent hover:underline"
                >
                  <Link2 size={12} /> DOI
                </a>
              )}
              {pub.github && (
                <a 
                  href={pub.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-brand-accent hover:underline"
                >
                  <Github size={12} /> GitHub
                </a>
              )}
              {pub.pypi && (
                <a 
                  href={pub.pypi} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-brand-accent hover:underline"
                >
                  <ExternalLink size={12} /> PyPI
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
