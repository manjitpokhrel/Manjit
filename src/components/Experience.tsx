import React from 'react';
import { motion } from 'motion/react';
import { experiences } from '../lib/data';

export default function Experience() {
  return (
    <section id="experience" className="py-0!">
      <span className="section-label">Experience</span>
      <div className="flex flex-col gap-8">
        {experiences.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="text-sm font-body font-bold">{exp.role}</h4>
              <span className="font-mono text-[10px] text-brand-muted uppercase">{exp.period}</span>
            </div>
            <p className="text-xs font-mono uppercase tracking-tighter text-brand-muted mb-2">{exp.company}</p>
            <p className="text-sm font-body leading-relaxed text-brand-text/80">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
