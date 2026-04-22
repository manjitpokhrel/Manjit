import React from 'react';
import { motion } from 'motion/react';
import { researchInterests } from '../lib/data';

export default function Interests() {
  return (
    <section id="interests" className="py-0!">
      <span className="section-label">Research Interests</span>
      <ul className="flex flex-col gap-3">
        {researchInterests.map((interest) => (
          <li key={interest} className="text-base font-body italic leading-tight text-brand-text">
            {interest}
          </li>
        ))}
      </ul>
    </section>
  );
}
