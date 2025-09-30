import Link from 'next/link'
import { Github, ExternalLink, DollarSign, GitPullRequest, MessageSquare } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/image'
import { cn, formatDate } from '@/lib/utils'
import ossData from '@/data/oss.json'

export function OpenSourceSection() {
  const featuredContributions = ossData.filter(contrib => contrib.featured)
  const totalEarned = ossData.reduce((sum, contrib) => {
    return sum + parseFloat(contrib.reward.replace('$', '').replace(',', ''))
  }, 0)

  return (
    <section id="oss" className="section-padding bg-neutral-50 dark:bg-neutral-800">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
            <Github size={16} />
            <span>Open Source Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
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
                className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm focus-ring"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredContributions.map((contribution) => (
              <ContributionCard key={contribution.id} contribution={contribution} />
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
}

function ContributionCard({ contribution }: ContributionCardProps) {
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

  return (
    <article className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getTypeIcon(contribution.type)}</span>
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white">
              {contribution.title}
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {contribution.repository}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 text-sm font-medium rounded-full">
          <DollarSign size={12} />
          <span>{contribution.reward}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
        {contribution.description}
      </p>

      {/* Impact */}
      <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        <p className="text-primary-800 dark:text-primary-200 text-sm font-medium">
          <strong>Impact:</strong> {contribution.impact}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={cn('badge text-xs', getTypeColor(contribution.type))}>
          {contribution.type}
        </span>
        {contribution.tech.map((tech) => (
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
          <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
            "{contribution.maintainerFeedback}"
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-600">
        <div className="flex items-center space-x-4">
          <Link
            href={contribution.links.pr}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm focus-ring"
          >
            <GitPullRequest size={14} />
            <span>View PR</span>
          </Link>
          <Link
            href={contribution.links.onlydust}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm focus-ring"
          >
            <ExternalLink size={14} />
            <span>OnlyDust</span>
          </Link>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          {formatDate(contribution.date)}
        </div>
      </div>
    </article>
  )
}