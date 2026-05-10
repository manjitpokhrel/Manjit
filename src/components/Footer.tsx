import React, { useState, useEffect } from 'react';
import { personalInfo as staticData } from '../lib/data';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Footer() {
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
        console.error('Error fetching profile for footer:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <footer className="flex justify-between items-end border-t border-brand-text pt-4 mt-20">
      <div className="flex flex-col font-mono text-[11px] leading-relaxed text-brand-muted">
        <a href={`mailto:${profile.email}`} className="hover:text-brand-accent transition-colors">
          EMAIL: {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          GITHUB: {profile.github.replace('https://', '')}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          LINKEDIN: {profile.linkedin.replace('https://', '')}
        </a>
        {profile.x && (
          <a href={profile.x} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
            X: {profile.x.replace('https://', '')}
          </a>
        )}
      </div>
      
      <div className="flex flex-col items-end font-mono text-[11px] leading-relaxed text-brand-muted">
        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
          WEB: {profile.website.replace('https://', '')}
        </a>
      </div>
    </footer>
  );
}
