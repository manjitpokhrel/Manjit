export interface Project {
  id: string;
  slug: string;
  title: string;
  badge: string;
  highlights: string[];
  tags: string[];
  fullDescription: string;
  link?: string;
}

export interface Interest {
  title: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  focus: string;
  concentration?: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  order: number;
}

export interface Publication {
  id: string;
  title: string;
  meta: string;
  doi?: string;
  github?: string;
  url?: string;
  pypi?: string;
}
