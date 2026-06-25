'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Synchronous read of the OS "reduce motion" setting. Safe to call inside an
 * effect (e.g. GSAP setup) where the value is needed immediately and once.
 */
export function getPrefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches
}

/**
 * Reactive hook for render-time motion decisions. Starts `false` (matching the
 * server render) and updates after mount, including if the OS setting changes.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
