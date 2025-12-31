import { useEffect, useState, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Dot follows immediately
      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`
        cursorDot.style.top = `${mouseY}px`
      }
    }

    // Smooth follow for main cursor
    const animateCursor = () => {
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY
      
      cursorX += dx * 0.15
      cursorY += dy * 0.15
      
      if (cursor) {
        cursor.style.left = `${cursorX}px`
        cursor.style.top = `${cursorY}px`
      }
      
      requestAnimationFrame(animateCursor)
    }

    // Hover detection
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('card') ||
        target.closest('.card') ||
        target.classList.contains('magnetic')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseLeave = () => {
      setIsHidden(true)
    }

    const handleMouseEnter = () => {
      setIsHidden(false)
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    animateCursor()

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      <div 
        ref={cursorRef}
        className={`cursor ${isHovering ? 'cursor--hover' : ''} ${isHidden ? 'cursor--hidden' : ''}`}
      />
      <div 
        ref={cursorDotRef}
        className={`cursor-dot ${isHidden ? 'cursor--hidden' : ''}`}
      />
    </>
  )
}

