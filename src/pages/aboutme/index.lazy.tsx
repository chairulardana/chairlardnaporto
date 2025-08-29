import AboutAMi from '@/components/aboutComponents/aboutAMi'
import Experience from '@/components/aboutComponents/Experience'
import Quote from '@/components/aboutComponents/quots'
import Skills from '@/components/aboutComponents/Skills'
import Education from '@/components/education'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/aboutme/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <AboutAMi />
    <Skills />
    <Experience />
    <div className="min-h-screen bg-[#021129] relative overflow-hidden flex items-center py-12 md:py-8">
    <Education  />
    </div>
        <div className="min-h-screen bg-[#021129] relative overflow-hidden flex items-center py-12 md:py-8">
    <Quote />
    </div>
  </div>
}
