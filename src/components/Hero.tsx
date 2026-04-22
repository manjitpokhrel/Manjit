import React from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../lib/data';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-0!">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="lowercase">
          {personalInfo.name}
        </h1>
        <p className="text-base text-brand-text/90 mt-4 leading-relaxed font-body">
          Building and breaking AI.
        </p>

        <div className="flex flex-col gap-1 mt-6 mb-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
          >
            Github
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
          >
            X (Twitter)
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
          >
            Email
          </a>
        </div>
      </motion.div>
    </section>
  );
}
