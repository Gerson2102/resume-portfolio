"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Github, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SOCIAL_LINKS } from '@/lib/utils'

const navigation = [
  { name: 'Projects', href: '#projects' },
  { name: 'Open Source', href: '#oss' },
  { name: 'Experience', href: '#experience' },
  { name: 'Speaking', href: '#speaking' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)

    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-700/50'
          : 'bg-transparent'
      )}
    >
      <nav className="container-max section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-neutral-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus-ring"
          >
            Gerson
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }
                }}
                className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring"
              aria-label="GitHub"
            >
              <Github size={20} />
            </Link>


            <Link
              href="https://docs.google.com/document/d/1P5qe1xyehWKOcOm5KRUHSzSF6CZN_k6J/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Resume</span>
              <ExternalLink size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-neutral-200 dark:border-neutral-700 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault()
                    }
                    handleNavClick(item.href)
                  }}
                  className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring py-2"
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-4">
                  <Link
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </Link>

                </div>

                <Link
                  href="https://docs.google.com/document/d/1P5qe1xyehWKOcOm5KRUHSzSF6CZN_k6J/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Resume</span>
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}