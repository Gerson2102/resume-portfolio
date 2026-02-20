import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/hero'

const DevconnectSection = dynamic(() => import('@/components/sections/devconnect').then(m => ({ default: m.DevconnectSection })))
const FellowshipsSection = dynamic(() => import('@/components/sections/fellowships').then(m => ({ default: m.FellowshipsSection })))
const ExperienceSection = dynamic(() => import('@/components/sections/experience').then(m => ({ default: m.ExperienceSection })))
const OpenSourceSection = dynamic(() => import('@/components/sections/open-source').then(m => ({ default: m.OpenSourceSection })))
const SpeakingSection = dynamic(() => import('@/components/sections/speaking').then(m => ({ default: m.SpeakingSection })))
const ProjectsSection = dynamic(() => import('@/components/sections/projects').then(m => ({ default: m.ProjectsSection })))
const ContactSection = dynamic(() => import('@/components/sections/contact').then(m => ({ default: m.ContactSection })))

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DevconnectSection />
      <FellowshipsSection />
      <ExperienceSection />
      <OpenSourceSection />
      <SpeakingSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}
