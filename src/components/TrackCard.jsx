import { Card, Button, Badge } from 'react-bootstrap'

export default function TrackCard({ song, isFavorited, onToggleFavorite }) {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3">{song.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{song.game}</Card.Subtitle>
        <p className="mb-1"><strong>Composer:</strong> {song.composer}</p>
        <div className="mb-2 d-flex gap-1 flex-wrap">
          {song.mood.map(m => (
            <Badge key={m} bg="secondary">{m}</Badge>
          ))}
        </div>
        <div className="mt-auto d-flex gap-2">
          <Button
            variant="outline-primary"
            href={song.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            size="sm"
          >
            Listen on YouTube
          </Button>
          <Button
            variant={isFavorited ? 'danger' : 'outline-danger'}
            size="sm"
            onClick={() => onToggleFavorite(song)}
            aria-label={isFavorited ? `Remove ${song.title} from favorites` : `Add ${song.title} to favorites`}
          >
            {isFavorited ? '♥ Unfavorite' : '♡ Favorite'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
