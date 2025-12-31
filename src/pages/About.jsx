import { Link } from 'react-router-dom'
import { exhibitions } from '../data/exhibitions'
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

export default function About() {
  const recentExhibitions = exhibitions.slice(0, 6)

  const skills = {
    mediums: ['Oil on Canvas', 'Acrylic Paint', 'Mixed Media', 'Charcoal Drawing', 'Watercolor', 'Digital Art', 'Installation'],
    techniques: ['Layering & Glazing', 'Impasto', 'Abstract Composition', 'Color Field Painting', 'Monochromatic Studies', 'Texture Building', 'Minimalist Approach'],
    specialties: ['Contemporary Abstract', 'Large-Scale Works', 'Site-Specific Art', 'Urban Landscapes', 'Geometric Abstraction', 'Minimalist Design', 'Conceptual Art']
  }

  return (
    <div className="about-page">
      {/* Global background from Home */}
      <div className="page-bg">
        <div className="page-bg__grid"></div>
        <div className="page-bg__noise"></div>
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__content">
            <span className="about-hero__label">
              <span className="about-hero__label-icon">◈</span>
              About the Artist
            </span>
            <h1 className="about-hero__title">
              <span className="about-hero__title-line">The Story</span>
              <span className="about-hero__title-line about-hero__title-line--accent">Behind the Art</span>
            </h1>
            <p className="about-hero__subtitle">
              A journey through color, form, and emotion
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats__grid">
            <Reveal delay={0}>
              <div className="about-stats__item">
                <span className="about-stats__number"><Counter end={50} suffix="+" /></span>
                <span className="about-stats__label">Artworks Created</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="about-stats__item">
                <span className="about-stats__number"><Counter end={12} /></span>
                <span className="about-stats__label">Solo Exhibitions</span>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="about-stats__item">
                <span className="about-stats__number"><Counter end={8} /></span>
                <span className="about-stats__label">Years Active</span>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="about-stats__item">
                <span className="about-stats__number"><Counter end={25} suffix="+" /></span>
                <span className="about-stats__label">Collections</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="about-bio">
        <div className="container">
          <div className="about-bio__grid">
            <Reveal direction="left" className="about-bio__image-wrapper">
              <div className="about-bio__image">
                <img 
                  src="/images/artist/about portrait.JPG" 
                  alt="Artist portrait"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('about-bio__placeholder')
                  }}
                />
                <div className="about-bio__image-accent"></div>
                <div className="about-bio__image-label">Brooklyn, NY</div>
              </div>
            </Reveal>

            <div className="about-bio__content">
              <Reveal>
                <span className="about-bio__label">Biography</span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="about-bio__title">
                  Born to Create, <br />
                  <span className="highlight">Driven by Vision</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="about-bio__text">
                  Born in Brooklyn, New York in 1985, I discovered my passion for visual arts during childhood, spending countless hours sketching urban landscapes and abstract compositions. After completing my BFA at Rhode Island School of Design and MFA at Yale University, I embarked on a journey to redefine contemporary minimalist art through bold experimentation and thoughtful restraint.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="about-bio__text">
                  My artistic journey has been deeply influenced by the works of Agnes Martin, Mark Rothko, and contemporary minimalists who explore the power of simplicity. Over the past decade, I have developed a distinctive visual language that merges geometric precision with organic spontaneity.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <p className="about-bio__text">
                  Today, I work from my studio in Brooklyn, where I continue to explore the boundaries between abstraction and representation, color and form, silence and expression.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Artistic Approach Section */}
      <section className="about-approach">
        <div className="container">
          <div className="about-approach__grid">
            <div className="about-approach__content">
              <Reveal>
                <span className="about-approach__label">Artistic Approach</span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="about-approach__title">The Philosophy of Creation</h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="about-approach__text">
                  My creative process begins with observation and contemplation. I spend considerable time studying light, shadow, and spatial relationships before touching brush to canvas. Each piece evolves through multiple layers of color, building depth and complexity through subtraction as much as addition.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="about-approach__text">
                  Technique is essential to my practice, but it serves the larger vision rather than defining it. I employ traditional glazing methods alongside contemporary approaches, creating surfaces that shift and breathe with changing light.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <blockquote className="about-approach__quote">
                  "I believe art should be both intellectually engaging and emotionally accessible, bridging the gap between contemporary aesthetics and timeless human experiences."
                </blockquote>
              </Reveal>
            </div>
            <Reveal direction="right" delay={200}>
              <div className="about-approach__image">
                <img 
                  src="/images/artworks/15.jpg" 
                  alt="Artist in studio"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('about-approach__placeholder')
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="about-skills">
        <div className="container">
          <div className="about-skills__header">
            <Reveal>
              <span className="about-skills__label">Expertise</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="about-skills__title">Skills & Specializations</h2>
            </Reveal>
          </div>

          <div className="about-skills__grid">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <Reveal key={category} delay={categoryIndex * 150}>
                <div className="about-skills__card">
                  <h3 className="about-skills__card-title">{category}</h3>
                  <ul className="about-skills__list">
                    {items.map((item, index) => (
                      <li key={index} className="about-skills__item">
                        <span className="about-skills__item-dot"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibitions Section */}
      <section className="about-exhibitions" id="exhibitions">
        <div className="container">
          <div className="about-exhibitions__header">
            <Reveal>
              <span className="about-exhibitions__label">Recognition</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="about-exhibitions__title">Exhibitions & Shows</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="about-exhibitions__subtitle">
                Selected exhibitions from galleries and museums worldwide
              </p>
            </Reveal>
          </div>

          <div className="about-exhibitions__timeline">
            {recentExhibitions.map((exhibition, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="about-exhibitions__item">
                  <div className="about-exhibitions__year">{exhibition.year}</div>
                  <div className="about-exhibitions__dot"></div>
                  <div className="about-exhibitions__content">
                    <h4 className="about-exhibitions__name">{exhibition.title}</h4>
                    <p className="about-exhibitions__venue">{exhibition.venue}</p>
                    <p className="about-exhibitions__location">{exhibition.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section className="about-studio">
        <Reveal direction="scale">
          <div className="about-studio__image-wrapper">
            <img 
              src="/images/artist/studio.png" 
              alt="Artist studio"
              className="about-studio__image"
              onError={(e) => {
                e.target.parentElement.classList.add('about-studio__placeholder')
                e.target.style.display = 'none'
              }}
            />
            <div className="about-studio__overlay">
              <span className="about-studio__caption">The Studio — Brooklyn, NY</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta__content">
            <Reveal>
              <span className="about-cta__label">
                <span className="about-cta__label-icon">◈</span>
                Collaborate
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="about-cta__title">
                Let's Create <span className="about-cta__title-accent">Together</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="about-cta__text">
                I am always open to collaborations, commissions, and creative partnerships. Whether you are a collector, curator, or fellow artist, I would love to hear from you.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="about-cta__actions">
                <Link to="/#contact" className="btn">Get in Touch</Link>
                <Link to="/portfolio" className="about-cta__link">
                  <span>View Portfolio</span>
                  <span className="about-cta__link-arrow">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
