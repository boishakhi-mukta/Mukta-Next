# AnimationManager

Complete GSAP + Lenis + SplitType animation system for the Boishakhi portfolio.

## Dependencies

| Package | Version | Role |
|---|---|---|
| `gsap` | ≥ 3.12 | Core animations + ScrollTrigger |
| `lenis` | ≥ 1.0 | Smooth momentum scrolling |
| `split-type` | ≥ 0.3 | Character/word text splitting |

```bash
npm install gsap lenis split-type
```

---

## File overview

```
src/lib/animations/
  AnimationManager.js   ← core class (import this)
  animations.css        ← required supporting styles
  example.html          ← standalone CDN demo
  README.md             ← this file

src/hooks/
  useAnimationManager.js  ← React hook for Next.js

src/components/Motion/
  LenisProvider.jsx       ← wraps the app; provides smooth scroll context
```

---

## Next.js integration (recommended)

### 1. Wrap your app with LenisProvider

```jsx
// src/components/Theme/Providers.jsx
import LenisProvider from '@/components/Motion/LenisProvider'

export default function Providers({ children }) {
  return (
    <ThemeProvider ...>
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  )
}
```

### 2. Import the CSS in globals.css

```css
/* src/app/globals.css */
@import '../lib/animations/animations.css';
```

### 3. Use the hook on a page or layout

```jsx
'use client'
import { useAnimationManager } from '@/hooks/useAnimationManager'

export default function Page() {
  useAnimationManager()  // boots on mount, cleans up on unmount
  return <main>...</main>
}
```

---

## HTML API — data attributes

Add these to elements in your JSX/HTML:

| Attribute | Element | Effect |
|---|---|---|
| `data-hero-title` | heading | Character-by-character staggered reveal |
| `data-hero-subtitle` | any | Fades in after title completes |
| `data-hero-cta` | wrapper div | Fades in last (buttons group) |
| `data-hero-image` | img / div | Parallax y-translate + scale on scroll |
| `data-count="42"` | span | Counts up from 0 when visible |
| `data-count-suffix="+"` | span | Appended string (e.g. `42+`) |
| `data-count-decimals="1"` | span | Decimal places (default: 0) |
| `data-rotate-on-scroll` | any | Rotates on Z axis with scroll velocity |
| `data-magnetic-strength="0.4"` | `.am-magnetic` | Pull strength 0–1 (default 0.35) |

### Example

```html
<h1 data-hero-title>Hello, I'm <em>Boishakhi</em></h1>
<p data-hero-subtitle>Software Engineer based in Oslo</p>
<div data-hero-cta>
  <button class="am-btn am-magnetic">See My Work</button>
</div>
<span data-count="48" data-count-suffix="+">0</span>
```

---

## CSS class API

### Scroll animations

| Class | Effect |
|---|---|
| `.am-fade-up` | Fades in + slides up when scrolled into view |
| `.am-cards` | Parent container — children `.am-card` stagger in with ±x offset |
| `.am-card` | Individual stagger card |
| `.am-img-reveal` | Clip-path wipe reveal from bottom to top |
| `.am-3d-section` | RotateX + fade entrance on scroll |

### Buttons

| Class | Effect |
|---|---|
| `.am-btn` | Scale hover (×1.05) + elastic return + ripple on click |
| `.am-magnetic` | Cursor-following magnetic pull (combine with `.am-btn`) |

### Carousel

```html
<div class="am-carousel-wrapper">         <!-- pinned scroll root -->
  <div class="am-carousel-track">         <!-- flex row that translates -->
    <div class="am-carousel-item">        <!-- one slide -->
      <img class="am-carousel-img" />     <!-- scales on hover -->
      <div class="am-carousel-content">  <!-- lifts on hover -->
        <h3>Project Title</h3>
        <p>Tech stack</p>
      </div>
    </div>
  </div>
</div>
```

### Other

| Class | Effect |
|---|---|
| `.am-perspective` | Mouse-driven 3D tilt (rotateX / rotateY) |
| `.am-gpu` | Forces GPU layer (`translateZ(0)`) |
| `.am-stat` | Stat card layout wrapper |
| `.am-stat-value` | Large count-up number |
| `.am-stat-label` | Small label beneath number |

---

## Configuration

Override defaults via the options object:

```js
const manager = new AnimationManager({
  lenis: {
    duration: 1.5,            // scroll duration in seconds
    touchMultiplier: 2,       // mobile scroll sensitivity
  },
  hero: {
    charStagger: 0.06,        // seconds between each character
    subtitleDelay: 0.3,       // extra delay after last char
    parallaxY: -150,          // px the hero image moves up
    parallaxScale: 1.15,      // scale the image reaches at bottom
  },
  scroll: {
    fadeStart: 'top 80%',     // ScrollTrigger start for fade-up
    cardX: 20,                // horizontal offset for card stagger
  },
  nav: {
    hideThreshold: 0.3,       // velocity to trigger hide
    showThreshold: -0.3,      // velocity to trigger show
  },
})
```

---

## Accessibility

When `prefers-reduced-motion: reduce` is set:

- All GSAP animations are **skipped entirely**
- Hidden elements are immediately shown (`opacity: 1`, `transform: none`)
- Lenis still provides smooth scroll (it respects the OS setting internally)
- The `data-reduced-motion="true"` attribute is set on `<html>` for CSS hooks

---

## Performance notes

- All animated elements use `will-change: transform, opacity` (set via CSS)
- ScrollTrigger refresh is called once after `init()` completes
- Lenis is synced to GSAP's internal ticker — no `requestAnimationFrame` conflicts
- Magnetic + perspective effects are disabled on coarse-pointer (touch) devices via CSS
- `gsap.ticker.lagSmoothing(0)` prevents stutter after browser tab focus changes

---

## Adding the hero data-attributes to existing components

In `Home.jsx`, add attributes to the JSX elements:

```jsx
<h1 data-hero-title ...>
  Hello, I'm <span ...>Boishakhi</span>
</h1>
<h2 data-hero-subtitle ...>
  <Typewriter ... />
</h2>
<div data-hero-cta ...>
  <button ...>See My Works</button>
  <a ...>Download CV</a>
</div>
```

> Note: SplitType will split the `data-hero-title` element into `.char` spans.
> The gradient `<span>` inside the heading is preserved — SplitType wraps
> characters inside inline elements too.

---

## Refresh after route change

If using Next.js App Router with `useAnimationManager`:

```jsx
'use client'
import { usePathname } from 'next/navigation'
import { useAnimationManager } from '@/hooks/useAnimationManager'
import { useEffect } from 'react'

export default function Layout({ children }) {
  const ref = useAnimationManager()
  const path = usePathname()

  useEffect(() => {
    ref.current?.refresh()
  }, [path])

  return <>{children}</>
}
```
