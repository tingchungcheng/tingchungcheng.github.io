import { useEffect, useRef } from 'react'
import { RevealText } from '../components/RevealText'
import { TypingAnimation } from '../components/TypingAnimation'
import { scrollToSection } from '../hooks/useSmoothScroll'

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let frame = 0

    const updateProgress = () => {
      frame = 0
      // The sticky hero releases after its scrollable distance is complete.
      // Keeping this range aligned with that distance makes the fill reach
      // 100% exactly as the next section is allowed to enter.
      const range = Math.max(1, hero.offsetHeight - window.innerHeight)
      const progress = Math.max(
        0,
        Math.min(1, -hero.getBoundingClientRect().top / range),
      )
      // Let the highlighted typography stay present before the next section
      // begins its natural slide-up.
      const textProgress = Math.min(1, progress / 0.78)
      const lineCount = 3

      for (let index = 0; index < lineCount; index += 1) {
        const lineProgress = Math.max(
          0,
          Math.min(1, textProgress * lineCount - index),
        )
        hero.style.setProperty(
          `--hero-line-${index + 1}-unfilled`,
          `${((1 - lineProgress) * 100).toFixed(2)}%`,
        )
      }

      hero.style.setProperty('--hero-progress', progress.toFixed(3))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={heroRef} id="hero" className="section hero-section editorial-hero">
      <div className="hero-sticky">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-inner section-inner">
          <RevealText delay={80} immediate>
            <p className="editorial-kicker">(HELLO) / TING CHUNG CHENG</p>
          </RevealText>
          <RevealText as="div" delay={160} immediate>
            <h1 className="hero-title">
              <span className="hero-title-line">
                <span className="hero-title-line-base">I code, build and</span>
                <span className="hero-title-line-fill" aria-hidden="true">
                  I code, build and
                </span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-line-base">
                  <em>move</em> digital
                </span>
                <span className="hero-title-line-fill" aria-hidden="true">
                  <em>move</em> digital
                </span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-line-base">products.</span>
                <span className="hero-title-line-fill" aria-hidden="true">
                  products.
                </span>
              </span>
            </h1>
          </RevealText>
          <RevealText as="div" className="hero-support" delay={280} immediate>
            <TypingAnimation />
            <button
              type="button"
              className="editorial-arrow-link"
              onClick={() => scrollToSection('work')}
            >
              See the work <span aria-hidden="true">↘</span>
            </button>
          </RevealText>
        </div>
        <div className="hero-bottomline" aria-hidden="true">
          <span>React Native / AWS / AI / side quests</span>
          <span>Scroll gently ↓</span>
          <span>01 / 05</span>
        </div>
      </div>
    </section>
  )
}
