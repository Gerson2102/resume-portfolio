'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = 'fade',
  delay = 0,
  duration = 1,
  stagger = 0,
  className = '',
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = elementRef.current;
    if (!element) return;

    const animationConfig: gsap.TweenVars = {
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      duration,
      delay,
      ease: 'power3.out',
    };

    // Define animation presets
    switch (animation) {
      case 'fade':
        gsap.from(element.children, {
          ...animationConfig,
          opacity: 0,
          stagger,
        });
        break;

      case 'slideUp':
        gsap.from(element.children, {
          ...animationConfig,
          opacity: 0,
          y: 60,
          stagger,
        });
        break;

      case 'slideLeft':
        gsap.from(element.children, {
          ...animationConfig,
          opacity: 0,
          x: 100,
          stagger,
        });
        break;

      case 'slideRight':
        gsap.from(element.children, {
          ...animationConfig,
          opacity: 0,
          x: -100,
          stagger,
        });
        break;

      case 'scale':
        gsap.from(element.children, {
          ...animationConfig,
          opacity: 0,
          scale: 0.8,
          stagger,
          ease: 'back.out(1.4)',
        });
        break;

      case 'rotate':
        gsap.from(element.children, {
          ...animationConfig,
          opacity: 0,
          scale: 0.7,
          rotation: -15,
          stagger,
          ease: 'back.out(1.7)',
        });
        break;
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animation, delay, duration, stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
