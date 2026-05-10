import { Project, Experience, Skill, Education, Blog, Publication } from '../types';

export const personalInfo = {
  name: 'Manjit Pokhrel',
  location: 'Nepal',
  email: 'manjitpokhrel42@gmail.com',
  github: 'https://github.com/manjitpokhrel',
  linkedin: 'https://linkedin.com/in/manjitpokhrel',
  x: 'https://x.com/manjitpokhrel_',
  website: 'https://manjitpokhrel.com.np',
  bio: 'Adversarial ML researcher. GPU kernel optimization. Low-resource NLP security.',
};

export const researchInterests: string[] = [
  'Adversarial Machine Learning',
  'AI Safety & Alignment',
  'Low-Resource Language Security',
  'GPU Kernel Optimization',
  'LLM Inference Efficiency',
  'Mechanistic Interpretability',
];

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Lost in Translation: Safety Alignment Failures in Nepali and Code-Switched Variants of Instruction-Tuned Large Language Models',
    meta: 'Pokhrel, M. · Zenodo · April 2026',
    doi: 'https://doi.org/10.5281/zenodo.19764520',
    github: 'https://github.com/manjitpokhrel/NASB-Nepali-Safety'
  },
  {
    id: '2',
    title: 'Google AI VRP — alignment bypass via Nepali/code-switched input in instruction-tuned LLMs',
    meta: 'Triaged · 2026'
  },
  {
    id: '3',
    title: 'Meta Whitehat — safety asymmetry in multilingual LLM inference',
    meta: 'Submitted · 2026'
  },
  {
    id: '4',
    title: 'GhostWeight: Training-Free Activation Sparsity for LLM Inference on Consumer Hardware',
    meta: 'PyPI · GitHub · May 2026',
    pypi: 'https://pypi.org/project/ghostweight/',
    github: 'https://github.com/manjitpokhrel/GhostWeight'
  }
];

export const projects: Project[] = [
  {
    id: 'p1',
    slug: 'nasb',
    title: 'NASB — Nepali Adversarial Safety Benchmark',
    badge: 'RESEARCH',
    highlights: [
      '1,200+ adversarial probes across 5 harm categories',
      '0% bypass in English → 73.7% in Nepali',
      'Introduced Vajra Morphing sub-tokenization attack',
    ],
    tags: ['NEPALI-NLP', 'ADVERSARIAL-ML', 'SAFETY-ALIGNMENT', 'VAJRA-MORPHING', 'ZENODO'],
    fullDescription: 'First structured adversarial safety benchmark for Nepali LLMs. 1,200+ adversarial probes across 5 harm categories and 5 linguistic registers. Core finding: 0% bypass in English → 73.7% in Nepali (Qwen-2.5-7B, Gemma-4, Llama-3.1-8B). Introduced Vajra Morphing — novel attack exploiting sub-tokenization gaps in Devanagari/Latin code-switching. Identified three failure modes: Semantic Drift, Persona Collapse, Politeness Override.',
  },
  {
    id: 'p2',
    slug: 'ghostweight',
    title: 'GhostWeight',
    badge: 'LIBRARY',
    highlights: [
      '38.35% to 110.53% speedup on consumer hardware',
      '95.8% CUDA kernel efficiency',
      'Qwen2.5-72B on single RTX 5060 (8GB)',
    ],
    tags: ['CUDA', 'ACTIVATION-SPARSITY', 'RTX-5060', 'BLACKWELL', 'GPU-OPTIMIZATION', 'PYPI'],
    fullDescription: 'Training-free activation sparsity for LLM inference on consumer hardware. 27.3% of MLP neurons in Qwen2.5-7B never fire — permanently removed via static dead neuron masking. Results: +38.35% speedup at 0% perplexity cost (static mask); +74.71% speedup at threshold=0.05; +110.53% speedup at threshold=0.10. Sparse row-packing CUDA kernel: 95.8% of theoretical maximum efficiency. Ran Qwen2.5-72B on single RTX 5060 (8GB).',
  },
  {
    id: '2',
    slug: 'llm-red-teaming',
    title: 'LLM Red Teaming',
    badge: 'Security',
    highlights: [
      'Systematic prompt injection and jailbreak evaluation',
      'Findings directly informed NASB benchmark design',
      'Reproducible benchmarking pipeline with Unsloth',
    ],
    tags: ['AI-SECURITY', 'RED-TEAMING', 'LLMs', 'RESPONSIBLE-DISCLOSURE', 'GOOGLE-VRP'],
    fullDescription: 'Systematic prompt injection and jailbreak evaluation across Gemma, Qwen, and Ollama. Identified PII leakage, restricted code generation bypass, and alignment failure modes. Reproducible benchmarking pipeline built with HuggingFace + Unsloth. Findings directly informed NASB benchmark design. Disclosed to Google AI VRP (triaged as alignment bypass) and Meta Whitehat.',
  },
  {
    id: '3',
    slug: 'peft-qwen',
    title: 'Parameter-Efficient Fine-Tuning — Attack Surface Analysis',
    badge: 'Research',
    highlights: [
      'LoRA fine-tuning attack surface analysis on Qwen',
      'Measured alignment robustness degradation',
      'Identified potential supply chain attack vectors',
    ],
    tags: ['LORA', 'PEFT', 'CUDA', 'SUPPLY-CHAIN-SECURITY', 'QWEN'],
    fullDescription: 'LoRA fine-tuning attack surface analysis on Qwen. Measured alignment robustness degradation pre/post safety tuning. Identified activation modifications that produce safety bypasses surviving LoRA fine-tuning — potential supply chain attack vector in open-weight model ecosystem.',
  },
  {
    id: '1',
    slug: 'minigpt',
    title: 'MiniGPT',
    badge: 'Core ML',
    highlights: [
      '211K parameter GPT-style transformer in pure NumPy',
      'Manual backpropagation from scratch',
      'Built to understand transformer internals at gradient level',
    ],
    tags: ['Python', 'NumPy', 'Deep Learning', 'Transformers'],
    fullDescription: '211K parameter GPT-style transformer in pure NumPy — no autograd. Manual backpropagation, multi-head self-attention, positional encoding, tokenization from scratch. Trained on 1.1M character corpus. Loss: 4.0 → 1.6. Built to understand transformer internals at the gradient level before working with production LLMs.',
  },
];

export const blogs: Blog[] = [];

export const experiences: Experience[] = [
  {
    role: 'Independent AI Security Researcher',
    company: 'Self-employed',
    period: 'Late 2025 – Present',
    description: 'Introduced NASB — first adversarial safety benchmark for Nepali LLMs: 73.7% bypass rate in Nepali vs 0% in English. Coined Vajra Morphing: novel sub-tokenization attack via Devanagari/Latin code-switching. Published on Zenodo (DOI: 10.5281/zenodo.19764520). Disclosed to Google AI VRP (triaged) and Meta Whitehat. Built GhostWeight — training-free LLM inference optimization: 110% speedup on RTX 5060 via activation sparsity, 95.8% kernel efficiency. Published on PyPI May 2026.',
  },
];

export const skills: Skill[] = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'JavaScript', 'SQL'],
  },
  {
    category: 'ML & Research Tools',
    items: ['PyTorch', 'NumPy', 'HuggingFace', 'PEFT', 'Unsloth', 'llama.cpp', 'CuPy', 'Nsight Compute'],
  },
  {
    category: 'AI Domains',
    items: ['NLP', 'Deep Learning', 'LLM Fine-Tuning'],
  },
  {
    category: 'Adversarial Methods',
    items: ['Prompt Injection', 'Jailbreak Evaluation', 'Vajra Morphing', 'Supply Chain Attacks', 'Membership Inference', 'Responsible Disclosure'],
  },
  {
    category: 'Hardware & Systems',
    items: ['RTX 5060 Blackwell', 'CUDA 12.6', 'Activation Sparsity', 'Sparse Matrix Operations', 'Warp Divergence Analysis', 'Kernel Optimization'],
  },
  {
    category: 'Tools',
    items: ['Linux', 'Git', 'CUDA', 'FastAPI', 'Docker'],
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
