import Link from 'next/link'
import { MessageCircle, Download, Github, Twitter, Linkedin } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/image'
import { SOCIAL_LINKS, CONTACT_INFO } from '@/lib/utils'
import statsData from '@/data/stats.json'

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  telegram: MessageCircle,
}

export function HeroSection() {
  const metrics = [
    { value: `${statsData.ossProjects}+`, label: 'OSS Projects' },
    { value: statsData.fellowships.toString(), label: 'Fellowships' },
    { value: statsData.totalEarned, label: 'OSS Earnings' },
    { value: `${statsData.hackathonsWon}`, label: 'Hackathon Wins' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/images/hero/1730083623644.JPG"
          alt="Gerson - Web3 Developer and Open Source Contributor"
          fill
          priority={true}
          className="object-cover w-full h-full brightness-90 contrast-105"
          sizes="100vw"
        />
        {/* Multi-layer gradient overlays for enhanced text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent md:from-black/55 md:via-black/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-max section-padding w-full">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <div className="space-y-6 mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
              Gerson
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-2xl font-light drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
              Web3 Developer & Open Source Contributor
            </p>
            <p className="text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-md [text-shadow:_1px_1px_3px_rgb(0_0_0_/_60%)]">
              Building the future of decentralized applications with <strong>Starknet</strong>,
              contributing to open source, and speaking about blockchain technology across Latin America.
            </p>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center backdrop-blur-sm bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base text-white/85 drop-shadow-sm [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
            <Link
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 focus-ring"
            >
              <MessageCircle size={20} />
              <span>Contact via Telegram</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 animate-fade-in">
            <span className="text-white/70 text-sm mr-2">Contact me:</span>
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons]
              return (
                <Link
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 focus-ring"
                  aria-label={`Contact on ${platform}`}
                >
                  <Icon size={20} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}