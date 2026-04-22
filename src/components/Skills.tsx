import React from 'react';
import { motion } from 'motion/react';
import { skills } from '../lib/data';

export default function Skills() {
  return (
    <section id="skills" className="py-0!">
      <span className="section-label">Skills & Toolkit</span>
      <div className="flex flex-col gap-4">
        {skills.map((skillGroup) => (
          <div key={skillGroup.category}>
            <h4 className="font-mono text-[10px] uppercase text-brand-muted mb-2 tracking-widest">{skillGroup.category}</h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {skillGroup.items.map((skill) => (
                <span key={skill} className="font-mono text-[11px] text-brand-text">
                  {skill}{skillGroup.items.indexOf(skill) !== skillGroup.items.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
