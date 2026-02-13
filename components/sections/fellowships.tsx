'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Calendar,
  DollarSign,
  Award,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { OptimizedImage } from '@/components/ui/image';
import { cn } from '@/lib/utils';
import fellowshipsData from '@/data/fellowships.json';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Sort chronologically, oldest first
const sortedFellowships = [...fellowshipsData].sort(
  (a, b) => parseInt(a.cohort) - parseInt(b.cohort)
);

type Fellowship = (typeof fellowshipsData)[0];

export function FellowshipsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineWrapperRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rippleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connectorRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    // Position line from first node to last node exactly
    const firstNode = nodeRefs.current[0];
    const lastNode = nodeRefs.current[sortedFellowships.length - 1];
    if (lineWrapperRef.current && firstNode && lastNode && timelineRef.current) {
      const containerTop = timelineRef.current.getBoundingClientRect().top;
      const firstTop = firstNode.getBoundingClientRect().top - containerTop + firstNode.offsetHeight / 2;
      const lastTop = lastNode.getBoundingClientRect().top - containerTop + lastNode.offsetHeight / 2;
      lineWrapperRef.current.style.top = `${firstTop}px`;
      lineWrapperRef.current.style.height = `${lastTop - firstTop}px`;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        const splitTitle = new SplitType(titleRef.current, {
          types: 'chars',
        });
        gsap.fromTo(
          splitTitle.chars,
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

      // Line drawing animation (scrub — tracks scroll, trigger = line wrapper)
      if (lineRef.current && lineWrapperRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: lineWrapperRef.current,
              start: 'top 75%',
              end: 'bottom 75%',
              scrub: 0.5,
            },
          }
        );
      }

      // Node + ripple + card + connector animations
      sortedFellowships.forEach((_, i) => {
        const node = nodeRefs.current[i];
        const ripple = rippleRefs.current[i];
        const card = cardRefs.current[i];
        const connector = connectorRefs.current[i];
        const isLeft = i % 2 === 0;

        if (node) {
          gsap.fromTo(
            node,
            { opacity: 0.15, boxShadow: '0 0 0px rgba(56, 189, 248, 0)' },
            {
              opacity: 1,
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
              ease: 'power2.out',
              duration: 0.5,
              scrollTrigger: {
                trigger: node,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (ripple) {
          gsap.fromTo(
            ripple,
            { scale: 1, opacity: 0.6 },
            {
              scale: 2.5,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ripple,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: isLeft ? -60 : 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (connector) {
          gsap.fromTo(
            connector,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: connector,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Detect year boundaries for labels
  const getYearLabel = (index: number): string | null => {
    const current = sortedFellowships[index].cohort;
    if (index === 0) return current;
    const prev = sortedFellowships[index - 1].cohort;
    return current !== prev ? current : null;
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="fellowships"
      className="section-padding bg-white dark:bg-neutral-900"
    >
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
            <Award size={16} />
            <span>Fellowships & Programs</span>
          </div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            Recognized Excellence
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Selected for competitive fellowship programs that recognize
            outstanding contributions to Web3 development and the open source
            ecosystem.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative" role="list" aria-label="Fellowship timeline">
          {/* Central vertical line — positioned dynamically from first to last node */}
          <div
            ref={lineWrapperRef}
            className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 w-0.5"
          >
            <div
              ref={lineRef}
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(56, 189, 248, 0.6), rgba(56, 189, 248, 0.2))',
                boxShadow: '0 0 8px rgba(56, 189, 248, 0.15)',
              }}
            />
          </div>

          {/* Timeline entries */}
          <div className="relative space-y-20 lg:space-y-24">
            {sortedFellowships.map((fellowship, index) => {
              const isLeft = index % 2 === 0;
              const yearLabel = getYearLabel(index);
              const isExpanded = expandedId === fellowship.id;

              return (
                <div key={fellowship.id} role="listitem">
                  {/* Year label */}
                  {yearLabel && (
                    <div className="relative flex items-center mb-12 lg:mb-16">
                      {/* Mobile: offset from left line */}
                      <div className="pl-14 lg:pl-0 lg:w-full lg:flex lg:items-center lg:justify-center">
                        <div className="hidden lg:block flex-1 h-px bg-neutral-700/30" />
                        <span className="text-sm font-mono text-neutral-500 lg:px-4">
                          {yearLabel}
                        </span>
                        <div className="hidden lg:block flex-1 h-px bg-neutral-700/30" />
                      </div>
                    </div>
                  )}

                  {/* Entry row */}
                  <div
                    className={cn(
                      'relative flex items-start',
                      // Desktop: alternate sides
                      'lg:items-start',
                    )}
                  >
                    {/* Node column — mobile: absolute left, desktop: center */}
                    <div
                      className={cn(
                        'absolute left-6 lg:left-1/2 -translate-x-1/2 z-10',
                        'flex items-center justify-center',
                      )}
                      style={{ top: '24px' }}
                    >
                      {/* Ripple ring */}
                      <div
                        ref={(el) => { rippleRefs.current[index] = el; }}
                        className="absolute w-4 h-4 rounded-full border-2 border-primary-400 pointer-events-none"
                        aria-hidden="true"
                      />
                      {/* Node circle */}
                      <div
                        ref={(el) => { nodeRefs.current[index] = el; }}
                        className={cn(
                          'w-4 h-4 rounded-full relative z-10',
                          getNodeStyles(fellowship.status),
                        )}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Card + connector — mobile: always right; desktop: alternating */}
                    <div
                      className={cn(
                        // Mobile: card on right of the left line
                        'ml-14 w-[calc(100%-56px)]',
                        // Desktop: alternating layout
                        'lg:ml-0 lg:w-full lg:flex lg:items-start',
                        isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row',
                      )}
                    >
                      {/* Spacer for the opposite side on desktop */}
                      <div className="hidden lg:block lg:w-1/2" />

                      {/* Connector line + Card wrapper */}
                      <div
                        className={cn(
                          'lg:w-1/2 flex items-start',
                          isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row',
                        )}
                      >
                        {/* Connector line (horizontal) */}
                        <div
                          ref={(el) => { connectorRefs.current[index] = el; }}
                          className={cn(
                            'hidden lg:block w-10 h-px mt-8 shrink-0',
                            isLeft ? 'origin-right' : 'origin-left',
                          )}
                          style={{
                            background: 'rgba(56, 189, 248, 0.3)',
                          }}
                          aria-hidden="true"
                        />

                        {/* Card */}
                        <div
                          ref={(el) => { cardRefs.current[index] = el; }}
                          className="flex-1 lg:max-w-[480px]"
                        >
                          <TimelineCard
                            fellowship={fellowship}
                            isExpanded={isExpanded}
                            onToggle={() => toggleExpand(fellowship.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function getNodeStyles(status: string): string {
  switch (status) {
    case 'Active':
      return 'bg-primary-400 border-2 border-primary-400 shadow-[0_0_6px_rgba(56,189,248,0.3)]';
    case 'Completed':
      return 'bg-primary-400 border-2 border-primary-400 shadow-[0_0_6px_rgba(56,189,248,0.2)]';
    case 'Upcoming':
      return 'bg-transparent border-2 border-dashed border-primary-400/50';
    default:
      return 'bg-neutral-600 border-2 border-neutral-500';
  }
}

interface TimelineCardProps {
  fellowship: Fellowship;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineCard({ fellowship, isExpanded, onToggle }: TimelineCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card rounded-xl overflow-hidden cursor-pointer',
        isExpanded && 'ring-1 ring-primary-400/20',
      )}
      whileHover={
        !isExpanded
          ? {
              y: -4,
              boxShadow:
                '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(56, 189, 248, 0.08)',
              transition: { duration: 0.25, ease: 'easeOut' },
            }
          : undefined
      }
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Collapsed content — always visible */}
      <div className="p-6">
        {/* Top row: logo + info + status */}
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
            {fellowship.logo ? (
              <OptimizedImage
                src={fellowship.logo}
                alt={`${fellowship.organization} logo`}
                width={48}
                height={48}
                className="w-full h-full object-contain p-1.5"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Award
                  size={20}
                  className="text-neutral-500 dark:text-neutral-400"
                />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
              {fellowship.program}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
              {fellowship.organization}
            </p>
          </div>

          <span
            className={cn(
              'shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
              getStatusBadgeColor(fellowship.status),
            )}
          >
            {fellowship.status}
          </span>
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-3 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
          <span className="inline-flex items-center gap-1">
            <Calendar size={13} />
            {fellowship.cohort}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users size={13} />
            {fellowship.duration}
          </span>
          {fellowship.stipend && (
            <span className="inline-flex items-center gap-1">
              <DollarSign size={13} />
              {fellowship.stipend}
            </span>
          )}
        </div>

        {/* Description — clamped when collapsed */}
        <p
          className={cn(
            'text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed',
            !isExpanded && 'line-clamp-2',
          )}
        >
          {fellowship.description}
        </p>

        {/* Expand indicator */}
        <div className="flex justify-end mt-3">
          <span className="inline-flex items-center gap-1 text-xs text-primary-400">
            {isExpanded ? (
              <>
                Less <ChevronUp size={14} />
              </>
            ) : (
              <>
                Details <ChevronDown size={14} />
              </>
            )}
          </span>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-neutral-200/50 dark:border-neutral-700/50 pt-5">
              {/* Significance callout */}
              {fellowship.significance && (
                <div className="p-3 bg-accent-50 dark:bg-accent-900/20 rounded-lg border-l-4 border-accent-500">
                  <p className="text-accent-800 dark:text-accent-200 text-sm font-medium">
                    <strong>Notable:</strong> {fellowship.significance}
                  </p>
                </div>
              )}

              {/* Focus Areas */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                  Focus Areas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {fellowship.focus.map((area) => (
                    <span key={area} className="badge-primary text-xs">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                  Key Achievements
                </h4>
                <ul className="space-y-1.5">
                  {fellowship.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                    >
                      <div className="w-1 h-1 bg-primary-500 rounded-full mt-2 shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div
                className="flex flex-wrap gap-4 pt-3 border-t border-neutral-200/50 dark:border-neutral-700/50"
                onClick={(e) => e.stopPropagation()}
              >
                {fellowship.links.program && (
                  <Link
                    href={fellowship.links.program}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus-ring py-1"
                  >
                    Program Details
                    <ExternalLink size={12} />
                  </Link>
                )}
                {fellowship.links.profile && (
                  <Link
                    href={fellowship.links.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring py-1"
                  >
                    My Profile
                    <ExternalLink size={12} />
                  </Link>
                )}
                {fellowship.links.scholarship && (
                  <Link
                    href={fellowship.links.scholarship}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors focus-ring py-1"
                  >
                    Scholarship Info
                    <ExternalLink size={12} />
                  </Link>
                )}
                {fellowship.links.event && (
                  <Link
                    href={fellowship.links.event}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors focus-ring py-1"
                  >
                    Event Details
                    <ExternalLink size={12} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'Active':
      return 'bg-green-900/50 text-green-200';
    case 'Upcoming':
      return 'bg-blue-900/50 text-blue-200';
    case 'Completed':
      return 'bg-neutral-800 text-neutral-200';
    default:
      return 'bg-neutral-800 text-neutral-200';
  }
}
