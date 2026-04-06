import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import TrackCard from '../components/TrackCard'

function getFavorites() {
  return JSON.parse(sessionStorage.getItem('favorites') || '[]')
}

function saveFavorites(favs) {
  sessionStorage.setItem('favorites', JSON.stringify(favs))
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(getFavorites)

  function handleToggleFavorite(song) {
    const updated = favorites.filter(f => f.id !== song.id)
    setFavorites(updated)
    saveFavorites(updated)
  }

  return (
    <div>
      <h1 className="mb-1">Your Favorites</h1>
      <p className="text-muted mb-4">Saved for this session.</p>

      {favorites.length === 0 ? (
        <p>You haven't favorited any tracks yet. Browse songs on the <strong>Home</strong> or <strong>Browse by Mood</strong> pages and hit ♡ Favorite!</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favorites.map(song => (
            <Col key={song.id}>
              <TrackCard
                song={song}
                isFavorited={true}
                onToggleFavorite={handleToggleFavorite}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
