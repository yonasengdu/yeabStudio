const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'paintings', label: 'Paintings' },
  { id: 'installations', label: 'Installations' },
  { id: 'drawings', label: 'Drawings' },
  { id: 'mixed-media', label: 'Mixed Media' },
  { id: 'commissions', label: 'Commissions' }
]

export default function FilterTabs({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`filter-tab ${activeFilter === category.id ? 'filter-tab--active' : ''}`}
          onClick={() => onFilterChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

