/**
 * @fileoverview AnimationManager — complete GSAP + Lenis + SplitType animation system.
 *
 * Usage (vanilla):
 *   import { AnimationManager } from './AnimationManager.js'
 *   const am = new AnimationManager()
 *   am.init()
 *
 * Usage (Next.js / React):
 *   See ../../hooks/useAnimationManager.js
 *
 * HTML data attributes
 *   data-hero-title         → character-by-character reveal
 *   data-hero-subtitle      → fade-in after title finishes
 *   data-hero-cta           → fade-in last
 *   data-hero-image         → parallax + scale on scroll
 *   data-count="42"         → count-up animation
 *   data-count-suffix="%"   → appended to count value
 *   data-count-decimals="1" → decimal places
 *   data-rotate-on-scroll   → velocity-based z-rotation
 *   data-magnetic-strength  → 0–1 pull strength (default 0.35)
 *
 * CSS classes (all prefixed am-)
 *   .am-fade-up             → fade + slide-up on scroll enter
 *   .am-cards               → container; direct .am-card children stagger in
 *   .am-card                → individual stagger card
 *   .am-img-reveal          → clip-path wipe reveal
 *   .am-3d-section          → rotateX + fade on scroll enter
 *   .am-perspective         → mouse-driven 3-D tilt (hover)
 *   .am-btn                 → scale hover + click ripple
 *   .am-magnetic            → cursor-following magnetic pull
 *   .am-carousel-wrapper    → pinned horizontal scroll root
 *   .am-carousel-track      → flex container that moves
 *   .am-carousel-item       → one slide
 *   .am-carousel-img        → image inside slide (scales on hover)
 *   .am-carousel-content    → overlay inside slide (lifts on hover)
 */

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// ─── Default configuration ────────────────────────────────────────────────────

const DEFAULTS = {
  lenis: {
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)), // easeOutExpo
    touchMultiplier: 1.5,
    smoothWheel: true,
  },
  hero: {
    charStagger: 0.08,
    subtitleDelay: 0.5,
    parallaxY: -200,
    parallaxScale: 1.2,
  },
  scroll: {
    fadeStart: 'top 85%',
    cardX: 30,
  },
  nav: {
    hideThreshold: 0.25,
    showThreshold: -0.25,
  },
}

// ─── AnimationManager ─────────────────────────────────────────────────────────

export class AnimationManager {
  /**
   * @param {object} [options] - Deep-merge over DEFAULTS.
   */
  constructor(options = {}) {
    this.cfg = {
      lenis: { ...DEFAULTS.lenis, ...options.lenis },
      hero: { ...DEFAULTS.hero, ...options.hero },
      scroll: { ...DEFAULTS.scroll, ...options.scroll },
      nav: { ...DEFAULTS.nav, ...options.nav },
    }

    /** @type {import('lenis').default | null} */
    this.lenis = null

    /** @type {import('split-type').default[]} */
    this._splits = []

    /** @type {Array<() => void>} */
    this._cleanups = []

    /** @type {((time: number) => void) | null} */
    this._gsapTicker = null

    this._reducedMotion =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
  }

  // ─── Public API ─────────────────────────────────────────────────────────────

  /**
   * Boot the animation system.
   * Must be called inside a browser context (useEffect / DOMContentLoaded).
   * @returns {Promise<AnimationManager>}
   */
  async init() {
    if (typeof window === 'undefined') return this

    if (this._reducedMotion) {
      document.documentElement.dataset.reducedMotion = 'true'
      return this
    }

    gsap.registerPlugin(ScrollTrigger)

    await this._initLenis()
    this._injectProgressBar()
    this._initHeroAnimations()
    this._initScrollAnimations()
    this._initButtons()
    this._initPerspective()
    this._initCarousel()
    this._initCountUp()

    ScrollTrigger.refresh()

    return this
  }

  /**
   * Tear down everything: kills all ScrollTriggers, destroys Lenis,
   * removes event listeners, reverts SplitType instances.
   */
  destroy() {
    this._cleanups.forEach(fn => fn())
    this._cleanups = []

    this._splits.forEach(s => s.revert())
    this._splits = []

    ScrollTrigger.getAll().forEach(t => t.kill())

    if (this.lenis) {
      this.lenis.destroy()
      this.lenis = null
    }

    if (this._gsapTicker) {
      gsap.ticker.remove(this._gsapTicker)
      this._gsapTicker = null
    }
  }

  /**
   * Re-calculate ScrollTrigger positions (call after a layout shift or
   * dynamic content load).
   */
  refresh() {
    ScrollTrigger.refresh()
  }

  // ─── Smooth scroll ───────────────────────────────────────────────────────────

  /**
   * @private
   * Initialise Lenis and wire it into the GSAP ticker + ScrollTrigger.
   */
  async _initLenis() {
    const { default: Lenis } = await import('lenis')

    this.lenis = new Lenis(this.cfg.lenis)

    this._gsapTicker = time => this.lenis.raf(time * 1000)
    gsap.ticker.add(this._gsapTicker)
    gsap.ticker.lagSmoothing(0)

    this.lenis.on('scroll', ScrollTrigger.update)

    this._cleanups.push(() => {
      this.lenis?.off('scroll', ScrollTrigger.update)
    })
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────

  /**
   * @private
   * Inject a thin progress bar at the bottom of the <header>.
   * The bar scales from 0 → 1 as the page scrolls.
   */
  _injectProgressBar() {
    const nav = document.querySelector('header')
    if (!nav || nav.querySelector('.am-progress-bar')) return

    const bar = Object.assign(document.createElement('div'), {
      className: 'am-progress-bar',
    })
    nav.appendChild(bar)

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.25,
      },
    })
  }

  /**
   * @private
   * Hide the nav on fast downward scroll; reveal it on upward scroll.
   * Uses Lenis velocity for smooth detection.
   */
  _initNavBehavior() {
    const nav = document.querySelector('header')
    if (!nav || !this.lenis) return

    let lastScroll = 0
    let hidden = false

    const onScroll = ({ scroll, velocity }) => {
      if (scroll <= 80) {
        if (hidden) {
          gsap.to(nav, { y: 0, duration: 0.4, ease: 'power3.out' })
          hidden = false
        }
        lastScroll = scroll
        return
      }

      if (velocity > this.cfg.nav.hideThreshold && scroll > lastScroll && !hidden) {
        gsap.to(nav, { y: '-100%', duration: 0.3, ease: 'power3.in' })
        hidden = true
      } else if (velocity < this.cfg.nav.showThreshold && scroll < lastScroll && hidden) {
        gsap.to(nav, { y: 0, duration: 0.45, ease: 'power3.out' })
        hidden = false
      }

      lastScroll = scroll
    }

    this.lenis.on('scroll', onScroll)
    this._cleanups.push(() => this.lenis?.off('scroll', onScroll))
  }

  // ─── Hero ────────────────────────────────────────────────────────────────────

  /**
   * @private
   * Animate hero elements using SplitType for character-level reveals.
   */
  async _initHeroAnimations() {
    const titleEl = document.querySelector('[data-hero-title]')
    const subtitleEl = document.querySelector('[data-hero-subtitle]')
    const ctaEl = document.querySelector('[data-hero-cta]')
    const imageEl = document.querySelector('[data-hero-image]')

    // ── Title: character-by-character reveal ─────────────────────────────────
    if (titleEl) {
      const { default: SplitType } = await import('split-type')
      const split = new SplitType(titleEl, { types: 'chars,words' })
      this._splits.push(split)

      gsap.set(split.chars, { willChange: 'transform, opacity' })
      gsap.from(split.chars, {
        y: '105%',
        opacity: 0,
        rotateX: -80,
        stagger: this.cfg.hero.charStagger,
        duration: 0.7,
        ease: 'back.out(1.4)',
        delay: 0.15,
      })
    }

    // ── Subtitle: delayed fade-in ─────────────────────────────────────────────
    if (subtitleEl) {
      const charCount = titleEl?.querySelectorAll('.char').length ?? 10
      const delay =
        0.15 + charCount * this.cfg.hero.charStagger + this.cfg.hero.subtitleDelay

      gsap.from(subtitleEl, {
        opacity: 0,
        y: 18,
        duration: 0.65,
        delay,
        ease: 'power3.out',
      })
    }

    // ── CTA: fades in last ────────────────────────────────────────────────────
    if (ctaEl) {
      const charCount = titleEl?.querySelectorAll('.char').length ?? 10
      const delay = 0.15 + charCount * this.cfg.hero.charStagger + this.cfg.hero.subtitleDelay + 0.3

      gsap.from(ctaEl, {
        opacity: 0,
        y: 14,
        duration: 0.6,
        delay,
        ease: 'power3.out',
      })
    }

    // ── Image: parallax + scale scrub ─────────────────────────────────────────
    if (imageEl) {
      gsap.to(imageEl, {
        y: this.cfg.hero.parallaxY,
        scale: this.cfg.hero.parallaxScale,
        ease: 'none',
        scrollTrigger: {
          trigger: imageEl.closest('section') ?? imageEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }

  // ─── Scroll-triggered animations ─────────────────────────────────────────────

  /**
   * @private
   * Wire up all scroll-triggered class-based animations.
   */
  _initScrollAnimations() {
    const { fadeStart, cardX } = this.cfg.scroll

    // ── .am-fade-up ───────────────────────────────────────────────────────────
    gsap.utils.toArray('.am-fade-up').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: fadeStart,
          toggleActions: 'play none none none',
        },
      })
    })

    // ── .am-cards > .am-card: staggered x±offset ──────────────────────────────
    gsap.utils.toArray('.am-cards').forEach(container => {
      const cards = gsap.utils.toArray('.am-card', container)
      if (!cards.length) return

      gsap.from(cards, {
        opacity: 0,
        y: 28,
        x: i => (i % 2 === 0 ? -cardX : cardX),
        stagger: 0.09,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    })

    // ── .am-img-reveal: clip-path wipe ────────────────────────────────────────
    gsap.utils.toArray('.am-img-reveal').forEach(img => {
      gsap.from(img, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    })

    // ── .am-3d-section: perspective entrance ─────────────────────────────────
    gsap.utils.toArray('.am-3d-section').forEach(section => {
      gsap.from(section, {
        rotateX: 10,
        y: 60,
        opacity: 0,
        transformPerspective: 1000,
        transformOrigin: 'top center',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })
  }

  // ─── Buttons ────────────────────────────────────────────────────────────────

  /**
   * @private
   * Attach scale hover, elastic return, and ripple click to .am-btn elements.
   * Also initialises magnetic pull for .am-magnetic elements.
   */
  _initButtons() {
    // Scale hover — delegated so dynamically added buttons work
    this._cleanups.push(
      this._delegate('mouseenter', '.am-btn', e => {
        gsap.to(e.target.closest('.am-btn'), {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out',
        })
      }),
      this._delegate('mouseleave', '.am-btn', e => {
        gsap.to(e.target.closest('.am-btn'), {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        })
      }),
      this._delegate('click', '.am-btn', e => this._spawnRipple(e))
    )

    // Magnetic pull for .am-magnetic
    document.querySelectorAll('.am-magnetic').forEach(el => this._attachMagnetic(el))
  }

  /**
   * @private
   * Spawn an expanding ripple circle at the pointer position.
   * @param {MouseEvent} e
   */
  _spawnRipple(e) {
    const btn = e.target.closest('.am-btn')
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2.2
    const ripple = Object.assign(document.createElement('span'), {
      className: 'am-ripple',
    })
    ripple.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${e.clientX - rect.left - size / 2}px`,
      `top:${e.clientY - rect.top - size / 2}px`,
    ].join(';')
    btn.appendChild(ripple)

    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 0.4 },
      {
        scale: 1,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      }
    )
  }

  /**
   * @private
   * Attach cursor-following magnetic pull to a single element.
   * @param {HTMLElement} el
   */
  _attachMagnetic(el) {
    const strength = parseFloat(el.dataset.magneticStrength ?? '0.35')

    const onMove = e => {
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - rect.left - rect.width / 2) * strength
      const dy = (e.clientY - rect.top - rect.height / 2) * strength
      gsap.to(el, { x: dx, y: dy, duration: 0.5, ease: 'power3.out' })
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    this._cleanups.push(() => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    })
  }

  // ─── 3D perspective ──────────────────────────────────────────────────────────

  /**
   * @private
   * Mouse-driven 3-D tilt for .am-perspective elements.
   * Velocity-based z-rotation for [data-rotate-on-scroll] elements.
   */
  _initPerspective() {
    // Mouse tilt
    document.querySelectorAll('.am-perspective').forEach(el => {
      const onMove = e => {
        const rect = el.getBoundingClientRect()
        const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -7
        const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 7
        gsap.to(el, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      const onLeave = () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.65,
          ease: 'elastic.out(1, 0.5)',
        })
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      this._cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    })

    // Velocity-based z-rotation on scroll
    if (!this.lenis) return
    document.querySelectorAll('[data-rotate-on-scroll]').forEach(el => {
      const speed = parseFloat(el.dataset.rotateOnScroll ?? '1')

      const onScroll = ({ velocity }) => {
        gsap.to(el, {
          rotateZ: velocity * speed * 2.5,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      this.lenis.on('scroll', onScroll)
      this._cleanups.push(() => this.lenis?.off('scroll', onScroll))
    })
  }

  // ─── Horizontal carousel ─────────────────────────────────────────────────────

  /**
   * @private
   * Pinned horizontal scroll carousel.
   * Expects:
   *   .am-carousel-wrapper  (height: 100vh, overflow: hidden)
   *   .am-carousel-track    (display: flex, width: auto)
   *   .am-carousel-item     (flex-shrink: 0)
   */
  _initCarousel() {
    const wrapper = document.querySelector('.am-carousel-wrapper')
    const track = document.querySelector('.am-carousel-track')
    if (!wrapper || !track) return

    const items = gsap.utils.toArray('.am-carousel-item', track)
    if (items.length < 2) return

    const getTotalMove = () => track.scrollWidth - window.innerWidth

    gsap.to(track, {
      x: () => -getTotalMove(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        start: 'top top',
        end: () => `+=${getTotalMove()}`,
        scrub: 1,
        snap: {
          snapTo: 1 / (items.length - 1),
          duration: { min: 0.2, max: 0.4 },
          ease: 'power1.inOut',
        },
        invalidateOnRefresh: true,
      },
    })

    // Per-card hover: image scale + content lift
    items.forEach(item => {
      const img = item.querySelector('.am-carousel-img')
      const content = item.querySelector('.am-carousel-content')

      if (img) {
        item.addEventListener('mouseenter', () =>
          gsap.to(img, { scale: 1.07, duration: 0.4, ease: 'power2.out' })
        )
        item.addEventListener('mouseleave', () =>
          gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' })
        )
      }

      if (content) {
        item.addEventListener('mouseenter', () =>
          gsap.to(content, { y: -8, duration: 0.3, ease: 'power2.out' })
        )
        item.addEventListener('mouseleave', () =>
          gsap.to(content, { y: 0, duration: 0.4, ease: 'power2.out' })
        )
      }
    })
  }

  // ─── Count-up ────────────────────────────────────────────────────────────────

  /**
   * @private
   * Animate numeric text from 0 → data-count when element scrolls into view.
   *
   * @example
   *   <span data-count="48" data-count-suffix="+" data-count-decimals="0">0</span>
   */
  _initCountUp() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count)
      const suffix = el.dataset.countSuffix ?? ''
      const decimals = parseInt(el.dataset.countDecimals ?? '0', 10)
      const proxy = { val: 0 }

      gsap.to(proxy, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate() {
          el.textContent = proxy.val.toFixed(decimals) + suffix
        },
      })
    })
  }

  // ─── Utilities ───────────────────────────────────────────────────────────────

  /**
   * Attach a delegated event listener on document and return a cleanup fn.
   * @param {string} event
   * @param {string} selector
   * @param {(e: Event) => void} handler
   * @returns {() => void}
   */
  _delegate(event, selector, handler) {
    const fn = e => { if (e.target?.closest(selector)) handler(e) }
    document.addEventListener(event, fn)
    return () => document.removeEventListener(event, fn)
  }
}

// ─── Convenience factory ──────────────────────────────────────────────────────

/**
 * Create, init, and return a singleton AnimationManager.
 * @param {object} [options]
 * @returns {Promise<AnimationManager>}
 */
export async function createAnimationManager(options = {}) {
  const am = new AnimationManager(options)
  await am.init()
  return am
}
