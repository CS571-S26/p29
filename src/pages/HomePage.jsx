import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import songs from '../data/songs'
import TrackCard from '../components/TrackCard'

function getFavorites() {
  return JSON.parse(sessionStorage.getItem('favorites') || '[]')
}

function saveFavorites(favs) {
  sessionStorage.setItem('favorites', JSON.stringify(favs))
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState(getFavorites)
  const [randomSong, setRandomSong] = useState(null)

  const favIds = favorites.map(f => f.id)

  function handleToggleFavorite(song) {
    const updated = favIds.includes(song.id)
      ? favorites.filter(f => f.id !== song.id)
      : [...favorites, song]
    setFavorites(updated)
    saveFavorites(updated)
  }

  function handleRandom() {
    const pick = songs[Math.floor(Math.random() * songs.length)]
    setRandomSong(pick)
  }

  const filtered = query.trim()
    ? songs.filter(s =>
        [s.title, s.composer, s.game, ...s.mood].some(field =>
          field.toLowerCase().includes(query.toLowerCase())
        )
      )
    : []

  return (
    <div>
      <h1 className="mb-1">Soundscapes of Gaming</h1>
      <p className="text-muted mb-4">Discover and save your favorite video game music.</p>

      <section aria-label="Random track">
        <Button variant="secondary" onClick={handleRandom} className="mb-4">
          🎲 Random Track
        </Button>
        {randomSong && (
          <Row className="mb-4">
            <Col md={4}>
              <TrackCard
                song={randomSong}
                isFavorited={favIds.includes(randomSong.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </Col>
          </Row>
        )}
      </section>

      <section aria-label="Search tracks">
        <h2 className="mb-3">Search Tracks</h2>
        <Form.Group controlId="search" className="mb-4">
          <Form.Label>Search by title, game, composer, or mood</Form.Label>
          <Form.Control
            type="search"
            placeholder="e.g. battle, Zelda, Yoko Shimomura..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </Form.Group>

        {query.trim() && filtered.length === 0 && (
          <p className="text-muted">No tracks matched your search.</p>
        )}

        <Row xs={1} md={2} lg={3} className="g-4">
          {filtered.map(song => (
            <Col key={song.id}>
              <TrackCard
                song={song}
                isFavorited={favIds.includes(song.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </Col>
          ))}
        </Row>
      </section>
    </div>
  )
}
