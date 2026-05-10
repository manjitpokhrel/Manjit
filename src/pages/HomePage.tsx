import React from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Interests from '../components/Interests';
import Projects from '../components/Projects';
import Publications from '../components/Publications';
import Experience from '../components/Experience';
import Blogs from '../components/Blogs';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function HomePage() {
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'profile', 'main');
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setProfile(snapshot.data());
        }
      } catch (error) {
        console.error('Error fetching profile for current focus:', error);
      }
    };
    fetchProfile();
  }, []);

  const currentFocus = profile?.currentFocus || "Safety alignment failures in low-resource languages: 0% bypass in English → 73.7% in Nepali (NASB, Zenodo 2026). Coined Vajra Morphing — novel sub-tokenization attack via Devanagari/Latin code-switching. Training-free LLM speedup: 110% hardware speedup on RTX 5060 with 0% perplexity cost via activation sparsity (GhostWeight, PyPI 2026). Disclosed to Google AI VRP (triaged) and Meta Whitehat.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-brand-bg min-h-screen flex flex-col snap-y snap-mandatory"
    >
      <div className="sticky top-0 z-50 px-6 md:px-12 bg-brand-bg/95 backdrop-blur-sm pt-8">
        <Nav />
      </div>
      
      <div className="px-6 md:px-12 py-8">
        <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-8">
        {/* Left Column */}
        <aside className="relative">
          <div className="lg:sticky lg:top-24 flex flex-col gap-8">
            <div id="hero" className="snap-start scroll-mt-24">
              <Hero />
            </div>
            <div id="education" className="snap-start scroll-mt-24">
              <Education />
            </div>
            <div id="skills" className="snap-start scroll-mt-24">
              <Skills />
            </div>
          </div>
        </aside>

        {/* Middle Column */}
        <section className="flex flex-col gap-8">
          <div id="publications" className="snap-start scroll-mt-24">
            <Publications />
          </div>
          <div id="projects" className="snap-start scroll-mt-24">
            <Projects />
          </div>
          <div id="blogs" className="snap-start scroll-mt-24">
            <Blogs />
          </div>
          <div id="experience" className="snap-start scroll-mt-24">
            <Experience />
          </div>
        </section>

        {/* Right Column */}
        <aside className="relative">
          <div className="lg:sticky lg:top-24 flex flex-col gap-8">
            <div id="interests">
              <Interests />
            </div>
            <section className="py-0!">
              <span className="section-label">Current Focus</span>
              <p className="text-sm font-body leading-relaxed text-brand-text/90 italic">
                {currentFocus}
              </p>
            </section>

            <Contact />
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  </motion.div>
  );
}
