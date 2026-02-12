'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { OptimizedImage } from '@/components/ui/image';
import { SOCIAL_LINKS } from '@/lib/utils';
import statsData from '@/data/stats.json';

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIcons = {
  github: Github,
  twitter: XIcon,
  linkedin: Linkedin,
  telegram: MessageCircle,
};

function Cursor({ isTyping, fading }: { isTyping: boolean; fading: boolean }) {
  return (
    <span
      className={`text-primary-400 font-light transition-opacity duration-300 ${
        fading ? 'opacity-0' : isTyping ? 'opacity-100' : 'animate-blink-cursor'
      }`}
      aria-hidden="true"
    >|</span>
  );
}

type TypingPhase = 'name' | 'subtitle' | 'description' | 'done';

const fullName = 'Gerson';
const fullSubtitle = 'Web3 Developer & Open Source Contributor';
const fullDescription = "Trusted by leading protocols to ship code that matters. Rewarded for impact across EVM and the Starknet ecosystem. When I'm not merging PRs into production, I'm on stage across Latin America proving that the future of the internet is being built from everywhere.";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [displayedName, setDisplayedName] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [displayedDescription, setDisplayedDescription] = useState('');
  const [currentPhase, setCurrentPhase] = useState<TypingPhase>('name');
  const [isTyping, setIsTyping] = useState(true);
  const [cursorFading, setCursorFading] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  const metrics = [
    { value: `${statsData.ossProjects}+`, label: 'OSS Projects' },
    { value: statsData.fellowships.toString(), label: 'Fellowships' },
    { value: statsData.totalEarned, label: 'OSS Earnings' },
    { value: `${statsData.hackathonsWon}`, label: 'Hackathon Wins' },
  ];

  // Typing engine
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayedName(fullName);
      setDisplayedSubtitle(fullSubtitle);
      setDisplayedDescription(fullDescription);
      setCurrentPhase('done');
      setCursorFading(true);
      setTypingComplete(true);
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    timeoutsRef.current = timeouts;

    let offset = 0;

    // Phase 1: Name (70ms/char)
    for (let i = 1; i <= fullName.length; i++) {
      const t = setTimeout(() => {
        setDisplayedName(fullName.slice(0, i));
      }, offset + i * 70);
      timeouts.push(t);
    }
    offset += fullName.length * 70; // 420ms

    // Pause after name: cursor blinks
    const pauseAfterName = setTimeout(() => {
      setIsTyping(false);
    }, offset);
    timeouts.push(pauseAfterName);
    offset += 400;

    // Transition to subtitle phase
    const startSubtitle = setTimeout(() => {
      setCurrentPhase('subtitle');
      setIsTyping(true);
    }, offset);
    timeouts.push(startSubtitle);

    // Phase 2: Subtitle (45ms/char)
    for (let i = 1; i <= fullSubtitle.length; i++) {
      const t = setTimeout(() => {
        setDisplayedSubtitle(fullSubtitle.slice(0, i));
      }, offset + i * 45);
      timeouts.push(t);
    }
    offset += fullSubtitle.length * 45; // 1800ms

    // Pause after subtitle
    const pauseAfterSubtitle = setTimeout(() => {
      setIsTyping(false);
    }, offset);
    timeouts.push(pauseAfterSubtitle);
    offset += 400;

    // Transition to description phase
    const startDescription = setTimeout(() => {
      setCurrentPhase('description');
      setIsTyping(true);
    }, offset);
    timeouts.push(startDescription);

    // Phase 3: Description (18ms/char)
    for (let i = 1; i <= fullDescription.length; i++) {
      const t = setTimeout(() => {
        setDisplayedDescription(fullDescription.slice(0, i));
      }, offset + i * 18);
      timeouts.push(t);
    }
    offset += fullDescription.length * 18;

    // Phase done: cursor blinks 3 times then fades
    const phaseDone = setTimeout(() => {
      setIsTyping(false);
      setCurrentPhase('done');
    }, offset);
    timeouts.push(phaseDone);

    // 3 blinks at 530ms each = 1590ms
    const cursorFade = setTimeout(() => {
      setCursorFading(true);
    }, offset + 1590);
    timeouts.push(cursorFade);

    // After 300ms fade transition, typing is complete
    const complete = setTimeout(() => {
      setTypingComplete(true);
    }, offset + 1590 + 300);
    timeouts.push(complete);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Image animation (runs on mount, concurrent with typing)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 1, scale: 1 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Post-typing GSAP animations
  useEffect(() => {
    if (!typingComplete) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(['.metrics-wrapper', '.social-wrapper', '.scroll-indicator'], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Make parent wrappers visible so child animations are seen
      gsap.set(['.metrics-wrapper', '.social-wrapper'], { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
      });

      // Metrics cards cascade
      tl.fromTo('.metric-card',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: 'back.out(1.2)',
        },
        0
      );

      // Social links stagger from left
      tl.fromTo('.social-link',
        { opacity: 0, x: -20, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.5,
        },
        0.5
      );

      // Scroll indicator fade-in
      tl.fromTo('.scroll-indicator',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        0.7
      );
    }, heroRef);

    return () => ctx.revert();
  }, [typingComplete]);

  const showCursor = currentPhase !== 'done' || !cursorFading;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Hero Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-0" style={{ opacity: 0 }}>
        <OptimizedImage
          src="/images/hero/1730083623644.JPG"
          alt="Gerson - Web3 Developer and Open Source Contributor"
          fill
          priority={true}
          className="object-cover w-full h-full brightness-90 contrast-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/15 to-black/35" />
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/30 to-transparent md:from-black/55 md:via-black/20 md:to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-black/20 via-transparent to-black/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-max section-padding w-full">
        <div className="max-w-4xl">
          {/* Text area with layout shift prevention */}
          <div className="relative mb-8">
            {/* Invisible placeholder reserving full height */}
            <div className="invisible space-y-6" aria-hidden="true">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl [text-shadow:2px_2px_8px_rgb(0_0_0/80%)]">
                {fullName}|
              </h1>
              <p className="text-xl md:text-2xl text-white/95 max-w-2xl font-light drop-shadow-lg [text-shadow:1px_1px_4px_rgb(0_0_0/70%)]">
                {fullSubtitle}
              </p>
              <p className="text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-md [text-shadow:1px_1px_3px_rgb(0_0_0/60%)]">
                {fullDescription}
              </p>
            </div>

            {/* Typed text overlay */}
            <div className="absolute inset-0 space-y-6">
              {/* Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl [text-shadow:2px_2px_8px_rgb(0_0_0/80%)]">
                {displayedName}
                {currentPhase === 'name' && <Cursor isTyping={isTyping} fading={false} />}
              </h1>

              {/* Subtitle — visible once name phase is done */}
              {currentPhase !== 'name' && (
                <p className="text-xl md:text-2xl text-white/95 max-w-2xl font-light drop-shadow-lg [text-shadow:1px_1px_4px_rgb(0_0_0/70%)]">
                  {displayedSubtitle}
                  {currentPhase === 'subtitle' && <Cursor isTyping={isTyping} fading={false} />}
                </p>
              )}

              {/* Description — visible once subtitle phase is done */}
              {(currentPhase === 'description' || currentPhase === 'done') && (
                <p className="text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-md [text-shadow:1px_1px_3px_rgb(0_0_0/60%)]">
                  {displayedDescription}
                  {currentPhase === 'description' && <Cursor isTyping={isTyping} fading={false} />}
                  {currentPhase === 'done' && showCursor && <Cursor isTyping={false} fading={cursorFading} />}
                </p>
              )}
            </div>
          </div>

          {/* Metrics Row */}
          <div className="metrics-wrapper grid grid-cols-2 md:grid-cols-4 gap-6 mb-8" style={{ opacity: 0 }}>
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="metric-card text-center backdrop-blur-xs bg-white/5 rounded-lg p-3 border border-white/10 hover-lift"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: { duration: 0.3 },
                }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg [text-shadow:1px_1px_4px_rgb(0_0_0/70%)]">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base text-white/85 drop-shadow-xs [text-shadow:1px_1px_2px_rgb(0_0_0/50%)]">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="social-wrapper flex items-center space-x-4" style={{ opacity: 0 }}>
            <span className="text-white/70 text-sm mr-2">Contact me:</span>
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              return (
                <motion.div
                  key={platform}
                  className="social-link"
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-xs hover:bg-white/20 text-white transition-all duration-200 focus-ring block"
                    aria-label={`Contact on ${platform}`}
                  >
                    <Icon size={20} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          const next = document.getElementById('fellowships');
          next?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer focus-ring rounded-full"
        style={{ opacity: 0 }}
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </button>
    </section>
  );
}
