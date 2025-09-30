import Link from 'next/link'
import { Github, Twitter, Linkedin, MessageCircle, ExternalLink } from 'lucide-react'
import { SOCIAL_LINKS, CONTACT_INFO } from '@/lib/utils'

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  telegram: MessageCircle,
}

export function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Gerson
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-sm">
              Web3 Developer & Open Source Contributor building the future of decentralized applications.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                📍 {CONTACT_INFO.location}
              </p>
              <Link
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus-ring"
              >
                <MessageCircle size={16} />
                <span>{CONTACT_INFO.telegram}</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 dark:text-white">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Featured Projects', href: '#projects' },
                { name: 'Open Source', href: '#oss' },
                { name: 'Speaking', href: '#speaking' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 dark:text-white">
              Recent Achievements
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>🏆 OnlyDust Fellowship 2025</li>
              <li>🥉 3rd Best Starknet dApp</li>
              <li>🎓 Ethereum Foundation Scholar</li>
              <li>💰 $10k+ from OSS contributions</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons]
                return (
                  <Link
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring"
                    aria-label={`Follow on ${platform}`}
                  >
                    <Icon size={20} />
                  </Link>
                )
              })}
            </div>

            {/* Copyright & Links */}
            <div className="flex items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400">
              <span>© 2025 Gerson. All rights reserved.</span>
              <Link
                href="/resume"
                className="inline-flex items-center space-x-1 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring"
              >
                <span>Resume</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}