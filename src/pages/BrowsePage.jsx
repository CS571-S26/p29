import { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import songs from '../data/songs'
import TrackGrid from '../components/TrackGrid'

const moods = [...new Set(songs.flatMap(song => song.mood))];

function getFavorites() {
  return JSON.parse(sessionStorage.getItem('favorites') || '[]')
}

export default function BrowsePage() {
  const [selectedMoods, setSelectedMoods] = useState([])
  const [favorites, setFavorites] = useState(getFavorites)
  const favIds = favorites.map(f => f.id)
  const filtered = selectedMoods.length === 0
    ? songs
    : songs.filter(song => selectedMoods.some(mood => song.mood.includes(mood)));

  function HandleToggleFavorite(song) {
    const updated = favIds.includes(song.id)
      ? favorites.filter(f => f.id !== song.id)
      : [...favorites, song]

    // update favorites
    setFavorites(updated);
    sessionStorage.setItem('favorites', JSON.stringify(updated))
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

  return (
    <div>
      <h1 className="mb-3">Browse by Mood</h1>

      <section aria-label="Mood filter">
        <h2 className="visually-hidden">Filter by mood</h2>
        <ButtonGroup className="mb-4 flex-wrap gap-2" aria-label="Mood filter">
          <Button
            variant={selectedMoods.length === 0 ? 'dark' : 'outline-dark'}
            onClick={() => UpdateSelectedMoods(null)}>
            All
          </Button>
          {moods.map(mood => (
            <Button
              key={mood}
              variant={selectedMoods.includes(mood) ? 'dark' : 'outline-dark'}
              onClick={() => UpdateSelectedMoods(mood)}>
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </section>

      <TrackGrid songs={filtered} favIds={favIds} onToggleFavorite={HandleToggleFavorite}/>
    </div>
  )
}
