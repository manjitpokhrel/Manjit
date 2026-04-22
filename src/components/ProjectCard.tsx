import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group project-item mb-8"
    >
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="py-4 ink-border transition-all duration-300 group-hover:border-brand-accent">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-xl font-heading font-medium flex items-center gap-2 flex-wrap">
              {project.title}
              <span className="font-mono text-[9px] bg-brand-accent text-brand-bg px-1.5 py-0.5 uppercase">
                {project.badge}
              </span>
            </h3>
            <div className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight size={14} />
            </div>
          </div>

          <p className="text-sm font-body text-brand-accent/80 mb-4 leading-relaxed">
            {project.highlights[0]}... {project.highlights[1]}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
