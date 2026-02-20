'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return; // Don't apply smooth scroll if user prefers reduced motion
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId: number;
    let isScrolling = false;
    let idleTimeout: ReturnType<typeof setTimeout>;

    function raf(time: number) {
      lenis.raf(time);
      if (isScrolling) {
        rafId = requestAnimationFrame(raf);
      }
    }

    function startRaf() {
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(raf);
      }
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    }

    // Start RAF on scroll-related events
    window.addEventListener('wheel', startRaf, { passive: true });
    window.addEventListener('touchmove', startRaf, { passive: true });
    window.addEventListener('scroll', startRaf, { passive: true });

    // Initial kick to ensure Lenis initializes properly
    startRaf();

    // Expose lenis instance globally for GSAP ScrollTrigger integration
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    return () => {
      clearTimeout(idleTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', startRaf);
      window.removeEventListener('touchmove', startRaf);
      window.removeEventListener('scroll', startRaf);
      lenis.destroy();
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
