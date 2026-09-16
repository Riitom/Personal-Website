# Riitom Modak — Personal Portfolio

A scroll-led portfolio exploring my background, interests and work in Python, AI, machine learning and computer vision. Built with React and TypeScript, with a pitch-black dark theme, mint accents and restrained liquid-glass details.

## Repository description

> A cinematic React portfolio with a WebGL Prism, scroll-driven project stories, technical system diagrams and accessible motion.

## The experience

- **Opening scene:** a full-screen, low-grain React Bits Prism behind the interactive `RIITOM MODAK` variable-font title. It scrolls away with the page, without a pinned hold, release jump or simultaneous canvas zoom. Official GitHub and LinkedIn marks link to my profiles.
- **The person:** three reading-paced chapters covering my CSE background, Python/AI direction, and interests in photography, cars, motorcycles and engineering.
- **The workbench:** compact skill cards retain their hover tilt, spotlight and rounded glass treatment.
- **Ideas into impact:** a scroll-expanding frame introduces the projects. The background R progressively blurs and fades to keep the typography readable.
- **Selected work:** each project opens with a question and a horizontal title reveal, then unfolds through three stages. Its architecture diagram uses a gliding stage highlight, animated input-to-output signals, drawn connectors and a scroll-linked progress rail. The typography stays fixed as explanations crossfade. These are explanatory animations, not live metrics or generated project imagery.
- **The next chapter:** an open, full-width typographic contact section continues the narrative, with email and social links instead of a separate glass card.

Dark mode uses a true black page background with the colorful Prism and small project accents. Light mode and saved theme preference remain available.

## Featured projects

### 1. AI-Assisted Scrap Detection & Weight Estimation

An inspection workflow that separates YOLO26x material detection from geometric weight estimation. The FastAPI/React application keeps inspection evidence and results in SQLite for review and reruns.

Weight is an estimate based on area, fill ratio, thickness and material density—not a measurement obtained directly from the detector. Reliable estimates require calibration.

[Project repository](https://github.com/Riitom/AI-Assisted-Scrap-Detection-And-Weight-Estimation)

### 2. BORDER-SENSE AI

An MVP combining YOLO26x detection, ByteTrack tracking, DA-V2 Base relative depth, short-horizon trajectories and configured zones. Its event and policy layers support human review; the portfolio does not represent it as autonomous enforcement or a metric-distance system.

[Project repository](https://github.com/Riitom/Border-Sense)

### 3. ESP32 Smart Thermal Controller

A research and system-design project based on the supplied `Smart_Thermal_Controller_Technical_Report.md` PRD. The proposed architecture combines SHT35/DHT11 environmental readings, PIR and LD2410 mmWave occupancy sensing, and measured power/energy data.

Python training runs on a PC; compact inference on the ESP32 recommends a temperature target. A constrained deterministic controller owns AC, fan and heater actuation, including dwell times and fault handling. The portfolio labels evaluation as planned and does not claim measured energy savings, comfort results or a completed hardware deployment.

No public repository has been supplied for this project, so its call to action opens Contact. This is an **ESP32** design, not the previous Raspberry Pi description.

Project descriptions are maintained in `src/data/projects.ts`. Architecture summaries are in `src/components/ProjectVisual.tsx`. The scrap and BORDER-SENSE descriptions were checked against their repository documentation; the thermal description follows the supplied report. The diagrams explain documented or proposed workflows and are not screenshots of running applications.

## Motion and accessibility

- Lenis smooths wheel input on the native document scroller. Framer Motion reads the same animation clock; there is no nested scroll container, scroll snapping or forced chapter advance.
- Touch scrolling stays native. Keyboard navigation can interrupt wheel inertia. Section links retain URL hashes and move keyboard focus to their destinations.
- Reduced-motion preferences disable wheel smoothing, unpin the long scenes and reveal text immediately. Preference changes are handled while the page is open.
- Project narrative text stays in place while its emphasis and a progress rule change continuously. A small stage-change dead band avoids flicker near a boundary.
- The name effect runs only during hover easing while visible, with no per-character layout reads in its animation loop. It is disabled for coarse pointers and reduced motion.
- Prism rendering pauses outside the viewport and in hidden tabs; its drawing buffer is capped at 1.5 million pixels to limit high-DPI rendering cost. Resizing and live reduced-motion changes redraw correctly. The background and content remain usable without WebGL.
- Diagram signal animations pause off-screen and are disabled with reduced motion. Stage changes do not resize the text layout.
- ClickSpark responds to interactive controls, uses a viewport-sized canvas and stops drawing when the sparks finish.
- A skip link, descriptive link labels and visible keyboard focus states remain available.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lenis · OGL · Lucide React · React Router

The effects adapt concepts from [React Bits](https://www.reactbits.dev/): Prism, TextPressure, GradientText, GooeyNav, MagicBento, ScrollExpand, ScrollReveal, ClickSpark and GradualBlur. [Lenis](https://github.com/darkroomengineering/lenis) handles wheel interpolation.

## Local development

Use Node.js 22.12 or newer and npm.

```sh
git clone https://github.com/Riitom/Personal-Website.git
cd Personal-Website
npm ci
npm run dev
```

Open the local address printed by Vite. On Windows, use `npm.cmd` if PowerShell blocks the npm script shim.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run lint` | Check source with ESLint |
| `npm run typecheck` | Type-check both application and build configuration |
| `npm run build` | Build production assets into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test:e2e` | Run isolated Chrome browser checks |

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm audit
git diff --check
```

The Playwright configuration uses locally installed Google Chrome, starts its own Vite server on port 4173, and covers desktop, mobile and reduced-motion layouts. Tests check runtime errors, project links, overflow, expanding-frame geometry, R-logo blur, contact navigation and small wheel input. Screenshots and failure traces are written to ignored `test-results/` output. Automated checks do not guarantee identical performance on every physical device.

## Main files

```text
src/
  components/
    HeroSection.tsx       # Prism and interactive name
    StorySection.tsx      # Personal story and compact skills
    ProjectsSection.tsx   # Expanding introduction and project chapters
    ProjectVisual.tsx     # Scroll-linked technical architecture diagrams
    ContactSection.tsx    # Closing chapter
    SmoothScroll.tsx      # Shared scrolling and accessible anchors
    reactbits/            # Adapted interaction components
  data/projects.ts        # Project content and evidence boundaries
  cinematic.css           # Narrative layout and responsive theme
  index.css               # Base theme and glass interaction styles
tests/portfolio.spec.ts    # Browser regression checks
```

## Deployment

The app produces static assets. Keep the existing hosting setup and use:

```text
Build command: npm run build
Output directory: dist
```

Configure an `index.html` fallback if the hosting platform needs one for client-side routes. Building locally does not publish changes; deployment and GitHub pushes are separate steps.

## Contact

- [GitHub](https://github.com/Riitom)
- [LinkedIn](https://www.linkedin.com/in/riitom-modak-b018a131a/)
- [riitom09@gmail.com](mailto:riitom09@gmail.com)
