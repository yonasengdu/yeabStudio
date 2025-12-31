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
      {/* Global animated background - spans entire page */}
      <div className="page-bg">
        <div className="page-bg__grid"></div>
        <div className="page-bg__noise"></div>
        {/* Floating geometric shapes across entire page */}
        <div className="page-bg__shapes">
          <div className="page-bg__shape page-bg__shape--1"></div>
          <div className="page-bg__shape page-bg__shape--2"></div>
          <div className="page-bg__shape page-bg__shape--3"></div>
          <div className="page-bg__shape page-bg__shape--4"></div>
          <div className="page-bg__shape page-bg__shape--5"></div>
          <div className="page-bg__shape page-bg__shape--6"></div>
          <div className="page-bg__shape page-bg__shape--7"></div>
          <div className="page-bg__shape page-bg__shape--8"></div>
          <div className="page-bg__shape page-bg__shape--9"></div>
          <div className="page-bg__shape page-bg__shape--10"></div>
          <div className="page-bg__shape page-bg__shape--11"></div>
          <div className="page-bg__shape page-bg__shape--12"></div>
        </div>
        {/* Floating particles across entire page */}
        <div className="page-bg__particles">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        {/* Gradient orbs */}
        <div 
          className="page-bg__orb page-bg__orb--1"
          style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
        ></div>
        <div 
          className="page-bg__orb page-bg__orb--2"
          style={{ transform: `translate(${mousePos.x * -0.01}px, ${mousePos.y * -0.01}px)` }}
        ></div>
        <div 
          className="page-bg__orb page-bg__orb--3"
          style={{ transform: `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        {/* Animated decorative elements */}
        <div className="hero__decor">
          <div className="hero__decor-ring hero__decor-ring--1"></div>
          <div className="hero__decor-ring hero__decor-ring--2"></div>
          <div className="hero__decor-ring hero__decor-ring--3"></div>
          <div className="hero__decor-line hero__decor-line--1"></div>
          <div className="hero__decor-line hero__decor-line--2"></div>
          <div className="hero__decor-line hero__decor-line--3"></div>
        </div>
        
        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__label-wrapper">
              <span className="hero__label-line"></span>
              <span className="hero__label fade-up">Contemporary Visual Artist</span>
              <span className="hero__label-dot"></span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-line fade-up" style={{ animationDelay: '100ms' }}>
                {'ARTIST'.split('').map((char, i) => (
                  <span key={i} className="hero__char" style={{ animationDelay: `${i * 80}ms` }}>{char}</span>
                ))}
              </span>
              <span className="hero__title-line hero__title-line--outline fade-up" style={{ animationDelay: '200ms' }}>
                {'NAME'.split('').map((char, i) => (
                  <span key={i} className="hero__char hero__char--outline" style={{ animationDelay: `${500 + i * 80}ms` }}>{char}</span>
                ))}
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
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          >
            <div className="hero__image-container">
              {/* Orbiting elements around image */}
              <div className="hero__orbit hero__orbit--1">
                <div className="hero__orbit-dot"></div>
              </div>
              <div className="hero__orbit hero__orbit--2">
                <div className="hero__orbit-dot"></div>
              </div>
              
              <div className="hero__image-frame">
                <img 
                  src={`/images/artworks/${featuredWorks[0]?.images[0] || 'featured.jpg'}`}
                  alt="Featured artwork"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('hero__image-placeholder')
                  }}
                />
                <div className="hero__image-overlay"></div>
                <div className="hero__image-shine"></div>
              </div>
              
              {/* Floating badge */}
              <div className="hero__badge">
                <span className="hero__badge-icon">◈</span>
                <span className="hero__badge-text">Featured Work</span>
              </div>
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
          <div className="hero__scroll-icon">
            <div className="hero__scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Artist Statement Section - Text Floating in Space */}
      <section className="statement">
        {/* Animated background elements */}
        <div className="statement__bg">
          <div className="statement__orb statement__orb--1"></div>
          <div className="statement__orb statement__orb--2"></div>
          <div className="statement__ring statement__ring--1"></div>
          <div className="statement__ring statement__ring--2"></div>
          <div className="statement__ring statement__ring--3"></div>
          {/* Floating particles */}
          <div className="statement__particles">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        
        <div className="statement__content">
          <Reveal direction="scale">
            <div className="statement__marker">
              <div className="statement__marker-line"></div>
              <div className="statement__year-wrapper">
                <span className="statement__year-icon">◈</span>
                <span className="statement__year">EST. 2015</span>
                <span className="statement__year-icon">◈</span>
              </div>
              <div className="statement__marker-line"></div>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <blockquote className="statement__quote">
              <span className="statement__open">"</span>
              <span className="statement__text">
                Art is not about filling space—it is about creating space for reflection, for silence, for the unspoken conversations between viewer and canvas. In every brushstroke, I seek to distill complexity into its essential form, revealing beauty in restraint and power in simplicity.
              </span>
              <span className="statement__close">"</span>
            </blockquote>
          </Reveal>
          
          <Reveal delay={400}>
            <div className="statement__author">
              <div className="statement__author-line"></div>
              <div className="statement__author-info">
                <span className="statement__author-dash">—</span>
                <span className="statement__author-name">Artist Name</span>
              </div>
              <div className="statement__author-line"></div>
            </div>
          </Reveal>
          
          {/* Decorative corner elements */}
          <div className="statement__corner statement__corner--tl"></div>
          <div className="statement__corner statement__corner--tr"></div>
          <div className="statement__corner statement__corner--bl"></div>
          <div className="statement__corner statement__corner--br"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="home-intro">
        {/* Background decorations */}
        <div className="home-intro__bg">
          <div className="home-intro__bg-line home-intro__bg-line--1"></div>
          <div className="home-intro__bg-line home-intro__bg-line--2"></div>
          <div className="home-intro__bg-ring"></div>
        </div>
        
        <div className="container">
          <div className="home-intro__grid">
            <Reveal direction="left" className="home-intro__image-wrapper">
              <div className="home-intro__image-container">
                {/* Floating label */}
                <div className="home-intro__image-tag">
                  <span className="home-intro__image-tag-icon">◈</span>
                  <span>Artist Portrait</span>
                </div>
                
                {/* Decorative frame elements */}
                <div className="home-intro__frame home-intro__frame--tl"></div>
                <div className="home-intro__frame home-intro__frame--br"></div>
                
                <div className="home-intro__image">
                  <img 
                    src="/images/artist/portrait.jpg" 
                    alt="Artist in studio"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.classList.add('home-intro__placeholder')
                    }}
                  />
                  <div className="home-intro__image-overlay"></div>
                </div>
                
                {/* Bottom label */}
                <div className="home-intro__image-label">
                  <span className="home-intro__image-label-dot"></span>
                  Brooklyn Studio, 2024
                </div>
                
                {/* Orbiting element */}
                <div className="home-intro__orbit">
                  <div className="home-intro__orbit-dot"></div>
                </div>
              </div>
            </Reveal>
            
            <div className="home-intro__content">
              <Reveal>
                <div className="home-intro__label-wrapper">
                  <span className="home-intro__label-line"></span>
                  <span className="home-intro__label">About the Artist</span>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="home-intro__title">
                  <span className="home-intro__title-line">Creating Art That</span>
                  <span className="home-intro__title-line home-intro__title-line--accent">Speaks in Silence</span>
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
                  <span className="home-intro__link-text">Read Full Biography</span>
                  <span className="home-intro__link-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="selected-works">
        {/* Decorative background elements */}
        <div className="selected-works__decorations">
          {/* Floating orbs */}
          <div className="selected-works__orb selected-works__orb--1"></div>
          <div className="selected-works__orb selected-works__orb--2"></div>
          
          {/* Animated rings */}
          <div className="selected-works__ring selected-works__ring--1"></div>
          <div className="selected-works__ring selected-works__ring--2 selected-works__ring--dashed"></div>
          
          {/* Grid lines */}
          <div className="selected-works__gridlines">
            <div className="selected-works__gridline selected-works__gridline--h1"></div>
            <div className="selected-works__gridline selected-works__gridline--h2"></div>
            <div className="selected-works__gridline selected-works__gridline--v1"></div>
            <div className="selected-works__gridline selected-works__gridline--v2"></div>
          </div>
          
          {/* Floating particles */}
          <div className="selected-works__particles">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span>
          </div>
        </div>
        
        <div className="container">
          <div className="selected-works__header">
            <div className="selected-works__header-content">
              <Reveal>
                <span className="selected-works__label">
                  <span className="selected-works__label-icon">◈</span>
                  Portfolio
                  <span className="selected-works__label-line"></span>
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="selected-works__title">
                  <span className="selected-works__title-word">
                    {'Selected'.split('').map((char, i) => (
                      <span key={i} className="title-char" style={{ animationDelay: `${i * 40}ms` }}>{char}</span>
                    ))}
                  </span>
                  <span className="selected-works__title-word selected-works__title-word--accent">
                    {'Works'.split('').map((char, i) => (
                      <span key={i} className="title-char" style={{ animationDelay: `${(i + 8) * 40}ms` }}>{char}</span>
                    ))}
                  </span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <Link to="/portfolio" className="selected-works__link">
                <span className="selected-works__link-text">View All Works</span>
                <span className="selected-works__link-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
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
                  {/* Card corner decorations */}
                  <div className="selected-works__item-corner selected-works__item-corner--tl"></div>
                  <div className="selected-works__item-corner selected-works__item-corner--tr"></div>
                  <div className="selected-works__item-corner selected-works__item-corner--bl"></div>
                  <div className="selected-works__item-corner selected-works__item-corner--br"></div>
                  
                  <div className="selected-works__image">
                    <img 
                      src={`/images/artworks/${artwork.images[0]}`}
                      alt={artwork.title}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('selected-works__placeholder')
                      }}
                    />
                    {/* Image shine effect */}
                    <div className="selected-works__image-shine"></div>
                    <div className="selected-works__overlay">
                      <span className="selected-works__view">
                        <span className="selected-works__view-icon">◈</span>
                        View Artwork
                      </span>
                    </div>
                  </div>
                  
                  {/* Floating index badge */}
                  <div className="selected-works__badge">
                    <span className="selected-works__badge-num">0{index + 1}</span>
                  </div>
                  
                  <div className="selected-works__info">
                    <h3 className="selected-works__name">{artwork.title}</h3>
                    <div className="selected-works__meta">
                      <span className="selected-works__year">{artwork.year}</span>
                      <span className="selected-works__divider">·</span>
                      <span className="selected-works__medium">{artwork.medium}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          
          {/* Section footer decoration */}
          <div className="selected-works__footer">
            <div className="selected-works__footer-line"></div>
            <span className="selected-works__footer-text">Curated Collection</span>
            <div className="selected-works__footer-line"></div>
          </div>
        </div>
      </section>


      {/* Exhibitions Section */}
      <section className="home-exhibitions">
        {/* Decorative background elements */}
        <div className="home-exhibitions__decorations">
          {/* Floating orbs */}
          <div className="home-exhibitions__orb home-exhibitions__orb--1"></div>
          <div className="home-exhibitions__orb home-exhibitions__orb--2"></div>
          
          {/* Animated rings */}
          <div className="home-exhibitions__ring home-exhibitions__ring--1"></div>
          <div className="home-exhibitions__ring home-exhibitions__ring--2 home-exhibitions__ring--dashed"></div>
          
          {/* Connection lines */}
          <div className="home-exhibitions__connection-lines">
            <svg className="home-exhibitions__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path className="home-exhibitions__path home-exhibitions__path--1" d="M0,50 Q50,20 100,50" />
              <path className="home-exhibitions__path home-exhibitions__path--2" d="M0,80 Q30,60 100,70" />
            </svg>
          </div>
          
          {/* Floating particles */}
          <div className="home-exhibitions__particles">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        
        <div className="container">
          {/* Section header */}
          <div className="home-exhibitions__header">
            <Reveal>
              <span className="home-exhibitions__label">
                <span className="home-exhibitions__label-icon">◈</span>
                Exhibitions
                <span className="home-exhibitions__label-line"></span>
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="home-exhibitions__title">
                <span className="home-exhibitions__title-word">
                  {'Gallery'.split('').map((char, i) => (
                    <span key={i} className="title-char" style={{ animationDelay: `${i * 40}ms` }}>{char}</span>
                  ))}
                </span>
                <span className="home-exhibitions__title-word home-exhibitions__title-word--accent">
                  {'Presence'.split('').map((char, i) => (
                    <span key={i} className="title-char" style={{ animationDelay: `${(i + 8) * 40}ms` }}>{char}</span>
                  ))}
                </span>
              </h2>
            </Reveal>
          </div>
          
          <div className="home-exhibitions__layout">
            <div className="home-exhibitions__featured">
              {/* Corner decorations */}
              <div className="home-exhibitions__corner home-exhibitions__corner--tl"></div>
              <div className="home-exhibitions__corner home-exhibitions__corner--tr"></div>
              <div className="home-exhibitions__corner home-exhibitions__corner--bl"></div>
              <div className="home-exhibitions__corner home-exhibitions__corner--br"></div>
              
              <Reveal>
                <span className="home-exhibitions__badge">
                  <span className="home-exhibitions__badge-dot"></span>
                  Current Exhibition
                </span>
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
                  <div className="home-exhibitions__image-shine"></div>
                  <div className="home-exhibitions__image-overlay">
                    <span className="home-exhibitions__image-text">Exhibition</span>
                    <span className="home-exhibitions__image-icon">◈</span>
                  </div>
                </div>
              </Reveal>
              <div className="home-exhibitions__featured-content">
                <Reveal delay={200}>
                  <h3 className="home-exhibitions__featured-title">New Perspectives</h3>
                </Reveal>
                <Reveal delay={250}>
                  <p className="home-exhibitions__featured-venue">
                    <span className="home-exhibitions__venue-icon">⬡</span>
                    Museum of Contemporary Art, New York
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <p className="home-exhibitions__featured-dates">
                    <span className="home-exhibitions__dates-line"></span>
                    March 15 — May 30, 2024
                    <span className="home-exhibitions__dates-line"></span>
                  </p>
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
                  <h4>
                    <span className="home-exhibitions__list-icon">◇</span>
                    Past Exhibitions
                  </h4>
                  <Link to="/about#exhibitions" className="home-exhibitions__list-link">
                    <span>View All</span>
                    <span className="home-exhibitions__list-arrow">→</span>
                  </Link>
                </div>
              </Reveal>
              
              {/* Timeline line */}
              <div className="home-exhibitions__timeline">
                <div className="home-exhibitions__timeline-line"></div>
              </div>
              
              {recentExhibitions.map((exhibition, index) => (
                <Reveal key={index} delay={(index + 1) * 100}>
                  <div className="home-exhibitions__item">
                    <div className="home-exhibitions__item-marker">
                      <span className="home-exhibitions__item-dot"></span>
                      <span className="home-exhibitions__item-pulse"></span>
                    </div>
                    <span className="home-exhibitions__item-year">{exhibition.year}</span>
                    <div className="home-exhibitions__item-content">
                      <h5>{exhibition.title}</h5>
                      <p>{exhibition.venue}</p>
                    </div>
                    <span className="home-exhibitions__item-arrow">→</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Teaser */}
      <section className="process-teaser">
        {/* Animated background elements */}
        <div className="process-teaser__bg">
          <div className="process-teaser__orb process-teaser__orb--1"></div>
          <div className="process-teaser__orb process-teaser__orb--2"></div>
          <div className="process-teaser__line process-teaser__line--1"></div>
          <div className="process-teaser__line process-teaser__line--2"></div>
        </div>
        
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
                Each piece begins with observation and contemplation—studying light, shadow, and spatial relationships before brush meets canvas.
              </p>
            </Reveal>
            
            {/* Process Timeline */}
            <div className="process-teaser__timeline">
              <div className="process-teaser__timeline-line">
                <div className="process-teaser__timeline-progress"></div>
              </div>
              
              {[
                { name: 'Concept', desc: 'Vision & inspiration', icon: '◇' },
                { name: 'Sketch', desc: 'Form takes shape', icon: '△' },
                { name: 'Layer', desc: 'Building depth', icon: '○' },
                { name: 'Refine', desc: 'Final essence', icon: '☆' }
              ].map((step, index) => (
                <Reveal key={step.name} delay={300 + index * 150} direction="up">
                  <div className={`process-teaser__step process-teaser__step--${index + 1}`}>
                    <div className="process-teaser__step-marker">
                      <span className="process-teaser__step-icon">{step.icon}</span>
                      <div className="process-teaser__step-pulse"></div>
                      <div className="process-teaser__step-ring"></div>
                      <div className="process-teaser__step-ring process-teaser__step-ring--2"></div>
                    </div>
                    <div className="process-teaser__step-content">
                      <span className="process-teaser__step-num">0{index + 1}</span>
                      <h4 className="process-teaser__step-name">{step.name}</h4>
                      <p className="process-teaser__step-desc">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="home-contact" id="contact">
        {/* Decorative background elements */}
        <div className="home-contact__decorations">
          {/* Floating orbs */}
          <div className="home-contact__orb home-contact__orb--1"></div>
          <div className="home-contact__orb home-contact__orb--2"></div>
          
          {/* Animated rings */}
          <div className="home-contact__ring home-contact__ring--1"></div>
          <div className="home-contact__ring home-contact__ring--2 home-contact__ring--dashed"></div>
          
          {/* Connection lines */}
          <div className="home-contact__lines">
            <div className="home-contact__line home-contact__line--1"></div>
            <div className="home-contact__line home-contact__line--2"></div>
            <div className="home-contact__line home-contact__line--3"></div>
          </div>
          
          {/* Floating particles */}
          <div className="home-contact__particles">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        
        <div className="container">
          {/* Section header */}
          <div className="home-contact__header">
            <Reveal>
              <span className="home-contact__section-label">
                <span className="home-contact__section-icon">◈</span>
                Connect
                <span className="home-contact__section-line"></span>
              </span>
            </Reveal>
          </div>
          
          <div className="home-contact__grid">
            <div className="home-contact__info">
              {/* Corner decorations */}
              <div className="home-contact__corner home-contact__corner--tl"></div>
              <div className="home-contact__corner home-contact__corner--tr"></div>
              <div className="home-contact__corner home-contact__corner--bl"></div>
              <div className="home-contact__corner home-contact__corner--br"></div>
              
              <Reveal>
                <span className="home-contact__label">
                  <span className="home-contact__label-dash">—</span>
                  Get in Touch
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="home-contact__title">
                  <span className="home-contact__title-line">
                    {"Let's Create Something".split('').map((char, i) => (
                      <span key={i} className="title-char" style={{ animationDelay: `${i * 30}ms` }}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </span>
                  <span className="home-contact__title-line home-contact__title-line--accent">
                    {'Together'.split('').map((char, i) => (
                      <span key={i} className="title-char" style={{ animationDelay: `${(i + 22) * 30}ms` }}>{char}</span>
                    ))}
                    <span className="home-contact__title-underline"></span>
                  </span>
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
                    <div className="home-contact__detail-icon">
                      <span>✉</span>
                      <div className="home-contact__detail-pulse"></div>
                    </div>
                    <div className="home-contact__detail-content">
                      <span className="home-contact__detail-label">Email</span>
                      <a href="mailto:hello@artistname.com">hello@artistname.com</a>
                    </div>
                    <span className="home-contact__detail-arrow">→</span>
                  </div>
                </Reveal>
                <Reveal delay={350}>
                  <div className="home-contact__detail">
                    <div className="home-contact__detail-icon">
                      <span>◎</span>
                      <div className="home-contact__detail-pulse"></div>
                    </div>
                    <div className="home-contact__detail-content">
                      <span className="home-contact__detail-label">Social</span>
                      <a href="https://instagram.com/artistname" target="_blank" rel="noopener noreferrer">@artistname</a>
                    </div>
                    <span className="home-contact__detail-arrow">→</span>
                  </div>
                </Reveal>
                <Reveal delay={400}>
                  <div className="home-contact__detail">
                    <div className="home-contact__detail-icon">
                      <span>⬡</span>
                      <div className="home-contact__detail-pulse"></div>
                    </div>
                    <div className="home-contact__detail-content">
                      <span className="home-contact__detail-label">Studio</span>
                      <span>Brooklyn, New York</span>
                    </div>
                    <span className="home-contact__detail-arrow">→</span>
                  </div>
                </Reveal>
              </div>
            </div>
            <Reveal direction="right" delay={200}>
              <div className="home-contact__form">
                {/* Form corner accent */}
                <div className="home-contact__form-accent"></div>
                <div className="home-contact__form-glow"></div>
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

