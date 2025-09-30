import Link from 'next/link'
import { ExternalLink, Calendar, DollarSign, Award, Users } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/image'
import { cn, formatDate } from '@/lib/utils'
import fellowshipsData from '@/data/fellowships.json'

export function FellowshipsSection() {
  const activeFellowships = fellowshipsData.filter(f => f.status === 'Active')
  const upcomingFellowships = fellowshipsData.filter(f => f.status === 'Upcoming')
  const completedFellowships = fellowshipsData.filter(f => f.status === 'Completed')

  return (
    <section id="fellowships" className="section-padding bg-white dark:bg-neutral-900">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
            <Award size={16} />
            <span>Fellowships & Programs</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Recognized Excellence
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Selected for competitive fellowship programs that recognize outstanding contributions
            to Web3 development and the open source ecosystem.
          </p>
        </div>

        {/* Fellowship Timeline */}
        <div className="space-y-8">
          {/* Active */}
          {activeFellowships.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
                Currently Active
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activeFellowships.map((fellowship) => (
                  <FellowshipCard key={fellowship.id} fellowship={fellowship} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcomingFellowships.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3" />
                Upcoming
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {upcomingFellowships.map((fellowship) => (
                  <FellowshipCard key={fellowship.id} fellowship={fellowship} />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {completedFellowships.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
                <div className="w-3 h-3 bg-neutral-400 rounded-full mr-3" />
                Completed
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {completedFellowships.map((fellowship) => (
                  <FellowshipCard key={fellowship.id} fellowship={fellowship} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

interface FellowshipCardProps {
  fellowship: typeof fellowshipsData[0]
}

function FellowshipCard({ fellowship }: FellowshipCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
      case 'Completed':
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
      default:
        return 'badge-neutral'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return '🟢'
      case 'Upcoming':
        return '🔵'
      case 'Completed':
        return '✅'
      default:
        return '⚪'
    }
  }

  return (
    <article className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Header with Logo */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 flex-shrink-0 bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
            {fellowship.logo ? (
              <OptimizedImage
                src={fellowship.logo}
                alt={`${fellowship.organization} logo`}
                width={64}
                height={64}
                className="w-full h-full object-contain p-2"
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Award size={24} className="text-neutral-500 dark:text-neutral-400" />
              </div>
            )}
          </div>
          <div className={cn('badge text-xs', getStatusColor(fellowship.status))}>
            <span className="mr-1">{getStatusIcon(fellowship.status)}</span>
            {fellowship.status}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
            {fellowship.program}
          </h3>
          <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
            {fellowship.organization}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{fellowship.cohort}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>{fellowship.duration}</span>
            </div>
            {fellowship.stipend && (
              <div className="flex items-center space-x-1">
                <DollarSign size={14} />
                <span>{fellowship.stipend}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {fellowship.description}
        </p>

        {/* Special Significance */}
        {fellowship.significance && (
          <div className="p-4 bg-accent-50 dark:bg-accent-900/20 rounded-lg border-l-4 border-accent-500">
            <p className="text-accent-800 dark:text-accent-200 text-sm font-medium">
              <strong>Notable:</strong> {fellowship.significance}
            </p>
          </div>
        )}

        {/* Focus Areas */}
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
            Focus Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {fellowship.focus.map((area) => (
              <span
                key={area}
                className="badge-primary text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {fellowship.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          {fellowship.links.program && (
            <Link
              href={fellowship.links.program}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm focus-ring"
            >
              <span>Program Details</span>
              <ExternalLink size={12} />
            </Link>
          )}
          {fellowship.links.profile && (
            <Link
              href={fellowship.links.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm focus-ring"
            >
              <span>My Profile</span>
              <ExternalLink size={12} />
            </Link>
          )}
          {fellowship.links.scholarship && (
            <Link
              href={fellowship.links.scholarship}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors text-sm focus-ring"
            >
              <span>Scholarship Info</span>
              <ExternalLink size={12} />
            </Link>
          )}
        </div>
      </div>

    </article>
  )
}