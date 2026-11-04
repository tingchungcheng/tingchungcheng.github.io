import { useEffect, useRef, useState } from 'react'
import { trackButtonClick } from '../lib/analytics'
import { getLenis, scrollToSection } from '../hooks/useSmoothScroll'
import { SidebarIcon } from './SidebarIcon'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: 'home' as const },
  { id: 'quotes', label: 'About', icon: 'comment' as const },
  { id: 'roadmap', label: 'Roadmap', icon: 'roadmap' as const },
  { id: 'work', label: 'Work', icon: 'briefcase' as const },
]

const LINKEDIN_URL = 'https://www.linkedin.com/in/ting-chung-cheng-775a10225/'

/** Viewport line used to decide which section is "current" (matches pinned roadmap). */
const ACTIVE_PROBE_RATIO = 0.38
const CLICK_LOCK_MS = 1400

function getActiveSectionId() {
  const probeY = window.innerHeight * ACTIVE_PROBE_RATIO

  const closing = document.getElementById('closing')
  if (closing && closing.getBoundingClientRect().top <= probeY) {
    return 'work'
  }

  for (let i = NAV_ITEMS.length - 1; i >= 0; i -= 1) {
    const el = document.getElementById(NAV_ITEMS[i].id)
    if (!el) continue

    const { top, bottom } = el.getBoundingClientRect()
    if (top <= probeY && bottom > probeY) {
      return NAV_ITEMS[i].id
    }
  }

  return NAV_ITEMS[0].id
}

export function GlassSidebar() {
  const [activeId, setActiveId] = useState('hero')
  const clickLockRef = useRef(false)
  const clickLockTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const updateActive = () => {
      if (clickLockRef.current) return
      setActiveId(getActiveSectionId())
    }

    updateActive()

    let detachLenis: (() => void) | undefined
    const attachLenis = () => {
      const lenis = getLenis()
      if (!lenis) return false
      lenis.on('scroll', updateActive)
      detachLenis = () => lenis.off('scroll', updateActive)
      return true
    }

    let lenisPollId: number | undefined
    if (!attachLenis()) {
      lenisPollId = window.setInterval(() => {
        if (attachLenis() && lenisPollId !== undefined) {
          window.clearInterval(lenisPollId)
          lenisPollId = undefined
        }
      }, 50)
    }

    window.addEventListener('resize', updateActive)

    return () => {
      if (lenisPollId !== undefined) window.clearInterval(lenisPollId)
      detachLenis?.()
      window.removeEventListener('resize', updateActive)
      if (clickLockTimerRef.current !== null) {
        window.clearTimeout(clickLockTimerRef.current)
      }
    }
  }, [])

  const scrollTo = (id: string) => {
    trackButtonClick(`nav_${id}`)
    setActiveId(id)
    clickLockRef.current = true
    if (clickLockTimerRef.current !== null) {
      window.clearTimeout(clickLockTimerRef.current)
    }
    clickLockTimerRef.current = window.setTimeout(() => {
      clickLockRef.current = false
      clickLockTimerRef.current = null
      setActiveId(getActiveSectionId())
    }, CLICK_LOCK_MS)

    scrollToSection(id)
  }

  return (
    <nav className="glass-sidebar" aria-label="Page sections">
      <button
        type="button"
        className="site-mark"
        onClick={() => scrollTo('hero')}
        aria-label="Back to home"
      >
        ting<span>↗</span>
      </button>
      <span className="site-availability">Available for good problems</span>
      <ul className="glass-sidebar-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`glass-sidebar-link${activeId === item.id ? ' is-active' : ''}`}
              aria-label={item.label}
              aria-current={activeId === item.id ? 'page' : undefined}
              title={item.label}
              onClick={() => scrollTo(item.id)}
            >
              <span className="nav-index">0{NAV_ITEMS.indexOf(item) + 1}</span>
              <span className="nav-label">{item.label}</span>
              <SidebarIcon name={item.icon} bold={activeId === item.id} />
            </button>
          </li>
        ))}
        <li>
          <a
            href={LINKEDIN_URL}
            className="glass-sidebar-link"
            aria-label="LinkedIn profile"
            title="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick('linkedin')}
          >
            <span className="nav-label">LinkedIn</span>
            <SidebarIcon name="linkedin" />
          </a>
        </li>
      </ul>
    </nav>
  )
}
