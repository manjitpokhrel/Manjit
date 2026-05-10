import React, { useState, useEffect } from 'react';
import { experiences as staticData } from '../lib/data';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function Experience() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setItems(staticData);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
        setItems(staticData);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="experience" className="py-0!">
      <span className="section-label">Experience</span>
      <div className="flex flex-col gap-8">
        {items.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="text-sm font-body font-bold">{exp.role}</h4>
              <span className="font-mono text-[10px] text-brand-muted uppercase">{exp.period}</span>
            </div>
            <p className="text-xs font-mono uppercase tracking-tighter text-brand-muted mb-2">{exp.company}</p>
            <p className="text-sm font-body leading-relaxed text-brand-text/80">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
