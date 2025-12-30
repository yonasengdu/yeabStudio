import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { artworks } from '../data/artworks'
import { exhibitions } from '../data/exhibitions'
import ArtworkCard from '../components/ArtworkCard'
import Lightbox from '../components/Lightbox'

export default function ArtworkDetail() {
  const { id } = useParams()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [imageError, setImageError] = useState(false)

  const artwork = artworks.find(a => a.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!artwork) {
    return (
      <div className="pt-header">
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h1>Artwork Not Found</h1>
            <p className="text-muted" style={{ marginBottom: 'var(--space-8)' }}>
              This artwork may have been moved or removed.
            </p>
            <Link to="/portfolio" className="btn">View Portfolio</Link>
          </div>
        </section>
      </div>
    )
  }

  // Find related works (same series or category)
  let relatedWorks = []
  if (artwork.series) {
    relatedWorks = artworks.filter(a => a.series === artwork.series && a.id !== artwork.id)
  }
  if (relatedWorks.length === 0) {
    relatedWorks = artworks.filter(a => a.category === artwork.category && a.id !== artwork.id)
  }
  relatedWorks = relatedWorks.slice(0, 3)

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc)
    setLightboxOpen(true)
  }

  const recentExhibitions = artwork.exhibitions || exhibitions.slice(0, 3)

  return (
    <div className="pt-header">
      {/* Hero Image */}
      <section className="artwork-hero">
        {imageError ? (
          <div className="img-placeholder" style={{ width: '100%', height: '100%' }}>
            <span>{artwork.title}</span>
          </div>
        ) : (
          <img 
            src={`/images/artworks/${artwork.images[0]}`} 
            alt={artwork.title}
            onError={() => setImageError(true)}
          />
        )}
      </section>

      {/* Title & Meta */}
      <section className="artwork-title">
        <div className="container">
          <h1>{artwork.title}</h1>
          <p className="text-muted">{artwork.year} • {artwork.medium} • {artwork.dimensions}</p>
        </div>
      </section>

      {/* Artwork Info */}
      <section className="section section--sm">
        <div className="container">
          <div className="artwork-info">
            {/* Description */}
            <div>
              <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>
                About This Work
              </span>
              <div className="artwork-description">
                {artwork.description ? (
                  artwork.description.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))
                ) : (
                  <p>This {artwork.medium.toLowerCase()} piece explores themes of form and color through careful composition and technique.</p>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>
                Details
              </span>
              <div className="artwork-details">
                <table>
                  <tbody>
                    <tr>
                      <td>Dimensions</td>
                      <td>{artwork.dimensions}</td>
                    </tr>
                    <tr>
                      <td>Year</td>
                      <td>{artwork.year}</td>
                    </tr>
                    {artwork.series && (
                      <tr>
                        <td>Series</td>
                        <td>{artwork.series}</td>
                      </tr>
                    )}
                    <tr>
                      <td>Medium</td>
                      <td>{artwork.medium}</td>
                    </tr>
                    <tr>
                      <td>Availability</td>
                      <td>{artwork.available ? 'Available' : 'Sold'}</td>
                    </tr>
                    {artwork.price && (
                      <tr>
                        <td>Price</td>
                        <td>{artwork.price}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Artist's Note */}
              {artwork.artistNote && (
                <div className="artist-note">
                  <span className="artist-note__label">Artist's Note</span>
                  <p>"{artwork.artistNote}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {artwork.images.length > 1 && (
        <section className="section">
          <div className="container">
            <div className="section-header section-header--left" style={{ marginBottom: 'var(--space-8)' }}>
              <span className="section-header__label">Views & Details</span>
            </div>

            <div className="artwork-gallery">
              {artwork.images.map((image, index) => (
                <div 
                  key={index}
                  className={`artwork-gallery__item ${index === 0 ? 'artwork-gallery__item--large' : ''}`}
                  onClick={() => openLightbox(`/images/artworks/${image}`)}
                >
                  <img 
                    src={`/images/artworks/${image}`} 
                    alt={`${artwork.title} - View ${index + 1}`}
                    loading="lazy"
                    onError={(e) => e.target.parentElement.style.display = 'none'}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Series Context */}
      {artwork.series && (
        <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
          <div className="container container--narrow">
            <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>
              Series Context
            </span>
            <p style={{ color: 'var(--color-text-light)', lineHeight: 'var(--leading-relaxed)' }}>
              {artwork.seriesDescription || `This work is part of the "${artwork.series}" series, an ongoing exploration of related themes and visual concepts.`}
            </p>
          </div>
        </section>
      )}

      {/* Related Works */}
      {relatedWorks.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header section-header--left" style={{ marginBottom: 'var(--space-12)' }}>
              <span className="section-header__label">From the Same Series</span>
            </div>

            <div className="related-works">
              {relatedWorks.map(work => (
                <ArtworkCard key={work.id} artwork={work} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Exhibition History */}
      <section className="section section--sm">
        <div className="container container--narrow">
          <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-8)' }}>
            Exhibition History
          </span>

          <div className="exhibition-timeline">
            {recentExhibitions.map((exhibition, index) => (
              <div key={index} className="exhibition-timeline__item">
                <h4>{exhibition.title}</h4>
                <p className="text-muted" style={{ fontSize: 'var(--text-sm)' }}>
                  {exhibition.venue}, {exhibition.location} — {exhibition.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container container--narrow">
          <h2 className="cta__title">INTERESTED IN THIS WORK?</h2>
          <p className="cta__text">
            {artwork.available 
              ? "This piece is currently available for acquisition. I welcome inquiries from collectors and art enthusiasts. Whether you are interested in purchasing this work, commissioning a similar piece, or simply learning more about my practice, I would be delighted to hear from you."
              : "This piece has been acquired and is now part of a private collection. If you are interested in commissioning a similar work or exploring other available pieces, I would be happy to discuss options with you."
            }
          </p>
          <Link to="/#contact" className="btn">
            {artwork.available ? 'Inquire About Availability' : 'Inquire About Commissions'}
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox 
        isOpen={lightboxOpen} 
        imageSrc={lightboxImage} 
        onClose={() => setLightboxOpen(false)} 
      />
    </div>
  )
}

