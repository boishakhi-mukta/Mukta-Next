'use client'

/**
 * @fileoverview useAnimationManager — React hook that boots AnimationManager
 * once on mount and destroys it cleanly on unmount.
 *
 * Usage:
 *   const amRef = useAnimationManager()
 *   // amRef.current is the AnimationManager instance (or null during SSR)
 */

import { useEffect, useRef } from 'react'
import { AnimationManager } from '@/lib/animations/AnimationManager'

/**
 * Boot and return a ref to the AnimationManager singleton.
 *
 * @param {ConstructorParameters<typeof AnimationManager>[0]} [options]
 * @returns {React.MutableRefObject<AnimationManager | null>}
 */
export function useAnimationManager(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const manager = new AnimationManager(options)
    manager.init()
    ref.current = manager

    return () => {
      manager.destroy()
      ref.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
