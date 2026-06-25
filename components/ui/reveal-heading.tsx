'use client'

import { createElement, useEffect, useRef } from 'react'
import SplitType from 'split-type'
import { gsap } from '@/lib/gsap'
import { getPrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'

interface RevealHeadingProps {
  /** Heading level to render. */
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  /** Plain text only — SplitType animates the characters. */
  children: string
}

/**
 * A heading whose characters fade/rise in on scroll via SplitType + GSAP.
 * Replaces the ~identical animation block previously copy-pasted across every
 * section. Renders the full text immediately; under reduced motion it simply
 * skips the animation (text stays visible).
 */
export function RevealHeading({ as = 'h2', className, children }: RevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (getPrefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const split = new SplitType(el, { types: 'chars' })
      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power2.out',
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return createElement(as, { ref, className }, children)
}
