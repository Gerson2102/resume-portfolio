'use client'

import { LazyMotion, domMax } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Loads Framer Motion's feature set once via `LazyMotion` so every section can
 * use the lightweight `m.*` components (smaller bundle than `motion.*`).
 * `domMax` is required because the OSS carousel uses `layout` animations.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>
}
