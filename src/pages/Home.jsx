import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { artworks } from '../data/artworks'
import { exhibitions } from '../data/exhibitions'
import ContactForm from '../components/ContactForm'
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

// Animated counter component
function Counter({ end, suffix = '' }) {
  const [ref, count] = useCountUp(end, 2000)
  return <span ref={ref}>{count}{suffix}</span>
}

// Text reveal animation
function TextReveal({ children, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 })
  
  return (
    <span 
      ref={ref}
      className={`text-reveal ${isVisible ? 'text-reveal--visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-reveal__inner">{children}</span>
    </span>
  )
}

// Magnetic button component
function MagneticButton({ children, to, className = '' }) {
  const buttonRef = useRef(null)
  
  const handleMouseMove = (e) => {
    const button = buttonRef.current
    if (!button) return
    
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }
  
  const handleMouseLeave = () => {
    const button = buttonRef.current
    if (button) {
      button.style.transform = 'translate(0, 0)'
    }
  }

  return (
    <Link 
      ref={buttonRef}
      to={to}
      className={`btn magnetic ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  )
}

export default function Home() {
  const featuredWorks = artworks.filter(a => a.featured).slice(0, 3)
  const recentExhibitions = exhibitions.slice(0, 3)
  const showcaseArtworks = artworks.slice(0, 4)
  
  // Parallax effect for hero elements
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mouse position for interactive elements
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="home">
      {/* Global floating shapes that extend throughout the page */}
      <div className="home__floating-shapes">
        <div className="floating-shape floating-shape--1" style={{ transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px)` }}></div>
        <div className="floating-shape floating-shape--2" style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)` }}></div>
        <div className="floating-shape floating-shape--3" style={{ transform: `translate(${mousePos.x * 0.025}px, ${mousePos.y * 0.025}px)` }}></div>
        <div className="floating-shape floating-shape--4" style={{ transform: `translate(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px)` }}></div>
        <div className="floating-shape floating-shape--5" style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}></div>
        <div className="floating-shape floating-shape--6" style={{ transform: `translate(${mousePos.x * -0.025}px, ${mousePos.y * -0.025}px)` }}></div>
        <div className="floating-shape floating-shape--7"></div>
        <div className="floating-shape floating-shape--8"></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        {/* Framer-style background */}
        <div className="hero__bg">
          <div 
            className="hero__gradient-orb hero__gradient-orb--1"
            style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
          ></div>
          <div 
            className="hero__gradient-orb hero__gradient-orb--2"
            style={{ transform: `translate(${mousePos.x * -0.01}px, ${mousePos.y * -0.01}px)` }}
          ></div>
          <div 
            className="hero__gradient-orb hero__gradient-orb--3"
            style={{ transform: `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)` }}
          ></div>
          <div className="hero__grid"></div>
          <div className="hero__noise"></div>
          {/* Floating geometric shapes - enhanced */}
          <div className="hero__shape hero__shape--1"></div>
          <div className="hero__shape hero__shape--2"></div>
          <div className="hero__shape hero__shape--3"></div>
          <div className="hero__shape hero__shape--4"></div>
          <div className="hero__shape hero__shape--5"></div>
          <div className="hero__shape hero__shape--6"></div>
          {/* Floating particles - glowing */}
          <div className="hero__particles">
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span>
          </div>
          {/* Corner accents */}
          <div className="hero__corner hero__corner--tl"></div>
          <div className="hero__corner hero__corner--tr"></div>
          <div className="hero__corner hero__corner--bl"></div>
          <div className="hero__corner hero__corner--br"></div>
        </div>
        
        <div className="hero__content">
          <div className="hero__text">
            <span className="hero__label fade-up">Contemporary Visual Artist</span>
            <h1 className="hero__title">
              <span className="hero__title-line fade-up" style={{ animationDelay: '100ms' }}>
                <span className="title-char" style={{ animationDelay: '0ms' }}>A</span>
                <span className="title-char" style={{ animationDelay: '50ms' }}>R</span>
                <span className="title-char" style={{ animationDelay: '100ms' }}>T</span>
                <span className="title-char" style={{ animationDelay: '150ms' }}>I</span>
                <span className="title-char" style={{ animationDelay: '200ms' }}>S</span>
                <span className="title-char" style={{ animationDelay: '250ms' }}>T</span>
              </span>
              <span className="hero__title-line hero__title-line--outline fade-up" style={{ animationDelay: '200ms' }}>
                <span className="title-char" style={{ animationDelay: '300ms' }}>N</span>
                <span className="title-char" style={{ animationDelay: '350ms' }}>A</span>
                <span className="title-char" style={{ animationDelay: '400ms' }}>M</span>
                <span className="title-char" style={{ animationDelay: '450ms' }}>E</span>
              </span>
            </h1>
            <p className="hero__subtitle fade-up" style={{ animationDelay: '300ms' }}>
              Exploring the intersection of form, color & emotion through minimalist abstraction
            </p>
            <div className="hero__actions fade-up" style={{ animationDelay: '400ms' }}>
              <MagneticButton to="/portfolio">View Portfolio</MagneticButton>
              <Link to="/about" className="hero__link">
                <span className="hero__link-text">About the Artist</span>
                <span className="hero__link-arrow">→</span>
              </Link>
            </div>
          </div>
          <div 
            className="hero__visual fade-up" 
            style={{ 
              animationDelay: '200ms',
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          >
            <div className="hero__image-frame">
              <img 
                src={`/images/artworks/${featuredWorks[0]?.images[0] || 'featured.jpg'}`}
                alt="Featured artwork"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.classList.add('hero__image-placeholder')
                }}
              />
              <div className="hero__image-accent"></div>
              <div className="hero__image-shine"></div>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number"><Counter end={50} suffix="+" /></span>
                <span className="hero__stat-label">Artworks</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number"><Counter end={12} /></span>
                <span className="hero__stat-label">Exhibitions</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number"><Counter end={8} /></span>
                <span className="hero__stat-label">Years</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll to explore</span>
          <div className="hero__scroll-line"></div>
        </div>
      </section>

      {/* Artist Statement Section */}
      <section className="statement">
        {/* Floating space elements */}
        <div className="statement__space">
          <div className="statement__star statement__star--1"></div>
          <div className="statement__star statement__star--2"></div>
          <div className="statement__star statement__star--3"></div>
          <div className="statement__star statement__star--4"></div>
          <div className="statement__star statement__star--5"></div>
          <div className="statement__ring statement__ring--1"></div>
          <div className="statement__ring statement__ring--2"></div>
        </div>
        <div className="statement__decoration statement__decoration--left"></div>
        <div className="statement__decoration statement__decoration--right"></div>
        <div className="statement__glow"></div>
        <div className="statement__inner">
          <Reveal direction="scale">
            <div className="statement__marker">
              <div className="statement__marker-line"></div>
              <span className="statement__year">EST. 2015</span>
              <div className="statement__marker-line"></div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <blockquote className="statement__quote">
              <span className="statement__open">"</span>
              Art is not about filling space—it is about creating space for reflection, for silence, for the unspoken conversations between viewer and canvas.
              <span className="statement__close">"</span>
            </blockquote>
          </Reveal>
          <Reveal delay={400}>
            <div className="statement__author">
              <div className="statement__line"></div>
              <span>Artist Name</span>
              <div className="statement__line"></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section className="home-intro">
        <div className="container">
          <div className="home-intro__grid">
            <Reveal direction="left" className="home-intro__image-wrapper">
              <div className="home-intro__image">
                <img 
                  src="/images/artist/portrait.jpg" 
                  alt="Artist in studio"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('home-intro__placeholder')
                  }}
                />
                <div className="home-intro__image-label">Brooklyn Studio, 2024</div>
              </div>
            </Reveal>
            <div className="home-intro__content">
              <Reveal>
                <span className="home-intro__label">About the Artist</span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="home-intro__title">
                  Creating Art That <br />
                  <span className="highlight">Speaks in Silence</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="home-intro__text">
                  As a contemporary visual artist based in Brooklyn, I explore the intersection of form, color, and emotion through diverse mediums. My work reflects a deep engagement with minimalist aesthetics and the subtle power of composition.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="home-intro__text">
                  Drawing inspiration from everyday moments and urban landscapes, I create pieces that invite contemplation and dialogue—where intuition meets intention, and simplicity reveals complexity.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <Link to="/about" className="home-intro__link">
                  <span>Read Full Biography</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="selected-works">
        <div className="container">
          <div className="selected-works__header">
            <div>
              <Reveal>
                <span className="selected-works__label">Portfolio</span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="selected-works__title">Selected Works</h2>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <Link to="/portfolio" className="selected-works__link">
                View All Works
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </Reveal>
          </div>
          
          <div className="selected-works__grid">
            {featuredWorks.map((artwork, index) => (
              <Reveal 
                key={artwork.id}
                delay={index * 150}
                direction={index === 0 ? 'up' : index === 1 ? 'left' : 'right'}
              >
                <Link 
                  to={`/artwork/${artwork.id}`} 
                  className={`selected-works__item ${index === 0 ? 'selected-works__item--featured' : ''}`}
                >
                  <div className="selected-works__image">
                    <img 
                      src={`/images/artworks/${artwork.images[0]}`}
                      alt={artwork.title}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('selected-works__placeholder')
                      }}
                    />
                    <div className="selected-works__overlay">
                      <span className="selected-works__view">View Artwork</span>
                    </div>
                  </div>
                  <div className="selected-works__info">
                    <h3 className="selected-works__name">{artwork.title}</h3>
                    <p className="selected-works__meta">{artwork.year} · {artwork.medium}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Strip */}
      <section className="showcase-strip">
        <div className="showcase-strip__label">
          <span>Latest Works</span>
          <span className="showcase-strip__divider">•</span>
          <span>Gallery Collection</span>
          <span className="showcase-strip__divider">•</span>
          <span>Featured Pieces</span>
        </div>
        <div className="showcase-strip__track">
          {[...showcaseArtworks, ...showcaseArtworks, ...showcaseArtworks].map((artwork, index) => (
            <Link 
              key={`${artwork.id}-${index}`} 
              to={`/artwork/${artwork.id}`}
              className="showcase-strip__item"
            >
              <img 
                src={`/images/artworks/${artwork.images[0]}`}
                alt={artwork.title}
                onError={(e) => {
                  e.target.parentElement.classList.add('showcase-strip__placeholder')
                  e.target.style.display = 'none'
                }}
              />
              <div className="showcase-strip__item-title">{artwork.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Exhibitions Section */}
      <section className="home-exhibitions">
        <div className="container">
          <div className="home-exhibitions__layout">
            <div className="home-exhibitions__featured">
              <Reveal>
                <span className="home-exhibitions__badge">Current Exhibition</span>
              </Reveal>
              <Reveal delay={100}>
                <div className="home-exhibitions__image">
                  <img 
                    src="/images/artworks/featured-exhibition.jpg" 
                    alt="New Perspectives Exhibition"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.classList.add('home-exhibitions__placeholder')
                    }}
                  />
                </div>
              </Reveal>
              <div className="home-exhibitions__featured-content">
                <Reveal delay={200}>
                  <h3 className="home-exhibitions__featured-title">New Perspectives</h3>
                </Reveal>
                <Reveal delay={250}>
                  <p className="home-exhibitions__featured-venue">Museum of Contemporary Art, New York</p>
                </Reveal>
                <Reveal delay={300}>
                  <p className="home-exhibitions__featured-dates">March 15 — May 30, 2024</p>
                </Reveal>
                <Reveal delay={350}>
                  <p className="home-exhibitions__featured-desc">
                    A comprehensive solo exhibition showcasing recent works that examine the relationship between urban spaces and human emotion.
                  </p>
                </Reveal>
                <Reveal delay={400}>
                  <MagneticButton to="/about#exhibitions" className="btn--sm">
                    Exhibition Details
                  </MagneticButton>
                </Reveal>
              </div>
            </div>
            
            <div className="home-exhibitions__list">
              <Reveal>
                <div className="home-exhibitions__list-header">
                  <h4>Past Exhibitions</h4>
                  <Link to="/about#exhibitions">View All →</Link>
                </div>
              </Reveal>
              {recentExhibitions.map((exhibition, index) => (
                <Reveal key={index} delay={(index + 1) * 100}>
                  <div className="home-exhibitions__item">
                    <span className="home-exhibitions__item-year">{exhibition.year}</span>
                    <div className="home-exhibitions__item-content">
                      <h5>{exhibition.title}</h5>
                      <p>{exhibition.venue}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Teaser */}
      <section className="process-teaser">
        <div className="container">
          <div className="process-teaser__content">
            <Reveal>
              <span className="process-teaser__label">The Creative Process</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="process-teaser__title">From Vision to Canvas</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="process-teaser__text">
                Each piece begins with observation and contemplation—studying light, shadow, and spatial relationships before brush meets canvas. Through layered glazing techniques and a restrained palette, I build depth and complexity through subtraction as much as addition.
              </p>
            </Reveal>
            <div className="process-teaser__steps">
              {['Concept', 'Sketch', 'Layer', 'Refine'].map((step, index) => (
                <Reveal key={step} delay={300 + index * 100} direction="scale">
                  <div className="process-teaser__step">
                    <div className="process-teaser__step-icon">
                      <span className="process-teaser__step-num">0{index + 1}</span>
                    </div>
                    <span className="process-teaser__step-name">{step}</span>
                  </div>
                  {index < 3 && <div className="process-teaser__step-connector"></div>}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="home-contact" id="contact">
        <div className="container">
          <div className="home-contact__grid">
            <div className="home-contact__info">
              <Reveal>
                <span className="home-contact__label">Get in Touch</span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="home-contact__title">
                  Let's Create Something <span className="highlight">Together</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="home-contact__text">
                  Interested in commissioning a piece, discussing a collaboration, or simply want to connect? I'd love to hear from you.
                </p>
              </Reveal>
              <div className="home-contact__details">
                <Reveal delay={300}>
                  <div className="home-contact__detail">
                    <span className="home-contact__detail-label">Email</span>
                    <a href="mailto:hello@artistname.com">hello@artistname.com</a>
                  </div>
                </Reveal>
                <Reveal delay={350}>
                  <div className="home-contact__detail">
                    <span className="home-contact__detail-label">Social</span>
                    <a href="https://instagram.com/artistname" target="_blank" rel="noopener noreferrer">@artistname</a>
                  </div>
                </Reveal>
                <Reveal delay={400}>
                  <div className="home-contact__detail">
                    <span className="home-contact__detail-label">Studio</span>
                    <span>Brooklyn, New York</span>
                  </div>
                </Reveal>
              </div>
            </div>
            <Reveal direction="right" delay={200}>
              <div className="home-contact__form">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      <button 
        className={`back-to-top ${scrollY > 500 ? 'back-to-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
