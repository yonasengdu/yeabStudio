import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setActiveFilter(category)
    }
  }, [searchParams])

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

  return (
    <div className="portfolio-page">
      {/* Global background */}
      <div className="page-bg">
        <div className="page-bg__grid"></div>
        <div className="page-bg__noise"></div>
      </div>

      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <div className="portfolio-hero__content">
            <span className="portfolio-hero__label">
              <span className="portfolio-hero__label-icon">◈</span>
              Collection
            </span>
            <h1 className="portfolio-hero__title">
              <span className="portfolio-hero__title-line">Visual</span>
              <span className="portfolio-hero__title-line portfolio-hero__title-line--accent">Works</span>
            </h1>
            <p className="portfolio-hero__subtitle">
              A curated collection of paintings, drawings, and mixed media explorations
            </p>
            <div className="portfolio-hero__count">
              <span className="portfolio-hero__count-number">{artworks.length}</span>
              <span className="portfolio-hero__count-label">Artworks</span>
            </div>
          </div>
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
                direction="up"
              >
                <Link 
                  to={`/artwork/${artwork.id}`}
                  className={`portfolio-item ${index % 5 === 0 ? 'portfolio-item--large' : ''}`}
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
        <div className="container">
          <div className="portfolio-cta__content">
            <Reveal>
              <span className="portfolio-cta__label">
                <span className="portfolio-cta__label-icon">◈</span>
                Commission
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="portfolio-cta__title">
                Let's Create Your <span className="portfolio-cta__title-accent">Vision</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="portfolio-cta__text">
                I welcome commissions for custom artworks tailored to your vision and space. Whether you're seeking a statement piece for your home, office, or public installation, I work closely with clients to create meaningful works.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="portfolio-cta__actions">
                <Link to="/#contact" className="btn">Start a Conversation</Link>
                <Link to="/about" className="portfolio-cta__link">
                  <span>Learn About My Process</span>
                  <span className="portfolio-cta__link-arrow">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
