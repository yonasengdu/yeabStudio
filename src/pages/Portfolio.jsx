import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { artworks } from '../data/artworks'
import ArtworkCard from '../components/ArtworkCard'
import FilterTabs from '../components/FilterTabs'

const aspectRatios = ['4/5', '3/4', '1/1', '4/3', '3/4', '4/5']

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
    <div className="pt-header">
      {/* Page Header */}
      <section className="portfolio-header section" style={{ paddingBottom: 'var(--space-8)' }}>
        <div className="container">
          <h1 className="fade-up">PORTFOLIO</h1>
          <p className="text-muted fade-up" style={{ animationDelay: '100ms' }}>A Collection of Visual Explorations</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section section--sm" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          <div className="masonry">
            {filteredArtworks.map((artwork, index) => (
              <div key={artwork.id} className="masonry__item">
                <ArtworkCard 
                  artwork={artwork} 
                  aspectRatio={aspectRatios[index % aspectRatios.length]} 
                />
              </div>
            ))}
          </div>
          
          {filteredArtworks.length === 0 && (
            <p className="text-muted text-center">No artworks found in this category.</p>
          )}
        </div>
      </section>

      {/* Featured Series */}
      <section className="featured-series">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', alignItems: 'center' }}>
            <div className="featured-series__image">
              <img 
                src="/images/artworks/urban-reflections-series.jpg" 
                alt="Urban Reflections Series"
                onError={(e) => {
                  e.target.parentElement.classList.add('img-placeholder')
                  e.target.style.display = 'none'
                }}
              />
            </div>
            <div className="featured-series__content">
              <h2>Urban Reflections Series</h2>
              <p>
                This ongoing series explores the relationship between urban architecture and natural light. Through bold geometric compositions and carefully considered color palettes, each piece captures fleeting moments of harmony between the built environment and atmospheric conditions. The works investigate how light transforms rigid structures into fluid, almost organic forms.
              </p>
              <table className="featured-series__table">
                <tbody>
                  <tr>
                    <td>Dimensions</td>
                    <td>42 × 62</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>2021–</td>
                  </tr>
                  <tr>
                    <td>Medium</td>
                    <td>Oil on Canvas</td>
                  </tr>
                </tbody>
              </table>
              <Link 
                to="/portfolio?series=urban-reflections" 
                className="text-uppercase" 
                style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', borderBottom: '1px solid currentColor' }}
              >
                View Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="stats">
            <div>
              <div className="stat__number">52</div>
              <div className="stat__label">Artworks Created</div>
            </div>
            <div>
              <div className="stat__number">18</div>
              <div className="stat__label">Exhibitions</div>
            </div>
            <div>
              <div className="stat__number">9</div>
              <div className="stat__label">Collections</div>
            </div>
            <div>
              <div className="stat__number">12</div>
              <div className="stat__label">Years Practice</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container container--narrow">
          <h2 className="cta__title">COMMISSION A PIECE</h2>
          <p className="cta__text">
            I welcome commissions for custom artworks tailored to your vision and space. Whether you are seeking a statement piece for your home, office, or public installation, I work closely with clients to create meaningful works that resonate with their unique aesthetic and conceptual goals.
          </p>
          <Link to="/#contact" className="btn">Start a Conversation</Link>
        </div>
      </section>
    </div>
  )
}

