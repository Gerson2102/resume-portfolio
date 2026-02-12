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

export function OpenSourceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const featuredContributions = ossData.filter(contrib => contrib.featured);
  const totalCards = featuredContributions.length;

  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  }, [goToPrev, goToNext]);

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
                300+
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Contributions
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                $10,000+
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Earned
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                100%
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
            {/* Desktop Carousel (3 cards) */}
            <div className="hidden lg:flex items-center justify-center gap-8 overflow-hidden py-4">
              <AnimatePresence mode="popLayout">
                {visibleCards.map((contribution, positionIndex) => {
                  const isCenter = positionIndex === 1;
                  return (
                    <motion.div
                      key={contribution.id}
                      layout
                      initial={{ opacity: 0, scale: 0.85, y: 30 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.45,
                        scale: isCenter ? 1 : 0.9,
                        y: isCenter ? 0 : 16,
                        zIndex: isCenter ? 2 : 1,
                        filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                      }}
                      exit={{ opacity: 0, scale: 0.85, y: -20 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                        layout: { duration: 0.5 },
                      }}
                      className={cn(
                        'flex-shrink-0',
                        isCenter ? 'w-[460px]' : 'w-[400px]'
                      )}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`Contribution ${contribution.originalIndex + 1} of ${totalCards}`}
                    >
                      <ContributionCard
                        contribution={contribution}
                        isCenter={isCenter}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Mobile Carousel (single card with swipe) */}
            <div className="lg:hidden flex justify-center overflow-hidden py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredContributions[activeIndex].id}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 80) goToPrev();
                    else if (info.offset.x < -80) goToNext();
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

            {/* Arrow Buttons (desktop only) */}
            <motion.button
              onClick={goToPrev}
              aria-label="Previous contribution"
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 -translate-y-1/2 left-2 xl:-left-5 hidden lg:flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.1)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
              }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              onClick={goToNext}
              aria-label="Next contribution"
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 -translate-y-1/2 right-2 xl:-right-5 hidden lg:flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.1)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
              }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 pt-2" role="tablist" aria-label="Carousel navigation">
            {featuredContributions.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Go to contribution ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className="relative h-2 rounded-full cursor-pointer transition-colors"
              >
                <motion.div
                  layout
                  className={cn(
                    'h-2 rounded-full',
                    activeIndex === i ? 'bg-primary-400' : 'bg-neutral-600'
                  )}
                  style={activeIndex === i ? {
                    width: 24,
                    boxShadow: '0 0 8px rgba(56, 189, 248, 0.4)',
                  } : {
                    width: 8,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </button>
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
        boxShadow: '0 0 30px rgba(56, 189, 248, 0.2), 0 20px 40px rgba(0, 0, 0, 0.3)',
        transition: { duration: 0.3, ease: 'easeOut' },
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
