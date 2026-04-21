import '../App.css'
import { Card } from 'react-bootstrap'

export default function AboutPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column' }}>
      <h1 className="mb-3">About</h1>

      <section aria-label="What is Soundscapes of Gaming?">
        <h2>What is Soundscapes of Gaming?</h2>
        <p>Soundscapes of Gaming is a place to discover and revisit music from video games. Browse by mood, search across titles and composers, and favorite the tracks you love — whether you're looking for something emotional, epic, or adventurous.</p>
      </section>

      <section aria-label="My Motivation">
        <h2>My Motivation</h2>
        <p>I created this site to provide an easy way to browse video game music. It's a genre that's often overlooked since it isn't on many streaming services (besides Youtube). I also hope that those unfamiliar with video game music will find this site useful for experiencing it.</p>
      </section>

      <section aria-label="About the Creator">
        <h2>About the Creator</h2>
        <p>I'm Abby Reuning, and this site is my submission for the CS571 Web Project at UW-Madison.</p>
      </section>

      <footer aria-label="Credits" style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid #dee2e6' }}>
        <p style={{fontStyle: "italic"}}>All tracks and game titles are the property of their respective composers, publishers, and rights holders. Soundscapes of Gaming does not host any audio; all "Listen on YouTube" links direct to external YouTube pages.</p>
      </footer>
    </div>
  )
}
