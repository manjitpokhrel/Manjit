import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { personalInfo as staticData } from '../lib/data';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Hero() {
  const [profile, setProfile] = useState(staticData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'profile', 'main');
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setProfile(snapshot.data() as any);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <section className="py-0!">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="lowercase">
          {profile.name}
        </h1>
        <motion.p 
          className="text-base text-brand-text/90 mt-4 leading-relaxed font-body"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.03,
              }
            }
          }}
        >
          {(profile.bio || 'Building and breaking AI.').split('').map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        <div className="flex flex-col gap-1 mt-6 mb-6">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
            >
              Github
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
            >
              LinkedIn
            </a>
          )}
          {profile.x && (
            <a
              href={profile.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
            >
              X (Twitter)
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors"
            >
              Email
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
