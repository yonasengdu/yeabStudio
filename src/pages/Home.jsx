import { Link } from 'react-router-dom'
import { artworks } from '../data/artworks'
import { exhibitions } from '../data/exhibitions'
import ArtworkCard from '../components/ArtworkCard'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const featuredWorks = artworks.filter(a => a.featured).slice(0, 3)
  const recentExhibitions = exhibitions.slice(0, 4)
  const gridArtworks = artworks.slice(0, 6)

  return (
    <div className="pt-header">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero__title fade-up">ARTIST NAME</h1>
        <p className="hero__subtitle fade-up" style={{ animationDelay: '100ms' }}>
          Visual Artist & Creator
        </p>
        <Link to="/portfolio" className="btn fade-up" style={{ animationDelay: '200ms' }}>
          View Works
        </Link>
      </section>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="home-about">
            <div>
              <span className="text-uppercase text-muted">About</span>
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-text-light)' }}>
                As a contemporary visual artist, I explore the intersection of form, color, and emotion through diverse mediums. My work reflects a deep engagement with minimalist aesthetics and the subtle power of composition. Drawing inspiration from everyday moments and urban landscapes, I create pieces that invite contemplation and dialogue. Each artwork represents a journey of discovery, where intuition meets intention, and simplicity reveals complexity. My artistic practice is rooted in the belief that art should be both accessible and thought-provoking, challenging viewers to find beauty in unexpected places.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="section section--sm">
        <div className="container">
          <div className="section-header section-header--left" style={{ marginBottom: 'var(--space-12)' }}>
            <span className="section-header__label">Selected Works</span>
          </div>
          
          <div className="grid grid-3 stagger">
            {featuredWorks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Exhibitions & Featured */}
      <section className="section">
        <div className="container">
          <div className="home-exhibitions">
            {/* Exhibitions List */}
            <div>
              <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-8)' }}>
                Exhibitions
              </span>
              <div>
                {recentExhibitions.map((exhibition, index) => (
                  <div key={index} className="exhibition-item">
                    <h4>{exhibition.title}</h4>
                    <p className="text-muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
                      {exhibition.venue}, {exhibition.location}
                    </p>
                    <p className="text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                      {exhibition.dates}
                    </p>
                  </div>
                ))}
              </div>
              <Link 
                to="/about#exhibitions" 
                className="text-uppercase" 
                style={{ display: 'inline-block', marginTop: 'var(--space-8)', fontSize: 'var(--text-xs)', borderBottom: '1px solid currentColor' }}
              >
                View All Past Exhibitions
              </Link>
            </div>

            {/* Featured Exhibition */}
            <div>
              <div className="featured-exhibition__image">
                <img 
                  src="/images/artworks/featured-exhibition.jpg" 
                  alt="New Perspectives Exhibition"
                  onError={(e) => {
                    e.target.parentElement.classList.add('img-placeholder')
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>New Perspectives</h4>
              <p className="text-muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                March 15 - May 30, 2024<br />Museum of Contemporary Art, New York
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-light)', marginBottom: 'var(--space-4)' }}>
                A comprehensive solo exhibition showcasing recent works that examine the relationship between urban spaces and human emotion. Featuring 15 new paintings.
              </p>
              <Link to="/about#exhibitions" className="btn btn--sm">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Artwork Grid */}
      <section className="section section--sm">
        <div className="container">
          <div className="artwork-mini-grid">
            {gridArtworks.map(artwork => (
              <Link key={artwork.id} to={`/artwork/${artwork.id}`}>
                <img 
                  src={`/images/artworks/${artwork.images[0]}`} 
                  alt={artwork.title}
                  onError={(e) => {
                    e.target.parentElement.classList.add('img-placeholder')
                    e.target.style.display = 'none'
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <div className="container container--narrow">
          <div className="section-header">
            <h2 className="section-header__title">Get In Touch</h2>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>hello@artistname.com</p>
            <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>@artistname</p>
            <p className="text-muted">Brooklyn, NY</p>
          </div>
          
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

