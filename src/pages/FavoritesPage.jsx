import { useState } from 'react'
import TrackGrid from '../components/TrackGrid'

function getFavorites() {
  return JSON.parse(sessionStorage.getItem('favorites') || '[]')
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(getFavorites)

  function handleToggleFavorite(song) {
    const updated = favorites.filter(f => f.id !== song.id)
    setFavorites(updated);
    sessionStorage.setItem('favorites', JSON.stringify(updated));
  }

  return (
    <div>
      <h1 className="mb-1">Your Favorites</h1>
      <p className="text-muted mb-4">Saved for this session.</p>

      {favorites.length === 0 ? (
        <p>You haven't favorited any tracks yet. Browse songs on the <strong>Home</strong> or <strong>Browse by Mood</strong> pages and hit ♡ Favorite!</p>
      ) : (
        <>
          <h2 className="visually-hidden">Your favorited tracks</h2>
          <TrackGrid
            songs={favorites}
            onToggleFavorite={handleToggleFavorite}
            isFavorited={true}/>
        </>
      )}
    </div>
  )
}
