import React, { useState, useEffect } from 'react';
import { skills as staticData } from '../lib/data';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function Skills() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setItems(staticData);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        setItems(staticData);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="skills" className="py-0!">
      <span className="section-label">Skills & Toolkit</span>
      <div className="flex flex-col gap-4">
        {items.map((skillGroup) => (
          <div key={skillGroup.category}>
            <h4 className="font-mono text-[10px] uppercase text-brand-muted mb-2 tracking-widest">{skillGroup.category}</h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {skillGroup.items.map((skill: string) => (
                <span key={skill} className="font-mono text-[11px] text-brand-text">
                  {skill}{skillGroup.items.indexOf(skill) !== skillGroup.items.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
