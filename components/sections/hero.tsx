'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MessageCircle, Github, Linkedin } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { OptimizedImage } from '@/components/ui/image';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/lib/utils';
import statsData from '@/data/stats.json';

const socialIcons = {
  github: Github,
  twitter: BsTwitterX,
  linkedin: Linkedin,
  telegram: MessageCircle,
};

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { value: `${statsData.ossProjects}+`, label: 'OSS Projects' },
    { value: statsData.fellowships.toString(), label: 'Fellowships' },
    { value: statsData.totalEarned, label: 'OSS Earnings' },
    { value: `${statsData.hackathonsWon}`, label: 'Hackathon Wins' },
  ];

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show all elements immediately if user prefers reduced motion
      gsap.set([imageRef.current, nameRef.current, titleRef.current, descriptionRef.current, '.metric-card', '.cta-button', '.social-link', '.scroll-indicator'], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateX: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Create a master timeline for sequential, smooth animations
      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        }
      });

      // 1. Hero image smooth fade-in (0-1.2s)
      if (imageRef.current) {
        tl.fromTo(imageRef.current,
          {
            opacity: 0,
            scale: 1.1,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0
        );
      }

      // 2. Name character-by-character reveal (0.5-1.5s)
      if (nameRef.current) {
        const splitName = new SplitType(nameRef.current, { types: 'chars' });
        tl.fromTo(splitName.chars,
          {
            opacity: 0,
            y: 30,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.04,
            duration: 0.8,
            ease: 'back.out(1.4)',
          },
          0.5
        );
      }

      // 3. Title smooth fade-up (1.2-1.8s)
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          1.2
        );
      }

      // 4. Description smooth fade-up (1.5-2.1s)
      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          1.5
        );
      }

      // 5. Metrics cards cascade (1.8-2.5s)
      tl.fromTo('.metric-card',
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: 'back.out(1.2)',
        },
        1.8
      );

      // 6. CTA button smooth scale-in (2.3-2.9s)
      tl.fromTo('.cta-button',
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
        },
        2.3
      );

      // 7. Social links stagger from left (2.5-3.0s)
      tl.fromTo('.social-link',
        {
          opacity: 0,
          x: -20,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.5,
        },
        2.5
      );

      // 8. Scroll indicator fade-in (2.8-3.4s)
      tl.fromTo('.scroll-indicator',
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        2.8
      );
    }, heroRef);

    return () => ctx.revert();
  }, []); // Removed isMounted dependency - run immediately

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Hero Background Image - starts hidden for smooth fade */}
      <div ref={imageRef} className="absolute inset-0 z-0" style={{ opacity: 0 }}>
        <OptimizedImage
          src="/images/hero/1730083623644.JPG"
          alt="Gerson - Web3 Developer and Open Source Contributor"
          fill
          priority={true}
          className="object-cover w-full h-full brightness-90 contrast-105"
          sizes="100vw"
        />
        {/* Multi-layer gradient overlays for enhanced text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent md:from-black/55 md:via-black/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-max section-padding w-full">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <div className="space-y-6 mb-8">
            <h1
              ref={nameRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]"
            >
              Gerson
            </h1>
            <p
              ref={titleRef}
              className="text-xl md:text-2xl text-white/95 max-w-2xl font-light drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]"
            >
              Web3 Developer & Open Source Contributor
            </p>
            <p
              ref={descriptionRef}
              className="text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-md [text-shadow:_1px_1px_3px_rgb(0_0_0_/_60%)]"
            >
              Building the future of decentralized applications with{' '}
              <strong>Starknet</strong>, contributing to open source, and speaking about
              blockchain technology across Latin America.
            </p>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="metric-card text-center backdrop-blur-sm bg-white/5 rounded-lg p-3 border border-white/10 hover-lift"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: { duration: 0.3 },
                }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base text-white/85 drop-shadow-sm [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)]">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.div
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Link
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 focus-ring hover-glow"
              >
                <MessageCircle size={20} />
                <span>Contact via Telegram</span>
              </Link>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
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
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-200 focus-ring block"
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
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
