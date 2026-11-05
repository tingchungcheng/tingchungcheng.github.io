import { RevealText } from '../components/RevealText'

export function ClosingSection() {
  return (
    <section id="closing" className="section closing-section">
      <div className="closing-stage">
        <div className="closing-content">
          <RevealText delay={80}>
            <p className="editorial-kicker">04 / Keep in touch</p>
          </RevealText>
          <RevealText as="h2" className="closing-text" delay={160}>
            Have a good problem? Let&apos;s make it move.
          </RevealText>
          <RevealText as="div" className="closing-links" delay={280}>
            <a
              className="closing-link"
              href="https://github.com/tingchungcheng"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              className="closing-link"
              href="https://www.linkedin.com/in/ting-chung-cheng-775a10225/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find me on LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </RevealText>
          <p className="closing-footer">Built with curiosity in Malaysia · 2026</p>
        </div>
      </div>
    </section>
  )
}
