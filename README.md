# Manjit Pokhrel Portfolio

A minimal, editorial-style portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## Features
- **Editorial Design**: Warm off-white background, near-black text, and high-quality serif typography.
- **Sectioned Layout**: Single-page anchored sections (Hero, Interests, Projects, Experience, Skills, Education).
- **Dynamic Routing**: Individual project detail pages with smooth transitions.
- **Responsive**: Fully optimized for mobile and desktop screens.
- **Animations**: Staggered reveal animations and smooth scroll effects using `motion/react`.

## Tech Stack
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion (via `motion` package)
- **Icons**: Lucide React
- **Routing**: React Router 7

## Setup and Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Design Choices
- **Colors**:
  - Background: `#F4EFE8` (Warm Off-white)
  - Text: `#18120E` (Near-black)
  - Accent: `#3B2215` (Deep Brown)
- **Typography**:
  - Headings: Cormorant (Serif)
  - Body: Lora (Serif)
  - Labels/Tags: JetBrains Mono (Monospace)

## Deployment to Vercel
This project is configured as a standard Vite SPA. To deploy to Vercel:
1. Connect your GitHub repository.
2. Vercel will auto-detect Vite.
3. Ensure the Build Command is `npm run build` and the Output Directory is `dist`.
