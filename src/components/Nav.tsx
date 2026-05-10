import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { personalInfo } from '../lib/data';

const sections = [
  { name: 'Projects', id: 'projects' },
  { name: 'Blogs', id: 'blogs', type: 'link', path: '/blogs' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Education', id: 'education' },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.startsWith('/blogs') ? 'blogs' : '');
      return;
    }

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
      if (section.type !== 'link') {
        const element = document.getElementById(section.id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (section: any) => {
    if (section.type === 'link') {
      navigate(section.path);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/#' + section.id);
      return;
    }

    const element = document.getElementById(section.id);
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
            onClick={() => handleNavClick(section)}
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
