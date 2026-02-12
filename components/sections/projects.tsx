'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Award, Calendar } from 'lucide-react';
import { motion, m } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { OptimizedImage } from '@/components/ui/image';
import { cn } from '@/lib/utils';
import projectsData from '@/data/projects.json';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const additionalTitleRef = useRef<HTMLHeadingElement>(null);
  const featuredProjects = projectsData.filter(project => project.featured);
  const otherProjects = projectsData.filter(project => !project.featured);

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

      // Additional contributions title animation
      if (additionalTitleRef.current) {
        const splitAdditionalTitle = new SplitType(additionalTitleRef.current, { types: 'chars' });
        gsap.fromTo(splitAdditionalTitle.chars,
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: additionalTitleRef.current,
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
    <section ref={sectionRef} id="projects" className="section-padding bg-white dark:bg-neutral-900">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Building the future of Web3 with innovative applications that solve real problems.
            From arbitration platforms to on-chain games, each project demonstrates technical excellence and practical impact.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={true}
              className="featured-project-card"
            />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h3 ref={additionalTitleRef} className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
                Additional Contributions
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                More experiments and contributions to the ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={false}
                  className="other-project-card"
                />
              ))}
            </div>
          </>
        )}

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link
            href="https://github.com/Gerson2102"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 btn-secondary"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: typeof projectsData[0]
  featured: boolean
  className?: string
}

function ProjectCard({ project, featured, className }: ProjectCardProps) {
  return (
    <m.article
      className={cn(
        "group bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300",
        className
      )}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Project Image */}
      <div className={cn(
        "relative overflow-hidden bg-neutral-200 dark:bg-neutral-700",
        featured ? "aspect-video" : "aspect-hero"
      )}>
        {project.coverImage ? (
          <OptimizedImage
            src={project.coverImage}
            alt={`${project.title} - ${project.summary}`}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-neutral-500 dark:text-neutral-400">
              <Github size={48} className="mx-auto mb-2" />
              <p className="text-sm font-medium">{project.title}</p>
            </div>
          </div>
        )}

        {/* Year Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-1 px-3 py-1 bg-black/50 text-white text-sm font-medium rounded-full backdrop-blur-xs">
            <Calendar size={14} />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Outcome Badges */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {project.outcomes.map((outcome, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 px-3 py-1 bg-primary-500/90 text-white text-sm font-medium rounded-full backdrop-blur-xs"
            >
              <Award size={14} />
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Content */}
      <div className={cn("space-y-3", featured ? "p-5" : "p-6")}>
        <div>
          <h3 className={cn(
            "font-bold text-neutral-900 dark:text-white mb-1.5",
            featured ? "text-xl" : "text-xl"
          )}>
            {project.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {featured ? project.description : project.summary}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="badge-neutral text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4 pt-1">
          {(project.links as any).github && (
            <Link
              href={(project.links as any).github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring py-2"
            >
              <Github size={16} />
              <span className="text-sm">Code</span>
            </Link>
          )}
          {(project.links as any).demo && (
            <Link
              href={(project.links as any).demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus-ring py-2"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Live Demo</span>
            </Link>
          )}
          {(project.links as any).devpost && (
            <Link
              href={(project.links as any).devpost}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors focus-ring py-2"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Devpost</span>
            </Link>
          )}
        </div>
      </div>
    </m.article>
  )
}