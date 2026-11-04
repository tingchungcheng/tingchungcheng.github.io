import { useEffect, useState } from 'react'
import quotes from '../data/quotes.json'

const TYPE_MS = 36
const PAUSE_MS = 4200
const DELETE_MS = 18

export function useTypingQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fullQuote = quotes[quoteIndex]

    if (!deleting && text === fullQuote) {
      const pause = window.setTimeout(() => setDeleting(true), PAUSE_MS)
      return () => window.clearTimeout(pause)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setQuoteIndex((index) => (index + 1) % quotes.length)
      return
    }

    const delay = deleting ? DELETE_MS : TYPE_MS
    const timer = window.setTimeout(() => {
      setText((current) =>
        deleting
          ? current.slice(0, -1)
          : fullQuote.slice(0, current.length + 1),
      )
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, quoteIndex, text])

  return text
}
