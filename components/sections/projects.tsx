import Link from 'next/link'
import { Github, ExternalLink, Award, Calendar } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/image'
import { cn } from '@/lib/utils'
import projectsData from '@/data/projects.json'

export function ProjectsSection() {
  const featuredProjects = projectsData.filter(project => project.featured)
  const otherProjects = projectsData.filter(project => !project.featured)

  return (
    <section id="projects" className="section-padding bg-white dark:bg-neutral-900">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
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
            />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
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
    <article
      className={cn(
        "group bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Project Image */}
      <div className="relative aspect-hero overflow-hidden bg-neutral-200 dark:bg-neutral-700">
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
          <div className="flex items-center space-x-1 px-3 py-1 bg-black/50 text-white text-sm font-medium rounded-full backdrop-blur-sm">
            <Calendar size={14} />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Outcome Badges */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {project.outcomes.map((outcome, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 px-3 py-1 bg-primary-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm"
            >
              <Award size={14} />
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className={cn(
            "font-bold text-neutral-900 dark:text-white mb-2",
            featured ? "text-2xl" : "text-xl"
          )}>
            {project.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
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
        <div className="flex items-center space-x-4 pt-2">
          {(project.links as any).github && (
            <Link
              href={(project.links as any).github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring"
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
              className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus-ring"
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
              className="inline-flex items-center space-x-1 text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors focus-ring"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Devpost</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}