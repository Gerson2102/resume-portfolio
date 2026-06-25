'use client';

import Link from 'next/link';
import { Github, ExternalLink, Award, Calendar } from 'lucide-react';
import { m } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/image';
import { RevealHeading } from '@/components/ui/reveal-heading';
import { cn } from '@/lib/utils';
import projectsData from '@/data/projects.json';

type Project = Omit<(typeof projectsData)[number], 'links'> & {
  links: { github?: string; demo?: string; devpost?: string }
}

const projects = projectsData as Project[]

export function ProjectsSection() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="section-padding bg-neutral-900">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <RevealHeading as="h2" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </RevealHeading>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Building the future of Web3 with innovative applications that solve real problems.
            From arbitration platforms to on-chain games, each project demonstrates technical excellence and practical impact.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
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
              <RevealHeading as="h3" className="text-2xl font-semibold text-white mb-2">
                Additional Contributions
              </RevealHeading>
              <p className="text-neutral-400">
                More experiments and contributions to the ecosystem
              </p>
            </div>

            <div className={cn(
              "grid grid-cols-1 gap-6",
              otherProjects.length <= 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 xl:grid-cols-3"
            )}>
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
  project: Project
  featured: boolean
  className?: string
}

function ProjectCard({ project, featured, className }: ProjectCardProps) {
  return (
    <m.article
      className={cn(
        "group bg-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300",
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
        "relative overflow-hidden bg-neutral-700",
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
            <div className="text-center text-neutral-400">
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
          <h3 className="font-bold text-white mb-1.5 text-xl">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
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
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-neutral-400 hover:text-white transition-colors focus-ring py-2"
            >
              <Github size={16} />
              <span className="text-sm">Code</span>
            </Link>
          )}
          {project.links.demo && (
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary-400 hover:text-primary-300 transition-colors focus-ring py-2"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Live Demo</span>
            </Link>
          )}
          {project.links.devpost && (
            <Link
              href={project.links.devpost}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-accent-400 hover:text-accent-300 transition-colors focus-ring py-2"
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
