'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Github, ExternalLink, DollarSign, GitPullRequest, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { OptimizedImage } from '@/components/ui/image';
import { cn, formatDate } from '@/lib/utils';
import ossData from '@/data/oss.json';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 35 : -35,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -35 : 35,
    opacity: 0,
  }),
};

export function OpenSourceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const featuredContributions = ossData.filter(contrib => contrib.featured);
  const totalCards = featuredContributions.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % totalCards);
    setTimeout(() => setIsAnimating(false), 350);
  }, [isAnimating, totalCards]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setActiveIndex(prev => (prev - 1 + totalCards) % totalCards);
    setTimeout(() => setIsAnimating(false), 350);
  }, [isAnimating, totalCards]);

  const goToIndex = useCallback((index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 350);
  }, [isAnimating, activeIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  }, [goToPrev, goToNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(delta) > threshold) {
      if (!hasSwiped) setHasSwiped(true);
      if (delta > 0) goToNext();
      else goToPrev();
    }
  }, [goToNext, goToPrev, hasSwiped]);

  // Derive visible cards: [left, center, right]
  const visibleIndices = [
    (activeIndex - 1 + totalCards) % totalCards,
    activeIndex,
    (activeIndex + 1) % totalCards,
  ];
  const visibleCards = visibleIndices.map(i => ({
    ...featuredContributions[i],
    originalIndex: i,
  }));

  // GSAP entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
        gsap.fromTo(splitTitle.chars,
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.6,
            ease: 'power2.out',
          }
        );
      }

      if (carouselWrapperRef.current) {
        gsap.fromTo(carouselWrapperRef.current,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: carouselWrapperRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="oss" className="section-padding bg-neutral-50 dark:bg-neutral-800">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
            <Github size={16} />
            <span>Open Source Impact</span>
          </div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Contributing to the Starknet Ecosystem
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
            Active contributor to the Starknet ecosystem through OnlyDust platform.
            Focus on core protocol improvements, developer tooling, and documentation.
          </p>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                <CountUp end={300} suffix="+" duration={1.6} />
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Contributions
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                <CountUp end={10000} prefix="$" suffix="+" separator="," duration={1.8} />
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Earned
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                <CountUp end={100} suffix="%" duration={1.4} />
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Merge Rate
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Contribution Visualization Placeholder */}
        <div className="mb-16">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                OnlyDust Contribution Activity
              </h3>
              <Link
                href="https://app.onlydust.com/u/Gerson2102"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm focus-ring py-2"
              >
                <span>View Profile</span>
                <ExternalLink size={14} />
              </Link>
            </div>
            <OptimizedImage
              src="/images/2024/oss/image.png"
              alt="GitHub/OnlyDust contribution graph showing 494 contributions in the last year"
              width={1200}
              height={300}
              className="w-full h-auto object-contain rounded-lg bg-black"
              priority={false}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>

        {/* Featured Contributions */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white text-center">
            Key Contributions
          </h3>

          <div
            ref={carouselWrapperRef}
            className="relative"
            role="region"
            aria-label="Key contributions carousel"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {/* Desktop Carousel (3 cards) — stable slots, content crossfades */}
            <div className="hidden lg:flex items-center justify-center gap-8 overflow-hidden py-4">
              {[0, 1, 2].map((slotIndex) => {
                const isCenter = slotIndex === 1;
                const contribution = visibleCards[slotIndex];
                return (
                  <motion.div
                    key={slotIndex}
                    animate={{
                      opacity: isCenter ? 1 : 0.5,
                      scale: isCenter ? 1 : 0.92,
                      y: isCenter ? 0 : 12,
                      filter: isCenter ? 'blur(0px)' : 'blur(1.5px)',
                      borderColor: isCenter
                        ? 'rgba(56, 189, 248, 0.35)'
                        : 'rgba(255, 255, 255, 0.06)',
                      boxShadow: isCenter
                        ? '0 0 20px rgba(56, 189, 248, 0.12), 0 0 40px rgba(56, 189, 248, 0.04)'
                        : '0 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className={cn(
                      'flex-shrink-0 overflow-hidden rounded-xl',
                      isCenter ? 'w-[460px] z-[2]' : 'w-[400px] z-[1]'
                    )}
                    style={{ willChange: 'transform, opacity, filter' }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Contribution ${contribution.originalIndex + 1} of ${totalCards}`}
                  >
                    {isCenter ? (
                      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                        <motion.div
                          key={contribution.id}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.25 },
                          }}
                          style={{ willChange: 'transform, opacity' }}
                        >
                          <ContributionCard
                            contribution={contribution}
                            isCenter={true}
                          />
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <ContributionCard
                        contribution={contribution}
                        isCenter={false}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Carousel (single card with swipe) */}
            <div
              className="lg:hidden flex justify-center overflow-hidden py-4"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={featuredContributions[activeIndex].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.25 },
                  }}
                  className="w-[90vw] md:w-[80vw] max-w-[460px]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Contribution ${activeIndex + 1} of ${totalCards}`}
                >
                  <ContributionCard
                    contribution={featuredContributions[activeIndex]}
                    isCenter={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Swipe hint (mobile only) */}
            <motion.p
              className="lg:hidden text-center text-xs text-neutral-500 mt-2"
              initial={{ opacity: 1 }}
              animate={{ opacity: hasSwiped ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              Swipe to explore
            </motion.p>

            {/* Arrow Buttons (desktop only) */}
            <motion.button
              onClick={goToPrev}
              aria-label="Previous contribution"
              disabled={isAnimating}
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 left-2 xl:-left-5',
                'hidden lg:flex items-center justify-center',
                'w-10 h-10 rounded-full cursor-pointer',
                'border border-white/10 bg-white/5',
                'text-neutral-400 hover:text-white',
                'disabled:opacity-30 disabled:cursor-not-allowed'
              )}
            >
              <ChevronLeft size={18} />
            </motion.button>

            <motion.button
              onClick={goToNext}
              aria-label="Next contribution"
              disabled={isAnimating}
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 right-2 xl:-right-5',
                'hidden lg:flex items-center justify-center',
                'w-10 h-10 rounded-full cursor-pointer',
                'border border-white/10 bg-white/5',
                'text-neutral-400 hover:text-white',
                'disabled:opacity-30 disabled:cursor-not-allowed'
              )}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 pt-2" role="tablist" aria-label="Carousel navigation">
            {featuredContributions.map((_, i) => (
              <motion.button
                key={i}
                layout
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Go to contribution ${i + 1}`}
                onClick={() => goToIndex(i)}
                className={cn(
                  'h-2 rounded-full cursor-pointer transition-colors duration-300',
                  activeIndex === i
                    ? 'bg-primary-400 w-6'
                    : 'bg-neutral-600 w-2 hover:bg-neutral-500'
                )}
                style={activeIndex === i ? {
                  boxShadow: '0 0 8px rgba(56, 189, 248, 0.4)',
                } : undefined}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link
            href="https://app.onlydust.com/u/Gerson2102"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 btn-primary"
          >
            <ExternalLink size={20} />
            <span>View All Contributions on OnlyDust</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

interface ContributionCardProps {
  contribution: typeof ossData[0]
  isCenter: boolean
}

function ContributionCard({ contribution, isCenter }: ContributionCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bug fix':
        return '🐛'
      case 'feature':
        return '✨'
      case 'enhancement':
        return '⚡'
      case 'documentation':
        return '📚'
      default:
        return '💻'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bug fix':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
      case 'feature':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
      case 'enhancement':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
      case 'documentation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
      default:
        return 'badge-neutral'
    }
  }

  const displayedTech = contribution.tech.slice(0, 4);

  return (
    <motion.article
      className={cn(
        'rounded-xl p-6 min-h-[440px] flex flex-col transition-[border-color,box-shadow] duration-300',
        isCenter
          ? 'backdrop-blur-xs bg-white/[0.06] border border-[rgba(56,189,248,0.3)]'
          : 'glass-card'
      )}
      style={isCenter ? {
        boxShadow: '0 0 15px rgba(56, 189, 248, 0.1), 0 0 30px rgba(56, 189, 248, 0.05)',
      } : undefined}
      whileHover={isCenter ? {
        y: -4,
        boxShadow: '0 0 30px rgba(56, 189, 248, 0.18), 0 16px 32px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.25, ease: 'easeOut' },
      } : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <span className="text-2xl flex-shrink-0">{getTypeIcon(contribution.type)}</span>
          <div className="min-w-0">
            <h4 className="font-semibold text-neutral-900 dark:text-white truncate">
              {contribution.title}
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
              {contribution.repository}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 text-sm font-medium rounded-full flex-shrink-0 ml-2">
          <DollarSign size={12} />
          <span>{contribution.reward}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed line-clamp-3">
        {contribution.description}
      </p>

      {/* Impact */}
      <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        <p className="text-primary-800 dark:text-primary-200 text-sm font-medium line-clamp-2">
          <strong>Impact:</strong> {contribution.impact}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={cn('badge text-xs', getTypeColor(contribution.type))}>
          {contribution.type}
        </span>
        {displayedTech.map((tech) => (
          <span key={tech} className="badge-neutral text-xs">
            {tech}
          </span>
        ))}
      </div>

      {/* Maintainer Feedback */}
      {contribution.maintainerFeedback && (
        <div className="mb-4 p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg border-l-4 border-primary-500">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare size={14} className="text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              Maintainer Feedback
            </span>
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 italic line-clamp-2">
            &quot;{contribution.maintainerFeedback}&quot;
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-600 mt-auto">
        <div className="flex items-center space-x-4">
          <Link
            href={contribution.links.pr}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm focus-ring py-2"
          >
            <GitPullRequest size={14} />
            <span>View PR</span>
          </Link>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          {formatDate(contribution.date)}
        </div>
      </div>
    </motion.article>
  );
}

function CountUp({
  end,
  duration = 1.6,
  prefix = '',
  suffix = '',
  separator = '',
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const durationMs = duration * 1000;

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / durationMs, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted = separator
    ? count.toLocaleString('en-US')
    : String(count);

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
