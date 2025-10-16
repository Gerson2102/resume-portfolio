'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { MessageCircle, Mail, Calendar, MapPin, Github, Linkedin } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';
import { motion, m } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const socialIcons = {
  github: Github,
  twitter: BsTwitterX,
  linkedin: Linkedin,
  telegram: MessageCircle,
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const opportunitiesTitleRef = useRef<HTMLHeadingElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Main title animation
      if (titleRef.current) {
        const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
        gsap.from(splitTitle.chars, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Opportunities title animation
      if (opportunitiesTitleRef.current) {
        const splitOpportunitiesTitle = new SplitType(opportunitiesTitleRef.current, { types: 'chars' });
        gsap.from(splitOpportunitiesTitle.chars, {
          scrollTrigger: {
            trigger: opportunitiesTitleRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Contact title animation
      if (contactTitleRef.current) {
        const splitContactTitle = new SplitType(contactTitleRef.current, { types: 'chars' });
        gsap.from(splitContactTitle.chars, {
          scrollTrigger: {
            trigger: contactTitleRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-800">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Let's Build Together
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Open to full-time Web3 developer positions, consulting opportunities, speaking engagements,
            and collaborations on innovative blockchain projects.
          </p>
        </div>

        {/* Opportunities Section - Moved up */}
        <div className="space-y-8 mb-16">
          <h3 ref={opportunitiesTitleRef} className="text-2xl font-semibold text-neutral-900 dark:text-white text-center">
            What I'm Looking For
          </h3>

          {/* Opportunities Grid - Horizontal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <OpportunityCard
              title="Full-time Web3 Developer"
              description="Seeking roles in Starknet/Cairo development, Ethereum infrastructure, DeFi protocols, or developer tooling."
              highlights={[
                'Starknet & Cairo expertise',
                'Production Rust/Python experience',
                'Strong open source track record',
                'Remote-first preferred'
              ]}
              bgColor="bg-green-50 dark:bg-green-900/20"
              borderColor="border-green-500"
              textColor="text-green-800 dark:text-green-200"
            />

            <OpportunityCard
              title="Speaking Engagements"
              description="Available for conferences, meetups, and workshops on blockchain development and Web3 applications."
              highlights={[
                'Web3 & blockchain fundamentals',
                'Starknet development',
                'Open source contribution',
                'Spanish & English fluency'
              ]}
              bgColor="bg-blue-50 dark:bg-blue-900/20"
              borderColor="border-blue-500"
              textColor="text-blue-800 dark:text-blue-200"
            />

            <OpportunityCard
              title="Consulting & Collaboration"
              description="Open to short-term consulting projects and technical collaborations on innovative Web3 solutions."
              highlights={[
                'Smart contract development',
                'Protocol design & architecture',
                'Developer experience optimization',
                'Technical due diligence'
              ]}
              bgColor="bg-purple-50 dark:bg-purple-900/20"
              borderColor="border-purple-500"
              textColor="text-purple-800 dark:text-purple-200"
            />
          </div>
        </div>

        {/* Get In Touch Section - Redesigned horizontally without image */}
        <div className="space-y-8">
          <h3 ref={contactTitleRef} className="text-2xl font-semibold text-neutral-900 dark:text-white text-center">
            Get In Touch
          </h3>

          {/* Primary Contact - Telegram (centered) */}
          <div className="primary-contact-card max-w-2xl mx-auto p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border-l-4 border-primary-500">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <MessageCircle className="text-primary-600 dark:text-primary-400" size={24} />
                <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Preferred Contact
                </span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300">
                For fastest response, reach out via Telegram. I'm usually online and respond within hours.
              </p>
              <Link
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg transition-colors focus-ring"
              >
                <MessageCircle size={20} />
                <span>Message {CONTACT_INFO.telegram}</span>
              </Link>
            </div>
          </div>

          {/* Contact Details - Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Location */}
            <div className="contact-detail text-center space-y-3">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto">
                <MapPin size={24} className="text-neutral-600 dark:text-neutral-400" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Based in {CONTACT_INFO.location}</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Available for remote work worldwide</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-detail text-center space-y-3">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto">
                <Mail size={24} className="text-neutral-600 dark:text-neutral-400" />
              </div>
              <div>
                <Link
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="font-semibold text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-ring block mb-1"
                >
                  {CONTACT_INFO.email}
                </Link>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Professional inquiries welcome</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="contact-detail text-center space-y-3">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto">
                <Calendar size={24} className="text-neutral-600 dark:text-neutral-400" />
              </div>
              <div>
                <Link
                  href="https://calendly.com/gersonloavas/30min"
                  className="font-semibold text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-ring block mb-1"
                >
                  Schedule a call
                </Link>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Book a time that works for both of us</p>
              </div>
            </div>
          </div>

          {/* Social Links - Centered */}
          <div className="text-center space-y-4">
            <h4 className="font-semibold text-neutral-900 dark:text-white">
              Follow My Work
            </h4>
            <div className="flex items-center justify-center space-x-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];

                return (
                  <m.div
                    key={platform}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="social-link"
                  >
                    <Link
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-md transition-all duration-200 focus-ring"
                      aria-label={`Follow on ${platform}`}
                    >
                      <Icon size={24} />
                    </Link>
                  </m.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface OpportunityCardProps {
  title: string
  description: string
  highlights: string[]
  bgColor: string
  borderColor: string
  textColor: string
}

function OpportunityCard({
  title,
  description,
  highlights,
  bgColor,
  borderColor,
  textColor
}: OpportunityCardProps) {
  return (
    <m.div
      className={`opportunity-card p-4 ${bgColor} rounded-lg border-l-4 ${borderColor}`}
      whileHover={{
        scale: 1.03,
        x: 5,
        transition: { duration: 0.2 },
      }}
    >
      <h4 className={`font-semibold ${textColor} mb-2`}>
        {title}
      </h4>
      <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-3">
        {description}
      </p>
      <ul className="space-y-1">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm">
            <div className={`w-1.5 h-1.5 rounded-full ${borderColor.replace('border-', 'bg-')}`} />
            <span className="text-neutral-700 dark:text-neutral-300">
              {highlight}
            </span>
          </li>
        ))}
      </ul>
    </m.div>
  )
}