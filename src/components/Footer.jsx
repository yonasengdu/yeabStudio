export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.211.924 1.556 1.98 1.556.94 0 1.52-.494 1.744-1.182h3.148zM15.97 13.71c.104.846.944 1.457 1.98 1.457h3.93c-.072-.776-.344-1.393-.979-1.776-.634-.384-1.378-.493-2.132-.493-.891 0-1.72.331-2.799.812zM9 12.5H3v-2h6v2zm0-4H3v-2h6v2zm0 8H3v-2h6v2z"/>
          </svg>
        </a>
        <a href="mailto:hello@artistname.com" aria-label="Email">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      </div>
      <p className="footer__copy">&copy; {new Date().getFullYear()} Artist Name. All Rights Reserved.</p>
    </footer>
  )
}

