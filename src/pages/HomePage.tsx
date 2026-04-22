import React from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Interests from '../components/Interests';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Footer from '../components/Footer';
import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-brand-bg min-h-screen flex flex-col p-6 md:px-12 md:py-8"
    >
      <Nav />
      
      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-8 mt-8">
        {/* Left Column */}
        <aside className="flex flex-col gap-8">
          <Hero />
          <div id="education">
            <Education />
          </div>
          <div id="skills">
            <Skills />
          </div>
        </aside>

        {/* Middle Column */}
        <section className="flex flex-col gap-8">
          <div id="projects">
            <Projects />
          </div>
          <div id="experience">
            <Experience />
          </div>
        </section>

        {/* Right Column */}
        <aside className="flex flex-col gap-8">
          <div id="interests">
            <Interests />
          </div>
          <section className="py-0!">
            <span className="section-label">Current Focus</span>
            <p className="text-sm font-body leading-relaxed text-brand-text/90 italic">
              Building reproducible attack pipelines for open-weight LLMs and investigating alignment bypasses through adversarial prompt engineering and activation analysis.
            </p>
          </section>
        </aside>
      </main>

      <Footer />
    </motion.div>
  );
}
