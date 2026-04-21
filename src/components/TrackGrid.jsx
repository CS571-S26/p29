import { Row, Col } from 'react-bootstrap'
import TrackCard from '../components/TrackCard'

export default function TrackGrid({ songs, favIds, onToggleFavorite, isFavorited }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {songs.map(song => (
        <Col key={song.id}>
          <TrackCard
            song={song}
            isFavorited={isFavorited ? isFavorited : favIds.includes(song.id)}
            onToggleFavorite={onToggleFavorite}/>
        </Col>
      ))}
    </Row>
  )
}
