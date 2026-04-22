import React, { useState, useEffect } from 'react';
import { personalInfo } from '../lib/data';

const sections = [
  { name: 'Interests', id: 'interests' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Education', id: 'education' },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex justify-end items-baseline border-b border-brand-text pb-4 mb-2">
      <div className="flex gap-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${
              activeSection === section.id
                ? 'text-brand-accent font-bold'
                : 'text-brand-text hover:text-brand-accent'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
