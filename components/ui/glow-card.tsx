'use client'

import { useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
  borderHoverColor?: string
}

export function GlowCard({
  children,
  className,
  glowColor = 'rgba(14, 165, 233, 0.08)',
  glowSize = 500,
  borderHoverColor = 'rgba(14, 165, 233, 0.15)',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const disabledRef = useRef(false)

  useEffect(() => {
    const noHover = window.matchMedia('(hover: none)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    disabledRef.current = noHover || reducedMotion
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabledRef.current) return
    const glow = glowRef.current
    const card = cardRef.current
    if (!glow || !card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    glow.style.background = `radial-gradient(${glowSize}px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`
  }, [glowColor, glowSize])

  const handleMouseEnter = useCallback(() => {
    if (disabledRef.current) return
    const glow = glowRef.current
    const card = cardRef.current
    if (!glow || !card) return

    glow.style.opacity = '1'
    card.style.borderColor = borderHoverColor
  }, [borderHoverColor])

  const handleMouseLeave = useCallback(() => {
    if (disabledRef.current) return
    const glow = glowRef.current
    const card = cardRef.current
    if (!glow || !card) return

    glow.style.opacity = '0'
    card.style.borderColor = ''
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn('relative overflow-hidden', className)}
      style={{ transition: 'border-color 300ms ease' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow overlay — behind content */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0,
          transition: 'opacity 300ms ease',
          willChange: 'opacity',
        }}
        aria-hidden="true"
      />
      {/* Content — above glow */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
