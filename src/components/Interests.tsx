import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { researchInterests as staticData } from '../lib/data';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Interests() {
  const [interests, setInterests] = useState(staticData);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const docRef = doc(db, 'profile', 'main');
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.researchInterests) {
            setInterests(data.researchInterests);
          }
        }
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };
    fetchInterests();
  }, []);

  return (
    <section id="interests" className="py-0!">
      <span className="section-label">Research Interests</span>
      <ul className="flex flex-col gap-3">
        {interests.map((interest) => (
          <li key={interest} className="text-base font-body italic leading-tight text-brand-text">
            {interest}
          </li>
        ))}
      </ul>
    </section>
  );
}
