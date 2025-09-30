import { HeroSection } from '@/components/sections/hero'
import { ProjectsSection } from '@/components/sections/projects'
import { OpenSourceSection } from '@/components/sections/open-source'
import { ExperienceSection } from '@/components/sections/experience'
import { SpeakingSection } from '@/components/sections/speaking'
import { FellowshipsSection } from '@/components/sections/fellowships'
import { ContactSection } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <OpenSourceSection />
      <ExperienceSection />
      <SpeakingSection />
      <FellowshipsSection />
      <ContactSection />
    </>
  )
}