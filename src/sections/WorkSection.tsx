import { RevealText } from '../components/RevealText'
import { WorkProjectCard } from '../components/WorkProjectCard'
import { workProjects } from '../data/workProjects'

export function WorkSection() {
  return (
    <section id="work" className="section work-section editorial-work">
      <div className="section-inner work-section-inner">
        <div className="editorial-section-head work-section-head">
          <span>03 / Selected work</span>
          <span>{String(workProjects.length).padStart(2, '0')} projects, give or take</span>
        </div>
        <div className="work-intro">
          <RevealText as="h2" delay={0}>
            Things I&apos;ve shipped, shaped and still tinkering with.
          </RevealText>
          <RevealText as="p" delay={100}>
            A small archive of products, prototypes and experiments across
            mobile, web, cloud and machine learning.
          </RevealText>
        </div>
        <ul className="work-grid">
          {workProjects.map((project, index) => (
            <li key={project.id}>
              <RevealText delay={80 + index * 60}>
                <WorkProjectCard project={project} />
              </RevealText>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
