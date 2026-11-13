import { useState, useEffect } from 'react'

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Benutzer {
  id: number;
  name: string;
}

// Benutzernamen fest einprogrammiert (IDs passen zu jsonplaceholder)
const benutzerListe: Benutzer[] = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
  { id: 4, name: 'Patricia Lebsack' },
  { id: 5, name: 'Chelsey Dietrich' },
  { id: 6, name: 'Mrs. Dennis Schulist' },
  { id: 7, name: 'Kurtis Weissnat' },
  { id: 8, name: 'Nicholas Runolfsdottir V' },
  { id: 9, name: 'Glenna Reichert' },
  { id: 10, name: 'Clementina DuBuque' }
]

function BenutzerPosts(): React.JSX.Element {
  const [ausgewaehlterBenutzer, setAusgewaehlterBenutzer] = useState<number | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLaden, setIsLaden] = useState<boolean>(false)

  useEffect(() => {
    // Noch kein Benutzer ausgewählt: nichts laden
    if (ausgewaehlterBenutzer === null) {
      return
    }

    // Async-Funktion innerhalb von useEffect definieren und aufrufen
    const ladePosts = async (): Promise<void> => {
      setIsLaden(true)
      try {
        const antwort = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${ausgewaehlterBenutzer}`
        )
        if (!antwort.ok) {
          throw new Error(`HTTP Fehler: ${antwort.status}`)
        }
        const daten: Post[] = await antwort.json()
        setPosts(daten)
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Unbekannter Fehler')
        setPosts([])
      } finally {
        setIsLaden(false)
      }
    }

    ladePosts()
  }, [ausgewaehlterBenutzer])  // Läuft jedes Mal, wenn ein anderer Benutzer gewählt wird

  return (
    <div>
      <h2>Posts eines Benutzers</h2>

      <label htmlFor="benutzer-auswahl">Benutzer: </label>
      <select
        id="benutzer-auswahl"
        value={ausgewaehlterBenutzer ?? ''}
        onChange={(e) =>
          setAusgewaehlterBenutzer(e.target.value === '' ? null : Number(e.target.value))
        }
      >
        <option value="">-- Bitte wählen --</option>
        {benutzerListe.map((b) => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      {ausgewaehlterBenutzer === null && <p>Bitte einen Benutzer auswählen.</p>}

      {ausgewaehlterBenutzer !== null && isLaden && <p>Posts werden geladen...</p>}

      {ausgewaehlterBenutzer !== null && !isLaden && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BenutzerPosts
