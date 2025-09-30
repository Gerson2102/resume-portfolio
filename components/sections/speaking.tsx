import Link from 'next/link'
import { ExternalLink, Calendar, MapPin, Users, Mic } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/image'
import { Gallery } from '@/components/ui/lightbox'
import { formatDate } from '@/lib/utils'
import talksData from '@/data/talks.json'

export function SpeakingSection() {
  return (
    <section id="speaking" className="section-padding bg-neutral-50 dark:bg-neutral-800">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-accent-100 dark:bg-accent-900/50 text-accent-800 dark:text-accent-200 rounded-full text-sm font-medium">
            <Mic size={16} />
            <span>Speaking & Education</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Sharing Knowledge
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Passionate about educating the Latin American developer community about Web3 and blockchain technology.
            Speaking at conferences to promote practical applications beyond speculation.
          </p>
        </div>

        {/* Talks */}
        <div className="space-y-16">
          {talksData.map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>

        {/* Speaking Availability CTA */}
        <div className="text-center mt-16 p-8 glass-card rounded-xl">
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Available for Speaking
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
            Interested in having me speak at your event? I'm available for conferences, meetups,
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
  )
}

interface TalkCardProps {
  talk: typeof talksData[0]
}

function TalkCard({ talk }: TalkCardProps) {
  // Convert image paths to gallery format for lightbox
  const galleryImages = talk.images.map(imagePath => ({
    src: imagePath,
    alt: `${talk.title} at ${talk.event}`,
    caption: `${talk.title} - ${talk.event} ${talk.date}`
  }))

  return (
    <article className="glass-card rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Main Stage Image */}
        <div className="relative aspect-hero lg:aspect-square bg-neutral-200 dark:bg-neutral-700">
          {talk.images && talk.images.length > 0 ? (
            <OptimizedImage
              src={talk.images[0]}
              alt={`${talk.title} presentation at ${talk.event}`}
              fill
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-neutral-500 dark:text-neutral-400">
                <Mic size={48} className="mx-auto mb-2" />
                <p className="text-sm font-medium">{talk.title}</p>
                <p className="text-xs">{talk.event}</p>
              </div>
            </div>
          )}

          {/* Event Badge */}
          <div className="absolute top-4 left-4">
            <div className="px-4 py-2 bg-black/50 backdrop-blur-sm text-white text-sm font-medium rounded-full">
              {talk.event}
            </div>
          </div>

          {/* Language Badge */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {talk.language}
            </div>
          </div>
        </div>

        {/* Talk Details */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              {talk.title}
            </h3>
            {talk.subtitle && (
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                {talk.subtitle}
              </p>
            )}

            {/* Event Info */}
            <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar size={14} />
                <span>{formatDate(talk.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>{talk.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={14} />
                <span>{talk.audience}</span>
              </div>
              {talk.duration && (
                <div className="flex items-center space-x-2">
                  <Mic size={14} />
                  <span>{talk.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Abstract */}
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
              About This Talk
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {talk.abstract}
            </p>
          </div>

          {/* Key Takeaways */}
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
              Key Takeaways
            </h4>
            <ul className="space-y-2">
              {talk.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {takeaway}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
              Topics Covered
            </h4>
            <div className="flex flex-wrap gap-2">
              {talk.topics.map((topic) => (
                <span
                  key={topic}
                  className="badge-accent text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {talk.links.slides && (
              <Link
                href={talk.links.slides}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus-ring"
              >
                <span>View Slides</span>
                <ExternalLink size={14} />
              </Link>
            )}
            {(talk.links as any).video && (
              <Link
                href={(talk.links as any).video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors focus-ring"
              >
                <span>Watch Video</span>
                <ExternalLink size={14} />
              </Link>
            )}
            {talk.links.event && (
              <Link
                href={talk.links.event}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring"
              >
                <span>Event Page</span>
                <ExternalLink size={14} />
              </Link>
            )}
          </div>

          {/* Testimonials */}
          {talk.testimonials && talk.testimonials.length > 0 && (
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
                Feedback
              </h4>
              <div className="space-y-4">
                {talk.testimonials.map((testimonial, index) => (
                  <blockquote key={index} className="border-l-4 border-primary-500 pl-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg">
                    <p className="text-primary-800 dark:text-primary-200 text-sm italic mb-1">
                      "{testimonial.text}"
                    </p>
                    <cite className="text-primary-600 dark:text-primary-400 text-xs font-medium">
                      — {testimonial.author}
                    </cite>
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images Gallery */}
      {talk.images.length > 1 && (
        <div className="p-8 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">
            Event Photos
          </h4>
          <Gallery
            images={galleryImages.slice(1)} // Skip the first image since it's already shown above
            columns={4}
            aspectRatio="photo"
          />
        </div>
      )}
    </article>
  )
}