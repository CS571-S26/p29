import { useState } from 'react'
import { Button } from 'react-bootstrap'
import songs from '../data/songs'
import TrackGrid from '../components/TrackGrid'
import TrackSorter from '../components/TrackSorter';
import MoodSelector from '../components/MoodSelector';
import GameSelector from '../components/GameSelector';

const moods = [...new Set(songs.flatMap(song => song.mood))];
const games = [...new Set(songs.flatMap(song => song.game))];

function getFavorites() {
  return JSON.parse(sessionStorage.getItem('favorites') || '[]')
}

export default function BrowsePage() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites)
  const favIds = favorites.map(f => f.id)
  const filtered = selectedMoods.length === 0 && selectedGames.length === 0
    ? songs
    : songs.filter(song => {
      const matchesMood = selectedMoods.length === 0 ? true : selectedMoods.some(mood => song.mood.includes(mood));
      const matchesGame = selectedGames.length === 0 ? true : selectedGames.some(game => song.game === game);
      return matchesMood && matchesGame;
    });
  const [sortField, setSortField] = useState('title');
  const [ascending, setAscending] = useState(true);

  function HandleToggleFavorite(song) {
    const updated = favIds.includes(song.id)
      ? favorites.filter(f => f.id !== song.id)
      : [...favorites, song]

    // update favorites
    setFavorites(updated);
    sessionStorage.setItem('favorites', JSON.stringify(updated))
  }

  return (
    <div>
      <h1 className="mb-3">Browse Songs</h1>

      <h2 className="visually-hidden">Sort/Filter Songs</h2>
        <Button
          variant='dark'
          className='mb-3'
          onClick={() => {
            setSelectedGames([]);
            setSelectedMoods([]);
          }}>
            Clear Filters
        </Button>

        <div className='d-flex gap-3 mb-4'>
          <div className='d-flex flex-column gap-2'>
            <section aria-label="Mood filter">
              <h3 className="visually-hidden">Filter by mood</h3>
              <MoodSelector
                selectedMoods={selectedMoods}
                setSelectedMoods={setSelectedMoods}
                moods={moods}/>
            </section>

            <section aria-label="Game filter" >
              <h3 className="visually-hidden">Filter by game title</h3>
              <GameSelector
                selectedGames={selectedGames}
                setSelectedGames={setSelectedGames}
                games={games}/>
            </section>
          </div>

            <section aria-label='Sort songs' className='ms-auto'>
              <h3 className='visually-hidden'>Sort songs</h3>
              <TrackSorter
                sortField={sortField}
                setSortField={setSortField}
                ascending={ascending}
                setAscending={setAscending}/>
            </section>
        </div>


      <h2 className="visually-hidden">Track List</h2>
      <TrackGrid songs={[...filtered].sort((a, b) => (ascending ? 1 : -1) * a[sortField].localeCompare(b[sortField]))} favIds={favIds} onToggleFavorite={HandleToggleFavorite}/>
    </div>
  )
}
