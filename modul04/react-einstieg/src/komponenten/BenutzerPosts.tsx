import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { benutzerAuswahl } from '../daten/benutzer'
import type { Post } from '../typen/post'

function BenutzerPosts(): React.JSX.Element {
  const [ausgewaehlterBenutzer, setAusgewaehlterBenutzer] = useState<number | null>(null)

  // Ohne Auswahl ist die URL null — dann lädt useFetch nichts.
  // Ändert sich die Auswahl, ändert sich die URL und useFetch lädt neu.
  const url = ausgewaehlterBenutzer === null
    ? null
    : `https://jsonplaceholder.typicode.com/posts?userId=${ausgewaehlterBenutzer}`

  const { daten: posts, isLaden, fehler } = useFetch<Post[]>(url)

  const handleAuswahl = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setAusgewaehlterBenutzer(e.target.value === '' ? null : Number(e.target.value))
  }

  return (
    <div>
      <h2>Posts eines Benutzers</h2>

      <label htmlFor="benutzer-auswahl">Benutzer: </label>
      <select
        id="benutzer-auswahl"
        value={ausgewaehlterBenutzer ?? ''}
        onChange={handleAuswahl}
      >
        <option value="">-- Bitte wählen --</option>
        {benutzerAuswahl.map((b) => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      {ausgewaehlterBenutzer === null && <p>Bitte einen Benutzer auswählen.</p>}

      {ausgewaehlterBenutzer !== null && isLaden && <p>Posts werden geladen...</p>}

      {ausgewaehlterBenutzer !== null && !isLaden && fehler && (
        <p className="fehler">Fehler: {fehler}</p>
      )}

      {ausgewaehlterBenutzer !== null && !isLaden && !fehler && (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BenutzerPosts
