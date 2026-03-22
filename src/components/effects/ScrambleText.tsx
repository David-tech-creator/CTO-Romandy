'use client'
import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$'

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const iteration = useRef(0)
  const frame = useRef<number>()
  const tick = useRef(0)

  useEffect(() => {
    iteration.current = 0
    tick.current = 0
    const scramble = () => {
      // Mobile is slower CPU — advance faster so effect doesn't drag
      const isMobile = window.innerWidth < 768
      tick.current += 1
      const every = isMobile ? 3 : 5
      const step  = isMobile ? 0.5 : 0.3
      if (tick.current % every === 0) {
        iteration.current += step
      }
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ' || char === '.' || char === ',') return char
          if (i < iteration.current) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (iteration.current < text.length) {
        frame.current = requestAnimationFrame(scramble)
      } else {
        setDisplay(text)
      }
    }
    const timer = setTimeout(() => { frame.current = requestAnimationFrame(scramble) }, 400)
    return () => { clearTimeout(timer); if (frame.current) cancelAnimationFrame(frame.current) }
  }, [text])

  return <span className={className}>{display}</span>
}
