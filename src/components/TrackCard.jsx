import { useEffect, useId, useState } from 'react'
import { Card, Button, Badge } from 'react-bootstrap'

let ytApiPromise = null
function loadYouTubeAPI() {
  if (ytApiPromise) {
    return ytApiPromise
  }

  ytApiPromise = new Promise(resolve => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }

    const prevCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) {
        prevCallback()
      }

      resolve(window.YT)
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })

  return ytApiPromise
}

function extractVideoId(url) {
  let match = url.match(/youtu\.be\/([^?&]+)/)
  if (match) {
    return match[1]
  }

  match = url.match(/[?&]v=([^&]+)/)
  if (match) {
    return match[1]
  }

  return null
}

export default function TrackCard({ song, isFavorited, onToggleFavorite }) {
  const videoId = extractVideoId(song.youtubeUrl)
  const rawId = useId()
  const iframeId = `yt-${rawId.replace(/:/g, '-')}`
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let player = null
    let cancelled = false

    loadYouTubeAPI().then(YT => {
      if (cancelled) {
        return
      }

      const iframe = document.getElementById(iframeId)
      if (!iframe) {
        return
      }

      player = new YT.Player(iframeId, {
        events: {
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true)
            } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
              setIsPlaying(false)
            }
          }
        }
      })
    })

    return () => {
      cancelled = true
      if (player && player.destroy) {
        try {
          player.destroy()
        } catch (err) {
          // iframe may already be removed by React
        }
      }
    }
  }, [iframeId])

  const showTitle = !isPlaying

  return (
    <Card className="h-100">
      <div style={{ position: 'relative', aspectRatio: '16 / 9', backgroundColor: '#000', borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit', overflow: 'hidden' }}>
        <iframe
          id={iframeId}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0&enablejsapi=1`}
          title={`${song.title} by ${song.composer}`}
          allow="encrypted-media; picture-in-picture"
          allowFullScreen/>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '0.75rem 1rem',
            background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0) 100%)',
            color: 'white',
            pointerEvents: 'none',
            opacity: showTitle ? 1 : 0,
            transition: showTitle ? 'opacity 0s' : 'opacity 0.4s ease'
          }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0, lineHeight: 1.25 }}>
            {song.title}
          </h3>
          <div style={{ fontSize: '0.82rem', opacity: 0.95 }}>{song.game}</div>
          <div style={{ fontSize: '0.82rem', opacity: 0.85, fontStyle: 'italic' }}>
            {song.composer}
          </div>
        </div>
      </div>

      <Card.Body className="d-flex flex-row align-items-center">
        <div className="mb-2 d-flex gap-1 flex-wrap">
          {song.mood.map(m => (
            <Badge key={m} bg="secondary">{m}</Badge>
          ))}
        </div>

        <div className="ms-auto mt-auto d-flex gap-2 flex-wrap">
          <Button
            variant={isFavorited ? 'danger' : 'outline-danger'}
            size="sm"
            onClick={() => onToggleFavorite(song)}
            aria-label={isFavorited ? `Remove ${song.title} from favorites` : `Add ${song.title} to favorites`}>
            {isFavorited ? '♥ Unfavorite' : '♡ Favorite'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
