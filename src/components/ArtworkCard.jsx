import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ArtworkCard({ artwork, aspectRatio = '4/5' }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link to={`/artwork/${artwork.id}`} className="card">
      <div className="card__image" style={{ aspectRatio }}>
        {imageError ? (
          <div className="img-placeholder" style={{ width: '100%', height: '100%' }}>
            <span>{artwork.title}</span>
          </div>
        ) : (
          <img
            src={`/images/artworks/${artwork.images[0]}`}
            alt={artwork.title}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="card__content">
        <h3 className="card__title">{artwork.title}</h3>
        <p className="card__meta">{artwork.year} • {artwork.medium}</p>
      </div>
    </Link>
  )
}

