'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Calendar, MapPin, Users, Mic, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { OptimizedImage } from '@/components/ui/image';
import { Gallery } from '@/components/ui/lightbox';
import { formatDate } from '@/lib/utils';
import talksData from '@/data/talks.json';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Talk = typeof talksData[0];

export function SpeakingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const contentBlocksRef = useRef<HTMLDivElement[]>([]);
  const galleryBlocksRef = useRef<HTMLDivElement[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Title animation
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

      // CTA section title animation
      if (ctaTitleRef.current) {
        const splitCtaTitle = new SplitType(ctaTitleRef.current, { types: 'chars' });
        gsap.fromTo(splitCtaTitle.chars,
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: ctaTitleRef.current,
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

      // Desktop pin — only on lg+
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (isDesktop && splitContainerRef.current && leftPanelRef.current) {
        gsap.to(leftPanelRef.current, {
          scrollTrigger: {
            trigger: splitContainerRef.current,
            start: 'top 80px',
            end: 'bottom bottom',
            pin: leftPanelRef.current,
            pinSpacing: false,
          },
        });
      }

      // Right panel block reveal animations
      contentBlocksRef.current.forEach((block) => {
        if (!block) return;
        gsap.fromTo(block,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Gallery staggered reveal
      if (galleryBlocksRef.current.length > 0) {
        galleryBlocksRef.current.forEach((block, i) => {
          if (!block) return;
          gsap.fromTo(block,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: i * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sort talks by date, most recent first
  const sortedTalks = [...talksData].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featuredTalk = sortedTalks[0];
  const otherTalks = sortedTalks.slice(1);

  return (
    <section ref={sectionRef} id="speaking" className="section-padding bg-neutral-50 dark:bg-neutral-800">
      {/* Section Header — normal container */}
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-accent-100 dark:bg-accent-900/50 text-accent-800 dark:text-accent-200 rounded-full text-sm font-medium">
            <Mic size={16} />
            <span>Speaking & Education</span>
          </div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Sharing Knowledge
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Passionate about educating the Latin American developer community about Web3 and blockchain technology.
            Speaking at conferences to promote practical applications beyond speculation.
          </p>
        </div>
      </div>

      {/* Featured Talk — breaks out wider */}
      <div className="max-w-[90rem] mx-auto px-6 lg:px-8">
        <FeaturedTalk
          talk={featuredTalk}
          splitContainerRef={splitContainerRef}
          leftPanelRef={leftPanelRef}
          contentBlocksRef={contentBlocksRef}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Rest — normal container */}
      <div className="container-max">
        {/* Photo Gallery */}
        {featuredTalk.images.length > 1 && (
          <div className="mt-28">
            <h3
              ref={(el) => {
                if (el) galleryBlocksRef.current[0] = el;
              }}
              className="text-lg font-semibold text-white mb-6"
            >
              Event Photos
            </h3>
            <div
              ref={(el) => {
                if (el) galleryBlocksRef.current[1] = el as HTMLDivElement;
              }}
            >
              <Gallery
                images={featuredTalk.images.slice(1).map((img) => ({
                  src: img,
                  alt: `${featuredTalk.title} at ${featuredTalk.event}`,
                  caption: `${featuredTalk.title} - ${featuredTalk.event}`,
                }))}
                columns={3}
                aspectRatio="square"
              />
            </div>
          </div>
        )}

        {/* Additional Talks (future scalability) */}
        {otherTalks.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-white mb-8">More Talks</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {otherTalks.map((talk) => (
                <CompactTalkCard key={talk.id} talk={talk} />
              ))}
            </div>
          </div>
        )}

        {/* Speaking Availability CTA */}
        <div className="cta-card text-center mt-12 p-8 glass-card rounded-xl">
          <h3 ref={ctaTitleRef} className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Available for Speaking
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
            Interested in having me speak at your event? I&apos;m available for conferences, meetups,
            and workshops on Web3 development, Starknet, and blockchain applications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="https://t.me/Glv_rar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Contact for Speaking</span>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Talk: Split-Scroll Layout ─── */

interface FeaturedTalkProps {
  talk: Talk;
  splitContainerRef: React.RefObject<HTMLDivElement | null>;
  leftPanelRef: React.RefObject<HTMLDivElement | null>;
  contentBlocksRef: React.MutableRefObject<HTMLDivElement[]>;
  reducedMotion: boolean;
}

function FeaturedTalk({
  talk,
  splitContainerRef,
  leftPanelRef,
  contentBlocksRef,
  reducedMotion,
}: FeaturedTalkProps) {
  const galleryImages = talk.images.map((imagePath) => ({
    src: imagePath,
    alt: `${talk.title} at ${talk.event}`,
    caption: `${talk.title} - ${talk.event}`,
  }));

  const addContentRef = (el: HTMLDivElement | null, index: number) => {
    if (el) contentBlocksRef.current[index] = el;
  };

  // On reduced motion or mobile, render stacked layout
  // On desktop, render split layout with pin
  // We use CSS to show/hide — GSAP pin only fires on desktop

  return (
    <>
      {/* ── Desktop Split Layout (lg+) ── */}
      <div
        ref={reducedMotion ? undefined : splitContainerRef}
        className={reducedMotion ? 'hidden' : 'hidden lg:flex gap-0'}
      >
        {/* Left Panel — Pinned Photo */}
        <div
          ref={reducedMotion ? undefined : leftPanelRef}
          className="w-[55%] h-screen rounded-xl overflow-hidden relative shrink-0"
          role="img"
          aria-label={`${talk.title} presentation at ${talk.event}`}
        >
          {talk.images.length > 0 ? (
            <OptimizedImage
              src={talk.images[0]}
              alt={`${talk.title} at ${talk.event}`}
              fill
              className="object-cover w-full h-full"
              sizes="55vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-700">
              <Mic size={64} className="text-neutral-500" />
            </div>
          )}

          {/* Event badge — top left */}
          <div className="absolute top-4 left-4">
            <div className="glass-card px-4 py-2 text-white text-sm font-medium rounded-full">
              {talk.event}
            </div>
          </div>

          {/* Language badge — top right */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1.5 bg-accent-500/90 backdrop-blur-xs text-white text-xs font-medium rounded-full">
              {talk.language}
            </div>
          </div>

          {/* Title overlay — bottom */}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent pt-24 pb-6 px-6">
            <h3 className="text-2xl font-bold text-white mb-1">{talk.title}</h3>
            {talk.subtitle && (
              <p className="text-base text-white/80">{talk.subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Panel — Scrolling Content */}
        <div className="w-[45%] pl-10 space-y-12 py-8">
          {/* Metadata */}
          <div ref={(el) => addContentRef(el, 0)} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(talk.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} />
              {talk.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} />
              {talk.audience}
            </span>
            {talk.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                {talk.duration}
              </span>
            )}
          </div>

          {/* About This Talk */}
          <div ref={(el) => addContentRef(el, 1)}>
            <h3 className="text-lg font-semibold text-white mb-3">About This Talk</h3>
            <p className="text-base text-neutral-300 leading-relaxed">{talk.abstract}</p>
          </div>

          {/* Key Takeaways */}
          {talk.keyTakeaways && talk.keyTakeaways.length > 0 && (
            <div ref={(el) => addContentRef(el, 2)}>
              <h3 className="text-lg font-semibold text-white mb-3">Key Takeaways</h3>
              <div className="space-y-3">
                {talk.keyTakeaways.map((takeaway, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white/[0.03] border border-white/6 rounded-lg p-4"
                  >
                    <div className="w-2 h-2 bg-accent-400 rounded-full mt-1.5 shrink-0" />
                    <span className="text-neutral-300">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics Covered */}
          {talk.topics && talk.topics.length > 0 && (
            <div ref={(el) => addContentRef(el, 3)}>
              <h3 className="text-lg font-semibold text-white mb-3">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {talk.topics.map((topic) => (
                  <span key={topic} className="badge-accent text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {talk.testimonials && talk.testimonials.length > 0 && (
            <div ref={(el) => addContentRef(el, 4)}>
              <h3 className="text-lg font-semibold text-white mb-3">Feedback</h3>
              <div className="space-y-4">
                {talk.testimonials.map((testimonial, i) => (
                  <blockquote key={i} className="border-l-2 border-primary-400 pl-4 py-1">
                    <p className="text-neutral-300 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <cite className="text-primary-400 text-sm not-italic mt-1 block">
                      &mdash; {testimonial.author}
                    </cite>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div ref={(el) => addContentRef(el, 5)} className="flex flex-wrap gap-4">
            {talk.links.slides && (
              <Link
                href={talk.links.slides}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                View Slides
                <ExternalLink size={14} />
              </Link>
            )}
            {talk.links.event && (
              <Link
                href={talk.links.event}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Event Page
                <ExternalLink size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet / Reduced Motion Layout ── */}
      <div className={reducedMotion ? 'block' : 'lg:hidden'}>
        {/* Hero photo */}
        <div className="relative rounded-xl overflow-hidden aspect-video mb-8">
          {talk.images.length > 0 ? (
            <OptimizedImage
              src={talk.images[0]}
              alt={`${talk.title} at ${talk.event}`}
              fill
              className="object-cover w-full h-full"
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-700">
              <Mic size={48} className="text-neutral-500" />
            </div>
          )}

          {/* Event badge */}
          <div className="absolute top-3 left-3">
            <div className="glass-card px-3 py-1.5 text-white text-sm font-medium rounded-full">
              {talk.event}
            </div>
          </div>

          {/* Language badge */}
          <div className="absolute top-3 right-3">
            <div className="px-2.5 py-1 bg-accent-500/90 backdrop-blur-xs text-white text-xs font-medium rounded-full">
              {talk.language}
            </div>
          </div>

          {/* Title overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent pt-16 pb-4 px-4">
            <h3 className="text-xl font-bold text-white mb-0.5">{talk.title}</h3>
            {talk.subtitle && (
              <p className="text-sm text-white/80">{talk.subtitle}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-400 mb-8">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(talk.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {talk.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users size={14} />
            {talk.audience}
          </span>
          {talk.duration && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {talk.duration}
            </span>
          )}
        </div>

        {/* Content blocks */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">About This Talk</h3>
            <p className="text-base text-neutral-300 leading-relaxed">{talk.abstract}</p>
          </div>

          {talk.keyTakeaways && talk.keyTakeaways.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Key Takeaways</h3>
              <div className="space-y-3">
                {talk.keyTakeaways.map((takeaway, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white/[0.03] border border-white/6 rounded-lg p-4"
                  >
                    <div className="w-2 h-2 bg-accent-400 rounded-full mt-1.5 shrink-0" />
                    <span className="text-neutral-300">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {talk.topics && talk.topics.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {talk.topics.map((topic) => (
                  <span key={topic} className="badge-accent text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {talk.testimonials && talk.testimonials.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Feedback</h3>
              <div className="space-y-4">
                {talk.testimonials.map((testimonial, i) => (
                  <blockquote key={i} className="border-l-2 border-primary-400 pl-4 py-1">
                    <p className="text-neutral-300 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <cite className="text-primary-400 text-sm not-italic mt-1 block">
                      &mdash; {testimonial.author}
                    </cite>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {talk.links.slides && (
              <Link
                href={talk.links.slides}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                View Slides
                <ExternalLink size={14} />
              </Link>
            )}
            {talk.links.event && (
              <Link
                href={talk.links.event}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Event Page
                <ExternalLink size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

/* ─── Compact Talk Card (for future multi-talk support) ─── */

function CompactTalkCard({ talk }: { talk: Talk }) {
  return (
    <article className="glass-card rounded-xl overflow-hidden flex gap-0">
      {/* Thumbnail */}
      <div className="relative w-32 shrink-0 bg-neutral-700">
        {talk.images.length > 0 ? (
          <OptimizedImage
            src={talk.images[0]}
            alt={`${talk.title} at ${talk.event}`}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Mic size={24} className="text-neutral-500" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col justify-center min-w-0">
        <h4 className="text-base font-semibold text-white truncate">{talk.title}</h4>
        <p className="text-sm text-neutral-400 truncate">{talk.event}</p>
        <p className="text-xs text-neutral-500 mt-1">{formatDate(talk.date)}</p>
      </div>
    </article>
  );
}
