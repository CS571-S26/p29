import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import songs from '../data/songs'
import TrackCard from '../components/TrackCard'
import TrackGrid from '../components/TrackGrid'

function getFavorites() {
  return JSON.parse(sessionStorage.getItem('favorites') || '[]');
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState(getFavorites)
  const [randomSong, setRandomSong] = useState(null)
  const favIds = favorites.map(f => f.id)
  const filtered = query.trim()
  ? songs.filter(s =>
      [s.title, s.composer, s.game, ...s.mood].some(field =>
        field.toLowerCase().includes(query.toLowerCase())
      )
    )
  : []

  function handleToggleFavorite(song) {
    const updated = favIds.includes(song.id)
      ? favorites.filter(f => f.id !== song.id)
      : [...favorites, song]

    // update favorites
    setFavorites(updated);
    sessionStorage.setItem('favorites', JSON.stringify(updated));
  }

  function handleRandom() {
    const pick = songs[Math.floor(Math.random() * songs.length)];
    setRandomSong(pick);
  }

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
                onToggleFavorite={handleToggleFavorite}/>
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
            onChange={e => setQuery(e.target.value)}/>
        </Form.Group>

        {query.trim() && filtered.length === 0 && (
          <p className="text-muted">No tracks matched your search.</p>
        )}

        <TrackGrid songs={filtered} favIds={favIds} onToggleFavorite={handleToggleFavorite}/>
      </section>
    </div>
  )
}
