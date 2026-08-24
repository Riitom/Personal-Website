# Riitom Modak — Personal Portfolio

A modern, responsive portfolio built to present my background, technical skills, and selected projects in a polished interactive experience. The current design uses a liquid-glass visual system, lightweight 3D motion, and React Bits-inspired interactions while keeping the content focused on AI, machine learning, computer vision, and Python development.

## Repository Description

> A liquid-glass React portfolio with 3D motion, interactive React Bits effects, and AI/ML-focused projects.

## Highlights

- Liquid-glass interface with translucent panels, soft reflections, and a lighter green accent system
- Interactive `RIITOM MODAK` hero title with variable-font pressure effects
- Animated WebGL prism accent powered by OGL
- Gooey navigation with fluid active-state particles
- Compact 3D skill cards with cursor-responsive tilt, spotlight, and depth
- Project cards with pointer-tracking border glow
- Word-by-word scroll reveals and a smooth page progress indicator
- Click sparks on links, buttons, and other interactive controls
- Responsive layouts for desktop, tablet, and mobile screens
- Light and dark themes with saved theme preference
- Reduced-motion support for visitors who prefer fewer animations
- Direct GitHub, LinkedIn, email, and project links

## React Bits-Inspired Effects

The redesign adapts selected React Bits concepts to the existing TypeScript and Framer Motion architecture:

| Effect | Usage |
| --- | --- |
| TextPressure | Interactive hero name |
| GradientText | AI and ML focus line |
| Prism | WebGL hero artwork |
| GooeyNav | Desktop navigation |
| MagicBento | 3D skill-card interactions |
| BorderGlow | Project-card edge lighting |
| ScrollReveal | About-section text animation |
| ClickSpark | Feedback for clickable controls |

The components were adapted to match this portfolio's green design system, accessibility preferences, and responsive behavior.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- OGL
- Lucide React
- React Router
- ESLint

## Website Sections

### Hero

Introduces Riitom Modak with an interactive variable-font title, an AI/ML-focused summary, availability information, official social logos, and a subtle WebGL prism.

### About and Skills

Describes my background as a B.Tech Computer Science and Engineering student and presents my frontend, backend, programming-language, and development-tool skills in compact 3D cards.

### Projects

The portfolio currently presents:

1. **AI-Assisted Scrap Detection And Weight Estimation**

   A YOLO, FastAPI, and React-based inspection system for material detection, estimated weight ranges, and auditable inspection history.

   Repository: [AI-Assisted Scrap Detection And Weight Estimation](https://github.com/Riitom/AI-Assisted-Scrap-Detection-And-Weight-Estimation)

2. **Project Beta — Personal Website**

   This responsive liquid-glass portfolio, built with React, TypeScript, Tailwind CSS, Framer Motion, and OGL.

   Repository: [Personal Website](https://github.com/Riitom/Personal-Website)

3. **Project Gamma — Home Temperature Monitor**

   A smart room-temperature monitoring and control concept using Python, Raspberry Pi, TensorFlow, and machine learning.

### Contact

Provides direct ways to connect through email, GitHub, and LinkedIn.

## Project Structure

```text
Personal-Website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── reactbits/
│   │   │   ├── BorderGlow.tsx
│   │   │   ├── ClickSpark.tsx
│   │   │   ├── GooeyNav.tsx
│   │   │   ├── GradientText.tsx
│   │   │   ├── Prism.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── SkillBento.tsx
│   │   │   └── TextPressure.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LiquidBackdrop.tsx
│   │   ├── Navbar.tsx
│   │   └── ProjectsSection.tsx
│   ├── pages/
│   ├── index.css
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

Clone the repository and install its dependencies:

```sh
git clone https://github.com/Riitom/Personal-Website.git
cd Personal-Website
npm install
```

Start the local development server:

```sh
npm run dev
```

Vite will print the local address in the terminal, normally `http://localhost:5173`.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build |
| `npm run build:dev` | Create a development-mode build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npx tsc --noEmit` | Run the TypeScript type-check |

## Verification

Before changes are published, the project is checked with:

```sh
npm run lint
npx tsc --noEmit
npm run build
npm audit
```

The major liquid-glass update passes linting, TypeScript validation, and the production build. The dependency audit reports no known vulnerabilities at the time of this update.

## Accessibility and Performance

- Decorative canvases are excluded from the accessibility tree.
- Social links include descriptive labels and use safe external-link attributes.
- Motion-heavy effects respect the `prefers-reduced-motion` setting.
- WebGL rendering pauses when the prism is outside the viewport.
- ClickSpark renders only while sparks are active and responds only to interactive controls.
- Layouts and typography adapt to smaller screens without requiring horizontal scrolling.

## Deployment

The website produces a static Vite build and can be deployed to services such as Vercel, Netlify, or Cloudflare Pages.

Recommended settings:

```text
Build command: npm run build
Output directory: dist
```

If the deployment platform does not automatically support single-page applications, configure a fallback rewrite to `index.html`.

## Contact

- GitHub: [github.com/Riitom](https://github.com/Riitom)
- LinkedIn: [linkedin.com/in/riitom-modak-b018a131a](https://www.linkedin.com/in/riitom-modak-b018a131a/)
- Email: [riitom09@gmail.com](mailto:riitom09@gmail.com)

## Acknowledgements

Interaction concepts were inspired by [React Bits](https://www.reactbits.dev/) and adapted for this portfolio's design system and TypeScript architecture.
