import { Button, Accordion, Badge } from 'react-bootstrap'

export default function GameSelector({ selectedGames, games, setSelectedGames }) {
    function UpdateSelectedGames(selected) {
        if (selected == null) {
          setSelectedGames([]);
          return;
        }

        let newSelectedGames = [...selectedGames, selected];
        if (selectedGames.includes(selected)) {
          newSelectedGames = selectedGames.filter(game => game !== selected);
        }

        setSelectedGames(newSelectedGames);
    }
  
  return (
    <Accordion flush>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>
          <span>Filter by game</span>
          <span className='ms-2 d-flex flex-wrap gap-1'>
            {selectedGames.map( g => (
              <Badge key={g} bg='secondary'>{g}</Badge>
            ))}
          </span>
        </Accordion.Header>
        <Accordion.Body>
          <div className="d-flex flex-wrap gap-2" role='group' aria-label="Game filter">
              {games.map(game => (
                <Button
                    style={{ whiteSpace: 'normal' }}
                    key={game}
                    variant={selectedGames.includes(game) ? 'dark' : 'outline-dark'}
                    onClick={() => UpdateSelectedGames(game)}>
                    {game.charAt(0).toUpperCase() + game.slice(1)}
                </Button>
              ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
