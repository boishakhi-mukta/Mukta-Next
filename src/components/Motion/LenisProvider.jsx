'use client'

/**
 * LenisProvider — wraps the app to provide smooth momentum scrolling via Lenis.
 *
 * Wire GSAP's ticker to Lenis so that ScrollTrigger and all scroll-based
 * GSAP animations receive accurate scroll positions.
 *
 * Place this inside your Providers component, wrapping all children.
 */

import { createContext, useContext, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)

/**
 * Access the Lenis instance anywhere inside LenisProvider.
 * @returns {React.MutableRefObject<import('lenis').default | null>}
 */
export function useLenis() {
  return useContext(LenisContext)
}

/**
 * @param {{ children: React.ReactNode }} props
 */
export default function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    let lenis
    let ticker

    const boot = async () => {
      const { default: Lenis } = await import('lenis')

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)), // easeOutExpo
        touchMultiplier: 1.5,
        smoothWheel: !reducedMotion,
      })

      lenisRef.current = lenis

      ticker = time => lenis.raf(time * 1000)
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)

      lenis.on('scroll', ScrollTrigger.update)
    }

    boot()

    return () => {
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update)
        lenis.destroy()
        lenisRef.current = null
      }
      if (ticker) gsap.ticker.remove(ticker)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}
