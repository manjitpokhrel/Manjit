import React, { useState, useEffect } from 'react';
import { projects as staticData } from '../lib/data';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setItems(staticData);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setItems(staticData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="projects" className="py-0!">
      <span className="section-label">Selected Projects</span>
      <div className="flex flex-col">
        {items.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
