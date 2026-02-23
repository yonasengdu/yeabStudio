import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Add shadow when scrolled
      setScrolled(currentScrollY > 10)

      // Hide/show on scroll (only after scrolling down 300px)
      if (currentScrollY > 300) {
        setHidden(currentScrollY > lastScrollY)
      } else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.style.overflow = !menuOpen ? 'hidden' : ''
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${hidden ? 'header--hidden' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo">Artist Name</Link>

        <nav className={`header__nav ${menuOpen ? 'active' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink 
            to="/portfolio" 
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            onClick={closeMenu}
          >
            Artworks
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </nav>

        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

