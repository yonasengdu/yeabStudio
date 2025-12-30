import { Link } from 'react-router-dom'
import { exhibitions } from '../data/exhibitions'

export default function About() {
  const recentExhibitions = exhibitions.slice(0, 5)

  return (
    <div className="pt-header">
      {/* Page Header */}
      <section className="section section--lg" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 className="fade-up" style={{ fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)' }}>ABOUT</h1>
          <p className="text-muted fade-up" style={{ animationDelay: '100ms' }}>Getting to Know the Artist</p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            {/* Artist Photo */}
            <div className="about-photo">
              <img 
                src="/images/artist/portrait.jpg" 
                alt="Artist portrait"
                onError={(e) => {
                  e.target.parentElement.classList.add('img-placeholder')
                  e.target.parentElement.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;height:100%;">Artist Photo</span>'
                }}
              />
            </div>

            {/* Bio Content */}
            <div>
              <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>Biography</span>
              
              <div className="about-content">
                <p>Born in Brooklyn, New York in 1985, I discovered my passion for visual arts during childhood, spending countless hours sketching urban landscapes and abstract compositions. After completing my BFA at Rhode Island School of Design and MFA at Yale University, I embarked on a journey to redefine contemporary minimalist art through bold experimentation and thoughtful restraint.</p>
                
                <p>My artistic journey has been deeply influenced by the works of Agnes Martin, Mark Rothko, and contemporary minimalists who explore the power of simplicity. Over the past decade, I have developed a distinctive visual language that merges geometric precision with organic spontaneity, creating works that invite contemplation and emotional resonance.</p>
                
                <p>Today, I work from my studio in Brooklyn, where I continue to explore the boundaries between abstraction and representation, color and form, silence and expression. My practice is rooted in the belief that art should be both intellectually engaging and emotionally accessible, bridging the gap between contemporary aesthetics and timeless human experiences.</p>
              </div>

              {/* Artistic Approach */}
              <div style={{ marginTop: 'var(--space-12)' }}>
                <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>Artistic Approach</span>
                
                <div className="about-content">
                  <p>My creative process begins with observation and contemplation. I spend considerable time studying light, shadow, and spatial relationships before touching brush to canvas. Each piece evolves through multiple layers of color, building depth and complexity through subtraction as much as addition. I work primarily with oil and acrylic on canvas, often incorporating mixed media elements to achieve desired textures and visual effects.</p>
                  
                  <p>Technique is essential to my practice, but it serves the larger vision rather than defining it. I employ traditional glazing methods alongside contemporary approaches, creating surfaces that shift and breathe with changing light. My palette tends toward muted, sophisticated tones punctuated by moments of bold color, reflecting the quiet intensity I seek to capture in every work.</p>
                </div>
              </div>

              {/* Exhibitions & Recognition */}
              <div style={{ marginTop: 'var(--space-12)' }} id="exhibitions">
                <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>Exhibitions & Recognition</span>
                
                <div>
                  {recentExhibitions.map((exhibition, index) => (
                    <div 
                      key={index}
                      style={{ 
                        display: 'flex', 
                        gap: 'var(--space-6)', 
                        marginBottom: 'var(--space-4)', 
                        paddingBottom: 'var(--space-4)', 
                        borderBottom: '1px solid var(--color-border)' 
                      }}
                    >
                      <span className="text-muted" style={{ fontSize: 'var(--text-sm)', minWidth: '60px' }}>
                        {exhibition.year}
                      </span>
                      <div>
                        <span style={{ fontWeight: 'var(--weight-medium)' }}>{exhibition.title}</span>
                        <span className="text-muted" style={{ marginLeft: 'var(--space-4)' }}>
                          {exhibition.venue}, {exhibition.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Quote */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <blockquote className="quote">
            "Art is not about filling space—it is about creating space for reflection, for silence, for the unspoken conversations between viewer and canvas. In every brushstroke, I seek to distill complexity into its essential form, revealing beauty in restraint and power in simplicity."
          </blockquote>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="section">
        <div className="container">
          <div className="skills-grid">
            <div>
              <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>Mediums</span>
              <ul>
                <li>Oil on Canvas</li>
                <li>Acrylic Paint</li>
                <li>Mixed Media</li>
                <li>Charcoal Drawing</li>
                <li>Watercolor</li>
                <li>Digital Art</li>
                <li>Installation</li>
              </ul>
            </div>

            <div>
              <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>Techniques</span>
              <ul>
                <li>Layering & Glazing</li>
                <li>Impasto</li>
                <li>Abstract Composition</li>
                <li>Color Field Painting</li>
                <li>Monochromatic Studies</li>
                <li>Texture Building</li>
                <li>Minimalist Approach</li>
              </ul>
            </div>

            <div>
              <span className="text-uppercase text-muted" style={{ display: 'block', marginBottom: 'var(--space-6)' }}>Specialties</span>
              <ul>
                <li>Contemporary Abstract</li>
                <li>Large-Scale Works</li>
                <li>Site-Specific Art</li>
                <li>Urban Landscapes</li>
                <li>Geometric Abstraction</li>
                <li>Minimalist Design</li>
                <li>Conceptual Art</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Image */}
      <section className="section section--sm" style={{ padding: 0 }}>
        <img 
          src="/images/artist/studio.jpg" 
          alt="Artist studio with brushes and paint"
          className="studio-image"
          onError={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)'
          }}
        />
        <p className="text-muted text-uppercase" style={{ textAlign: 'center', padding: 'var(--space-4)', fontSize: 'var(--text-xs)' }}>
          My Studio, Brooklyn
        </p>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container container--narrow">
          <h2 className="cta__title">LET'S CREATE TOGETHER</h2>
          <p className="cta__text">
            I am always open to collaborations, commissions, and creative partnerships. Whether you are a collector, curator, or fellow artist, I would love to hear from you and explore how we can work together.
          </p>
          <Link to="/#contact" className="btn">Contact Me</Link>
        </div>
      </section>
    </div>
  )
}

