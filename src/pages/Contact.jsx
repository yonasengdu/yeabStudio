import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ContactForm from '../components/ContactForm'

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

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="page-bg">
        <div className="page-bg__grid"></div>
        <div className="page-bg__noise"></div>
      </div>

      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__content">
            <span className="contact-hero__label">
              <span className="contact-hero__label-icon">◈</span>
              Get in Touch
            </span>
            <h1 className="contact-hero__title">
              <span className="contact-hero__title-line">Let's Start a</span>
              <span className="contact-hero__title-line contact-hero__title-line--accent">Conversation</span>
            </h1>
            <p className="contact-hero__subtitle">
              Whether you're interested in a commission, collaboration, or simply want to connect
            </p>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-main__grid">
            <div className="contact-main__info">
              <Reveal>
                <h2 className="contact-main__title">
                  Ready to Create <span className="highlight">Something Beautiful?</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="contact-main__text">
                  I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate. 
                  Feel free to reach out through the form or contact me directly.
                </p>
              </Reveal>

              <div className="contact-main__details">
                <Reveal delay={200}>
                  <div className="contact-main__detail">
                    <div className="contact-main__detail-icon">
                      <span>✉</span>
                    </div>
                    <div className="contact-main__detail-content">
                      <span className="contact-main__detail-label">Email</span>
                      <a href="mailto:hello@artistname.com">hello@artistname.com</a>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={250}>
                  <div className="contact-main__detail">
                    <div className="contact-main__detail-icon">
                      <span>◎</span>
                    </div>
                    <div className="contact-main__detail-content">
                      <span className="contact-main__detail-label">Instagram</span>
                      <a href="https://instagram.com/artistname" target="_blank" rel="noopener noreferrer">@artistname</a>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={300}>
                  <div className="contact-main__detail">
                    <div className="contact-main__detail-icon">
                      <span>⬡</span>
                    </div>
                    <div className="contact-main__detail-content">
                      <span className="contact-main__detail-label">Studio Location</span>
                      <span>Brooklyn, New York</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={350}>
                <div className="contact-main__cta">
                  <p className="contact-main__cta-text">Want to see my work first?</p>
                  <Link to="/portfolio" className="contact-main__link">
                    <span>View Portfolio</span>
                    <span className="contact-main__link-arrow">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={200}>
              <div className="contact-main__form-wrapper">
                <div className="contact-main__form-accent"></div>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="contact-faq">
        <div className="container">
          <Reveal>
            <h2 className="contact-faq__title">Frequently Asked</h2>
          </Reveal>
          <div className="contact-faq__grid">
            <Reveal delay={100}>
              <div className="contact-faq__item">
                <h3>Do you accept commissions?</h3>
                <p>Yes! I'm always open to discussing custom pieces. Share your vision and let's create something unique together.</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="contact-faq__item">
                <h3>What is your typical turnaround time?</h3>
                <p>Depending on the complexity, most pieces take 4-8 weeks. I'll provide a detailed timeline during our initial consultation.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="contact-faq__item">
                <h3>Do you ship internationally?</h3>
                <p>Absolutely. I work with trusted art shippers to ensure your piece arrives safely, anywhere in the world.</p>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <div className="contact-faq__item">
                <h3>Can I visit your studio?</h3>
                <p>Studio visits are available by appointment. Reach out to schedule a time to see works in progress.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
