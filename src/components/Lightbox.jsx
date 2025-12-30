import { useEffect } from 'react'

export default function Lightbox({ isOpen, imageSrc, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className={`lightbox ${isOpen ? 'active' : ''}`} 
      onClick={handleBackdropClick}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt="Artwork view" 
          className="lightbox__image" 
        />
      )}
    </div>
  )
}

