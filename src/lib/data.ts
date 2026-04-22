import { Project, Experience, Skill, Education } from '../types';

export const personalInfo = {
  name: 'Manjit Pokhrel',
  location: 'Nepal',
  email: 'manjitpokhrel42@gmail.com',
  github: 'https://github.com/manjitpokhrel',
  linkedin: 'https://linkedin.com/in/manjitpokhrel',
  x: 'https://x.com/manjitpokhrel_',
  website: 'https://manjitpokhrel.com.np',
  bio: 'Building and breaking AI. Independent AI Security Researcher evaluating alignment robustness in open-weight models and building reproducible attack pipelines.',
};

export const researchInterests: string[] = [
  'Adversarial Machine Learning',
  'AI Safety',
  'Transformer Architectures',
  'Robustness & Alignment of LLMs',
  'AI Security',
];

export const projects: Project[] = [
  {
    id: '1',
    slug: 'minigpt',
    title: 'MiniGPT',
    badge: 'Core ML',
    highlights: [
      '211K param GPT transformer in pure Python/NumPy',
      'Manual backprop and multi-head attention',
      'Trained on 1.1M chars of Shakespeare',
    ],
    tags: ['Python', 'NumPy', 'Deep Learning', 'Transformers'],
    fullDescription: 'MiniGPT is a ground-up implementation of a Generative Pre-trained Transformer. Built entirely in pure Python and NumPy without using high-level ML frameworks for the core logic, it features manual backpropagation, multi-head attention mechanisms, and positional encoding. The model was trained on a dataset of 1.1 million characters of Shakespeare, achieving a loss reduction from 4.0 to 1.6.',
  },
  {
    id: '2',
    slug: 'llm-red-teaming',
    title: 'LLM Red Teaming',
    badge: 'Security',
    highlights: [
      'Prompt injection + jailbreak testing (Gemma, Qwen, Ollama)',
      'Identified PII leakage and code bypasses',
      'Triaged by Google AI VRP',
    ],
    tags: ['AI Security', 'Red Teaming', 'LLMs', 'VRP'],
    fullDescription: 'Comprehensive security research focused on open-weight LLMs like Gemma, Qwen, and Ollama. This project involved developing custom prompt injection and jailbreak techniques to evaluate alignment robustness. I discovered and responsibly disclosed multiple vulnerabilities including PII leakage and restricted code generation bypasses. One of the findings was triaged by the Google AI Vulnerability Reward Program (VRP) as an alignment bypass.',
  },
  {
    id: '3',
    slug: 'peft-qwen',
    title: 'Parameter-Efficient Fine-Tuning',
    badge: 'Research',
    highlights: [
      'LoRA adapters for Qwen with CUDA acceleration',
      'Evaluated robustness pre/post alignment tuning',
      'Experimented with activation modifications',
    ],
    tags: ['Qwen', 'LoRA', 'PEFT', 'CUDA', 'Optimization'],
    fullDescription: 'Investigating efficient ways to adapt large language models. This research utilized LoRA (Low-Rank Adaptation) adapters with Qwen, utilizing CUDA for hardware acceleration. The project involved a deep dive into how fine-tuning impacts the overall robustness of the model, specifically comparing performance and safety guardrails before and after alignment tuning.',
  },
  {
    id: '4',
    slug: 'movie-rec-bot',
    title: 'Movie Recommendation Bot',
    badge: 'Software',
    highlights: [
      'Content-based engine using TMDB data',
      'Semantic similarity + rating-based ranking',
      'Real-time concurrent Discord implementation',
    ],
    tags: ['NLP', 'Semantic Search'],
    fullDescription: 'A sophisticated movie recommendation system built into a Discord bot. It utilizes a content-based recommendation engine powered by data from TMDB. The system calculates semantic similarity between movies to provide relevant suggestions, combined with a weighted rating-based ranking algorithm. The bot is designed for concurrent, real-time interaction.',
  },
];

export const experiences: Experience[] = [
  {
    role: 'Independent AI Security Researcher',
    company: 'Self-employed',
    period: '2024 - Present',
    description: 'Evaluating alignment robustness in open-weight LLMs, building reproducible attack pipelines, and conducting responsible disclosure to vendors.',
  },
];

export const skills: Skill[] = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'JavaScript', 'SQL'],
  },
  {
    category: 'ML Frameworks',
    items: ['PyTorch', 'TensorFlow', 'NumPy', 'HuggingFace', 'PEFT', 'Unsloth'],
  },
  {
    category: 'AI Domains',
    items: ['NLP', 'Computer Vision', 'Deep Learning', 'LLM Fine-Tuning'],
  },
  {
    category: 'Security',
    items: ['Prompt Injection', 'Jailbreaking', 'PII Extraction', 'Alignment Analysis'],
  },
  {
    category: 'Tools',
    items: ['Linux', 'Git', 'CUDA', 'OpenCV', 'Next.js', 'React'],
  },
];

export const education: Education[] = [
  {
    degree: 'BSc Computer Science',
    institution: 'Kathmandu University',
    period: '2025 - 2029',
    focus: 'Data Structures, Algorithms, Linear Algebra, Calculus',
  },
  {
    degree: 'Independent Learning',
    institution: 'Self-Directed',
    period: '2024 - Present',
    focus: 'Deep Learning and AI Security',
    concentration: 'Deep Learning and AI Security',
  },
];
