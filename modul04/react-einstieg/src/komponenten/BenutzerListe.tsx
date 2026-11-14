import BenutzerKarte from './BenutzerKarte'
import useFetch from '../hooks/useFetch'
import type { Benutzer } from '../typen/benutzer'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function BenutzerListe(): React.JSX.Element {
  // Laden, Fehler und 'Neu laden' übernimmt der useFetch-Hook
  const { daten: benutzer, isLaden, fehler, neuLaden } = useFetch<Benutzer[]>(API_URL)

  return (
    <div>
      <h2>Benutzerliste</h2>
      <button onClick={neuLaden} disabled={isLaden}>Neu laden</button>

      {isLaden && <p>Benutzer werden geladen …</p>}

      {!isLaden && fehler && (
        <p className="fehler">Die Benutzer konnten nicht geladen werden. ({fehler})</p>
      )}

      {!isLaden && !fehler && benutzer?.map((b) => (
        <BenutzerKarte key={b.id} benutzer={b} />
      ))}
    </div>
  )
}

export default BenutzerListe
