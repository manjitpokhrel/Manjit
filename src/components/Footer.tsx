import React from 'react';
import { personalInfo } from '../lib/data';

export default function Footer() {
  return (
    <footer className="flex justify-between items-end border-t border-brand-text pt-4 mt-20">
      <div className="flex flex-col font-mono text-[11px] leading-relaxed text-brand-muted">
        <a href={`mailto:${personalInfo.email}`} className="hover:text-brand-accent transition-colors">
          EMAIL: {personalInfo.email}
        </a>
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          GITHUB: {personalInfo.github.replace('https://', '')}
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          LINKEDIN: {personalInfo.linkedin.replace('https://', '')}
        </a>
        <a href={personalInfo.x} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          X: {personalInfo.x.replace('https://', '')}
        </a>
      </div>
      
      <div className="flex flex-col items-end font-mono text-[11px] leading-relaxed text-brand-muted">
        <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          WEB: {personalInfo.website.replace('https://', '')}
        </a>
      </div>
    </footer>
  );
}
