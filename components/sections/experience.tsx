'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ExternalLink, Calendar, MapPin, Building2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { OptimizedImage } from '@/components/ui/image';
import experienceData from '@/data/experience.json';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'responsibilities', label: 'Responsibilities' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'tech', label: 'Tech Stack' },
] as const;

type TabId = (typeof TABS)[number]['id'];
type Experience = (typeof experienceData)[0];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
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

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experience = experienceData[0];

  return (
    <section ref={sectionRef} id="experience" className="section-padding bg-white dark:bg-neutral-900">
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-accent-100 dark:bg-accent-900/50 text-accent-800 dark:text-accent-200 rounded-full text-sm font-medium">
            <Building2 size={16} />
            <span>Professional Experience</span>
          </div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            Building Web3 Infrastructure
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Hands-on experience with leading Web3 companies, contributing to core Ethereum
            infrastructure and advancing the ecosystem through production-ready code.
          </p>
        </div>

        <div ref={cardRef} className="max-w-[900px] mx-auto">
          <ExperienceCard experience={experience} />
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div
      className="glass-card rounded-xl overflow-hidden"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 0 40px rgba(56, 189, 248, 0.04)',
      }}
    >
      <div className="flex flex-col md:flex-row">
        <CompanyIdentity experience={experience} />
        <div className="flex-1 min-w-0">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
          <ContentPanel activeTab={activeTab} experience={experience} />
        </div>
      </div>
    </div>
  );
}

function CompanyIdentity({ experience }: { experience: Experience }) {
  return (
    <div
      className="p-6 md:p-7 md:w-[220px] lg:w-[280px] shrink-0 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r"
      style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}
    >
      <div className="w-16 h-16 md:w-16 md:h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-700 mb-4">
        {experience.images ? (
          <OptimizedImage
            src={experience.images[0]}
            alt={`${experience.company} logo`}
            width={64}
            height={64}
            className="w-full h-full object-contain p-2"
            sizes="64px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 size={28} className="text-neutral-400" />
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white">{experience.company}</h3>
      <p className="text-sm text-primary-400 font-medium mt-1">{experience.role}</p>

      <div className="mt-5 space-y-2 text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="shrink-0" />
          <span>
            {experience.duration} &middot; {experience.period}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="shrink-0" />
          <span>{experience.location}</span>
        </div>
        {experience.team && (
          <div className="flex items-center gap-2">
            <Building2 size={14} className="shrink-0" />
            <span>Team: {experience.team}</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex gap-4">
        {experience.links.company && (
          <Link
            href={experience.links.company}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            <span>{experience.company}</span>
            <ExternalLink size={12} />
          </Link>
        )}
        {experience.links?.alpen && (
          <Link
            href={experience.links.alpen}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            <span>Alpen Labs</span>
            <ExternalLink size={12} />
          </Link>
        )}
      </div>
    </div>
  );
}

function TabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const updateIndicator = useCallback(() => {
    const activeIndex = TABS.findIndex((t) => t.id === activeTab);
    const el = tabRefs.current[activeIndex];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = TABS.findIndex((t) => t.id === activeTab);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = TABS.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    onTabChange(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      className="relative overflow-x-auto"
      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
    >
      <div className="flex" role="tablist" onKeyDown={handleKeyDown}>
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-4 lg:px-5 py-3 text-xs md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'text-primary-400'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/50 focus-visible:ring-inset`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {indicator.width > 0 && (
        <motion.div
          className="absolute bottom-0 h-0.5 bg-primary-400 rounded-full"
          animate={{ left: indicator.left, width: indicator.width }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 400, damping: 30 }
          }
        />
      )}
    </div>
  );
}

function ContentPanel({
  activeTab,
  experience,
}: {
  activeTab: TabId;
  experience: Experience;
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      };

  return (
    <div className="min-h-[320px]" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          {...motionProps}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="p-5 md:p-8"
        >
          {activeTab === 'overview' && <OverviewPanel experience={experience} />}
          {activeTab === 'responsibilities' && (
            <ResponsibilitiesPanel responsibilities={experience.responsibilities} />
          )}
          {activeTab === 'achievements' && (
            <AchievementsPanel achievements={experience.achievements} />
          )}
          {activeTab === 'tech' && <TechStackPanel technologies={experience.technologies} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function OverviewPanel({ experience }: { experience: Experience }) {
  return (
    <div className="space-y-6">
      <p className="text-base text-neutral-300 leading-relaxed">{experience.description}</p>
      <div
        className="rounded-r-lg p-4"
        style={{
          borderLeft: '2px solid var(--color-primary-400)',
          background: 'rgba(56, 189, 248, 0.04)',
        }}
      >
        <p className="text-sm text-neutral-300">
          Contributed directly to Ethereum core infrastructure used in production by validators
          worldwide.
        </p>
      </div>
    </div>
  );
}

function ResponsibilitiesPanel({ responsibilities }: { responsibilities: string[] }) {
  return (
    <ul className="space-y-3">
      {responsibilities.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-primary-400 mt-1 shrink-0">&bull;</span>
          <span className="text-base text-neutral-300">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AchievementsPanel({ achievements }: { achievements: string[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {achievements.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-4 rounded-lg transition-all duration-200 cursor-default"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.3)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(74, 222, 128, 0.08)';
            e.currentTarget.style.background = 'rgba(74, 222, 128, 0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
        >
          <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
          <span className="text-sm text-neutral-300">{item}</span>
        </div>
      ))}
    </div>
  );
}

function TechStackPanel({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="px-4 py-2 rounded-full text-sm text-neutral-200 transition-all duration-200 cursor-default hover:border-primary-400/30"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
