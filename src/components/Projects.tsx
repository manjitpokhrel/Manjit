import React from 'react';
import { projects } from '../lib/data';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="py-0!">
      <span className="section-label">Selected Projects</span>
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
