import React from 'react';
import { motion } from 'motion/react';
import { education } from '../lib/data';

export default function Education() {
  return (
    <section id="education" className="py-0!">
      <span className="section-label">Education</span>
      <div className="flex flex-col gap-4">
        {education.map((edu, index) => (
          <div key={index} className="edu-item">
            <h4 className="text-sm font-bold mb-1">{edu.degree}</h4>
            <p className="text-xs font-mono uppercase text-brand-muted">
              {edu.institution} (
              {edu.period.includes('Present') 
                ? `'${edu.period.split(' - ')[0].slice(-2)}—PRES`
                : `'${edu.period.split(' - ')[0].slice(-2)}—'${edu.period.split(' - ')[1].slice(-2)}`}
              )
            </p>
            {edu.concentration && (
              <p className="text-xs italic text-brand-accent/80 mt-2">
                Focus: {edu.concentration}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
