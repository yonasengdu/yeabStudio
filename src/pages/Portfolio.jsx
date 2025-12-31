import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { artworks } from '../data/artworks'
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal'

// Scroll reveal wrapper component
function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })
  
  const directionClass = {
    up: 'reveal--up',
    down: 'reveal--down',
    left: 'reveal--left',
    right: 'reveal--right',
    scale: 'reveal--scale'
  }[direction]

  return (
    <div 
      ref={ref}
      className={`reveal ${directionClass} ${isVisible ? 'reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Animated counter
function Counter({ end, suffix = '' }) {
  const [ref, count] = useCountUp(end, 2000)
  return <span ref={ref}>{count}{suffix}</span>
}

// Magnetic button
function MagneticButton({ children, to, className = '' }) {
  const btnRef = useRef(null)
  
  const handleMouseMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }
  
  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0, 0)'
    }
  }

  return (
    <Link 
      ref={btnRef}
      to={to}
      className={`btn magnetic ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  )
}

// Filter categories
const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'paintings', label: 'Paintings' },
  { id: 'drawings', label: 'Drawings' },
  { id: 'mixed-media', label: 'Mixed Media' },
  { id: 'installations', label: 'Installations' }
]

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'all')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredArtwork, setHoveredArtwork] = useState(null)

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setActiveFilter(category)
    }
  }, [searchParams])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    if (filter === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: filter })
    }
  }

  const filteredArtworks = activeFilter === 'all' 
    ? artworks 
    : artworks.filter(a => a.category === activeFilter)

  // Get featured artwork for hero
  const featuredArtwork = artworks.find(a => a.featured) || artworks[0]

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="portfolio-hero__bg">
          <div 
            className="portfolio-hero__orb portfolio-hero__orb--1"
            style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
          ></div>
          <div 
            className="portfolio-hero__orb portfolio-hero__orb--2"
            style={{ transform: `translate(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px)` }}
          ></div>
          <div className="portfolio-hero__grid"></div>
          <div className="portfolio-hero__noise"></div>
          <div className="portfolio-hero__shape portfolio-hero__shape--1"></div>
          <div className="portfolio-hero__shape portfolio-hero__shape--2"></div>
        </div>

        <div className="container">
          <div className="portfolio-hero__content">
            <span className="portfolio-hero__label fade-up">Collection</span>
            <h1 className="portfolio-hero__title">
              <span className="portfolio-hero__title-line fade-up" style={{ animationDelay: '100ms' }}>VISUAL</span>
              <span className="portfolio-hero__title-line portfolio-hero__title-line--outline fade-up" style={{ animationDelay: '200ms' }}>WORKS</span>
            </h1>
            <p className="portfolio-hero__subtitle fade-up" style={{ animationDelay: '300ms' }}>
              A curated collection of paintings, drawings, and mixed media explorations
            </p>
            <div className="portfolio-hero__count fade-up" style={{ animationDelay: '400ms' }}>
              <span className="portfolio-hero__count-number">{artworks.length}</span>
              <span className="portfolio-hero__count-label">Artworks</span>
            </div>
          </div>
        </div>

        <div className="portfolio-hero__scroll">
          <span>Explore collection</span>
          <div className="portfolio-hero__scroll-line"></div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filters">
        <div className="container">
          <div className="portfolio-filters__wrapper">
            <span className="portfolio-filters__label">Filter by</span>
            <div className="portfolio-filters__tabs">
              {categories.map((cat, index) => (
                <button
                  key={cat.id}
                  className={`portfolio-filters__tab ${activeFilter === cat.id ? 'portfolio-filters__tab--active' : ''}`}
                  onClick={() => handleFilterChange(cat.id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="portfolio-filters__tab-text">{cat.label}</span>
                  {activeFilter === cat.id && (
                    <span className="portfolio-filters__tab-count">
                      {cat.id === 'all' ? artworks.length : artworks.filter(a => a.category === cat.id).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="portfolio-grid-section">
        <div className="container container--wide">
          <div className="portfolio-grid">
            {filteredArtworks.map((artwork, index) => (
              <Reveal 
                key={artwork.id} 
                delay={Math.min(index * 50, 300)}
                direction={index % 3 === 0 ? 'up' : index % 3 === 1 ? 'left' : 'right'}
              >
                <Link 
                  to={`/artwork/${artwork.id}`}
                  className={`portfolio-item ${index % 5 === 0 ? 'portfolio-item--large' : ''}`}
                  onMouseEnter={() => setHoveredArtwork(artwork.id)}
                  onMouseLeave={() => setHoveredArtwork(null)}
                >
                  <div className="portfolio-item__image">
                    <img 
                      src={`/images/artworks/${artwork.images[0]}`}
                      alt={artwork.title}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('portfolio-item__placeholder')
                      }}
                    />
                    <div className="portfolio-item__overlay">
                      <span className="portfolio-item__view">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M15 3H21V9M21 3L13 11M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="portfolio-item__info">
                    <h3 className="portfolio-item__title">{artwork.title}</h3>
                    <div className="portfolio-item__meta">
                      <span>{artwork.year}</span>
                      <span className="portfolio-item__dot">·</span>
                      <span>{artwork.medium}</span>
                    </div>
                    {artwork.available && (
                      <span className="portfolio-item__badge">Available</span>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          
          {filteredArtworks.length === 0 && (
            <div className="portfolio-empty">
              <p>No artworks found in this category.</p>
              <button onClick={() => handleFilterChange('all')} className="btn btn--sm">
                View All Works
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Series */}
      <section className="portfolio-featured">
        <div className="portfolio-featured__bg">
          <div className="portfolio-featured__line portfolio-featured__line--1"></div>
          <div className="portfolio-featured__line portfolio-featured__line--2"></div>
        </div>
        <div className="container">
          <div className="portfolio-featured__grid">
            <Reveal direction="left">
              <div className="portfolio-featured__image">
                <img 
                  src="/images/artworks/urban-reflections-series.jpg" 
                  alt="Urban Reflections Series"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('portfolio-featured__placeholder')
                  }}
                />
                <div className="portfolio-featured__image-accent"></div>
              </div>
            </Reveal>
            <div className="portfolio-featured__content">
              <Reveal>
                <span className="portfolio-featured__label">Featured Series</span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="portfolio-featured__title">Urban Reflections</h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="portfolio-featured__text">
                  This ongoing series explores the relationship between urban architecture and natural light. Through bold geometric compositions and carefully considered color palettes, each piece captures fleeting moments of harmony between the built environment and atmospheric conditions.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="portfolio-featured__details">
                  <div className="portfolio-featured__detail">
                    <span className="portfolio-featured__detail-label">Period</span>
                    <span className="portfolio-featured__detail-value">2021 — Present</span>
                  </div>
                  <div className="portfolio-featured__detail">
                    <span className="portfolio-featured__detail-label">Medium</span>
                    <span className="portfolio-featured__detail-value">Oil on Canvas</span>
                  </div>
                  <div className="portfolio-featured__detail">
                    <span className="portfolio-featured__detail-label">Works</span>
                    <span className="portfolio-featured__detail-value">7 Pieces</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <Link to="/portfolio?category=paintings" className="portfolio-featured__link">
                  <span>Explore Series</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="portfolio-stats">
        <div className="container">
          <div className="portfolio-stats__grid">
            <Reveal delay={0}>
              <div className="portfolio-stats__item">
                <span className="portfolio-stats__number"><Counter end={52} /></span>
                <span className="portfolio-stats__label">Artworks Created</span>
                <div className="portfolio-stats__bar"></div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="portfolio-stats__item">
                <span className="portfolio-stats__number"><Counter end={18} /></span>
                <span className="portfolio-stats__label">Exhibitions</span>
                <div className="portfolio-stats__bar"></div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="portfolio-stats__item">
                <span className="portfolio-stats__number"><Counter end={9} /></span>
                <span className="portfolio-stats__label">Private Collections</span>
                <div className="portfolio-stats__bar"></div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="portfolio-stats__item">
                <span className="portfolio-stats__number"><Counter end={12} /></span>
                <span className="portfolio-stats__label">Years of Practice</span>
                <div className="portfolio-stats__bar"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Commission CTA */}
      <section className="portfolio-cta">
        <div className="portfolio-cta__bg">
          <div className="portfolio-cta__orb portfolio-cta__orb--1"></div>
          <div className="portfolio-cta__orb portfolio-cta__orb--2"></div>
          <div className="portfolio-cta__grid"></div>
        </div>
        <div className="container">
          <div className="portfolio-cta__content">
            <Reveal>
              <span className="portfolio-cta__label">Commission</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="portfolio-cta__title">
                Let's Create Your <span className="highlight">Vision</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="portfolio-cta__text">
                I welcome commissions for custom artworks tailored to your vision and space. Whether you're seeking a statement piece for your home, office, or public installation, I work closely with clients to create meaningful works.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="portfolio-cta__actions">
                <MagneticButton to="/#contact">Start a Conversation</MagneticButton>
                <Link to="/about" className="portfolio-cta__link">
                  <span>Learn About My Process</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
