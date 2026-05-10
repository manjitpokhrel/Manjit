import React, { useState, useEffect } from 'react';
import { education as staticData } from '../lib/data';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function Education() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'education'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setItems(staticData);
        }
      } catch (error) {
        console.error('Error fetching education:', error);
        setItems(staticData);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="education" className="py-0!">
      <span className="section-label">Education</span>
      <div className="flex flex-col gap-4">
        {items.map((edu, index) => (
          <div key={index} className="edu-item">
            <h4 className="text-sm font-bold mb-1">{edu.degree}</h4>
            <p className="text-xs font-mono uppercase text-brand-muted">
              {edu.institution} ({edu.period})
            </p>
            {edu.concentration && (
              <p className="text-xs italic text-brand-accent/80 mt-2">
                Focus: {edu.concentration}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
