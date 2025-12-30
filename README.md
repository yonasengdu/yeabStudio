# Artist Portfolio Website

A modern, responsive artist portfolio built with Vite + React and vanilla CSS. Designed for easy deployment on Vercel.

## Tech Stack

- **Vite** - Fast build tool with HMR
- **React 18** - Component library
- **React Router** - Client-side routing
- **Vanilla CSS** - Custom properties, no framework

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ArtworkCard.jsx
│   ├── FilterTabs.jsx
│   ├── Lightbox.jsx
│   └── ContactForm.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Portfolio.jsx
│   └── ArtworkDetail.jsx
├── data/               # Data files
│   ├── artworks.js
│   └── exhibitions.js
├── styles/             # CSS files
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   └── pages.css
├── App.jsx
├── main.jsx
└── index.css
public/
└── images/             # Static images
    ├── artworks/
    ├── artist/
    └── site/
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding New Artworks

1. Add image(s) to `public/images/artworks/`
2. Edit `src/data/artworks.js` and add a new entry:

```javascript
{
  id: "my-new-artwork",
  title: "My New Artwork",
  year: 2024,
  category: "paintings", // paintings, drawings, installations, mixed-media, commissions
  series: "Optional Series Name",
  medium: "Oil on Canvas",
  dimensions: "24\" × 36\"",
  price: "$3,500",
  available: true,
  featured: false, // Set to true to show on home page
  images: ["my-new-artwork.jpg", "my-new-artwork-detail.jpg"],
  description: "Description of the artwork...",
  artistNote: "Optional artist's note about this piece"
}
```

## Updating Artist Information

Edit the content directly in the page components:
- `src/pages/About.jsx` - Biography, approach, skills
- `src/pages/Home.jsx` - About preview text
- `src/components/Footer.jsx` - Social links

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite and configures everything
6. Click "Deploy"

Every push to main branch will trigger automatic deployment.

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Environment Variables

No environment variables required for basic setup.

For contact form functionality, you may want to add:
- Email service integration (Formspree, EmailJS, etc.)
- Analytics (Google Analytics, Plausible, etc.)

## Customization

### Colors & Typography

Edit `src/styles/variables.css`:

```css
:root {
  --color-accent: #C17F24;  /* Change accent color */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Work Sans', sans-serif;
}
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Header.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
