import { useState } from 'react'
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap'
import songs from '../data/songs'
import TrackCard from '../components/TrackCard'

const moods = [...new Set(songs.flatMap(song => song.mood))];

function getFavorites() {
  return JSON.parse(sessionStorage.getItem('favorites') || '[]')
}

function saveFavorites(favs) {
  sessionStorage.setItem('favorites', JSON.stringify(favs))
}

export default function BrowsePage() {
  const [selectedMoods, setSelectedMoods] = useState([])
  const [favorites, setFavorites] = useState(getFavorites)

  const favIds = favorites.map(f => f.id)

  function HandleToggleFavorite(song) {
    const updated = favIds.includes(song.id)
      ? favorites.filter(f => f.id !== song.id)
      : [...favorites, song]
    setFavorites(updated)
    saveFavorites(updated)
  }

  function UpdateSelectedMoods(selected) {
    if (selected == null) {
      setSelectedMoods([]);
      return;
    }

    let newSelectedMoods = [...selectedMoods, selected];

    if (selectedMoods.includes(selected)) {
      newSelectedMoods = selectedMoods.filter(mood => mood !== selected);
    }

    setSelectedMoods(newSelectedMoods);
  }

  const filtered = selectedMoods.length === 0
    ? songs
    : songs.filter(song => selectedMoods.some(mood => song.mood.includes(mood)));

  return (
    <div>
      <h1 className="mb-3">Browse by Mood</h1>

      <section aria-label="Mood filter">
        <h2 className="visually-hidden">Filter by mood</h2>
        <ButtonGroup className="mb-4 flex-wrap gap-2" aria-label="Mood filter">
          <Button
            variant={selectedMoods === null ? 'dark' : 'outline-dark'}
            onClick={() => UpdateSelectedMoods(null)}
          >
            All
          </Button>
          {moods.map(mood => (
            <Button
              key={mood}
              variant={selectedMoods.includes(mood) ? 'dark' : 'outline-dark'}
              onClick={() => UpdateSelectedMoods(mood)}
            >
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </section>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filtered.map(song => (
          <Col key={song.id}>
            <TrackCard
              song={song}
              isFavorited={favIds.includes(song.id)}
              onToggleFavorite={HandleToggleFavorite}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}
