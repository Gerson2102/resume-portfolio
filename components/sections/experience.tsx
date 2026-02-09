'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ExternalLink, Calendar, MapPin, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { OptimizedImage } from '@/components/ui/image';
import experienceData from '@/data/experience.json';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-padding bg-white dark:bg-neutral-900">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-accent-100 dark:bg-accent-900/50 text-accent-800 dark:text-accent-200 rounded-full text-sm font-medium">
            <Building2 size={16} />
            <span>Professional Experience</span>
          </div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Building Web3 Infrastructure
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Hands-on experience with leading Web3 companies, contributing to core Ethereum infrastructure
            and advancing the ecosystem through production-ready code.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experienceData.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: typeof experienceData[0];
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.article
      className="experience-card glass-card rounded-xl p-8 hover:shadow-lg transition-all duration-300"
      whileHover={{
        y: -8,
        scale: 1.01,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        transition: { duration: 0.3 },
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Company Info & Image */}
        <div className="lg:col-span-1 space-y-4">
          <motion.div
            className="aspect-square max-w-48 mx-auto lg:mx-0 bg-neutral-100 dark:bg-neutral-700 rounded-xl overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            {experience.images ? (
              <OptimizedImage
                src={experience.images[0]}
                alt={`${experience.company} logo`}
                width={192}
                height={192}
                className="w-full h-full object-contain p-4"
                sizes="192px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-neutral-500 dark:text-neutral-400">
                  <Building2 size={48} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{experience.company}</p>
                </div>
              </div>
            )}
          </motion.div>

          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
              {experience.company}
            </h3>
            <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
              {experience.role}
            </p>
            <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center justify-center lg:justify-start space-x-1">
                <Calendar size={14} />
                <span>{experience.duration} • {experience.period}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-1">
                <MapPin size={14} />
                <span>{experience.location}</span>
              </div>
              {experience.team && (
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  <Building2 size={14} />
                  <span>Team: {experience.team}</span>
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-center lg:justify-start space-x-4">
            {experience.links.company && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={experience.links.company}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm focus-ring py-2"
                >
                  <span>{experience.company}</span>
                  <ExternalLink size={12} />
                </Link>
              </motion.div>
            )}
            {experience.links?.alpen && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={experience.links.alpen}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm focus-ring py-2"
                >
                  <span>Alpen Labs</span>
                  <ExternalLink size={12} />
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Experience Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {experience.description}
          </p>

          {/* Responsibilities */}
          <div>
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
              Key Responsibilities
            </h4>
            <ul className="space-y-2">
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0" />
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {responsibility}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
              Key Achievements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experience.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  whileHover={{ scale: 1.03, x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-green-800 dark:text-green-200">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  className="badge-primary text-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
